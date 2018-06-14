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
	
	//프로젝트 생성
	public int projectInsert(ProjectDTO project) {
		int result =0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectInsert(project);
		
		return result;
	}
	
	//프로젝트 전체 리스트보기
	public List<ProjectDTO> projectAllList(UserDTO user){
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.projectAllList(user);
		return list;
	}
	
	//프로젝트 즐겨찾기 리스트보기
	public List<ProjectDTO> projectBookList(UserDTO user){
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.projectBookList(user);
		return list;
	}
	
	//프로젝트 주언어 색 확인하는 리스트보기
	public List<LanguageDTO> languageColorAllList(){
		List<LanguageDTO> list = null;
		LanguageDAO dao = sqlSession.getMapper(LanguageDAO.class);
		list = dao.languageColorAllList();
		System.out.println("리스트 " + list.toString());
		return list;
	}
	
	//프로젝트 선택시 프로젝트 보기
	public List<ProjectDTO> selectProject(ProjectDTO project) {
		List<ProjectDTO> list = null;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		list = dao.selectProject(project);
		return list;
	}
	
	//주언어 수정
	public int updateLanguage(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.languageUpdate(project);
		return result;
	}
	
	//프로젝트 삭제
	public int deleteProject(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectDelete(project);
		return result;
	}
	
	//프로젝트 즐겨찾기 추가
	public int projectBookmarkUpdate(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectBookmarkUpdate(project);
		return result;
	}
	
	//프로젝트 즐겨찾기 삭제
	public int projectNoneBookmarkUpdate(ProjectDTO project) {
		int result = 0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectNoneBookmarkUpdate(project);
		
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
	
}