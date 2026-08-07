// prisma 
import prisma from "../lib/prisma.js";

class UserServices {
    async getAllUser(){
        const users = await prisma.user.findMany(); // consulta todos los  usuarios. 
        return users; // retorna el objeto al controlador
    }
}


// exportamos la clase, y la inicializamos antes de exportarla por default. 

export default new UserServices();