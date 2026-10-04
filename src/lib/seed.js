import prisma from './prisma.js'



const categoriasData = [
  { nameCategorie: "Abarrotes y Despensa", description: "Granos, aceites, harinas y productos básicos" },
  { nameCategorie: "Lácteos y Refrigerados", description: "Leches, quesos, embutidos y derivados" },
  { nameCategorie: "Bebidas y Licores", description: "Gaseosas, jugos, aguas, cervezas y licores" },
  { nameCategorie: "Cuidado Personal y Aseo", description: "Higiene personal y aseo para el hogar" },
  { nameCategorie: "Mecato y Confitería", description: "Snacks, galletas, chocolates y dulces" }
];

const proveedoresData = [
  { tipoDocumento: "NIT", documento: "900123456-1", razonSocial: "Distribuidora Nacional de Alimentos S.A.S", phone: "3102345678", email: "ventas@distrinalimentos.com" },
  { tipoDocumento: "NIT", documento: "890900123-2", razonSocial: "Lácteos del Campo Andino S.A.", phone: "3113456789", email: "pedidos@lacteosandino.com" },
  { tipoDocumento: "NIT", documento: "900567890-3", razonSocial: "Bebidas y Refrescos de Colombia S.A.S", phone: "3124567890", email: "comercial@bebidascol.com" },
  { tipoDocumento: "NIT", documento: "860012345-4", razonSocial: "Productos de Aseo Industrial y Hogar Ltda.", phone: "3135678901", email: "contacto@aseohogar.com" },
  { tipoDocumento: "NIT", documento: "901234567-5", razonSocial: "Snacks y Confitería del Valle S.A.S", phone: "3146789012", email: "ventas@snacksvalle.com" },
  { tipoDocumento: "NIT", documento: "890102030-6", razonSocial: "Molinos La Campesina S.A.", phone: "3157890123", email: "ventas@molinoscampesina.com" },
  { tipoDocumento: "NIT", documento: "900456123-7", razonSocial: "Embutidos y Carnes Frías del Sol S.A.S", phone: "3168901234", email: "pedidos@embutidossol.com" },
  { tipoDocumento: "NIT", documento: "900890123-8", razonSocial: "Cervecería & Licores La Ronda Ltda.", phone: "3179012345", email: "distribucion@licoreslaronda.com" },
  { tipoDocumento: "NIT", documento: "901654321-9", razonSocial: "Cuidado Personal & Cosmética Pro S.A.S", phone: "3180123456", email: "info@cosmeticapro.com" },
  { tipoDocumento: "NIT", documento: "800123987-0", razonSocial: "Golosinas y Galletas Fiesta S.A.", phone: "3191234567", email: "pedidos@golosinasfiesta.com" },
  { tipoDocumento: "NIT", documento: "900789456-1", razonSocial: "Granos y Cereales El Campirano Ltda.", phone: "3202345678", email: "contacto@granoscampirano.com" },
  { tipoDocumento: "NIT", documento: "890321654-2", razonSocial: "Quesera y Derivados Central S.A.", phone: "3213456789", email: "ventas@queseracentral.com" },
  { tipoDocumento: "NIT", documento: "901987654-3", razonSocial: "Distribuidora de Jugos Naturales S.A.S", phone: "3224567890", email: "logistica@jugosnaturales.com" },
  { tipoDocumento: "CC", documento: "71234567", razonSocial: "Comercializadora Rural Gómez y Cía.", phone: "3235678901", email: "contacto@gomezcia.com" }
];

