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
	private String uploadAlias;
	private String uploadOrigin;
	
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
	
	
	
}
