/**
    파일명: KanbanService.java
    설   명: 칸반보드 관련 서비스
    작성일: 2018. 6. 5.
    작성자: 최 재 욱
*/
package site.corin2.kanban.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.calendar.dao.CalendarDAO;
import site.corin2.calendar.dto.CalendarDTO;
import site.corin2.kanban.dao.KanbanDAO;
import site.corin2.kanban.dto.CardDTO;
import site.corin2.kanban.dto.ListDTO;

@Service
public class KanbanService {
	
	@Autowired
	private SqlSession sqlSession;

	/**
	* @함수명 : cardInsert(CardDTO card)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 카드를 생성한다.
	* @param CardDTO - projectNum, cardName
	* @return int 성공한 갯수
	**/
	public int cardInsert(CardDTO card) {
		int result =0;
		KanbanDAO dao = sqlSession.getMapper(KanbanDAO.class);
		result = dao.cardInsert(card);
		return result;
	}
	
	/**
	* @함수명 : cardSelect(int cardNum)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 카드 한개의 모든 정보
	* @param cardNum - cardNum
	* @return CardDTO 조회한 card
	**/
	public CardDTO cardSelect(int cardNum) {
		CardDTO dto = null;
		KanbanDAO dao = sqlSession.getMapper(KanbanDAO.class);
		dto = dao.cardSelect(cardNum);
		
		return dto;
	}
	
	/**
	* @함수명 : cardUpdate(CardDTO card)
	* @작성일 : 2018. 06. 06.
	* @작성자 : 김 진 원
	* @설명 : 카드 제목을 변경한 후 변경이 성공한 카드가 캘린더에 저장되어 있는 것이라면
	* 		캘린더도 업데이트해준다.
	* @param CardDTO - cardName, cardContent, cardNum
	* @return int 성공 개수
	**/
	public int cardUpdate(CardDTO card) {
		int result = 0;
		KanbanDAO dao = sqlSession.getMapper(KanbanDAO.class);
		result = dao.cardUpdate(card);
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		CalendarDTO calendar = new CalendarDTO();
		calendar.setCardNum(card.getCardNum());
		calendar = calendarDAO.calendarSelect(calendar);
		if(calendar != null) {
			if(calendar.getIsDeleted() == 0) {
				calendar.setCalendarName(card.getCardName());
				calendarDAO.cardCalendarResetColor(calendar);
			}
		}
		
		return result;
	}
	
	/**
	* @함수명 : listAllSelect()
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 모든 리스트를 조회한다.
	* @return List-ListDTO 모든 list테이블에 있는 정보
	**/
	public List<ListDTO> listAllSelect(){
		KanbanDAO kanbanDAO = sqlSession.getMapper(KanbanDAO.class);
		List<ListDTO> lists = null;
		try {
			lists = (ArrayList<ListDTO>)kanbanDAO.listAllSelect();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return lists;
	}
	
	/**
	* @함수명 : cardAllSelect(int projectNum)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 프로젝트에 속한 모든 카드를 조회한다.
	* @param projectNum - projectNum
	* @param Model - json으로 보내줄 data
	* @return List - CardDTO 조회한 모든 card 정보
	**/
	public List<CardDTO> cardAllSelect(int projectNum){
		KanbanDAO kanbanDAO = sqlSession.getMapper(KanbanDAO.class);
		List<CardDTO> cards = null;
		try {
			cards = (ArrayList<CardDTO>)kanbanDAO.cardAllSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return cards;
	}
	
	/**
	* @함수명 : cardDelete(int cardNum)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 카드를 삭제 했을 때, 그 카드가 속해 있는 리스트의 순서들을 다시 업데이트 해준다.
	* @param cardNum - cardNum
	* @return int 성공한 개수
	**/
	public int cardDelete(int cardNum) {
		KanbanDAO dao = sqlSession.getMapper(KanbanDAO.class);
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		int result = 0;
		CardDTO card = dao.cardSelect(cardNum);
		dao.cardDeleteTaxis(card); //카드순서
		dao.cardDelete(cardNum); //카드삭제
		CalendarDTO calendar = new CalendarDTO();
		calendar.setCardNum(cardNum);
		calendar = calendarDAO.calendarSelect(calendar);
		if(calendar != null) {
			calendarDAO.cardCalendarDelete(calendar);
		}
		return result;
	}
	
	/**
	* @함수명 : cardTaxisUpdate(String listNum, String userId, String cardTaxis, String cardNum)
	* @작성일 : 2018. 06. 06.
	* @작성자 : 김 진 원
	* @설명 : 카드의 순서를 변경하되 만약 그 카드가 리스트도 바뀌는 카드이고, 그 카드가 캘린더에
	* 		저장되어 있는 카드캘린더라면 그 카드캘린더의 색깔을 업데이트해준다.
	* @param listNum - listNum
	* @param userId - userId
	* @param cardTaxis - cardTaxis
	* @param cardNum - cardNum
	**/
	public int cardTaxisUpdate(String listNum, String userId, String cardTaxis, String cardNum) {
		KanbanDAO kanbanDAO = sqlSession.getMapper(KanbanDAO.class);
		int result = 0;
		if(userId.equals("null")) userId = null;
		
		String[] taxis = null;
		if(cardTaxis.indexOf(",") > -1) taxis = cardTaxis.split(",");
		else {
			taxis = new String[1];
			taxis[0] = cardTaxis;
		}
		
		int y = 1;
		for(int i = 0; i < taxis.length; i++) {
			if(taxis[i].substring(0, 1).equals("c")) {
				CardDTO card = new CardDTO();
				card.setListNum(Integer.parseInt(listNum));
				card.setCardNum(Integer.parseInt(taxis[i].split("cardNum")[1]));
				card.setUserId(userId);
				card.setCardTaxis(y++);
				result = kanbanDAO.cardTaxisUpdate(card);
				if(card.getCardNum() == Integer.parseInt(cardNum)) {
					int list = Integer.parseInt(listNum);
					String color = "";
					switch (list) {
					case 1:  color = "#4477AA"; break;
					case 3:  color = "#117733"; break;
					case 4:  color = "#DDCC77"; break;
					case 5:  color = "#CC6677"; break;
					case 6:  color = "#A593E0"; break;
					case 7:  color = "#CBE86B"; break;
					case 8:  color = "#FEC9C9"; break;
					case 9:  color = "#1EC0FF"; break;
					default: color = "#C9D5DE"; break;
					}
					CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
					CalendarDTO calendar = new CalendarDTO();
					calendar.setCardNum(Integer.parseInt(cardNum));
					calendar = calendarDAO.calendarSelect(calendar);
					if(calendar != null) {
						if(calendar.getIsDeleted() == 0) {
							calendar.setCalendarColor(color);
							calendarDAO.cardCalendarResetColor(calendar);
						}
					}
				}
			}
		}
		
		return result;
	}
	
}
