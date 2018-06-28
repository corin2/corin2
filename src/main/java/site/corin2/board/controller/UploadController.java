/* 
    파일명: FileUploadController.java
    설명: 
    작성일: 2018. 6. 12.
    작성자: 전나영
*/
package site.corin2.board.controller;



import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.LinkedList;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import org.springframework.web.servlet.View;

import site.corin2.board.dto.BoardDTO;
import site.corin2.board.dto.UploadDTO;
import site.corin2.board.service.S3Util;
import site.corin2.board.service.UploadFileUtils;
import site.corin2.board.service.UploadService;

@Controller
public class UploadController {

	S3Util s3 = new S3Util();
	String bucketName = "corin2.site";
	
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
		Iterator<String> itr = request.getFileNames();
		MultipartFile mpf =  request.getFile(itr.next()); 
		
		// 파일 정보가 없을 경우
        if(mpf == null || mpf.getSize() <= 0) {
        	return null;
        }
		
		//System.out.println("uploadDTO" + uploadDTO.getProjectNum() +"/"+uploadDTO.getBoardNum() + "/");
		//System.out.println(mpf.getOriginalFilename() +" uploaded! ");
		
		// 게시판에 파일함 정보 insert
		boardDTO.setUserId(boardDTO.getUserId());
		service.boardInsert(boardDTO);

		//경로설정
		String savepath = "resources/upload";
		String fileName = null;
		String originalName = mpf.getOriginalFilename();;
		
		try {
			// AWS S3에 파일 업로드
			fileName = UploadFileUtils.uploadFile(savepath, projectNum, originalName, mpf.getBytes());
			
			// DB에 파일 업로드 정보 insert
			uploadDTO.setUploadAlias(fileName);
			uploadDTO.setUploadOrigin(originalName);
			service.uploadInsert(uploadDTO);
		} catch (Exception e) {
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

		//byte[] b = new byte[4096];
		//InputStream in = null;
		//HttpURLConnection uCon = null;
		
		// '/resources/upload/1529888132496_image.jpg'
		s3.fileDownload(bucketName, savepath+ "/" + filename);
		
		/*try {
			
			//파일 다운로드
			URL url;
			
			try {
				url = new URL(s3.getFileURL(bucketName, savepath+filename));
				uCon = (HttpURLConnection) url.openConnection();
				in = uCon.getInputStream();
			} catch (Exception e) {
				System.out.println("다운로드에 실패했습니다.");
			}
			
			
			/*FileInputStream in = new FileInputStream(filePath);		
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
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}*/
		
	}
/*	//검색기능
	@RequestMapping(value="searchSelect" , method = RequestMethod.GET)
	public void searcherSelect() {
		
		service.searcherSelect();
	}*/

}