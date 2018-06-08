/**
    파일명: MailController.java
    설   명: mail 인증 컨트롤러
    작성일: 2018. 6. 8.
    작성자: 강 진 광
*/

package site.corin2.user.controller;

import org.apache.catalina.tribes.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;

@Controller
public class MailController {

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String RegisterPost(MemberVO user,Model model,RedirectAttributes rttr) throws Exception{
    
        System.out.println("regesterPost 진입 ");
        service.regist(user);
        rttr.addFlashAttribute("msg" , "가입시 사용한 이메일로 인증해주세요");
        return "redirect:/";
    }

    //이메일 인증 코드 검증
    @RequestMapping(value = "/emailConfirm", method = RequestMethod.GET)
    public String emailConfirm(MemberVO user,Model model,RedirectAttributes rttr) throws Exception { 
        
        System.out.println("cont get user"+user);
        MemberVO vo = new MemberVO();
        vo=service.userAuth(user);
        if(vo == null) {
            rttr.addFlashAttribute("msg" , "비정상적인 접근 입니다. 다시 인증해 주세요");
            return "redirect:/";
        }
        //System.out.println("usercontroller vo =" +vo);
        model.addAttribute("login",vo);
        return "/user/emailConfirm";
    }
}
