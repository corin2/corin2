/**
    파일명: PositionController.java
    설   명: 
    작성일: 2018. 6. 14.
    작성자: 강 진 광
*/

package site.corin2.skill.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.skill.dto.PositionDTO;
import site.corin2.skill.service.PositionService;
import site.corin2.user.service.UserService;

@Controller
public class PositionController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private PositionService service;
	
	//position
	@RequestMapping(value="position",method=RequestMethod.GET)
	public String content(@RequestParam("projectNum") String projectNum, HttpSession session) {
		session.setAttribute("sessionProjectNum", projectNum);
		return "position.position";
	}
	
	//insert position
	@RequestMapping(value="positioninsert",method= {RequestMethod.POST,RequestMethod.GET})
	public View positionInsert(PositionDTO positiondto , Model model) {
		System.out.println("position controller");
		System.out.println(positiondto);
		int result = service.positionInsert(positiondto);
		return jsonview;
	}
/*	
	//update position
	@RequestMapping(value="positionupdate",method=RequestMethod.POST)
	public String positionUpdate(PositionDTO positiondto) {
		String viewpage = service.positionUpdate(positiondto);
		return viewpage;
	}
	
	//delete position
	@RequestMapping(value="positiondelete",method=RequestMethod.POST)
	public String positionDelete(PositionDTO positiondto) {
		String viewpage = service.positionDelete(positiondto);
		return viewpage;
	}
	
	//position 전체 조회하기
	@RequestMapping(value="signup",method=RequestMethod.POST)
	public String positionAllSelect(PositionDTO positiondto) {
		String viewpage = service.positionAllSelect(positiondto);
		return viewpage;
	}
	
	//position 하나 조회하기
	@RequestMapping(value="signup",method=RequestMethod.POST)
	public String positionSelect(PositionDTO positiondto) {
		String viewpage = service.positionSelect(positiondto);
		return viewpage;
	}*/
}
