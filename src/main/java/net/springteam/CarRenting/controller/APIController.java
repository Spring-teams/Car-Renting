package net.springteam.CarRenting.controller;

import net.springteam.CarRenting.dao.DaoFactory;
import net.springteam.CarRenting.model.Car;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class APIController {
    @RequestMapping(value="/login")
    public String getLogin(){
        return "userlogin";
    }
    @RequestMapping(value="/")
    public String getHomePage(Model model){
        model.addAttribute("className","hidden");
        return "home";
    }
    @RequestMapping(value="admin")
    public String getAdminPage(Model model){
        model.addAttribute("className","no-hidden");
        return "home";
    }
    @RequestMapping(value="/comfirmAdmin_",method = RequestMethod.GET)

    public String comfirmAdmin(@RequestParam(name="username") String username, @RequestParam(name="password") String password){
        return "home";
    }

    @RequestMapping(value="/getSubmitForm",method = RequestMethod.GET)
    public String getSubmitForm(@RequestParam(name="id") String id, Model model){
        Car car= DaoFactory.carDao.getCarById(id);
        model.addAttribute("car",car);
        return "submitForm";
    }

}