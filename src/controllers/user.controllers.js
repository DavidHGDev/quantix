import userServices from "../services/user.services.js";

export async function getUser(req, res){
    try {
        const usuarios = await userServices.getAllUser();
        console.log(usuarios)
        res.status(201).json(usuarios);
    } catch (error) {
        console.error(error)
    }
}