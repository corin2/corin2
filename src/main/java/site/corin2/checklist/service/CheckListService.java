/**
    파일명: CheckListService.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 최 재 욱
*/
package site.corin2.checklist.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.checklist.dao.CheckListDAO;
import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.project.dto.TeamDTO;

@Service
public class CheckListService {

	@Autowired
	private SqlSession sqlSession;
	
	/**
	* @함수명 : insertCheckList(CheckListDTO check)
	* @작성일 : 2018. 6. 18.
	* @작성자 : 최재욱
	* @설명 : 사용자 체크리스트의 내용을 DB의 삽입 시키기 위한 함수이다.
	* @param CheckListDTO check- CheckListDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int insertCheckList(CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.insertCheckList(check);
		
		return result;
	}
	
	//체크리스트 전체 가져오기
	public List<CheckListDTO> selectCheckListAll (CheckListDTO check){
		List<CheckListDTO> list = null;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		list=dao.selectCheckListAll(check);
		
		return list;
	}
	
	//체크리스트 수정
	public int updateCheckListContent (CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.updateCheckListContent(check);
		return result;
	}
	
	//체크리스트 삭제
	public int deleteCheckLiset (CheckListDTO check) {
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		result = dao.deleteCheckLiset(check);
		return result;
	}
	
	/**
	* @함수명 : userGradeProject (TeamDTO team)
	* @작성일 : 2018. 6. 19.
	* @작성자 : 최재욱
	* @설명 : 프로젝트의 사용자 등급을 판별하여 각 등급별로 해당하는 내용의
	* 탭을 생성해 주는 함수이다.
	* @param TeamDTO team- TeamDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<TeamDTO> userGradeProject (TeamDTO team){
		List<TeamDTO> list = null;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		list = dao.userGradeProject(team);
		return list;
	}
}
