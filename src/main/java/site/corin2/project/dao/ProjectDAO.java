/**
    파일명: TeamDAO.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.dao;

import site.corin2.project.dto.ProjectDTO;

public interface ProjectDAO {
	
	//프로젝트 하나 검색
	public ProjectDTO projectSelect(int projectNum);
	
}
