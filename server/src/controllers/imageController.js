import { Error } from '../error/error.js';
import logger from '../utils/logger.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

let instance = null;

class ImageController{
    controllerPostImage = async (req, res, next) => {
        if(req instanceof Error){
            next(req);
        }
        try{
            const file = req.file
            logger.info(`POST REQUEST successful for image`);
            res.status(200).json({ path: file.filename });
        }
        catch(error){
            next(error);
        }
    }
    controllerGetImage = async (req, res, next) => {
        try{
            const fileName = req.params.name
            logger.info(`GET REQUEST successful for image`);
            const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)),"../..")
            var options = {
                root: path.join(__dirname, 'src/images'),
                dotfiles: 'deny',
                headers: {
                  'x-timestamp': Date.now(),
                  'x-sent': true
                }
              }
            res.status(200).sendFile(fileName, options);
        }
        catch(error){
            next(error);
        }
    }
    static getInstance(){
        if(!instance){
            instance = new ImageController();
        }
        return instance;
    }
}
export default ImageController.getInstance();