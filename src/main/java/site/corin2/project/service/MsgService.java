/**
    파일명: MsgService.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.project.dao.MsgDAO;
import site.corin2.project.dao.TeamDAO;
import site.corin2.project.dto.MsgDTO;
import site.corin2.project.dto.TeamDTO;

@Service
public class MsgService {
	
	@Autowired
	private SqlSession sqlsession;
	
	//메시지를 삭제한다
	public void inviteMsgDelete(MsgDTO msg){
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		try {
			msgDAO.inviteMsgDelete(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//초대메시지를 승락한다.
	public void addTeamMemberInsert(TeamDTO team){
		TeamDAO teamDAO = sqlsession.getMapper(TeamDAO.class);
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		TeamDTO team2 = null;
		try {
			team2 = teamDAO.teamMemberSelect(team);
			if(team2 == null) teamDAO.addTeamMemberInsert(team);
			else teamDAO.tokickIn(team);
			
			MsgDTO msg = new MsgDTO();
			msg.setProjectNum(team.getProjectNum());
			msg.setReceptionId(team.getUserId());
			msgDAO.inviteMsgDelete(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//해당 프로젝트에 멤버가 속해있는지 & 메시지가 이미 있는지 확인한다.
	public int isTeamAndisMsg(MsgDTO msg) {
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		int result = 0;
		try {
			result = msgDAO.isTeamAndisMsg(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	//메시지를 보낸다.
	public void inviteMsg(MsgDTO msg) {
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		try {
			msgDAO.inviteMsg(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
