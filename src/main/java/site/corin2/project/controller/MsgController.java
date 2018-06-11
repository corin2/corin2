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
	
	@RequestMapping("/msgdel")
	public View msgdel(MsgDTO msg, Model model) {
		service.inviteMsgDelete(msg);
		return jsonview;
	}
	
	@RequestMapping("/msgagree")
	public View msgagree(TeamDTO team, Model model) {
		service.addTeamMemberInsert(team);
		return jsonview;
	}
}
