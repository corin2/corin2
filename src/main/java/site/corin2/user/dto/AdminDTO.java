/**
    파일명: EmailDTO.java
    설   명: emailtemplate dto
    작성일: 2018. 6. 19.
    작성자: 강 진 광
*/

package site.corin2.user.dto;

public class AdminDTO {
	private String templatefilename;

	public String getTemplatefilename() {
		return templatefilename;
	}
	
	public void setTemplatefilename(String templatefilename) {
		this.templatefilename = templatefilename;
	}

	@Override
	public String toString() {
		return "EmailDTO [templatefilename=" + templatefilename + "]";
	}

}
