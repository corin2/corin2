<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2"></script>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<style>
.swal-overlay {
			  background-color: rgb(86,98,112);
			  }
</style>
</head>
<body>
	<script type="text/javascript">
	var getParameters = function (paramName) {
	    // 리턴값을 위한 변수 선언
	    var returnValue;

	    // 현재 URL 가져오기
	    var url = location.href;

	    // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
	    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

	    // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
	    for (var i = 0; i < parameters.length; i++) {
	        var varName = parameters[i].split('=')[0];
	        if (varName.toUpperCase() == paramName.toUpperCase()) {
	            returnValue = parameters[i].split('=')[1];
	            return decodeURIComponent(returnValue);
	        }
	    }
	};
	
	swal({
		  title: '재설정 비밀번호를 입력해 주세요',
		  input: 'text',
		  confirmButtonText: '재설정하기',
		}).then(function(result) {
			var userId = getParameters("userid");
			$.ajax({
				type : "post",
				url : "repassemailconfirm",
				data : {result : result.value,
						userId : userId},
				success : function(data) {
			      swal({
			        type: 'success',
			        html: '재설정된 비밀번호는 : <strong>' + result.value + '</strong> 입니다.'
			      });
	            }
	        });
		})
	</script>
</body>
</html>