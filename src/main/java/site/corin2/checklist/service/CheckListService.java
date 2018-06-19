/**
    파일명: CheckListService.java
    설   명: 
    작성일: 2018. 6. 19.
    작성자: 최 재 욱
*/
package site.corin2.checklist.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.checklist.dao.CheckListDAO;
import site.corin2.checklist.dto.CheckListDTO;

@Service
public class CheckListService {

	@Autowired
	private SqlSession sqlSession;
	
	public int insertCheckList(CheckListDTO check) {
		System.out.println("들어왔니?/");
		int result = 0;
		CheckListDAO dao = sqlSession.getMapper(CheckListDAO.class);
		System.out.println("111111");
		result = dao.insertCheckList(check);
		System.out.println("22222");
		
		return result;
		
		
	}
}
