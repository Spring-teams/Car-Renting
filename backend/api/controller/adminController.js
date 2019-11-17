
const db = require("../../db")

let isLogin = false;
module.exports={
    getAllCustomer: (req,res)=>{
        let sql = "select * from customer";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            else res.json(response)
        })
    }
}