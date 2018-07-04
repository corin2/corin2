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
	
	/**
	* @함수명 : inviteMsgDelete(MsgDTO msg)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 메시지를 삭제한다
	* @param MsgDTO - projectNum, receptionId
	**/
	public void inviteMsgDelete(MsgDTO msg){
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		try {
			msgDAO.inviteMsgDelete(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	* @함수명 : addTeamMemberInsert(TeamDTO team)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 초대메시지를 승락 한 후에 해당 메시지를 삭제한다.
	* @param TeamDTO - userId, projectNum
	**/
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
	
	/**
	* @함수명 : isTeamAndisMsg(MsgDTO msg)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 해당 프로젝트에 멤버가 속해있는지 & 메시지가 이미 있는지 확인한다.
	* @param MsgDTO - projectNum, receptionId
	**/
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
	
	/**
	* @함수명 : inviteMsg(MsgDTO msg, Model model)
	* @작성일 : 2018. 06. 21.
	* @작성자 : 김 진 원
	* @설명 : 메시지를 보낸다.
	* @param MsgDTO - projectNum, receptionId, sendId
	**/
	public void inviteMsg(MsgDTO msg) {
		MsgDAO msgDAO = sqlsession.getMapper(MsgDAO.class);
		try {
			msgDAO.inviteMsg(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
