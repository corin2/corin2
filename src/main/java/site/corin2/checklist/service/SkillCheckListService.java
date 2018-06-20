/**
    파일명: SkillCheckListService.java
    설   명: 
    작성일: 2018. 6. 15.
    작성자: 최 재 욱
*/
package site.corin2.checklist.service;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.corin2.checklist.dao.SkillCheckListDAO;
import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.checklist.dto.SkillCheckListDTO;

@Service
public class SkillCheckListService {
	
	@Autowired
	private SqlSession sqlSession;
	
	//DB저장된 값 뿌려주기
	public List<CheckListDTO> checkListAllSelect (CheckListDTO check){
		
		List<CheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.checkListAllSelect(check);
		
		return list;
	}
	
	//체크한 인원 삽입
	public int checkListCheckInsert(SkillCheckListDTO skillcheck) {
		int result = 0;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		result = dao.checkListCheckInsert(skillcheck);
		return result;
	}
	//체크여부 확인
	public List<SkillCheckListDTO> checkedSelect (SkillCheckListDTO skillcheck){
		List<SkillCheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.checkedSelect(skillcheck);
		return list;
	}
	
	//체크여부 삭제
	public int checkedDelete (SkillCheckListDTO skillcheck) {
		int result = 0;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		result = dao.checkedDelete(skillcheck);
		return result;
	}
	
	public List<SkillCheckListDTO> dataCheckListUserId (SkillCheckListDTO skillcheck){
		List<SkillCheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.dataCheckListUserId(skillcheck);
		return list;
	}
	
	public List<SkillCheckListDTO> selectCheckListConfirm (SkillCheckListDTO skillcheck){
		List<SkillCheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.selectCheckListConfirm(skillcheck);
		return list;
	}
}
