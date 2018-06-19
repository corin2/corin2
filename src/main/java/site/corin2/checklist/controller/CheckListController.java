/**
    파일명: CheckListController.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 최 재 욱
*/
package site.corin2.checklist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.checklist.service.CheckListService;

@Controller
public class CheckListController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private CheckListService service;
	
	@RequestMapping("/insertCheckList")
	public View checkListInsert(CheckListDTO check, Model model) {
		int result = 0;
		result = service.insertCheckList(check);
		return jsonview;
	}
	
}
