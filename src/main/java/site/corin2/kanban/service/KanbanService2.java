/**
    파일명: KanbanService.java
    설   명: 
    작성일: 2018. 6. 5.
    작성자: 김 진 원
*/

package site.corin2.kanban.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.kanban.dao.KanbanDAO;
import site.corin2.kanban.dto.CardDTO;
import site.corin2.kanban.dto.ListDTO;

@Service
public class KanbanService2 {
	
	@Autowired
	private SqlSession sqlsession;
	
	public List<ListDTO> listAllSelect(){
		KanbanDAO kanbanDAO = sqlsession.getMapper(KanbanDAO.class);
		List<ListDTO> lists = null;
		try {
			lists = (ArrayList<ListDTO>)kanbanDAO.listAllSelect();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return lists;
	}
	
	public List<CardDTO> cardAllSelect(int projectNum){
		KanbanDAO kanbanDAO = sqlsession.getMapper(KanbanDAO.class);
		List<CardDTO> cards = null;
		try {
			cards = (ArrayList<CardDTO>)kanbanDAO.cardAllSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return cards;
	}
}
