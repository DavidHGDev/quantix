export const errorHandler = (err, req, res, next) => {
    // 1) Mostrar el LOG en consola para los desarrolladores
    console.error(`[ERROR]: ${err.message} LOGS para desarrolladores ${err.stack}`);

    // 1.a) Mostrar errores de express (JSON mal formateado)
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).json ({
            status: 'Error',
            message: `El formato JSON es inválido, revisar errores en las comas y puntos`
        });
    }

    // 1.b) Error en la base de datos, por registro duplicado, código P2002
    if(err.code === 'P2002') {

        /**
         * En la sentencia err.meta?.tarjet, se utiliza el signo (?) dar un parámetros opcional, si existe meta hace la validación completa de err.meta.target y luego entrega
         * de acuerdo al condicional ternario, el texto plano gracias a join(). 
         */
        const targetField = err.meta?.target ? `(${err.meta.target.join(', ')})` : ``; //en su versión 7, no funciona

        //El código de status 409, que indica un conflicto. 
        return res.status(409).json({
            status: 'Error',
            message: `El registro ya existe en la DB ${targetField}` 
        })
    }

    //1.c) Registro no existe en DB. código P2025
    if(err.code === 'P2025'){
        return res.status(404).json({
            status: 'Error',
            message: `El registro no existe en la DB`
        })
    }


    // 2) capturar el statusCode, por defecto es (500)
    const statusCode = err.statusCode || err.status || 500;
    // 2.1) Enmascarar el error para producción en mensaje
    const messageError = statusCode === 500 ? 'Error interno del servidor, equipo técnico notificado.' : err.message;

    // 3) regresar la respuesta en formato JSON estandarizada. 
    res.status(statusCode).json({
        status: 'Error',
        statusCode: statusCode,
        message: messageError,

        //imprimir solo el stack cuando estemos en desarrollo. 
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
}