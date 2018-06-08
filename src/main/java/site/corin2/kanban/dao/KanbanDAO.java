/**
    파일명: KanbanDAO.java
    설   명: 칸반보드에 필요한 칸반보드메인 과, 카드디테일
    작성일: 2018. 6. 5.
    작성자: 김 진 원
*/

package site.corin2.kanban.dao;

import java.util.List;

import site.corin2.kanban.dto.CardDTO;
import site.corin2.kanban.dto.ListDTO;


public interface KanbanDAO {
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 카드추가
	 작성자명 : 김 진 원
	*/
	public int cardInsert(CardDTO card);
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 카드수정
	 작성자명 : 김 진 원
	*/
	public int cardUpdate(CardDTO card);
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 카드삭제 (isDeleted를 0으로 수정 해준다) 실제로는 Update
	 작성자명 : 김 진 원
	*/
	public int cardDelete(int cardNum);
	
	/**
	 날      짜 : 2018. 6. 7.
	 기      능 : 카드삭제시 해당 카드의 순번보다 높은 순번 -1 씩 해준후 카드삭제
	 작성자명 : 김 진 원
	*/
	public int cardDeleteTaxis(CardDTO card);
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 모든 카드 불러오기 (프로젝트 넘버로)
	 작성자명 : 김 진 원
	*/
	public List<CardDTO> cardAllSelect(int projectNum);
	
	/**
	 날      짜 : 2018. 6. 8.
	 기      능 : 카드의 순서를 변경한다. 
	 작성자명 : 김 진 원
	*/
	public int cardTaxisUpdate(CardDTO card);
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 하나의 카드를 검색한다. 
	 작성자명 : 김 진 원
	*/
	public CardDTO cardSelect(int cardNum);
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 관리자가 리스트를 추가 할 수 있다. 
	 작성자명 : 김 진 원
	*/
	public int listInsert(ListDTO list);
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 관리자가 리스트를 수정 할 수 있다.
	 작성자명 : 김 진 원
	*/
	public int listUpdate(ListDTO list);
	
	/**
	 날      짜 : 2018. 6. 5.
	 기      능 : 리스트 테이블에 있는 모든 것을 검색한다. 
	 작성자명 : 김 진 원
	*/
	public List<ListDTO> listAllSelect();


}
