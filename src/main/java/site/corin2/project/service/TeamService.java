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

import site.corin2.project.dao.MsgDAO;
import site.corin2.project.dao.TeamDAO;
import site.corin2.project.dto.ProjectDTO;
import site.corin2.project.dto.TeamDTO;
import site.corin2.user.dto.UserDTO;

@Service
public class TeamService {
	
	@Autowired
	private SqlSession sqlSession;
	
	/**
	* @함수명 : allTeamMemberSelect(int projectNum)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 해당 프로젝트에 모든 멤버 조회
	* @param projectNum - projectNum
	* @return List - TeamDTO 모든 멤버
	**/
	public List<TeamDTO> allTeamMemberSelect(int projectNum){
		TeamDAO teamDAO = sqlSession.getMapper(TeamDAO.class);
		List<TeamDTO> teamMembers = null;
		try {
			teamMembers = (ArrayList<TeamDTO>)teamDAO.allTeamMemberSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return teamMembers;
	}
	
	/**
	* @함수명 : allTeamMemberProfileSelect(int projectNum)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 해당 프로젝트의 모든 멤버의 유저DTO 조회
	* @param projectNum - projectNum
	* @return List - UserDTO 모든 회원
	**/
	public List<UserDTO> allTeamMemberProfileSelect(int projectNum){
		TeamDAO teamDAO = sqlSession.getMapper(TeamDAO.class);
		List<UserDTO> teamMemberProfiles = null;
		try {
			teamMemberProfiles = (ArrayList<UserDTO>)teamDAO.allTeamMemberProfileSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return teamMemberProfiles;
	}
	
	/**
	* @함수명 : allInviteMsgSelect(String receptionId)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 송신아이디가 받은 모든 초대 메시지의 projectDTO를 조회한다.
	* @param receptionId - receptionId
	* @return List - ProjectDTO  모든 초대 메시지의 프로젝트
	**/
	public List<ProjectDTO> allInviteMsgSelect(String receptionId){
		MsgDAO msgDAO = sqlSession.getMapper(MsgDAO.class);
		List<ProjectDTO> inviteMsgs = null;
		try {
			inviteMsgs = (ArrayList<ProjectDTO>)msgDAO.allInviteMsgSelect(receptionId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return inviteMsgs;
	}

	/**
	* @함수명 : insertTeamProject(TeamDTO team)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 프로젝트 팀에 추가한다
	* @param TeamDTO - projectNum, userId
	* @return int 성공 개수
	**/
	public int insertTeamProject(TeamDTO team) {
		int result = 0;
		TeamDAO dao = sqlSession.getMapper(TeamDAO.class);
		result = dao.insertTeamProject(team);
		return result;
	}
	
	/**
	* @함수명 : ownerChange(TeamDTO team)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 팀장위임(오너위임) 오너가 될 사람의 userid는 팀장으로 자신은 팀원으로
	* @param TeamDTO - projectNum, userId(오너될 userid), getGradeNum(자신 userid)
	**/
	public void ownerChange(TeamDTO team) {
		TeamDAO dao = sqlSession.getMapper(TeamDAO.class);
		dao.ownerChange(team);
		team.setUserId(team.getGradeNum());
		dao.downOwnerChange(team);
	}
	
	/**
	* @함수명 : tokickOut(TeamDTO team)
	* @작성일 : 2018. 06. 23.
	* @작성자 : 김 진 원
	* @설명 : 팀원제명 & 회원탈퇴
	* @param TeamDTO - projectNum, userId
	**/
	public void tokickOut(TeamDTO team) {
		TeamDAO dao = sqlSession.getMapper(TeamDAO.class);
		dao.tokickOut(team);
	}
}
