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

@Controller
public class TroubleController {
	
	@Autowired
	private TroubleService service; 

	//position trouble
	@RequestMapping("/position.troubleshooting")
	public String positiontrouble(TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSelect(1);
		model.addAttribute("data",troubles);
		return "position.troubleshooting";
	}
	
	//트러블 슈팅 게시판조회 (팀별)
	@RequestMapping("/trouble")
	public String troubleList(TroubleShootingDTO trouble, Model model,@RequestParam("projectNum") int projectNum) {
		List<TroubleShootingDTO> troubles = service.troubleSelect(projectNum);
		
		model.addAttribute("data",troubles);
		return "board.trouble";
	}
	
	//트러블 슈팅 게시판조회 (전체,검색어)
	@RequestMapping("/search")
	public String troubleListSearch(String searchWord,TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSearch(searchWord);
			
		model.addAttribute("data",troubles);
		return "board.troubleAll";
	}
	
	//트러블 슈팅 게시판조회 (전체,태그)
	@RequestMapping("/searchTag")
	public String troubleListTag(String searchTag,TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSearchTag(searchTag);
				
		model.addAttribute("data",troubles);
		return "board.troubleAll";
	}
	
	//트러블 슈팅 게시판조회 (전체)
		@RequestMapping("/troubleAll")
		public String troubleAllList(TroubleShootingDTO trouble, Model model) {
			List<TroubleShootingDTO> troubles = service.troubleAllSelect();
			
			model.addAttribute("data",troubles);
			return "board.troubleAll";
		}
	
	//트러블 슈팅 글쓰기 (화면)
		@RequestMapping("/troubleins")
		public String troubleIns() {
			
			return "board.troubleInsert";
		}
	
	//트러블 슈팅 글쓰기 (처리)
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
	
	//트러블 슈팅 게시판조회 (팀별)
	@RequestMapping("/troubleView")
	public String troubleDetailView(Model model,int boardNum) {
		TroubleShootingDTO troubleDTO = service.troubleView(boardNum);
			
		model.addAttribute("data",troubleDTO);
		return "board.troubleView";
	}
	
	//트러블 슈팅 게시글 수정
	@RequestMapping("/update")
	public String troubleUpdate(TroubleShootingDTO dto, Model model) {
		int result = 0;
		result = service.troubleUpdate(dto);
		model.addAttribute("result",result);
		
		return "redirect:trouble?projectNum="+dto.getProjectNum();
	}
	
	//트러블 슈팅 게시글 삭제 (삭제가 아닌, isdeleted 를 1로 업데이트)
	@RequestMapping("/delete")
	public String troubleDelete(TroubleShootingDTO dto, Model model) {
		int result = 0;
		System.out.println(dto.getBoardNum());
		result = service.troubleDelete(dto);
		model.addAttribute("result",result);
		
		return "redirect:trouble?projectNum="+dto.getProjectNum();
	}
}

