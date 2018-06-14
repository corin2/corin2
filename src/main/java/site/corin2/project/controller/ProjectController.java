/**
    파일명: ProjectController.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import site.corin2.project.dto.ProjectDTO;
import site.corin2.project.service.ProjectService;


@Controller
public class ProjectController {
	

	@Autowired
	private ProjectService service;
	
	@Autowired
	private View jsonview;
	
	//해당 프로젝트의 대한 DTO 조회
	@RequestMapping("/showProject")
	public View showProject(@RequestParam("projectNum") String projectNum, Model model) {
		ProjectDTO project = service.projectSelect(Integer.parseInt(projectNum));
		model.addAttribute("data", project);
		return jsonview;
	}
}
