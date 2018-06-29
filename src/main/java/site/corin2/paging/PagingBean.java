/**
    파일명: PagingBean.java
    설   명: 
    작성일: 2018. 6. 29.
    작성자: 김 진 원
*/

package site.corin2.paging;

public class PagingBean {

	private int nowPage; //현재 페이지
	private int startNum; //현재 첫번째 row의 넘버
	private int totalCount; //게시판 총 페이지
	private int countPerPage; //1 페이지당 보여줄 리스트 갯수
	private int blockCount; //paging page 숫자의 블록 카운트
	
	public int getNowPage() {
		return nowPage;
	}
	
	public void setNowPage(int nowPage) {
		this.nowPage = nowPage;
	}
	
	public int getTotalCount() {
		return totalCount;
	}
	
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	
	public int getCountPerPage() {
		return countPerPage;
	}
	
	public void setCountPerPage(int countPerPage) {
		this.countPerPage = countPerPage;
	}
	
	public int getBlockCount() {
		return blockCount;
	}
	
	public void setBlockCount(int blockCount) {
		this.blockCount = blockCount;
	}
	
	public int getStartNum() {
		return startNum;
	}
	
	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}
}
