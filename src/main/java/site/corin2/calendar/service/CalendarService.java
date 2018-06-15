package site.corin2.calendar.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.calendar.dao.CalendarDAO;
import site.corin2.calendar.dto.CalendarDTO;
import site.corin2.kanban.dao.KanbanDAO;
import site.corin2.kanban.dto.CardDTO;

@Service
public class CalendarService {
	@Autowired
	private SqlSession sqlSession;
	
	public void CalendarView() {
		
	}

	public List<CalendarDTO> calendarSelect(int projectNum) {
		CalendarDAO calendarDAO = sqlSession.getMapper(CalendarDAO.class);
		List<CalendarDTO> calendars = null;
		try {
			calendars = (ArrayList<CalendarDTO>)calendarDAO.calendarSelect(projectNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return calendars;
	}
}
