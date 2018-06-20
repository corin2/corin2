/**
    파일명: CheckListService.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 최 재 욱
*/
package site.corin2.checklist.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.checklist.dao.CheckListDAO;
import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.project.dto.TeamDTO;

@Service
public class CheckListService {

	@Autowired
	private SqlSession sqlSession;
	
	public int insertCheckList(CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.insertCheckList(check);
		
		return result;
	}
	
	public List<CheckListDTO> selectCheckListAll (CheckListDTO check){
		List<CheckListDTO> list = null;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		list=dao.selectCheckListAll(check);
		
		return list;
	}
	
	public int updateCheckListContent (CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.updateCheckListContent(check);
		return result;
	}
	
	public int deleteCheckLiset (CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.deleteCheckLiset(check);
		return result;
	}
	
	public List<TeamDTO> userGradeProject (TeamDTO team){
		List<TeamDTO> list = null;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		list = dao.userGradeProject(team);
		return list;
	}
}
