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
	
	/**
	* @함수명 : leanInsert(LeanCanvasDTO lean)
	* @작성일 : 2018. 6. 22.
	* @작성자 : 최재욱
	* @설명 : 린캔버스에 해당하는 내용을 DB에 저장하기 위한 함수이다.
	* @param LeanCanvasDTO lean- lean 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int leanInsert(LeanCanvasDTO lean) {
		int result = 0;
		LeanCanvasDAO dao = sqlSession.getMapper(LeanCanvasDAO.class);
		result = dao.leanInsert(lean);
		return result;
	}
	
	/**
	* @함수명 : leanAllSelect (LeanCanvasDTO lean)
	* @작성일 : 2018. 6. 22.
	* @작성자 : 최재욱
	* @설명 : 린캔번스의 내용이 해당하는 칸에 컬럼명과 일치하는 내용을 보여준다.
	* 또한 정규 표현식을 활용하여 태그의 유출없이 해당 내용을 보여주게 하였다.
	* @param LeanCanvasDTO lean- lean 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<LeanCanvasDTO> leanAllSelect (LeanCanvasDTO lean){
		List<LeanCanvasDTO> list = null;
		LeanCanvasDAO dao = sqlSession.getMapper(LeanCanvasDAO.class);
		list = dao.leanAllSelect(lean);
		return list;
	}
	
	/**
	* @함수명 : leanUpdate (LeanCanvasDTO lean)
	* @작성일 : 2018. 6. 22.
	* @작성자 : 최재욱
	* @설명 : 사용자가 작성한 내용을 DB상에 수정해 주는 함수이다.
	* @param LeanCanvasDTO lean- lean 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int leanUpdate (LeanCanvasDTO lean) {
		int result = 0;
		LeanCanvasDAO dao = sqlSession.getMapper(LeanCanvasDAO.class);
		result = dao.leanUpdate(lean);
		return result;
	}
}
