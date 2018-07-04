/**
    파일명: ProjectController.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
*/
package site.corin2.project.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.project.dto.LanguageDTO;
import site.corin2.project.dto.ProjectDTO;
import site.corin2.project.dto.TeamDTO;
import site.corin2.project.service.ProjectService;
import site.corin2.user.dto.UserDTO;

@Controller
public class ProjectController {

	@Autowired
	private View jsonview;
	
	@Autowired
	private ProjectService service;

	@RequestMapping("/project")
	public String ProjectFile(HttpSession session) {
		session.invalidate();
		return "project.project";
	}
	
	/**
	* @함수명 :  projectInsertView(ProjectDTO project, Model model)
	* @작성일 : 2018. 6. 13.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 생성하기 위한 함수
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/projectInsert")
	public View projectInsertView(ProjectDTO project, Model model) {
		int result = service.projectInsert(project);
		return jsonview;
		
	}
	
	/**
	* @함수명 : projectAllSelectView(UserDTO user, Model model)
	* @작성일 : 2018. 6. 13.
	* @작성자 : 최재욱
	* @설명 : 프로젝트 언어의 색을 이용하여 프로젝트 버튼의 색을 지정해 주고 프로젝트를 보여주는 함수이다.
	* @param UserDTO user- UserDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/projectAllList")
	public View projectAllSelectView(UserDTO user, Model model) {
		List<ProjectDTO> list = null;
		list = service.projectAllList(user);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	/**
	* @함수명 : projectBookSelectView(UserDTO user, Model model)
	* @작성일 : 2018. 6. 14.
	* @작성자 : 최재욱
	* @설명 : 프로젝트 언어의 색을 이용하여 프로젝트 버튼의 색을 지정해 주고 
	* 즐겨찾기 부분에 프로젝트를 보여주는 함수이다.
	* @param projectArray- 프로젝트언어에 해당하는 색을 담은 배열
	**/
	@RequestMapping("/projectBookList")
	public View projectBookSelectView(UserDTO user, Model model) {
		List<ProjectDTO> list = null;
		list = service.projectBookList(user);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	//프로젝트 언어 색상 보기
	@RequestMapping("/languageColorAllList")
	public View languageColorAllListView(Model model) {
		List<LanguageDTO> list = null;
		list = service.languageColorAllList();
		model.addAttribute("list",list);
		return jsonview;
	}
	
	//프로젝트 번호로 주언어 정보 보기
	@RequestMapping("/languageInfoByProjectNum")
	public View languageInfoByProjectNumView(@RequestParam("projectNum") String projectNum, Model model) {
		LanguageDTO list = null;
		list = service.languageInfoByProjectNum(projectNum);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	//프로젝트 넘버 확인
	@RequestMapping("/selectProjectNum")
	public View selectProjectNumView(ProjectDTO project, Model model) {
		List<ProjectDTO> list = null;
		list = service.selectProject(project);
		for(ProjectDTO a : list) {
			model.addAttribute("projectNum",a.getProjectNum());
		}
		
		return jsonview;
	}
	
	//프로젝트 언어 수정
	@RequestMapping("/languageUpdate")
	public View languageUpdateView(ProjectDTO project, Model model) {
		int result = 0;
		result = service.updateLanguage(project);
		return jsonview;
	}
	
	//프로젝트 삭제
	@RequestMapping("/projectDelete")
	public View deleteProjectView(ProjectDTO project, Model model) {
		int result = 0;
		result = service.deleteProject(project);
		return jsonview;
	}
	
	//프로젝트 즐겨찾기 추가
	@RequestMapping("/projectBookmarkUpdate")
	public View updateBookmarkProjectView(TeamDTO team, Model model) {
		int result = 0;
		result = service.projectBookmarkUpdate(team);
		return jsonview;
	}
	
	//프로젝트 즐겨찾기 해제
	@RequestMapping("/projectNoneBookmarkUpdate")
	public View projectNoneBookmarkUpdateView(TeamDTO team, Model model) {
		int result = 0;
		result = service.projectNoneBookmarkUpdate(team);
		return jsonview;
	}
	
	//해당 프로젝트의 대한 DTO 조회
	@RequestMapping("/showProject")
	public View showProject(@RequestParam("projectNum") String projectNum, Model model) {
		ProjectDTO project = service.projectSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", project);
		return jsonview;
	}
	
	@RequestMapping("/prjectSearch")
	public View searchProject(TeamDTO team, ProjectDTO project, Model model) {
		List<ProjectDTO> projectDto = service.searchProject(team, project);
		model.addAttribute("data",projectDto);
		return jsonview;
	}
	
	@RequestMapping("/allProject")
	public View autoCompletProject(TeamDTO team, Model model) {
		List<ProjectDTO> list = service.autoCompletProject(team);
		model.addAttribute("list", list);
		return jsonview;
	}
	
}