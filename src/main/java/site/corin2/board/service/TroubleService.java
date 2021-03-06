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
import site.corin2.board.dao.BoardDAO;
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
			troubles = (ArrayList<TroubleShootingDTO>)troubleDAO.troubleSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return troubles;
	}
	
	//트러블 슈팅게시물 전체 조회
	public List<TroubleShootingDTO> troubleAllSelect(){
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		List<TroubleShootingDTO> troubles = null;
			
		try {
			troubles = (ArrayList<TroubleShootingDTO>)troubleDAO.troubleAllSelect();
				
				
		} catch (Exception e) {
			e.printStackTrace();
		}
		return troubles;
	}
	
	//트러블 슈팅게시물 검색어 조회
	public List<TroubleShootingDTO> troubleSearch(String searchWord){
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		List<TroubleShootingDTO> troubles = null;
		try {
			troubles = (ArrayList<TroubleShootingDTO>)troubleDAO.troubleSearch(searchWord);
					
					
		} catch (Exception e) {
			e.printStackTrace();
		}
		return troubles;
	}
		
	//트러블 슈팅게시물 태그로 조회
	public List<TroubleShootingDTO> troubleSearchTag(String searchTag){
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		List<TroubleShootingDTO> troubles = null;
		try {
			troubles = (ArrayList<TroubleShootingDTO>)troubleDAO.troubleSearchTag(searchTag);
							
							
		} catch (Exception e) {
			e.printStackTrace();
		}
		return troubles;
	}
	
	//트러블 슈팅게시물 동적쿼리 조회
		public List<TroubleShootingDTO> troubleSearchAct(int projectNum,String search,String type){
			TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
			List<TroubleShootingDTO> troubles = null;
			
			try {
				troubles = (ArrayList<TroubleShootingDTO>)troubleDAO.troubleSearchAct(projectNum,search,type);
								
								
			} catch (Exception e) {
				e.printStackTrace();
			}
			return troubles;
		}
		
	//트러블 슈팅 게시글 상세보기 및 편집화면 진입
	public TroubleShootingDTO troubleView(int boardNum) {
			
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		TroubleShootingDTO troubleDTO = null;
			
		troubleDTO = troubleDAO.troubleView(boardNum);
		
		return troubleDTO;
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
		
		String tag = "";
		for(int i=0; i < tsdto.getHashtag().split(",").length; i++) {
			if(i <= 4) tag += (tsdto.getHashtag().split(",")[i]+",");
			else break;
			//if(i != 4) tag += ",";
		}
		
		tag= tag.substring(0,tag.length()-1);
		
		tsdto.setHashtag(tag);
		
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
		int pNum=0;
		TroubleDAO troubleDAO = sqlSession.getMapper(TroubleDAO.class);
		result = troubleDAO.troubleDelete(tsdto);
		pNum=tsdto.getProjectNum();
		
		return pNum;
		
	}
	
	public int totalSelect() {
		TroubleDAO dao = sqlSession.getMapper(TroubleDAO.class);
		int totalCount = dao.totalSelect();
		return totalCount;
	}
	public int totalSelectProjectNum(int projectNum) {
		TroubleDAO dao = sqlSession.getMapper(TroubleDAO.class);
		int totalCount = dao.totalSelectProjectNum(projectNum);
		return totalCount;
	}
	public int troubleSelectActCount(int projectNum,String search,String type) {
		TroubleDAO dao = sqlSession.getMapper(TroubleDAO.class);
		int totalCount = dao.troubleSearchActCount(projectNum,search,type);
		System.out.println(totalCount);
		return totalCount;
	}
	public int troubleSelectSearchCount(String search) {
		TroubleDAO dao = sqlSession.getMapper(TroubleDAO.class);
		int totalCount = dao.troubleSearchCount(search);
		System.out.println(totalCount);
		return totalCount;
	}
	public int troubleSelectSearchTagCount(String search) {
		TroubleDAO dao = sqlSession.getMapper(TroubleDAO.class);
		int totalCount = dao.troubleSearchTagCount(search);
		System.out.println(totalCount);
		return totalCount;
	}

}
