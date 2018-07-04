/**
    파일명: AdminService.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 김 진 원
*/

package site.corin2.user.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.stereotype.Service;

import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.kanban.dto.ListDTO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.skill.dto.SkillDTO;
import site.corin2.user.dao.AdminDAO;
import site.corin2.user.dto.UserDTO;
import site.corin2.user.dto.UserGradeDTO;

@Service
public class AdminService {

	@Autowired
	private SqlSession sqlsession;
	
	@Autowired
	private MailSender mailSender;
	
	@Autowired
	private UserService userservice;
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
	
	//모든 유저등급 조회
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
	
	//모든 체크리스트 조회
	public List<CheckListDTO> checkListAllSelect(){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		List<CheckListDTO> checkLists = null;
		try {
			checkLists = adminDAO.checkListAllSelect();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return checkLists;
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
	
	//체크리스트 수정
	public void checkListUpdate(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListUpdate(checkList);
	}
	
	//기능 생성
	public void skillInsert(SkillDTO skill){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.skillInsert(skill);
	}
	
	//리스트 생성
	public void listInsert(ListDTO list){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.listInsert(list);
	}
	
	//언어 생성
	public void languageInsert(LanguageDTO language){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.languageInsert(language);
	}
	
	//유저등급 생성
	public void userGradeInsert(UserGradeDTO userGrade){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userGradeInsert(userGrade);
	}
	
	//체크리스트 생성
	public void checkListInsert(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListInsert(checkList);
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
	
	//체크리스트 삭제
	public void checkListDelete(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListDelete(checkList);
	}
	
	//vmfileload하기
	public String vmLoad(HttpServletRequest request) {
		String savepath = "resources/admin/velocity";  
		String realpath = request.getSession().getServletContext().getRealPath(savepath);
		  BufferedReader br;
		  String line = "";
		try {
			br = new BufferedReader(new FileReader(realpath+"\\signup.vm"));
			while(true) {
				String content = br.readLine();
				if (content==null) break;
				line += content;
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return line;
	}
	
	//vmfile2load하기
	public String vmLoad2(HttpServletRequest request) {
		String savepath = "resources/admin/velocity";  
        String realpath = request.getSession().getServletContext().getRealPath(savepath);
		  BufferedReader br;
		  String line = "";
		try {
			br = new BufferedReader(new FileReader(realpath+"\\signup2.vm"));
			while(true) {
				String content = br.readLine();
				if (content==null) break;
				line += content;
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return line;
	}
	
	//vmfilesave하기
	public void vmSave(String savedata , String signup , HttpServletRequest request) {
		String savepath = "resources/admin/velocity";  
		String realpath = request.getSession().getServletContext().getRealPath(savepath);
		BufferedWriter bw;
		try {
			bw = new BufferedWriter(new FileWriter(realpath+"\\"+signup+".vm"));
			while(true) {
				bw.write(savedata);
			    bw.newLine(); // 줄바꿈
			    if(savedata!=null) break;
			}
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	
	}
	
	//template 변경하기
	public void usetemplate(String signup) {
		String templatefilename = signup;
		AdminDAO admindao = sqlsession.getMapper(AdminDAO.class);
		try {
			admindao.templateFileNameUpdate(templatefilename+".vm");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	//유저 수정
	public void userEdit(UserDTO user){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userEdit(user);
	}
	
	//유저 수정
	public void userReset(UserDTO user){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userReset(user);
	}
	
	//유저 수정
	public void checkListReset(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListReset(checkList);
	}
}
