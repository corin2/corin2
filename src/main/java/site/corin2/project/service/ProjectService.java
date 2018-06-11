/**
    파일명: ProjectService.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
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
	
	public int projectInsert(ProjectDTO project) {
		int result =0;
		ProjectDAO dao = sqlSession.getMapper(ProjectDAO.class);
		result = dao.projectInsert(project);
		
		return result;
	}
}
