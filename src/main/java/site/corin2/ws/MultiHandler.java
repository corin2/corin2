/**
    파일명: KanbanHandler.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 김 진 원
*/

package site.corin2.ws;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class MultiHandler extends TextWebSocketHandler {
	private Map<String, HashMap<String, WebSocketSession>> usermap = new HashMap<>();
	
	@Override
	public void afterConnectionEstablished(
			WebSocketSession session) throws Exception {
		String projectNum = getProjectNum(session);
		if(usermap.containsKey(projectNum)) {
			usermap.get(projectNum).put(session.getId(), session);
		} else {
			Map<String, WebSocketSession> list = new HashMap<String, WebSocketSession>();
			list.put(session.getId(), session);
			usermap.put(projectNum, (HashMap<String, WebSocketSession>) list);
		}
		
	}

	@Override
	public void afterConnectionClosed(
			WebSocketSession session, CloseStatus status) throws Exception {
		String projectNum = getProjectNum(session);
		usermap.get(projectNum).remove(session.getId());
		session.close();
	}

	@Override
	protected void handleTextMessage(
			WebSocketSession session, TextMessage message) throws Exception {
		String projectNum = getProjectNum(session);
		for (Map.Entry m : usermap.get(projectNum).entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue();
			sess.sendMessage(message);
		}
	}
	
	public String getProjectNum(WebSocketSession session) {
		Map<String, Object> map = session.getAttributes();
		return (String) map.get("projectNum");
	}
}
