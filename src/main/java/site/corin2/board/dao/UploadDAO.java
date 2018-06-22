/* 
    파일명: FileUploadDAO.java
    설명: 
    작성일: 2018. 6. 12.
    작성자: 전나영
*/
package site.corin2.board.dao;

import java.util.LinkedList;
import site.corin2.board.dto.BoardDTO;
import site.corin2.board.dto.UploadDTO;

public interface UploadDAO {
	//전체조회
	LinkedList<UploadDTO> uploadSelect(int projectNum);
	//파일 insert
	void uploadInsert(UploadDTO uploadDTO);
	//게시판 insert
	void boardInsert(BoardDTO boardDTO);
	//삭제기능
	void fileDelete(UploadDTO uploadDTO);

/*	LinkedList<UploadDTO> searcherSelect();
*/

}
