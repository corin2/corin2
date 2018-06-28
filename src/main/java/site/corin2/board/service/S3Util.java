/**
    파일명: S3Util.java
    설   명: AWS S3 공통
    작성일: 2018. 6. 27.
    작성자: 강 성 훈
*/

package site.corin2.board.service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

public class S3Util {
	private String accessKey = "AKIAIDJ7T637AY24JY3A";
	private String secretKey = "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";
	
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
