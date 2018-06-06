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
import site.corin2.kanban.service.KanbanService2;

@Controller
public class KanbanController {
	
	@Autowired
	private KanbanService2 service;
	
	@Autowired
	private View jsonview;
	
	@RequestMapping("/kanban")
	public String newFile() {
		return "kanban";
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
