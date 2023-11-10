import { Error } from "../error/error.js";
import config from "../config/config.js";
import jwt from 'jsonwebtoken';
import mailer from '../utils/mailer.js';
import passport from 'passport';
import User from "../models/user.js";
import { Strategy as LocalStrategy } from 'passport-local';
import userRepository from "../repositories/userRepository.js";
import userDataValidation from "../validations/userDataValidation.js";

let instance = null;

class UserService{
    constructor(){
        this.container = userRepository;
        passport.use('local-login', new LocalStrategy(
            {
                usernameField: 'email'
            },
            (username, password, done) => {
                this.container.getItemByCriteria({email: username}).then((user)=>{
                    if(user){
                        const originalPassword = jwt.verify(user.getPassword(), config.SESSION.secret)
                        if (password !== originalPassword) {
                            return done(null, false)
                        }
                        done(null, user)
                    }
                    else{
                        return done(null, false)
                    }
                })
            })
        )
    }
    serializeUserMongo = (user, done) => {
        done(null, user.getID());
    }
    deserializeUserMongo = async (id, done) => {
        const user = await this.container.getItemByID(id)
        done(null, user.toDTO())
    }
    registerUser = async (information) => {
        userDataValidation(information);
        let user = new User({
            name: information.name,
            lastname: information.lastname,
            email: information.email,
            phone: information.phone,
            password: jwt.sign(information.password, config.SESSION.secret),
            title: "",
            experience: ""
        })
        return this.container.save(user).then((userID)=>{
            // mailer.send({
            //     to: information.email,
            //     subject: 'nuevo registro!',
            //     text: `nuevo registro: ${JSON.stringify(user.toDTO())}`
            // })
            return userID;
        }).catch((error)=>{            
            throw new Error(error, 'INTERNAL_ERROR')
        });
    }
    loginUser = async (email) => {
        let user = await this.container.getItemByCriteria({email: email})
        if(!user){
            throw new Error(`The server could not validate the credentials`, 'FORBIDDEN')
        }
        return user.getEmail();
    }
    getUserInformation = async (email) => {
        let user = await this.container.getItemByCriteria({email: email})
        if(!user){
            throw new Error(`No user was found with the email ${email}`, 'NOT_FOUND');
        }            
        return user.toDTO();
    }
    checkExistingUser = async (email) => {
        let userFound = await this.container.getItemByCriteria({email: email});
        return (userFound !== null && userFound.length !== 0)
    }
    getUser = async (email) => {
        return await this.container.getItemByCriteria({email: email})
    }
    updateUser = async (userID, user) => {
        userDataValidation(user);
        let {id, email, password, name, lastname, phone, title, experience} = user;
        let userData = await this.container.getItemByID(userID);
        let userFound = (userData !== null)
        if(!userFound){
            throw new Error(`The specified user could not be found ${userID}`, 'CONFLICT');
        }
        let newUser = new User({
            name: name,
            lastname: lastname,
            email: email,
            phone: phone,
            password: jwt.sign(password, config.SESSION.secret),
            title: title,
            experience: experience
        })
        await this.container.modifyByID(id, newUser).then((status)=>{
            // mailer.send({
            //     to: email,
            //     subject: 'usuario actualizado!',
            //     text: `usuario actualizado: ${JSON.stringify(newUser.toDTO())}`
            // })
            return status;
        }).catch((error)=>{            
            throw new Error(error, 'INTERNAL_ERROR')
        });
    }
    resetPassword = async (userID) => {
        let user = await this.container.getItemByID(userID)
        if(!user){
            throw new Error(`No user was found with the id ${userID}`, 'NOT_FOUND')
        }
        user.setPassword(jwt.sign("default", config.SESSION.secret))
        await this.container.modifyByID(userID, user).then((status)=>{
            // mailer.send({
            //     to: user.getEmail(),
            //     subject: 'contraseña actualizada!',
            //     text: `Nueva contraseña para el usuario: 'default'`
            // })
            return status;
        }).catch((error)=>{            
            throw new Error(error, 'INTERNAL_ERROR')
        });
    }
    getUserByID = async (userID) => {
        let user = await this.container.getItemByID(userID)
        if(!user){
            throw new Error(`No user was found with the id ${userID}`, 'NOT_FOUND')
        }
        return user.toDTO();
    }
    static getInstance(){
        if(!instance){
            instance = new UserService();
        }
        return instance;
    }
}
export default UserService.getInstance();