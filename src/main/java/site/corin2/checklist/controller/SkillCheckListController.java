/**
    파일명: SkillCheckListController.java
    설   명: 
    작성일: 2018. 6. 15.
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
import site.corin2.checklist.dto.SkillCheckListDTO;
import site.corin2.checklist.service.SkillCheckListService;

@Controller
public class SkillCheckListController {

	@Autowired
	private View jsonview;
	
	@Autowired
	private SkillCheckListService service;
	
	@RequestMapping("/checklist")
	public String checkListGo() {
		
		return "checklist.checklist";
	}
	//기본 데이터 뿌려주기
	@RequestMapping("/checkListSelect")
	public View skillCheckListAllSelect(SkillCheckListDTO skillcheck, Model model) {
		List<CheckListDTO> list = null;
		list = service.checkListAllSelect();
		model.addAttribute("list", list);
		return jsonview;
	}
	
	//체크여부 삽입
	@RequestMapping("/insertChecked")
	public View checkedInsert(SkillCheckListDTO skillcheck, Model model) {
		int result = 0;
		result = service.checkListCheckInsert(skillcheck);
		return jsonview;
	}
	
	//체크여부 뿌려주기
	@RequestMapping("/selectChecked")
	public View checkedSelect(SkillCheckListDTO skillcheck, Model model) {
		List<SkillCheckListDTO> list = null;
		list = service.checkedSelect(skillcheck);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	//체크여부 삭제
	@RequestMapping("/deleteChecked")
	public View checkedDelete(SkillCheckListDTO skillcheck, Model model) {
		int result = 0;
		result = service.checkedDelete(skillcheck);
		return jsonview;
	}
	
	
}
