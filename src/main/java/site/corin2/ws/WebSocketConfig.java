/**
    파일명: WebSocketConfig.java
    설   명: setAllowedOrigins를 위한 Config
    작성일: 2018. 6. 27.
    작성자: 강 성 훈
*/

package site.corin2.ws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		//TODO 테스트 이후"*" -> "corin.site"로 변경
		registry.addHandler(kanbanHandler(), "/kanbanWebSocket").setAllowedOrigins("*");
		registry.addHandler(msgHandler(), "/msgWebSocket").setAllowedOrigins("*");
		registry.addHandler(headerHandler(), "/headerWebSocket").setAllowedOrigins("*");
	}
	
	@Bean
	public WebSocketHandler kanbanHandler() {
		return new KanbanHandler();
	}
	
	@Bean
	public WebSocketHandler msgHandler() {
		return new MsgHandler();
	}
	
	@Bean
	public WebSocketHandler headerHandler() {
		return new HeaderHandler();
	}

}
