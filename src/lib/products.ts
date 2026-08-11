export type Product = {
  id: string;
  sku: string;
  category: string;
  name: string;
  price: number;
  image: string;
  featuredImage?: string;
  wide?: boolean;
  description?: string;
  specs?: Record<string, string>;
  gallery?: string[];
};

/**
 * Catálogo de productos.
 *
 * Por ahora es un arreglo estático. Cuando se conecte al sistema de
 * inventario real (BDJT2.mdb / un backend), `getProducts` y `getProductById`
 * son los dos únicos puntos que hay que cambiar por llamadas a la API.
 */
const products: Product[] = [
  {
    id: "eternity-band",
    sku: "JP-A-001",
    category: "Anillos",
    name: "Banda Eternidad",
    price: 4500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgMS4OwXo7ViG7UEOQjqu1f_t7Qlj0-_tk3W_Rd1NJvfIy3W2VkE9AlJzI6hcDYlGMmMja8ZiS_Ai5Vf3Hm5roFu571UQnSVWWkQ9HXyQIyJiSY1o3YNFtLhQlwxknIT7JG5UtwHyBbuWbLCmlnjkaoRJJMc00tRsHxDLHfWnzlkWw6bgCzrGdc7cs5Fv5Gp40W2cVLHZpzyyW7DA-0zkk5UHvX-GWFSpOpEauC-3yervpxxXX8hJYWA",
    description:
      "Un testimonio de elegancia duradera. Cuenta con un diamante de corte brillante meticulosamente seleccionado a mano, asegurado en nuestro engaste de platino de cuatro garras.",
    specs: {
      Quilates: "2.01 ct",
      Color: "F (Incoloro)",
      Claridad: "VVS1",
      Metal: "Oro Amarillo 18k y Platino",
    },
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPZRqWhhEL3zqPrZ34uz4oesP9LNAsEY4CC3uffjhgls4fAfF3ynhCksehy13wyKjiev1euJqAJOo5lQm3dRrCRZLSHVMJyufzkeoTFy42rv2heUt0rBbio3yoh1S6Hy1-PzejUpTlWPK80dPa4FVQcm6I83Fh8E9ace7t_srJ39XzwdB4oSY7dN8_c45OlO4X7ZFeEyTHGsYuAuwmqxbS-T2-qaztBa9d92ZzwArDl7yE1TjP_HjFwA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIFMUmrJysyrKtovrnGRyZE_H3GxH07HrilbYp2KerAKgji2izevv-qzqF5H2BRR2a0AxlhLEH_6rzRWinJmyWyJDo0YgFgl20S8Of5zaqSHoZ5n_3DT8GPTiP4O09sU_F4JPwA-1c8V6dpRhWbsElMyepIVRq9lhtiQ7DjWuem6rPsFblANJhyuVoy10QPl-ZrU6f6coY7gOR1B31Mzel5EN0C9u8Vw-rzIeyXZ_NwBQlgtwatmLDRQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYLZDQUGxuexwFKcdB9WyAogZuYiLI6DolYikJGNvzcz04beoqCv4NF6Mfnx2X-yt6woK8THmbIipCP_9FIaN4u0mK6U0j6fQm1dzdGqp-4ym2LpK6C-nKJt2-aDr-RYpu7st0HcUUSgbcqDXqz-xZdpjghGvnvumCwc1QhmqLxSEN2oE_73Mpt3LV988V0jaCpCjwbMk0974RZbROlmmsajeWN9OZ5_G8m-LeM1rmacH7--p_zaFEug",
    ],
  },
  {
    id: "sapphire-drops",
    sku: "JP-E-115",
    category: "Aretes",
    name: "Gotas de Zafiro",
    price: 6200,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAS48PN4Gh8G0bYXfjv0BuQ1Ln_KDHZQ9qX7yEPlVsFqQv4FK0aX7fd_SbrklazWOKsF3y17Zke1C-2opmxzz6PhSUNFyq_oYkMam3BIsxheciaCdWFk0w7XWH-qDkYj6zRoIb05aYKFbmHHU_NSJK3svPzPd-WMMPTsRa6C5gkaDH1azzUcI39AceRgfArEN62IbQ4G6pCE_rlL2j0BGqITZqQTumq-vb_yzSITnNBRHGbcxOidyxq0Q",
  },
  {
    id: "chronograph-rose",
    sku: "JP-W-210",
    category: "Relojes",
    name: "Cronógrafo Rosa",
    price: 12800,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDH5fCud88T1UwxvxmJuQ2by3PbulurKalCb_Tj8MniXNg5Ni-i5EpdCWbxKwHtZxbn1z7rjp7mWvqfaIVX_Akmg6kwG9oRecDAJ60AL0_pUWyEu_XLuZaGkWWSJ_VJEVTol7Q04bQmcK1TULTp-VQFw3Q9rwvJH7w9h_xV6iU-wM0EoIFDbaZsl_WHkqIhVCkL4lvCcj7jlwEcXsRD51Llfdhu8W-imexLPiEw5fEoolbhghvVImTUdg",
  },
  {
    id: "riviere-diamond-necklace",
    sku: "JP-N-500",
    category: "Collares",
    name: "Collar Rivière de Diamantes",
    price: 35000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWeRfywezfInKOjO1Ypo9BFBb1ww6zpaVKaXUy4FwxRsG8X1jU35AfJXp67KJZzFXFyqpuvNjkHROJf6lqYGLnMKB8tjb1KrswRTklIl_0m8LW_-DzcSJeMINOdhdcFurTAnpVoqJEjiUFiHHoWUUY87GFZEeTNtUZ3YnjphFKEB2S53NS28YayG4AYtKQVC2Qo79ax_8JQ3t54jubFcBuWd46hF-zSbhgWuZmqzT5na7WX2r3CleOrg",
    wide: true,
  },
  {
    id: "sculpted-bangle",
    sku: "JP-B-088",
    category: "Pulseras",
    name: "Brazalete Esculpido",
    price: 3100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDF8wMnums5PrvY9CUOImyVX6CswdECoHmz3Z_VagFBvSaVWeXzimagZH4b7s5-hy_jUj1BIxfclu9szUcLRdg-Yi1LGiX3FM25cR_cVDCcPdAuFLvooPH7IeUh4WhfnTSYaPP509EKTHPvOY2Y_s1Gvtc-ndc8VUmksRI2B7QiMwOIzIJUc_nEv_x2SZcZYbXvYaIqxhPEaahKaBWdMI9ra0_eHy2fa0G3QQ7qgiOJAz7KPIbjXFTFTg",
  },
];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}
