export const errorHandler = (err, req, res, next) => {
    // 1) Mostrar el LOG en consola para los desarrolladores
    console.error(`[ERROR]: ${err.message}`);

    // 2) capturar el statusCode, por defecto es (500)
    const statusCode = err.status || 500;
    
    // 3) regresar la respuesta en formato JSON estandarizada. 
    res.status(statusCode).json({
        status: 'Error',
        statusCode: statusCode,
        message: err.message,

        //imprimir solo el stack cuando estemos en desarrollo. 
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
}