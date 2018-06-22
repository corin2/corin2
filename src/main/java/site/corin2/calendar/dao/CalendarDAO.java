/**
    파일명: CalendarDAO.java
    설   명: 
    작성일: 2018. 6. 5.
    작성자: 김 진 원
*/

package site.corin2.calendar.dao;

import java.util.List;

import site.corin2.calendar.dto.CalendarDTO;

public interface CalendarDAO {
	
	//Calendar 추가
	public void addCalendar(CalendarDTO calendar);
	
	//모든 Calendar 조회
	public List<CalendarDTO> calendarAllSelect(CalendarDTO calendar);
	
	//일정 위치수정
	public void calendarDateUpdate(CalendarDTO calendar);
	
	//일정 삭제
	public void calendarDelete(CalendarDTO calendar);
}