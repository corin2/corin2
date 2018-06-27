/**
    파일명: StatisticsSessionController.java
    설   명: 방문자 수를 계산하는 클래스
    	web.xml에 listener 등록을 해두었다. 이렇게 할 경우 톰캣이 실행되면서
		리스너가 실행된다.
    작성일: 2018. 6. 27.
    작성자: 김 진 원
*/

package site.corin2.statistics.controller;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import site.corin2.statistics.service.StatisticsService;

@Controller
public class StatisticsController implements HttpSessionListener {

	@Autowired
	private StatisticsService service;
	
	@Override
	public void sessionCreated(HttpSessionEvent sessionEve) {
		//세션이 새로 생성되면 execute() 를 실행한다.
		System.out.println("111111111aa");
		if(sessionEve.getSession().isNew()){
			System.out.println("22222222222ss");
			execute();
		}
	}
	
	//방문자수 플러스
    public void execute() {
    	System.out.println("333333333qq");
    	System.out.println("000"+service);
    	service.statisticsCntUpdate();
    }

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {}
	
}
