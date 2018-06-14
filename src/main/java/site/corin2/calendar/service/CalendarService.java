package site.corin2.calendar.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalendarService {
	@Autowired
	private SqlSession sqlSession;
	
	public void CalendarView() {
		
	}
}
