/**
    파일명: CardCheckListService.java
    설   명: 
    작성일: 2018. 6. 7.
    작성자: 최 재 욱
*/
package site.corin2.kanban.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.kanban.dao.CheckListDAO;
import site.corin2.kanban.dto.CardCheckListDTO;

@Service
public class CardCheckListService {

	@Autowired
	private SqlSession sqlSession;
	
	public int cardCheckListInsert(CardCheckListDTO checkList) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.checkListInsert(checkList);
		
		return result;
	}
	
	public List<CardCheckListDTO> checkListAllSelect(CardCheckListDTO checkList){
		List<CardCheckListDTO> lists = null;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		lists = dao.checkListSelect(checkList);
		return lists;
	}
	
	public void checkListUpdate(CardCheckListDTO checkList){
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		dao.checkListUpdate(checkList);
	}
	
	public int cardCheckListDelete(CardCheckListDTO checkList) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.checkListDelete(checkList);
		
		return result;
	}
}
