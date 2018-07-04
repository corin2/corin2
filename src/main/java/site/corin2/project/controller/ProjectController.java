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
	* @param UserDTO user- UserDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/projectBookList")
	public View projectBookSelectView(UserDTO user, Model model) {
		List<ProjectDTO> list = null;
		list = service.projectBookList(user);
		model.addAttribute("list",list);
		return jsonview;
	}
	
	/**
	* @함수명 : languageColorAllListView
	* @작성일 : 2018. 6. 14.
	* @작성자 : 최재욱
	* @설명 : 프로젝트당 언어를 설정하게 되는데 해당 언어의 색상을 보기 위한 함수이다.
	**/
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
	
	/**
	* @함수명 : selectProjectNumView(ProjectDTO project, Model model)
	* @작성일 : 2018. 6. 13.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 생성할때 DB상 Team 테이블에도 함께 삽입 해야한다. 그러기 위해
	* projectNum이 필요한데 이를 위해 projectNum을 가져온다.
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/selectProjectNum")
	public View selectProjectNumView(ProjectDTO project, Model model) {
		List<ProjectDTO> list = null;
		list = service.selectProject(project);
		for(ProjectDTO a : list) {
			model.addAttribute("projectNum",a.getProjectNum());
		}
		
		return jsonview;
	}
	
	/**
	* @함수명 : languageUpdateView(ProjectDTO project, Model model)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : DB상에 언어를 수정할 수 있게하는 함수이다.
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	* 
	**/
	@RequestMapping("/languageUpdate")
	public View languageUpdateView(ProjectDTO project, Model model) {
		int result = 0;
		result = service.updateLanguage(project);
		return jsonview;
	}
	
	/**
	* @함수명 : deleteProjectView(ProjectDTO project, Model model)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 삭제하기 위한 함수이다.
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/projectDelete")
	public View deleteProjectView(ProjectDTO project, Model model) {
		int result = 0;
		result = service.deleteProject(project);
		return jsonview;
	}
	
	/**
	* @함수명 : updateBookmarkProjectView(TeamDTO team, Model model)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : 북마크 버튼을 눌럿을때 DB상에 북마크인 상태로 업데이트 해주는 함수이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/projectBookmarkUpdate")
	public View updateBookmarkProjectView(TeamDTO team, Model model) {
		int result = 0;
		result = service.projectBookmarkUpdate(team);
		return jsonview;
	}
	
	/**
	* @함수명 : projectNoneBookmarkUpdateView(TeamDTO team, Model model)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : 북마크 버튼을 눌럿을때 DB상에 북마크가 아닌 상태로 업데이트 해주는 함수이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
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
	/**
	* @함수명 :  searchProject(TeamDTO team, ProjectDTO project, Model model)
	* @작성일 : 2018. 6. 16.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 검색시 그에 해당하는 프로젝트를 보여주는 함수 이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/prjectSearch")
	public View searchProject(TeamDTO team, ProjectDTO project, Model model) {
		List<ProjectDTO> projectDto = service.searchProject(team, project);
		model.addAttribute("data",projectDto);
		return jsonview;
	}
	/**
	* @함수명 : autoCompletProject(TeamDTO team, Model model)
	* @작성일 : 2018. 6. 16.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 검색시 사용자가 작성한 내용과 일치하는 프로젝트 이름을
	* 미리 보여주는 함수이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 service로 넘기기 위한 변수
	**/
	@RequestMapping("/allProject")
	public View autoCompletProject(TeamDTO team, Model model) {
		List<ProjectDTO> list = service.autoCompletProject(team);
		model.addAttribute("list", list);
		return jsonview;
	}
	
}