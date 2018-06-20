package site.corin2.user.dao;

import java.sql.SQLException;
import java.util.List;

import site.corin2.user.dto.UserDTO;


public interface UserDAO {

	//회원가입
	public int userInsert(UserDTO usesrdto) throws ClassNotFoundException, SQLException;
	
	//oauth 회원가입
	public int oauthInsert(UserDTO userdto) throws ClassNotFoundException, SQLException;

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

	//비밀번호 재설정 하기
	public void repassword(UserDTO userDTO) throws ClassNotFoundException, SQLException;

	//모든 유저 조회
	public List<UserDTO> allUserSelect();

	public void profileUpdate(UserDTO updateuser);
}
