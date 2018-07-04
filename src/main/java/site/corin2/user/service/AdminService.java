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
	/**
	* @함수명 : skillAllSelect()
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 모든 기능 조회(스킬메뉴관리)
	* @return List - SkillDTO 모든 기능
	**/
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
	
	/**
	* @함수명 : userGradeAllSelect()
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 모든 유저등급 조회(유저등급메뉴관리)
	* @return List - UserGradeDTO 모든 유저등급
	**/
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
	
	/**
	* @함수명 : checkListAllSelect()
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 모든 체크리스트 조회(체크리스트메뉴관리)
	* @return List - CheckListDTO 모든 체크리스트
	**/
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
	
	/**
	* @함수명 : skillUpdate(SkillDTO skill)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 기능수정
	* @param SkillDTO - skillName, skillUse, skillNum
	**/
	public void skillUpdate(SkillDTO skill){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.skillUpdate(skill);
	}
	
	/**
	* @함수명 : listUpdate(ListDTO list)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 리스트수정
	* @param ListDTO - listName, listNum
	**/
	public void listUpdate(ListDTO list){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.listUpdate(list);
	}
	
	/**
	* @함수명 : languageUpdate(LanguageDTO language)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 언어수정
	* @param LanguageDTO - languageMain, languageColor, languageNum
	**/
	public void languageUpdate(LanguageDTO language){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.languageUpdate(language);
	}
	
	/**
	* @함수명 : userGradeUpdate(UserGradeDTO userGrade)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 유저등급수정
	* @param UserGradeDTO - gradeName, gradeNum
	**/
	public void userGradeUpdate(UserGradeDTO userGrade){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userGradeUpdate(userGrade);
	}
	
	/**
	* @함수명 : checkListUpdate(CheckListDTO checkList)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트수정
	* @param CheckListDTO - category, checkContent, checkNum
	**/
	public void checkListUpdate(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListUpdate(checkList);
	}
	
	/**
	* @함수명 : skillInsert(SkillDTO skill)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 기능생성
	* @param SkillDTO - skillNum, skillName, skillUse
	**/
	public void skillInsert(SkillDTO skill){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.skillInsert(skill);
	}
	
	/**
	* @함수명 : listInsert(ListDTO list)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 리스트생성
	* @param ListDTO - listNum, listName
	**/
	public void listInsert(ListDTO list){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.listInsert(list);
	}
	
	/**
	* @함수명 : languageInsert(LanguageDTO language)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 언어생성
	* @param LanguageDTO - languageNum, languageMain, languageColor
	**/
	public void languageInsert(LanguageDTO language){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.languageInsert(language);
	}
	
	/**
	* @함수명 : userGradeInsert(UserGradeDTO userGrade)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 유저등급생성
	* @param UserGradeDTO - languageNum, languageMain, languageColor
	**/
	public void userGradeInsert(UserGradeDTO userGrade){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userGradeInsert(userGrade);
	}
	
	/**
	* @함수명 : checkListInsert(CheckListDTO checkList)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트생성
	* @param CheckListDTO - languageNum, category, checkContent
	**/
	public void checkListInsert(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListInsert(checkList);
	}
	
	/**
	* @함수명 : skillDelete(SkillDTO skill)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 기능삭제
	* @param SkillDTO - skillNum
	**/
	public void skillDelete(SkillDTO skill){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.skillDelete(skill);
	}
	
	/**
	* @함수명 : listDelete(ListDTO list)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 기능삭제
	* @param ListDTO - listNum
	**/
	public void listDelete(ListDTO list){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.listDelete(list);
	}
	
	/**
	* @함수명 : languageDelete(LanguageDTO language)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 언어삭제
	* @param LanguageDTO - languageNum
	**/
	public void languageDelete(LanguageDTO language){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.languageDelete(language);
	}
	
	/**
	* @함수명 : userGradeDelete(UserGradeDTO userGrade)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 유저등급삭제
	* @param UserGradeDTO - gradeNum
	**/
	public void userGradeDelete(UserGradeDTO userGrade){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userGradeDelete(userGrade);
	}
	
	/**
	* @함수명 : checkListDelete(CheckListDTO checkList)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트삭제 (실제로는 업데이트)
	* @param CheckListDTO - checkNum
	**/
	public void checkListDelete(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListDelete(checkList);
	}
	
	/**
     * @함수명 : vmLoad
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : request를 Admincontroller에서 받아서 지정된 경로에 있는 signup.vm파일을 filereader를 통해서 읽어와 buffer readline으로 line이라는 변수에 넣어준뒤에 controller로 보내준다.
     * @param : request
     * @return : line
    **/
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
	
	/**
     * @함수명 : vmLoad2
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : request를 Admincontroller에서 받아서 지정된 경로에 있는 signup2.vm파일을 filereader를 통해서 읽어와 buffer readline으로 line이라는 변수에 넣어준뒤에 controller로 보내준다.
     * @param : request
     * @return : line
    **/
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
	
	/**
     * @함수명 : vmSave
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : savedata,signup,request를 Admincontroller에서 받아서 지정된 경로에 있는 변수 signup(signup.vm인지 signup2.vm인지 구별을 위해서 사용).vm파일을 filewiter를 통해서 읽어와  지정된 경로의 vmfile에 적어주는 함수입니다. 
     * @param : savedata , signup , request
    **/
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
	
	/**
     * @함수명 : usetemplate
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : signup를 Admincontroller에서 받아서 templateFileNameUpdate으로 db에 
     * 		변수 signup(signup.vm인지 signup2.vm인지 구별을 위해서 사용).vm파일을 적어주어 이후에 
     * 		회원가입하는 사용자에게 보내는 email template를 변경시켜주는 함수입니다. 
     * @param : signup
    **/
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
	
	/**
	* @함수명 : userEdit(UserDTO user)
	* @작성일 : 2018. 06. 15.
	* @작성자 : 김 진 원
	* @설명 : 유저수정 
	* @param UserDTO - userName, enabled, gradeNum, userId
	**/
	public void userEdit(UserDTO user){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userEdit(user);
	}
	
	/**
	* @함수명 : userReset(UserDTO user)
	* @작성일 : 2018. 06. 15.
	* @작성자 : 김 진 원
	* @설명 : 유저복구 
	* @param UserDTO - userId
	**/
	public void userReset(UserDTO user){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.userReset(user);
	}
	
	/**
	* @함수명 : checkListReset(CheckListDTO checkList)
	* @작성일 : 2018. 06. 15.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트복구 
	* @param CheckListDTO - checkNum
	**/
	public void checkListReset(CheckListDTO checkList){
		AdminDAO adminDAO = sqlsession.getMapper(AdminDAO.class);
		adminDAO.checkListReset(checkList);
	}
}
