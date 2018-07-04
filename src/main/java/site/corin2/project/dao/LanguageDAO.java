/**
    파일명: LanguageDAO.java
    설   명: 
    작성일: 2018. 6. 12.
    작성자: 최 재 욱
*/
package site.corin2.project.dao;

import java.util.List;

import site.corin2.project.dto.LanguageDTO;

public interface LanguageDAO {
	
	public List<LanguageDTO> languageColorAllList();
	
	// 프로젝트 번호에 해당하는 언어 정보
	public LanguageDTO languageInfoByProjectNum(String projectNum);
}
