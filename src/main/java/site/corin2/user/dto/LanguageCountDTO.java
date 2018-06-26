/**
    파일명: LanguageCountDTO.java
    설   명: 언어 통계 DTO
    작성일: 2018. 6. 22.
    작성자: 강 성 훈
*/

package site.corin2.user.dto;

public class LanguageCountDTO {
	private String languageNum;
	private String languageMain;
	private String languageColor;
	private int languageCount;
	
	public LanguageCountDTO() {}

	public String getLanguageNum() {
		return languageNum;
	}

	public void setLanguageNum(String languageNum) {
		this.languageNum = languageNum;
	}

	public int getLanguageCount() {
		return languageCount;
	}

	public void setLanguageCount(int languageCount) {
		this.languageCount = languageCount;
	}

	public String getLanguageMain() {
		return languageMain;
	}

	public void setLanguageMain(String languageMain) {
		this.languageMain = languageMain;
	}

	public String getLanguageColor() {
		return languageColor;
	}

	public void setLanguageColor(String languageColor) {
		this.languageColor = languageColor;
	}
}
