package site.corin2.checklist.dto;

public class SkillCheckListDTO {

	private int checkNum;
	private String skillNum;
	private int projectNum;
	private String userId;
	private String checkTitle;
	private String checkContent;
	private int isChecked;
	private int isDeleted;
	
	public SkillCheckListDTO() {}

	public int getCheckNum() {
		return checkNum;
	}

	public void setCheckNum(int checkNum) {
		this.checkNum = checkNum;
	}

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

	public String getCheckTitle() {
		return checkTitle;
	}

	public void setCheckTitle(String checkTitle) {
		this.checkTitle = checkTitle;
	}

	public int getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(int isChecked) {
		this.isChecked = isChecked;
	}

	public String getSkillNum() {
		return skillNum;
	}

	public void setSkillNum(String skillNum) {
		this.skillNum = skillNum;
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
