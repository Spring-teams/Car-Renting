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
        // console.log(sql);
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
        let sql = "select * from customer inner join rental on customer.customerId = rental.customerId  inner join car on car.carId = rental.carId where rental.ownerId = '"+currentOwnerId+"' order by customer.customerId ";
        //  console.log(sql)
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    },
    addImageCar:(req,res)=>{
        
        upload=multer({storage: storage}).single("myImage");
        
        upload(req,res,(err)=>{
            if(err) throw err;
            res.send("true")
        })
    },
    addCarByOwner: (req,res)=>{
        let body=req.body
        body['ownerId']=currentOwnerId;
        // console.log(body)
        let sql ="update rental set carId = '"+body['carId'] +"' where carId = '"+body['old_carId']+"'";
        
        db.query(sql);
        if(typeof body['old_carId']!="undefined"){
            sql = "delete from car where carId = '"+ body['old_carId']+"'";
            db.query(sql);
        }
        
        delete body['old_carId'];
        delete body['categoryName']
        sql = "insert into car (carId,categoryId,ownerId,price,carName,branch,numberSeat,image,createTime,isActive,carIsDelete) values('"+body['carId']+"',"+body['categoryId']+",'"+body['ownerId']+"',"+body['price']+",'"+body['carName']+"','"+body['branch']+"',"+body['numberSeat']+",'"+body['image']+"',now(),1,0);";
        // console.log(sql);
        
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
    }, 
    deleteCar: (req,res)=>{
        let carId = req.params.carId;
        let sql = "update car set carIsDelete = 1 where carId = '"+carId+"'"
        // console.log(sql)
        db.query(sql,(err,response)=>{
            if(err) throw err;
            res.send("true")
        }) 
    },
    updateRental: (req,res)=>{
        let body = req.body
        let rental={};
        let sql ="delete from rental where rentalId = " + body['rentalId'];
        db.query(sql);
        sql = "insert into rental (rentalId,customerId,carId,ownerId,beginDate,endDate,totalMoney,isRent,isPay,isConfirm,address,isDelete) values("+
        body['rentalId']+",'"+body['customerId']+"','"+body['carId']+"','"+body['ownerId']+"','"+body['beginDate'].slice(0,10)+"','"+body['endDate'].slice(0,10)+"',"+body['totalmoney']+","+body['isRent']+","+body['isPay']+","+body['isConfirm']+",'"+body['address']+"',"+body['isDelete']+")";
        db.query(sql)
        res.send(true)
    },
    insert: (req,res)=>{
        let body=req.body;
        let customer= {};
        let sql = "insert into owner (ownerId,ownerName,phone,pass,companyName,birthday,email) values ( '"+body['id']+"','"+body['name']+"',"
                + body['phone']+",'"+body['pass']+"','"+body['companyName']+"','"+body['birthday']+"','"+body['email']+"')";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            isLogin=true;
            currentOwnerId=body['id'];
            res.send(true);
        })
    },
    getBefinitMonth:(req,res)=>{
        let id = req.params.id;
        let year = req.params.year;
        
        if(id==-1) id=currentOwnerId;
        let sql = "select month(beginDate) as month, sum(totalmoney) as total from rental where year(beginDate) = "+year +" and ownerId = "+id+" and isDelete =0  group by month(beginDate)";
        
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    },
    getAnalysisBranch: (req,res)=>{
        let id = req.params.id;
        let year = req.params.year;
        let sql = "select car.branch as branch, sum(rental.totalmoney) as total from rental inner join car  where rental.ownerId = "+id+" and year(beginDate) = "+year+" group by car.branch order by car.branch";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            res.json(response);
        })

    },
    getAnalysis: (req,res)=>{
        let id = req.params.id;
        let year = req.params.year;
        let sql = "select count(rentalId) as num, sum(totalmoney) as totalmoney from rental where isDelete = 0 and ownerId = "+ id+ " and year(beginDate) = "+ year;
        db.query(sql,(err,response)=>{
            if(err) throw err;
            res.json(response);
        });
    },
    getById: (req,res)=>{
        let id =req.params.id;
        let sql = "select * from owner where ownerId = "+id;
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    },
    getCustomerById: (req,res)=>{
        let id = req.params.id;
        let sql = "select * from customer inner join rental on customer.customerId = rental.customerId  inner join car on car.carId = rental.carId where rental.ownerId = '"+id+"' order by customer.customerId ";
        //  console.log(sql)
        db.query(sql,(err,response)=>{
            res.json(response)
        })
    }
}
