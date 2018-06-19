/**
    파일명: ChartController.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 김 진 원
*/

package site.corin2.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

@Controller
public class ChartController {
	
	@Autowired
	private View jsonview;
	
	@RequestMapping("chart")
	public String chartpage() {
		return "chart.chart";
	}
	
}
