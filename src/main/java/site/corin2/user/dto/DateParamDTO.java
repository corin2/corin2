/**
    파일명: DateParamDTO.java
    설   명: 시작일, 종료일 DTO
    작성일: 2018. 6. 25.
    작성자: 강 성 훈
*/

package site.corin2.user.dto;

public class DateParamDTO {
	private String startdate;
	private String enddate;
	
	public DateParamDTO() {}

	public String getStartdate() {
		return startdate;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public String getEnddate() {
		return enddate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}
	
	
}
