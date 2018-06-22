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
	
	//회원가입 기능 실행
	@RequestMapping("signup")
	public View userInsert(UserDTO userdto) {
		//회원가입 처리 ... NewMemberDao
		System.out.println(userdto.toString());
		
		service.userInsert(userdto);
		return jsonview;
	}
	
	//email 인증 페이지
	@RequestMapping(value = "emailConfirm", method = RequestMethod.GET)
	public String emailConfirm(UserDTO userdto, String userid){ // 이메일인증
		System.out.println("controller" + userid);
		service.emailConfirm(userdto, userid);
		return "noTiles.user.emailconfirm.jsp";
	}
	
	//비밀번호 재설정 id확인
	@RequestMapping(value = "repass", method = RequestMethod.POST)
	public @ResponseBody String repass(@RequestBody String userid) {
		String check = service.repass(userid);
		return check;
	}	
	
	//비밀번호 재설정 email에서 modal 실행
	@RequestMapping(value="repassemail",method = RequestMethod.GET)
	public String repassemail(String userid) {
		System.out.println("111"+userid);
		return "noTiles.user.repassword.jsp";
	}	
	
	//비밀번호 재설정 기능 실행
	@RequestMapping("repassemailconfirm")
	public View repassemailconfirm(String result , String userId) {
		service.repassemailconfirm(result,userId);
		return jsonview;
	}
	
	//비밀번호 재설정 이메일 보내기
	@RequestMapping(value = "repassword", method = RequestMethod.POST)
	public View repassword(UserDTO userdto) {
		service.repassword(userdto);
		return jsonview;
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
	
	
	//회원 삭제하기
	@RequestMapping(value="userdelete" , method= {RequestMethod.POST,RequestMethod.GET})
	public View userDelete(UserDTO userdto ,Principal principal) throws ClassNotFoundException, SQLException {
		service.userDelete(principal.getName());
		return jsonview;
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
	
	//사용자 수정하기 비밀번호 변경
	@RequestMapping(value="userpassupdate", method=RequestMethod.POST)
	public View userpassUpdate(UserDTO userdto) {
		System.out.println(userdto.getPassword());
		service.userpassUpdate(userdto);
		return jsonview;
	}
	

	//사용자 수정하기 닉네임 변경
	@RequestMapping(value="usernickupdate", method=RequestMethod.POST)
	public View usernickUpdate(UserDTO userdto) {
		System.out.println(userdto.getPassword());
		service.usernickUpdate(userdto);
		return jsonview;
	}
	
	//프로필 수정하기
	@RequestMapping("profileimageupdate")
	public View profileupdate(@RequestParam("userId") String userid , MultipartHttpServletRequest request, Model model) {
		System.out.println("controller"+userid);
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