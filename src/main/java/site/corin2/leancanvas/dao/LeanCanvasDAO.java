/**
    파일명: LeanCanvasDAO.java
    설   명: 
    작성일: 2018. 6. 25.
    작성자: 최 재 욱
*/
package site.corin2.leancanvas.dao;

import java.util.List;

import site.corin2.leancanvas.dto.LeanCanvasDTO;

public interface LeanCanvasDAO {
	
	public int leanInsert(LeanCanvasDTO lean);
	
	public List<LeanCanvasDTO> leanAllSelect (LeanCanvasDTO lean);
	
	public int leanUpdate (LeanCanvasDTO lean);
}
