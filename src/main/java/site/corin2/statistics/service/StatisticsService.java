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

	/**
	* @함수명 : statisticsCntUpdate(ApplicationContext context)
	* @작성일 : 2018. 06. 08.
	* @작성자 : 김 진 원
	* @설명 : 세션이 생성될 때 마다 실행되고 당일 날짜로 방문자수가 +1이된다 단,
	* 		당일 첫번째로 실행되면 insert가 된다.
	* @param ApplicationContext - sqlsession과 매핑을 위함
	**/
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
