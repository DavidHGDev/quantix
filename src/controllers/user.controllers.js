import userServices from "../services/user.services.js";

export async function getUser(req, res){
    const usuarios = await userServices.getAllUser();
    console.log(usuarios)
    res.status(201).json(usuarios);
}

export async function createUser(req, res) {
    const user = req.body; // los datos que envía el usuario. Bien sea la data con body, o id con params. 
    const newUser = await userServices.createUser(user);

    //Se le da la respuesta al usuario en formato Json
    res.status(200).json(newUser); 
}

export async function deleteUser(req, res) {
    const id = Number(req.params.id);
    const deleteUser = await userServices.deleteUser(id);
    res.status(200).json(deleteUser);
}