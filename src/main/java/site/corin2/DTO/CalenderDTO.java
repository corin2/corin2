/* 
    파일명: CalenderDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.DTO;

public class CalenderDTO {

	private int calendarNum;
	private int projectNum;
	private String calendarName;
	private String startDate;
	private String endDate;
	private String calendarColor;
	private int isDeleted;
	
	public CalenderDTO() {}

	public int getCalendarNum() {
		return calendarNum;
	}

	public void setCalendarNum(int calendarNum) {
		this.calendarNum = calendarNum;
	}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getCalendarName() {
		return calendarName;
	}

	public void setCalendarName(String calendarName) {
		this.calendarName = calendarName;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getCalendarColor() {
		return calendarColor;
	}

	public void setCalendarColor(String calendarColor) {
		this.calendarColor = calendarColor;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
}
