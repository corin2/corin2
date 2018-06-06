/**
    파일명: TeamController.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.project.dto.TeamDTO;
import site.corin2.project.service.TeamService;


@Controller
public class TeamController {
	
	@Autowired
	private TeamService service;
	
	@Autowired
	private View jsonview;
	
	@RequestMapping("/showUserField")
	public View showUserField(@RequestParam("projectNum") String projectNum, Model model) {
		List<TeamDTO> teamMembers = service.allTeamMemberSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", teamMembers);
		return jsonview;
	}
}
