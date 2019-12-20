
const db = require("../../db")

let isLogin = false;
module.exports={
    confirm : (req,res)=>{
        let body = req.body;
        if(body['customerId']=="spring" && body['pass']=="vietnam"){
            res.send("true");
            isLogin = true;
        }
        else res.send("false");
    },
    getAllCustomer: (req,res)=>{
        let sql = "select * from customer";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            else res.json(response)
        })
    },
    getAllOwner: (req,res)=>{
        let sql = "select * from owner";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            else res.json(response);
        })
    },
    checkLogin : (req,res)=>{
        res.send(isLogin);
    },
    doLogout: (req,res)=>{
        isLogin=false;
        res.send(true)
    },
    getbenifite: (req,res)=>{
        let year = req.params.year;
        let sql = "select month(beginDate) as month, sum(totalmoney) as total from rental where year(beginDate) = "+year+"  and isDelete =0 and isConfirm =1  group by month(beginDate)";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            else res.json(response);
        })
    },
    getBranchAnalysis: (req,res)=>{
        let year = req.params.year;
        let sql = "select car.branch as branch, sum(rental.totalmoney) as total from rental inner join car  on rental.carId = car.carId   where year(beginDate) = "+year+" and rental.isDelete = 0 and rental.isConfirm =1  group by car.branch order by car.branch";
        db.query(sql,(err,response)=>{
            if(err) throw err;
            res.json(response);
        })
    },
    getAnalysis: (req,res)=>{
        let id = req.params.id;
        let year = req.params.year;
        let sql = "select count(rentalId) as num, sum(totalmoney) as totalmoney from rental  where isConfirm = 1 and isDelete = 0 and year(beginDate) = "+ year;
        db.query(sql,(err,response)=>{
            if(err) throw err;
            res.json(response);
        });
    },
    disableCustomer: (req,res)=>{
        let body = req.body;
        let sql = "update customer set isCustomerActive = 0 where customerId = "+body['customerId'];
        db.query(sql,(err,response)=>{
            if(err){
                res.send(false);
            }
            else res.send(true)
        })
        
    },
    activeCustomer: (req,res)=>{
        let body=req.body;
        let sql = "update customer set isCustomerActive = 1 where customerId = "+body['customerId'];
        db.query(sql,(err,response)=>{
            if(err){
                res.send(false);
            }
            else res.send(true)
        })
    },
    disableOwner: (req,res)=>{
        let body = req.body;
        let sql = "update owner set isOwnerActive = 0 where ownerId = "+body['ownerId'];
       
        db.query(sql,(err,response)=>{
            if(err){
                res.send(false);
            }
            else res.send(true)
        })

    },
    activeOwner: (req,res)=>{
        let body = req.body;
        let sql = "update owner set isOwnerActive = 1 where ownerId = "+body['ownerId'];
        db.query(sql,(err,response)=>{
            if(err){
                res.send(false);
            }
            else res.send(true)
        })

    }
    
}