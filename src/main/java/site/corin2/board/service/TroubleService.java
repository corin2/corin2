/**
    파일명: TroubleService.java
    설   명: 트러블슈팅의 Service. 마이바티스의 xml의 쿼리와 매핑
    작성일: 2018. 6. 8.
    작성자: 배현준 
 */
package site.corin2.board.service;

import java.util.ArrayList;
import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.corin2.board.dto.TroubleShootingDTO;
import site.corin2.board.dao.TroubleDAO;

@Service
public class TroubleService {
	
	@Autowired
	private SqlSession sqlSession;
	
	//프로젝트 넘버로 트러블 슈팅게시물 조회
	public List<TroubleShootingDTO> troubleSelect(int projectNum){
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		List<TroubleShootingDTO> troubles = null;
		
		try {
			
			System.out.println(projectNum);
			troubles = (ArrayList<TroubleShootingDTO>)troubleDAO.troubleSelect(projectNum);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return troubles;
	}
	
	//트러블 슈팅 게시물 추가(1차 board 테이블에 insert)
	public int troubleInsert(TroubleShootingDTO tsdto) {
		int result=0;
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		result = troubleDAO.troubleInsert(tsdto);
		
		return result;
		
	}
	
	//트러블 슈팅 게시물내용 추가(2차 troubleshooting 테이블에 insert)
	public int troubleInsertDetail(TroubleShootingDTO tsdto) {
		int result=0;
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		result = troubleDAO.troubleInsertDetail(tsdto);
		
		return result;
		
	}
	
	//트러블 슈팅 게시물 수정
	public int troubleUpdate(TroubleShootingDTO tsdto) {
		int result=0;
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		result = troubleDAO.troubleUpdate(tsdto);
		
		return result;
		
	}
	
	//트러블 슈팅 게시물 삭제
	public int troubleDelete(TroubleShootingDTO tsdto) {
		int result=0;
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		result = troubleDAO.troubleDelete(tsdto);
		
		return result;
		
	}
	
}
