/* 
    파일명: BoardController.java
    설명: 공지사항
    작성일: 2018. 6. 7.
    작성자: 전나영
*/
package site.corin2.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;

import site.corin2.board.dto.AnnounceDTO;
import site.corin2.board.dto.BoardDTO;
import site.corin2.board.service.BoardService;
import site.corin2.paging.PagingBean;

@Controller
public class BoardController {
	

	@Autowired
	private BoardService service;
	
	/**
	    * @함수명 : boardList
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 모든 게시물 조회
	    * @param PagingBean
	    * @return String board.boardList
	 */
	@RequestMapping(value="boardList" ,method = RequestMethod.GET)
	public String boardList(PagingBean page, Model model) { //리스트화면에서
		 List<BoardDTO> list = service.boardAllSelect();//모든 게시물 조회
		 int totalCount = service.totalSelect();//조회한 총 게시물 개수
		 page.setTotalCount(totalCount);
		 model.addAttribute("list", list);	
		 model.addAttribute("page", page);
		return "board.boardList";  //리스트화면으로 이동
	}
	
	/**
	    * @함수명 : boardInsert(GET)
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 관리자인 경우 공지사항에 글쓰기 페이지로 이동
	    * @param PagingBean 
	    * @return String board.boardInsert
	 */
	@RequestMapping(value="boardInsert" ,method = RequestMethod.GET)
	public String boardInsert(PagingBean page, Model model) {
		model.addAttribute("page", page);//페이징 처리
		return "board.boardInsert";
	}
	
	/**
	    * @함수명 : boardanInsert(POST)
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 관리자인 경우 공지사항에 글쓰기 처리
	    * @param BoardDTO, PagingBean, AnnounceDTO
	    * @return String boardList
	 */
	@RequestMapping(value= "boardInsert" ,method = RequestMethod.POST)
	public String boardanInsert(BoardDTO boardDTO, PagingBean page, AnnounceDTO announceDTO) {//글쓰기 처리	
		service.boardInsert(boardDTO); //게시물 insert
		service.announceInsert(announceDTO); //announce insert
		return "redirect:boardList?countPerPage="+page.getCountPerPage()+"&blockCount="+page.getBlockCount()+"&nowPage="+page.getNowPage();
	}
	
	/**
	    * @함수명 : boardDetail
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 공지사항에 있는  특정 게시물 상세보기
	    * @param boardnum, PagingBean
	    * @return String board.boardDetail
	 */
	@RequestMapping(value="boardDetail")
	public String boardDetail(int boardnum, PagingBean page, Model model) {
		BoardDTO boardDTO= service.boardSelect(boardnum);//게시물 상세 조회
		model.addAttribute("detail",boardDTO);
		model.addAttribute("page", page);
		return "board.boardDetail";
	}
	
	/**
	    * @함수명 : boardUpdate(GET)
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 특정 게시물을 수정하는 페이지 보여준다.
	    * @param boardnum, PagingBean
	    * @return String board.boardUpdate
	 */
	@RequestMapping(value="boardUpdate",method=RequestMethod.GET)
	public String boardUpdate(int boardnum, PagingBean page, Model model) {
		BoardDTO boardDTO= service.boardSelect(boardnum);//게시물 상세 조회
		model.addAttribute("detail",boardDTO);
		model.addAttribute("page", page);
		return "board.boardUpdate";
	}
	
	/**
	    * @함수명 : boardUpdate(POST)
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 특정 게시물을 수정처리한다.
	    * @param BoardDTO, PagingBean, AnnounceDTO
	    * @return String boardDetail
	 */
	@RequestMapping(value="boardUpdate",method=RequestMethod.POST)
	public String boardUpdate(BoardDTO boardDTO, PagingBean page, AnnounceDTO announceDTO, Model model) {
		service.boardUpdate(boardDTO);//특정 게시물을 수정처리한다.
		service.announceUpdate(announceDTO);//announce Update
		return "redirect:boardDetail?boardnum="+boardDTO.getBoardNum()+"&countPerPage="+page.getCountPerPage()+"&blockCount="+page.getBlockCount()+"&nowPage="+page.getNowPage();
	}
	
	/**
	    * @함수명 : boardDelete
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 특정 게시물을 삭제한다.
	    * @param boardnum, PagingBean
	    * @return String boardList
	 */
	@RequestMapping("boardDelete")
	public String boardDelete(int boardnum, PagingBean page) {
		service.boardDelete(boardnum);//특정 게시글을 삭제한다.
		return "redirect:boardList?countPerPage="+page.getCountPerPage()+"&blockCount="+page.getBlockCount()+"&nowPage="+page.getNowPage();
	}
}
