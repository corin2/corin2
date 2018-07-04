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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
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
import site.corin2.user.service.UserService;

import com.fasterxml.jackson.databind.JsonNode;

@Controller
public class UserController {
	@Autowired
	private View jsonview;
	
	@Autowired
	private UserService service;
	
	/**
     * @함수명 : welcome
     * @작성일 : 2018. 6. 18.
     * @작성자 : 강진광
     * @설명 : 사용자가 로그인을 하였을 때 admin과 user를 판별하여 default로 보여지는 페이지를 RedirectView로 다르게 해주는 함수입니다.
     * @return : RedirectView 
    **/
    @RequestMapping(value = "/defaultpage")
	protected View welcome() {
		Set<String> roles = AuthorityUtils
				.authorityListToSet(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
		if (roles.contains("ROLE_ADMIN")) {
			return new RedirectView("adminMain");
		}
		return new RedirectView("project");
	}
	
    /**
     * @함수명 : userInsert
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : user가 회원가입을 실행할 때 userService의 userInsert로 보내주는 함수입니다. 결과가 온전히 실행된다면 요청을 실행한 페이지로 jsonview를 보내줍니다.
     * @param : userID , password , userName
     * @return : jsonview 
    **/
	@RequestMapping("signup")
	public View userInsert(UserDTO userdto) {
		//회원가입 처리 ... NewMemberDao
		service.userInsert(userdto);
		return jsonview;
	}
	
	/**
     * @함수명 : emailConfirm
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : 이메일 인증 시에 userid와 userdto를 emailConfirm Service로 보내주는 함수입니다. 
     * @param : userdto , userID
     * @return : noTiles.user.emailconfirm.jsp
    **/
	@RequestMapping(value = "emailConfirm", method = RequestMethod.GET)
	public String emailConfirm(UserDTO userdto, String userid){ // 이메일인증
		service.emailConfirm(userdto, userid);
		return "noTiles.user.emailconfirm.jsp";
	}

	/**
     * @함수명 : repass
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : 비밀번호 재설정 시에 userid를 repass Service로 보내주는 함수입니다. 
     * @param : userID
     * @return : check ( true , false )
    **/
	@RequestMapping(value = "repass", method = RequestMethod.POST)
	public @ResponseBody String repass(@RequestBody String userid) {
		String check = service.repass(userid);
		return check;
	}	
	
	/**
     * @함수명 : repassemail
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : 비밀번호 재설정 시에 이메일로 온 링크를 눌렀을 때 repassword.jsp로 보내주는 함수입니다.
     * @param : userID
     * @return : noTiles.user.repassword.jsp
    **/
	@RequestMapping(value="repassemail",method = RequestMethod.GET)
	public String repassemail(String userid) {
		return "noTiles.user.repassword.jsp";
	}	
	
	/**
     * @함수명 : repassemailconfirm
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : repassword.jsp에서 비밀변호 변경을 하였을 떄 실행되는 함수로 result와 userid를 받아 userService로 보내는 함수입니다.
     * @param : result , userID
     * @return : jsonview
    **/
	@RequestMapping("repassemailconfirm")
	public View repassemailconfirm(String result , String userId) {
		service.repassemailconfirm(result,userId);
		return jsonview;
	}
	
	/**
     * @함수명 : repassword
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : login페이지에서 비밀번호 변경에 이메일을 입력한뒤 재설정하기 버튼을 눌렀을 때 실행되는 함수로 result와 userid를 받아 userService로 보내는 함수입니다.
     * @param : userdto(userID)
     * @return : jsonview
    **/
	@RequestMapping(value = "repassword", method = RequestMethod.POST)
	public View repassword(UserDTO userdto) {
		service.repassword(userdto);
		return jsonview;
	}	
	
	/**
     * @함수명 : idCheck
     * @작성일 : 2018. 6. 6.
     * @작성자 : 강진광
     * @설명 : 입력한 id의 값을 UserService의 idCheck로 보내주는 함수입니다.
     * @param : userid
     * @return : check ( true , false )
    **/
	@RequestMapping(value = "idcheck", method = RequestMethod.POST)
	public @ResponseBody String idCheck(@RequestBody String userid) {
		String check = service.idCheck(userid);
		return check;
	}
	
	/**
     * @함수명 : passwordCheck
     * @작성일 : 2018. 6. 6.
     * @작성자 : 강진광
     * @설명 : 입력한 password의 값을 UserService의 passwordCheck로 보내주는 함수입니다.
     * @param : password
     * @return : check ( true , false )
    **/
	@RequestMapping(value = "passwordcheck", method = RequestMethod.POST)
	public @ResponseBody String passwordCheck(@RequestBody String password) {
		String check = service.passwordCheck(password);
		return check;
	}
	
	/**
     * @함수명 : nickCheck
     * @작성일 : 2018. 6. 6.
     * @작성자 : 강진광
     * @설명 : 입력한 nickname의 값을 UserService의 nickCheck로 보내주는 함수입니다.
     * @param : nickname
     * @return : check ( true , false )
    **/
	@RequestMapping(value = "nickcheck", method = RequestMethod.POST)
	public @ResponseBody String nickCheck(@RequestBody String nickname) {
		String check = service.nickCheck(nickname);
		return check;
	}
	
	/**
     * @함수명 : userDelete
     * @작성일 : 2018. 6. 8.
     * @작성자 : 강진광
     * @설명 : principal id값을 UserService의 userDelete로 보내주는 함수입니다.
     * @param : userdto , principal
     * @return : jsonview
    **/
	@RequestMapping(value="userdelete" , method= {RequestMethod.POST,RequestMethod.GET})
	public View userDelete(UserDTO userdto ,Principal principal) throws ClassNotFoundException, SQLException {
		service.userDelete(principal.getName());
		return jsonview;
	}
	
	/**
     * @함수명 : kakaoLogin
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : kakao oauth login을 하였을 때 각각의 service로 보내주고 마지막으로 oauthlogin.jsp로 페이지를 이동시키는 함수입니다.
     * @param : code , request , response , session , model 
     * @return : noTiles.user.oauthlogin.jsp
    **/
	@RequestMapping(value = "kakaologin" , produces = "application/json", method = {RequestMethod.GET, RequestMethod.POST})
	public String kakaoLogin(@RequestParam("code") String code , HttpServletRequest request, HttpServletResponse response, HttpSession session, Model model) throws Exception{
		JsonNode token = service.getAccessToken(code);
		JsonNode profile = service.getKakaoUserInfo(token.path("access_token").toString());
		UserDTO userdto = service.changeData(profile);
		String check = service.idCheck(userdto.getUserId());
		if(check=="false") {
			  service.KakaoLogin(userdto);
		}
		userdto.setPassword("kakaologin");
		model.addAttribute("user", userdto);
		return "noTiles.user.oauthlogin.jsp";
	}
	
	/**
     * @함수명 : allUser
     * @작성일 : 2018. 6. 8.
     * @작성자 : 강진광
     * @설명 : service에서 넘어온 값을 modal에 넣어 요청한 페이지로 넘기는 함수입니다.
     * @param : model
     * @return : jsonview
    **/
	@RequestMapping(value="allUser" , method=RequestMethod.GET)
	public View allUser(Model model) {
		List<UserDTO> users = service.allUserSelect();
		model.addAttribute("data", users);
		return jsonview;
	}
		
	/**
     * @함수명 : showUser
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : 넘어온 userid를 UserService의 oneUserSelect함수로 보내주고 return값을 받아서 model에 담고 요청한 페이지로 보내주는 함수입니다.  
     * @param : userid , model
     * @return : jsonview
    **/
	@RequestMapping("/showUser")
	public View showUser(@RequestParam("userId") String userid, Model model) {
		UserDTO user = service.oneUserSelect(userid);
		model.addAttribute("data", user);
		return jsonview;
	}
	
	/**
     * @함수명 : userpassUpdate
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : 넘어온 userid를 UserService의 userpassUpdate함수로 보내주는 함수입니다.
     * @param : userdto(userid , password)
     * @return : jsonview
    **/
	@RequestMapping(value="userpassupdate", method=RequestMethod.POST)
	public View userpassUpdate(UserDTO userdto) {
		service.userpassUpdate(userdto);
		return jsonview;
	}
	
	/**
     * @함수명 : usernickUpdate
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : 넘어온 userid를 UserService의 usernickUpdate함수로 보내주는 함수입니다. 
     * @param : userdto(userid , username)
     * @return : jsonview
    **/
	@RequestMapping(value="usernickupdate", method=RequestMethod.POST)
	public View usernickUpdate(UserDTO userdto) {
		service.usernickUpdate(userdto);
		return jsonview;
	}
	
	/**
     * @함수명 : profileupdate
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : userid값과 request(프로필 이미지 파일)를 service의 profileupdate보내주고 return값을 받아서 modal에 담아 요청한 페이지로  보내주는 함수입니다. 
     * @param : userid , request , model
     * @return : jsonview
    **/
	@RequestMapping("profileimageupdate")
	public View profileupdate(@RequestParam("userId") String userid , MultipartHttpServletRequest request, Model model) {
		LinkedList<FileMeta> files = service.profileupdate(userid,request);
		model.addAttribute("data", files);
		return jsonview;
	}

	/**
	* @함수명 : doGoogleSignInActionPage(HttpServletResponse response, Model model)
	* @작성일 : 2018. 07. 02.
	* @작성자 : 김 진 원
	* @설명 : 구글 로그인을 위한 함수
	* @param HttpServletResponse - response
	* @param Model - json으로 보내줄 data
	* @return String tiles
	**/
	@RequestMapping("googleLogin")
	public String doGoogleSignInActionPage(HttpServletResponse response, Model model) throws Exception {
		String url = service.doGoogleSignInActionPage(response);
		model.addAttribute("url", url);
		return "noTiles.user.googlelogin.jsp";

	}

	/**
	* @함수명 : doSessionAssignActionPage(HttpServletRequest request)
	* @작성일 : 2018. 07. 02.
	* @작성자 : 김 진 원
	* @설명 : 구글 로그인을 했을 때, corin2 사이트에서 로그인이 되도록 처리
	* @param HttpServletRequest - request
	* @return String tiles
	**/
	@RequestMapping("googleSignInCallback")
	public String doSessionAssignActionPage(HttpServletRequest request) throws Exception {
		UserDTO user = service.googleLogin(request);
		HttpSession session = request.getSession();
		session.setAttribute("user", user);
		return "noTiles.user.oauthlogin.jsp";
	}
}