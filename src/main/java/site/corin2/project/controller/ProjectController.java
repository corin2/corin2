/**
    파일명: ProjectController.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
*/
package site.corin2.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.kanban.service.KanbanService;
import site.corin2.project.dto.ProjectDTO;
import site.corin2.project.service.ProjectService;

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
}
