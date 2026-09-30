import inventoryServices from '../services/inventory.services.js';

// --- CATEGORÍAS ---
export async function getCategories(req, res, next) {
    const categories = await inventoryServices.getCategories();
    res.status(200).json(categories);
}
export async function createCategory(req, res, next) {
    const category = await inventoryServices.createCategory(req.body);
    res.status(201).json(category);
}

// --- PROVEEDORES ---
export async function getSuppliers(req, res, next) {
// Extraemos los parámetros si existen (para la tabla principal)
    const { search, page, limit, all } = req.query;
    
    // Si hay parámetros de paginación, llamamos al servicio con ellos
    if (page || limit || search) {
        const result = await inventoryServices.getSuppliers({
            search,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
            includeInactive: all === 'true'
        });
        return res.status(200).json(result);
    }
    // Si no hay parámetros (ej. modal de órdenes de compra), traemos la lista plana
    const suppliers = await inventoryServices.getSuppliers();
    res.status(200).json(suppliers);
}
export async function createSupplier(req, res, next) {
    const supplier = await inventoryServices.createSupplier(req.body);
    res.status(201).json(supplier);
}

// --- PRODUCTOS ---
export async function getProducts(req, res, next) {
    const { search, page, limit, all } = req.query;
    const result = await inventoryServices.getProducts({ 
        search, 
        page, 
        limit, 
        includeInactive: all === 'true' 
    });
    res.status(200).json(result);
}

export async function createProduct(req, res, next) {
    const product = await inventoryServices.createProduct(req.body);
    res.status(201).json(product);
}

export async function updateProduct(req, res, next) {
    const id = Number(req.params.id);
    const product = await inventoryServices.updateProduct(id, req.body);
    res.status(200).json(product);
}

export async function toggleProduct(req, res, next) {
    const id = Number(req.params.id);
    const { isActive } = req.body;
    const product = await inventoryServices.toggleProductStatus(id, isActive);
    res.status(200).json(product);
}