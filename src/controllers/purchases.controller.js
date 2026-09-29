import purchasesServices from '../services/purchases.services.js';

export async function getAllOrders(req, res, next) {
    const orders = await purchasesServices.getOrders();
    res.status(200).json(orders);
}

export async function getOrder(req, res, next) {
    const id = Number(req.params.id);
    const order = await purchasesServices.getOrderById(id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.status(200).json(order);
}

export async function createOrder(req, res, next) {
    const userId = req.usuario.id; // Del middleware verificarToken
    const newOrder = await purchasesServices.createOrder(userId, req.body);
    res.status(201).json(newOrder);
}

export async function updateOrder(req, res, next) {
    const id = Number(req.params.id);
    const updatedOrder = await purchasesServices.updatePendingOrder(id, req.body);
    res.status(200).json(updatedOrder);
}

export async function updateOrderStatus(req, res, next) {
    const id = Number(req.params.id);
    const { estado } = req.body;
    const result = await purchasesServices.changeOrderStatus(id, estado);
    res.status(200).json({
        message: `Orden marcada como ${estado} exitosamente`,
        order: result
    });
}