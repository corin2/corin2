/**
    파일명: AdminController.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 김 진 원
*/

package site.corin2.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.kanban.dto.ListDTO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.skill.dto.SkillDTO;
import site.corin2.user.dto.UserGradeDTO;
import site.corin2.user.service.AdminService;

@Controller
public class AdminController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private AdminService service;
	
	//메뉴관리
	@RequestMapping("adminMenu")
	public String adminMenu() {
		return "admin.adminMenu";
	}
	
	//스킬메뉴관리
	@RequestMapping("skillManagement")
	public View skillManagement(Model model) {
		List<SkillDTO> skills = service.skillAllSelect();
		model.addAttribute("data", skills);
		return jsonview;
	}
	
	//유저등급메뉴관리
	@RequestMapping("userGradeManagement")
	public View languageManagement(Model model) {
		List<UserGradeDTO> languages = service.userGradeAllSelect();
		model.addAttribute("data", languages);
		return jsonview;
	}
	
	//스킬수정
	@RequestMapping("skillEdit")
	public View skillEdit(SkillDTO skill) {
		service.skillUpdate(skill);
		return jsonview;
	}
	
	//리스트수정
	@RequestMapping("listEdit")
	public View listEdit(ListDTO list) {
		service.listUpdate(list);
		return jsonview;
	}
	
	//언어수정
	@RequestMapping("languageEdit")
	public View languageEdit(LanguageDTO language) {
		service.languageUpdate(language);
		return jsonview;
	}
	
	//유저등급수정
	@RequestMapping("userGradeEdit")
	public View userGradeEdit(UserGradeDTO userGrade) {
		service.userGradeUpdate(userGrade);
		return jsonview;
	}
}
