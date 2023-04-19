const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multerUpload')
router.use(express.json())
router.use(express.urlencoded({extends:true}))

// 解决跨域
const cors = require('cors');
router.use(cors())

// 引入中间件
const checkTokenMiddleware = require("../middlewares/checkTokenMiddleware")
// 引入接口相关方法
const articleController = require('./controller/articleController')
const labelController = require('./controller/labelController')
const userController = require('./controller/userController')

// 文章相关接口
router.get('/article', articleController.getArticle)
router.get('/article/:id', articleController.getArticleById)
router.post('/article',checkTokenMiddleware, articleController.addArticle)
router.put('/article/:id', checkTokenMiddleware,articleController.updateArticle)
router.delete('/article/:id',checkTokenMiddleware, articleController.deleteArticle)
router.get('/article/search/:title', articleController.searchByTitle);

// 标签相关接口
router.get('/label', labelController.getLabel);
router.get('/label/:label',labelController.getLabelbyName)

// 登录相关接口
router.post("/login",checkTokenMiddleware,userController.login);

// 文件上传相关接口
router.post("/upload",upload.single('image'),function (req,res,next){
    const imageUrl = 'http://' + req.headers.host + '/uploads/' + req.file.filename;
    return res.json({
        code:'0000',
        data:{url:imageUrl}
    })
})





module.exports = router