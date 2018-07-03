/**
    파일명: CalendarDAO.java
    설   명: 
    작성일: 2018. 6. 5.
    작성자: 김 진 원
*/

package site.corin2.calendar.dao;

import java.util.List;

import site.corin2.calendar.dto.CalendarDTO;
import site.corin2.kanban.dto.CardDTO;

public interface CalendarDAO {
	
	//카드 Calendar 추가
	public void addCalendar(CalendarDTO calendar);
	
	//모든 Calendar 조회
	public List<CalendarDTO> calendarAllSelect(CalendarDTO calendar);
	
	//카드일정 위치수정
	public void cardCalendarDateUpdate(CalendarDTO calendar);
	
	//카드일정 삭제(업데이트)
	public void cardCalendarDelete(CalendarDTO calendar);
	
	//카드일정 복구
	public void cardCalendarReset(CalendarDTO calendar);
	
	//Calendar 한개 조회
	public CalendarDTO calendarSelect(CalendarDTO calendar);
	
	//Calendar 수정
	public void modCalendar(CalendarDTO calendar);
	
	//Calendar 위치수정
	public void calendarDateUpdate(CalendarDTO calendar);
	
	//일정 삭제(업데이트)
	public void calendarDelete(CalendarDTO calendar);
	
	//캘린더 isdeleted 가 0인 것을 뺀 모든 카드 조회
	public List<CardDTO> allCardNoCallendar(int projectNum);
	
	//카드의 순서나 이름이 바뀔시에 저장된 캘린더도 바뀌여야합니다.
	public void cardCalendarResetColor(CalendarDTO calendar);
}