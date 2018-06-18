/**
    파일명: UserService.java
    설   명: user에 대한 service
    작성일: 2018. 6. 8.
    작성자: 강 진 광
*/
package site.corin2.user.service;

import java.security.Principal;
import java.sql.SQLException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.apache.ibatis.session.SqlSession;import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import site.corin2.user.dao.UserDAO;
import site.corin2.user.dto.UserDTO;

@Service
public class UserService {

	@Autowired
	private SqlSession sqlsession;
	
	@Autowired
	private JavaMailSender javamailsender;
	
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	//회원가입 기능 실행
	public String userInsert(UserDTO userdto) {
		int result = 0;
		String viewpage = "";
		try {
			UserDAO userdao = sqlsession.getMapper(UserDAO.class);
			//userdto.setPassword(this.bCryptPasswordEncoder.encode(userdto.getPassword()));
			userdto.setPassword(userdto.getPassword());
			result = userdao.userInsert(userdto);
			if (result > 0) {
				MimeMessage message = javamailsender.createMimeMessage();
				message.setSubject("corin2입니다.");
				message.setFrom(new InternetAddress("corin2site@gmail.com"));
				message.setText("<a href='http://localhost:8090/controller/emailConfirm?userid=" + userdto.getUserId()+("'>이메일 인증 확인</a>"),"utf-8", "html");
				message.addRecipient(RecipientType.TO,new InternetAddress(userdto.getUserId()));
				javamailsender.send(message);
				viewpage = "user.insertsuccess";
			} else {
				viewpage = "user.insertfail";
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return viewpage;
	}
	
	//email 인증 페이지
	public String emailConfirm(UserDTO userdto, String userid) {

		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO authuser;
		try {
			authuser = userdao.userSelect(userid);
			authuser.setEnabled(authuser.getEnabled());
			userdao.userAuth(authuser);
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return null;
	}

	//비밀번호 재설정 id확인
	public String repass(String userid) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		String [] useridsplit = userid.split("=");
		int result = 0;
		try {
			result = userdao.idCheck(useridsplit[0]);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		String check;
		if (result > 0) {
			check = "true";
		} else {
			check = "false";
		}
		
		return check;
	}

	//비밀번호 재설정 기능 실행
	public String repassword(UserDTO userdto) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO repassuser;
		String viewpage= null;
		try {
			String repassword = ""+(int)((Math.random()*100000)+1);
			repassuser = userdao.userSelect(userdto.getUserId());
			//updateuser.setPassword(bCryptPasswordEncoder.encode(userdto.getPassword()));
			repassuser.setPassword(repassword);
			userdao.repassword(repassuser);
			MimeMessage message = javamailsender.createMimeMessage();
			message.setSubject("corin2입니다.");
			message.setFrom(new InternetAddress("corin2site@gmail.com"));
			message.setText("새로운 비밀번호는 "+repassword+" 입니다.","utf-8", "html");
			message.addRecipient(RecipientType.TO,new InternetAddress(userdto.getUserId()));
			javamailsender.send(message);
			viewpage = "redirect:login.html";
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}	
		return viewpage;
	}

	//아이디 중복확인
	public String idCheck(String userid) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		
		String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";   
		
		String [] useridsplit = userid.split("=");
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(useridsplit[0]);
		boolean err = m.matches();
		int result = 0;
		try {
			result = userdao.idCheck(useridsplit[0]);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		String check;
		if (result > 0 || err == false ) {
			check = "true";
		} else {
			check = "false";
		}
		return check;
	}
	
	//비밀번호 비동기 유효성 확인
	public String passwordCheck(String password) {
		String regex = "^[a-zA-Z0-9]{3,10}$";
		String [] useridsplit = password.split("=");
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(useridsplit[0]);
		boolean err = m.matches();
		String check;
		if (err == false ) {
			check = "true";
		} else {
			check = "false";
		}
		return check;
	}
	
	//닉네임 비동기 유효성 확인
	public String nickCheck(String nickname) {
		String regex = "^[a-zA-Z0-9가-힣]{3,10}$";
		String [] useridsplit = nickname.split("=");
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(useridsplit[0]);
		boolean err = m.matches();
		String check;
		if (err == false ) {
			check = "true";
		} else {
			check = "false";
		}
		return check;
	}
	
	//사용자 수정하기 페이지 이동
	public UserDTO userUpdate(String userId) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO userdto = null;
		try {
			userdto = userdao.userSelect(userId);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return userdto;
	}
	
	//사용자 수정하기 기능 실행
	public void userUpdate(UserDTO userdto) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO updateuser;
		try {
			updateuser = userdao.userSelect(userdto.getUserId());
			updateuser.setUserName(userdto.getUserName());
			updateuser.setPassword(userdto.getPassword());
			updateuser.setUserProfile(userdto.getUserProfile());
			updateuser.setGradeNum(userdto.getGradeNum());
			userdao.userUpdate(updateuser);
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	//회원 삭제하기
	public void userDelete(String userId) {

		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO deleteuser;
		try {
			deleteuser = userdao.userSelect(userId);
			deleteuser.setIsDeleted(deleteuser.getIsDeleted());
			deleteuser.setEnabled(deleteuser.getEnabled());
			userdao.userDelete(deleteuser);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

	//kakao login
	public UserDTO KakaoLogin(UserDTO userdto) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		int result = 0;
		String viewpage = "";
		try {
			userdto.setPassword("kakaologin");
			userdto.setUserProfile(userdto.getUserProfile());
			userdto.setEnabled(1);
			result = userdao.oauthinsert(userdto);
			if (result > 0) {
				viewpage = "user.content";
			} else {
				viewpage = "login.html";
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//모든 유저 조회
	public List<UserDTO> allUserSelect(){
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		List<UserDTO> users = null;
		try {
			users = userdao.allUserSelect();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return users;
	}
}