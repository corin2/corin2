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
	
	/**
	 날      짜 : 2018. 6. 11.
	 기      능 : 송신아이디가 받은 모든 초대 메세지의 projectDTO를 조회한다. 
	 작성자명 : 김 진 원
	*/
	public List<ProjectDTO> allInviteMsgSelect(String receptionId);
	
	/**
	 날      짜 : 2018. 6. 11.
	 기      능 : 메세지를 삭제한다. 
	 작성자명 : 김 진 원
	*/
	public void inviteMsgDelete(MsgDTO msg);
}
