package site.corin2.user.dao;

import java.sql.SQLException;

import site.corin2.user.dto.UserDTO;


public interface UserDAO {

	//회원가입
	public int userInsert(UserDTO usesrdto) throws ClassNotFoundException, SQLException;
	
	//회원정보 얻기
	public UserDTO userSelect(String userid) throws ClassNotFoundException, SQLException;
	
	//회원정보 업데이트
	public int userUpdate(UserDTO userdto) throws ClassNotFoundException, SQLException;
	
	//회원정보 삭제
	public void userDelete(UserDTO userdto) throws ClassNotFoundException, SQLException;  
	
	//아이디 중복체크
	public int idCheck(String userid) throws ClassNotFoundException, SQLException;
	
	//이메일 인증 후
	public int userAuth(UserDTO userDTO) throws ClassNotFoundException, SQLException;

	public void repassword(UserDTO userDTO) throws ClassNotFoundException, SQLException;
}
