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
	
	/**
	* @함수명 : cardCheckListInsert(CardCheckListDTO checkList)
	* @작성일 : 2018. 06. 07.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트를 생성한다
	* @param CardCheckListDTO - cardNum, checkContent
	* @return int 성공 개수
	**/
	public int cardCheckListInsert(CardCheckListDTO checkList) {
		int result = 0;
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		result = dao.checkListInsert(checkList);
		
		return result;
	}
	
	/**
	* @함수명 : checkListAllSelect(CardCheckListDTO checkList)
	* @작성일 : 2018. 06. 07.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트를 조회한다
	* @param CardCheckListDTO - cardNum
	* @return List - CardCheckListDTO 초회만 모든 카드체크리스트
	**/
	public List<CardCheckListDTO> checkListAllSelect(CardCheckListDTO checkList){
		List<CardCheckListDTO> lists = null;
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		lists = dao.checkListSelect(checkList);
		return lists;
	}
	
	/**
	* @함수명 : checkListUpdate(CardCheckListDTO checkList)
	* @작성일 : 2018. 06. 08.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트의 체크여부 , 내용 을 변경한다
	* @param CardCheckListDTO - isChecked, checkContent, checkNum
	**/
	public void checkListUpdate(CardCheckListDTO checkList){
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		dao.checkListUpdate(checkList);
	}
	
	/**
	* @함수명 : cardCheckListDelete(CardCheckListDTO checkList)
	* @작성일 : 2018. 06. 08.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트를 삭제한다.
	* @param CardCheckListDTO - checkNum
	* @return int 성공 개수
	**/
	public int cardCheckListDelete(CardCheckListDTO checkList) {
		int result = 0;
		CardCheckListDAO dao = sqlSession.getMapper(CardCheckListDAO.class);
		result = dao.checkListDelete(checkList);
		
		return result;
	}
}
