let util=require("util");
let mysql = require("mysql");
const db = require("../../db");
module.exports={
    addrental: (req,res)=>{
        let data=req.body;
        let sql ="insert into rental SET ?";
        
        db.query(sql,[data],(err,response)=>{
            if(err){
                throw err;
            }
            else res.send("true");
        })
    },
    getrental: (req,res)=>{
        let sql = "call rentalTrack()"
        db.query(sql);

        db.query(sql,(err,response)=>{
            if(err) throw err;
        })
        sql = "select * from rental inner join owner on rental.ownerId = owner.ownerId inner join car on car.carId = rental.carId where customerId = "+ req.params.customerId + " order by rental.endDate desc";
        
        db.query(sql,(err,response)=>{
            if(err){ 
                throw err;
            }
            else {
                
                res.json(response);
            }
        }) 
    },
    getRentalPerMonth: (req,res)=>{
        let month = req.params.month;
        let year = req.params.year;
        let sql="select * from rental where month(endDate) = "+month+" year(endDate)= "+year;
        db.query(sql,(err,response)=>{
            if(err) throw err;
            else res.send(response);
        })
    },
    confirmCar: (req,res)=>{
        let carId = req.params.carId;
        let sql = "select * from rental where carId = '"+ carId + "' and isDelete = 0";
        
        db.query(sql,(err,response)=>{
            if(err) throw err;
            else if(response == undefined){
                res.send("false");
            }
            else {
                res.send(response.length!=0)
            }
        })

    }
}