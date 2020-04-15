const multer = require('multer');
const path = require('path')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname,'..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)
            const reName = name.replace(/\s/g,'-');
            cb(null, `${reName}-${Date.now()}${ext}`)
        }
    })
};