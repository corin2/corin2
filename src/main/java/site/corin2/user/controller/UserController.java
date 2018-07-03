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
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.catalina.security.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.google.api.Google;
import org.springframework.social.google.api.impl.GoogleTemplate;
import org.springframework.social.google.api.plus.Person;
import org.springframework.social.google.api.plus.PlusOperations;
import org.springframework.social.google.connect.GoogleConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import org.springframework.social.oauth2.GrantType;
import org.springframework.social.oauth2.OAuth2Operations;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.RedirectView;

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
	
	//login시 defalut page
    @RequestMapping(value = "/defaultpage")
	protected View welcome() {
		Set<String> roles = AuthorityUtils
				.authorityListToSet(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
		if (roles.contains("ROLE_ADMIN")) {
			return new RedirectView("adminMain");
		}
		System.out.println("roles"+roles);
		return new RedirectView("project");
	}
	
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
	public String kakaoLogin(@RequestParam("code") String code , HttpServletRequest request, HttpServletResponse response, HttpSession session, Model model) throws Exception{
		JsonNode token = KakaoLogin.getAccessToken(code);
		System.out.println("kakaocontroller");
		JsonNode profile = KakaoLogin.getKakaoUserInfo(token.path("access_token").toString());
		UserDTO userdto = KakaoLogin.changeData(profile);
		String check = service.idCheck(userdto.getUserId());
		System.out.println(userdto.getUserId());
		System.out.println(userdto.getPassword());
		if(check=="false") {
			  service.KakaoLogin(userdto);
		}
		userdto.setPassword("kakaologin");
		model.addAttribute("user", userdto);
		return "noTiles.user.oauthlogin.jsp";
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

	@RequestMapping("googleLogin")
	public String doGoogleSignInActionPage(HttpServletResponse response, Model model) throws Exception {
		String url = service.doGoogleSignInActionPage(response);
		model.addAttribute("url", url);
		return "noTiles.user.googlelogin.jsp";

	}

	@RequestMapping("googleSignInCallback")
	public String doSessionAssignActionPage(HttpServletRequest request) throws Exception {
		System.out.println("1111111111");
		UserDTO user = service.googleLogin(request);
		HttpSession session = request.getSession();
		session.setAttribute("user", user);
		return "noTiles.user.oauthlogin.jsp";
	}
}