/* 
    파일명: FileUploadController.java
    설명: 
    작성일: 2018. 6. 12.
    작성자: 전나영
*/
package site.corin2.board.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;

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
	public String fileUpload() {
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
		
		// 게시판에 파일함 정보 insert
		boardDTO.setUserId(boardDTO.getUserId());
		service.boardInsert(boardDTO);

		//경로설정
		String savepath = "resources/upload";
		String fileName = null;
		String originalName = mpf.getOriginalFilename();
		
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
	// AWS S3 URL로 다운로드 기능 구현
		
	//검색기능
	@RequestMapping(value="searcherFileSelect" , method = RequestMethod.GET)
	public @ResponseBody LinkedList<UploadDTO> searcherFileSelect(UploadDTO uploadDTO) {

		return service.searcherFileSelect(uploadDTO);
	}
	
	//일자별 검색
	@RequestMapping(value="dateClick" , method=RequestMethod.GET)
	public View dateClick(@RequestParam("projectNum")String projectNum,@RequestParam("date")String date,@RequestParam("extension")String extension ,Model model) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		System.out.println("일자별"+ extension);
		System.out.println("일자별"+ date);
		map.put("projectNum", projectNum);
		map.put("date", date);
		map.put("extension", extension);
		model.addAttribute("date", service.dateClick(map));
		return jsonview;
	}
	
	//확장자 검색
	@RequestMapping(value="exClick" , method=RequestMethod.GET)
	public View exClick(@RequestParam("projectNum")String projectNum,@RequestParam("extension")String extension,Model model) {
		HashMap map = new HashMap<String, Object>();
		System.out.println("확장자별"+ extension);
		map.put("projectNum", projectNum);
		map.put("extension", extension);
		model.addAttribute("extension", service.exClick(map));
		return jsonview;
	}
	
}