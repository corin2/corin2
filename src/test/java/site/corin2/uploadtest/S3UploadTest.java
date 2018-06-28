/**
    파일명: S3UploadTest.java
    설   명: 
    작성일: 2018. 6. 28.
    작성자: 강 성 훈
*/

package site.corin2.uploadtest;

import java.text.DecimalFormat;
import java.util.Calendar;

import org.junit.Test;

public class S3UploadTest {
	@Test
	public void calcPath() {
		Calendar cal = Calendar.getInstance();

		int yearPath = cal.get(Calendar.YEAR);
		String monthPath = yearPath + new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);
		String datePath = monthPath + new DecimalFormat("00").format(cal.get(Calendar.DATE));
		
		System.out.println("년: " + yearPath);
		System.out.println("월: " + monthPath);
		System.out.println("일: " + datePath);
	}
}
