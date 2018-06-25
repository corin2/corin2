/**
    파일명: AdminMainDAO.java
    설   명: 관리자 메인 페이지 DAO
    작성일: 2018. 6. 21.
    작성자: 강 성 훈
*/

package site.corin2.user.dao;

public interface AdminMainDAO {
	// isDeleted = 0인 모든 회원 수
	public int allUserCount();
	
	// isDeleted = 0인 모든 프로젝트 수
	public int allProjectCount();
	
	// 날짜별 회원 수
	
	// 날짜별 프로젝트 수
	
	// 프로젝트 언어별 수
	
	// 회원 이메일별 수
	

}