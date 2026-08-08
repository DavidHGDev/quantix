import userServices from "../services/user.services.js";

export async function getUser(req, res){
    const usuarios = await userServices.getAllUser();
    console.log(usuarios)
    res.status(201).json(usuarios);
}

export async function createUser(req, res) {
    
}