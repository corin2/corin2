/* 
    파일명: AnnounceService.java
    설명: 
    작성일: 2018. 6. 7.
    작성자: 전나영
*/
package site.corin2.board.service;

import java.util.HashMap;
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

	public List<BoardDTO> boardAllSelect() {
	
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		List<BoardDTO> list = dao.boardAllSelect();
			
		return list;	
	}
	public void boardInsert(BoardDTO boardDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		  dao.boardInsert(boardDTO);	
	}
	public void announceInsert(AnnounceDTO announceDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.announceInsert(announceDTO);	
	}
	public BoardDTO boardSelect(int boardnum) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		 BoardDTO boardDTO = dao.boardSelect(boardnum);
		return boardDTO;
	}
	public void boardUpdate(BoardDTO boardDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.boardUpdate(boardDTO);
	}
	public void announceUpdate(AnnounceDTO announceDTO) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.announceUpdate(announceDTO);
		
	}
	public void boardDelete(int boardnum) {
		BoardDAO dao = sqlSession.getMapper(BoardDAO.class);
		dao.boardDelete(boardnum);
	}
	
}
