/* 
    파일명: BoardDAO.java
    설명: 
    작성일: 2018. 6. 7.
    작성자: 전나영
*/
package site.corin2.board.dao;

import java.util.List;

import site.corin2.board.dto.AnnounceDTO;
import site.corin2.board.dto.BoardDTO;

public interface BoardDAO {
	
	/**
	    * @함수명 : boardAllSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 모든 게시물 조회
	    * @param 
	    * @return List<BoardDTO>
	 */
	public List<BoardDTO> boardAllSelect();
	
	/**
	    * @함수명 : boardSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 게시물 상세 조회
	    * @param  boardnum
	    * @return BoardDTO
	 */
	public BoardDTO boardSelect(int boardnum);

	/**
	    * @함수명 : boardInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 게시물 insert
	    * @param BoardDTO
	    * @return void
	 */
	public void boardInsert(BoardDTO boardDTO);
	/**
	    * @함수명 : announceInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : announce Insert
	    * @param AnnounceDTO
	    * @return void
	 */
	public void announceInsert(AnnounceDTO announceDTO);

	/**
	    * @함수명 : boardUpdate
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 특정 게시물을 수정처리한다.
	    * @param BoardDTO
	    * @return void
	 */
	public void boardUpdate(BoardDTO boardDTO);

	/**
	    * @함수명 : announceUpdate
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : announce Update
	    * @param AnnounceDTO
	    * @return void
	 */
	public void announceUpdate(AnnounceDTO announceDTO);

	/**
	    * @함수명 : boardDelete
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 특정 게시글을 삭제한다.
	    * @param boardnum 
	    * @return void
	 */
	public void boardDelete(int boardnum);

	/**
	    * @함수명 : totalSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 조회한 총 게시물 개수
	    * @param 
	    * @return int totalCount
	 */
	public int totalSelect();

	
}
