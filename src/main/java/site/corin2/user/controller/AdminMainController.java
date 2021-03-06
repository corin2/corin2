/**
    파일명: AdminMainController.java
    설   명: 관리자 메인 페이지 Controller
    작성일: 2018. 6. 21.
    작성자: 강 성 훈
*/

package site.corin2.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.user.dto.CountByDateDTO;
import site.corin2.user.dto.DateParamDTO;
import site.corin2.user.dto.EmailCountDTO;
import site.corin2.user.dto.LanguageCountDTO;
import site.corin2.user.service.AdminMainService;

@Controller
public class AdminMainController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private AdminMainService service;
	
	/**
	    * @함수명 : allVisitCountView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 총 방문자 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("allVisitCount")
	public View allVisitCountView(Model model) {
		int allVisitCountResult = service.allVisitCount();
		model.addAttribute("count", allVisitCountResult);
		return jsonview;
	}
	
	/**
	    * @함수명 : allUserCountView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 모든 회원 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("allUserCount")
	public View allUserCountView(Model model) {
		int allUserCountResult = service.allUserCount();
		model.addAttribute("count", allUserCountResult);
		return jsonview;
	}
	
	/**
	    * @함수명 : allProjectCountView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 모든 프로젝트 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("allProjectCount")
	public View allProjectCountView(Model model) {
		int allProjectCountResult = service.allProjectCount();
		model.addAttribute("count", allProjectCountResult);
		return jsonview;
	}
	
	/**
	    * @함수명 : allLanguageCountView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 프로젝트 언어별 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("allLanguageCount")
	public View allLanguageCountView(Model model) {
		List<LanguageCountDTO> allLanguageCountResult = service.allLanguageCount();
		model.addAttribute("count", allLanguageCountResult);
		return jsonview;
	}
	
	/**
	    * @함수명 : allEmailCountView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 회원의 모든 이메일 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("allEmailCount")
	public View allEmailCountView(Model model) {
		List<EmailCountDTO> allEmailCountResult = service.allEmailCount();
		model.addAttribute("count", allEmailCountResult);
		return jsonview;
	}
	
	/**
	    * @함수명 : visitCountByDateView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 방문자 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("visitCountByDate")
	public View visitCountByDateView(DateParamDTO date, Model model) {
		List<CountByDateDTO> visitCountByDateResult = service.visitCountByDate(date);
		model.addAttribute("count", visitCountByDateResult);
		return jsonview;
	}
	
	/**
	    * @함수명 : userCountByDateView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 회원 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("userCountByDate")
	public View userCountByDateView(DateParamDTO date, Model model) {
		List<CountByDateDTO> userCountByDateResult = service.userCountByDate(date);
		model.addAttribute("count", userCountByDateResult);
		return jsonview;
	}
	
	/**
	    * @함수명 : projectCountByDateView
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 프로젝트 수
	    * @param : Model model
	    * @retrun : jsonview
	*/
	@RequestMapping("projectCountByDate")
	public View projectCountByDateView(DateParamDTO date, Model model) {
		List<CountByDateDTO> projectCountByDateResult = service.projectCountByDate(date);
		model.addAttribute("count", projectCountByDateResult);
		return jsonview;
	}
	
}