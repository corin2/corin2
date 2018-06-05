/* 
    파일명: StatisticsDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.DTO;

public class StatisticsDTO {
	private String StatisticsDate;
	private int visit;
	
	public StatisticsDTO() {}

	public String getStatisticsDate() {
		return StatisticsDate;
	}

	public void setStatisticsDate(String statisticsDate) {
		StatisticsDate = statisticsDate;
	}

	public int getVisit() {
		return visit;
	}

	public void setVisit(int visit) {
		this.visit = visit;
	}
	
	
	
}
