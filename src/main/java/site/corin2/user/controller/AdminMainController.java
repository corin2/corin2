/**
    파일명: AdminMainController.java
    설   명: 관리자 메인 페이지 Controller
    작성일: 2018. 6. 21.
    작성자: 강 성 훈
*/

package site.corin2.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.user.service.AdminMainService;

@Controller
public class AdminMainController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private AdminMainService service;
	
	// isDeleted = 0인 모든 회원 수
	@RequestMapping("allProjectCount")
	public View allUserCount(Model model) {
		int allUserCountResult = service.allProjectCount();
		model.addAttribute("count", allUserCountResult);
		return jsonview;
	}
	
	
	// isDeleted = 0인 모든 프로젝트 수
	@RequestMapping("allProjectCount")
	public View allProjectCount(Model model) {
		int allProjectCountResult = service.allProjectCount();
		model.addAttribute("count", allProjectCountResult);
		return jsonview;
	}
}