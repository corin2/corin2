/**
    파일명: TeamDAO.java
    설   명: 
    작성일: 2018. 6. 6.
    작성자: 김 진 원
*/

package site.corin2.project.dao;

import site.corin2.project.dto.ProjectDTO;

public interface ProjectDAO {
	
	/**
	 날      짜 : 2018. 6. 6.
	 기      능 : 프로젝트 하나 검색
	 작성자명 : 김 진 원
	*/
	public ProjectDTO projectSelect(int projectNum);
	
}
