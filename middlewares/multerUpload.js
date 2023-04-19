const multer = require('multer');
const path  = require('path');

// 设置文件上传的目录和文件名
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'public/uploads');
    },
    filename: function(res,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

// 创建multer实例
const upload = multer({ storage });
module.exports = upload