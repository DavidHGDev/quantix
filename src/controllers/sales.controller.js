import salesServices from '../services/sales.services.js';

// --- FACTURAS ---
export async function createSale(req, res, next) {
    const userId = req.usuario.id;
    const sale = await salesServices.createSale(userId, req.body);
    res.status(201).json(sale);
}

export async function getInvoices(req, res, next) {
    const { page, limit, clienteId } = req.query;
    const result = await salesServices.getInvoices({ page, limit, clienteId });
    res.status(200).json(result);
}

export async function getInvoiceById(req, res, next) {
    const id = Number(req.params.id);
    const invoice = await salesServices.getInvoiceById(id);
    if (!invoice) return res.status(404).json({ message: "Factura no encontrada" });
    res.status(200).json(invoice);
}

// --- CARTERA Y ABONOS ---
export async function getActiveCredits(req, res, next) {
    const { clienteId } = req.query;
    const credits = await salesServices.getActiveCredits({ clienteId });
    res.status(200).json(credits);
}

export async function addPayment(req, res, next) {
    const creditId = Number(req.params.id);
    const userId = req.usuario.id;
    const result = await salesServices.addPayment(creditId, userId, req.body);
    res.status(201).json(result);
}