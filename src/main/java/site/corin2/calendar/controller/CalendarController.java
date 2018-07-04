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
import site.corin2.kanban.dto.CardDTO;
import site.corin2.calendar.dto.CalendarDTO;

@Controller
public class CalendarController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private CalendarService service;
	
	/**
	* @함수명 : positioncalendar()
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : position에서 사용 할 캘린더페이지 tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("/position.calendar")
	public String positioncalendar() {
		return "position.calendar";
	}
		
	/**
	* @함수명 : CalendarView()
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 캘린더 페이지로 보내주기 + tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("/calendar")
	public String CalendarView() {
		return "calendar.calendar";
	}
	
	/**
	* @함수명 : addCalendar(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 일반캘린더 , 카드캘린더 추가
	* @param CalendarDTO - calendarName, startDate,
	* 			endDate, calendarColor, cardNum
	* @return View jsonview
	**/
	@RequestMapping("addCalendar")
	public View addCalendar(CalendarDTO calendar) {
		service.addCalendar(calendar);
		return jsonview;
	}
	
	/**
	* @함수명 : modCalendar(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 일반캘린더 수정
	* @param CalendarDTO - calendarName, startDate,
	* 			endDate, calendarColor, calendarNum
	* @return View jsonview
	**/
	@RequestMapping("modCalendar")
	public View modCalendar(CalendarDTO calendar) {
		service.modCalendar(calendar);
		return jsonview;
	}
	
	/**
	* @함수명 : calendarView(CalendarDTO calendar, Model model)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 조회한 CalendarDTO리스트를 modal에 담아 보내준다
	* @param CalendarDTO - projectNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("calendarView")
	public View calendarView(CalendarDTO calendar, Model model) {
		List<CalendarDTO> calendars = service.calendarAllSelect(calendar);
		model.addAttribute("data", calendars);
		return jsonview;
	}
	
	/**
	* @함수명 : cardCalendarDateUpdate(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 위치수정
	* @param CalendarDTO - startDate, endDate, cardNum
	* @return View jsonview
	**/
	@RequestMapping("cardCalendarDateUpdate")
	public View cardCalendarDateUpdate(CalendarDTO calendar) {
		service.cardCalendarDateUpdate(calendar);
		return jsonview;
	}
	
	/**
	* @함수명 : cardCalendarDelete(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 삭제
	* @param CalendarDTO - cardNum
	* @return View jsonview
	**/
	@RequestMapping("cardCalendarDelete")
	public View cardCalendarDelete(CalendarDTO calendar) {
		service.cardCalendarDelete(calendar);
		return jsonview;
	}
	
	/**
	* @함수명 : calendarDateUpdate(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 위치수정
	* @param CalendarDTO - startDate, endDate, cardNum
	* @return View jsonview
	**/
	@RequestMapping("calendarDateUpdate")
	public View calendarDateUpdate(CalendarDTO calendar) {
		service.calendarDateUpdate(calendar);
		return jsonview;
	}
	
	/**
	* @함수명 : calendarDelete(CalendarDTO calendar)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 카드일정 삭제
	* @param CalendarDTO - cardNum
	* @return View jsonview
	**/
	@RequestMapping("calendarDelete")
	public View calendarDelete(CalendarDTO calendar) {
		service.calendarDelete(calendar);
		return jsonview;
	}
	
	/**
	* @함수명 : allCardNoCallendar(String projectNum, Model model)
	* @작성일 : 2018. 06. 25.
	* @작성자 : 김 진 원
	* @설명 : 모든 카드 가져오되, 캘린더에 저장된 카드는 가져오지 않는다.
	* @param projectNum - projectNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("allCardNoCallendar")
	public View allCardNoCallendar(String projectNum, Model model) {
		List<CardDTO> cards = service.allCardNoCallendar(Integer.parseInt(projectNum));
		model.addAttribute("data", cards);
		return jsonview;
	}
}