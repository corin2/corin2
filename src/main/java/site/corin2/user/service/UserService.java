/**
    파일명: UserService.java
    설   명: user에 대한 service
    작성일: 2018. 6. 8.
    작성자: 강 진 광
*/
package site.corin2.user.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.View;

import site.corin2.board.dto.FileMeta;
import site.corin2.board.service.UploadFileUtils;
import site.corin2.user.dao.AdminDAO;
import site.corin2.user.dao.UserDAO;
import site.corin2.user.dto.AdminDTO;
import site.corin2.user.dto.UserDTO;

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
	
	//회원가입 기능 실행
	public void userInsert(UserDTO userdto) {
		System.out.println("service탔니");
		int result = 0;
		String viewpage = "";
		try {
			UserDAO userdao = sqlsession.getMapper(UserDAO.class);
			//userdto.setPassword(this.bCryptPasswordEncoder.encode(userdto.getPassword()));
			userdto.setPassword(userdto.getPassword());
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
				System.out.println(userdto.getUserId());
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
	public void repassemailconfirm(String result , String userId) {
		UserDAO userdao = sqlsession.getMapper(UserDAO.class);
		UserDTO repassuser;
		try {
			repassuser = userdao.userSelect(userId);
			repassuser.setPassword(result);
			userdao.repassword(repassuser);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	//비밀번호 재설정 이메일 보내기
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
			System.out.println(userdto.getUserId());
			Template template = velocityEngine.getTemplate("repassword.vm"); 
			StringWriter stringWriter = new StringWriter(); 
			template.merge(velocityContext, stringWriter); 
			mimeMessageHelper.setText(stringWriter.toString(),true); 
			javamailsender.send(message);
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}	
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
		try {
			userdto.setPassword("kakaologin");
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
	
	//특정 유저 조회
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
	
	//사용자 수정하기 기능 실행
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
	
	//사용자 수정하기 닉네임 변경
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
		
	//프로필 수정하기
	public LinkedList<FileMeta> profileupdate(String userid , MultipartHttpServletRequest request) {
		String savepath = "resources/images/profile";
        //String downloadpath = request.getRealPath(savepath);
		//LinkedList<FileMeta> files = new LinkedList<FileMeta>();
		FileMeta fileMeta = null;
		Iterator<String> itr = request.getFileNames();
		//System.out.println(request.getFileNames());
		MultipartFile mpf = null;
		while (itr.hasNext()) {
			mpf = request.getFile(itr.next());
			
			// 파일 정보가 없을 경우
	        if(mpf == null || mpf.getSize() <= 0) {
	        	return null;
	        }
	        
	        // 경로 설정
	        String fileName = null;
			String originalName = mpf.getOriginalFilename();
	        
	        // SQL Mapper
	        UserDAO userdao = sqlsession.getMapper(UserDAO.class);
	        UserDTO updateuser;
	        try {
	        	// AWS S3에 파일 업로드
				fileName = UploadFileUtils.uploadFile(savepath, null, originalName, mpf.getBytes());
	        	
				// DB에 파일정보 insert
	        	updateuser = userdao.userSelect(userid);
				updateuser.setUserProfile(fileName);
				userdao.profileUpdate(updateuser);
	        } catch (Exception e) {
	        	e.printStackTrace();
	        }
	        
			/*
			if (files.size() >= 10)
				files.pop();
			fileMeta = new FileMeta();
			fileMeta.setFileName(mpf.getOriginalFilename());
			fileMeta.setFileSize(mpf.getSize() / 1024 + " Kb");
			fileMeta.setFileType(mpf.getContentType());
			String fileName = System.currentTimeMillis()+mpf.getOriginalFilename();
			System.out.println(mpf.getOriginalFilename());
			System.out.println(mpf.getContentType());
			UserDAO userdao = sqlsession.getMapper(UserDAO.class);
			UserDTO updateuser;
			try {
				updateuser = userdao.userSelect(userid);
				updateuser.setUserProfile(fileName);
				userdao.profileUpdate(updateuser);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			try {
				fileMeta.setBytes(mpf.getBytes());
				FileCopyUtils.copy(mpf.getBytes(),
						new FileOutputStream(
								downloadpath+"\\"
											+ fileName));
			} catch (IOException e) {
				e.printStackTrace();
			}
			files.add(fileMeta);
			*/

		}
		//return files;
		return null;
	}
}