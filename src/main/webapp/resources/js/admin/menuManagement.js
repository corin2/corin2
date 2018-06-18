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
						 + '<tbody><th>기능넘버</th><th>기능명</th><th>사용여부</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가"></th></tbody>';
			$.each(data.data, function(index, elt) {
				texthtml += '<tr><td>'+elt.skillNum+'</td>'
						 + '<td>'+elt.skillName+'</td><td>'+elt.skillUse+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="skillEdit(this)" />';
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
		}
	});
}

//기능 수정하는 박스 생성
function skillEdit(obj){
	var tr = $(obj).closest('tr');
	var text1 = tr.children('td:eq(1)').text();
	var text2 = tr.children('td:eq(2)').text();
	var texthtml = '<input type="text" placeholder="'+text1+'" >';
	var texthtm12 = '<select><option value="0">0</option><option value="1" ';
	if(text2 == '1') texthtm12 += 'selected ';
	texthtm12 += '>1</option></select>';
	
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
						 + '<tbody><th>리스트넘버</th><th>리스트명</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가"></th></tbody>';
			$.each(data.data, function(index, elt) {
				texthtml += '<tr><td>'+elt.listNum+'</td>'
						 + '<td>'+elt.listName+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="listEdit(this)" />';
				if(elt.listNum != '1' && elt.listNum != '2' && elt.listNum != '3' && elt.listNum != '4' && elt.listNum != '5') {
					texthtml += '<input type="button" value="삭제" class="btn btn-danger" onclick="" /></tr>';
				}
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
		}
	});
}

//리스트 수정하는 박스 생성
function listEdit(obj){
	var tr = $(obj).closest('tr');
	var text = tr.children('td:eq(1)').text();
	var texthtml = '<input type="text" placeholder="'+text+'" >';
	
	tr.children('td:eq(1)').html(texthtml);
	tr.children('td:eq(2)').html('<input type="button" value="완료" class="btn btn-info" onclick="listEditOk(this)" />');
}

//기능 수정
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
						 + '<tbody><th>언어넘버</th><th>주언어</th><th>언어색상</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가"></th></tbody>';
			$.each(data.list, function(index, elt) {
				texthtml += '<tr><td>'+elt.languageNum+'</td>'
						 + '<td>'+elt.languageMain+'</td><td>'+elt.languageColor+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="languageEdit(this)" />';
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
		}
	});
}

//리스트 수정하는 박스 생성
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

//기능 수정
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
						 + '<tbody><th>등급넘버</th><th>등급명</th>'
						 + '<th><input class="btn btn-primary" type="button" value="추가"></th></tbody>';
			$.each(data.data, function(index, elt) {
				texthtml += '<tr><td>'+elt.gradeNum+'</td>'
						 + '<td>'+elt.gradeName+'</td>'
						 + '<td><input type="button" value="수정" class="btn btn-info" onclick="" />';
			});
			texthtml += '</table>';
			
			$('#menuManagement').html(texthtml);
		}
	});
}