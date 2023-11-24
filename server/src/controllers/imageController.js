import logger from '../utils/logger.js';
import imageService from '../services/imageService.js';

let instance = null;

class ImageController{
    controllerPostImage = async (req, res, next) => {
        try{
            if(req instanceof Error){
                throw new Error('Failed to upload image to multer', 'INTERNAL_ERROR');
            }
            const cloudResponse = await imageService.uploadToCloud(req.file);
            logger.info(`POST REQUEST successful for image`);
            res.status(200).json(({ path: cloudResponse.secure_url }));
        }
        catch(error){
            next(error)
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