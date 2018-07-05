/* 
    파일명: FileUploadDAO.java
    설명: 
    작성일: 2018. 6. 12.
    작성자: 전나영
*/
package site.corin2.board.dao;

import java.util.HashMap;
import java.util.LinkedList;
import site.corin2.board.dto.BoardDTO;
import site.corin2.board.dto.UploadDTO;

public interface UploadDAO {

	/**
	    * @함수명 : uploadSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일 전체조회
	    * @param projectNum
	    * @return LinkedList<UploadDTO>
	 */
	LinkedList<UploadDTO> uploadSelect(int projectNum);
	
	/**
	    * @함수명 : boardInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : board Insert
	    * @param BoardDTO
	    * @return void
	 */
	void boardInsert(BoardDTO boardDTO);
	
	/**
	    * @함수명 : uploadInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일 upload Insert
	    * @param UploadDTO
	    * @return void
	 */
	void uploadInsert(UploadDTO uploadDTO);

	/**
	    * @함수명 : fileDelete
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 업로드된 파일들을 삭제하는 함수
	    * @param UploadDTO
	    * @return void
	 */
	void fileDelete(UploadDTO uploadDTO);
	
	/**
	    * @함수명 : searcherFileSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일 작성자 , 파일명 검색하는 기능
	    * @param UploadDTO
	    * @return LinkedList<UploadDTO>
	 */	
	LinkedList<UploadDTO> searcherFileSelect(UploadDTO uploadDTO);
	
	/**
	    * @함수명 : exClick
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : jstree 를 사용해서 클릭한 확장자를 통해서 검색하는 기능
	    * @param HashMap<String, Object>
	    * @return LinkedList<UploadDTO>
	 */	
	LinkedList<UploadDTO> exClick(HashMap<String, Object> map);


}
