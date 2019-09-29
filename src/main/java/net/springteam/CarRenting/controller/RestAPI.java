package net.springteam.CarRenting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RestAPI {
    @RequestMapping(value="/comfirmAdmin",method = RequestMethod.GET,produces = "application/json")
    @ResponseBody
    public Map<String,String> comfirmAdmin(@RequestParam(name="username") String username, @RequestParam(name="password") String password){
        HashMap<String,String> res = new HashMap<>();
        if(username.equals("springteam") && password.equals("123456")){
            res.put("result","true");
            res.put("url","/");
            return res;
        }
        res.put("result","false");
        res.put("url","/login");
        return res;
    }
}
