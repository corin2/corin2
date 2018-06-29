/* 
    파일명: BoardDAO.java
    설명: 
    작성일: 2018. 6. 7.
    작성자: 전나영
*/
package site.corin2.board.dao;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import site.corin2.board.dto.AnnounceDTO;
import site.corin2.board.dto.BoardDTO;


public interface BoardDAO {
	
	public List<BoardDTO> boardAllSelect();
	
	public void boardInsert(BoardDTO boardDTO);

	public void announceInsert(AnnounceDTO announceDTO);

	public BoardDTO boardSelect(int boardnum);

	public void boardUpdate(BoardDTO boardDTO);

	public void announceUpdate(AnnounceDTO announceDTO);

	public void boardDelete(int boardnum);

	//조회한 게시물 개수 (페이징처리)
	public int totalSelect();

	
}
