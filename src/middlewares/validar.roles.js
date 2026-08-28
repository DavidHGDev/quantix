//Función para validar el rol del usuario y el rol permitido
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


export const permitirUserActualoAdmin = (req, res, next) => {
    const userActual = req.usuario;
    const userAEditar = Number(req.params.id);

    if(userActual && userActual.role === 'ADMIN'){
        //Si el rol es ADMIN, se da siguiente al siguiente middleware
        next();
    }

    if(userActual && userActual.id === userAEditar){
        //Si es el mismo usuario logueado, se da paso al siguiente middleware
        next();
    }

    res.status(403).json({
        status: 'Error',
        message: 'El usuario actual no tiene permisos para modificar'
    })
}