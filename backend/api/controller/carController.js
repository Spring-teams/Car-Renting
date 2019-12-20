let util = require("util");
let mysql = require("mysql");
const db = require("../../db");

module.exports={
    //dây nhé
    searchCar: (req,res)=>{
        let body ={};
        body['branch']= req.params.branch=="Tất cả"?"no":req.params.branch;
        body['category']=req.params.category=="Tất cả"?"no":req.params.category;
        body['numberSeat']=req.params.numberSeat=="Tất cả"?"no":req.params.numberSeat;
        
        let branch = body['branch']=='no'?"":" car.branch = '"+body['branch']+"'";
        let category=body['category']=='no'?"":" category.categoryId="+body['category']+"";
        let numberSeat=body['numberSeat']=='no'?"":" car.numberSeat="+body['numberSeat'];
        let isWhere=" where car.carIsDelete!=1 and car.carId not in (select carId from rental where isPay =0 and isDelete = 0 )";
        let isAnd=" and ";
        // console.log(body)
        if(body['branch']!="no" || body['category']!="no" || body['numberSeat']!="no"){
            isWhere+=" and ";
        }
        let sql = "select * from car inner join category on car.categoryId=category.categoryId inner join owner on car.ownerId=owner.ownerId"+isWhere+branch+(body['numberSeat']=="no" || body['branch']=='no'?" ":isAnd)+numberSeat+(body['category']=="no" ||(body['branch']=='no' && body['numberSeat']=='no')?" ":isAnd)+category;
        // console.log(sql);
        db.query(sql,(err,response)=>{
            res.send({
                count: response.length,
                cars: response
            });
        })
    },
    get:(req,res)=>{
        let sql = "select * from car inner join category on car.categoryId=category.categoryId inner join owner on car.ownerId=owner.ownerId where car.carIsDelete !=1 and car.carId not in (select carId from rental where isDelete=0 and isPay = 0 ) " ;

        db.query(sql,(err,response)=>{
            res.send({
                count: response.length,
                cars: response
            }); 
        })
    },
    getCarById:(req,res)=>{
        let carId = req.params.carid;
        let sql="select * from car inner join category on car.categoryId=category.categoryId  inner join owner on car.ownerId=owner.ownerId where carId = '"+ carId+"'";
    
        db.query(sql,(err,response)=>{
            if(err) throw err;
            res.json(response);
        })
    },
    getCarByOwnerId:(req,res)=>{
        
        let OwnerId = req.params.ownerId;
        if(typeof OwnerId ==='undefined'){
            
            res.send("false");
            
            return 
        }
        else {
            let sql = "select * from car inner join category on car.categoryId=category.categoryId where car.ownerId = '"+ OwnerId +"' and car.carIsDelete != 1 order by createTime desc";
            db.query(sql,(err,response)=>{
            if(err) throw err;
            res.json(response);
        })
        }
        
    },
    checkExist: (req,res)=>{
        let carId = req.params.carId;
        let sql = "select * from car where carId = '" + carId+"' and carIsDelete !=1 ";
        // console.log(carId)
        db.query(sql,(err,response)=>{
            res.send(response.length!=0);
        })
    },
    paging: (req,res)=>{
        let pageNumber = Number(req.params.pageNumber);
        let limit = Number(req.params.limit);

        pageNumber=(pageNumber-1)*limit;
        limit+=pageNumber;
        let sql = "select * from car inner join category on car.categoryId=category.categoryId inner join owner on car.ownerId=owner.ownerId where car.carIsDelete !=1 and car.carId not in (select carId from rental where isDelete=0 and isPay = 0 ) "
        +"order by car.createTime limit "+pageNumber+","+limit+";";
        
        db.query(sql,(err,response)=>{
            if(err) throw err;
            res.json({
                count: response.length,
                cars: response,
            })
        })
    },
	getSearchCarByPaging:(req,res)=>{
		let body ={};
        body['branch']= req.params.branch=="Tất cả"?"no":req.params.branch;
        body['category']=req.params.category=="Tất cả"?"no":req.params.category;
        body['numberSeat']=req.params.numberSeat=="Tất cả"?"no":req.params.numberSeat;
        let pageNumber = Number(req.params.pageNumber);
        let limit = Number(req.params.limit);

        pageNumber=(pageNumber-1)*limit;
        limit+=pageNumber;
        let branch = body['branch']=='no'?"":" car.branch = '"+body['branch']+"'";
        let category=body['category']=='no'?"":" category.categoryId="+body['category']+"";
        let numberSeat=body['numberSeat']=='no'?"":" car.numberSeat="+body['numberSeat'];
        let isWhere=" where car.carIsDelete!=1 and car.carId not in (select carId from rental where isPay =0 and isDelete = 0 )";
        let isAnd=" and ";
        // console.log(body)
        if(body['branch']!="no" || body['category']!="no" || body['numberSeat']!="no"){
            isWhere+=" and ";
        }
        let sql = "select * from car inner join category on car.categoryId=category.categoryId inner join owner on car.ownerId=owner.ownerId"+isWhere+branch+(body['numberSeat']=="no" || body['branch']=='no'?" ":isAnd)+numberSeat+(body['category']=="no" ||(body['branch']=='no' && body['numberSeat']=='no')?" ":isAnd)+category +" limit "+pageNumber+","+limit+";";
        // console.log(sql);
		
		
        db.query(sql,(err,response)=>{
            res.send({
                count:response.length,
                cars: response
            });
        })
	}
    
    // oke chay lai cai folder backend nay
}