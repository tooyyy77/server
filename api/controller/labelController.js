const express = require('express')
const router = express.Router()
const db = require('../../db/db')

const labelController = {
    async getLabel (req, res) {
        try {
          const labels = await db.Article.distinct('labels');
          return res.json({
            code: '0000',
            data: labels
          });
        } catch(err) {
          return res.json({
            code: '3002',
            msg: '获取标签集合失败！'
          });
        }
      },
      async getLabelbyName(req, res) {
        const label = req.params.label;
        try{
          const data= await db.Article.find({ labels: { $in: [label] } })
          return res.json({
            code: '0000',
            data
          })
        }catch(err){
          return res.json({
            code: '3001',
            msg: '标签不存在！'
          })
      
        }
      }
}
module.exports = labelController