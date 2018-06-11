/**
    파일명: ProjectDAO.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
*/
package site.corin2.project.dao;

import java.util.List;

import site.corin2.project.dto.ProjectDTO;

public interface ProjectDAO {
	
	/**
	  날      짜 : 2018. 6. 11.
	  기      능 : 프로젝트 추가
	  작성자명 : 최 재 욱
	 */
	public int projectInsert(ProjectDTO project);
}
