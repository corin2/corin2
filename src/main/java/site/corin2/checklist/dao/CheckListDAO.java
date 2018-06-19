/**
    파일명: CheckLIstDAO.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 최 재 욱
*/
package site.corin2.checklist.dao;

import site.corin2.checklist.dto.CheckListDTO;

public interface CheckListDAO {
	
	public int insertCheckList(CheckListDTO check);
}
