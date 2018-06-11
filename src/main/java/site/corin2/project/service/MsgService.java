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
	
	public void inviteMsgDelete(MsgDTO msg){
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		try {
			msgDAO.inviteMsgDelete(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void addTeamMemberInsert(TeamDTO team){
		TeamDAO teamDAO = sqlsession.getMapper(TeamDAO.class);
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		try {
			teamDAO.addTeamMemberInsert(team);
			MsgDTO msg = new MsgDTO();
			msg.setProjectNum(team.getProjectNum());
			msg.setReceptionId(team.getUserId());
			msgDAO.inviteMsgDelete(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
