let util=require("util");
let mysql = require("mysql");
const db = require("../../db")
const multer = require("multer");
let isLogin = false;
var currentOwnerId="1234";
let carId ="0";
var storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        switch (file.mimetype) {
            case 'image/jpeg':
                ext = '.jpeg';
                break;
            case 'image/png':
                ext = '.png';
                break;
        }
        cb(null, file.originalname);
    }
});
var upload=multer({storage: storage}).single("myImage");

var carName;
module.exports={
    curr: (req,res)=>{
        let sql = "select * from owner where ownerId = '"+currentOwnerId+"'";
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
        let sql = "select * from owner where ownerId = "+ body['customerId']+ " and pass = "+ body['pass']; 
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
    addImageCar:(req,res)=>{
        upload=multer({storage: storage}).single("myImage");
        
        upload(req,res,(err)=>{
            res.send("true")
        })

    },
    addCarByOwner: (req,res)=>{
        let body=req.body
       
        body['ownerId']=currentOwnerId;
        console.log(body)
        let sql ="update rental set carId = '"+body['carId'] +"' where carId = '"+body['old_carId']+"'";
        db.query(sql);
        if(typeof body['old_carId']!="undefined"){
            sql = "delete from car where carId = '"+ body['old_carId']+"'";
            db.query(sql);
        }
        
        delete body['old_carId'];
        delete body['categoryName']
        sql = "insert into car (carId,categoryId,ownerId,price,carName,branch,numberSeat,image,createTime) values('"+body['carId']+"',"+body['categoryId']+",'"+body['ownerId']+"',"+body['price']+",'"+body['carName']+"','"+body['branch']+"',"+body['numberSeat']+",'"+body['image']+"',now());";
        console.log(sql);
        db.query(sql,(err,response)=>{
            res.send("ok");
        })
    },
    updateOwner: (req,res)=>{
        let body= req.body;
        currentCusId=body['customerId'];
        let sql = "alter table rental drop foreign key `rental_ibfk_2`";
        db.query(sql);
        sql = "update rental set ownerId = '"+body['ownerId']+"' where ownerId = '"+body['old_id']+"' ;";
        db.query(sql);
        body['birthday']=body['birthday'].slice(0,10);

        // if(body['customerId']==body['old_id']){
        //     sql ="update customer set name='"+body['name']+"',phone="+body['phone']+",pass='"+body['pass']+"',companyName='"+body['companyName']+"',birthday='"+body['birthday']+"',email='"+body['email']+"'";
        //     db.query(sql,(err,response)=>{
        //         if(err) throw err;
        //         res.send("true");
        //         return;
        //     })
        // }
        console.log(sql)
        sql ="alter table car drop foreign key `car_ibfk_1`"
        db.query(sql);
        sql = "update car set ownerId = '"+body['ownerId']+"' where ownerId = '"+body['old_id']+"' ;";
        db.query(sql);
        sql = "delete from owner where ownerId='"+body['old_id']+"' ;";
        db.query(sql);
        delete body['old_id']
        sql = "insert into owner SET ? ";
        db.query(sql,[body],(err,response)=>{
            if(err) throw err ;
            else {
                sql ="ALTER TABLE rental ADD CONSTRAINT rental_ibfk_2 FOREIGN KEY (ownerId) REFERENCES owner(ownerId);"
                db.query(sql);
                sql ="ALTER TABLE car ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (ownerId) REFERENCES owner(ownerId);"
                db.query(sql);
                res.send("true");
            }
        });
        

    },
    checkExist: (req,res)=>{
        let id = req.params.ownerId;
        let sql = "select * from owner where ownerId = "+ id;
        db.query(sql,(err,response)=>{
            res.send(response.length!=0)
        })
    }
}
