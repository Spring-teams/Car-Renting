package net.springteam.CarRenting.controller;

import net.springteam.CarRenting.dao.AdminDao;
import net.springteam.CarRenting.dao.CarDao;
import net.springteam.CarRenting.dao.DaoFactory;
import net.springteam.CarRenting.model.*;
import org.apache.el.lang.EvaluationContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
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

    @RequestMapping(value="api/insertcustomer",method = RequestMethod.POST)
    @ResponseBody
    public String insertCustomer(@RequestBody Customer customer){
        String result;
        try{
            DaoFactory.customerDao.insertCustomer(customer);
            result="success";
        }catch (Exception ex){
           result="fail";
        }
        return result;
    }

    @RequestMapping(value = "api/getcustomerbyid/{id}",method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Customer getCustomerById(@PathVariable("id") String id){
        return DaoFactory.customerDao.getCustomerById(id);
    }

    @RequestMapping(value="api/addcustomerandrental", method = RequestMethod.POST)
    @ResponseBody
    public String addCustomerAndRental(@RequestBody CustomerAndRental CNR){
        Customer customer = CNR.getCustomer();
        Rental rental = CNR.getRental();
        rental.setRentalId("2");
        rental.setAdminId("1234");

        DaoFactory.customerDao.insertCustomer(customer);
        DaoFactory.rentalDao.addRental(rental);
        return "ok";
    }
}
