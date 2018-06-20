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
	
	//체크리스트 삽입
	public int insertCheckList(CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.insertCheckList(check);
		
		return result;
	}
	
	//체크리스트 전체 가져오기
	public List<CheckListDTO> selectCheckListAll (CheckListDTO check){
		List<CheckListDTO> list = null;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		list=dao.selectCheckListAll(check);
		
		return list;
	}
	
	//체크리스트 수정
	public int updateCheckListContent (CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.updateCheckListContent(check);
		return result;
	}
	
	//체크리스트 삭제
	public int deleteCheckLiset (CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.deleteCheckLiset(check);
		return result;
	}
	
	//사용자 등급 가져오기
	public List<TeamDTO> userGradeProject (TeamDTO team){
		List<TeamDTO> list = null;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		list = dao.userGradeProject(team);
		return list;
	}
}
