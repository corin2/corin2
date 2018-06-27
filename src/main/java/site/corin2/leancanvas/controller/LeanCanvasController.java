/**
    파일명: LeanCanvasController.java
    설   명: 
    작성일: 2018. 6. 25.
    작성자: 최 재 욱
*/
package site.corin2.leancanvas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import site.corin2.leancanvas.dto.LeanCanvasDTO;
import site.corin2.leancanvas.service.LeanCanvasService;

@Controller
public class LeanCanvasController {

	@Autowired
	private LeanCanvasService service;
	
	@Autowired
	private View jsonview;
	
	@RequestMapping("/leancanvas")
	public String goLeanCanvas() {
		return "leancanvas.leancanvas";
	}
	
	@RequestMapping("/leanInsert")
	public View leanCanvasInsertView(LeanCanvasDTO lean) {
		int result = service.leanInsert(lean);
		return jsonview;
		
	}
	
	@RequestMapping("/leanCanvasAllSelect")
	public View leanAllSelectView(LeanCanvasDTO lean, Model model) {
		List<LeanCanvasDTO> list = null;
		list = service.leanAllSelect(lean);
		model.addAttribute("list",list);
		return jsonview;
		
	}
	
	@RequestMapping("/leanUpdate")
	public View leanUpdateView(LeanCanvasDTO lean) {
		int result = service.leanUpdate(lean);
		return jsonview;
	}
}
