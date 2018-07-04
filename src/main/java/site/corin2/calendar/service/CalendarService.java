package site.corin2.calendar.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.calendar.dao.CalendarDAO;
import site.corin2.calendar.dto.CalendarDTO;
import site.corin2.kanban.dto.CardDTO;

@Service
public class CalendarService {
	
	@Autowired
	private SqlSession sqlSession;
	
	/**
	* @함수명 : addCalendar(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드캘린더 추가를 하기전에 카드넘버로 검색하여 이미 그 캘린더가 DB에 저장되어 있으면
	* 		isDeleted를 1로 업데이트 DB에 저장되어 있지 않으면 insert
	* 		일반캘린더는 바로 insert
	* @param CalendarDTO - calendarName, startDate,
	* 			endDate, calendarColor, cardNum
	**/
	public void addCalendar(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		CalendarDTO calendar2 = calendarDAO.calendarSelect(calendar);
		if(calendar.getCardNum() != 0) {
			if(calendar2 == null) {
				calendarDAO.addCalendar(calendar);
			}else {
				calendarDAO.cardCalendarReset(calendar);
			}
		}else {
			calendarDAO.addCalendar(calendar);
		}
	}
	
	/**
	* @함수명 : calendarAllSelect(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 조회한 CalendarDTO리스트를 modal에 담아 보내준다
	* @param CalendarDTO - projectNum
	* @return List->CalendarDTO 검색한 캘린더 리스트
	**/
	public List<CalendarDTO> calendarAllSelect(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		List<CalendarDTO> calendars = null;
		try {
			calendars = calendarDAO.calendarAllSelect(calendar);
		} catch (Exception e) {
			e.getMessage();
		}
		
		return calendars;
	}
	
	/**
	* @함수명 : cardCalendarDateUpdate(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 위치수정
	* @param CalendarDTO - startDate, endDate, cardNum
	**/
	public void cardCalendarDateUpdate(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.cardCalendarDateUpdate(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	/**
	* @함수명 : cardCalendarDelete(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 삭제
	* @param CalendarDTO - cardNum
	**/
	public void cardCalendarDelete(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.cardCalendarDelete(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	/**
	* @함수명 : modCalendar(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 일반캘린더 수정
	* @param CalendarDTO - calendarName, startDate,
	* 			endDate, calendarColor, calendarNum
	**/
	public void modCalendar(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.modCalendar(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	/**
	* @함수명 : calendarDateUpdate(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 위치수정
	* @param CalendarDTO - startDate, endDate, cardNum
	**/
	public void calendarDateUpdate(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.calendarDateUpdate(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	/**
	* @함수명 : calendarDelete(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 삭제
	* @param CalendarDTO - cardNum
	**/
	public void calendarDelete(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.calendarDelete(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	/**
	* @함수명 : allCardNoCallendar(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 모든 카드 가져오되, 캘린더에 저장된 카드는 가져오지 않는다.
	* @param projectNum - projectNum
	**/
	public List<CardDTO> allCardNoCallendar(int projectNum) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		List<CardDTO> cards = null;
		try {
			cards = calendarDAO.allCardNoCallendar(projectNum);
		} catch (Exception e) {e.getMessage();}
		return cards;
	}
}