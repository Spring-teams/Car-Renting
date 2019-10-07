package net.springteam.CarRenting.controller;

import net.springteam.CarRenting.dao.DaoFactory;
import net.springteam.CarRenting.model.Car;
import net.springteam.CarRenting.model.Customer;
import net.springteam.CarRenting.model.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class APIController {
    public static boolean isUserLogin=false;
    public static String customerId;
    public static Customer _customer;
    @RequestMapping(value="/login")
    public String getLogin(Model model){
        model.addAttribute("customer",new Customer());
        return "userlogin";
    }
    @PostMapping(value = "/confirmuser")
    public String confirmUser(@ModelAttribute Customer customer, Model model){
        if(DaoFactory.customerDao.comfirmUser(customer)){
            isUserLogin=true;
            this._customer=DaoFactory.customerDao.getCustomerById(customer.getCustomerId());
            customerId=customer.getCustomerId();
            return "redirect:/";
        }
        return "redirect:/login";
    }
    @RequestMapping(value="/")
    public String getHomePage(Model model){
        Page page = new Page();
        page.setHome("show");
        model.addAttribute("page",page);
        if(isUserLogin==false){
            model.addAttribute("customer",DaoFactory.customerDao.getCustomerById("0"));
            model.addAttribute("login","Đăng nhập");
            return "home";
        }

        model.addAttribute("customer",_customer);
        model.addAttribute("login","Đăng xuất");
        return "home";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String doLogOut(){
        isUserLogin=false;
        return "redirect:/login";
    }

    @RequestMapping(value="/getSubmitForm",method = RequestMethod.GET)
    public String getSubmitForm(@RequestParam(name="carid") String id,@RequestParam("customerid") String customerId, Model model){
        Car car= DaoFactory.carDao.getCarById(id);
        model.addAttribute("car",car);
        this._customer=DaoFactory.customerDao.getCustomerById(customerId);

        model.addAttribute("customer",this._customer);
        return "submitForm";
    }

    @RequestMapping(value = "/history",method = RequestMethod.GET)
    public String getSearch(Model model){
        Page page = new Page();
        page.setHistory("show");
        model.addAttribute("page",page);
        model.addAttribute("customer",DaoFactory.customerDao.getCustomerById(this.customerId));
        model.addAttribute("login","Đăng xuất");
        return "home";
    }
    @RequestMapping(value="/get-customer-info")
    public String getCustomerInfo(Model model) {
        Page page = new Page();
        page.setInfo("show");
        model.addAttribute("page", page);
        model.addAttribute("customer", DaoFactory.customerDao.getCustomerById(this.customerId));
        model.addAttribute("login","Đăng xuất");
        return "home";
    }
    @RequestMapping(value = "/guide")
    public String getGuide(Model model){
        Page page = new Page();
        page.setGuide("show");
        model.addAttribute("page", page);
        model.addAttribute("customer", DaoFactory.customerDao.getCustomerById(this.customerId));
        model.addAttribute("login","Đăng xuất");
        return "home";
    }

}