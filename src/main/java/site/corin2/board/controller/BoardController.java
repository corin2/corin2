/* 
    파일명: BoardController.java
    설명: 
    작성일: 2018. 6. 7.
    작성자: 전나영
*/
package site.corin2.board.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
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

	//모든 게시물 조회
	@RequestMapping(value="boardList" ,method = RequestMethod.GET)
	public String boardList(Model model) { //리스트화면에서
		 List<BoardDTO> list = service.boardAllSelect();
		 model.addAttribute("list", list);		 
		return "board.boardList";  //리스트화면으로 이동
	}
	

	//글쓰기 get
	@RequestMapping(value="boardInsert" ,method = RequestMethod.GET)
	public String boardInsert() {
		return "board.boardInsert";
	}

	//글쓰기 post
	@RequestMapping(value= "boardInsert" ,method = RequestMethod.POST)
	public String boardanInsert(BoardDTO boardDTO,AnnounceDTO announceDTO) {//글쓰기 처리	
		service.boardInsert(boardDTO); //board insert
		service.announceInsert(announceDTO); //announce insert
		return "redirect:boardList";
	}
	
	//상세보기
	@RequestMapping(value="boardDetail")
	public String boardDetail(int boardnum , Model model) {
		BoardDTO boardDTO= service.boardSelect(boardnum);
		model.addAttribute("detail",boardDTO);
		return "board.boardDetail";
	}
	
	//수정 get
	@RequestMapping(value="boardUpdate",method=RequestMethod.GET)
	public String boardUpdate(int boardnum,Model model) {
		BoardDTO boardDTO= service.boardSelect(boardnum);
		model.addAttribute("detail",boardDTO);
		return "board.boardUpdate";
	}
	
	//수정 post
	@RequestMapping(value="boardUpdate",method=RequestMethod.POST)
	public String boardUpdate(BoardDTO boardDTO,AnnounceDTO announceDTO ) {

		service.boardUpdate(boardDTO);
		service.announceUpdate(announceDTO);
		return "redirect:boardDetail?boardnum="+boardDTO.getBoardNum();
	}
	
	//보드 삭제
	@RequestMapping("boardDelete")
	public String boardDelete(int boardnum) {
		
		service.boardDelete(boardnum);
		
		return "redirect:boardList";
	}
	

	
}
