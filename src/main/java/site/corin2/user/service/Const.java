/**
    파일명: Const.java
    설   명: 권한
    작성일: 2018. 6. 12.
    작성자: 강 진 광
*/

package site.corin2.user.service;

public class Const {
	/**
	 * 사용자 등급
	 */
	public static final int USER_GRADE_ADMIN = 13; // 슈퍼
	public static final int USER_GRADE_USER = 1; // 일반
	public static final int USER_GRADE_CIRCLE = 9999; // 일반
	
	/**
	 * 로그인 관련
	 */
	public static final int LOGIN_SUCCESS					= 101; // 성공
	public static final int LOGIN_FAIL_MISMATCH				= 102; // 계정 or 비밀번호 불일치
	public static final int LOGIN_FAIL_DISABLED				= 103; // 계정 비활성화
	public static final int LOGIN_FAIL_ACCOUNT_EXPIRED		= 104; // 계정 만료
	public static final int LOGIN_FAIL_CREDENTIALS_EXPIRED	= 105; // 계정 권한 만료
	public static final int LOGIN_FAIL_LOCKED				= 106; // 계정 잠김
//	public static final int LOGIN_FAIL_INIT					= 107; // 계정 비밀번호 초기화
	public static final int LOGIN_FAIL_MISMATCH_PASSWORD	= 108; // 계정 비밀번호 불일치
	
	
	public static final int COMMON_SERVER_ERROR				= 9999;
}
