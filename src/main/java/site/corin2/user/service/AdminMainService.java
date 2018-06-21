/**
    파일명: AdminMainService.java
    설   명: 관리자 메인 페이지 Service
    작성일: 2018. 6. 21.
    작성자: 강 성 훈
*/

package site.corin2.user.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.user.dao.AdminMainDAO;

@Service
public class AdminMainService {

	@Autowired
	private SqlSession sqlsession;
	
	// isDeleted = 0인 모든 회원 수
	public int allUserCount(){
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		int allUserCountResult = 0;
		try {
			allUserCountResult = adminMainDAO.allUserCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return allUserCountResult;
	}
	
	// isDeleted = 0인 모든 프로젝트 수
		public int allProjectCount(){
			AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
			int allProjectCountResult = 0;
			try {
				allProjectCountResult = adminMainDAO.allProjectCount();
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return allProjectCountResult;
		}
}