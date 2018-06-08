/**
    파일명: CardCheckListController.java
    설   명: 
    작성일: 2018. 6. 7.
    작성자: 최 재 욱
*/
package site.corin2.kanban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.kanban.dto.CardCheckListDTO;
import site.corin2.kanban.service.CardCheckListService;

@Controller
public class CardCheckListController {

	@Autowired
	private View jsonview;
	
	@Autowired
	private CardCheckListService service;
	
	@RequestMapping("/cardCheckListInsert")
	public View CheckListInsertView(CardCheckListDTO checkList, Model model) {
		System.out.println("들어왔니??");
		int result = service.cardCheckListInsert(checkList);
		
		return jsonview;
	}
	
	@RequestMapping("/cardCheckListSelect")
	public View cardCheckListSelectView(CardCheckListDTO checkList, Model model) {
		List<CardCheckListDTO> list = null;
		list = service.checkListAllSelect(checkList);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	@RequestMapping("/checkedUpdate")
	public View checkedUpdate(CardCheckListDTO checkList, Model model) {
		service.checkListUpdate(checkList);
		return jsonview;
	}
}
