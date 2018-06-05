/* 
    파일명: BoardDTO.java
    설명: 
    작성일: 2018. 6. 4.
    작성자: 전나영
*/
package site.corin2.board.dto;

public class BoardDTO {

	private int boardNum;
	private String skillNum;
	private String userId;
	private String boardDate;
	private int isDeleted;
	
	public BoardDTO() {}
	
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
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
}
