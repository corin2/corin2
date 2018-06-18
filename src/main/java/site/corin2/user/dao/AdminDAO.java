/**
    파일명: AdminDAO.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 김 진 원
*/

package site.corin2.user.dao;

import java.util.List;

import site.corin2.kanban.dto.ListDTO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.skill.dto.SkillDTO;
import site.corin2.user.dto.UserGradeDTO;

public interface AdminDAO {

	//SkillDTO 모두 가져오기
	public List<SkillDTO> skillAllSelect();
	
	//UserGradeDTO 모두 가져오기
	public List<UserGradeDTO> userGradeAllSelect();
	
	//skill 업데이트
	public void skillUpdate(SkillDTO skill);
	
	//list 업데이트
	public void listUpdate(ListDTO list);
	
	//language 업데이트
	public void languageUpdate(LanguageDTO language);
}
