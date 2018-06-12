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
	
	@RequestMapping("/projectInsert")
	public View projectInsertView(ProjectDTO project, Model model) {
		int result = service.projectInsert(project);
		return jsonview;
		
	}
	
	@RequestMapping("/projectAllList")
	public View projectAllSelectView(UserDTO user, Model model) {
		List<ProjectDTO> list = null;
		list = service.projectAllList(user);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	@RequestMapping("/languageColorAllList")
	public View languageColorAllListView(Model model) {
		List<LanguageDTO> list = null;
		list = service.languageColorAllList();
		model.addAttribute("list",list);
		return jsonview;
	}
	
	@RequestMapping("/selectProjectNum")
	public View selectProjectNumView(ProjectDTO project, Model model) {
		System.out.println("들어왔니::" + project.getProjectName());
		List<ProjectDTO> list = null;
		list = service.selectProject(project);
		for(ProjectDTO a : list) {
			model.addAttribute("projectNum",a.getProjectNum());
		}
		
		return jsonview;
	}
}
