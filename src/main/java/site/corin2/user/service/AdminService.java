/**
    파일명: AdminService.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 김 진 원
*/

package site.corin2.user.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;

import site.corin2.kanban.dto.ListDTO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.skill.dto.SkillDTO;
import site.corin2.user.dao.AdminDAO;
import site.corin2.user.dto.AdminDTO;
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
	
	//vmfileload하기
	public String vmLoad() {
		  BufferedReader br;
		  String line = "";
		try {
			br = new BufferedReader(new FileReader("D:\\bitcamp104\\FinalProject\\corin2\\src\\main\\webapp\\WEB-INF\\views\\velocity\\signup.vm"));
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
	public String vmLoad2() {
		  BufferedReader br;
		  String line = "";
		try {
			br = new BufferedReader(new FileReader("D:\\bitcamp104\\FinalProject\\corin2\\src\\main\\webapp\\WEB-INF\\views\\velocity\\signup2.vm"));
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
	public void vmSave(String savedata , String signup) {
		BufferedWriter bw;
		try {
			bw = new BufferedWriter(new FileWriter("D:\\bitcamp104\\FinalProject\\corin2\\src\\main\\webapp\\WEB-INF\\views\\velocity\\"+signup+".vm"));
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
		System.out.println("555"+signup);
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
}
