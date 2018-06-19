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

import site.corin2.kanban.dao.CardCheckListDAO;
import site.corin2.kanban.dto.CardCheckListDTO;

@Service
public class CardCheckListService {

	@Autowired
	private SqlSession sqlSession;
	
	//카드체크리스트를 생성한다
	public int cardCheckListInsert(CardCheckListDTO checkList) {
		int result = 0;
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		result = dao.checkListInsert(checkList);
		
		return result;
	}
	
	//카드체크리스트를 조회한다
	public List<CardCheckListDTO> checkListAllSelect(CardCheckListDTO checkList){
		List<CardCheckListDTO> lists = null;
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		lists = dao.checkListSelect(checkList);
		return lists;
	}
	
	//카드체크리스트의 체크여부를 변경한다.
	public void checkListUpdate(CardCheckListDTO checkList){
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		dao.checkListUpdate(checkList);
	}
	
	//카드체크리스트를 삭제한다.
	public int cardCheckListDelete(CardCheckListDTO checkList) {
		int result = 0;
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		result = dao.checkListDelete(checkList);
		
		return result;
	}
}
