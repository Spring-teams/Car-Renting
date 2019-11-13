let util=require("util");
let mysql = require("mysql");
const db = require("../../db")
let isLogin = false;
let currentOwnerId;
module.exports={
    curr: (req,res)=>{
        let sql = "select * from owner where ownerId = 1234";
        // console.log(sql);
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    },
    get: (req,res)=>{
        let sql = "select * from owner where ownerId = 1234";
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    },
    confirmOwner: (req,res)=>{
        let body = req.body;
        let sql = "select * from owner where ownerId = "+ body['ownerId']+ " and pass = "+ body['pass']; 
        console.log(sql);
        db.query(sql,(err,response)=>{
            if(!response.length){
                isLogin=false;
                res.send("false")
            }
            else {
                isLogin=true;
                currentOwnerId=body['customerId']
                res.send("true");
            }
        })  
    },
    checkLogin: (req,res)=>{
        res.send(isLogin);
    },
    doLogout: (req,res)=>{
        isLogin=false;
        res.send("true")
    },
    getCustomer: (req,res)=>{
        let sql = "select * from customer inner join rental on customer.customerId = rental.customerId  inner join car on car.carId = rental.carId where rental.ownerId = 1234 order by customer.customerId ";
         
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    },
    addCarByOwner:(req,res)=>{
        let body=req.body;
        console.log(req.file)
    }
}
