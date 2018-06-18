/**
    파일명: MailDTO.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 강 진 광
*/

package site.corin2.user.dto;

public class MailDTO {
	private String mailFrom; 
	private String mailTo; 
	private String mailSubject; 
	private String mailContent; 
	
	@Override
	public String toString() {
		return "MailDTO [mailFrom=" + mailFrom + ", mailTo=" + mailTo + ", mailSubject=" + mailSubject
				+ ", mailContent=" + mailContent + ", templateName=" + templateName + ", contentType=" + contentType
				+ "]";
	}
	private String templateName; 
	private String contentType;
	public String getMailFrom() {
		return mailFrom;
	}
	public void setMailFrom(String mailFrom) {
		this.mailFrom = mailFrom;
	}
	public String getMailTo() {
		return mailTo;
	}
	public void setMailTo(String mailTo) {
		this.mailTo = mailTo;
	}
	public String getMailSubject() {
		return mailSubject;
	}
	public void setMailSubject(String mailSubject) {
		this.mailSubject = mailSubject;
	}
	public String getMailContent() {
		return mailContent;
	}
	public void setMailContent(String mailContent) {
		this.mailContent = mailContent;
	}
	public String getTemplateName() {
		return templateName;
	}
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	} 
}
