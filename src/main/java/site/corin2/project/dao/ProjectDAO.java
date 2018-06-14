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
	
	//프로젝트 추가
	public int projectInsert(ProjectDTO project);
	
	//프로젝트 리스트보기
	public List<ProjectDTO> projectAllList(UserDTO user);
	
	//프로젝트 선택보기
	public List<ProjectDTO> selectProject(ProjectDTO project);
	
	//프로젝트 수정
	public int languageUpdate(ProjectDTO project);
	
	//프로젝트 삭제
	public int projectDelete(ProjectDTO project);
	
	//즐겨찾기에 등록된 프로젝트보기
	public List<ProjectDTO> projectBookList(UserDTO user);
	
	//프로젝트 즐겨찾기 등록
	public int projectBookmarkUpdate(ProjectDTO project);
	
	//프로젝트 즐겨찾기 해제
	public int projectNoneBookmarkUpdate(ProjectDTO project);
}
