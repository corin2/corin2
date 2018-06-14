/**
    파일명: ProjectDAO.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 최 재 욱
*/
package site.corin2.project.dao;

import java.util.List;
import java.util.Map;

import site.corin2.project.dto.ProjectDTO;
import site.corin2.user.dto.UserDTO;

public interface ProjectDAO {
	
	/**
	  날      짜 : 2018. 6. 11.
	  기      능 : 프로젝트 추가
	  작성자명 : 최 재 욱
	 */
	public int projectInsert(ProjectDTO project);
	
	/**
	  날      짜 : 2018. 6. 12.
	  기      능 : 프로젝트 전체 리스트 보기 
	  작성자명 : 최 재 욱
	 */
	public List<ProjectDTO> projectAllList(UserDTO user);
	
	public List<ProjectDTO> selectProject(ProjectDTO project);
	
	public int languageUpdate(ProjectDTO project);
	
	public int projectDelete(ProjectDTO project);
}
