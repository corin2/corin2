/**
    파일명: PositionService.java
    설   명: 
    작성일: 2018. 6. 14.
    작성자: 강 진 광
*/

package site.corin2.skill.service;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.project.dao.TeamDAO;
import site.corin2.project.dto.TeamDTO;
import site.corin2.skill.dao.PositionDAO;
import site.corin2.skill.dto.PositionDTO;

@Service
public class PositionService {
	
	@Autowired
	private SqlSession sqlsession;
	
	//insert position
	public int positionInsert(PositionDTO positiondto) {
		int result =0;
		PositionDAO positiondao = sqlsession.getMapper(PositionDAO.class);
		try {
			result = positiondao.positionInsert(positiondto);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	* @함수명 : isTeamMyId(String userId, int projectNum)
	* @작성일 : 2018. 07. 06.
	* @작성자 : 김 진 원
	* @설명 : 해당 유저가 프로젝트 넘버에 속해 있는지 확인 DB에서 count로 받아온다 있으면 1 없으면 0
	* 미리 보여주는 함수이다.
	* @param String - userId
	* @param int - projectNum
	* @return boolean 속해 있으면 true 속해있지 않으면 false
	**/
	public boolean isTeamMyId(String userId, int projectNum) {
		TeamDTO team = new TeamDTO();
		team.setUserId(userId);
		team.setProjectNum(projectNum);
		
		TeamDAO teamDAO = sqlsession.getMapper(TeamDAO.class);
		int count = 0;
		boolean result = false;
		try {
			count = teamDAO.isTeamMyId(team);
			if(count == 0) result = false;
			else result = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
