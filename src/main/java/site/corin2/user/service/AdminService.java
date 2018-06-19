/**
    파일명: AdminService.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 김 진 원
*/

package site.corin2.user.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.kanban.dto.ListDTO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.skill.dto.SkillDTO;
import site.corin2.user.dao.AdminDAO;
import site.corin2.user.dto.UserGradeDTO;

@Service
public class AdminService {

	@Autowired
	private SqlSession sqlsession;
	
	//모든 기능 조회
	public List<SkillDTO> skillAllSelect(){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		List<SkillDTO> skills = null;
		try {
			skills = adminDAO.skillAllSelect();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return skills;
	}
	
	//모든 기능 조회
	public List<UserGradeDTO> userGradeAllSelect(){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		List<UserGradeDTO> userGrades = null;
		try {
			userGrades = adminDAO.userGradeAllSelect();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return userGrades;
	}
	
	//기능 수정
	public void skillUpdate(SkillDTO skill){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.skillUpdate(skill);
	}
	
	//리스트 수정
	public void listUpdate(ListDTO list){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.listUpdate(list);
	}
	
	//언어 수정
	public void languageUpdate(LanguageDTO language){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.languageUpdate(language);
	}
	
	//유저등급 수정
	public void userGradeUpdate(UserGradeDTO userGrade){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userGradeUpdate(userGrade);
	}
	
	//기능 수정
	public void skillInsert(SkillDTO skill){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.skillInsert(skill);
	}
	
	//기능 수정
	public void listInsert(ListDTO list){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.listInsert(list);
	}
	
	//언어 수정
	public void languageInsert(LanguageDTO language){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.languageInsert(language);
	}
	
	//유저등급 수정
	public void userGradeInsert(UserGradeDTO userGrade){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userGradeInsert(userGrade);
	}
	
	//기능 삭제
	public void skillDelete(SkillDTO skill){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.skillDelete(skill);
	}
	
	//리스트 삭제
	public void listDelete(ListDTO list){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.listDelete(list);
	}
	
	//언어 삭제
	public void languageDelete(LanguageDTO language){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.languageDelete(language);
	}
	
	//유저등급 삭제
	public void userGradeDelete(UserGradeDTO userGrade){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userGradeDelete(userGrade);
	}
}
