$(function(){
	$('#startadminuser').trigger('click');
});

/**
* @함수명 : allUser(enabled, isDelete, pageNum)
* @작성일 : 2018. 06. 23.
* @작성자 : 김 진 원
* @설명 : 비동기로 유저리스트를 가지고와서 <div id=userManagement> 안에 뿌려주는데
* 		뿌려주기전에 인증여부와, 삭제여부와, 자신이 어느 페이지에 있는지 를 계산하여 그에 맞게 뿌려준다.
* 		가입회원, 메일인증 안한회원, 탈퇴한 회원 찾기 로 각각 뿌려준다
* @param enabled - 인증여부 (0 or 1) 검색 시 (3)
* @param isDelete - 삭제여부 (0 or 1) 검색 시 (자신이 검색한 text박스의 내용)
* @param pageNum - 현재 페이지 (시작 시 1 클릭때마다 변경)    
**/
function allUser(enabled, isDelete, pageNum){
	$.ajax({
		url : "allUser",
		datatype : "JSON",
		async:false,
		success : function (data) {
			$('#userManagement').empty();
			var viewData = [];
			var result = isDelete;
			if(enabled != 3)
				$.each(data.data, function(i, elt) {if(elt.enabled == enabled && elt.isDeleted == isDelete)	viewData.push(elt);});
			else 
				$.each(data.data, function(i, elt) {result = 0; if(elt.userId.indexOf(isDelete) > -1) viewData.push(elt);});
			
			var texthtml = '<table class="table table-admin">'
				 		 + '<thead><tr><th>프로필사진</th><th>아이디</th><th>닉네임</th>'
				 		 + '<th>사용여부</th><th>가입일</th><th>등급</th><th>기능</th></tr></thead>';
			
			$.each(viewData, function(i, elt) { //each문 i는 0부터
				if((pageNum*5-5) <= i  && i <= (pageNum*5-1)){
					texthtml += '<tbody><tr>'
							 + '<td><img src="'+profileStorageURL+elt.userProfile+'" class="img-circle person" width="75" height="75"></td>'
							 + '<td>'+ elt.userId +'</td><td>'+ elt.userName +'</td><td>';
					if(elt.enabled == '1') texthtml += '인증회원';
					else if (elt.enabled == '0') texthtml += '비인증회원';
					texthtml += '</td><td>'+ elt.joinDate +'</td><td>';
					if(elt.gradeNum == 'G100') texthtml += '관리자';
					else texthtml += '회원';
					texthtml += '</td><td>'
							 + '<input type="hidden">'
							 + '<input type="button" value="수정" class="btn btn-info" onclick="userEdit(this, '+enabled+', '+result+', '+pageNum+')" >';
					if(elt.isDeleted == '0')	texthtml += '<input type="button" value="제명" class="btn btn-danger" onclick="userDel(this, '+enabled+', '+isDelete+', '+pageNum+')" >';
					if(elt.isDeleted == '1')	texthtml += '<input type="button" value="복구" class="btn btn-success" onclick="userReset(this, '+enabled+', '+isDelete+', '+pageNum+')" >';
					texthtml += '</td></tr></tbody>';
				}
			});
			texthtml += '</table>';
			$('#userManagement').html(texthtml);
			userPaging(enabled, isDelete, pageNum, viewData);
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : userDel(obj, enabled, isDelete, pageNum)
* @작성일 : 2018. 06. 23.
* @작성자 : 김 진 원
* @설명 : 같은 tr안에 있는 td의 내용을 가지고 그 아이디를 입력할 공간을 만들어
* 		삭제 시킬 유저의 아이디를 입력하여 확인받아 비동기로 삭제후에 다시 리스트를 뿌려준다.
* @param obj - 자신테그 (삭제버튼 this)
* @param enabled - 인증여부 (0 or 1) 검색 시 (3)
* @param isDelete - 삭제여부 (0 or 1) 검색 시 (자신이 검색한 text박스의 내용)
* @param pageNum - 현재 페이지 (시작 시 1 클릭때마다 변경)
**/
function userDel(obj, enabled, isDelete, pageNum) {
	var tr = $(obj).closest('tr');
	var userId = tr.children('td:eq(1)').text();
	var deluserId = prompt("삭제하실 유저 명을 입력해 주세요.");

	if(userId.toLowerCase() == deluserId.toLowerCase()){
		$.ajax({
			url : "userDel",
			datatype:"JSON",
			async:false,
			data : {userId:userId},
			success : function(data) {
				allUser(enabled, isDelete, pageNum);
			},
			error: function() {
				swal({
					 type: 'error',
					 title: 'Oops...',
					 text: 'Something went wrong!',
					 footer: '<a href>Why do I have this issue?</a>'
					})
			}
		})
	}
}

/**
* @함수명 : userReset(obj, enabled, isDelete, pageNum)
* @작성일 : 2018. 06. 23.
* @작성자 : 김 진 원
* @설명 : 같은 tr안에 있는 td의 내용을 가지고 그 아이디를 입력할 공간을 만들어
* 		복구 시킬 유저의 아이디를 입력하여 확인받아 비동기로 복구후에 다시 리스트를 뿌려준다.
* @param obj - 자신테그 (복구버튼 this)
* @param enabled - 인증여부 (0 or 1) 검색 시 (3)
* @param isDelete - 삭제여부 (0 or 1) 검색 시 (자신이 검색한 text박스의 내용)
* @param pageNum - 현재 페이지 (시작 시 1 클릭때마다 변경)
**/
function userReset(obj, enabled, isDelete, pageNum) {
	var tr = $(obj).closest('tr');
	var userId = tr.children('td:eq(1)').text();
	var deluserId = prompt("복구하실 유저 명을 입력해 주세요.");

	if(userId.toLowerCase() == deluserId.toLowerCase()){
		$.ajax({
			url : "userReset",
			datatype:"JSON",
			async:false,
			data : {userId:userId},
			success : function(data) {
				allUser(enabled, isDelete, pageNum);
			},
			error: function() {
				swal({
					 type: 'error',
					 title: 'Oops...',
					 text: 'Something went wrong!',
					 footer: '<a href>Why do I have this issue?</a>'
					})
			}
		})
	}
}

/**
* @함수명 : userEdit(obj, enabled, isDelete, pageNum)
* @작성일 : 2018. 06. 23.
* @작성자 : 김 진 원
* @설명 : 같은 tr안에 있는 내용을 가지고 인증여부와 등급 select option 태그를 만들어
* 		수정 할 수 있는 tr을 생성한다
* @param obj - 자신테그 (수정버튼 this)
* @param enabled - 인증여부 (0 or 1) 검색 시 (3)
* @param isDelete - 삭제여부 (0 or 1) 검색 시 (자신이 검색한 text박스의 내용)
* @param pageNum - 현재 페이지 (시작 시 1 클릭때마다 변경)
**/
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

/**
* @함수명 : userEditOk(obj, enabled, isDelete, pageNum)
* @작성일 : 2018. 06. 23.
* @작성자 : 김 진 원
* @설명 : userEdit 함수에서 만들어진 input 태그의 정보를 선택하여 수정완료 버튼을 누르면
* 		비동기로 정보들이 수정되고 다시 리스트를 뿌린다.
* @param obj - 자신테그 (수정버튼 this)
* @param enabled - 인증여부 (0 or 1) 검색 시 (3)
* @param isDelete - 삭제여부 (0 or 1) 검색 시 (자신이 검색한 text박스의 내용)
* @param pageNum - 현재 페이지 (시작 시 1 클릭때마다 변경)
**/
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
			async:false,
			data : {userId:userId, userName:userName.trim(), enabled:enableddata, gradeNum:gradeNum},
			success : function(data){
				allUser(enabled, isDelete, pageNum);
			},
			error: function() {
				swal({
					 type: 'error',
					 title: 'Oops...',
					 text: 'Something went wrong!',
					 footer: '<a href>Why do I have this issue?</a>'
					})
			}
		});
	}else{
		swal({type: 'warning',title:"내용을 입력하세요"});
	}
}

