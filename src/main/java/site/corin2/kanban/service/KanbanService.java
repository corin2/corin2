/**
    파일명: KanbanService.java
    설   명: 칸반보드 관련 서비스
    작성일: 2018. 6. 5.
    작성자: 최 재 욱
*/
package site.corin2.kanban.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.kanban.dao.KanbanDAO;
import site.corin2.kanban.dto.CardDTO;

@Service
public class KanbanService {
	
	@Autowired
	private SqlSession sqlSession;
	/**
	  날      짜 : 2018. 6. 6.
	  기      능 : 카드 생성 관련 함수
	  작성자명 : 최 재 욱
	 */
	public int cardInsert(CardDTO card) {
		int result =0;
		KanbanDAO dao = sqlSession.getMapper(KanbanDAO.class);
		
		
		result = dao.cardInsert(card);
		
		return result;
		
	}
	
	/**
	 * 
	  날      짜 : 2018. 6. 6.
	  기      능 : 단일 카드 조회 
	  작성자명 : 최 재 욱
	 */
	public CardDTO cardSelect(int cardNum) {
		System.out.println("cardNum " + cardNum);
		CardDTO dto = null;
		KanbanDAO dao = sqlSession.getMapper(KanbanDAO.class);
		dto = dao.cardSelect(cardNum);
		return dto;
	}
	
	/**
	 * 
	  날      짜 : 2018. 6. 6.
	  기      능 : 카드 수정
	  작성자명 : 최 재 욱
	 */
	public int cardUpdate(CardDTO card) {
		System.out.println("userId " + card.getUserId());
		System.out.println("userId " + card.getCardContent());
		System.out.println("userId " + card.getCardName());
		int result = 0;
		KanbanDAO dao = sqlSession.getMapper(KanbanDAO.class);
		result = dao.cardUpdate(card);
		
		return result;
	}
	
}
