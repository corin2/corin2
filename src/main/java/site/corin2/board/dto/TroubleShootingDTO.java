/* 
    파일명: TroubleShootingDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.board.dto;

public class TroubleShootingDTO {
	
	private int boardNum;
	private String skillNum;
	private int projectNum;
	private String problem;
	private String solution;
	
	//DTO 추가 배현준 6.8
	private String userName;
	private String userProfile;
	private String boardDate;
	private int isDeleted;
	
	//DTO 추가 배현준 6.19
	private String hashtag;
	
	public TroubleShootingDTO() {}

	public int getBoardNum() {
		return boardNum;
	}

	public void setBoardNum(int boardNum) {
		this.boardNum = boardNum;
	}

	public String getSkillNum() {
		return skillNum;
	}

	public void setSkillNum(String skillNum) {
		this.skillNum = skillNum;
	}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getProblem() {
		return problem;
	}

	public void setProblem(String problem) {
		this.problem = problem;
	}

	public String getSolution() {
		return solution;
	}

	public void setSolution(String solution) {
		this.solution = solution;
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

	public String getBoardDate() {
		return boardDate;
	}

	public void setBoardDate(String boardDate) {
		this.boardDate = boardDate;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getHashtag() {
		return hashtag;
	}

	public void setHashtag(String hashtag) {
		this.hashtag = hashtag;
	}
	
	

	
}