const productosData = [
  // Abarrotes y Despensa
  { codigoBarras: "7701001", nameProduct: "Arroz Diana Tradicional 1000g", stock: 45, priceVenta: 4800, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900123456-1", "890102030-6"] },
  { codigoBarras: "7701002", nameProduct: "Aceite Vegetal Premier 1000ml", stock: 30, priceVenta: 11500, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900123456-1"] },
  { codigoBarras: "7701003", nameProduct: "Frijol Cargamanto Blanco 500g", stock: 25, priceVenta: 6200, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["890102030-6", "900789456-1"] },
  { codigoBarras: "7701004", nameProduct: "Lenteja Seleccionada 500g", stock: 35, priceVenta: 4100, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900789456-1"] },
  { codigoBarras: "7701005", nameProduct: "Azúcar Blanco Incauca 1000g", stock: 50, priceVenta: 4900, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900123456-1"] },
  { codigoBarras: "7701006", nameProduct: "Sal Refinada Refisal 1000g", stock: 60, priceVenta: 2200, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900123456-1"] },
  { codigoBarras: "7701007", nameProduct: "Pasta Espagueti Doria 500g", stock: 40, priceVenta: 3800, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["890102030-6"] },
  { codigoBarras: "7701008", nameProduct: "Atún Van Camp's en Aceite 160g", stock: 55, priceVenta: 7800, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900123456-1"] },
  { codigoBarras: "7701009", nameProduct: "Café Sello Rojo 500g", stock: 28, priceVenta: 14500, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900123456-1", "71234567"] },
  { codigoBarras: "7701010", nameProduct: "Panela Cuadrada El Trebol 1000g", stock: 20, priceVenta: 5200, categoriaNombre: "Abarrotes y Despensa", proveedoresDoc: ["900789456-1", "71234567"] },

  // Lácteos y Refrigerados
  { codigoBarras: "7702001", nameProduct: "Leche Entera Colanta 1000ml", stock: 50, priceVenta: 4200, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["890900123-2"] },
  { codigoBarras: "7702002", nameProduct: "Quesito Tradicional Colanta 400g", stock: 18, priceVenta: 9500, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["890900123-2", "890321654-2"] },
  { codigoBarras: "7702003", nameProduct: "Mantequilla con Sal Alpina 250g", stock: 22, priceVenta: 7300, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["890900123-2"] },
  { codigoBarras: "7702004", nameProduct: "Yogurt Melocotón Alquería 1000g", stock: 15, priceVenta: 8400, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["890900123-2"] },
  { codigoBarras: "7702005", nameProduct: "Crema de Leche Nestlé 295g", stock: 30, priceVenta: 5600, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["890900123-2"] },
  { codigoBarras: "7702006", nameProduct: "Queso Mozzarella Tajado 400g", stock: 16, priceVenta: 12800, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["890321654-2"] },
  { codigoBarras: "7702007", nameProduct: "Salchicha Manguera Zenú 500g", stock: 20, priceVenta: 9900, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["900456123-7"] },
  { codigoBarras: "7702008", nameProduct: "Jamón de Cerdo Pietrán 400g", stock: 14, priceVenta: 14200, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["900456123-7"] },
  { codigoBarras: "7702009", nameProduct: "Tocineta Ahumada Zenú 250g", stock: 12, priceVenta: 11300, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["900456123-7"] },
  { codigoBarras: "7702010", nameProduct: "Huevos Tipo AA Cubeta x30", stock: 25, priceVenta: 18500, categoriaNombre: "Lácteos y Refrigerados", proveedoresDoc: ["71234567"] },

  // Bebidas y Licores
  { codigoBarras: "7703001", nameProduct: "Gaseosa Coca-Cola 1.5L No Retornable", stock: 35, priceVenta: 6500, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900567890-3"] },
  { codigoBarras: "7703002", nameProduct: "Gaseosa Postobón Manzana 2.5L", stock: 28, priceVenta: 7200, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900567890-3"] },
  { codigoBarras: "7703003", nameProduct: "Agua Mineral Cristal sin Gas 600ml", stock: 60, priceVenta: 2000, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900567890-3"] },
  { codigoBarras: "7703004", nameProduct: "Jugo Hit Mora 500ml", stock: 40, priceVenta: 3200, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900567890-3", "901987654-3"] },
  { codigoBarras: "7703005", nameProduct: "Cerveza Águila Original Lata 330ml", stock: 72, priceVenta: 3500, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900890123-8"] },
  { codigoBarras: "7703006", nameProduct: "Cerveza Club Colombia Dorada Lata 330ml", stock: 48, priceVenta: 4200, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900890123-8"] },
  { codigoBarras: "7703007", nameProduct: "Aguardiente Antioqueño Azul 750ml", stock: 15, priceVenta: 46000, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900890123-8"] },
  { codigoBarras: "7703008", nameProduct: "Ron Medellín Añejo 3 Años 750ml", stock: 12, priceVenta: 48500, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900890123-8"] },
  { codigoBarras: "7703009", nameProduct: "Bebida Energizante Vive 100 240ml", stock: 50, priceVenta: 2500, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900567890-3"] },
  { codigoBarras: "7703010", nameProduct: "Té Hatsu Blanco 400ml", stock: 24, priceVenta: 5800, categoriaNombre: "Bebidas y Licores", proveedoresDoc: ["900567890-3"] },

  // Cuidado Personal y Aseo
  { codigoBarras: "7704001", nameProduct: "Detergente en Polvo Fab 1000g", stock: 30, priceVenta: 10500, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["860012345-4"] },
  { codigoBarras: "7704002", nameProduct: "Blanqueador Clorox Regular 1000ml", stock: 40, priceVenta: 4800, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["860012345-4"] },
  { codigoBarras: "7704003", nameProduct: "Jabón Lavaplatos Axion Limón 450g", stock: 35, priceVenta: 5200, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["860012345-4"] },
  { codigoBarras: "7704004", nameProduct: "Suavizante Soflan Primavera 1000ml", stock: 25, priceVenta: 9800, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["860012345-4"] },
  { codigoBarras: "7704005", nameProduct: "Papel Higiénico Familia Acolchomax x4", stock: 45, priceVenta: 7900, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["860012345-4"] },
  { codigoBarras: "7704006", nameProduct: "Jabón de Baño Protex Antibacterial 110g", stock: 50, priceVenta: 3600, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["901654321-9"] },
  { codigoBarras: "7704007", nameProduct: "Shampoo Head & Shoulders Limpieza 375ml", stock: 18, priceVenta: 19500, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["901654321-9"] },
  { codigoBarras: "7704008", nameProduct: "Crema Dental Colgate Triple Acción 150ml", stock: 40, priceVenta: 6200, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["901654321-9"] },
  { codigoBarras: "7704009", nameProduct: "Desodorante Rexona Clinical Men 48g", stock: 15, priceVenta: 21000, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["901654321-9"] },
  { codigoBarras: "7704010", nameProduct: "Toallas Higiénicas Nosotras Invisible x10", stock: 30, priceVenta: 6400, categoriaNombre: "Cuidado Personal y Aseo", proveedoresDoc: ["901654321-9"] },

  // Mecato y Confitería
  { codigoBarras: "7705001", nameProduct: "Papas Fritas Margarita Natural 105g", stock: 30, priceVenta: 5500, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["901234567-5"] },
  { codigoBarras: "7705002", nameProduct: "Platanitos Maduros Natuchips 85g", stock: 25, priceVenta: 4200, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["901234567-5"] },
  { codigoBarras: "7705003", nameProduct: "Doritos Mega Queso 115g", stock: 28, priceVenta: 5800, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["901234567-5"] },
  { codigoBarras: "7705004", nameProduct: "Galletas Festival Fresa Taco 408g", stock: 35, priceVenta: 6200, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["800123987-0"] },
  { codigoBarras: "7705005", nameProduct: "Galletas Saltín Noel Tradicional Taco x3", stock: 40, priceVenta: 7800, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["800123987-0"] },
  { codigoBarras: "7705006", nameProduct: "Chocolatina Jet Tradicional 12g", stock: 100, priceVenta: 800, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["800123987-0"] },
  { codigoBarras: "7705007", nameProduct: "Chocoramo Tradicional 65g", stock: 45, priceVenta: 2800, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["800123987-0"] },
  { codigoBarras: "7705008", nameProduct: "Gomitas Trululu Aros 90g", stock: 30, priceVenta: 3200, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["800123987-0"] },
  { codigoBarras: "7705009", nameProduct: "Maní con Pasas La Especial 180g", stock: 20, priceVenta: 7400, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["901234567-5"] },
  { codigoBarras: "7705010", nameProduct: "Barra de Cereal Tosh Frutos Rojos 138g", stock: 22, priceVenta: 8900, categoriaNombre: "Mecato y Confitería", proveedoresDoc: ["800123987-0"] }
];

async function main() {
  console.log('--- 1. Insertando Categorías ---');
  const categoriasMap = new Map();
  for (const cat of categoriasData) {
    let categoria = await prisma.categoria.findFirst({
      where: { nameCategorie: cat.nameCategorie }
    });
    if (!categoria) {
      categoria = await prisma.categoria.create({ data: cat });
    }
    categoriasMap.set(cat.nameCategorie, categoria.id);
  }

  console.log('--- 2. Insertando Proveedores ---');
  for (const prov of proveedoresData) {
    await prisma.supplier.upsert({
      where: { documento: prov.documento },
      update: {},
      create: prov
    });
  }

  console.log('--- 3. Insertando Productos ---');
  for (const item of productosData) {
    const categoriaId = categoriasMap.get(item.categoriaNombre);

    await prisma.product.upsert({
      where: { codigoBarras: item.codigoBarras },
      update: {
        nameProduct: item.nameProduct,
        stock: item.stock,
        priceVenta: item.priceVenta,
        categoriaId: categoriaId
      },
      create: {
        codigoBarras: item.codigoBarras,
        nameProduct: item.nameProduct,
        stock: item.stock,
        priceVenta: item.priceVenta,
        categoria: {
          connect: { id: categoriaId }
        },
        suppliers: {
          connect: item.proveedoresDoc.map((doc) => ({ documento: doc }))
        }
      }
    });
  }

  console.log('¡Base de datos poblada exitosamente (Categorías, Proveedores y 50 Productos)!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });