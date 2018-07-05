/* 
    파일명: AnnounceService.java
    설명: 
    작성일: 2018. 6. 7.
    작성자: 전나영
*/
package site.corin2.board.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.board.dao.BoardDAO;
import site.corin2.board.dto.AnnounceDTO;
import site.corin2.board.dto.BoardDTO;

@Service
public class BoardService {
	
	@Autowired
	private SqlSession sqlSession;
	
	/**
	    * @함수명 : boardAllSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 모든 게시물 조회
	    * @param 
	    * @return List<BoardDTO>
	 */
	public List<BoardDTO> boardAllSelect() {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		List<BoardDTO> list = dao.boardAllSelect();
		return list;
	}
	
	/**
	    * @함수명 : boardSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 게시물 상세 조회
	    * @param  boardnum
	    * @return BoardDTO
	 */
	public BoardDTO boardSelect(int boardnum) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		BoardDTO boardDTO = dao.boardSelect(boardnum);
		return boardDTO;
	}
	
	/**
	    * @함수명 : boardInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 게시물 insert
	    * @param BoardDTO
	    * @return void
	 */
	public void boardInsert(BoardDTO boardDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.boardInsert(boardDTO);	
	}
	
	/**
	    * @함수명 : announceInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : announce Insert
	    * @param AnnounceDTO
	    * @return void
	 */
	public void announceInsert(AnnounceDTO announceDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.announceInsert(announceDTO);	
	}
	
	/**
	    * @함수명 : boardUpdate
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 특정 게시물을 수정처리한다.
	    * @param BoardDTO
	    * @return void
	 */
	public void boardUpdate(BoardDTO boardDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class); 
		dao.boardUpdate(boardDTO);
	}
	
	/**
	    * @함수명 : announceUpdate
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : announce Update
	    * @param AnnounceDTO
	    * @return void
	 */
	public void announceUpdate(AnnounceDTO announceDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.announceUpdate(announceDTO);
		
	}
	
	/**
	    * @함수명 : boardDelete
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 특정 게시글을 삭제한다.
	    * @param boardnum 
	    * @return void
	 */
	public void boardDelete(int boardnum) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.boardDelete(boardnum);
	}

	/**
	    * @함수명 : totalSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 조회한 총 게시물 개수
	    * @param 
	    * @return int totalCount
	 */
	public int totalSelect() {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		int totalCount = dao.totalSelect();
		return totalCount;
	}

}
