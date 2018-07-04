/**
    파일명: CardCheckListController.java
    설   명: 카드체크리스트에 대한 컨트롤러
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
	
	/**
	* @함수명 : CheckListInsertView(CardCheckListDTO checkList, Model model)
	* @작성일 : 2018. 06. 07.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트를 생성한다
	* @param CardCheckListDTO - cardNum, checkContent
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/cardCheckListInsert")
	public View CheckListInsertView(CardCheckListDTO checkList, Model model) {
		service.cardCheckListInsert(checkList);
		return jsonview;
	}
	
	/**
	* @함수명 : cardCheckListSelectView(CardCheckListDTO checkList, Model model)
	* @작성일 : 2018. 06. 07.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트를 조회한다
	* @param CardCheckListDTO - cardNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/cardCheckListSelect")
	public View cardCheckListSelectView(CardCheckListDTO checkList, Model model) {
		List<CardCheckListDTO> list = null;
		list = service.checkListAllSelect(checkList);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	/**
	* @함수명 : checkedUpdate(CardCheckListDTO checkList, Model model)
	* @작성일 : 2018. 06. 08.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트의 체크여부 , 내용 을 변경한다
	* @param CardCheckListDTO - isChecked, checkContent, checkNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/checkedUpdate")
	public View checkedUpdate(CardCheckListDTO checkList, Model model) {
		service.checkListUpdate(checkList);
		return jsonview;
	}
	
	/**
	* @함수명 : cardCheckListDeleteView(CardCheckListDTO checkList, Model model)
	* @작성일 : 2018. 06. 08.
	* @작성자 : 김 진 원
	* @설명 : 카드체크리스트를 삭제한다.
	* @param CardCheckListDTO - checkNum
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("/checkListDelete")
	public View cardCheckListDeleteView(CardCheckListDTO checkList, Model model) {
		service.cardCheckListDelete(checkList);
		return jsonview;
	}
}
