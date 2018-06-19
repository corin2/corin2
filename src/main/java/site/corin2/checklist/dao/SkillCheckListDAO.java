/**
    파일명: SkillCheckListDAO.java
    설   명: 
    작성일: 2018. 6. 15.
    작성자: 최 재 욱
*/
package site.corin2.checklist.dao;

import java.util.List;

import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.checklist.dto.SkillCheckListDTO;

public interface SkillCheckListDAO {
	
	
	//DB저장된 데이터 뿌려주기
	public List<CheckListDTO> checkListAllSelect ();
	
	//체크한 인원 삽입
	public int checkListCheckInsert(SkillCheckListDTO skillcheck); 
	
	//체크값 가져오기
	public List<SkillCheckListDTO> checkedSelect (SkillCheckListDTO skillcheck);
	
	//체크여부 삭제
	public int checkedDelete (SkillCheckListDTO skillcheck);
	
}
