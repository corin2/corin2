package site.corin2.user.service;
import java.io.UnsupportedEncodingException;

import javax.activation.DataSource;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;

/**
    파일명: MailHandler.java
    설   명: 
    작성일: 2018. 6. 8.
    작성자: 강 진 광
*/
public class MailHandler {

    private JavaMailSender mailSender;
    private MimeMessage message;
    private MimeMessageHelper messageHelper;

    public MailHandler(JavaMailSender mailSender) throws MessagingException {
        this.mailSender = mailSender;
        message = this.mailSender.createMimeMessage();
        try {
			messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
    }
  
    public void setSubject(String subject) throws MessagingException {
        try {
			messageHelper.setSubject(subject);
			// 이메일 타이틀 
		} catch (javax.mail.MessagingException e) {
		
			e.printStackTrace();
		}
    }
    public void setText(String htmlContent) throws MessagingException {
        try {
			messageHelper.setText(htmlContent, true);
			//  이메일 TEXT 부분 
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
    }

    public void setFrom(String email, String name) throws UnsupportedEncodingException, MessagingException {
        try {
			messageHelper.setFrom(email, name);
			// 보내는 사람 이메일 
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
    }
    public void setTo(String email) throws MessagingException {
        try {
			messageHelper.setTo(email);
			//받는 사람 이메일 
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
    }
    public void addInline(String contentId, DataSource dataSource) throws MessagingException {
        try {
			messageHelper.addInline(contentId, dataSource);
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
    }
    public void send() {
        mailSender.send(message);
    }

}
