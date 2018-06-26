/**
    파일명: CountByDateDTO.java
    설   명: 날짜별 카운트 DTO
    작성일: 2018. 6. 25.
    작성자: 강 성 훈
*/

package site.corin2.user.dto;

public class CountByDateDTO {
	private String date;
	private int count;
	
	public CountByDateDTO() {}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
