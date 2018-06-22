/**
    파일명: 캘린더 게시판의 기능과 view를 제어하는 컨트롤러
    설   명: 배현준
    작성일: 2018. 6. 14.
    작성자: 배현준
*/
package site.corin2.calendar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.calendar.service.CalendarService;
import site.corin2.calendar.dto.CalendarDTO;

@Controller
public class CalendarController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private CalendarService service;
	
	//position 칸반으로 보내준다.
	@RequestMapping("/position.calendar")
	public String positioncalendar() {
		return "position.calendar";
	}
		
	@RequestMapping("/calendar")
	public String CalendarView() {
		return "calendar.calendar";
	}
	
	//캘린터 추가
	@RequestMapping("addCalendar")
	public View addCalendar(CalendarDTO calendar) {
		service.addCalendar(calendar);
		return jsonview;
	}
	
	//모든 캘린더 찾기
	@RequestMapping("calendarView")
	public View calendarView(CalendarDTO calendar, Model model) {
		List<CalendarDTO> calendars = service.calendarAllSelect(calendar);
		model.addAttribute("data", calendars);
		return jsonview;
	}
	
	//일정 위치수정
	@RequestMapping("cardCalendarDateUpdate")
	public View cardCalendarDateUpdate(CalendarDTO calendar, Model model) {
		service.cardCalendarDateUpdate(calendar);
		return jsonview;
	}
	
	//일정 삭제
	@RequestMapping("cardCalendarDelete")
	public View cardCalendarDelete(CalendarDTO calendar, Model model) {
		service.cardCalendarDelete(calendar);
		return jsonview;
	}
}