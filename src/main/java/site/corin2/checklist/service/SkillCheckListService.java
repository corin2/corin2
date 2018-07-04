/**
    파일명: SkillCheckListService.java
    설   명: 
    작성일: 2018. 6. 15.
    작성자: 최 재 욱
*/
package site.corin2.checklist.service;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.corin2.checklist.dao.SkillCheckListDAO;
import site.corin2.checklist.dto.CheckListDTO;
import site.corin2.checklist.dto.SkillCheckListDTO;

@Service
public class SkillCheckListService {
	
	@Autowired
	private SqlSession sqlSession;
	
	/**
	* @함수명 : skillCheckListAllSelect(CheckListDTO check, Model model)
	* @작성일 : 2018. 6. 20.
	* @작성자 : 최재욱
	* @설명 : 파라미터로 각 프로젝트의 해당하는 멤버의 아이디를 받아
	* 해당위치의 체크리스트의 내용과 멤버의 아이디를 보여주는 함수 이다.
	* @param CheckListDTO check- CheckListDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<CheckListDTO> checkListAllSelect (CheckListDTO check){
		
		List<CheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.checkListAllSelect(check);
		
		return list;
	}
	
	/**
	* @함수명 : checkedInsert(checkNum)
	* @작성일 : 2018. 6. 21.
	* @작성자 : 최재욱
	* @설명 : 사용자가 체크를 하엿을때 해당 하는 내용의 체크여부를 DB에 저장 또는 삭제 하기 위한 함수이다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public int checkListCheckInsert(SkillCheckListDTO skillcheck) {
		int result = 0;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		result = dao.checkListCheckInsert(skillcheck);
		return result;
	}

	/**
	* @함수명 : checkedSelect (SkillCheckListDTO skillcheck)
	* @작성일 : 2018. 6. 21.
	* @작성자 : 최재욱
	* @설명 : 체크리스트의 체크여부를 DB 상에서 불러와 
	* 체크한 부분에 체크시켜주기 위한 함수 이다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<SkillCheckListDTO> checkedSelect (SkillCheckListDTO skillcheck){
		List<SkillCheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.checkedSelect(skillcheck);
		return list;
	}
	
	//체크여부 삭제
	public int checkedDelete (SkillCheckListDTO skillcheck) {
		int result = 0;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		result = dao.checkedDelete(skillcheck);
		return result;
	}
	/**
	* @함수명 : dataCheckListUserId (SkillCheckListDTO skillcheck)
	* @작성일 : 2018. 6. 20.
	* @작성자 : 최재욱
	* @설명 : 프로젝트의 리더이면 팀원이 작성한 사용자 체크리스트의 결과를
	* 확인 할 수 있는 탭에 th부분을 생성해 준다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<SkillCheckListDTO> dataCheckListUserId (SkillCheckListDTO skillcheck){
		List<SkillCheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.dataCheckListUserId(skillcheck);
		return list;
	}
	/**
	* @함수명 : selectCheckListConfirm (SkillCheckListDTO skillcheck)
	* @작성일 : 2018. 6. 21.
	* @작성자 : 최재욱
	* @설명 : 사용자 체크리스트의 체크여부를 DB 상에서 불러와 
	* 멤버가 체크한 부분에 체크시켜주기 위한 함수 이다.
	* @param SkillCheckListDTO check- SkillCheckListDTO 객체를 통해 원하는 값을 mapper로 넘기기 위한 변수
	**/
	public List<SkillCheckListDTO> selectCheckListConfirm (SkillCheckListDTO skillcheck){
		List<SkillCheckListDTO> list = null;
		SkillCheckListDAO dao = sqlSession.getMapper(SkillCheckListDAO.class);
		list = dao.selectCheckListConfirm(skillcheck);
		return list;
	}
}
