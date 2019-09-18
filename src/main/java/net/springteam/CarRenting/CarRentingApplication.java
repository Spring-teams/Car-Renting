package net.springteam.CarRenting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class CarRentingApplication {

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application){
		return application.sources(CarRentingApplication.class);
	}
	public static void main(String[] args) {
		SpringApplication.run(CarRentingApplication.class, args);
	}

}
