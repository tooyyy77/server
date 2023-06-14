const express = require('express')
const router = express.Router()
const db = require('../../db/db')
const moment = require('moment')

router.use(express.json())
router.use(express.urlencoded({extends:true}))

const articleController = {
  // 获取文章列表
  async getArticle(req, res) {
    try{
      const data= await db.Article.find({}).sort({_id: -1})
      return res.json({
        code: '0000',
        data
      })
    }catch(err){
      console.log(err)
      return res.json({
        code: '2001',
        msg: '读取文章列表失败！'
      })
    }
  },
  // 获取文章内容
  async getArticleById(req, res) {
    try{
      const data= await db.Article.findById({_id: req.params.id})
      return res.json({
        code: '0000',
        data
      })
    }catch(err){
      return res.json({
        code: '2002',
        msg: '读取文章内容失败！'
      })
    }
  },
  // 添加文章
  async addArticle(req, res) {
    try{
      let date = moment().format('YYYY-MM-DD HH:mm:ss')
      const data= await new db.Article({date,...req.body.articleInformation}).save()
      return res.json({
        code: '0000',
        msg: '添加文章成功!',
        data
      })
    }catch(err){
      return res.json({
        code: '2003',
        msg: '添加文章失败!',
      })
    }
  },
  // 更新文章
  async updateArticle(req, res) {
    try{
      const data= await db.Article.findByIdAndUpdate(req.params.id,{...req.body.articleInformation})
      return res.json({
        code: '0000',
        msg:'更新文章成功!',
        data
      })
    }catch(err){
      console.log(err)
      return res.json({
        code: '2004',
        msg: '更新文章失败!'
      })
    }
  },
  // 删除文章
  async deleteArticle(req, res) {
    try{
      const data = await db.Article.deleteOne({_id:req.params.id})
      return res.json({
        code: '0000',
        msg: '删除文章成功!',
        data
      })
    }catch(err){
      return res.json({
        code: '2005',
        msg: '删除文章失败!'
      })
    }
  },
  // 根据文章标题模糊搜索
  async searchByTitle(req, res) {
    try {
      const titleRegex = new RegExp(req.params.title, 'i');
      const data = await db.Article.find({ title: titleRegex });
      return res.json({
        code: '0000',
        data
      });
    } catch (err) {
      return res.json({
        code: '2005',
        msg: '搜索文章失败！'
      });
    }
  }
}

module.exports =  articleController