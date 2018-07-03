/**
    파일명: S3Util.java
    설   명: AWS S3 공통
    작성일: 2018. 6. 27.
    작성자: 강 성 훈
*/

package site.corin2.util;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Properties;

import org.springframework.stereotype.Controller;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Controller
public class S3Util {
	// (S3 권한부여를 위한 key값) src/main/resources/s3Key.properties
	// -> 보안을 위해 .gitignore에 작성한 후 git으로 관리하지 않아야 함
	private Properties s3Key = PropertiesUtils.fetchProperties("s3Key");
	
	private String accessKey = s3Key.getProperty("s3.accessKey"); // S3의 accessKey
	private String secretKey = s3Key.getProperty("s3.secretKey"); // S3의 secretKey
	
	private AmazonS3 conn;
	
	// S3 생성자 함수
	public S3Util() {
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		ClientConfiguration clientConfig = new ClientConfiguration();
		clientConfig.setProtocol(Protocol.HTTP);
		this.conn = new AmazonS3Client(credentials, clientConfig);
		conn.setEndpoint("s3.ap-northeast-2.amazonaws.com"); // '아시아 태평양 서울' 리전 엔드포인트
	}
	
	// 버킷 리스트
	public List<Bucket> getBucketList() {
		return conn.listBuckets();
	}
	
	// 버킷 생성
	public Bucket createBucket(String bucketName) {
		return conn.createBucket(bucketName);
	}
	
	// 폴더 생성 (폴더는 파일명 뒤에 "/"를 붙여야함)
	public void createFolder(String bucketName, String folderName) {
		conn.putObject(bucketName, folderName + "/", new ByteArrayInputStream(new byte[0]), new ObjectMetadata());
	}
	
	// 파일 업로드
	public void fileUpload(String bucketName, String fileName, byte[] fileData) throws FileNotFoundException {
		String filePath = (fileName).replace(File.separatorChar, '/'); // 파일 구별자를 `/`로 설정(\->/) 이게 기존에 / 였어도 넘어오면서 \로 바뀌는 듯
		ObjectMetadata metaData = new ObjectMetadata();
		
		metaData.setContentLength(fileData.length); // 메타데이터 설정 -->원래는 128kB까지 업로드 가능했으나 파일크기만큼 버퍼를 설정
		ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(fileData); //파일 입력
		
		conn.putObject(bucketName, filePath, byteArrayInputStream, metaData);
	}
	
	// 파일 삭제
	public void fileDelete(String bucketName, String fileName) {
		String imgName = (fileName).replace(File.separatorChar, '/');
		conn.deleteObject(bucketName, imgName);
	}
	
	// 파일 URL
	public String getFileURL(String bucketName, String fileName) {
		String imgName = (fileName).replace(File.separatorChar, '/');
		return conn.generatePresignedUrl(new GeneratePresignedUrlRequest(bucketName, imgName)).toString();
	}
	
}
