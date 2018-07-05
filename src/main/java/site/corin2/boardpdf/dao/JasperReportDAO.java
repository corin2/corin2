/**
    파일명: JasperReportDAO.java
    설  명: 리포트 생성 처리
    작성일: 2018. 6. 29.
    작성자: 배현준 
*/
package site.corin2.boardpdf.dao;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
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
	/*
	* @함수명 : getConnection
	* @작성일 : 2018. 6. 29.
	* @작성자 : 배현준
	* @설명 : jasper리포트에서 사용할 DB CONNECTION 객체를 ApplicationContext에서 얻어온다. 
	* @param : Session 
	* @return : Connection 
	**/	
	public Connection getConnection(HttpSession session) throws SQLException{
	    
		ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(session.getServletContext());
	    DriverManagerDataSource driverManagerDataSource = (DriverManagerDataSource) context.getBean("driverManagerDataSource");
	    
	    Connection conn = driverManagerDataSource.getConnection();
	   
	    return conn;	
	}

	/*
	* @함수명 : getCompiledFile
	* @작성일 : 2018. 6. 29.
	* @작성자 : 배현준
	* @설명 : jasper리포트를 출력하기위하여 컴파일한다. 결과물로 .jasper파일이 생성된다.  
	* @param1 file	: 리포트의 구분( 린캔버스 , 체크리스트, 트러블 슈팅 )
	* @param2 request : 리퀘스트 객체
	* @return JasperReport : (xml)리포트의 컴파일된 파일
	**/	
	public JasperReport getCompiledFile(String fileName, HttpServletRequest request) throws JRException {
		File reportFile = new File( request.getSession().getServletContext().getRealPath("/resources/ireport/" + fileName + ".jasper"));
		
		// .jrxml 로 .jasper 파일 컴파일
		JasperCompileManager.compileReportToFile(request.getSession().getServletContext().getRealPath("/resources/ireport/" + fileName + ".jrxml"),request.getSession().getServletContext().getRealPath("/resources/ireport/" + fileName + ".jasper"));
		   
		// 생성된 .jasper을 로드하여 report출력.
	    JasperReport jasperReport = (JasperReport) JRLoader.loadObjectFromFile(reportFile.getPath());
		
	    return jasperReport;
	} 
	
	/*
	* @함수명 : generateReportPDF
	* @작성일 : 2018. 6. 29.
	* @작성자 : 배현준
	* @설명 : jasper 리포트를 출력하기위하여 생성하는 파일 io 처리를 담당하는 함수  
	* @param1 parameters	: 리포트에 전달할 파라메터들 (Map)
	* @param2 jasperReport : jasperReport 객체
	* @return conn : DB 커넥션 객체
	**/	
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