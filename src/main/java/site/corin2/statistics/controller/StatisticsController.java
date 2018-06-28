/**
    파일명: StatisticsSessionController.java
    설   명: 방문자 수를 계산하는 클래스
    	web.xml에 listener 등록을 해두었다. 이렇게 할 경우 톰캣이 실행되면서
		리스너가 실행된다.
    작성일: 2018. 6. 27.
    작성자: 김 진 원
*/

package site.corin2.statistics.controller;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import site.corin2.statistics.service.StatisticsService;

public class StatisticsController implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent sessionEve) {
		HttpSession session = sessionEve.getSession();
		ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(session.getServletContext());
		StatisticsService statisticsService = (StatisticsService)context.getBean("statisticsService");
		/*ApplicationContext context =
				new GenericXmlApplicationContext("classpath:main/webapp/WEB-INF/spring/appServlet/servlet-context.xml");
		StatisticsService statisticsService = context.getBean("statisticsService", StatisticsService.class);*/
		statisticsService.statisticsCntUpdate(context);
	}
	
	@Override
	public void sessionDestroyed(HttpSessionEvent se) {}
	
}
