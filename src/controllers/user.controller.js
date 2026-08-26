import userServices from "../services/user.services.js";

export async function getUser(req, res, next){
    const usuarios = await userServices.getAllUser();
    console.log(usuarios)
    res.status(201).json(usuarios);
}

export async function createUser(req, res, next) {
    const user = req.body; // los datos que envía el usuario. Bien sea la data con body, o id con params. 
    const newUser = await userServices.createUser(user);

    //Se le da la respuesta al usuario en formato Json
    res.status(200).json(newUser); 
}

export async function getOneUser(req, res, next) {
    const { id } = req.params;
    const user = await userServices.getOneUser(id);
    res.status(200).json(user)
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const userUpdate = await userServices.updateUser(id, data);
    res.status(200).json(userUpdate);
}

export async function deleteUser(req, res, next) {
    const id = Number(req.params.id);
    const deleteUser = await userServices.deleteUser(id);
    res.status(200).json(deleteUser);
}