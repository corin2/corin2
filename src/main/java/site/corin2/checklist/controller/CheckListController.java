/**
    파일명: CheckListController.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 최 재 욱
*/
package site.corin2.checklist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.checklist.service.CheckListService;
import site.corin2.project.dto.TeamDTO;

@Controller
public class CheckListController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private CheckListService service;
	
	//체크리스트 삽입
	@RequestMapping("/insertCheckList")
	public View checkListInsert(CheckListDTO check, Model model) {
		int result = 0;
		result = service.insertCheckList(check);
		return jsonview;
	}
	
	//체크리스트 전체 검색
	@RequestMapping("/CheckListSelectAll")
	public View selectCheckListAll(CheckListDTO check, Model model) {
		List<CheckListDTO> list = null;
		list = service.selectCheckListAll(check);
		model.addAttribute("list", list);
		return jsonview;
	}
	
	//체크리스트 수정
	@RequestMapping("/updateCheckListContent")
	public View updateCheckListContent(CheckListDTO check, Model model) {
		int result = 0;
		result = service.updateCheckListContent(check);
		return jsonview;
	}
	
	//체크리스트 삭제
	@RequestMapping("/deleteCheckListContent")
	public View deleteCheckLiset (CheckListDTO check, Model model) {
		int result = 0;
		result = service.deleteCheckLiset(check);
		return jsonview;
	}
	
	//사용자 등급 가져오기
	@RequestMapping("/userGradeCheckList")
	public View userGradeCheckList (TeamDTO team, Model model) {
		List<TeamDTO> list = null;
		list = service.userGradeProject(team);
		model.addAttribute("list",list);
		return jsonview;
	}
	
}
