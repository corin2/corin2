/**
    파일명: KanbanController.java
    설   명: 
    작성일: 2018. 6. 5.
    작성자: 최 재 욱
*/
package site.corin2.kanban.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class KanbanController {
	
	@RequestMapping("/kanban")
	public String newFile() {
		return "kanban";
	}
}
