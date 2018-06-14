/**
    파일명: LoginDeniedHandler.java
    설   명: 로그인 권한 에러시 
    작성일: 2018. 6. 12.
    작성자: 강 진 광
*/

package site.corin2.user.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

public class LoginDeniedHandler implements AccessDeniedHandler{
	//권한 에러시 실행 되는 함수
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.sendRedirect(request.getContextPath() + "/accessDenied.do?error=" + accessDeniedException.getMessage() + "&url=" + request.getParameter("url"));
	}

}
