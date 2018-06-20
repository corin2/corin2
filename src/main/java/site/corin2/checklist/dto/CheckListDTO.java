/**
    파일명: CheckListDTO.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 최 재 욱
*/
package site.corin2.checklist.dto;

public class CheckListDTO {
	private int checkNum;
	private String languageNum;
	private int projectNum;
	private String category;
	private String checkTitle;
	private String checkContent;
	private int isDeleted;

	public CheckListDTO() {}

	public int getCheckNum() {
		return checkNum;
	}

	public void setCheckNum(int checkNum) {
		this.checkNum = checkNum;
	}
	
	public String getLanguageNum() {
		return languageNum;
	}

	public void setLanguageNum(String languageNum) {
		this.languageNum = languageNum;
	}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCheckTitle() {
		return checkTitle;
	}

	public void setCheckTitle(String checkTitle) {
		this.checkTitle = checkTitle;
	}

	public String getCheckContent() {
		return checkContent;
	}

	public void setCheckContent(String checkContent) {
		this.checkContent = checkContent;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	
}
