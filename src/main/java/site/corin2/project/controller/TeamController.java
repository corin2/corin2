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
	
	/**
	* @함수명 : showMember(@RequestParam("projectNum") String projectNum, Model model)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 해당 프로젝트에 모든 멤버 조회
	* @param projectNum - projectNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/showMember")
	public View showMember(@RequestParam("projectNum") String projectNum, Model model) {
		List<TeamDTO> teamMembers = service.allTeamMemberSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", teamMembers);
		return jsonview;
	}
	
	/**
	* @함수명 : showMemberUserProfile(@RequestParam("projectNum") String projectNum, Model model)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 해당 프로젝트의 모든 멤버의 유저DTO 조회
	* @param projectNum - projectNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/showMemberUserProfile")
	public View showMemberUserProfile(@RequestParam("projectNum") String projectNum, Model model) {
		List<UserDTO> teamMembers = service.allTeamMemberProfileSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", teamMembers);
		return jsonview;
	}
	
	/**
	* @함수명 : showMsg(@RequestParam("receptionId") String receptionId, Model model)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 송신아이디가 받은 모든 초대 메시지의 projectDTO를 조회한다.
	* @param receptionId - receptionId
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/showMsg")
	public View showMsg(@RequestParam("receptionId") String receptionId, Model model) {
		List<ProjectDTO> inviteMsgs = service.allInviteMsgSelect(receptionId);
		model.addAttribute("data", inviteMsgs);
		return jsonview;
	}

	/**
	* @함수명 : projectTeamInsert(TeamDTO team, Model model)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 프로젝트 팀에 추가한다
	* @param TeamDTO - projectNum, userId
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/projectTeamInsert")
	public View projectTeamInsert(TeamDTO team, Model model) {
		int result = 0;
		result = service.insertTeamProject(team);
		return jsonview;
	}
	
	/**
	* @함수명 : ownerChange(TeamDTO team)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 팀장위임(오너위임)
	* @param TeamDTO - projectNum, userId(오너될 userid), getGradeNum(자신 userid)
	* @return View jsonview
	**/
	@RequestMapping("/ownerChange")
	public View ownerChange(TeamDTO team) {
		service.ownerChange(team);
		return jsonview;
	}
	
	/**
	* @함수명 : tokickOut(TeamDTO team)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 팀원제명 & 회원탈퇴
	* @param TeamDTO - projectNum, userId
	* @return View jsonview
	**/
	@RequestMapping("/tokickOut")
	public View tokickOut(TeamDTO team) {
		service.tokickOut(team);
		return jsonview;
	}
}
