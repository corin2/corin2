package site.corin2.DTO;

public class AnnounceDTO {

	private int boardNum;
	private String skillNum;
	private String announceTitle;
	private String announceContent;
	
	public AnnounceDTO() {}

	public int getBoardNum() {
		return boardNum;
	}

	public void setBoardNum(int boardNum) {
		this.boardNum = boardNum;
	}

	public String getAnnounceTitle() {
		return announceTitle;
	}

	public void setAnnounceTitle(String announceTitle) {
		this.announceTitle = announceTitle;
	}

	public String getAnnounceContent() {
		return announceContent;
	}

	public void setAnnounceContent(String announceContent) {
		this.announceContent = announceContent;
	}

	public String getSkillNum() {
		return skillNum;
	}

	public void setSkillNum(String skillNum) {
		this.skillNum = skillNum;
	}
	
	
}
