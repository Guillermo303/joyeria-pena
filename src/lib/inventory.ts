export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export type InventoryItem = {
  sku: string;
  name: string;
  collection: string;
  stock: number;
  status: StockStatus;
  image: string;
};

export type InventoryMetrics = {
  activeSkus: number;
  lowStockAlerts: number;
  pendingRepairs: number;
};

/**
 * Datos de inventario de ejemplo.
 *
 * Este archivo es el único lugar que debe cambiar cuando se conecte el
 * inventario real (por ejemplo leyendo BDJT2.mdb o CONTROL REPARACIONES.xlsm
 * a través de un backend, y exponiéndolo aquí vía fetch a una API).
 */
const inventory: InventoryItem[] = [
  {
    sku: "JP-A-001",
    name: "Colección Herencia",
    collection: "Herencia",
    stock: 12,
    status: "in-stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZAu3IhpZRTl5X66TdAstljUZXLFXBplxey0eA6CD_OmvT9ajH1Zl0WOhsu5mRa33NC6WwLMg3vsiTOsv4g2aJD_xnd7EkkxPA4Mun56yTtd5o_Ah_gjh4D5juht2p6qLMjAbS2UNcLL3y7azfyMEdQbBC04uCC7Wg9g55tnfL8t_RBM3m-F15qC6QFOHLEoGREAmlQ-0dBK3VJTIAWb4QygRtP3kmqCXmGSweziiPFQvOMrYDgbBxMQ",
  },
  {
    sku: "JP-C-042",
    name: "Geométrica a Medida",
    collection: "Bespoke",
    stock: 2,
    status: "low-stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPeXYLJfH9SmVfGesFUUR0i15K7Sv3H08eYLIgW0zl8ibzV_iU_57b6umHXeXhLoU6yHqqMSXTmYYoZ5OI6MzoOYlwsX1HEinJh_wUw6XdhLhu9orwFJq2osc_hxMVBjWoyTMO4LpT29DbE-_hW34m4wjC6JBI1kBiPWZQOaZgFPKjZ-Zm-_4AdhPj4uc_nH8wu_Kriky5u4UOjsYAiEd5TBHMn9VlpBqqM4-fY_ibEuGjQJjFP17YfQ",
  },
  {
    sku: "JP-E-115",
    name: "Noche Estelar",
    collection: "Starlight",
    stock: 0,
    status: "sold-out",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmbswiD7lFLDGGrD9DInrftNC0YF4iBqoG33s7hlNcY8MekUFDCAtS9QRNu7W_UKsmwGnMZ8CWQMujfgsrDknG5mr4IyRakTO1zugZ6WRIu3lC-IbgBa65eVp90DsJ0M8QzWq1FdCgti0VF4HRfZqXSIhYVAiO469mZssyIlMk01lI5ZANO6SkEpdmxFfvfGC_ODEmlSE7AjXqQjBWEfYKJcwbUoXYflve3XvI-s8n22ChkwdMBA9TQQ",
  },
  {
    sku: "JP-B-088",
    name: "Clásicos Modernos",
    collection: "Modernist",
    stock: 45,
    status: "in-stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCf54OLo_iCYcxdirKhrKQpicLa7aDgvvAP3w2MX3T8wglrgRIEZNIc0E-UA21lHT0hHg-qmB6hy312c-9y9Ap-JvxVBkAaozlnb1KITJyjF6K1lgIttkl6O4dz2LqEBVXRjsI3yEign_ry-p7pOX1bbvUbWImcFGhSMiJl-6U6vqNJdvs8KvIJjLPubEd7UO6mQ-t8Bgg7hJPvTkCB-I1h2ShUXo7aFyWIjPVh72CgTOnjTwvL4SbNfg",
  },
];

export async function getInventory(): Promise<InventoryItem[]> {
  return inventory;
}

export async function getInventoryMetrics(): Promise<InventoryMetrics> {
  return {
    activeSkus: 1248,
    lowStockAlerts: inventory.filter((i) => i.status === "low-stock").length + 12,
    pendingRepairs: 32,
  };
}
