/**
    파일명: AdminMainDAO.java
    설   명: 관리자 메인 페이지 DAO
    작성일: 2018. 6. 21.
    작성자: 강 성 훈
*/

package site.corin2.user.dao;

import java.util.List;

import site.corin2.user.dto.CountByDateDTO;
import site.corin2.user.dto.DateParamDTO;
import site.corin2.user.dto.EmailCountDTO;
import site.corin2.user.dto.LanguageCountDTO;

public interface AdminMainDAO {
	/**
	    * @함수명 : allVisitCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 총 방문자 수
	*/
	public int allVisitCount();

	/**
	    * @함수명 : allUserCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 모든 회원 수
	*/
	public int allUserCount();
	
	/**
	    * @함수명 : allProjectCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 모든 프로젝트 수
	*/
	public int allProjectCount();
	
	/**
	    * @함수명 : allLanguageCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 프로젝트 언어별 수
	*/
	public List<LanguageCountDTO> allLanguageCount();
	
	/**
	    * @함수명 : allEmailCount
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : isDeleted = 0인 회원의 모든 이메일 수
	*/
	public List<EmailCountDTO> allEmailCount();
	
	/**
	    * @함수명 : visitCountByDate
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 방문자 수
	    * @param : DateParamDTO date
	*/
	public List<CountByDateDTO> visitCountByDate(DateParamDTO date);
	
	/**
	    * @함수명 : userCountByDate
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 회원 수
	    * @param : DateParamDTO date
	*/
	public List<CountByDateDTO> userCountByDate(DateParamDTO date);

	/**
	    * @함수명 : projectCountByDate
	    * @작성일 : 2018. 6. 21.
	    * @작성자 : 강 성 훈
	    * @설명 : 날짜별 프로젝트 수
	    * @param : DateParamDTO date
	*/
	public List<CountByDateDTO> projectCountByDate(DateParamDTO date);
	
}