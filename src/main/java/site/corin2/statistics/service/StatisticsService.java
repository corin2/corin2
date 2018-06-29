/**
    파일명: StatisticsService.java
    설   명: 
    작성일: 2018. 6. 27.
    작성자: 김 진 원
*/

package site.corin2.statistics.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.context.ApplicationContext;

import site.corin2.statistics.dao.StatisticsDAO;

public class StatisticsService {

	//방문자 카운터 수 증가
	public void statisticsCntUpdate(ApplicationContext context) {
		SqlSession sqlsession = (SqlSession)context.getBean("sqlSession");
		StatisticsDAO statisticsdao = sqlsession.getMapper(StatisticsDAO.class);
		try {
			int result = statisticsdao.firstVisit();
			if(result == 0) {
				statisticsdao.statisticsInsert();
			}else if(result > 0) {
				statisticsdao.statisticsCntUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
