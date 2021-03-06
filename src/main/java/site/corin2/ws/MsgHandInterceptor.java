/**
    파일명: KanbanHandInterceptor.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 김 진 원
*/

package site.corin2.ws;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

public class MsgHandInterceptor extends HttpSessionHandshakeInterceptor{

	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		ServletServerHttpRequest ssreq = (ServletServerHttpRequest) request;
		HttpServletRequest req = ssreq.getServletRequest();
		attributes.put("userId", req.getParameter("userId")); // 아이디 전송 (사이드바에서 사용)
		return super.beforeHandshake(request, response, wsHandler, attributes);
	}
	
}
