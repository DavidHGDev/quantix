import clientServices from '../services/client.services.js';

export async function getAllClien(req, res, next) {
    const clientes = await clientServices.getAllClien();
    res.status(200).json(clientes);
}

export async function getOneClient(req, res, next) {
    const id = Number(req.params.id);
    const cliente = await clientServices.getOneClient(id);
    
    if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
    }
    
    res.status(200).json(cliente);
}

export async function createClient(req, res, next) {
    // Verificar si el documento ya existe para no duplicar clientes
    const existeCliente = await clientServices.getOneClientForDocument(req.body.documento);
    if (existeCliente) {
        return res.status(400).json({ message: "Ya existe un cliente con este documento" });
    }

    const newClient = await clientServices.createClient(req.body);
    res.status(201).json(newClient);
}

export async function updateClient(req, res, next) {
    const id = Number(req.params.id);
    const updatedClient = await clientServices.updateClient(id, req.body);
    res.status(200).json(updatedClient);
}

export async function deleteClient(req, res, next) {
    const id = Number(req.params.id);
    const deletedClient = await clientServices.deleteClient(id);
    res.status(200).json({ 
        message: "Cliente inactivado correctamente",
        cliente: deletedClient 
    });
}

export async function getClientByDocument(req, res, next) {
    const { documento } = req.params;
    const cliente = await clientServices.getOneClientForDocument(documento);
    
    if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado con ese documento" });
    }
    
    res.status(200).json(cliente);
}

export async function getClientByEmail(req, res, next) {
    const { email } = req.params;
    const cliente = await clientServices.getOneClientForEmail(email);
    
    if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado con ese correo" });
    }
    
    res.status(200).json(cliente);
}