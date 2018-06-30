/**
    파일명: 트러블 슈팅 게시판의 기능과 view를 제어하는 컨트롤러
    설   명: 배현준
    작성일: 2018. 6. 7.
    작성자: 배현준
*/
package site.corin2.board.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;
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
	
	//엑셀저장
	@RequestMapping("/excel")
	public String troubleExcel(TroubleShootingDTO trouble, Model model,@RequestParam("projectNum") int projectNum) {
		List<TroubleShootingDTO> troubleDTO = service.troubleSelect(projectNum);
		
		model.addAttribute("data",troubleDTO);
		return "troubleExcel";
	}
	//엑셀저장
	@RequestMapping("/excelAll")
	public String troubleExcel(TroubleShootingDTO trouble, Model model) {
		List<TroubleShootingDTO> troubleDTO = service.troubleAllSelect();
			
		model.addAttribute("data",troubleDTO);
		return "troubleExcel";
	}
	
	
	//Report Test
	@RequestMapping("/report")
    public void report() {
		List<Map<String, ?>> listTruble = new ArrayList<Map<String,?>>();
		TroubleShootingDTO tsDTO = new TroubleShootingDTO();
		tsDTO.setBoardNum(1);
		tsDTO.setProblem("new problem");
		tsDTO.setSolution("new Solution");
		
		Map<String,Object> m = new HashMap<String,Object>();
		m.put("boardNum", tsDTO.getBoardNum());
		m.put("problem", tsDTO.getProblem());
		m.put("boardNum", tsDTO.getSolution());
		listTruble.add(m);
		
		//new JRBeanCollectionDataSource(beanCollection)
	}
	
    @RequestMapping("/report2")
    public ModelAndView report2() {

        JasperReportsPdfView view = new JasperReportsPdfView();
        view.setUrl("classpath:/resources/ireport/troubleshooting.jrxml");
        
        
        //view.setApplicationContext(appContext);
        
        DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
        view.setJdbcDataSource(driverManagerDataSource);

        HashMap<String, Object> params = new HashMap<>();
        params.put("USR_ID", "1");

        return new ModelAndView(view, params);
    }
	
	@RequestMapping(value="/report3")
	public ModelAndView report3(Map<String,Object> map, HttpServletRequest request, HttpServletResponse response){
				
		//List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		JasperReportsPdfView view = new JasperReportsPdfView();
		
		//추가
		DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
		
		view.setJdbcDataSource(driverManagerDataSource);
		view.setUrl("/WEB-INF/reports/sample.jrxml");
		Map<String, Object> params = new HashMap<>();
		params.put("param1", "param1 value");
		
		view.setApplicationContext(null);
		
		return new ModelAndView(view, params);
		
		//return JasperReportsUtils.render("multiformat-view", list, "");
		//("multiformat-view", list, "pdf");
	}
}

