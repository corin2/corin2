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

import site.corin2.kanban.dao.KanbanDAO;
import site.corin2.skill.dao.PositionDAO;
import site.corin2.skill.dto.PositionDTO;

@Service
public class PositionService {
	
	@Autowired
	private SqlSession sqlsession;
	
	//insert position
	public int positionInsert(PositionDTO positiondto) {
		System.out.println("positioninsert service");
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
/*	
	//update position
	public String positionUpdate(PositionDTO positiondto) {
		return null;
	}
	
	//delete position
	public String positionDelete(PositionDTO positiondto) {
		return null;
	}
	
	//position 전체 조회하기
	public String positionAllSelect(PositionDTO positiondto) {
		return null;
	}
	
	//position 하나 조회하기
	public String positionSelect(PositionDTO positiondto) {
		return null;
	}*/
}
