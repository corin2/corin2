/**
    파일명: PositionController.java
    설   명: 
    작성일: 2018. 6. 14.
    작성자: 강 진 광
*/

package site.corin2.skill.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PositionController {
	
	//skill
	@RequestMapping(value="gridstack",method=RequestMethod.GET)
	public String content() {
		return "skill.example";
	}
	
	//
	@RequestMapping(value="signup",method=RequestMethod.POST)
	public String userInsert(UserDTO userdto) {
		//회원가입 처리 ... NewMemberDao
		String viewpage = service.userInsert(userdto);
		return viewpage;
	}
}
