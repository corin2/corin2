/**
    파일명: MsgController.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 김 진 원
*/

package site.corin2.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.project.dto.MsgDTO;
import site.corin2.project.dto.TeamDTO;
import site.corin2.project.service.MsgService;

@Controller
public class MsgController {
	
	@Autowired
	private MsgService service;
	
	@Autowired
	private View jsonview;
	
	//메시지를 삭제한다
	@RequestMapping("/msgdel")
	public View msgdel(MsgDTO msg, Model model) {
		service.inviteMsgDelete(msg);
		return jsonview;
	}
	
	//초대메시지를 승락한다.
	@RequestMapping("/msgagree")
	public View msgagree(TeamDTO team, Model model) {
		service.addTeamMemberInsert(team);
		return jsonview;
	}
	
	//해당 프로젝트에 멤버가 속해있는지 & 메시지가 이미 있는지 확인한다.
	@RequestMapping("/isTeamAndisMsg")
	public View isTeamAndisMsg(MsgDTO msg, Model model) {
		int result = service.isTeamAndisMsg(msg);
		model.addAttribute("data", result);
		return jsonview;
	}
	
	//메시지를 보낸다.
	@RequestMapping("/inviteMsg")
	public View inviteMsg(MsgDTO msg, Model model) {
		service.inviteMsg(msg);
		return jsonview;
	}
}
