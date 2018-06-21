/**
    파일명: UserController.java
    설   명: user에 대한 controller
    작성일: 2018. 6. 8.
    작성자: 강 진 광
*/
package site.corin2.user.controller;

import java.security.Principal;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.View;

import site.corin2.board.dto.FileMeta;
import site.corin2.user.dto.UserDTO;
import site.corin2.user.service.KakaoLogin;
import site.corin2.user.service.UserService;

import com.fasterxml.jackson.databind.JsonNode;

@Controller
public class UserController {
	@Autowired
	private View jsonview;
	
	@Autowired
	private UserService service;
	
	//회원가입 페이지이동
	@RequestMapping(value="signup",method=RequestMethod.GET)
	public String userInsert() {
		return "user.signup";
	}
	
	//회원가입 기능 실행
	@RequestMapping(value="signup",method=RequestMethod.POST)
	public String userInsert(UserDTO userdto) {
		//회원가입 처리 ... NewMemberDao
		String viewpage = service.userInsert(userdto,null);
		return viewpage;
	}
	
	//email 인증 페이지
	@RequestMapping(value = "emailConfirm", method = RequestMethod.GET)
	public String emailConfirm(UserDTO userdto, String userid){ // 이메일인증
		service.emailConfirm(userdto, userid);
		return "user.emailconfirm";
	}
	
	//비밀번호 재설정 id확인
	@RequestMapping(value = "repass", method = RequestMethod.POST)
	public @ResponseBody String repass(@RequestBody String userid) {
		String check = service.repass(userid);
		return check;
	}	
	
	//비밀번호 재설정 기능 실행
	@RequestMapping(value = "repassword", method = RequestMethod.POST)
	public String repassword(UserDTO userdto) {
		String viewpage = service.repassword(userdto);
		return viewpage;
	}	
	
	//아이디 중복확인
	@RequestMapping(value = "idcheck", method = RequestMethod.POST)
	public @ResponseBody String idCheck(@RequestBody String userid) {
		String check = service.idCheck(userid);
		return check;
	}
	
	//비밀번호 비동기 유효성 확인
	@RequestMapping(value = "passwordcheck", method = RequestMethod.POST)
	public @ResponseBody String passwordCheck(@RequestBody String password) {
		String check = service.passwordCheck(password);
		return check;
	}
	
	//닉네임 비동기 유효성 확인
	@RequestMapping(value = "nickcheck", method = RequestMethod.POST)
	public @ResponseBody String nickCheck(@RequestBody String nickname) {
		String check = service.nickCheck(nickname);
		return check;
	}
	
	//사용자 수정하기 페이지 이동
	@RequestMapping(value="userprofile" , method=RequestMethod.GET)
	public String userUpdate(Model model  , Principal principal) throws ClassNotFoundException, SQLException {
		UserDTO userdto = service.userUpdate(principal.getName());
		model.addAttribute("userdto", userdto);
		return "user.profile";
	}
	
	//프로필 올리기
	@RequestMapping(value="userProfile", method=RequestMethod.POST)
	public String userProfile(MultipartHttpServletRequest request) {
		System.out.println(request.getFileNames());
		service.userProfile(request);
		return "project.project";
	}
	//사용자 수정하기 기능 실행
	@RequestMapping(value="userupdate", method=RequestMethod.POST)
	public String userUpdate(UserDTO userdto) {
		System.out.println(userdto.getPassword());
		service.userUpdate(userdto);
		return "project.project";
	}
	
	//회원 삭제하기
	@RequestMapping(value="userdelete" , method= {RequestMethod.POST,RequestMethod.GET})
	public String userDelete(UserDTO userdto ,Principal principal) throws ClassNotFoundException, SQLException {
		service.userDelete(principal.getName());
		return "login.html";
	}
	
	//kakao Oauth
	@RequestMapping(value = "kakaologin" , produces = "application/json", method = {RequestMethod.GET, RequestMethod.POST})
	public String kakaoLogin(@RequestParam("code") String code , HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception{
	  JsonNode token = KakaoLogin.getAccessToken(code);

	  JsonNode profile = KakaoLogin.getKakaoUserInfo(token.path("access_token").toString());
	  UserDTO userdto = KakaoLogin.changeData(profile);
	  String check = service.idCheck(userdto.getUserId());
	  if(check=="false") {
		  service.KakaoLogin(userdto);
	  }
	  return "user.content";
	}
	
	//모든 유저 정보
	@RequestMapping(value="allUser" , method=RequestMethod.GET)
	public View allUser(Model model) {
		List<UserDTO> users = service.allUserSelect();
		model.addAttribute("data", users);
		return jsonview;
	}
		
	//특정 유저 정보
	@RequestMapping("/showUser")
	public View showUser(@RequestParam("userId") String userid, Model model) {
		UserDTO user = service.oneUserSelect(userid);
		model.addAttribute("data", user);
		return jsonview;
	}
	
	//프로필 수정하기
	@RequestMapping("profileupdate")
	public View profileupdate(@RequestParam("userId") String userid , MultipartHttpServletRequest request, HttpServletResponse response, Model model) {
		System.out.println("111"+userid);
		LinkedList<FileMeta> files = service.profileupdate(userid,request);
		model.addAttribute("data", files);
		return jsonview;
	}
	
	//ex페이지
	@RequestMapping(value="content",method=RequestMethod.GET)
	public String content() {
		return "user.content";
	}
	
	@RequestMapping(value="content",method=RequestMethod.POST)
	public String content2() {
		return "user.content";
	}
	
	@RequestMapping(value="admin",method=RequestMethod.GET)
	public String admin() {
		return "user.admin";
	}
	
	@RequestMapping(value="admin",method=RequestMethod.POST)
	public String admin2() {
		return "user.admin";
	}
	
	//회원 삭제하기
	@RequestMapping(value="userDel" , method= {RequestMethod.POST,RequestMethod.GET})
	public String userDel(UserDTO userdto) throws ClassNotFoundException, SQLException {
		service.userDelete(userdto.getUserId());
		return "login.html";
	}
		
}