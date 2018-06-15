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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.calendar.dto.CalendarDTO;
import site.corin2.calendar.service.CalendarService;

@Controller
public class CalendarController {
	@Autowired
	private CalendarService service; 
	
	@Autowired
	private View jsonview;
	
	//프로젝트 별 일정조회 (프로젝트 넘버로 구분하여 일정 전체조회)
	@RequestMapping("/calendar")
	public String CalendarView(CalendarDTO calendardto, Model model) {
		//List<CalendarDTO> caldata = service.calendarSelect(1);
		
		//model.addAttribute("data",caldata);
		return "calendar.calendar";
	}
	
	//해당 프로젝트의 모든 멤버의 일정을 조회한다.(풀캘린더에 일정조회 위함)
	@RequestMapping("/calendarview")
	public View CalendarSelect(@RequestParam("projectNum") String projectNum, Model model) {
		
		//List<CalendarDTO> calendardto = service.calendarSelect(Integer.parseInt(projectNum));
		List<CalendarDTO> calendardto = service.calendarSelect(1);
		model.addAttribute("data", calendardto);
		
		return jsonview;
	}
	
}
