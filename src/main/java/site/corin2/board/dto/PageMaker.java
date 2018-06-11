/* 
    파일명: PageMaker.java
    설명: 
    작성일: 2018. 6. 10.
    작성자: 전나영
*/
package site.corin2.board.dto;



public class PageMaker {
	//전체 게시물개수
	private int totalcount;
	//현재페이지번호
	private int pagenum = 1;
	//한페이지에 몇개 표시할지
	private int contentnum = 10;
	//현재페이지 블록의 시작페이지
	private int startPage = 1;
	//현재페이지 블록의 마지막 페이지
	private int endPage = 5;
	//이전 페이지로 가는 화살표
	private boolean prev = false;
	//다음 페이지로 가는 화살표
	private boolean next;
	//현재 페이지 블록
	private int currentblock;
	//마지막 페이지 블록
	private int lastblock;
	


		//첫 페이지가 나오는 함수
		public void setStartPage(int currentblock) {
			this.startPage = (currentblock * 5)-4;
							  //1 //1,2,3,4,5  --> 첫페이지 :1 (식:currentblock 1일떄 )
							  //2 //6,7,8,9,10 --> 첫페이지 :6 (식:currentblock 2일떄 )
							  //3 //11,12,13.. --> 첫페이지 :11(식:currentblock 3일떄 )
		}

		public int getEndPage() {
			return endPage;
		}

		

		//마지막 페이지가 나오는 함수
		public void setEndPage(int getlastblock , int getcurrentblock) {
			if(getlastblock == getcurrentblock) {
				this.endPage = calcpage(getTotalcount(), getContentnum());
				 //11,12,13.. --> 마지막페이지 :13
			}
			else {
				this.endPage = getStartPage()+4;
				 //1,2,3,4,5  --> 마지막페이지 :5 
				 //6,7,8,9,10 --> 마지막페이지 :10
			}			  
		}
		
		//전체 페이지 수를 계산하는 함수
		public int calcpage(int totalcount, int contentnum) {
			//125 페이지라면 한페이지에 10페이지를 두면 
			//125 / 10 -> 12.5
			int totalpage = totalcount / contentnum;
			if(totalcount % contentnum >0){ //0.5이기때문에 
				totalpage++; //1을 플러스 해준다.
			}
			return totalpage;
		}

		//현재 페이지 블록함수
		public void setCurrentblock(int pagenum) {
			//페이지 번호를 통해서 구한다.
			//페이지 번호 / 페이지그룹안의 페이지 개수
			//1p 라면 1/5 ->0.1 ->0 + 1  --> 페이지 블록 번호가 1 이다. 
			//4p 라면 4/5 ->1.xx ->1 + 1 --> 페이지 블록 번호가 2 이다. 
			this.currentblock = pagenum/5;
			if(pagenum%5 > 0) {//5으로 나눈 값이 0보다 클때 1을 더한다.
				this.currentblock++;
			}
		}
		//마지막 페이지 블록함수
		public void setLastblock(int totalcount) {
			//블록 : 5 개에 한페이지에 10개씩 보여줌
			//예: 125 / (5*10)
			this.lastblock = totalcount / (5 * this.contentnum);
			if(totalcount % (5 * this.contentnum) > 0) {
				this.lastblock++;
			}
		}
		
		//이전페이지,다음페이지 보이게 함수
		public void prenext(int pagenum) {
			//현재페이지가 첫번째 페이지 블록 안에 있으면 false로 설정
			if(pagenum > 0 && pagenum <6) {//12345 첫페이지 블록일때
				setPrev(false);
				setNext(true);
			}else if(getLastblock() == getCurrentblock()) {//11,12,13 마지막블록일때
				setPrev(true);
				setNext(false);
			}else {//6,7,8,9,10 중간일때 
				setPrev(true);
				setNext(true);
			}
		
		}
	
		
		public int getTotalcount() {
			return totalcount;
		}
	
		public void setTotalcount(int totalcount) {
			this.totalcount = totalcount;
		}
	
		public int getPagenum() {
			return pagenum;
		}
	
		public void setPagenum(int pagenum) {
			this.pagenum = pagenum;
		}
	
		public int getContentnum() {
			return contentnum;
		}
	
		public void setContentnum(int contentnum) {
			this.contentnum = contentnum;
		}
	
		public int getStartPage() {
			return startPage;
		}
		
		public boolean isPrev() {
			return prev;
		}
	
		public void setPrev(boolean prev) {
			this.prev = prev;
		}
	
		public boolean isNext() {
			return next;
		}
	
		public void setNext(boolean next) {
			this.next = next;
		}
	
		public int getCurrentblock() {
			return currentblock;
		}
	
	
		public int getLastblock() {
			return lastblock;
		}

	
}
