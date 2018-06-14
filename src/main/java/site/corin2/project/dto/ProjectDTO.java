/* 
    파일명: ProjectDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.project.dto;

public class ProjectDTO {

	private int projectNum;
	private String projectName;
	private String languageNum;
	private String projectDate;
	private int isDeleted;
	private String gradeNum;
	private String bookMark;
	
	public String getBookMark() {
		return bookMark;
	}

	public void setBookMark(String bookMark) {
		this.bookMark = bookMark;
	}

	public String getGradeNum() {
		return gradeNum;
	}

	public void setGradeNum(String gradeNum) {
		this.gradeNum = gradeNum;
	}

	public ProjectDTO() {}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getLanguageNum() {
		return languageNum;
	}

	public void setLanguageNum(String languageNum) {
		this.languageNum = languageNum;
	}

	public String getProjectDate() {
		return projectDate;
	}

	public void setProjectDate(String projectDate) {
		this.projectDate = projectDate;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	
}
