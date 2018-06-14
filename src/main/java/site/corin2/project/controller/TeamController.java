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

import site.corin2.project.dto.ProjectDTO;
import site.corin2.project.dto.TeamDTO;
import site.corin2.project.service.TeamService;
import site.corin2.user.dto.UserDTO;


@Controller
public class TeamController {
	
	@Autowired
	private TeamService service;
	
	@Autowired
	private View jsonview;
	
	//해당 프로젝트에 모든 멤버 조회
	@RequestMapping("/showMember")
	public View showMember(@RequestParam("projectNum") String projectNum, Model model) {
		List<TeamDTO> teamMembers = service.allTeamMemberSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", teamMembers);
		return jsonview;
	}
	
	//해당 프로젝트의 모든 멤버의 유저DTO 조회
	@RequestMapping("/showMemberUserProfile")
	public View showMemberUserProfile(@RequestParam("projectNum") String projectNum, Model model) {
		List<UserDTO> teamMembers = service.allTeamMemberProfileSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", teamMembers);
		return jsonview;
	}
	
	//송신아이디가 받은 모든 초대 메시지의 projectDTO를 조회한다.
	@RequestMapping("/showMsg")
	public View showMsg(@RequestParam("receptionId") String receptionId, Model model) {
		List<ProjectDTO> inviteMsgs = service.allInviteMsgSelect(receptionId);
		model.addAttribute("data", inviteMsgs);
		return jsonview;
	}

	@RequestMapping("/projectTeamInsert")
	public View projectTeamInsert(TeamDTO team, Model model) {
		int result = 0;
		result = service.insertTeamProject(team);
		return jsonview;
	}
}
