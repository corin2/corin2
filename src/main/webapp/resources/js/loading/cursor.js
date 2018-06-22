//sign up ajax
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