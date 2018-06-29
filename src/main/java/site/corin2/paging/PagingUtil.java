/**
    파일명: PagingUtil.java
    설   명: 페이징처리
    작성일: 2018. 6. 29.
    작성자: 김 진 원
*/

package site.corin2.paging;

public class PagingUtil {
	public static PagingBean setPagingInfo(PagingBean paging){
		paging.setStartNum(paging.getTotalCount() - (paging.getNowPage()-1) * paging.getCountPerPage());
		
		//시작 seq
		paging.setStartseq(paging.getTotalCount()-paging.getStartNum()); 
		//종료 seq
		paging.setEndseq(paging.getTotalCount()-paging.getStartNum()+paging.getCountPerPage());
		
		return paging;
	}
}
