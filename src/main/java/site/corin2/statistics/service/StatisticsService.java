/**
    파일명: StatisticsService.java
    설   명: 
    작성일: 2018. 6. 27.
    작성자: 김 진 원
*/

package site.corin2.statistics.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.statistics.dao.StatisticsDAO;

@Service
public class StatisticsService {
	
	@Autowired
	private SqlSession sqlsession;
	
	//방문자 카운터 수 증가
	public void statisticsCntUpdate() {
		System.out.println("44444444");
		StatisticsDAO statisticsdao = sqlsession.getMapper(StatisticsDAO.class);
		try {
			int result = statisticsdao.firstVisit();
			if(result == 0) {
				System.out.println("55555555555");
				statisticsdao.statisticsInsert();
			}else if(result > 0) {
				System.out.println("6666666");
				statisticsdao.statisticsCntUpdate();
			}
		} catch (Exception e) {
			System.out.println("77777777");
			e.printStackTrace();
		}
	}
}
