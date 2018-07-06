/* 
    파일명: FileUploadService.java
    설명: 
    작성일: 2018. 6. 16.
    작성자: 전나영
*/
package site.corin2.board.service;

import java.util.HashMap;
import java.util.LinkedList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.corin2.board.dao.UploadDAO;
import site.corin2.board.dto.BoardDTO;
import site.corin2.board.dto.UploadDTO;

@Service
public class UploadService {

	@Autowired
	private SqlSession sqlSession;
	
	/**
	    * @함수명 : uploadSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일 전체조회
	    * @param projectNum
	    * @return LinkedList<UploadDTO>
	 */
	public LinkedList<UploadDTO> uploadSelect(int projectNum) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		return dao.uploadSelect(projectNum);
		
	}
	
	/**
	    * @함수명 : boardInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : board Insert
	    * @param BoardDTO
	    * @return void
	 */
	public void boardInsert(BoardDTO boardDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		dao.boardInsert(boardDTO);
		
	}
	
	/**
	    * @함수명 : uploadInsert
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일 upload Insert
	    * @param UploadDTO
	    * @return void
	 */
	public void uploadInsert(UploadDTO uploadDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		dao.uploadInsert(uploadDTO);
	}

	/**
	    * @함수명 : fileDelete
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 업로드된 파일들을 삭제하는 함수
	    * @param UploadDTO
	    * @return void
	 */
	public void fileDelete(UploadDTO uploadDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		dao.fileDelete(uploadDTO);
		
	}

	/**
	    * @함수명 : searcherFileSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일 작성자 , 파일명 검색하는 기능
	    * @param UploadDTO
	    * @return LinkedList<UploadDTO>
	 */	
	public LinkedList<UploadDTO> searcherFileSelect(UploadDTO uploadDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		return  dao.searcherFileSelect(uploadDTO);
	}

	/**
	    * @함수명 : exClick
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : jstree 를 사용해서 클릭한 확장자를 통해서 검색하는 기능
	    * @param HashMap<String, Object>
	    * @return LinkedList<UploadDTO>
	 */	
	public LinkedList<UploadDTO> exClick(HashMap<String, Object> map) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);		
		return dao.exClick(map);
	}


}
