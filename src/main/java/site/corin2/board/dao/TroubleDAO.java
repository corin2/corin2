/**
    파일명: TroubleDAO.java
    설   명: 트러블슈팅의 DB 처리를 위한 인터페이스
    작성일: 2018. 6. 8.
    작성자: 배현준
*/

package site.corin2.board.dao;

import java.util.List;
import site.corin2.board.dto.TroubleShootingDTO;

public interface TroubleDAO {
	
	//프로젝트 넘버로 트러블 슈팅게시물 조회
	public List<TroubleShootingDTO> troubleSelect(int projectNum);
	
	//트러블 슈팅 게시물 추가(1차 board 테이블에 insert)
	public int troubleInsert(TroubleShootingDTO tsdto);
	
	//트러블 슈팅 게시물내용 추가(2차 troubleshooting 테이블에 insert)
	public int troubleInsertDetail(TroubleShootingDTO tsdto);
	
	//트러블 슈팅 게시물 수정
	public int troubleUpdate(TroubleShootingDTO tsdto);
	
	//트러블 슈팅 게시물 삭제
	public int troubleDelete(TroubleShootingDTO tsdto);
	
	
}
