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
	
	/**
	* @함수명 : leanCanvasInsertView(LeanCanvasDTO lean)
	* @작성일 : 2018. 6. 22.
	* @작성자 : 최재욱
	* @설명 : 린캔버스에 해당하는 내용을 DB에 저장하기 위한 함수이다.
	* @param LeanCanvasDTO lean- lean 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/leanInsert")
	public View leanCanvasInsertView(LeanCanvasDTO lean) {
		int result = service.leanInsert(lean);
		return jsonview;
		
	}
	
	/**
	* @함수명 : leanAllSelectView(LeanCanvasDTO lean, Model model)
	* @작성일 : 2018. 6. 22.
	* @작성자 : 최재욱
	* @설명 : 린캔번스의 내용이 해당하는 칸에 컬럼명과 일치하는 내용을 보여준다.
	* 또한 정규 표현식을 활용하여 태그의 유출없이 해당 내용을 보여주게 하였다.
	* @param LeanCanvasDTO lean- lean 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/leanCanvasAllSelect")
	public View leanAllSelectView(LeanCanvasDTO lean, Model model) {
		List<LeanCanvasDTO> list = null;
		list = service.leanAllSelect(lean);
		model.addAttribute("list",list);
		return jsonview;
		
	}
	
	/**
	* @함수명 : leanUpdateView(LeanCanvasDTO lean)
	* @작성일 : 2018. 6. 22.
	* @작성자 : 최재욱
	* @설명 : 사용자가 작성한 내용을 DB상에 수정해 주는 함수이다.
	* @param LeanCanvasDTO lean- lean 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/leanUpdate")
	public View leanUpdateView(LeanCanvasDTO lean) {
		int result = service.leanUpdate(lean);
		return jsonview;
	}
}