/**
* @함수명 : userPaging(enabled, isDelete, pageNum, pagingData)
* @작성일 : 2018. 06. 23.
* @작성자 : 김 진 원
* @설명 : 비동기 페이징 처리를 위한 함수
* @param enabled - 인증여부 (0 or 1) 검색 시 (3)
* @param isDelete - 삭제여부 (0 or 1) 검색 시 (자신이 검색한 text박스의 내용)
* @param pageNum - 현재 페이지 (시작 시 1 클릭때마다 변경)
* @param pagingData - 총 조회결과의 개수 (들어가서 페이징개수로 변환)
**/
function userPaging(enabled, isDelete, pageNum, pagingData) {
	$('#pageChange').empty();
	var pagehtml = '';
	var maxPage = Math.ceil(pagingData.length/5);
	for(i = 1; i <= maxPage; i++){
		if(i <= 5){
			pagehtml += '<li><a ';
			if(maxPage <= 5) {
				if(pageNum == i) pagehtml += 'class="thisPage" ';
				pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+i+')">'+i;
			}else if(maxPage > 5) {
				if(pageNum < 3) {
					if(pageNum == i) pagehtml += 'class="thisPage" ';
					pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+i+')">'+i;
				}
				else if(pageNum > (maxPage-2)){
					if(pageNum == (maxPage-5+i)) pagehtml += 'class="thisPage" ';
					pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+(maxPage-5+i)+')">'+(maxPage-5+i);
				}
				else {
					if(pageNum == (pageNum-3+i)) pagehtml += 'class="thisPage" ';
					pagehtml += 'onclick="allUser('+enabled+', \''+isDelete+'\', '+(pageNum-3+i)+')">'+(pageNum-3+i);
				}
			}
			pagehtml += '</a></li>'; 
		}
	}
	
	$('#pageChange').html(pagehtml);
}