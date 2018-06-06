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
import org.springframework.web.servlet.View;

import site.corin2.kanban.dto.CardDTO;
import site.corin2.kanban.service.KanbanService;

@Controller
public class KanbanController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private KanbanService kanbanService;
	/**
	 * 
	  날      짜 : 2018. 6. 5.
	  기      능 : 칸반들어오는 함수
	  작성자명 : 최 재 욱
	 */
	@RequestMapping("/kanban")
	public String newFile() {
		return "kanban";
	}
	/**
	 * 
	  날      짜 : 2018. 6. 5.
	  기      능 : 카드 삽입하는 함수
	  작성자명 : 최 재 욱
	 */
	@RequestMapping("/cardInsert")
	public View cardInsertView(CardDTO card, Model model) {
		int result = 0;
		result = kanbanService.cardInsert(card);
		
		return jsonview;
	}
	/**
	 * 
	  날      짜 : 2018. 6. 6.
	  기      능 : 카드 디테일 제목 & 내용 뿌려주기
	  작성자명 : 최 재 욱
	 */
	@RequestMapping("/cardSelect")
	public View cardSelectView(CardDTO card, Model model) {
		CardDTO dto=null;
		dto = kanbanService.cardSelect(card.getCardNum());
		model.addAttribute("dto",dto);
	
		
		return jsonview;
	}
	/**
	  날      짜 : 2018. 6. 6.
	  기      능 : 카드 수정 
	  작성자명 : 최 재 욱
	 */
	@RequestMapping("/cardUpdate")
	public View cardUpdateView(CardDTO card, Model model) {
		System.out.println("들어왔니?");
		int result = 0;
		result = kanbanService.cardUpdate(card);
		model.addAttribute("result",result);
	
		
		return jsonview;
	}
	
	
	
	
}

