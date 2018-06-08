/**
    파일명: CardCheckListService.java
    설   명: 
    작성일: 2018. 6. 7.
    작성자: 최 재 욱
*/
package site.corin2.kanban.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.kanban.dao.CheckListDAO;
import site.corin2.kanban.dao.KanbanDAO;
import site.corin2.kanban.dto.CardCheckListDTO;

@Service
public class CardCheckListService {

	@Autowired
	private SqlSession sqlSession;
	
	public int cardCheckListInsert(CardCheckListDTO checkList) {
		System.out.println("들어왓니?/");
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
	
	

}
