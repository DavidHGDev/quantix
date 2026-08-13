import jwt from 'jsonwebtoken';

export async function verificarToken(req, res, next) {
    // 1) buscar en los encabezados si existe el token
    const authHeader = req.headers['authorization'];

    // 2) se debe extraer el token, y se utiliza split('')[1] para extraer la segunda posición, primera (bearer token) segunda (token)
    const token = authHeader?.split(' ')[1]; // se puede utilizar el authHeader && para validar la primer condición o authHeader?.split esto indica que es opcional

    // 3) verificar si el token es válido, si no ha expirado. 
    if(!token){
        return res.status(400).json({message: 'Token inválido o caducado'})
    }

    // verificar el token con el secreto, decodificarlo. 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Regresar información al cliente con el usuario decodificado. 
    req.usuario = decoded;

    next();
}