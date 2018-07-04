/**
    파일명: AdminController.java
    설   명: 
    작성일: 2018. 6. 18.
    작성자: 김 진 원
*/

package site.corin2.user.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;

import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.kanban.dto.ListDTO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.skill.dto.SkillDTO;
import site.corin2.user.dto.UserDTO;
import site.corin2.user.dto.UserGradeDTO;
import site.corin2.user.service.AdminService;

@Controller
public class AdminController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private AdminService service;
	
	/**
	* @함수명 : adminMenu()
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 메뉴관리페이지로 tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("adminMenu")
	public String adminMenu() {
		return "admin.adminMenu";
	}
	
	/**
	* @함수명 : adminMain()
	* @작성일 : 2018. 06. 12.
	* @작성자 : 강 성 훈
	* @설명 : 메인페이지로 tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("adminMain")
	public String adminMain() {
		return "admin.adminMain";
	}
	
	/**
	* @함수명 : adminPeaples()
	* @작성일 : 2018. 06. 12.
	* @작성자 : 최 재 욱
	* @설명 : 만든사람들페이지로 tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("adminPeaples")
	public String adminPeaples() {
		return "admin.makeperson";
	}
	
	/**
	* @함수명 : skillManagement(Model model)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 모든 기능 조회(스킬메뉴관리)
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("skillManagement")
	public View skillManagement(Model model) {
		List<SkillDTO> skills = service.skillAllSelect();
		model.addAttribute("data", skills);
		return jsonview;
	}
	
	/**
	* @함수명 : languageManagement(Model model)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 모든 유저등급 조회(유저등급메뉴관리)
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("userGradeManagement")
	public View languageManagement(Model model) {
		List<UserGradeDTO> languages = service.userGradeAllSelect();
		model.addAttribute("data", languages);
		return jsonview;
	}
	
	/**
	* @함수명 : languageManagement(Model model)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 모든 체크리스트 조회(체크리스트메뉴관리)
	* @param Model - json으로 보내줄 data
	* @return View jsonview
	**/
	@RequestMapping("checkListManagement")
	public View checkListManagement(Model model) {
		List<CheckListDTO> checkLists = service.checkListAllSelect();
		model.addAttribute("data", checkLists);
		return jsonview;
	}
	
	/**
	* @함수명 : skillEdit(SkillDTO skill)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 기능수정
	* @param SkillDTO - skillName, skillUse, skillNum
	* @return View jsonview
	**/
	@RequestMapping("skillEdit")
	public View skillEdit(SkillDTO skill) {
		service.skillUpdate(skill);
		return jsonview;
	}
	
	/**
	* @함수명 : listEdit(ListDTO list)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 리스트수정
	* @param ListDTO - listName, listNum
	* @return View jsonview
	**/
	@RequestMapping("listEdit")
	public View listEdit(ListDTO list) {
		service.listUpdate(list);
		return jsonview;
	}
	
	/**
	* @함수명 : languageEdit(LanguageDTO language)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 언어수정
	* @param LanguageDTO - languageMain, languageColor, languageNum
	* @return View jsonview
	**/
	@RequestMapping("languageEdit")
	public View languageEdit(LanguageDTO language) {
		service.languageUpdate(language);
		return jsonview;
	}
	
	/**
	* @함수명 : userGradeEdit(UserGradeDTO userGrade)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 유저등급수정
	* @param UserGradeDTO - gradeName, gradeNum
	* @return View jsonview
	**/
	@RequestMapping("userGradeEdit")
	public View userGradeEdit(UserGradeDTO userGrade) {
		service.userGradeUpdate(userGrade);
		return jsonview;
	}
	
	/**
	* @함수명 : checkListEdit(CheckListDTO checkList)
	* @작성일 : 2018. 06. 12.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트수정
	* @param CheckListDTO - category, checkContent, checkNum
	* @return View jsonview
	**/
	@RequestMapping("checkListEdit")
	public View checkListEdit(CheckListDTO checkList) {
		service.checkListUpdate(checkList);
		return jsonview;
	}
	
	/**
	* @함수명 : skillAdd(SkillDTO skill)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 기능생성
	* @param SkillDTO - skillNum, skillName, skillUse
	* @return View jsonview
	**/
	@RequestMapping("skillAdd")
	public View skillAdd(SkillDTO skill) {
		service.skillInsert(skill);
		return jsonview;
	}
	
	/**
	* @함수명 : listAdd(ListDTO list)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 리스트생성
	* @param ListDTO - listNum, listName
	* @return View jsonview
	**/
	@RequestMapping("listAdd")
	public View listAdd(ListDTO list) {
		service.listInsert(list);
		return jsonview;
	}
	
	/**
	* @함수명 : languageAdd(LanguageDTO language)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 언어생성
	* @param LanguageDTO - languageNum, languageMain, languageColor
	* @return View jsonview
	**/
	@RequestMapping("languageAdd")
	public View languageAdd(LanguageDTO language) {
		service.languageInsert(language);
		return jsonview;
	}
	
	/**
	* @함수명 : userGradeAdd(UserGradeDTO userGrade)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 유저등급생성
	* @param UserGradeDTO - languageNum, languageMain, languageColor
	* @return View jsonview
	**/
	@RequestMapping("userGradeAdd")
	public View userGradeAdd(UserGradeDTO userGrade) {
		service.userGradeInsert(userGrade);
		return jsonview;
	}
	
	/**
	* @함수명 : checkListAdd(CheckListDTO checkList)
	* @작성일 : 2018. 06. 13.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트생성
	* @param CheckListDTO - languageNum, category, checkContent
	* @return View jsonview
	**/
	@RequestMapping("checkListAdd")
	public View checkListAdd(CheckListDTO checkList) {
		service.checkListInsert(checkList);
		return jsonview;
	}
	
	/**
	* @함수명 : skillDel(SkillDTO skill)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 기능삭제
	* @param SkillDTO - skillNum
	* @return View jsonview
	**/
	@RequestMapping("skillDel")
	public View skillDel(SkillDTO skill) {
		service.skillDelete(skill);
		return jsonview;
	}
	
	/**
	* @함수명 : listDel(ListDTO list)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 기능삭제
	* @param ListDTO - listNum
	* @return View jsonview
	**/
	@RequestMapping("listDel")
	public View listDel(ListDTO list) {
		service.listDelete(list);
		return jsonview;
	}
	
	/**
	* @함수명 : languageDel(LanguageDTO language)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 언어삭제
	* @param LanguageDTO - languageNum
	* @return View jsonview
	**/
	@RequestMapping("languageDel")
	public View languageDel(LanguageDTO language) {
		service.languageDelete(language);
		return jsonview;
	}
	
	/**
	* @함수명 : userGradeDel(UserGradeDTO userGrade)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 유저등급삭제
	* @param UserGradeDTO - gradeNum
	* @return View jsonview
	**/
	@RequestMapping("userGradeDel")
	public View userGradeDel(UserGradeDTO userGrade) {
		service.userGradeDelete(userGrade);
		return jsonview;
	}
	
	/**
	* @함수명 : checkListDel(CheckListDTO checkList)
	* @작성일 : 2018. 06. 14.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트삭제 (실제로는 업데이트)
	* @param CheckListDTO - checkNum
	* @return View jsonview
	**/
	@RequestMapping("checkListDel")
	public View checkListDel(CheckListDTO checkList) {
		service.checkListDelete(checkList);
		return jsonview;
	}
	
	//메일관리 페이지 이동하기
	@RequestMapping(value = "adminMail" , method = RequestMethod.GET)
	public String adminMailEditView() {
		return "admin.mailedit";
	}
	
	/**
     * @함수명 : vmLoad
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : request를 AdminService의 vmLoad함수로 보내주고 return을 line(signup.vm의 내용)을 받아서  요청된 페이지로 보내주는 함수입니다.
     * @param : model , request
     * @return : jsonview 
    **/
	@RequestMapping("vmload")
	public View vmLoad(Model model , HttpServletRequest request) {
		String line = service.vmLoad(request);
		model.addAttribute("line", line);
		return jsonview;
	}
	
	/**
     * @함수명 : vmLoad2
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : request를 AdminService의 vmLoad2함수로 보내주고 return을 line(signup2.vm의 내용)을 받아서  요청된 페이지로 보내주는 함수입니다.
     * @param : model , request
     * @return : jsonview 
    **/
	@RequestMapping("vmload2")
	public View vmLoad2(Model model , HttpServletRequest request) {
		String line = service.vmLoad2(request);
		model.addAttribute("line", line);
		return jsonview;
	}
	
	/**
     * @함수명 : vmSave
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : savedata,signup,request를 AdminService의 vmSave함수로 보내주는 함수입니다.
     * @param : savedata , signup , request
     * @return : jsonview 
    **/
	@RequestMapping("vmsave")
	public View vmSave(String savedata , String signup , HttpServletRequest request) {
		service.vmSave(savedata,signup,request);
		return jsonview;
			
	}
	
	/**
     * @함수명 : usetemplate
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : signup을 AdminService의 usetemplate함수로 보내주는 함수입니다.
     * @param : signup
     * @return : jsonview 
    **/
	@RequestMapping("usetemplate")
	public View usetemplate(String signup) {
		service.usetemplate(signup);
		return jsonview;
			
	}
	
	/**
	* @함수명 : adminUserController()
	* @작성일 : 2018. 06. 15.
	* @작성자 : 김 진 원
	* @설명 : 회원관리페이지로 tiles를 태워 보내준다.
	* @return String tiles
	**/
	@RequestMapping("adminUserController")
	public String adminUserController() {
		return "admin.adminUserController";
	}
	
	/**
	* @함수명 : userEdit(UserDTO user)
	* @작성일 : 2018. 06. 15.
	* @작성자 : 김 진 원
	* @설명 : 유저수정 
	* @param UserDTO - userName, enabled, gradeNum, userId
	* @return View jsonview
	**/
	@RequestMapping("userEdit")
	public View userEdit(UserDTO user) {
		service.userEdit(user);
		return jsonview;
	}
	
	/**
	* @함수명 : userReset(UserDTO user)
	* @작성일 : 2018. 06. 15.
	* @작성자 : 김 진 원
	* @설명 : 유저복구 
	* @param UserDTO - userId
	* @return View jsonview
	**/
	@RequestMapping("userReset")
	public View userReset(UserDTO user) {
		service.userReset(user);
		return jsonview;
	}
	
	/**
	* @함수명 : checkListReset(CheckListDTO checkList)
	* @작성일 : 2018. 06. 15.
	* @작성자 : 김 진 원
	* @설명 : 체크리스트복구 
	* @param CheckListDTO - checkNum
	* @return View jsonview
	**/
	@RequestMapping("checkListReset")
	public View checkListReset(CheckListDTO checkList) {
		service.checkListReset(checkList);
		return jsonview;
	}
}
