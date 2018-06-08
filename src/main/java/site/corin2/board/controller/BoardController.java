/* 
    파일명: BoardController.java
    설명: 
    작성일: 2018. 6. 7.
    작성자: 전나영
*/
package site.corin2.board.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.board.dto.AnnounceDTO;
import site.corin2.board.dto.BoardDTO;
import site.corin2.board.service.BoardService;
import site.corin2.project.service.TeamService;

@Controller
public class BoardController {
	

	@Autowired
	private BoardService service;
	
	@Autowired
	private View jsonview;
	
	@RequestMapping(value="announceList" ,method = RequestMethod.GET)
	public String announceList(Model model) { //리스트화면에서
		 List<BoardDTO> list = service.selectList();
		 model.addAttribute("list", list);		 
		return "announceList";  //리스트화면으로 이동
	}
	

	
	@RequestMapping(value="insert" ,method = RequestMethod.GET)
	public String announceInsert() {//글쓰기화면에서
		return "announceInsert";//리스트화면으로 이동
	}

	
	@RequestMapping(value= "insert" ,method = RequestMethod.POST)
	public String announceInsertOK(BoardDTO boardDTO,AnnounceDTO announceDTO) {//글쓰기 처리	
		service.boardInsert(boardDTO);
		service.announceInsert(announceDTO);
		return "redirect:announceList";//리스트화면으로 이동
	}
	
}
