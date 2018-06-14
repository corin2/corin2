/**
    파일명: MailHandler.java
    설   명: 인증 mail 보내기
    작성일: 2018. 6. 8.
    작성자: 강 진 광
*/

package site.corin2.user.service;

import java.io.UnsupportedEncodingException;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;



public class MailHandler {
	
			private JavaMailSender mailSender;
	        private MimeMessage message;
	        private MimeMessageHelper messageHelper;

	        //이메일 보내기 HANDLER
	        public MailHandler(JavaMailSender mailSender) throws MessagingException {
	            this.mailSender = mailSender;
	            message = this.mailSender.createMimeMessage();
	            messageHelper = new MimeMessageHelper(message, true, "UTF-8");
	        }

	        // 이메일 타이틀 
	        public void setSubject(String subject) throws MessagingException {
	            messageHelper.setSubject(subject);

	        }
	        //  이메일 TEXT 부분 
	        public void setText(String htmlContent) throws MessagingException {
	            messageHelper.setText(htmlContent, true);
	            
	        }
	        // 보내는 사람 이메일 
	        public void setFrom(String email, String name) throws UnsupportedEncodingException, MessagingException {
	            messageHelper.setFrom(email, name);
	            
	        }
	        //받는 사람 이메일 
	        public void setTo(String email) throws MessagingException {
	            messageHelper.setTo(email);
	            
	        }
	        public void addInline(String contentId, DataSource dataSource) throws MessagingException {
	            messageHelper.addInline(contentId, dataSource);
	        }
	        //보내기 함수
	        public void send() {
                mailSender.send(message);
	        }
	}
