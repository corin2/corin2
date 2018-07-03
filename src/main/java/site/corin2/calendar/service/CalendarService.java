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
	
	//캘린더 추가
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
	
	//모든 캘린더 조회
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
	
	//카드일정 위치수정
	public void cardCalendarDateUpdate(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.cardCalendarDateUpdate(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	//카드일정 삭제
	public void cardCalendarDelete(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.cardCalendarDelete(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	//일정 수정
	public void modCalendar(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.modCalendar(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	//카드일정 위치수정
	public void calendarDateUpdate(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.calendarDateUpdate(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	//카드일정 삭제
	public void calendarDelete(CalendarDTO calendar) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		try {calendarDAO.calendarDelete(calendar);} catch (Exception e) {e.getMessage();}
	}
	
	//카드일정 삭제
	public List<CardDTO> allCardNoCallendar(int projectNum) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		List<CardDTO> cards = null;
		try {
			cards = calendarDAO.allCardNoCallendar(projectNum);
		} catch (Exception e) {e.getMessage();}
		return cards;
	}
}