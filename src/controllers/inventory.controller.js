import inventoryServices from '../services/inventory.services.js';

// --- CATEGORÍAS ---
export async function getCategories(req, res) {
    const categories = await inventoryServices.getCategories();
    res.status(200).json(categories);
}

export async function createCategory(req, res) {
    const category = await inventoryServices.createCategory(req.body);
    res.status(201).json(category);
}

// --- PROVEEDORES ---
export async function getSuppliers(req, res) {
    const { search, page, limit, all } = req.query;
    
    // Si viene con parámetros de paginación o búsqueda (Para la tabla principal)
    if (page || limit || search) {
        const result = await inventoryServices.getSuppliers({
            search,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
            includeInactive: all === 'true'
        });
        return res.status(200).json(result);
    }
    
    // Si no hay parámetros (Para el modal de productos o compras), traemos la lista plana
    const suppliers = await inventoryServices.getSuppliersFlat();
    res.status(200).json(suppliers);
}

export async function createSupplier(req, res) {
    const supplier = await inventoryServices.createSupplier(req.body);
    res.status(201).json(supplier);
}

export async function updateSupplier(req, res) {
    const id = Number(req.params.id);
    const updated = await inventoryServices.updateSupplier(id, req.body);
    res.status(200).json(updated);
}

// --- PRODUCTOS ---
export async function getProducts(req, res) {
    const { search, page, limit, all } = req.query;
    const result = await inventoryServices.getProducts({ 
        search, 
        page: page ? Number(page) : 1, 
        limit: limit ? Number(limit) : 10, 
        includeInactive: all === 'true' 
    });
    res.status(200).json(result);
}

export async function createProduct(req, res) {
    const product = await inventoryServices.createProduct(req.body);
    res.status(201).json(product);
}

export async function updateProduct(req, res) {
    const id = Number(req.params.id);
    const product = await inventoryServices.updateProduct(id, req.body);
    res.status(200).json(product);
}

export async function toggleProduct(req, res) {
    const id = Number(req.params.id);
    const { isActive } = req.body;
    const product = await inventoryServices.toggleProductStatus(id, isActive);
    res.status(200).json(product);
}