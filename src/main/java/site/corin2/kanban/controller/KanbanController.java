/**
    파일명: KanbanController.java
    설   명: 칸반에 사용하는 컨트롤러
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

	/**
	* @함수명 : positionkanban()
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : position에서 사용 칸반페이지 할 tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("/position.kanban")
	public String positionkanban(@RequestParam("projectNum") String projectNum, Model model) {
		model.addAttribute("projectNum", projectNum);
		return "position.kanban";
	}
		
	/**
	* @함수명 : newFile()
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 칸반 페이지로 보내주기 + tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("/kanban")
	public String newFile() {
		return "kanban.kanban";
	}
	
	/**
	* @함수명 : cardInsertView(CardDTO card, Model model)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 카드를 생성한다.
	* @param CardDTO - projectNum, cardName
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/cardInsert")
	public View cardInsertView(CardDTO card, Model model) {
		service.cardInsert(card);
		return jsonview;
	}

	/**
	* @함수명 : cardSelectView(CardDTO card, Model model)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 카드 한개의 모든 정보
	* @param CardDTO - cardNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/cardSelect")
	public View cardSelectView(CardDTO card, Model model) {
		CardDTO dto = null;
		dto = service.cardSelect(card.getCardNum());
		model.addAttribute("dto",dto);
		return jsonview;
	}
	
	/**
	* @함수명 : cardUpdateView(CardDTO card, Model model)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 카드를 수정한다.
	* @param CardDTO - cardName, cardContent, cardNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/cardUpdate")
	public View cardUpdateView(CardDTO card, Model model) {
		int result = 0;
		result = service.cardUpdate(card);
		model.addAttribute("result",result);
		
		return jsonview;
	}
	
	/**
	* @함수명 : showList(Model model)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 모든 리스트를 조회한다.
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/showList")
	public View showList(Model model) {
		List<ListDTO> lists = service.listAllSelect();
		model.addAttribute("data", lists);
		return jsonview;
	}
	
	/**
	* @함수명 : showCard(String projectNum, Model model)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 모든 카드를 조회한다.
	* @param projectNum - projectNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/showCard")
	public View showCard(@RequestParam("projectNum") String projectNum, Model model) {
		List<CardDTO> cards = service.cardAllSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", cards);
		return jsonview;
	}
	
	/**
	* @함수명 : deleteCard(String cardNum, Model model)
	* @작성일 : 2018. 06. 05.
	* @작성자 : 김 진 원
	* @설명 : 카드를 삭제한다.
	* @param cardNum - cardNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/cardDelete")
	public View deleteCard(String cardNum, Model model) {
		int card = Integer.parseInt(cardNum);
		int result = 0;
		result = service.cardDelete(card);
		model.addAttribute("result",result);
		return jsonview;
	}
	
	/**
	* @함수명 : updateCardTitle(CardDTO card, Model model)
	* @작성일 : 2018. 06. 06.
	* @작성자 : 김 진 원
	* @설명 : 카드 제목을 변경한다.
	* @param CardDTO - cardName, cardContent, cardNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/cardTitleUpdate")
	public View updateCardTitle(CardDTO card, Model model) {
		int result = 0;
		result = service.cardUpdate(card);
		model.addAttribute("result",result);
		return jsonview;
	}
	
	/**
	* @함수명 : cardTaxisUpdate(String listNum, String userId, String cardTaxis, String cardNum)
	* @작성일 : 2018. 06. 06.
	* @작성자 : 김 진 원
	* @설명 : 카드의 순서를 변경한다.
	* @param listNum - listNum
	* @param userId - userId
	* @param cardTaxis - cardTaxis
	* @param cardNum - cardNum
	**/
	@RequestMapping("/cardTaxisUpdate")
	public View cardTaxisUpdate(String listNum, String userId, String cardTaxis, String cardNum) {
		service.cardTaxisUpdate(listNum.split("listnum")[1], userId, cardTaxis, cardNum);
		return jsonview;
	}
}

