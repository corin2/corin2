/**
    파일명: AdminDAO.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 김 진 원
*/

package site.corin2.user.dao;

import java.sql.SQLException;
import java.util.List;

import site.corin2.kanban.dto.ListDTO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.skill.dto.SkillDTO;
import site.corin2.user.dto.AdminDTO;
import site.corin2.user.dto.UserDTO;
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
	
	//userGrade 업데이트
	public void userGradeUpdate(UserGradeDTO userGrade);
	
	//skill 추가
	public void skillInsert(SkillDTO skill);
	
	//list 추가
	public void listInsert(ListDTO list);
	
	//language 추가
	public void languageInsert(LanguageDTO language);
	
	//userGrade 추가
	public void userGradeInsert(UserGradeDTO userGrade);
	
	//skill 삭제
	public void skillDelete(SkillDTO skill);
	
	//list 삭제
	public void listDelete(ListDTO list);
	
	//language 삭제
	public void languageDelete(LanguageDTO language);
	
	//userGrade 삭제
	public void userGradeDelete(UserGradeDTO userGrade);
	
	//email template파일이름 가져오기
	public AdminDTO templateFileNameSelect() throws ClassNotFoundException, SQLException;
	
	//email template파일 이름 수정하기
	public void templateFileNameUpdate(String templatefilename) throws ClassNotFoundException, SQLException;
	
	//admin이 user수정
	public void userEdit(UserDTO user);
}
