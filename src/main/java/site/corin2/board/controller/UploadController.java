/* 
    파일명: FileUploadController.java
    설명: 
    작성일: 2018. 6. 12.
    작성자: 전나영
*/
package site.corin2.board.controller;



import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import org.springframework.web.servlet.View;

import site.corin2.board.dto.BoardDTO;
import site.corin2.board.dto.UploadDTO;

import site.corin2.board.service.UploadService;

@Controller
public class UploadController {
	@Autowired
	private UploadService service;
	
	@Autowired
	private View jsonview;
	//초기화면 ui
	@RequestMapping(value="fileUpload", method =RequestMethod.GET )
	public String fileUpload(@RequestParam("projectNum") String projectNum,Model model) {
		return "board.fileUpload";
	}
	//초기화면 전체조회
	@RequestMapping(value="fileUpload1", method= RequestMethod.GET)
	public View fileUpload1(@RequestParam("projectNum") String projectNum,Model model) {
		model.addAttribute("file1", service.uploadSelect(Integer.parseInt(projectNum)));
		return jsonview;
	}

	//파일업로드 upload
	@RequestMapping(value = "upload", method = RequestMethod.POST)
	public @ResponseBody LinkedList<UploadDTO> upload(@RequestParam("projectNum") String projectNum,BoardDTO boardDTO,UploadDTO uploadDTO,MultipartHttpServletRequest request, HttpServletResponse response , Model model){
			
		System.out.println("파일 업로드 커늩롤러"+projectNum);
	
		Iterator<String> itr = request.getFileNames();
		
		MultipartFile mpf =  request.getFile(itr.next()); 
		 	
		while(itr.hasNext()){}
		System.out.println("uploadDTO" + uploadDTO.getProjectNum() +"/"+uploadDTO.getBoardNum() + "/");
			
		System.out.println(mpf.getOriginalFilename() +" uploaded! ");
			 						//000.jpg            
		//게시판 insert
		boardDTO.setUserId(boardDTO.getUserId());
		service.boardInsert(boardDTO);

		//경로설정
		String savepath = "resources/upload";  
		String downloadpath = request.getRealPath(savepath);
		String filePath = null;
		/* 
		  D:\bitcamp104\FinalProject\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps\corin2\
		 */ 
		String fileName =null;
		String[] fileName1 = mpf.getOriginalFilename().split("\\.") ;
	
		
		//파일명 정하기
		if(null != mpf && mpf.getSize() > 0) {
			fileName = fileName1[0]+"_"+ System.currentTimeMillis()+"."+fileName1[1]; //파일_현재날짜.확장자 
			uploadDTO.setUploadAlias(fileName);
			uploadDTO.setUploadOrigin(mpf.getOriginalFilename());
			filePath = downloadpath + "\\" + fileName;
			
		}else {
			uploadDTO.setUploadAlias(mpf.getOriginalFilename());//파일명.확장자 
			uploadDTO.setUploadOrigin(mpf.getOriginalFilename());
			filePath = downloadpath + "\\" + mpf.getOriginalFilename();
			
		}
		 //파일 insert
		 service.uploadInsert(uploadDTO);
		
		try {
			//D:\bitcamp104\FinalProject\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps\corin2\ 경로에 파일 업로드
			FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream(filePath));
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		return service.uploadSelect(Integer.parseInt(projectNum));
	}

	//삭제하는 함수
	@RequestMapping(value ="deleteFile", method=RequestMethod.GET)
	public @ResponseBody void delete(UploadDTO uploadDTO) {
		service.fileDelete(uploadDTO);
	}

	//다운로드 함수
	@RequestMapping(value = "download", method = RequestMethod.GET)
	public void download(HttpServletRequest request, HttpServletResponse response){

		String filename = request.getParameter("fileName");
		String savepath = "resources/upload";  
		String downloadpath = request.getRealPath(savepath);
		String filePath = downloadpath + "\\" + filename;
		

		byte[] b = new byte[4096];
		try {
			//파일 다운로드
			FileInputStream in = new FileInputStream(filePath);		
		    response.setHeader("Content-Disposition", 
		            "attachment;filename="+new String(filename.getBytes(),"UTF-8"));
		    ServletOutputStream out2 = response.getOutputStream();
		    int numread;
		    while((numread = in.read(b,0,b.length)) != -1){
		       out2.write(b,0,numread);
		    }
		    
		    out2.flush();
		    out2.close();
		    in.close(); 
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		
	}
/*	//검색기능
	@RequestMapping(value="searchSelect" , method = RequestMethod.GET)
	public void searcherSelect() {
		
		service.searcherSelect();
	}*/

}