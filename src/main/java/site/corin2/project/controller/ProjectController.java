/**
    파일명: ProjectController.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
*/
package site.corin2.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.kanban.service.KanbanService;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.project.dto.ProjectDTO;
import site.corin2.project.service.ProjectService;
import site.corin2.user.dto.UserDTO;

@Controller
public class ProjectController {

	@Autowired
	private View jsonview;
	
	@Autowired
	private ProjectService service;

	@RequestMapping("/project")
	public String ProjectFile() {
		return "project.project";
	}
	
	//프로젝트 생성
	@RequestMapping("/projectInsert")
	public View projectInsertView(ProjectDTO project, Model model) {
		int result = service.projectInsert(project);
		return jsonview;
		
	}
	
	//프로젝트 전체 리스트보기
	@RequestMapping("/projectAllList")
	public View projectAllSelectView(UserDTO user, Model model) {
		List<ProjectDTO> list = null;
		list = service.projectAllList(user);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	//즐겨찾기 리스트 보기
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
	public View updateBookmarkProjectView(ProjectDTO project, Model model) {
		int result = 0;
		result = service.projectBookmarkUpdate(project);
		return jsonview;
	}
	
	//프로젝트 즐겨찾기 해제
	@RequestMapping("/projectNoneBookmarkUpdate")
	public View projectNoneBookmarkUpdateView(ProjectDTO project, Model model) {
		int result = 0;
		result = service.projectNoneBookmarkUpdate(project);
		return jsonview;
	}
	
	//해당 프로젝트의 대한 DTO 조회
	@RequestMapping("/showProject")
	public View showProject(@RequestParam("projectNum") String projectNum, Model model) {
		ProjectDTO project = service.projectSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", project);
		return jsonview;
	}
	
}