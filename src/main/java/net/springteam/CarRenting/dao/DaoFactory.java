package net.springteam.CarRenting.dao;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DaoFactory {
    public static final ApplicationContext context= new ClassPathXmlApplicationContext("car_renting_config.xml");
    public static final CarDao carDao=(CarDao)context.getBean("car");
    public static final AdminDao adminDao=(AdminDao) context.getBean("admin");

}
