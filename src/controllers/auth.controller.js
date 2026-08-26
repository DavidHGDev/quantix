import authServices from "../services/auth.services.js";

export const authLogin = async (req, res, next) => {
    const data = req.body;
    const userLogin = await authServices.login(data);
    res.status(200).json(userLogin);
}