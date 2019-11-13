let util=require("util");
let mysql = require("mysql");
const db = require("../../db");
module.exports={
    addrental: (req,res)=>{
        let data=req.body;
        let sql ="insert into rental SET ?";
        console.log(sql);
        db.query(sql,[data],(err,response)=>{
            if(err){
                throw err;
            }
            else res.send("true");
        })
    },
    getrental: (req,res)=>{
        let sql = "select * from rental where customerId = "+ req.params.customerId;
        db.query(sql,(err,response)=>{
            if(err){
                throw err;
            }
            else res.json(response);
        })
    }
}