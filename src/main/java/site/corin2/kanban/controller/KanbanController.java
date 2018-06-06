/**
    파일명: KanbanController.java
    설   명: 
    작성일: 2018. 6. 5.
    작성자: 최 재 욱
*/
package site.corin2.kanban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.kanban.dto.CardDTO;
import site.corin2.kanban.dto.ListDTO;
import site.corin2.kanban.service.KanbanService;

@Controller
public class KanbanController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private KanbanService service;

	@RequestMapping("/kanban")
	public String newFile() {
		return "kanban";
	}
	
	@RequestMapping("/cardInsert")
	public View cardInsertView(CardDTO card, Model model) {
		int result = service.cardInsert(card);
		
		return jsonview;
	}

	@RequestMapping("/cardSelect")
	public View cardSelectView(CardDTO card, Model model) {
		CardDTO dto=null;
		dto = service.cardSelect(card.getCardNum());
		model.addAttribute("dto",dto);
	
		
		return jsonview;
	}
	
	@RequestMapping("/cardUpdate")
	public View cardUpdateView(CardDTO card, Model model) {
		System.out.println("들어왔니?");
		int result = 0;
		result = service.cardUpdate(card);
		model.addAttribute("result",result);
		
		return jsonview;
	}
	
	@RequestMapping("/showList")
	public View showList(Model model) {
		List<ListDTO> lists = service.listAllSelect();
		model.addAttribute("data", lists);
		return jsonview;
	}
	
	@RequestMapping("/showCard")
	public View showCard(@RequestParam("projectNum") String projectNum, Model model) {
		List<CardDTO> cards = service.cardAllSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", cards);
		return jsonview;
	}
}

