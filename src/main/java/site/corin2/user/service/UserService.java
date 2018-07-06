/**
    파일명: UserService.java
    설   명: user에 대한 service
    작성일: 2018. 6. 8.
    작성자: 강 진 광
*/
package site.corin2.user.service;

import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.ibatis.session.SqlSession;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import site.corin2.board.dto.FileMeta;
import site.corin2.user.dao.AdminDAO;
import site.corin2.user.dao.UserDAO;
import site.corin2.user.dto.AdminDTO;
import site.corin2.user.dto.UserDTO;
import site.corin2.util.UploadFileUtils;

@Service
public class UserService {

	@Autowired
	private SqlSession sqlsession;
	
	@Autowired
	private JavaMailSender javamailsender;
	
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	VelocityEngine velocityEngine;

	@Autowired
	private GoogleConnectionFactory googleConnectionFactory;
	
	@Autowired
	private OAuth2Parameters googleOAuth2Parameters;
	
	/**
     * @함수명 : userInsert
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : user가 회원가입을 실행할 때 사용되는 함수로 userdto객체를 받아서 dao의  userInsert를 통해 DB에 값을 저장한뒤에 저장에 성공을 한다면 velocityengine을 사용해서 vm파일과 merge시켜 email을 발송해주는 함수입니다.
     * @param : userID , password , userName
    **/
	public void userInsert(UserDTO userdto) {
		int result = 0;
		String viewpage = "";
		try {
			UserDAO userdao = sqlsession.getMapper(UserDAO.class);
			userdto.setPassword(this.bCryptPasswordEncoder.encode(userdto.getPassword()));
			//userdto.setPassword(userdto.getPassword());
			result = userdao.userInsert(userdto);
			if (result > 0) {
				MimeMessage message = javamailsender.createMimeMessage();
				MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, false);
				mimeMessageHelper.setSubject("corin2입니다.");
				mimeMessageHelper.setFrom(new InternetAddress("corin2site@gmail.com"));
				mimeMessageHelper.setTo(userdto.getUserId());
				//message.setText("<a href='http://"+request.getRequestURL()+"/emailConfirm?userid=" + userdto.getUserId()+("'>이메일 인증 확인</a>"),"utf-8", "html");
				velocityEngine.setProperty("resource.loader", "class");
				velocityEngine.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
				velocityEngine.init();
				VelocityContext velocityContext = new VelocityContext(); 
				velocityContext.put("userId",userdto.getUserId());
				AdminDAO admindao = sqlsession.getMapper(AdminDAO.class);
				AdminDTO admindto = admindao.templateFileNameSelect();
				String templatename = admindto.getTemplatefilename();
				Template template = velocityEngine.getTemplate(templatename); 
				StringWriter stringWriter = new StringWriter(); 
				template.merge(velocityContext, stringWriter); 
				mimeMessageHelper.setText(stringWriter.toString(),true); 
				javamailsender.send(message);
			} 
		} catch (Exception e) {
			
			e.printStackTrace();
		}
	}
	
	/**
     * @함수명 : emailConfirm
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : 사용자가 회원가입한 아이디로 보내진 이메일로 이메일 인증을 할 때 사용되는 함수로 userid값을 받아서 그 아이디에 해당하는 enabled값을 1로 변경시켜주는 함수입니다. 
     * @param : userdto , userID
    **/
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

	/**
     * @함수명 : repass
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : 사용자가 비밀번호 재설정을 할 때  DB에 사용자가 입력한 이메일이 있는지 확인을 한뒤 check를 return해주는 함수입니다. 
     * @param : userID
     * @return : check ( true , false )
    **/
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

	/**
     * @함수명 : repassemailconfirm
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : repassword.jsp에서 사용자가 변경할 비밀번호를 입력한뒤 변경을 실행하면 userId로 맞는 userdto를 가져와 비밀번호만 바꾸어주는 함수입니다.
     * @param : result , userID
    **/
	public void repassemailconfirm(String result , String userId) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO repassuser;
		try {
			repassuser = userdao.userSelect(userId);
			//repassuser.setPassword(result);
			repassuser.setPassword(this.bCryptPasswordEncoder.encode(result));
			userdao.repassword(repassuser);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
     * @함수명 : repassword
     * @작성일 : 2018. 6. 5.
     * @작성자 : 강진광
     * @설명 : login페이지에서 비밀번호 변경에 이메일을 입력한뒤 재설정하기 버튼을 눌렀을 때 실행되는 함수로  userdto객체를 받아서 userId로 velocityengine을 사용해서 repassword.vm파일과 merge시켜 email을 발송해주는 함수입니다.
     * @param : userdto(userID)
    **/
	public void repassword(UserDTO userdto) {
		try {
			MimeMessage message = javamailsender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, false);
			mimeMessageHelper.setSubject("corin2입니다.");
			mimeMessageHelper.setFrom(new InternetAddress("corin2site@gmail.com"));
			mimeMessageHelper.setTo(userdto.getUserId());
			//message.setText("<a href='http://"+request.getRequestURL()+"/emailConfirm?userid=" + userdto.getUserId()+("'>이메일 인증 확인</a>"),"utf-8", "html");
			velocityEngine.setProperty("resource.loader", "class");
			velocityEngine.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
			velocityEngine.init();
			VelocityContext velocityContext = new VelocityContext(); 
			velocityContext.put("userId",userdto.getUserId());
			Template template = velocityEngine.getTemplate("repassword.vm"); 
			StringWriter stringWriter = new StringWriter(); 
			template.merge(velocityContext, stringWriter); 
			mimeMessageHelper.setText(stringWriter.toString(),true); 
			javamailsender.send(message);
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}	
	}

	/**
     * @함수명 : idCheck
     * @작성일 : 2018. 6. 6.
     * @작성자 : 강진광
     * @설명 : 넘어온 Id값을 정규 표현식을 사용하여 비교하고 DB의 userID컬럼에 값이 있는지 확인을 한뒤 둘다 성립한다면 true를 두가지다 성립하지 않는다면 false를 return하는 함수입니다.
     * @param : userid
     * @return : check ( true , false )
    **/
	public String idCheck(String userid) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		String check = "false";
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
		if (result > 0 || err == false ) {
			check = "true";
		} else {
			check = "false";
		}
		return check;
	}
	
	/**
     * @함수명 : passwordCheck
     * @작성일 : 2018. 6. 6.
     * @작성자 : 강진광
     * @설명 : 넘어온 password값을 정규 표현식을 사용하여 비교하고 DB의 password컬럼에 값이 있는지 확인을 한뒤 둘다 성립한다면 true를 두가지다 성립하지 않는다면 false를 return하는 함수입니다.
     * @param : password
     * @return : check ( true , false )
    **/
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
	
	/**
     * @함수명 : nickCheck
     * @작성일 : 2018. 6. 6.
     * @작성자 : 강진광
     * @설명 : 넘어온 nickname값을 정규 표현식을 사용하여 비교하고 DB의 nickname컬럼에 값이 있는지 확인을 한뒤 둘다 성립한다면 true를 두가지다 성립하지 않는다면 false를 return하는 함수입니다.
     * @param : nickname
     * @return : check ( true , false )
    **/
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
	
	/**
     * @함수명 : userDelete
     * @작성일 : 2018. 6. 8.
     * @작성자 : 강진광
     * @설명 : 넘어온 userid값으로 userSelect함수를 통해서 userdao를 가져온뒤에 setIsDeleted,setEnabled를 통해서 deleted를 1로 , enabled를 0으로 바꾸어주는 함수입니다. 
     * @param : userId
    **/
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

	/**
     * @함수명 : KakaoLogin
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : kakao oauth login하였을 때 넘어오는 id와 profile을 userdto에 담아서 oauthInsert를 통해 DB에 값을 저장해 주는 함수입니다.
     * @param : userdto (userid , userprofile )
    **/
	public UserDTO KakaoLogin(UserDTO userdto) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		int result = 0;
		try {
			userdto.setPassword(this.bCryptPasswordEncoder.encode("kakaologin"));
			//userdto.setPassword("kakaologin");
			userdto.setUserProfile(userdto.getUserProfile());
			userdto.setEnabled(1);
			result = userdao.oauthInsert(userdto);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
     * @함수명 : getAccessToken
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : kakao oauth login하였을 때 accesstoken을 가져와서 다시 controller로 token을 넘겨주는 함수 입니다. 
     * @param : autorize_code
     * @return : JsonNode
    **/
	public JsonNode getAccessToken(String autorize_code) {
		final String RequestUrl = "https://kauth.kakao.com/oauth/token";

		final List<NameValuePair> postParams = new ArrayList<NameValuePair>();
		postParams.add(new BasicNameValuePair("grant_type", "authorization_code"));
		postParams.add(new BasicNameValuePair("client_id", "fbe288f80d621d2eb6d941ab8e9617fd")); // REST API KEY
		postParams.add(new BasicNameValuePair("http://localhost:8090/kakaologin", "/kakaologin")); // 리다이렉트 URI
		postParams.add(new BasicNameValuePair("code", autorize_code)); // 로그인 과정중 얻은 code 값

		final HttpClient client = HttpClientBuilder.create().build();
		final HttpPost post = new HttpPost(RequestUrl);
		JsonNode returnNode = null;

		try {
			post.setEntity(new UrlEncodedFormEntity(postParams));
			final HttpResponse response = client.execute(post);
			final int responseCode = response.getStatusLine().getStatusCode();

			// JSON 형태 반환값 처리
			ObjectMapper mapper = new ObjectMapper();
			returnNode = mapper.readTree(response.getEntity().getContent());

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// clear resources
		}
		
		return returnNode;
	}

	/**
     * @함수명 : getKakaoUserInfo
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : kakao oauth login하였을 때 accesstoken을 가지고 사용자의 정보를 가져오기 위한 함수입니다.
     * @param : autorize_code
     * @return : JsonNode
    **/
	public JsonNode getKakaoUserInfo(String autorize_code) {

		final String RequestUrl = "https://kapi.kakao.com/v1/user/me";

		final HttpClient client = HttpClientBuilder.create().build();
		final HttpPost post = new HttpPost(RequestUrl);

		// add header
		post.addHeader("Authorization", "Bearer " + autorize_code);

		JsonNode returnNode = null;

		try {
			final HttpResponse response = client.execute(post);
			final int responseCode = response.getStatusLine().getStatusCode();

			// JSON 형태 반환값 처리
			ObjectMapper mapper = new ObjectMapper();
			returnNode = mapper.readTree(response.getEntity().getContent());

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// clear resources
		}
		return returnNode;

	}

	/**
     * @함수명 : changeData
     * @작성일 : 2018. 6. 21.
     * @작성자 : 강진광
     * @설명 : kakao oauth login하였을 때 accesstoken를 사용해서 가져온 userdata를 DB에 넣어주는 함수입니다.
     * @param : userInfo
     * @return : UserDTO
    **/
	public UserDTO changeData(JsonNode userInfo) {
		UserDTO userdto = new UserDTO();
		if (userInfo.path("kaccount_email_verified").asText().equals("true")) { // 이메일 받기 허용 한 경우
			userdto.setUserId(userInfo.path("kaccount_email").asText()); // email -> vo 넣기
			userdto.setEnabled(1);
		} else { // 이메일 거부 할 경우 코드 추후 개발

		}

		JsonNode properties = userInfo.path("properties"); // 추가정보 받아오기
		if (properties.has("nickname"))
			userdto.setUserName((properties.path("nickname").asText()));
			userdto.setUserProfile((properties.path("profile_image").asText()));
		return userdto;
	}
	
	/**
     * @함수명 : allUserSelect
     * @작성일 : 2018. 6. 8.
     * @작성자 : 강진광
     * @설명 : DB에 있는 모든 사용자의 정보를 List에 담아 controller로 보내주는 함수입니다. 
     * @return : List
    **/
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
	
	/**
     * @함수명 : oneUserSelect
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : userid를 받아서 mapper의 userSelect query를 통해서 DB에서 userid와 일치하는 정보를 모두 가져온 뒤에 userdto에 담아서 controller로 보내주는 함수입니다.
     * @param : userid
     * @return : UserDTO
    **/
	public UserDTO oneUserSelect(String userid){
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO user = null;
		try {
			user = userdao.userSelect(userid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return user;
	}
	
	/**
     * @함수명 : userpassUpdate
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : userid와 password를 받아서 mapper의 userSelect query를 통해서 DB에서 userid와 일치하는 정보를 모두 가져온 뒤에 userdto에 담고 setPassword를 통해서 password를 변경해주는 함수입니다.
     * @param : userdto(userid , password)
    **/
	public void userpassUpdate(UserDTO userdto) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO updateuser;
		try {
			updateuser = userdao.userSelect(userdto.getUserId());
			updateuser.setPassword(userdto.getPassword());
			userdao.userpassUpdate(updateuser);
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	/**
     * @함수명 : usernickUpdate
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : userid와 username를 받아서 mapper의 userSelect query를 통해서 DB에서 userid와 일치하는 정보를 모두 가져온 뒤에 userdto에 담고 setUserName를 통해서 username을 변경해주는 함수입니다.
     * @param : userdto(userid , username)
    **/
	public void usernickUpdate(UserDTO userdto) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO updateuser;
		try {
			updateuser = userdao.userSelect(userdto.getUserId());
			updateuser.setUserName(userdto.getUserName());
			userdao.usernickUpdate(updateuser);
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
		
	/**
     * @함수명 : profileupdate
     * @작성일 : 2018. 6. 9.
     * @작성자 : 강진광
     * @설명 : userid값과 request(프로필 이미지 파일)를 받아서 지정한 경로에 파일을 생성해주고 userid를 가지고 mapper의 userSelect를 통해서 dao를 
     * 		    가져온뒤에 setUserProfile과 profileUpdate를 거쳐서 DB에 값을 넣어주는 함수입니다. 
     * @param : userid , request
     * @return : files
    **/
	//프로필 수정하기
	public LinkedList<FileMeta> profileupdate(String userid , MultipartHttpServletRequest request) {
		String savepath = "resources/images/profile";
		LinkedList<FileMeta> files = new LinkedList<FileMeta>();
		FileMeta fileMeta = null;
		
		Iterator<String> itr = request.getFileNames();
		MultipartFile mpf = null;
		
		while (itr.hasNext()) {
			mpf = request.getFile(itr.next());
			
			// 파일 정보가 없을 경우
	        if(mpf == null || mpf.getSize() <= 0) {
	        	return null;
	        }
	        
	        // fileMetaDTO에 파일정보 입력
	        fileMeta = new FileMeta();
			fileMeta.setFileName(mpf.getOriginalFilename());
			fileMeta.setFileSize(mpf.getSize() / 1024 + " Kb");
			fileMeta.setFileType(mpf.getContentType());
	        
	        // 경로 설정
	        String fileName = null;
			String originalName = mpf.getOriginalFilename();
	        
	        // SQL Mapper
	        UserDAO userdao = sqlsession.getMapper(UserDAO.class);
	        UserDTO updateuser;
	        try {
	        	// fileMetaDTO에 바이트 정보 입력
	        	fileMeta.setBytes(mpf.getBytes());
	        	
	        	// AWS S3에 파일 업로드
				fileName = UploadFileUtils.uploadFile(savepath, null, originalName, mpf.getBytes());
				
				// DB에 파일정보 insert
	        	updateuser = userdao.userSelect(userid);
				updateuser.setUserProfile(fileName);
				userdao.profileUpdate(updateuser);
	        } catch (Exception e) {
	        	e.printStackTrace();
	        }
			// files 리스트에 추가
			files.add(fileMeta);
		}
		
		return files;
	}

	/**
	* @함수명 : doGoogleSignInActionPage(HttpServletResponse response)
	* @작성일 : 2018. 07. 02.
	* @작성자 : 김 진 원
	* @설명 : 구글 로그인을 위한 함수
	* @param HttpServletResponse - response
	* @param Model - json으로 보내줄 data
	* @return String 구글 로그인을 할 수 있는 url
	**/
	public String doGoogleSignInActionPage(HttpServletResponse response) {
		OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();
		String url = oauthOperations.buildAuthorizeUrl(GrantType.AUTHORIZATION_CODE, googleOAuth2Parameters);
		return url;
	}
	
	/**
	* @함수명 : googleLogin(HttpServletRequest request)
	* @작성일 : 2018. 07. 02.
	* @작성자 : 김 진 원
	* @설명 : 구글 로그인을 했을 때, 받은 data를 가지고 현재 DB에 저장된 id라면 UserDTO 객체에 정보를
	* 		넣어 로그인 , DB에 저장되지 않은 id라면 DB에 insert를 해준후 UserDTO 객체에 정보를 넣어
	* 		로그인
	* @param HttpServletRequest - request
	* @return UserDTO
	**/
	public UserDTO googleLogin(HttpServletRequest request) {
		String code = request.getParameter("code");

		OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();
		AccessGrant accessGrant = oauthOperations.exchangeForAccess(code, googleOAuth2Parameters.getRedirectUri(),
				null);

		String accessToken = accessGrant.getAccessToken();
		Long expireTime = accessGrant.getExpireTime();
		if (expireTime != null && expireTime < System.currentTimeMillis()) {
			accessToken = accessGrant.getRefreshToken();
		}
		Connection<Google> connection = googleConnectionFactory.createConnection(accessGrant);
		Google google = connection == null ? new GoogleTemplate(accessToken) : connection.getApi();
		PlusOperations plusOperations = google.plusOperations();
		Person profile = plusOperations.getGoogleProfile();
		UserDTO user = new UserDTO();
		user.setUserId(profile.getAccountEmail());
		user.setUserName(profile.getDisplayName());
		user.setPassword(this.bCryptPasswordEncoder.encode("googlelogin"));
		//user.setPassword("googlelogin");
		
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		
		String check = idCheck(user.getUserId());
		if(check=="false") {
			try {userdao.oauthInsert(user);} catch (Exception e) {e.printStackTrace();}
		}
		user.setPassword("googlelogin");
		return user;
	}
}