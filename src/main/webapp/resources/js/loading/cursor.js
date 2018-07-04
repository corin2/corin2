/**
    파일명: cursor.js
    설   명: cursor 변환하기 대한 javascript
    작성일: 2018. 6. 25.
    작성자: 강 진 광
*/

/**
 * @함수명 : cursor 변경하기
 * @작성일 : 2018. 6. 25.
 * @작성자 : 강진광
 * @설명 : 비동기를 실행 할 시 mouse cursor의 모양을 비동기를 실행할 동안 바꾸어 주는 함수입니다.
**/
$(function(){
	$( document ).ajaxStart(function() {
	    //마우스 커서를 로딩 중 커서로 변경
	    $('html').css("cursor", "wait"); 
	});
	//AJAX 통신 종료
	$( document ).ajaxStop(function() {
	    //마우스 커서를 원래대로 돌린다
	    $('html').css("cursor", "auto"); 
	});
});