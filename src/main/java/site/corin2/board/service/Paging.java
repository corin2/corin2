package site.corin2.board.service;

import java.util.ArrayList;

public class Paging {
	int maxPost;			// 페이지당 표시될 게시물  최대 갯수 및 현재 게시물 갯수
	int firstPageNo;		// 첫번째 페이지 번호
	int prevPageNo;			// 이전 페이지 번호
	int startPageNo;		// 시작 페이지
	int currentPageNo;		// 현재 페이지 번호
	int endPageNo;			// 끝 페이지
	int nextPageNo;			// 다음 페이지 번호
	int finalPageNo;		// 마지막 페이지 번호
	int numberOfRecords;	// 전체 레코드 수
	int sizeOfPage;			// 보여지는 페이지 갯수(1,2,3,4,5)
	
	public Paging(int currentPageNo, int maxPost) {
		this.currentPageNo = currentPageNo;
		this.sizeOfPage = 5; //기본 페이지를 5개로 표시함
		this.maxPost = (maxPost != 0) ? maxPost : 10; 
		// 게시물 최대 갯수가 0개가 아니라면  현재 게시물 갯수(maxPost)이고, 만약 게시물수가 0개라면 10개표현이다(10은 그냥 고정값) => 3항연산자
	}

	public int getmaxPost() {
		return maxPost;
	}

	public void setmaxPost(int maxPost) {
		this.maxPost = maxPost;
	}

	public int getFirstPageNo() {
		return firstPageNo;
	}

	public void setFirstPageNo(int firstPageNo) {
		this.firstPageNo = firstPageNo;
	}

	public int getPrevPageNo() {
		return prevPageNo;
	}

	public void setPrevPageNo(int prevPageNo) {
		this.prevPageNo = prevPageNo;
	}

	public int getStartPageNo() {
		return startPageNo;
	}

	public void setStartPageNo(int startPageNo) {
		this.startPageNo = startPageNo;
	}

	public int getCurrentPageNo() {
		return currentPageNo;
	}

	public void setCurrentPageNo(int currentPageNo) {
		this.currentPageNo = currentPageNo;
	}

	public int getEndPageNo() {
		return endPageNo;
	}

	public void setEndPageNo(int endPageNo) {
		this.endPageNo = endPageNo;
	}

	public int getNextPageNo() {
		return nextPageNo;
	}

	public void setNextPageNo(int nextPageNo) {
		this.nextPageNo = nextPageNo;
	}

	public int getFinalPageNo() {
		return finalPageNo;
	}

	public void setFinalPageNo(int finalPageNo) {
		this.finalPageNo = finalPageNo;
	}

	public int getNumberOfRecords() {
		return numberOfRecords;
	}

	public void setNumberOfRecords(int numberOfRecords) {
		this.numberOfRecords = numberOfRecords;
	}

