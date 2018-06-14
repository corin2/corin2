/**
    파일명: ProjectService.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
*/
package site.corin2.project.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.project.dao.LanguageDAO;
import site.corin2.project.dao.ProjectDAO;
import site.corin2.project.dto.LanguageDTO;
import site.corin2.project.dto.ProjectDTO;
import site.corin2.user.dto.UserDTO;

@Service
public class ProjectService {

	@Autowired
	private SqlSession sqlSession;
	
	public int projectInsert(ProjectDTO project) {
		int result =0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectInsert(project);
		
		return result;
	}
	
	public List<ProjectDTO> projectAllList(UserDTO user){
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.projectAllList(user);
		return list;
	}
	
	public List<LanguageDTO> languageColorAllList(){
		List<LanguageDTO> list = null;
		LanguageDAO dao = sqlSession.getMapper(LanguageDAO.class);
		list = dao.languageColorAllList();
		return list;
	}
	
	public List<ProjectDTO> selectProject(ProjectDTO project) {
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.selectProject(project);
		return list;
	}
	
	public int updateLanguage(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.languageUpdate(project);
		return result;
	}
	
	public int deleteProject(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectDelete(project);
		return result;
	}
}
