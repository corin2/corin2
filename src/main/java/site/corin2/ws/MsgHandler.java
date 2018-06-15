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

public class MsgHandler extends TextWebSocketHandler {
	private Map<String, HashMap<String, WebSocketSession>> usermap = new HashMap<>();
	
	@Override
	public void afterConnectionEstablished(
			WebSocketSession session) throws Exception {
		String userId = getUserId(session);
		if(usermap.containsKey(userId)) {
			usermap.get(userId).put(session.getId(), session);
		} else {
			Map<String, WebSocketSession> list = new HashMap<String, WebSocketSession>();
			list.put(session.getId(), session);
			usermap.put(userId, (HashMap<String, WebSocketSession>) list);
		}
		
	}

	@Override
	public void afterConnectionClosed(
			WebSocketSession session, CloseStatus status) throws Exception {
		String userId = getUserId(session);
		usermap.get(userId).remove(session.getId());
		session.close();
	}

	@Override
	protected void handleTextMessage(
			WebSocketSession session, TextMessage message) throws Exception {
		for (Map.Entry m : usermap.get(message.getPayload()).entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue();
			sess.sendMessage(message);
		}
	}
	
	public String getUserId(WebSocketSession session) {
		Map<String, Object> map = session.getAttributes();
		
		return (String) map.get("userId");
	}
	
}
