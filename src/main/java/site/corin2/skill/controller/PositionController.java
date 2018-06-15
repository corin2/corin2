/**
    파일명: PositionController.java
    설   명: 
    작성일: 2018. 6. 14.
    작성자: 강 진 광
*/

package site.corin2.skill.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PositionController {
	
	//position
	@RequestMapping(value="position",method=RequestMethod.GET)
	public String content(@RequestParam("projectNum") String projectNum, HttpSession session) {
		session.setAttribute("sessionProjectNum", projectNum);
		return "position.position";
	}
	
	/*
	@RequestMapping(value="signup",method=RequestMethod.POST)
	public String userInsert(UserDTO userdto) {
		//회원가입 처리 ... NewMemberDao
		String viewpage = service.userInsert(userdto);
		return viewpage;
	}*/
}
