package site.corin2.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
	@RequestMapping("/index.htm")
	public String index() {
		//return "index.jsp"; 기존 방법(resolver없이)
		return "login.html";
	}
}
