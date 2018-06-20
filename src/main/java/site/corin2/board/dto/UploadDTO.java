/* 
    파일명: UploadDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.board.dto;


public class UploadDTO {
	
	private int boardNum;
	private String skillNum;
	private int projectNum;
	private String uploadAlias;//가명 1(1).jpg
	private String uploadOrigin;//실명1.jpg
	private String userName;
	private String userProfile;

	
	public UploadDTO() {}

	public int getBoardNum() {
		return boardNum;
	}

	public void setBoardNum(int boardNum) {
		this.boardNum = boardNum;
	}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getUploadAlias() {
		return uploadAlias;
	}

	public void setUploadAlias(String uploadAlias) {
		this.uploadAlias = uploadAlias;
	}

	public String getUploadOrigin() {
		return uploadOrigin;
	}

	public void setUploadOrigin(String uploadOrigin) {
		this.uploadOrigin = uploadOrigin;
	}

	public String getSkillNum() {
		return skillNum;
	}

	public void setSkillNum(String skillNum) {
		this.skillNum = skillNum;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(String userProfile) {
		this.userProfile = userProfile;
	}


	
}
