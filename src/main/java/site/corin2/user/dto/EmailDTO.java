/**
    파일명: EmailDTO.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 강 진 광
*/

package site.corin2.user.dto;

public class EmailDTO {
	private String title; // 제목
	private String content; // 내용
	private String tomail; // 받는 사람 이메일
	private String toname; // 받는 사람 이름
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTomail() {
		return tomail;
	}
	public void setTomail(String tomail) {
		this.tomail = tomail;
	}
	public String getToname() {
		return toname;
	}
	public void setToname(String toname) {
		this.toname = toname;
	}
	@Override
	public String toString() {
		return "Email [title=" + title + ", content=" + content + ", tomail=" + tomail + ", toname=" + toname+ "]";
	}

}
