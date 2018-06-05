package site.corin2.DTO;

public class ChattingDTO {
	private int projectNum;
	private String sendId;
	private String chattingNum;
	private String receptionId;
	private String chatContent;
	private String sendDate;
	
	public ChattingDTO() {}

	public int getProjectNum() {
		return projectNum;
	}

	public void setProjectNum(int projectNum) {
		this.projectNum = projectNum;
	}

	public String getSendId() {
		return sendId;
	}

	public void setSendId(String sendId) {
		this.sendId = sendId;
	}

	public String getChatContent() {
		return chatContent;
	}

	public void setChatContent(String chatContent) {
		this.chatContent = chatContent;
	}

	public String getSendDate() {
		return sendDate;
	}

	public void setSendDate(String sendDate) {
		this.sendDate = sendDate;
	}

	public String getReceptionId() {
		return receptionId;
	}

	public void setReceptionId(String receptionId) {
		this.receptionId = receptionId;
	}

	public String getChattingNum() {
		return chattingNum;
	}

	public void setChattingNum(String chattingNum) {
		this.chattingNum = chattingNum;
	}
	
	

}
