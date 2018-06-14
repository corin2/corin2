/**
    파일명: TeamDAO.java
    설   명: 팀 DAO
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.dao;

import java.util.List;

import site.corin2.project.dto.TeamDTO;
import site.corin2.user.dto.UserDTO;

public interface TeamDAO {
	
	//프로젝트에 속한 모든 팀원들의 팀DTO를 검색한다.
	public List<TeamDTO> allTeamMemberSelect(int projectNum);
	
	//프로젝트에 속한 모든 팀원들의  유저DTO를 검색한다.
	public List<UserDTO> allTeamMemberProfileSelect(int projectNum);
	
	//Team 멤버를 추가한다. 
	public void addTeamMemberInsert(TeamDTO team);
	
	//팀프로젝트 생성 
	public int insertTeamProject(TeamDTO team);
	
	//오너위임
	public void ownerChange(TeamDTO team);
	
	//팀원제명 & 회원탈퇴
	public void tokickOut(TeamDTO team);
	
	//팀 재가입
	public void tokickIn(TeamDTO team);
	
	//프로젝트넘버와 유저의 아이디로 하나의 팀DTO를 조회한다.
	public TeamDTO teamMemberSelect(TeamDTO team);
}
