//import dotenv from 'dotenv';
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthLogin {
    async login(data){
        const { email, password } = data;
        const usuario = await prisma.user.findUnique({
            where: { email }
        });

        //validar si el usuario existe
        if(!usuario) {
            const error = new Error(`Usuario o contraseña incorrecta. Contacte al Administrador`);
            error.statusCode = 401;
            throw error;
        }

        //validar si el usuario está activo
        if(!usuario.isActive){
            const error = new Error('Usuario Inactivo. Contacte al Administrador');
            error.statusCode = 403;
            throw error;    
        }

        // validar usuario y contraseña 
        const compareExitoso = await bcrypt.compare(password, usuario.password);

        if(!compareExitoso) {
            const error = new Error(`Usuario o contraseña incorrecta. Contacte al Administrador`);
            error.statusCode = 401;
            throw error;
        }

        // Se crea el payload con la información para crear el token
        const payload = {
            id: usuario.id,
            role: usuario.role,
            name: usuario.firstName
        }

        //Se crea el token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h'}
        )

        return {
            usuario: {
                id: usuario.id,
                name: usuario.firstName,
                role: usuario.role,
                email: usuario.email
            },
            token
        };
    }
}

export default new AuthLogin;