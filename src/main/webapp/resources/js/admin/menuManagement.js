$(function(){
	
});

//skillMenu 뿌려주기
function skillMenu(){
	$.ajax({
		type : "post",
		url  : "skillManagement",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table  table-striped table-bordered table-hover">'
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
		}
	});
}

//기능 삭제
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
		}
	});
}

//기능 생성하는 박스 생성
function skillAdd(obj){
	var nextNum = 'S'+(Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text().substr(1))+100);
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input type="text" placeholder="기능의 이름을 입력하세요"></td>'
				+ '<td><select><option value="0">사용안함</option><option value="1">사용</option></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="skillAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

//기능 생성
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
			}
		});
	}else{
		alert("내용을 입력하세요");
	}
}

//기능 수정하는 박스 생성
function skillEdit(obj){
	var tr = $(obj).closest('tr');
	var text1 = tr.children('td:eq(1)').text();
	var text2 = tr.children('td:eq(2)').text();
	var texthtml = '<input type="text" placeholder="'+text1+'" >';
	var texthtm12 = '<select><option value="0">사용안함</option><option value="1" ';
	if(text2 == '1') texthtm12 += 'selected ';
	texthtm12 += '>사용</option></select>';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html(texthtm12);
	tr.children('td:eq(3)').html('<input type="button" value="완료" class="btn btn-info" onclick="skillEditOk(this)" />');
}

//기능 수정
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
			}
		});
	}else{
		alert("내용을 입력하세요");
	}
}

//listMenu 뿌려주기
function listMenu(){
	$.ajax({
		type : "post",
		url  : "showList",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table  table-striped table-bordered table-hover">'
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
		}
	});
}

//리스트 삭제
function listDel(obj){
	var tr = $(obj).closest('tr');
	var listNum = tr.children('td:eq(0)').text();
	$.ajax({
		type : "post",
		url  : "listDel",
		datatype:"JSON",
		data : {listNum:listNum},
		success : function(data){
			listMenu();
		}
	});
}

//리스트 생성하는 박스 생성
function listAdd(obj){
	var nextNum = Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text())+1;
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input type="text" placeholder="기능의 이름을 입력하세요"></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="listAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

//리스트 생성
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
			}
		});
	}else{
		alert("내용을 입력하세요");
	}
}

//리스트 수정하는 박스 생성
function listEdit(obj){
	var tr = $(obj).closest('tr');
	var text = tr.children('td:eq(1)').text();
	var texthtml = '<input type="text" placeholder="'+text+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html('<input type="button" value="완료" class="btn btn-info" onclick="listEditOk(this)" />');
}

//리스트 수정
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
			}
		});
	}else{
		alert("내용을 입력하세요");
	}
}

//languageMenu 뿌려주기
function languageMenu(){
	$.ajax({
		type : "post",
		url  : "languageColorAllList",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table  table-striped table-bordered table-hover">'
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
		}
	});
}

//언어 삭제
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
		}
	});
}

//언어 생성하는 박스 생성
function languageAdd(obj){
	var num = (Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text().substr(1))+1);
	var nextNum = '';
	if(num >= 100) nextNum = 'L'+num;
	else if(num < 100 && num >= 10) nextNum = 'L0'+num;
	else nextNum = 'L00'+num;
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input type="text" placeholder="기능의 이름을 입력하세요" ></td>'
				+ '<td><input type="color" value="#555" ></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="languageAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

//언어 생성
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
			}
		});
	}else{
		alert("내용을 입력하세요");
	}
}

//언어 수정하는 박스 생성
function languageEdit(obj){
	var tr = $(obj).closest('tr');
	var text = tr.children('td:eq(1)').text();
	var text2 = tr.children('td:eq(2)').text();
	var texthtml = '<input type="text" placeholder="'+text+'" >';
	var texthtml2 = '<input type="color" value="'+text2+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html(texthtml2);
	tr.children('td:eq(3)').html('<input type="button" value="완료" class="btn btn-info" onclick="languageEditOk(this)" />');
}

//언어 수정
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
			}
		});
	}else{
		alert("내용을 입력하세요");
	}
}

//userGradeMenu 뿌려주기
function userGradeMenu(){
	$.ajax({
		type : "post",
		url  : "userGradeManagement",
		datatype:"JSON",
		success : function(data){
			$('#menuManagement').empty();
			
			var texthtml = '<table class="table  table-striped table-bordered table-hover">'
						 + '<thead><th>등급넘버</th><th>등급명</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가" onclick="userGradeAdd(this)" ></th></thead>';
			$.each(data.data, function(index, elt) {
				texthtml += '<tbody><tr><td>'+elt.gradeNum+'</td>'
						 + '<td>'+elt.gradeName+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="userGradeEdit(this)" >';
				if(index >= 4) texthtml += '<input type="button" value="삭제" class="btn btn-danger" onclick="userGradeDel(this)" >';
				texthtml += '</td></tr></tbody>';
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
		}
	});
}

//유저등급 삭제
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
		}
	});
}

//유저등급 생성하는 박스 생성
function userGradeAdd(obj){
	var nextNum = 'G'+(Number($(obj).closest('table').children('tbody:last').children('tr').children('td:first').text().substr(1))+100);
	var content = '<tbody><tr><td>'+nextNum+'</td>'
				+ '<td><input type="text" placeholder="기능의 이름을 입력하세요"></td>'
				+ '<td><input class="btn btn-primary" type="button" value="생성" onclick="userGradeAddOk(this)"></td></tr></tbody>';
	$(obj).closest('table').append(content);
	$(obj).closest('th').html("생성중");
}

//유저등급 생성
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
			}
		});
	}else{
		alert("ROLE_로 시작하지 않습니다.");
	}
}

//유저등급 수정하는 박스 생성
function userGradeEdit(obj){
	var tr = $(obj).closest('tr');
	var text = tr.children('td:eq(1)').text();
	var texthtml = '<input type="text" placeholder="'+text+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html('<input type="button" value="완료" class="btn btn-info" onclick="userGradeEditOk(this)" />');
}

//유저등급 수정
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
			}
		});
	}else{
		alert("ROLE_로 시작하지 않습니다.");
	}
}