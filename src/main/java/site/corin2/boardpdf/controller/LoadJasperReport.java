/**
    파일명: LoadJasperReport.java
    설  명: 리포트 생성 컨트롤러
    작성일: 2018. 6. 29.
    작성자: 배현준 
*/
package site.corin2.boardpdf.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import site.corin2.boardpdf.dao.*;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoadJasperReport {
	
	/*
    * @함수명 : generateReport
    * @작성일 : 2018. 6. 29.
    * @작성자 : 배현준
    * @설명 : jasper리포트를 생성하기위해 설정을 정의하고 리포트(출력물)의종류를 선택한다. 
    * @param1 file	: 리포트의 구분( 린캔버스 , 체크리스트, 트러블 슈팅 )
    * @param2 userId : 사용자 id
    * @param3 projectNum : 프로젝트 no
    * @return String 
    **/
	@RequestMapping(value = "/generateReport")
	public String generateReport(String file, String userId, int projectNum, Model model, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws JRException, IOException,
			NamingException {
		
		
		//파일명에 따라 매핑하는 jsxml(리포트 디자인파일)을 다르게 적용한다.
		String reportFileName = ""; //초기화
		
		if(file.equals("leanCanvas")) {
			//린캔버스
			reportFileName = "leanCanvas";
		}else if(file.equals("checkList")) {
			//체크리스트
			reportFileName = "checkList";
		}else if(file.equals("checkListUser")) {
			//유저 체크리스트
			reportFileName = "checkListUser";
		}else if(file.equals("troubleShooting")) {
			//트러블슈팅 팀
			reportFileName = "troubleShooting";
		}else if(file.equals("troubleAll")) {
			//트러블슈팅 전체
			reportFileName = "troubleAll";
		}
		
		JasperReportDAO jrdao = new JasperReportDAO();
		
		Connection conn = null;

		try {
						
			conn = jrdao.getConnection(httpSession);
			
			// 해쉬맵을 생성하고 jasper report 쿼리의 조건에서 사용할 project number와 user id 를 넣는다.
			HashMap<String, Object> hmParams = new HashMap<String, Object>();

			hmParams.put("projectNum", projectNum);
			hmParams.put("userId", userId);

			// jrxml(리포트 디자인파일) 을 컴파일하여준다.
			JasperReport jasperReport = jrdao.getCompiledFile(reportFileName,request);
			
			// 컴파일한 파일을 브라우저에서 보여준다. 
			jrdao.generateReportPDF(response, hmParams, jasperReport, conn); 
				
		} catch (SQLException sqlExp) {
			System.out.println("Exception::" + sqlExp.toString());
		} finally {
			if (conn != null) {
				try {
					conn.close();
					conn = null;
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}
}