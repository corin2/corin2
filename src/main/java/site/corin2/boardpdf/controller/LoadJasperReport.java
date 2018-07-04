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

	@RequestMapping(value = "/generateReport")
	public String generateReport(String file, int projectNum, Model model, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws JRException, IOException,
			NamingException {
		
		
		//파일명에 따라 매핑하는 jsxml(리포트 디자인파일)을 다르게 적용한다.
		
		String reportFileName = ""; //초기화
		//String reportFileName = "ts";
		if(file.equals("leanCanvas")) {
			reportFileName = "leanCanvas";
		}else if(file.equals("ts")) {
			reportFileName = "ts";
		}else if(file.equals("checkList")) {
			reportFileName = "checkList";
		}
		//String reportFileName = "leanCanvas";
		JasperReportDAO jrdao = new JasperReportDAO();
		
		Connection conn = null;

		try {
						
			conn = jrdao.getConnection(httpSession);


			System.out.println("projectNum: " + projectNum);

			HashMap<String, Object> hmParams = new HashMap<String, Object>();

			//hmParams.put("noy", new Integer(noy));
			//hmParams.put("Title", "트러블슈팅" + noy );
			hmParams.put("projectNum", projectNum);

			JasperReport jasperReport = jrdao.getCompiledFile(reportFileName,request);

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