/**
    파일명: StatisticsDAO.java
    설   명: 
    작성일: 2018. 6. 27.
    작성자: 김 진 원
*/

package site.corin2.statistics.dao;

import site.corin2.statistics.dto.StatisticsDTO;

public interface StatisticsDAO {
	
	//오늘 방문자의 수 +1을 해준다
	public void statisticsCntUpdate();
	
	//오늘 방문자의 수 검색
	public StatisticsDTO todayVisit();
	
	//오늘 첫 방문자인지 확인
	public int firstVisit();
	
	//오늘의 방문자 생성
	public void statisticsInsert();
}
