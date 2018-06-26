/**
    파일명: DomainCountDTO.java
    설   명: 
    작성일: 2018. 6. 23.
    작성자: 강 성 훈
*/

package site.corin2.user.dto;

public class EmailCountDTO {
	private String email;
	private int emailCount;
	
	public EmailCountDTO() {}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getEmailCount() {
		return emailCount;
	}

	public void setEmailCount(int emailCount) {
		this.emailCount = emailCount;
	}
	
}
