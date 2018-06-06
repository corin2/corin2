package site.corin2.user.controller;

import java.security.Principal;
import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
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


@Controller
@RequestMapping("/joinus/")
public class UserController {
	@Autowired
	private SqlSession sqlsession;
	
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@RequestMapping(value="join.htm",method=RequestMethod.GET)
	public String join() {
		return "joinus.join";
	}
	@RequestMapping(value="join.htm",method=RequestMethod.POST)
	public String join(UserDTO userdto) {
		//회원가입 처리 ... NewMemberDao
		int result = 0;
		String viewpage = "";
		System.out.println(userdto.toString());
		try {
			UserDAO userdao = sqlsession.getMapper(UserDAO.class);
			userdao.setPwd(this.bCryptPasswordEncoder.encode(userdto.getPassword()));
			result = userdao.insert(userdto);
			if (result > 0) {
				System.out.println("삽입 성공");
				viewpage = "redirect:/index.htm";
			} else {
				System.out.println("삽입 실패");
				viewpage = "join.htm";
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return viewpage;
	}
	//로그인 페이지
	@RequestMapping(value="login.htm",method=RequestMethod.GET)
	public String login() {
		System.out.println("login");
		//return "login.jsp";
		return "joinus.login";//폴더명.파일명
	}
	
	@RequestMapping(value="memberupdate.htm" , method=RequestMethod.GET)
	public String updateview(Model model  , Principal principal) throws ClassNotFoundException, SQLException {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO member = userdao.userSelect(principal.getName());
		model.addAttribute("member", member);
		return "joinus.memberupdate";
	}
	@RequestMapping(value="memberupdate.htm", method=RequestMethod.POST)
	public String userUpdate(UserDTO userdto , Model model , Principal principal) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		//System.out.println("1");
		UserDTO updateuser;
		try {
			updateuser = userdao.userSelect(principal.getName());
		//System.out.println("2");
			updateuser.setUserName(userdto.getUserName());
		//System.out.println("3");
			updateuser.setPassword(bCryptPasswordEncoder.encode(userdto.getPassword()));
		//System.out.println("4");
			updateuser.setUserprofile(userdto.getUserprofile());
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
	
	@RequestMapping(value = "idcheck.htm", method = RequestMethod.POST)
	public @ResponseBody String idCheck(@RequestBody String userid) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		String [] useridsplit = userid.split("=");
		System.out.println(useridsplit[0]);
		int result = userdao.idCheck(useridsplit[0]);
		String check;
		System.out.println(result);
		if (result > 0) {
			System.out.println("아이디 중복");
			check = "true";
		} else {
			System.out.println("삽입 실패");
			check = "false";
		}
		return check;
	}
}