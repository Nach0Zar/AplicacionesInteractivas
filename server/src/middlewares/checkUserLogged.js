import { Error } from "../error/error.js";

export default function checkUserLogged(req, res, next) {
    console.log(req.cookies)
    if(!req.cookies.email){
        throw new Error('You need to be logged in to perform this action', 'FORBIDDEN')
    }
    next();
}