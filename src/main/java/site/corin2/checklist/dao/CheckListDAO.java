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
	
	//체크리스트 삽입
	public int insertCheckList(CheckListDTO check);
	
	//체크리스트 가져요기
	public List<CheckListDTO> selectCheckListAll(CheckListDTO check);
	
	//체크리스트 수정
	public int updateCheckListContent (CheckListDTO check);
	
	//체크리스트 삭제
	public int deleteCheckLiset (CheckListDTO check);
	
	//사용자 등급 가져오기
	public List<TeamDTO> userGradeProject (TeamDTO team);
}
