// prisma 
import bcrypt from 'bcrypt';
import prisma from "../lib/prisma.js";

class UserServices {
    #userSelect = {
        id: true,
        firstName: true,
        lastName: true,
        tipoDocumento: true,
        documento: true,
        email: true,
        role: true,
        isActive: true, 
    }

    async getUsers({ search, page = 1, limit = 10 }) {
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = search ? {
            OR: [
                { documento: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        const [data, total] = await Promise.all([
            prisma.user.findMany({ where, skip, take, orderBy: { id: 'desc' } }),
            prisma.user.count({ where })
        ]);
        return { data, pagination: { total, page: Number(page), totalPages: Math.ceil(total / take) || 1 } };
    }

    async getAllUser(){
        const users = await prisma.user.findMany({
            select: this.#userSelect
        }); // consulta todos los  usuarios. 
        return users; // retorna el objeto al controlador
    }

    async getOneUser(id){
        const user = await prisma.user.findUnique({
            where: { id }, select: this.#userSelect
        });
        return user;
        
    }

    async createUser(data){
        //crea usuarios
        const { firstName, lastName, tipoDocumento, documento, email, password, role } = data;
        const rountSalt = 10; // Se define la cantidad de rondas para crear el hash
        const hashPassword = await bcrypt.hash(password, rountSalt); //Se crea el hash

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                tipoDocumento,
                documento,
                email,
                role,
                password: hashPassword
            }, select: this.#userSelect // esto retorna los datos creados, excluyendo la contraseña. El select sirve para decir que campos mostrar
        });

        return newUser; //Retorna el usuario excluyendo la contraseña
    }

    async updateUser(id, data){
        const { firstName, lastName, email, tipoDocumento, documento, role, password } = data;

        const dataUpdate = { ...data }
        const rountSalt = 10;
        if(password){
            dataUpdate.password = await bcrypt.hash(password, rountSalt);
        }

        return await prisma.user.update({
            where: { id },
            data: dataUpdate,
            select: this.#userSelect
        })
    }


    async deleteUser(id){
        return await prisma.user.delete({
            where: { id }, select: this.#userSelect
        })

    }
}


// exportamos la clase, y la inicializamos antes de exportarla por default. 

export default new UserServices();