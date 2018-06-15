/* 
    파일명: FileUploadController.java
    설명: 
    작성일: 2018. 6. 12.
    작성자: 전나영
*/
package site.corin2.board.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.View;

import site.corin2.board.dto.FileMeta;



@Controller
public class FileUploadController {
	
	LinkedList<FileMeta> files = new LinkedList<FileMeta>();
	FileMeta fileMeta = null;
	
	@Autowired
	private View jsonview;

	
	@RequestMapping("fileUpload")
	public String fileUpload() {
		
		return "board.fileUpload";
	}
	

/*	@RequestMapping(value="upload", method = RequestMethod.POST)
	public @ResponseBody LinkedList<FileMeta> upload(MultipartHttpServletRequest request, HttpServletResponse response) {
		System.out.println("파일 업로드 커늩롤러");
		//1. build an iterator
		 Iterator<String> itr =  request.getFileNames();
		 System.out.println(itr);
		 MultipartFile mpf = null;

		 //2. get each file
		 while(itr.hasNext()){
			 
			 //2.1 get next MultipartFile
			 mpf = request.getFile(itr.next()); 
			 System.out.println(mpf.getOriginalFilename() +" uploaded! "+files.size());

			 //2.2 if files > 10 remove the first from the list
			 if(files.size() >= 10)
				 files.pop();
			 
			 //2.3 create new fileMeta
			 fileMeta = new FileMeta();
			 fileMeta.setFileName(mpf.getOriginalFilename());
			 fileMeta.setFileSize(mpf.getSize()/1024+" Kb");
			 fileMeta.setFileType(mpf.getContentType());
			 
			 try {
				fileMeta.setBytes(mpf.getBytes());
				
				// 1. copy file to local disk (make sure the path "e.g. D:/temp/files" exists)
				// 2. transto(file)
				// 3. 그냥 temp 로 하면 안 올라가네... 폴더 따로 만들어야 사진이 들어감
				FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("C:/Temp/file/"+mpf.getOriginalFilename()));
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			 //2.4 add to files
			 files.add(fileMeta);
			 
		 }
		 
	
		return files;
 
	}*/

	@RequestMapping(value="dragInsert", method = RequestMethod.POST)
	public @ResponseBody LinkedList<FileMeta> upload(MultipartHttpServletRequest request, HttpServletResponse response) {
		System.out.println("파일 업로드 커늩롤러");
		//1. build an iterator
		 Iterator<String> itr =  request.getFileNames();
		 System.out.println(itr);
		 MultipartFile mpf = null;

		 //2. get each file
		 while(itr.hasNext()){
			 
			 //2.1 get next MultipartFile
			 mpf = request.getFile(itr.next()); 
			 System.out.println(mpf.getOriginalFilename() +" uploaded! "+files.size());

			 //2.2 if files > 10 remove the first from the list
			 if(files.size() >= 10)
				 files.pop();
			 
			 //2.3 create new fileMeta
			 fileMeta = new FileMeta();
			 fileMeta.setFileName(mpf.getOriginalFilename());
			 fileMeta.setFileSize(mpf.getSize()/1024+" Kb");
			 fileMeta.setFileType(mpf.getContentType());
			 
			 try {
				fileMeta.setBytes(mpf.getBytes());
				
				// 1. copy file to local disk (make sure the path "e.g. D:/temp/files" exists)
				// 2. transto(file)
				// 3. 그냥 temp 로 하면 안 올라가네... 폴더 따로 만들어야 사진이 들어감
				FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("C:/Temp/file/"+mpf.getOriginalFilename()));
				
			} catch (IOException e) {
				e.printStackTrace();
			}
			 //2.4 add to files
			 files.add(fileMeta);
			 
		 }
		 
	
		return files;
 
	}
		

	@RequestMapping(value = "get/{value}", method = RequestMethod.GET)
	 public void get(HttpServletResponse response,@PathVariable String value){
		 FileMeta getFile = files.get(Integer.parseInt(value));
		 try {		
			 	response.setContentType(getFile.getFileType());
			 	response.setHeader("Content-disposition", "attachment; filename=\""+getFile.getFileName()+"\"");
		        FileCopyUtils.copy(getFile.getBytes(), response.getOutputStream());
		 }catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
		 }
	 }
}
