/**
    파일명: IndexController.java
    설   명: 처음의 loginpage로 이동을 위한 클래스입니다.
    작성일: 2018. 6. 5.
    작성자: 강 진 광
*/
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
