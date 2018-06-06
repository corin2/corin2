package site.corin2.user.service;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.corin2.user.dao.UserDAO;
import site.corin2.user.dto.UserDTO;

@Service
public class MemberService {

	@Autowired
	private SqlSession sqlsession;
	
	public UserDTO userSelect(String userid){
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO userdto = null;
		try {
			userdto = userdao.userSelect(userid);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return userdto;
	}
	
	public void userUpdate(UserDTO userdto){
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		int result = 0;
		try {
			result = userdao.userUpdate(userdto);
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		} catch (SQLException e) {
		
			e.printStackTrace();
		}
		if(result > 0){
			System.out.println("업데이트 성공");
		}else{
			System.out.println("업데이트 실패");
		}
	}
}
