let util = require("util");
const mysql = require("mysql");
const db=require("../../db");
let isLogin= false;
let currentCusId;
module.exports={
    get: (req,res)=>{
        let sql="select * from customer where customerId = "+ currentCusId;
        db.query(sql, (err, response) => {
            if (err) throw err;
            
            res.json(response);
        })
    },
    confirmUser: (req,res)=>{
        let body = req.body;
        
        let sql = "select * from customer where customerId= "+body['customerId']+" and pass="+body['pass'];
        
        db.query(sql,(err,response)=>{
            if(response == undefined){
                res.send("false")
            }
            else {
                if(!response.length){
                    isLogin=false;
                    res.send("false")
                }
                else {
                    isLogin=true;
                    currentCusId=body['customerId']
                    res.send("true");
                }
            }
            
        }) 
    },
    updateCustomerInfo:(req,res)=>{
        let body= req.body;
        currentCusId=body['customerId'],
        sql = "update rental set customerId = '"+body['customerId']+"' where customerId = '"+body['old_id']+"' ;";
        db.query(sql);
        sql = "delete from customer where customerId='"+body['old_id']+"' ;";
        db.query(sql);
        delete body['old_id']
        body['birthday']=body['birthday'].slice(0,10);
        sql = "insert into customer SET ? ";
        db.query(sql,[body],(err,response)=>{
            if(err) throw err ;
            else res.send("true");
        });
        
    },
    checkLogin: (req,res)=>{
        res.send(isLogin);
    },
    doLogout: (red,res)=>{
        isLogin= false;
    }
}