/**
    파일명: TeamDAO.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.dao;

import java.util.List;

import site.corin2.project.dto.TeamDTO;

public interface TeamDAO {
	
	/**
	 날      짜 : 2018. 6. 6.
	 기      능 : 프로젝트에 속한 모든 팀원들을 검색한다.
	 작성자명 : 김 진 원
	*/
	public List<TeamDTO> allTeamMemberSelect(int projectNum);
}
