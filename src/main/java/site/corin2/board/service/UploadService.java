/* 
    파일명: FileUploadService.java
    설명: 
    작성일: 2018. 6. 16.
    작성자: 전나영
*/
package site.corin2.board.service;

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
	//전체조회 
	public LinkedList<UploadDTO> uploadSelect(int projectNum) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		return dao.uploadSelect(projectNum);
	
		
	}
	//파일 insert
	public void uploadInsert(UploadDTO uploadDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		dao.uploadInsert(uploadDTO);
	}
	//게시판 insert
	public void boardInsert(BoardDTO boardDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		dao.boardInsert(boardDTO);
		
	}
	//삭제하는 함수
	public void fileDelete(UploadDTO uploadDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		dao.fileDelete(uploadDTO);
		
	}

	public LinkedList<UploadDTO> searcherFileSelect(UploadDTO uploadDTO) {
		UploadDAO dao = sqlSession.getMapper(UploadDAO.class);
		return  dao.searcherFileSelect(uploadDTO);
	}



}
