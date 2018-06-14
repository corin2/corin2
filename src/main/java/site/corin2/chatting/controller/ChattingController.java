/**
    파일명: ChattingController.java
    설   명: 채팅 컨트롤러
    작성일: 2018. 6. 14.
    작성자: 강 성 훈
*/
package site.corin2.chatting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ChattingController {
	
	//채팅 기능 맵핑
	@RequestMapping("/chatting")
	public String chatting() {
		return "chatting.chatting";
	}
}

