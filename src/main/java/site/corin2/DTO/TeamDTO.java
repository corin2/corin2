/* 
    파일명: TeamDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.DTO;

public class TeamDTO {

	private int projectNum;
	private String userId;
	private String gradeNum;
	private int bookMark;
	private int isDeleted;
	
	public TeamDTO() {}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getGradeNum() {
		return gradeNum;
	}

	public void setGradeNum(String gradeNum) {
		this.gradeNum = gradeNum;
	}

	public int getBookMark() {
		return bookMark;
	}

	public void setBookMark(int bookMark) {
		this.bookMark = bookMark;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}

	
	
}
