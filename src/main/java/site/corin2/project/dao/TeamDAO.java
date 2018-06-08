/**
    파일명: TeamDAO.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.dao;

import java.util.List;

import site.corin2.project.dto.TeamDTO;
import site.corin2.user.dto.UserDTO;

public interface TeamDAO {
	
	/**
	 날      짜 : 2018. 6. 6.
	 기      능 : 프로젝트에 속한 모든 팀원들의 팀DTO를 검색한다.
	 작성자명 : 김 진 원
	*/
	public List<TeamDTO> allTeamMemberSelect(int projectNum);
	
	/**
	 날      짜 : 2018. 6. 7.
	 기      능 : 프로젝트에 속한 모든 팀원들의  유저DTO를 검색한다.
	 작성자명 : 김 진 원
	*/
	public List<UserDTO> allTeamMemberProfileSelect(int projectNum);
}
