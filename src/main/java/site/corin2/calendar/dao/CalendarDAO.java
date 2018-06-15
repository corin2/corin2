package site.corin2.calendar.dao;

import java.util.List;
import site.corin2.calendar.dto.CalendarDTO;

public interface CalendarDAO {
	//프로젝트 넘버로 전체일정 조회
		public List<CalendarDTO> calendarSelect(int projectNum);
}
