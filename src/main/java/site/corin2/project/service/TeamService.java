/**
    파일명: TeamService.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.project.dao.TeamDAO;
import site.corin2.project.dto.TeamDTO;
import site.corin2.user.dto.UserDTO;

@Service
public class TeamService {
	
	@Autowired
	private SqlSession sqlsession;
	
	public List<TeamDTO> allTeamMemberSelect(int projectNum){
		TeamDAO teamDAO = sqlsession.getMapper(TeamDAO.class);
		List<TeamDTO> teamMembers = null;
		try {
			teamMembers = (ArrayList<TeamDTO>)teamDAO.allTeamMemberSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return teamMembers;
	}
	
	public List<UserDTO> allTeamMemberProfileSelect(int projectNum){
		TeamDAO teamDAO = sqlsession.getMapper(TeamDAO.class);
		List<UserDTO> teamMemberProfiles = null;
		try {
			teamMemberProfiles = (ArrayList<UserDTO>)teamDAO.allTeamMemberProfileSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return teamMemberProfiles;
	}
}
