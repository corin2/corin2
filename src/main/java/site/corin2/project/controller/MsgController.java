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
	
	/**
	* @함수명 : msgdel(MsgDTO msg, Model model)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 메시지를 삭제한다
	* @param MsgDTO - projectNum, receptionId
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/msgdel")
	public View msgdel(MsgDTO msg, Model model) {
		service.inviteMsgDelete(msg);
		return jsonview;
	}
	
	/**
	* @함수명 : msgagree(TeamDTO team, Model model)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 초대메시지를 승락한다.
	* @param TeamDTO - userId, projectNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/msgagree")
	public View msgagree(TeamDTO team, Model model) {
		service.addTeamMemberInsert(team);
		return jsonview;
	}
	
	/**
	* @함수명 : isTeamAndisMsg(MsgDTO msg, Model model)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 해당 프로젝트에 멤버가 속해있는지 & 메시지가 이미 있는지 확인한다.
	* @param MsgDTO - projectNum, receptionId
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/isTeamAndisMsg")
	public View isTeamAndisMsg(MsgDTO msg, Model model) {
		int result = service.isTeamAndisMsg(msg);
		model.addAttribute("data", result);
		return jsonview;
	}
	
	/**
	* @함수명 : inviteMsg(MsgDTO msg, Model model)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 메시지를 보낸다.
	* @param MsgDTO - projectNum, receptionId, sendId
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/inviteMsg")
	public View inviteMsg(MsgDTO msg, Model model) {
		service.inviteMsg(msg);
		return jsonview;
	}
}
