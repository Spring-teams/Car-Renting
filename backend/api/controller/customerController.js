let util = require("util");
const mysql = require("mysql");
const db=require("../../db");
let isLogin= false;
let currentCusId="'0'"
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
        
        let sql = "select * from customer where customerId= "+body['customerId']+" and pass="+body['pass'] + " and isCustomerActive =1;";
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
        currentCusId=body['customerId'];
        let sql = "alter table rental drop foreign key `rental_ibfk_1`";
        db.query(sql);
        sql = "update rental set customerId = '"+body['customerId']+"' where customerId = '"+body['old_id']+"' ;";
        db.query(sql);
        body['birthday']=body['birthday'].slice(0,10);
       
        db.query(sql);
        sql = "delete from customer where customerId='"+body['old_id']+"' ;";
        db.query(sql);
        delete body['old_id']
        sql = "insert into customer SET ? ";
        db.query(sql,[body],(err,response)=>{
            if(err) throw err ;
            else {
                sql ="ALTER TABLE rental ADD CONSTRAINT rental_ibfk_1 FOREIGN KEY (customerId) REFERENCES customer(customerId);"
                db.query(sql);
                res.send("true");
            }
        });
        
    },
    checkLogin: (req,res)=>{
        res.send(isLogin);
    },
    doLogout: (req,res)=>{
        isLogin= false;
    },
    checkExist: (req,res)=>{
        let id = req.params.customerId;
        let sql = "select * from customer where customerId = "+ id;
        db.query(sql,(err,response)=>{
            res.send(response.length!=0)
        })
    },
    insert: (req,res)=>{
        let body=req.body;
        let customer= {};
        let sql = "insert into customer (customerId,name,phone,pass,companyName,birthday,email) values ( '"+body['id']+"','"+body['name']+"',"
                + body['phone']+",'"+body['pass']+"','"+body['companyName']+"','"+body['birthday']+"','"+body['email']+"')";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            isLogin=true;
            currentCusId=body['id'];
            res.send(true);
        })
        
    },
    getById: (req,res)=>{
        let sql = "select * from customer where customerId = "+req.params.id;
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    },
    deleteOrder:(req,res)=>{
        let id = req.params.id;
        let sql = "update rental set isDelete = 1  where rentalId = " + id;
        db.query(sql,(err,response)=>{
            if(err) throw err;
            else res.send(true)
        }) 
    }
}