/**
    파일명: CheckLIstDAO.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 최 재 욱
*/
package site.corin2.checklist.dao;

import java.util.List;

import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.project.dto.TeamDTO;

public interface CheckListDAO {
	
	public int insertCheckList(CheckListDTO check);
	
	public List<CheckListDTO> selectCheckListAll(CheckListDTO check);
	
	public int updateCheckListContent (CheckListDTO check);
	
	public int deleteCheckLiset (CheckListDTO check);
	
	public List<TeamDTO> userGradeProject (TeamDTO team);
}
