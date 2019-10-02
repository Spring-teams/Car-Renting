package net.springteam.CarRenting.controller;

import net.springteam.CarRenting.dao.AdminDao;
import net.springteam.CarRenting.dao.CarDao;
import net.springteam.CarRenting.dao.DaoFactory;
import net.springteam.CarRenting.model.Admin;
import net.springteam.CarRenting.model.Car;
import org.apache.el.lang.EvaluationContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RestAPI {



    @RequestMapping(value = "api/getallcar",method=RequestMethod.GET,produces = "application/json")
    @ResponseBody
    public List<Car> getAllCar(){
        return DaoFactory.carDao.getAllCar();
    }
    @RequestMapping(value="api/getadminbyid/{id}",method=RequestMethod.GET,produces = "application/json")
    @ResponseBody
    public Admin getAdminById(@PathVariable("id") String adminID){
        return DaoFactory.adminDao.getAdminById(adminID);
    }

}
