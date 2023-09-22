import {INSTANCE as api} from "../controller/client.ts";

const prefix = "/users"

export function nuevoUsuario(user) {
    //return api.post(prefix + "/registration", {user})
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hi!');
        }, 1000);
    })
}