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

	LinkedList<UploadDTO> uploadSelect(int projectNum);

	void uploadInsert(UploadDTO uploadDTO);

	void boardInsert(BoardDTO boardDTO);

	void fileDelete(UploadDTO uploadDTO);

	void gradeSelect(int projectNum);


}
