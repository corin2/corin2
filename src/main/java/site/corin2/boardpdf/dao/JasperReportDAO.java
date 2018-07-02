package site.corin2.boardpdf.dao;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Map;
import javax.naming.NamingException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class JasperReportDAO {
	
public Connection getConnection(HttpSession session) throws SQLException{
    
	ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(session.getServletContext());
    DriverManagerDataSource driverManagerDataSource = (DriverManagerDataSource) context.getBean("driverManagerDataSource");
    
    Connection conn = driverManagerDataSource.getConnection();
   
    return conn;	
}

public JasperReport getCompiledFile(String fileName, HttpServletRequest request) throws JRException {
	System.out.println("path " + request.getSession().getServletContext().getRealPath("/resources/ireport/" + fileName + ".jasper"));
	File reportFile = new File( request.getSession().getServletContext().getRealPath("/resources/ireport/" + fileName + ".jasper"));
	// If compiled file is not found, then compile XML template
	if (!reportFile.exists()) {
	           JasperCompileManager.compileReportToFile(request.getSession().getServletContext().getRealPath("/resources/ireport/" + fileName + ".jrxml"),request.getSession().getServletContext().getRealPath("/resources/ireport/" + fileName + ".jasper"));
	    }
    	JasperReport jasperReport = (JasperReport) JRLoader.loadObjectFromFile(reportFile.getPath());
	   return jasperReport;
	} 

	public void generateReportPDF (HttpServletResponse resp, Map parameters, JasperReport jasperReport, Connection conn)throws JRException, NamingException, SQLException, IOException {
		byte[] bytes = null;
		bytes = JasperRunManager.runReportToPdf(jasperReport,parameters,conn);
		resp.reset();
		resp.resetBuffer();
		resp.setContentType("application/pdf");
		resp.setContentLength(bytes.length);
		ServletOutputStream ouputStream = resp.getOutputStream();
		ouputStream.write(bytes, 0, bytes.length);
		ouputStream.flush();
		ouputStream.close();
	} 

}