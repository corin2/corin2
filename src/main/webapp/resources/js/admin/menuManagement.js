$(function(){
	$('#startadminmenu').trigger('click');
});

/**
* @함수명 : checkListMenuView()
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 체크리스트 메뉴관리를 클릭 할 시 언어 테이블의 있는 언어 명들을 조회하여 <div id=menuManagement>
* 		테그 안에 jquery tab을 만들어 조회한 언어의 명 만큼 탭을 생성해 준다.
**/
function checkListMenuView() {
	$.ajax({
		type : "post",
		url  : "languageColorAllList",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<div id="adminTabs"><ul>';
			$.each(data.list, function(index, elt) {
				texthtml += '<li><a href="#'+elt.languageNum+'Tab" onclick="checkListMenu(\''+elt.languageNum+'\')">'+elt.languageMain+'</a></li>';
			});
			texthtml += '<li><a href="#nullTab" onclick="checkListMenu(\'null\')">공통</a></li></ul>';
			$.each(data.list, function(index, elt) {
				texthtml += '<div id="'+elt.languageNum+'Tab"></div>';
			});
			texthtml += '<div id="nullTab"></div>'
					 + '</div>'
			
			$('#menuManagement').html(texthtml);
			$('#adminTabs').tabs();
			$('#adminTabs').children('ul').children('li:eq(0)').children('a:eq(0)').trigger('click');
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
* @함수명 : checkListMenu(languageNumber)
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 체크리스트 메뉴관리 안에 있는 언어tab을 클릭하면 그 언어에 대한 체크리스트 테이블에 저장되어있는
* 		내용을 비동기로 조회하여 <div id=${languageNumber}Tab> 안에 테이블 형식으로 뿌려준다.
* @param languageNumber - 자신이 조회 할 언어넘버  
**/
function checkListMenu(languageNumber){
	$.ajax({
		type : "post",
		url  : "checkListManagement",
		datatype:"JSON",
		success : function(data){
			$('#'+languageNumber+'Tab').empty();
			var texthtml = '<table class="table table-hover table-admin-menu">'
						 + '<thead><tr><th>체크넘버</th><th>카테고리</th><th>내용</th><th>사용여부</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가" onclick="checkListAdd(this)"></th></tr></thead>';
			$.each(data.data, function(index, elt) {
				var result = elt.languageNum;
				if(elt.languageNum == null) result = 'null';
				if(result == languageNumber && elt.category != null) {
					texthtml += '<tbody><tr>'
							 + '<td>'+elt.checkNum+'</td>'
							 + '<td>'+elt.category+'</td>'
							 + '<td>'+elt.checkContent+'</td>';
					if(elt.isDeleted == '0') texthtml += '<td><input type="button" value="삭제" class="btn btn-danger adminbtndan" onclick="checkListDel(this)" ></td>';
					else if(elt.isDeleted == '1') texthtml += '<td><input type="button" value="복구" class="btn btn-info" onclick="checkListReset(this)" ></td>';
					texthtml += '<td><input type="button" value="수정" class="btn btn-info" onclick="checkListEdit(this)" ></td>'
							 + '</tr></tbody>';
				}
			});
			texthtml += '</table>';
			$('#'+languageNumber+'Tab').html(texthtml);
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
* @함수명 : checkListDel(obj)
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 삭제하고 싶은 체크리스트르 같은 tr안에 있는 삭제버튼을 클릭하게 되면 비동기로 삭제되고
* 		다시 리스트를 뿌려준다
* @param obj - 클릭된 자신태그 (삭제버튼 this)  
**/
function checkListDel(obj){
	var languageNum = $(obj).closest('div').attr('id').substr(0, 4);
	var tr = $(obj).closest('tr');
	var checkNum = tr.children('td:eq(0)').text();
	$.ajax({
		type : "post",
		url  : "checkListDel",
		datatype:"JSON",
		data : {checkNum:checkNum},
		success : function(data){
			$('a[href=\'#'+languageNum+'Tab\']').trigger('click');
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
* @함수명 : checkListReset(obj)
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 복구하고 싶은 체크리스트르 같은 tr안에 있는 복구버튼을 클릭하게 되면 비동기로 복구되고
* 		다시 리스트를 뿌려준다
* @param obj - 클릭된 자신태그 (복구버튼 this)  
**/
function checkListReset(obj){
	var languageNum = $(obj).closest('div').attr('id').substr(0, 4);
	var tr = $(obj).closest('tr');
	var checkNum = tr.children('td:eq(0)').text();
	$.ajax({
		type : "post",
		url  : "checkListReset",
		datatype:"JSON",
		data : {checkNum:checkNum},
		success : function(data){
			$('a[href=\'#'+languageNum+'Tab\']').trigger('click');
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
* @함수명 : checkListAdd(obj)
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 추가버튼을 클릭했을 때 실행되며, 체크리스트가 뿌려진 해당 테이블 가장 밑에
* 		tr과 td안에 카테고리 text 박스와 내용 text 박스, 생성 버튼을 append 해 준다. 
* @param obj - 클릭된 자신태그 (추가버튼 this)  
**/
function checkListAdd(obj){
	var content = '<tbody><tr><td>생성중</td>'
				+ '<td><input class="inputtext" type="text" placeholder="카테고리 입력하세요"></td>'
				+ '<td colspan="2"><input class="inputtext" type="text" placeholder="내용을 입력하세요"></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="checkListAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

/**
* @함수명 : checkListAddOk(obj)
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 생성버튼 클릭시 실행되며, category text박스와 checkContent text박스 안에 내용이 빈문자열이
* 		아닐 시에 비동기로 체크리스트가 생성되며 다시 체크리스트를 뿌려준다.
* @param obj - 클릭된 자신태그 (생성버튼 this)  
**/
function checkListAddOk(obj){
	var languageNum = $(obj).closest('div').attr('id').substr(0, 4);
	var tr = $(obj).closest('tr');
	var category = tr.children('td:eq(1)').children('input').val();
	var checkContent = tr.children('td:eq(2)').children('input').val();
	if(category != "" && checkContent != "") {
		$.ajax({
			type : "post",
			url  : "checkListAdd",
			datatype:"JSON",
			data : {languageNum:languageNum, category:category.trim(), checkContent:checkContent.trim()},
			success : function(data){
				$('a[href=\'#'+languageNum+'Tab\']').trigger('click');
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
* @함수명 : checkListEdit(obj)
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 수정버튼 클릭시 실행되며, 카테고리 td와 내용 td 만 글을 입력할 수 있는 text 박스로 바꿔준다
* @param obj - 클릭된 자신태그 (수정버튼 this)  
**/
function checkListEdit(obj){
	var tr = $(obj).closest('tr');
	var text1 = tr.children('td:eq(1)').text();
	var text2 = tr.children('td:eq(2)').text();
	var texthtml = '<input class="inputtext" type="text" placeholder="'+text1+'" >';
	var texthtm12 = '<input class="inputtext" type="text" placeholder="'+text2+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html(texthtm12);
	tr.children('td:eq(3)').html('수정중');
	tr.children('td:eq(4)').html('<input type="button" value="완료" class="btn btn-info" onclick="checkListEditOk(this)" />');
}

/**
* @함수명 : checkListEditOk(obj)
* @작성일 : 2018. 06. 20.
* @작성자 : 김 진 원
* @설명 : 수정완료버튼 클릭시 실행되며, category text박스와 checkContent text박스 안에 내용이 빈문자열이
* 		아닐 시에 비동기로 그내용이 수정이되며 다시 체크리스트를 뿌려준다
* @param obj - 클릭된 자신태그 (수정완료버튼 this)  
**/
function checkListEditOk(obj){
	var languageNum = $(obj).closest('div').attr('id').substr(0, 4);
	var tr = $(obj).closest('tr');
	var checkNum = tr.children('td:eq(0)').text();
	var category = tr.children('td:eq(1)').children('input').val();
	var checkContent = tr.children('td:eq(2)').children('input').val();
	if(category != "" && checkContent != "") {
		$.ajax({
			type : "post",
			url  : "checkListEdit",
			datatype:"JSON",
			data : {checkNum:checkNum, category:category.trim(), checkContent:checkContent.trim()},
			success : function(data){
				$('a[href=\'#'+languageNum+'Tab\']').trigger('click');
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
		swal({type: 'warning',title : "내용을 입력하세요"});
	}
}

/**
* @함수명 : skillMenu()
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 기능 메뉴관리를 클릭 할 시 기능 테이블의 있는 내용들을 조회하여 <div id=menuManagement>
* 		테그 안에 테이블형태로 조회한 내용들을 생성해 준다.
**/
function skillMenu(){
	$.ajax({
		type : "post",
		url  : "skillManagement",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table table-hover table-admin-menu">'
						 + '<thead><tr><th>기능넘버</th><th>기능명</th><th>사용여부</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가" onclick="skillAdd(this)"></th></tr></thead>';
			$.each(data.data, function(index, elt) {
				texthtml += '<tbody><tr><td>'+elt.skillNum+'</td>'
						 + '<td>'+elt.skillName+'</td><td>'+elt.skillUse+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="skillEdit(this)" >';
				if(index >= 7) texthtml += '<input type="button" value="삭제" class="btn btn-danger" onclick="skillDel(this)" >';
				texthtml += '</td></tr></tbody>';
			});
			
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
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
* @함수명 : skillDel(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 삭제버튼 클릭시 실행되며, 그 해당 tr에 속해 있는 첫번째 text 즉, 기능넘버를 가져와 비동기로
* 		기능넘버에 해당하는 내용을 삭제한다
* @param obj - 클릭된 자신태그 (삭제버튼 this)  
**/
function skillDel(obj){
	var tr = $(obj).closest('tr');
	var skillNum = tr.children('td:eq(0)').text();
	$.ajax({
		type : "post",
		url  : "skillDel",
		datatype:"JSON",
		data : {skillNum:skillNum},
		success : function(data){
			skillMenu();
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
* @함수명 : skillAdd(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 추가버튼 클릭시 실행되며, 해당 다음 기능넘버와 기능명을 입력할 text 박스와 사용여부를 결정해줄
* 		select option 을 만들어 테이블에 tr과 td들을 append 해준다
* @param obj - 클릭된 자신태그 (추가버튼 this)  
**/
function skillAdd(obj){
	var nextNum = 'S'+(Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text().substr(1))+100);
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input class="inputtext" type="text" placeholder="기능의 이름을 입력하세요"></td>'
				+ '<td><select><option value="0">사용안함</option><option value="1">사용</option></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="skillAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

/**
* @함수명 : skillAddOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 생성버튼 클릭시 실행되며, skillName text가 빈문자열이 아닐 시에 tr에 있는 정보들을 가지고
* 		비동기로 기능을 insert해주고 다시 기능리스트를 뿌려준다.
* @param obj - 클릭된 자신태그 (생성버튼 this)  
**/
function skillAddOk(obj){
	var tr = $(obj).closest('tr');
	var skillNum = tr.children('td:eq(0)').text();
	var skillName = tr.children('td:eq(1)').children('input').val();
	var skillUse = tr.children('td:eq(2)').children('select').children('option:selected').val();
	if(skillName != "") {
		$.ajax({
			type : "post",
			url  : "skillAdd",
			datatype:"JSON",
			data : {skillNum:skillNum, skillName:skillName.trim(), skillUse:skillUse.trim()},
			success : function(data){
				skillMenu();
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
* @함수명 : skillEdit(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정버튼 클릭시 실행되며, 같은 tr안에 td들을 기능명을 입력할 text 박스와 사용여부를 결정해줄
* 		select option 을 만들어 변화 시킨다.
* @param obj - 클릭된 자신태그 (수정버튼 this)  
**/
function skillEdit(obj){
	var tr = $(obj).closest('tr');
	var text1 = tr.children('td:eq(1)').text();
	var text2 = tr.children('td:eq(2)').text();
	var texthtml = '<input class="inputtext" type="text" placeholder="'+text1+'" >';
	var texthtm12 = '<select><option value="0">사용안함</option><option value="1" ';
	if(text2 == '1') texthtm12 += 'selected ';
	texthtm12 += '>사용</option></select>';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html(texthtm12);
	tr.children('td:eq(3)').html('<input type="button" value="완료" class="btn btn-info" onclick="skillEditOk(this)" />');
}

/**
* @함수명 : skillEditOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정완료버튼 클릭시 실행되며, 같은 tr안에 있는 내용들을 가지고 비동기로 수정시켜 뿌려주되
* 		skillName이 빈문자열이 아닐 시에만 실행이 된다.
* @param obj - 클릭된 자신태그 (수정완료버튼 this)  
**/
function skillEditOk(obj){
	var tr = $(obj).closest('tr');
	var skillNum = tr.children('td:eq(0)').text();
	var skillName = tr.children('td:eq(1)').children('input').val();
	var skillUse = tr.children('td:eq(2)').children('select').children('option:selected').val();
	if(skillName != "") {
		$.ajax({
			type : "post",
			url  : "skillEdit",
			datatype:"JSON",
			data : {skillNum:skillNum, skillName:skillName.trim(), skillUse:skillUse.trim()},
			success : function(data){
				skillMenu();
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
* @함수명 : listMenu()
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 리스트 메뉴관리를 클릭 할 시 기능 테이블의 있는 내용들을 조회하여 <div id=menuManagement>
* 		테그 안에 테이블형태로 조회한 내용들을 생성해 준다.
**/
function listMenu(){
	$.ajax({
		type : "post",
		url  : "showList",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table table-hover table-admin-menu">'
						 + '<thead><th>리스트넘버</th><th>리스트명</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가" onclick="listAdd(this)"></th></thead>';
			$.each(data.data, function(index, elt) {
				texthtml += '<tbody><tr><td>'+elt.listNum+'</td>'
						 + '<td>'+elt.listName+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="listEdit(this)" >';
				if(index >= 5) texthtml += '<input type="button" value="삭제" class="btn btn-danger" onclick="listDel(this)" >';
				texthtml += '</td></tr></tbody>';
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
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
* @함수명 : listDel(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 삭제버튼 클릭시 실행되며, 그 해당 tr에 속해 있는 첫번째 text 즉, 리스트넘버를 가져와 비동기로
* 		리스트넘버에 해당하는 내용을 삭제한다
* @param obj - 클릭된 자신태그 (삭제버튼 this)  
**/
function listDel(obj){
	var tr = $(obj).closest('tr');
	var listNum = tr.children('td:eq(0)').text();
	$.ajax({
		type : "post",
		url  : "listDel",
		datatype:"JSON",
		data : {listNum:listNum},
		success : function(data) {
			listMenu();
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
* @함수명 : listAdd(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 추가버튼 클릭시 실행되며, 해당 다음 리스트넘버와 리스트명을 입력할 text 박스를
* 		만들어 테이블에 tr과 td들을 append 해준다
* @param obj - 클릭된 자신태그 (추가버튼 this)  
**/
function listAdd(obj){
	var nextNum = Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text())+1;
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input class="inputtext" type="text" placeholder="기능의 이름을 입력하세요"></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="listAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

/**
* @함수명 : listAddOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 생성버튼 클릭시 실행되며, listName text가 빈문자열이 아닐 시에 tr에 있는 정보들을 가지고
* 		비동기로 기능을 insert해주고 다시 리스트를 뿌려준다.
* @param obj - 클릭된 자신태그 (생성버튼 this)  
**/
function listAddOk(obj){
	var tr = $(obj).closest('tr');
	var listNum = tr.children('td:eq(0)').text();
	var listName = tr.children('td:eq(1)').children('input').val();
	if(listName != "") {
		$.ajax({
			type : "post",
			url  : "listAdd",
			datatype:"JSON",
			data : {listNum:listNum, listName:listName.trim()},
			success : function(data){
				listMenu();
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
* @함수명 : listEdit(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정버튼 클릭시 실행되며, 같은 tr안에 td들을 리스트명을 입력할 text 박스를 만들어 변화 시킨다.
* @param obj - 클릭된 자신태그 (수정버튼 this)  
**/
function listEdit(obj){
	var tr = $(obj).closest('tr');
	var text = tr.children('td:eq(1)').text();
	var texthtml = '<input class="inputtext" type="text" placeholder="'+text+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html('<input type="button" value="완료" class="btn btn-info" onclick="listEditOk(this)" />');
}

/**
* @함수명 : listEditOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정완료버튼 클릭시 실행되며, 같은 tr안에 있는 내용들을 가지고 비동기로 수정시켜 뿌려주되
* 		listName이 빈문자열이 아닐 시에만 실행이 된다.
* @param obj - 클릭된 자신태그 (수정완료버튼 this)  
**/
function listEditOk(obj){
	var tr = $(obj).closest('tr');
	var listNum = tr.children('td:eq(0)').text();
	var listName = tr.children('td:eq(1)').children('input').val();
	if(listName != "") {
		$.ajax({
			type : "post",
			url  : "listEdit",
			datatype:"JSON",
			data : {listNum:listNum, listName:listName.trim()},
			success : function(data){
				listMenu();
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
* @함수명 : languageMenu()
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 언어 메뉴관리를 클릭 할 시 기능 테이블의 있는 내용들을 조회하여 <div id=menuManagement>
* 		테그 안에 테이블형태로 조회한 내용들을 생성해 준다.
**/
function languageMenu(){
	$.ajax({
		type : "post",
		url  : "languageColorAllList",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table table-hover table-admin-menu">'
						 + '<thead><th>언어넘버</th><th>주언어</th><th>언어색상</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가" onclick="languageAdd(this)" ></th></thead>';
			$.each(data.list, function(index, elt) {
				texthtml += '<tbody><tr><td>'+elt.languageNum+'</td>'
						 + '<td>'+elt.languageMain+'</td><td>'+elt.languageColor+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="languageEdit(this)" >';
				if(index >= 10) texthtml += '<input type="button" value="삭제" class="btn btn-danger" onclick="languageDel(this)" >'
				texthtml += '</td></tr></tbody>';
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
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
* @함수명 : languageDel(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 삭제버튼 클릭시 실행되며, 그 해당 tr에 속해 있는 첫번째 text 즉, 언어넘버를 가져와 비동기로
* 		언어넘버에 해당하는 내용을 삭제한다
* @param obj - 클릭된 자신태그 (삭제버튼 this)  
**/
function languageDel(obj){
	var tr = $(obj).closest('tr');
	var languageNum = tr.children('td:eq(0)').text();
	$.ajax({
		type : "post",
		url  : "languageDel",
		datatype:"JSON",
		data : {languageNum:languageNum},
		success : function(data){
			languageMenu();
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
* @함수명 : languageAdd(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 추가버튼 클릭시 실행되며, 해당 다음 언어넘버와 언어명을 입력할 text 박스와 color를
* 		선택할 color 박스를 만들어 테이블에 tr과 td들을 append 해준다
* @param obj - 클릭된 자신태그 (추가버튼 this)  
**/
function languageAdd(obj){
	var num = (Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text().substr(1))+1);
	var nextNum = '';
	if(num >= 100) nextNum = 'L'+num;
	else if(num < 100 && num >= 10) nextNum = 'L0'+num;
	else nextNum = 'L00'+num;
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input class="inputtext" type="text" placeholder="언어의 이름을 입력하세요" ></td>'
				+ '<td><input type="color" value="#555" ></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="languageAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

/**
* @함수명 : languageAddOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 생성버튼 클릭시 실행되며, languageMain, languageColor text가 빈문자열이 아닐 시에 tr에 있는 정보들을 가지고
* 		비동기로 기능을 insert해주고 다시 언어리스트를 뿌려준다.
* @param obj - 클릭된 자신태그 (생성버튼 this)  
**/
function languageAddOk(obj){
	var tr = $(obj).closest('tr');
	var languageNum = tr.children('td:eq(0)').text();
	var languageMain = tr.children('td:eq(1)').children('input').val();
	var languageColor = tr.children('td:eq(2)').children('input').val();
	if(languageMain != "" && languageColor != "") {
		$.ajax({
			type : "post",
			url  : "languageAdd",
			datatype:"JSON",
			data : {languageNum:languageNum, languageMain:languageMain.trim(), languageColor:languageColor.trim()},
			success : function(data){
				languageMenu();
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
* @함수명 : languageEdit(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정버튼 클릭시 실행되며, 같은 tr안에 td들을 언어명을 입력할 text 박스와 와 color를
* 		선택할 color 박스를 만들어 변화 시킨다.
* @param obj - 클릭된 자신태그 (수정버튼 this)  
**/
function languageEdit(obj){
	var tr = $(obj).closest('tr');
	var text = tr.children('td:eq(1)').text();
	var text2 = tr.children('td:eq(2)').text();
	var texthtml = '<input class="inputtext" type="text" placeholder="'+text+'" >';
	var texthtml2 = '<input type="color" value="'+text2+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html(texthtml2);
	tr.children('td:eq(3)').html('<input type="button" value="완료" class="btn btn-info" onclick="languageEditOk(this)" />');
}

/**
* @함수명 : languageEditOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정완료버튼 클릭시 실행되며, 같은 tr안에 있는 내용들을 가지고 비동기로 수정시켜 뿌려주되
* 		languageMain과 languageColor이 빈문자열이 아닐 시에만 실행이 된다.
* @param obj - 클릭된 자신태그 (수정완료버튼 this)  
**/
function languageEditOk(obj){
	var tr = $(obj).closest('tr');
	var languageNum = tr.children('td:eq(0)').text();
	var languageMain = tr.children('td:eq(1)').children('input').val();
	var languageColor = tr.children('td:eq(2)').children('input').val();
	if(languageMain != "" && languageColor != "") {
		$.ajax({
			type : "post",
			url  : "languageEdit",
			datatype:"JSON",
			data : {languageNum:languageNum, languageMain:languageMain.trim(), languageColor:languageColor.trim()},
			success : function(data){
				languageMenu();
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
* @함수명 : userGradeMenu()
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 등급 메뉴관리를 클릭 할 시 기능 테이블의 있는 내용들을 조회하여 <div id=menuManagement>
* 		테그 안에 테이블형태로 조회한 내용들을 생성해 준다.
**/
function userGradeMenu(){
	$.ajax({
		type : "post",
		url  : "userGradeManagement",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table table-hover table-admin-menu">'
						 + '<thead><th>등급넘버</th><th>등급명</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가" onclick="userGradeAdd(this)" ></th></thead>';
			$.each(data.data, function(index, elt) {
				texthtml += '<tbody><tr><td>'+elt.gradeNum+'</td>'
						 + '<td>'+elt.gradeName+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="userGradeEdit(this)" >';
				if(index >= 5) texthtml += '<input type="button" value="삭제" class="btn btn-danger" onclick="userGradeDel(this)" >';
				texthtml += '</td></tr></tbody>';
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
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
* @함수명 : userGradeDel(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 삭제버튼 클릭시 실행되며, 그 해당 tr에 속해 있는 첫번째 text 즉, 등급넘버를 가져와 비동기로
* 		등급넘버에 해당하는 내용을 삭제한다
* @param obj - 클릭된 자신태그 (삭제버튼 this)  
**/
function userGradeDel(obj){
	var tr = $(obj).closest('tr');
	var gradeNum = tr.children('td:eq(0)').text();
	$.ajax({
		type : "post",
		url  : "userGradeDel",
		datatype:"JSON",
		data : {gradeNum:gradeNum},
		success : function(data){
			userGradeMenu();
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
* @함수명 : userGradeAdd(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 추가버튼 클릭시 실행되며, 해당 다음 등급넘버와 등급명을 입력할 text 박스를
* 		만들어 테이블에 tr과 td들을 append 해준다
* @param obj - 클릭된 자신태그 (추가버튼 this)  
**/
function userGradeAdd(obj){
	var nextNum = 'G'+(Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text().substr(1))+100);
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input class="inputtext" type="text" placeholder="등급의 이름을 입력하세요"></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="userGradeAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

/**
* @함수명 : skillAddOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 생성버튼 클릭시 실행되며, gradeName text가 ROLE_ 으로 시작할 시에 tr에 있는 정보들을 가지고
* 		비동기로 기능을 insert해주고 다시 기능리스트를 뿌려준다.
* @param obj - 클릭된 자신태그 (생성버튼 this)  
**/
function userGradeAddOk(obj){
	var tr = $(obj).closest('tr');
	var gradeNum = tr.children('td:eq(0)').text();
	var gradeName = tr.children('td:eq(1)').children('input').val();
	if(gradeName.substr(0, 5) == 'ROLE_') {
		$.ajax({
			type : "post",
			url  : "userGradeAdd",
			datatype:"JSON",
			data : {gradeNum:gradeNum, gradeName:gradeName.trim()},
			success : function(data){
				userGradeMenu();
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
		swal({type: 'warning',title:"ROLE_로 시작하지 않습니다."});
	}
}

/**
* @함수명 : skillEdit(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정버튼 클릭시 실행되며, 같은 tr안에 td들을 등급명을 입력할 text 박스를 만들어 변화 시킨다.
* @param obj - 클릭된 자신태그 (수정버튼 this)  
**/
function userGradeEdit(obj){
	var tr = $(obj).closest('tr');
	var text = tr.children('td:eq(1)').text();
	var texthtml = '<input class="inputtext" type="text" placeholder="'+text+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html('<input type="button" value="완료" class="btn btn-info" onclick="userGradeEditOk(this)" />');
}

/**
* @함수명 : skillEditOk(obj)
* @작성일 : 2018. 06. 18.
* @작성자 : 김 진 원
* @설명 : 수정완료버튼 클릭시 실행되며, 같은 tr안에 있는 내용들을 가지고 비동기로 수정시켜 뿌려주되
* 		gradeName이 ROLE_ 으로 시작할 때 시에만 실행이 된다.
* @param obj - 클릭된 자신태그 (수정완료버튼 this)  
**/
function userGradeEditOk(obj){
	var tr = $(obj).closest('tr');
	var gradeNum = tr.children('td:eq(0)').text();
	var gradeName = tr.children('td:eq(1)').children('input').val();
	if(gradeName.substr(0, 5) == 'ROLE_') {
		$.ajax({
			type : "post",
			url  : "userGradeEdit",
			datatype:"JSON",
			data : {gradeNum:gradeNum, gradeName:gradeName.trim()},
			success : function(data){
				userGradeMenu();
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
		swal({type: 'warning',title:"ROLE_로 시작하지 않습니다."});
	}
}