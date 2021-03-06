/**
    파일명: UploadFileUtils.java
    설   명: S3 업로드 파일 유틸
    작성일: 2018. 6. 27.
    작성자: 강 성 훈
*/

package site.corin2.util;

import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;

public class UploadFileUtils {
	
	public static String uploadFile(String uploadPath, String projectNum, String originalName, byte[] byteData) throws Exception {
		S3Util s3 = new S3Util();
		String bucketName = "corin2.site";
		
		// savedName : 1529888132496_image.jpg 같은 형식으로 만들어준다.
		String savedName = System.currentTimeMillis() + "_" + originalName; //현재날짜_파일명.확장자
		
		// 프로필 업로드 경로 '/resources/images/profile/1529888132496_image.jpg'
		String profileUploadPath = (uploadPath + "/" + savedName).replace(File.separatorChar, '/');
		
		// '/project11/20180628'
		String savedPath = calcPath(uploadPath, projectNum) + "/";
		// '/project11/20180628/1529888132496_image.jpg'
		String uploadedFileName = (savedPath + savedName).replace(File.separatorChar, '/');
		// 파일 업로드 경로 '/resources/upload/project11/20180628/1529888132496_image.jpg'
		String fileUploadPath = (uploadPath + uploadedFileName).replace(File.separatorChar, '/');
		
		// 프로필 업로드
		if(projectNum == null) {
			s3.fileUpload(bucketName, profileUploadPath, byteData);
			return savedName;
		}
		
		// 파일 업로드
		s3.fileUpload(bucketName, fileUploadPath, byteData);
		return fileUploadPath;
	}
	
	private static String calcPath(String uploadPath, String projectNum) {
		Calendar cal = Calendar.getInstance();

		int yearPath = cal.get(Calendar.YEAR);
		String monthPath = yearPath + new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);
		String datePath = monthPath + new DecimalFormat("00").format(cal.get(Calendar.DATE));
		
		// '/project11/20180628' 식으로 경로 설정 
		String sortedPath = "/project" + projectNum + "/" + datePath;
		makeDir(uploadPath, projectNum, sortedPath);

		return sortedPath;
	}
	
	private static void makeDir(String uploadPath, String projectNum, String sortedPath) {
		if (new File(sortedPath).exists()) {
			return;
		}

		File dirPath = new File(uploadPath + sortedPath);

		if (!dirPath.exists()) {
			dirPath.mkdir();
		}
	}
}
