/**
    파일명: PositionController.java
    설   명: 
    작성일: 2018. 6. 14.
    작성자: 강 진 광
*/

package site.corin2.skill.controller;

import java.security.Principal;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.skill.service.PositionService;

@Controller
public class PositionController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private PositionService service;
	
	//position
	@RequestMapping(value="dashboardcalendar",method=RequestMethod.GET)
	public String dashboardcalendar(@RequestParam("projectNum") String projectNum, HttpSession session) {
		return "position.calendar";
	}
	//position
	@RequestMapping(value="dashboardchart",method=RequestMethod.GET)
	public String dashboardchart(@RequestParam("projectNum") String projectNum, HttpSession session) {
		return "position.chart";
	}
	//position
	@RequestMapping(value="dashboardkanban",method=RequestMethod.GET)
	public String dashboardkanban(@RequestParam("projectNum") String projectNum, HttpSession session) {
		return "position.kanban";
	}
	//position
	@RequestMapping(value="position",method=RequestMethod.GET)
	public String content(@RequestParam("projectNum") String projectNum, HttpSession session, Principal principal) {
		boolean result = service.isTeamMyId(principal.getName(), Integer.parseInt(projectNum));
		if(result == true) session.setAttribute("sessionProjectNum", projectNum);
		return "position.position";
	}
}
