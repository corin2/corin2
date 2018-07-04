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
	/**
	* @함수명 : skillCheckListAllSelect(CheckListDTO check, Model model)
	* @작성일 : 2018. 6. 20.
	* @작성자 : 최재욱
	* @설명 : 파라미터로 각 프로젝트의 해당하는 멤버의 아이디를 받아
	* 해당위치의 체크리스트의 내용과 멤버의 아이디를 보여주는 함수 이다.
	* @param CheckListDTO check- CheckListDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/checkListSelect")
	public View skillCheckListAllSelect(CheckListDTO check, Model model) {
		List<CheckListDTO> list = null;
		list = service.checkListAllSelect(check);
		model.addAttribute("list", list);
		return jsonview;
	}
	
	/**
	* @함수명 : checkedInsert(checkNum)
	* @작성일 : 2018. 6. 21.
	* @작성자 : 최재욱
	* @설명 : 사용자가 체크를 하엿을때 해당 하는 내용의 체크여부를 DB에 저장 또는 삭제 하기 위한 함수이다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/insertChecked")
	public View checkedInsert(SkillCheckListDTO skillcheck, Model model) {
		int result = 0;
		result = service.checkListCheckInsert(skillcheck);
		return jsonview;
	}
	
	/**
	* @함수명 : checkedSelect(SkillCheckListDTO skillcheck, Model model)
	* @작성일 : 2018. 6. 21.
	* @작성자 : 최재욱
	* @설명 : 체크리스트의 체크여부를 DB 상에서 불러와 
	* 체크한 부분에 체크시켜주기 위한 함수 이다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
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
	
	/**
	* @함수명 : skillCheckListUserId(SkillCheckListDTO skillcheck, Model model)
	* @작성일 : 2018. 6. 20.
	* @작성자 : 최재욱
	* @설명 : 프로젝트의 리더이면 팀원이 작성한 사용자 체크리스트의 결과를
	* 확인 할 수 있는 탭에 th부분을 생성해 준다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/skillCheckListUserId")
	public View skillCheckListUserId(SkillCheckListDTO skillcheck, Model model) {
		List<SkillCheckListDTO> list = null;
		list = service.dataCheckListUserId(skillcheck);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	/**
	* @함수명 : selectCheckedConfirm (SkillCheckListDTO skillcheck, Model model)
	* @작성일 : 2018. 6. 21.
	* @작성자 : 최재욱
	* @설명 : 사용자 체크리스트의 체크여부를 DB 상에서 불러와 
	* 멤버가 체크한 부분에 체크시켜주기 위한 함수 이다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/selectCheckedConfirm")
	public View selectCheckedConfirm (SkillCheckListDTO skillcheck, Model model) {
		List<SkillCheckListDTO> list = null;
		list = service.selectCheckListConfirm(skillcheck);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	
}
