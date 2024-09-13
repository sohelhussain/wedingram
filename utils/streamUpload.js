const { Readable } = require('stream');
const cloudinary = require('../config/cloudinaryConfig');



function bufferToStream(buffer) {
    const readable = new Readable({
        read() {
            this.push(buffer);
            this.push(null); 
        }
    });
    return readable;
}


const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });
        bufferToStream(req.file.buffer).pipe(stream);
    });
};

module.exports = streamUpload;