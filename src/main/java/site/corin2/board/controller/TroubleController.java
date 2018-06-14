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
import site.corin2.board.dto.TroubleShootingDTO;
import site.corin2.board.service.TroubleService;

@Controller
public class TroubleController {
	
	@Autowired
	private TroubleService service; 
	
	//트러블 슈팅 게시판조회 (팀가입 미구현으로 전체조회만 됨 추후 팀별조회 구현필요)
	@RequestMapping("/trouble")
	public String troubleList(TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubles = service.troubleSelect(1);
		
		model.addAttribute("data",troubles);
		return "board.trouble";
	}
	
	//트러블 슈팅 글쓰기
	@RequestMapping("/insert")
	public String troubleInsert(TroubleShootingDTO dto) {
		//troubleshooting 테이블 insert 결과 
		int result2=0;
		
		//board 테이블 insert 결과
		int result = service.troubleInsert(dto);
		
		if (result>0) {
			result2 = service.troubleInsertDetail(dto);
		}
		if(result2>0) {
			System.out.println("insert"+result2+"row sucess");
		}
		
		return "redirect:trouble";
		
	}
	
	//트러블 슈팅 게시글 수정
	@RequestMapping("/update")
	public String troubleUpdate(TroubleShootingDTO dto, Model model) {
		int result = 0;
		result = service.troubleUpdate(dto);
		model.addAttribute("result",result);
		
		return "redirect:trouble";
	}
	
	//트러블 슈팅 게시글 삭제 (삭제가 아닌, isdeleted 를 1로 업데이트)
	@RequestMapping("/delete")
	public String troubleDelete(TroubleShootingDTO dto, Model model) {
		int result = 0;
		System.out.println(dto.getBoardNum());
		result = service.troubleDelete(dto);
		model.addAttribute("result",result);
		
		return "redirect:trouble";
	}
}

