/**
    파일명: MsgDAO.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 김 진 원
*/

package site.corin2.project.dao;

import java.util.List;

import site.corin2.project.dto.MsgDTO;
import site.corin2.project.dto.ProjectDTO;

public interface MsgDAO {
	
	//송신아이디가 받은 모든 초대 메시지의 projectDTO를 조회한다.
	public List<ProjectDTO> allInviteMsgSelect(String receptionId);
	
	//메세지를 삭제한다.
	public void inviteMsgDelete(MsgDTO msg);
	
	//팀에 참여되어 있는지, 메시지가 있는지 확인한다
	public int isTeamAndisMsg(MsgDTO msg);
	
	//초대메시지를 보낸다.
	public void inviteMsg(MsgDTO msg);
}
