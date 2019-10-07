package net.springteam.CarRenting.controller;

import net.springteam.CarRenting.dao.DaoFactory;
import net.springteam.CarRenting.model.*;
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
    public Owner getAdminById(@PathVariable("id") String adminID){
        return DaoFactory.ownerDao.getOwnerById(adminID);
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
//        rental.setRentalId("1");
        DaoFactory.customerDao.insertCustomer(customer);
        DaoFactory.rentalDao.addRental(rental);
        return "ok";
    }
    @RequestMapping(value = "api/getrental/{id}",method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Map<String, Object> getRental(@PathVariable("id") String customerId){
        Map<String,Object> map = new HashMap<>();
        Customer customer = DaoFactory.customerDao.getCustomerById(customerId);
        map.put("customer",customer);
        List<Rental> rentals=DaoFactory.rentalDao.getRentalByCustomerId(customerId);
        if(rentals.size()==0){
            map.put("rentals","no");
        }
        else map.put("rentals",rentals);
        return map;
    }
}
