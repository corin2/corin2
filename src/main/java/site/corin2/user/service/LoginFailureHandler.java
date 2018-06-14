/**
    파일명: LoginFailerHandler.java
    설   명: 로그인 실패 (비밀번호, 아이디 안맞을 때)
    작성일: 2018. 6. 12.
    작성자: 강 진 광
*/

package site.corin2.user.service;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.security.auth.login.AccountExpiredException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class LoginFailureHandler implements AuthenticationFailureHandler{
	private static final Logger logger = LoggerFactory.getLogger(LoginFailureHandler.class);
	//로그인 실패시 실행되어 어떤 이유로 실행되었는지 param 보내줌
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException auth) throws IOException, ServletException {
		String userId = request.getParameter("userId");
		logger.info("-> [Login Failure!(userId = {})]", userId);
		int cause = Const.COMMON_SERVER_ERROR;
		
		if (auth.getClass().equals(BadCredentialsException.class)) { //아이디 비밀번호 틀림 108
			cause = Const.LOGIN_FAIL_MISMATCH_PASSWORD;
		}
		else if (auth.getClass().equals(AuthenticationServiceException.class)) // 계정 없음
			cause = Const.LOGIN_FAIL_MISMATCH;
		else if (auth.getClass().equals(DisabledException.class)) // 계정 Disable 103
			cause = Const.LOGIN_FAIL_DISABLED;
		else if (auth.getClass().equals(AccountExpiredException.class)) // 계정 만료
			cause = Const.LOGIN_FAIL_ACCOUNT_EXPIRED;
		else if (auth.getClass().equals(CredentialsExpiredException.class)) // 계정 권한 만료
			cause = Const.LOGIN_FAIL_CREDENTIALS_EXPIRED;
		else if (auth.getClass().equals(LockedException.class)) // 계정 잠김
			cause = Const.LOGIN_FAIL_LOCKED;
		
		logger.info("<- [redirect = {}] [cause = {}]", "login.html", cause);
		
		request.getSession(true).setAttribute("userId", userId);
		response.sendRedirect("login.html?error=" + cause);
	}
}
