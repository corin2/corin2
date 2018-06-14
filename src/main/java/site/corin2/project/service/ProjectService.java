/**
    파일명: ProjectService.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.project.dao.ProjectDAO;
import site.corin2.project.dto.ProjectDTO;

@Service
public class ProjectService {
	
	@Autowired
	private SqlSession sqlSession;
	
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
