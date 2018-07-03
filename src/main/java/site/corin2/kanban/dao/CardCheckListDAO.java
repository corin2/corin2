/**
    파일명: CheckListDAO.java
    설   명: 체크리스트 에 파생된 기능체크리스트와 카드체크리스트
    작성일: 2018. 6. 5.
    작성자: 김 진 원
*/

package site.corin2.kanban.dao;

import java.util.List;

import site.corin2.kanban.dto.CardCheckListDTO;

public interface CardCheckListDAO {
	
	//카드체크리스트 추가 
	public int checkListInsert(CardCheckListDTO checkList);
	
	//체크리스트 조건검색 (체크넘버와 기능넘버로 체크리스트를 찾는다)
	public List<CardCheckListDTO> checkListSelect(CardCheckListDTO checkList);
	
	//체크리스트 수정 
	public void checkListUpdate(CardCheckListDTO checkList);
	
	//체크리스트 조건검색 (체크넘버와 기능넘버로 체크리스트를 찾아서 삭제여부를 0으로 Update 한다.)
	public int checkListDelete(CardCheckListDTO checkList);
	
	
}
