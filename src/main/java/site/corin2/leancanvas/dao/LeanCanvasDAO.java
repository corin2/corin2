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
	
	//린캔버스 삽입
	public int leanInsert(LeanCanvasDTO lean);
	
	//린캔버스 내용 뿌려주기
	public List<LeanCanvasDTO> leanAllSelect (LeanCanvasDTO lean);
	
	//린캔버스 수정
	public int leanUpdate (LeanCanvasDTO lean);
}
