/* 
    파일명: FileUploadController.java
    설명: 
    작성일: 2018. 6. 12.
    작성자: 전나영
*/
package site.corin2.board.controller;

import java.io.FileInputStream;
import java.io.FileOutputStream;
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
	
	/**
	    * @함수명 : fileUpload
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 초기화면 로딩화면
	    * @param 
	    * @return String board.fileUpload
	 */
	@RequestMapping(value="fileUpload", method =RequestMethod.GET )
	public String fileUpload() {
		return "board.fileUpload";
	}
	
	/**
	    * @함수명 : fileUpload1
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일함 로딩될때 비동기로 파일들이  전체 조회된다.
	    * @param projectNum
	    * @return jsonview
	 */
	@RequestMapping(value="fileUpload1", method= RequestMethod.GET)
	public View fileUpload1(@RequestParam("projectNum") String projectNum,Model model) {
		model.addAttribute("file1", service.uploadSelect(Integer.parseInt(projectNum))); //파일 전체조회
		return jsonview;
	}
	
	/**
	    * @함수명 : upload
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일업로드시 insert가 되는 동시에  select 가 동시에 되는 함수이다.
	    * @param projectNum, BoardDTO, UploadDTO, MultipartHttpServletRequest
	    * @return LinkedList<UploadDTO>를 json 형태로 리턴 
	 */
	@RequestMapping(value = "upload", method = RequestMethod.POST)
	public @ResponseBody LinkedList<UploadDTO> upload(@RequestParam("projectNum") String projectNum,BoardDTO boardDTO,UploadDTO uploadDTO,MultipartHttpServletRequest request, Model model){
		//파라미터로 파일들을 받아서 저장한다.
		Iterator<String> itr = request.getFileNames();
		MultipartFile mpf =  request.getFile(itr.next());
		
		// 파일 정보가 없을 경우
        if(mpf == null || mpf.getSize() <= 0) {
        	return null;
        }
		
		// 게시판에 파일함 정보 insert
		boardDTO.setUserId(boardDTO.getUserId());
		service.boardInsert(boardDTO);//board Insert

		//경로설정
		String savepath = "resources/upload";
		String originalName = mpf.getOriginalFilename();
		String[] fileName1 = mpf.getOriginalFilename().split("\\.") ;
		String fileName = null;
		String filePath = null;
		String downloadpath = request.getRealPath(savepath);
		
		//파일명 정하기
		if(null != mpf && mpf.getSize() > 0) {
			fileName = System.currentTimeMillis()+"_"+fileName1[0]+"."+fileName1[1]; //파일_현재날짜.확장자 
			uploadDTO.setUploadAlias(fileName);
			uploadDTO.setUploadOrigin(mpf.getOriginalFilename());
			filePath = downloadpath + "\\" + fileName;
			
		}
		try {
			// DB에 파일 업로드 정보 insert
			uploadDTO.setUploadAlias(fileName); //파일 가명 
			uploadDTO.setUploadOrigin(originalName);//파일 원본명
			service.uploadInsert(uploadDTO); //파일 upload Insert함수
			// 서버에 파일 업로드
			FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream(filePath));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return service.uploadSelect(Integer.parseInt(projectNum));
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
	
	/**
	    * @함수명 : fileDelete
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 업로드된 파일들을 삭제하는 함수
	    * @param UploadDTO
	    * @return void
	 */
	@RequestMapping(value ="deleteFile", method=RequestMethod.GET)
	public @ResponseBody void fileDelete(UploadDTO uploadDTO) {
		service.fileDelete(uploadDTO);
	}

	/**
	    * @함수명 : searcherFileSelect
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : 파일 작성자 , 파일명 검색하는 기능
	    * @param UploadDTO
	    * @return LinkedList<UploadDTO>를 json 형태로 리턴 
	 */
	@RequestMapping(value="searcherFileSelect" , method = RequestMethod.GET)
	public @ResponseBody LinkedList<UploadDTO> searcherFileSelect(UploadDTO uploadDTO) {
		return service.searcherFileSelect(uploadDTO);
	}
	
	/**
	    * @함수명 : exClick
	    * @작성일 : 2018. 7. 4.
	    * @작성자 : 전나영
	    * @설명 : jstree 를 사용해서 클릭한 확장자를 통해서 검색하는 기능
	    * @param projectNum, extension
	    * @return jsonview
	 */
	@RequestMapping(value="exClick" , method=RequestMethod.GET)
	public View exClick(@RequestParam("projectNum")String projectNum,@RequestParam("extension")String extension,Model model) {
		HashMap map = new HashMap<String, Object>();
		map.put("projectNum", projectNum);
		map.put("extension", extension);
		model.addAttribute("extension", service.exClick(map));
		return jsonview;
	}
}