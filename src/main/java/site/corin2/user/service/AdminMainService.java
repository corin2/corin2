/**
    파일명: AdminMainService.java
    설   명: 관리자 메인 페이지 Service
    작성일: 2018. 6. 21.
    작성자: 강 성 훈
*/

package site.corin2.user.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.user.dao.AdminMainDAO;
import site.corin2.user.dto.CountByDateDTO;
import site.corin2.user.dto.DateParamDTO;
import site.corin2.user.dto.EmailCountDTO;
import site.corin2.user.dto.LanguageCountDTO;

@Service
public class AdminMainService {

	@Autowired
	private SqlSession sqlsession;
	
	/**
	    * @함수명 : showCurrentChatUserProfile
	    * @작성일 : 2018. 6. 25.
	    * @작성자 : 강 성 훈
	    * @설명 : 총 방문자 수
	    * @return : int allVisitCountResult
	*/
	public int allVisitCount() {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		int allVisitCountResult = 0;
		try {
			allVisitCountResult = adminMainDAO.allVisitCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return allVisitCountResult;
	}

	/**
	    * @함수명 : allUserCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 모든 회원 수
	    * @return : int allUserCountResult
	*/
	public int allUserCount() {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		int allUserCountResult = 0;
		try {
			allUserCountResult = adminMainDAO.allUserCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return allUserCountResult;
	}
	
	/**
	    * @함수명 : allProjectCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 모든 프로젝트 수
	    * @return : int allProjectCountResult
	*/	
	public int allProjectCount() {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		int allProjectCountResult = 0;
		try {
			allProjectCountResult = adminMainDAO.allProjectCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return allProjectCountResult;
	}

	/**
	    * @함수명 : allLanguageCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 프로젝트 언어별 수
	    * @return : List<LanguageCountDTO> allLanguageCountResult
	*/
	public List<LanguageCountDTO> allLanguageCount() {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		List<LanguageCountDTO> allLanguageCountResult = null;
		try {
			allLanguageCountResult = adminMainDAO.allLanguageCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return allLanguageCountResult;
	}
	
	/**
	    * @함수명 : allEmailCount
	    * @작성일 : 2018. 6. 23.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 회원의 모든 이메일 수
	    * @return : List<EmailCountDTO> allEmailCountResult
	*/
	public List<EmailCountDTO> allEmailCount() {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		List<EmailCountDTO> allEmailCountResult = null;
		try {
			allEmailCountResult = adminMainDAO.allEmailCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return allEmailCountResult;
	}
	
	/**
	    * @함수명 : allEmailCount
	    * @작성일 : 2018. 6. 25.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 방문자 수
	    * @param : DateParamDTO date
	    * @return : List<CountByDateDTO> visitCountByDateResult
	*/
	public List<CountByDateDTO> visitCountByDate(DateParamDTO date) {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		List<CountByDateDTO> visitCountByDateResult = null;
		try {
			visitCountByDateResult = adminMainDAO.visitCountByDate(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return visitCountByDateResult;
	}
	
	/**
	    * @함수명 : userCountByDate
	    * @작성일 : 2018. 6. 25.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 회원 수
	    * @param : DateParamDTO date
	    * @return : List<CountByDateDTO> userCountByDateResult
	*/
	public List<CountByDateDTO> userCountByDate(DateParamDTO date) {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		List<CountByDateDTO> userCountByDateResult = null;
		try {
			userCountByDateResult = adminMainDAO.userCountByDate(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return userCountByDateResult;
	}
	
	/**
	    * @함수명 : projectCountByDate
	    * @작성일 : 2018. 6. 25.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 프로젝트 수
	    * @param : DateParamDTO date
	    * @return : List<CountByDateDTO> projectCountByDateResult
	*/
	public List<CountByDateDTO> projectCountByDate(DateParamDTO date) {
		AdminMainDAO adminMainDAO = sqlsession.getMapper(AdminMainDAO.class);
		List<CountByDateDTO> projectCountByDateResult = null;
		try {
			projectCountByDateResult = adminMainDAO.projectCountByDate(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return projectCountByDateResult;
	}
}