	// 페이징 생성
	public void makePaging() {	
		if(currentPageNo == 0)		// 현재 페이지가 0페이지 이라면(게시물이 1개도 없다면)
			setCurrentPageNo(1);	// 현재 페이지를 CurrentPageNo의 값을 1로 설정한다. (기본값 설정)
		
		if(numberOfRecords == 0)	// 게시글이 1개도 없는경우
			return;					// 그냥 현재 그 값을 반환하여 페이징을 표시하지 않는다.
		
		
		
		if(maxPost == 0)			// 페이지당 표시되는 최대 게시물 수가 0개라면
			setmaxPost(10);			// 최대 표시되는 게시물 수를 10개로 설정한다. (기본 값 설정)
		
		int finalPage = (numberOfRecords + (maxPost -1)) / maxPost;
		// 게시물이 81개인 경우 => (81 + (10-1))/10 = 9 =>즉, 게시물이 81개면 총 9페이지 까지 표시
		
		if(currentPageNo > finalPage)		// 6페이지에서 '다음'버튼을 누르면 11페이지로 이동을 해야하는데, finalPage가 9일 경우  
			setCurrentPageNo(finalPage);	// currentPageNo가 finalPage보다 크므로 CurrentPageNo를 finalPage로 맞춘다.
		
		if(currentPageNo < 0) 		// 3페이지에서  '이전'버튼을 누르면 5페이지 이전인 -3인데 그런 페이지는 존재하지 않으므로
			currentPageNo = 1;		// 현재 페이지를 1로 고정한다.
		
		boolean isNowFirst = currentPageNo == 1 ? true : false; //위의 조건에따라 현재 페이지가 1이면 true값을 아니면 false값을 isNowFirst에 넣는다.
		boolean isNowFinal = currentPageNo == finalPage ? true : false; //현재페이지와 마지막 페이지가 동일(ex. 9페이지)라면 true값을, 아니면 false값을 isNowFinal에 넣는다. 
		
		int startPage = ((currentPageNo -1) / sizeOfPage) * sizeOfPage + 1;
		// 현재 페이지가 4일경우 => ((4-1) / sizeOfPage(5)) * 5 +1 => 1페이지가 첫 페이지
		// 현재 페이지가 7일경우 => ((7-1) / sizeOfPage(5)) * 5 +1 => 6페이지가 첫 페이지
		// 현재 페이지가 14일경우 => ((14-1) / sizeOfPage(5)) * 5 +1 => 11페이지가 첫 페이지
		
		int endPage = startPage + sizeOfPage -1; 
		// 현재 페이지가 4일경우 첫 페이지는 1 => 1 + 5 -1 => 5 페이지가 끝
		// 현재 페이지가 7일경우 첫 페이지는 6 => 6 + 5 -1 => 10 페이지가 끝
		// 현재 페이지가 14일경우 첫 페이지는 11 => 11 + 5 -1 =>15 페이지가 끝
		
		if(endPage > finalPage) // 게시물 갯수가 81개 이여서 finalPage가 9인데, 1~5페이지에서 '다음'버튼을 누르면 sizeOfPage 변수에따라
			endPage = finalPage; // 5개씩 표시가 되어 총 6~10까지가 나오게되는 오류가 발생한다. 그렇기에 게시물 수에 따른 finalPage까지만 표시
								// 하기위해 endPage라는 변수를 만든다. 만약 endPage가 없어서 10이 표시되었고, 10을 눌러도 9페이지로 이동.
		
		setFirstPageNo(1);			// FirstPageNo라는 변수를 1로 설정
		
		if(!isNowFirst)
			setPrevPageNo(((startPage -1) < 1 ? 1 : (startPage -1))); // startPage(초기값 1)이 1보다 작으면 1페이지를 표시하고, 그게아니라면 시작페이지 -1을 표시
																	  // 예를 들어 8페이지에 있는경우 이전을 누르면 초기페이지(6)에서 -1을 한 5페이지가 표시된다.
		setStartPageNo(startPage);		//위의 조건들로 하여 startPage를 딱! 정한다.
		setEndPageNo(endPage);			//위의 조건들로 하여 endPage를 딱! 정한다.
		
		if(!isNowFinal)					// isNowFinal은 현재페이지와 마지막페이지가 동일한경우 true, 아니면 false가 담기는 변수. 
			setNextPageNo(((endPage +1 > finalPage ? finalPage : (endPage +1))));
		// 끝페이지는 17페이지인데 내가 현재 7페이지에 있을경우, '다음'을 클릭하면 다음과 같은 조건을 수행한다.
		// 7페이지가 있는 블록의 끝(endPage)페이지는 10페이지이며, 그 10페이지에 1을 더한 값이 finalPage(17페이지)보다 크면 finalPage를, 아니면 끝(endPage)페이지의 +1을한 11페이지를 표시.
		setFinalPageNo(finalPage);		// 마지막 페이지 번호	
	}	
}