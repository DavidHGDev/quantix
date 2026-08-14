export const validacionRoles = (rolesPermitidos) => {
    return (req, res, next) => {
        const usuario = req.usuario;

        //verificar si el rol está dentro de los roles permitidos. 
        if(!rolesPermitidos.includes(usuario.role)){
            return res.status(403).json({
                message: `Acceso denegado. Los roles permitidos son ${rolesPermitidos.join(', ')}`
            })
        }

        next();
    }
}
