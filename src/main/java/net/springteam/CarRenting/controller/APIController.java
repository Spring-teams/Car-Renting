package net.springteam.CarRenting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class APIController {
    @RequestMapping(value="/login")
    public String getLogin(){
        return "userlogin";
    }
}