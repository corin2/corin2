package site.corin2.user.controller;

import java.security.Principal;
import java.sql.SQLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import site.corin2.user.dao.UserDAO;
import site.corin2.user.dto.UserDTO;
import site.corin2.user.service.UserService;


@Controller
public class UserController {
	@Autowired
	private View jsonview;
	
	@Autowired
	private UserService service;
	
	@Autowired
	private JavaMailSender javamailsender;
	
	@Autowired
	private SqlSession sqlsession;
	
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@RequestMapping(value="signup",method=RequestMethod.GET)
	public String userInsert() {
		return "signup";
	}
	@RequestMapping(value="signup",method=RequestMethod.POST)
	public String userInsert(UserDTO userdto) {
		//회원가입 처리 ... NewMemberDao
		int result = 0;
		String viewpage = "";
		System.out.println(userdto.toString());
		try {
			UserDAO userdao = sqlsession.getMapper(UserDAO.class);
			//userdto.setPassword(this.bCryptPasswordEncoder.encode(userdto.getPassword()));
			userdto.setPassword(userdto.getPassword());
			System.out.println("1111");
			result = userdao.userInsert(userdto);
			System.out.println("2222");
			if (result > 0) {
				System.out.println("삽입 성공");
				MimeMessage message = javamailsender.createMimeMessage();
				message.setSubject("corin2입니다.");
				message.setFrom(new InternetAddress("corin2site@gmail.com"));
				message.setText("<a href='http://localhost:8090/controller/emailConfirm?userid=" + userdto.getUserId()+("'>이메일 인증 확인</a>"),"utf-8", "html");
				message.addRecipient(RecipientType.TO,new InternetAddress(userdto.getUserId()));
				javamailsender.send(message);
				viewpage = "redirect:index.htm";
			} else {
				System.out.println("삽입 실패");
				viewpage = "signup";
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return viewpage;
	}
	//email confirm
	@RequestMapping(value = "emailConfirm", method = RequestMethod.GET)
	public String emailConfirm(UserDTO userdto, String userid) throws Exception { // 이메일인증
		
		System.out.println("mailconfirm 탔당");
		System.out.println(userid);
		System.out.println(userdto);
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO authuser;
		authuser = userdao.userSelect(userid);
		authuser.setEnabled(authuser.getEnabled());
		userdao.userAuth(authuser);

		return "login";
	}
	//아이디 중복확인
	@RequestMapping(value = "idcheck", method = RequestMethod.POST)
	public @ResponseBody String idCheck(@RequestBody String userid) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		
		
		String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";   
		
		String [] useridsplit = userid.split("=");
		System.out.println(useridsplit[0]);
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
		System.out.println(result);
		if (result > 0 || err == false ) {
			System.out.println("아이디 중복");
			check = "true";
		} else {
			System.out.println("노 중복");
			check = "false";
		}
		
		
		return check;
	}
	
	@RequestMapping(value = "passwordcheck", method = RequestMethod.POST)
	public @ResponseBody String passwordCheck(@RequestBody String password) {
		String regex = "^[a-zA-Z0-9]{3,10}$";
		String [] useridsplit = password.split("=");
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(useridsplit[0]);
		boolean err = m.matches();
		String check;
		if (err == false ) {
			System.out.println("비밀번호 글자 수");
			check = "true";
		} else {
			System.out.println("비밀번호 ok");
			check = "false";
		}
		return check;
	}
	
	@RequestMapping(value = "nickcheck", method = RequestMethod.POST)
	public @ResponseBody String nickCheck(@RequestBody String nickname) {
		String regex = "^[a-zA-Z0-9]{3,10}$";
		String [] useridsplit = nickname.split("=");
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(useridsplit[0]);
		boolean err = m.matches();
		String check;
		if (err == false ) {
			System.out.println("닉네임 글자 수");
			check = "true";
		} else {
			System.out.println("닉네임 ok");
			check = "false";
		}
		return check;
	}
	
	//로그인 페이지
	@RequestMapping(value="login",method=RequestMethod.GET)
	public String login() {
		System.out.println("login");
		//return "login.jsp";
		return "login";//폴더명.파일명
	}
	
	@RequestMapping(value="userupdate" , method=RequestMethod.GET)
	public String userUpdate(Model model  , Principal principal) throws ClassNotFoundException, SQLException {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO userdto = userdao.userSelect(principal.getName());
		System.out.println("update controller GET");
		model.addAttribute("userdto", userdto);
		return "update";
	}
	@RequestMapping(value="userupdate", method=RequestMethod.POST)
	public String userUpdate(UserDTO userdto , Model model , Principal principal) {
		System.out.println("update controller POST");
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		//System.out.println("1");
		UserDTO updateuser;
		try {
			updateuser = userdao.userSelect(principal.getName());
		//System.out.println("2");
			updateuser.setUserName(userdto.getUserName());
		//System.out.println("3");
			//updateuser.setPassword(bCryptPasswordEncoder.encode(userdto.getPassword()));
			updateuser.setPassword(userdto.getPassword());
		//System.out.println("4");
			updateuser.setUserProfile(userdto.getUserProfile());
		//System.out.println("5");
			updateuser.setGradeNum(userdto.getGradeNum());
		//System.out.println("6");
			userdao.userUpdate(updateuser);
		//System.out.println("7");
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return "redirect:/index.htm";
	}
	
	@RequestMapping(value="userdelete" , method=RequestMethod.POST)
	public String userDelete(UserDTO userdto ,Principal principal) throws ClassNotFoundException, SQLException {
		System.out.println("delete controller POST");
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO deleteuser;
		deleteuser = userdao.userSelect(principal.getName());
		deleteuser.setIsDeleted(userdto.getIsDeleted());
		deleteuser.setEnabled(userdto.getEnabled());
		
		userdao.userDelete(deleteuser);
		
		return "login";
	}
	
	@RequestMapping(value="content",method=RequestMethod.GET)
	public String content() {
		return "content";
	}
	@RequestMapping(value="content",method=RequestMethod.POST)
	public String content2() {
		return "content";
	}
	@RequestMapping(value="admin",method=RequestMethod.GET)
	public String admin() {
		return "admin";
	}
	@RequestMapping(value="admin",method=RequestMethod.POST)
	public String admin2() {
		return "admin";
	}
	
}