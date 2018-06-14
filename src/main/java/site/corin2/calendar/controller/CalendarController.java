/**
    파일명: 캘린더 게시판의 기능과 view를 제어하는 컨트롤러
    설   명: 배현준
    작성일: 2018. 6. 14.
    작성자: 배현준
*/
package site.corin2.calendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;


import site.corin2.calendar.service.CalendarService;

import site.corin2.calendar.dto.CalendarDTO;

@Controller
public class CalendarController {
	
	@RequestMapping("/calendar")
	public String CalendarView() {
		return "calendar.calendar";
	}
}
