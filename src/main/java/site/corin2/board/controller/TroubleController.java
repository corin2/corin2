/**
    파일명: 트러블 슈팅 게시판의 기능과 view를 제어하는 컨트롤러
    설   명: 배현준
    작성일: 2018. 6. 7.
    작성자: 배현준
*/
package site.corin2.board.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import site.corin2.board.dto.TroubleShootingDTO;
import site.corin2.board.service.TroubleService;
import site.corin2.paging.PagingBean;

@Controller
public class TroubleController {
	
	@Autowired
	private TroubleService service; 

	/**
	    * @함수명 : positiontrouble
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : position trouble
	    * @param TroubleShootingDTO
	    * @return String
	*/
	@RequestMapping("/position.troubleshooting")
	public String positiontrouble(TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSelect(1);
		model.addAttribute("data",troubles);
		return "position.troubleshooting";
	}
	
	/**
	    * @함수명 : troubleList
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시판조회 (팀별)
	    * @param TroubleShootingDTO,int projectNum
	    * @return board.trouble
	*/
	@RequestMapping("/trouble")
	public String troubleList(PagingBean page,TroubleShootingDTO trouble, Model model,@RequestParam("projectNum") int projectNum) {
		List<TroubleShootingDTO> troubles = service.troubleSelect(projectNum);
		int totalCount = service.totalSelectProjectNum(projectNum);//조회한 총 게시물 개수
		page.setTotalCount(totalCount);
		 
		model.addAttribute("data",troubles);
		model.addAttribute("page", page);
		model.addAttribute("total", totalCount);
		
		return "board.trouble";
	}
	
	/**
	    * @함수명 : troubleListSearch
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시판조회 (전체,검색어)
	    * @param String,TroubleShootingDTO
	    * @return board.troubleAll
	*/
	@RequestMapping("/search")
	public String troubleListSearch(String searchWord,TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSearch(searchWord);
			
		model.addAttribute("data",troubles);
		return "board.troubleAll";
	}
	
	/**
	    * @함수명 : troubleListTag
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시판조회 (전체,태그)
	    * @param String searchTag, TroubleShootingDTO
	    * @return board.troubleAll
	*/
	@RequestMapping("/searchTag")
	public String troubleListTag(String searchTag,TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSearchTag(searchTag);
				
		model.addAttribute("data",troubles);
		return "board.troubleAll";
	}
	
	/**
	    * @함수명 : troubleListAct
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시판조회 (팀,태그&검색어 동적쿼리) 
	    * @param int projectNum,String search,String type
	    * @return board.trouble
	*/
	@RequestMapping("/searchAct")
	public String troubleListAct(int projectNum,String search,String type,TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSearchAct(projectNum,search,type);
					
		model.addAttribute("data",troubles);
		return "board.trouble";
	}
	
	/**
	    * @함수명 : troubleAllList
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시판조회 (전체) 
	    * @param TroubleShootingDTO
	    * @return board.troubleAll
	*/
	@RequestMapping("/troubleAll")
	public String troubleAllList(PagingBean page, TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleAllSelect();
		int totalCount = service.totalSelect();//조회한 총 게시물 개수
		page.setTotalCount(totalCount);
		
		model.addAttribute("data",troubles);
		model.addAttribute("page", page);
		model.addAttribute("total", totalCount);
		return "board.troubleAll";
	}
	
	/**
	    * @함수명 : troubleIns
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 글쓰기 (화면) 
	    * @param void
	    * @return board.troubleInsert
	*/
	@RequestMapping("/troubleins")
	public String troubleIns() {
			
		return "board.troubleInsert";
	}
	
	/**
	    * @함수명 : troubleInsert
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 글쓰기 (처리) 
	    * @param TroubleShootingDTO,int pNum
	    * @return redirect:trouble
	*/
	@RequestMapping("/insert")
	public String troubleInsert(TroubleShootingDTO dto,@RequestParam("pNum") int pNum) {
		 
		int result2=0;
		int pNumber=pNum;
		
		//board 테이블 insert 결과
		int result = service.troubleInsert(dto);
			
		if (result>0) {
			result2 = service.troubleInsertDetail(dto);
		}
		
		return "redirect:trouble?projectNum="+pNumber;
		
	}
	
	/**
	    * @함수명 : troubleDetailView
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시판조회 (팀별)
	    * @param int boardNum
	    * @return board.troubleView
	*/
	@RequestMapping("/troubleView")
	public String troubleDetailView(Model model,int boardNum) {
		TroubleShootingDTO troubleDTO = service.troubleView(boardNum);
			
		model.addAttribute("data",troubleDTO);
		return "board.troubleView";
	}
	
	/**
	    * @함수명 : troubleEditView
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 수정화면으로 이동
	    * @param int boardNum
	    * @return board.troubleUpdate
	*/
	@RequestMapping("/troubleEdit")
	public String troubleEditView(Model model,int boardNum) {
		TroubleShootingDTO troubleDTO = service.troubleView(boardNum);
			
		model.addAttribute("data",troubleDTO);
		return "board.troubleUpdate";
	}
	
	
	/**
	    * @함수명 : troubleUpdate
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시글 수정
	    * @param TroubleShootingDTO
	    * @return redirect:trouble
	*/
	@RequestMapping("/update")
	public String troubleUpdate(TroubleShootingDTO dto, Model model) {
		int result = 0;
		result = service.troubleUpdate(dto);
		model.addAttribute("result",result);
		
		return "redirect:trouble?projectNum="+dto.getProjectNum();
	}
	
	
	/**
	    * @함수명 : troubleDelete
	    * @작성일 : 2018. 6. 14.
	    * @작성자 : 배현준
	    * @설명 : 트러블 슈팅 게시글 삭제 (삭제가 아닌, isdeleted 를 1로 업데이트)
	    * @param TroubleShootingDTO,int pNum
	    * @return redirect:trouble
	*/
	@RequestMapping("/delete")
	public String troubleDelete(TroubleShootingDTO dto, Model model,@RequestParam("pNum") int pNum) {
		int result = 0;
		result = service.troubleDelete(dto);
		model.addAttribute("result",result);
		
		return "redirect:trouble?projectNum="+pNum;
	}
	
	
	/**
	    * @함수명 : troubleExcel
	    * @작성일 : 2018. 6. 18.
	    * @작성자 : 배현준
	    * @설명 : 엑셀저장 (팀)
	    * @param TroubleShootingDTO , int projectNum
	    * @return troubleExcel
	*/
	@RequestMapping("/excel")
	public String troubleExcel(TroubleShootingDTO trouble, Model model,@RequestParam("projectNum") int projectNum) {
		List<TroubleShootingDTO> troubleDTO = service.troubleSelect(projectNum);
		
		model.addAttribute("data",troubleDTO);
		return "troubleExcel";
	}
	
	/**
	    * @함수명 : troubleExcel
	    * @작성일 : 2018. 6. 18.
	    * @작성자 : 배현준
	    * @설명 : 엑셀저장(전체)
	    * @param TroubleShootingDTO
	    * @return troubleExcel
	*/
	@RequestMapping("/excelAll")
	public String troubleExcel(TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubleDTO = service.troubleAllSelect();
			
		model.addAttribute("data",troubleDTO);
		return "troubleExcel";
	}
	
}

