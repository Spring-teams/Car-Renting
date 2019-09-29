package net.springteam.CarRenting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
}