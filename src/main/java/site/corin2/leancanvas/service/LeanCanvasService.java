/**
    파일명: LeanCanvasService.java
    설   명: 
    작성일: 2018. 6. 26.
    작성자: 최 재 욱
*/
package site.corin2.leancanvas.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.leancanvas.dao.LeanCanvasDAO;
import site.corin2.leancanvas.dto.LeanCanvasDTO;

@Service
public class LeanCanvasService {
	
	@Autowired
	private SqlSession sqlSession;
	
	public int leanInsert(LeanCanvasDTO lean) {
		int result = 0;
		LeanCanvasDAO dao = sqlSession.getMapper(LeanCanvasDAO.class);
		result = dao.leanInsert(lean);
		return result;
	}
	
	public List<LeanCanvasDTO> leanAllSelect (LeanCanvasDTO lean){
		List<LeanCanvasDTO> list = null;
		LeanCanvasDAO dao = sqlSession.getMapper(LeanCanvasDAO.class);
		list = dao.leanAllSelect(lean);
		return list;
	}
	
	public int leanUpdate (LeanCanvasDTO lean) {
		int result = 0;
		LeanCanvasDAO dao = sqlSession.getMapper(LeanCanvasDAO.class);
		result = dao.leanUpdate(lean);
		return result;
	}
}
