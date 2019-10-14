package net.springteam.CarRenting.controller;

import net.springteam.CarRenting.dao.DaoFactory;
import net.springteam.CarRenting.model.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerApi {
    @RequestMapping(value = "api/updatecustomer", method = RequestMethod.PATCH)

    public ResponseEntity<Object> updateCustomer(@RequestBody Customer customer){
        try{
            DaoFactory.customerDao.updateCustomer(customer);
        }
        catch (Exception ex){
            return ResponseEntity.ok("fail");
        }

        return ResponseEntity.ok("ok");
    }
    @RequestMapping(value = "api/getcustomerbyid/{id}",method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Customer getCustomerById(@PathVariable("id") String id){
        return DaoFactory.customerDao.getCustomerById(id);
    }

    @RequestMapping(value = "api/addcustomer", method = RequestMethod.POST)
    public String addCustomer(@RequestBody Customer customer){
        if(DaoFactory.customerDao.checkIfExist(customer)){
            return "found";
        }
        try {
            DaoFactory.customerDao.insertCustomer(customer);
        }catch (Exception ex){
            return "fail";
        }
        return "ok";
    }
}
