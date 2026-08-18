import type { ResultSetHeader } from "mysql2";
import pool from "@/lib/db";

export type SaleItemInput = {
  productName: string;
  unitPrice: number;
  quantity: number;
};

export async function createInStoreSale(input: {
  vendedorId: number;
  sucursalId: number;
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  items: SaleItemInput[];
}): Promise<number> {
  const total = input.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [orderResult] = await conn.query<ResultSetHeader>(
      `INSERT INTO orders
        (customer_name, customer_email, customer_phone, total, status, source, sucursal_id, vendedor_id)
       VALUES (?, ?, ?, ?, 'completado', 'tienda', ?, ?)`,
      [
        input.customerName,
        input.customerEmail ?? null,
        input.customerPhone ?? null,
        total,
        input.sucursalId,
        input.vendedorId,
      ],
    );
    const orderId = orderResult.insertId;

    for (const item of input.items) {
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, "manual", item.productName, item.unitPrice, item.quantity],
      );
    }

    await conn.commit();
    return orderId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
