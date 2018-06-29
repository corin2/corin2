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
	public String generateReport( Model model, HttpServletRequest request,
			HttpServletResponse response, HttpSession httpSession) throws JRException, IOException,
			NamingException {

		String reportFileName = "ts";
		JasperReportDAO jrdao = new JasperReportDAO();
		
		Connection conn = null;

		try {
						
			conn = jrdao.getConnection(httpSession);

			String noy = "16";
			//System.out.println("projectNum: " + noy);

			HashMap<String, Object> hmParams = new HashMap<String, Object>();

			hmParams.put("noy", new Integer(noy));
			hmParams.put("Title", "트러블슈팅" + noy );

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