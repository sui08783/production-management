package com.sui.production_management;

import jakarta.annotation.PostConstruct;
import java.util.TimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProductionManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductionManagementApplication.class, args);
	}
	@PostConstruct
	public void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("JST"));
	}
}
