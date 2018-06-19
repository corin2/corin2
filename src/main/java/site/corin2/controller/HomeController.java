package site.corin2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping("/home")
	public String index() {
		return "home.home";
	}
	
	@RequestMapping("/test")
	public String test() {
		return "home.test";
	}
}
