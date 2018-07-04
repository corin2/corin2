/**
    파일명: ProjectService.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
*/
package site.corin2.project.service;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.project.dao.LanguageDAO;
import site.corin2.project.dao.ProjectDAO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.project.dto.ProjectDTO;
import site.corin2.project.dto.TeamDTO;
import site.corin2.user.dto.UserDTO;

@Service
public class ProjectService {

	@Autowired
	private SqlSession sqlSession;
	
	/**
	* @함수명 :  projectInsert(ProjectDTO project)
	* @작성일 : 2018. 6. 13.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 생성하기 위한 함수
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int projectInsert(ProjectDTO project) {
		int result =0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectInsert(project);
		
		return result;
	}
	
	/**
	* @함수명 : projectAllList(UserDTO user)
	* @작성일 : 2018. 6. 13.
	* @작성자 : 최재욱
	* @설명 : 프로젝트 언어의 색을 이용하여 프로젝트 버튼의 색을 지정해 주고 프로젝트를 보여주는 함수이다.
	* @param UserDTO user- UserDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<ProjectDTO> projectAllList(UserDTO user){
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.projectAllList(user);
		return list;
	}
	
	/**
	* @함수명 :projectBookList(UserDTO user)
	* @작성일 : 2018. 6. 14.
	* @작성자 : 최재욱
	* @설명 : 프로젝트 언어의 색을 이용하여 프로젝트 버튼의 색을 지정해 주고 
	* 즐겨찾기 부분에 프로젝트를 보여주는 함수이다.
	* @param UserDTO user- UserDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<ProjectDTO> projectBookList(UserDTO user){
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.projectBookList(user);
		return list;
	}
	
	/**
	* @함수명 : languageColorAllList()
	* @작성일 : 2018. 6. 14.
	* @작성자 : 최재욱
	* @설명 : 프로젝트당 언어를 설정하게 되는데 해당 언어의 색상을 보기 위한 함수이다.
	**/
	public List<LanguageDTO> languageColorAllList(){
		List<LanguageDTO> list = null;
		LanguageDAO dao = sqlSession.getMapper(LanguageDAO.class);
		list = dao.languageColorAllList();
		return list;
	}
	
	//프로젝트 번호로 주언어 정보 보기
	public LanguageDTO languageInfoByProjectNum(String projectNum) {
		LanguageDTO list = null;
		LanguageDAO dao = sqlSession.getMapper(LanguageDAO.class);
		list = dao.languageInfoByProjectNum(projectNum);
		return list;
	}
	
	/**
	* @함수명 : selectProject(ProjectDTO project)
	* @작성일 : 2018. 6. 13.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 생성할때 DB상 Team 테이블에도 함께 삽입 해야한다. 그러기 위해
	* projectNum이 필요한데 이를 위해 projectNum을 가져온다.
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<ProjectDTO> selectProject(ProjectDTO project) {
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.selectProject(project);
		return list;
	}
	
	/**
	* @함수명 : updateLanguage(ProjectDTO project)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : DB상에 언어를 수정할 수 있게하는 함수이다.
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	* 
	**/
	public int updateLanguage(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.languageUpdate(project);
		return result;
	}
	
	/**
	* @함수명 : deleteProject(ProjectDTO project)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 삭제하기 위한 함수이다.
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int deleteProject(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectDelete(project);
		return result;
	}
	
	/**
	* @함수명 : projectBookmarkUpdate(TeamDTO team)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : 북마크 버튼을 눌럿을때 DB상에 북마크인 상태로 업데이트 해주는 함수이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int projectBookmarkUpdate(TeamDTO team) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectBookmarkUpdate(team);
		return result;
	}
	
	/**
	* @함수명 : projectNoneBookmarkUpdate(TeamDTO team)
	* @작성일 : 2018. 6. 15.
	* @작성자 : 최재욱
	* @설명 : 북마크 버튼을 눌럿을때 DB상에 북마크가 아닌 상태로 업데이트 해주는 함수이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int projectNoneBookmarkUpdate(TeamDTO team) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectNoneBookmarkUpdate(team);
		
		return result;
	}
	
	//해당 프로젝트의 대한 DTO 조회
	public ProjectDTO projectSelect(int projectNum){
		ProjectDAO projectDAO = sqlSession.getMapper(ProjectDAO.class);
		ProjectDTO project = null;
		try {
			project = (ProjectDTO)projectDAO.projectSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return project;
	}
	/**
	* @함수명 : searchProject(TeamDTO team, ProjectDTO project)
	* @작성일 : 2018. 6. 16.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 검색시 그에 해당하는 프로젝트를 보여주는 함수 이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	* @param ProjectDTO project- ProjectDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<ProjectDTO> searchProject(TeamDTO team, ProjectDTO project) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("userId", team.getUserId());
		map.put("projectName", project.getProjectName());
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		List<ProjectDTO> list = null;
		list = dao.searchProject(map);
		return list;
	}
	
	/**
	* @함수명 : autoCompletProject(TeamDTO team)
	* @작성일 : 2018. 6. 16.
	* @작성자 : 최재욱
	* @설명 : 프로젝트를 검색시 사용자가 작성한 내용과 일치하는 프로젝트 이름을
	* 미리 보여주는 함수이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<ProjectDTO> autoCompletProject(TeamDTO team){
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		List<ProjectDTO> list = null;
		list = dao.autoCompletProject(team);
		return list;
	}
	
}