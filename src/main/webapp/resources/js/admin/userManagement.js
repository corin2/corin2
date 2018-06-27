$(function(){
	
});

//가입회원, 메일인증 안한회원, 탈퇴한 회원 찾기
function allUser(enabled, isDelete, pageNum){
	$.ajax({
		url : "allUser",
		datatype : "JSON",
		success : function (data) {
			$('#userManagement').empty();
			var viewData = [];
			if(enabled != 3)
				$.each(data.data, function(i, elt) {if(elt.enabled == enabled && elt.isDeleted == isDelete)	viewData.push(elt);});
			else 
				$.each(data.data, function(i, elt) {if(elt.userId.indexOf(isDelete) > -1) viewData.push(elt);});
			
			var texthtml = '<table class="table table-bordered">'
				 		 + '<thead><tr><th>프로필사진</th><th>아이디</th><th>닉네임</th>'
				 		 + '<th>사용여부</th><th>가입일</th><th>등급</th><th>기능</th></tr></thead>';
			
			$.each(viewData, function(i, elt) { //each문 i는 0부터
				if((pageNum*5-5) <= i  && i <= (pageNum*5-1)){
					texthtml += '<tbody><tr>'
							 + '<td><img src="resources/images/profile/'+elt.userProfile+'" class="img-circle person" width="75" height="75"></td>'
							 + '<td>'+ elt.userId +'</td><td>'+ elt.userName +'</td><td>';
					if(elt.enabled == '1') texthtml += '인증회원';
					else if (elt.enabled == '0') texthtml += '비인증회원';
					texthtml += '</td><td>'+ elt.joinDate +'</td><td>';
					if(elt.gradeNum == 'G100') texthtml += '관리자';
					else texthtml += '회원';
					texthtml += '</td><td>'
							 + '<input type="button" value="수정" class="btn btn-info" onclick="userEdit(this, '+enabled+', '+isDelete+', '+pageNum+')" >';
					if(elt.isDeleted == '0')	texthtml += '<input type="button" value="제명" class="btn btn-danger" onclick="userDel(this, '+enabled+', '+isDelete+', '+pageNum+')" >';
					if(elt.isDeleted == '1')	texthtml += '<input type="button" value="복구" class="btn btn-success" onclick="userReset(this, '+enabled+', '+isDelete+', '+pageNum+')" >';
					texthtml += '</tr></tbody>';
				}
			});
			texthtml += '</table>';
			$('#userManagement').html(texthtml);
			userPaging(enabled, isDelete, pageNum, viewData);
		}
	});
}

//유저 제명
function userDel(obj, enabled, isDelete, pageNum) {
	var tr = $(obj).closest('tr');
	var userId = tr.children('td:eq(1)').text();
	var deluserId = prompt("삭제하실 유저 명을 입력해 주세요.");

	if(userId.toLowerCase() == deluserId.toLowerCase()){
		$.ajax({
			url : "userDel",
			datatype:"JSON",
			data : {userId:userId},
			success : function(data) {
				allUser(enabled, isDelete, pageNum);
			}
		})
	}
}

//유저 복구
function userReset(obj, enabled, isDelete, pageNum) {
	var tr = $(obj).closest('tr');
	var userId = tr.children('td:eq(1)').text();
	var deluserId = prompt("복구하실 유저 명을 입력해 주세요.");

	if(userId.toLowerCase() == deluserId.toLowerCase()){
		$.ajax({
			url : "userReset",
			datatype:"JSON",
			data : {userId:userId},
			success : function(data) {
				allUser(enabled, isDelete, pageNum);
			}
		})
	}
}

//유저 수정하는 박스 생성
function userEdit(obj, enabled, isDelete, pageNum) {
	var tr = $(obj).closest('tr');
	var text1 = tr.children('td:eq(2)').text();
	var text2 = tr.children('td:eq(3)').text();
	var text3 = tr.children('td:eq(5)').text();
	var texthtml = '<input type="text" class="inputtext" value="'+text1+'" >';
	var texthtm12 = '<select><option value="0">비인증회원</option><option value="1" ';
	if(text2 == '인증회원') texthtm12 += 'selected ';
	texthtm12 += '>인증회원</option></select>';
	var texthtm13 = '<select><option value="G100">관리자</option><option value="G200" ';
	if(text3 == '회원') texthtm13 += 'selected ';
	texthtm13 += '>회원</option></select>';
	
	tr.children('td:eq(2)').html(texthtml);
	tr.children('td:eq(3)').html(texthtm12);
	tr.children('td:eq(5)').html(texthtm13);
	tr.children('td:eq(6)').html('<input type="button" value="완료" class="btn btn-info" onclick="userEditOk(this, '+enabled+', '+isDelete+', '+pageNum+')" />');
}

//유저 수정
function userEditOk(obj, enabled, isDelete, pageNum) {
	var tr = $(obj).closest('tr');
	var userId = tr.children('td:eq(1)').text();
	var userName = tr.children('td:eq(2)').children('input').val();
	var enableddata = tr.children('td:eq(3)').children('select').children('option:selected').val();
	var gradeNum = tr.children('td:eq(5)').children('select').children('option:selected').val();
	if(userName != "") {
		$.ajax({
			type : "post",
			url  : "userEdit",
			datatype:"JSON",
			data : {userId:userId, userName:userName.trim(), enabled:enableddata, gradeNum:gradeNum},
			success : function(data){
				allUser(enabled, isDelete, pageNum);
			}
		});
	}else{
		swal("내용을 입력하세요");
	}
}

//페이지 보여주기
function userPaging(enabled, isDelete, pageNum, pagingData) {
	$('#pageChange').empty();
	var pagehtml = '';
	var maxPage = Math.ceil(pagingData.length/5);
	for(i = 1; i <= maxPage; i++){
		if(i <= 5){
			pagehtml += '<li><a ';
			if(maxPage <= 5) {
				if(pageNum == i) pagehtml += 'class="thisPage"';
				pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+i+')">'+i;
			}else if(maxPage > 5) {
				if(pageNum < 3) {
					if(pageNum == i) pagehtml += 'class="thisPage"';
					pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+i+')">'+i;
				}
				else if(pageNum > (maxPage-2)){
					if(pageNum == (maxPage-5+i)) pagehtml += 'class="thisPage"';
					pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+(maxPage-5+i)+')">'+(maxPage-5+i);
				}
				else {
					if(pageNum == (pageNum-3+i)) pagehtml += 'class="thisPage"';
					pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+(pageNum-3+i)+')">'+(pageNum-3+i);
				}
			}
			pagehtml += '</a></li>'; 
		}
	}
	
	$('#pageChange').html(pagehtml);
}