export const validarSchema = (schema, property = 'body') => {
    return (req, res, next) => {

        // valida el esquema pasando el método safeParse lo que viene en req[property], bien sea: ('body', 'params', 'query')
        const result = schema.safeParse(req[property]);

        //En el manejo de errores, solo ejecutamos si el result.success === false, en caso contrario nos vamos al paso último. 
        if(!result.success){

            //Extrae la lista de errores, y soporta issues o errors, que puede depender de la versión de zod. 
            const erroresDetectados = result.error.issues || result.error.errors || [];

            // Retorno la respuesta con status 400, con el mapeo de campos y mensajes. 
            return res.status(400).json({
                status: 'Error en la validación de datos',
                errors: erroresDetectados.map(err => ({
                    campo: err.path.join('.'),
                    message: err.message
                }))
            })
        }

        // Si la validación pasa, sobrescribimos la propiedad de req con la data limpia
        req[property] = result.data;

        // damos paso al siguiente middlware. 
        next(); 
    }
}