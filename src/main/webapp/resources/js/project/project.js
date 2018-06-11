function addProject() {
	console.log($("#ProjectName").val);
	var radioVal = $('input[name="language"]:checked').val();
	$.ajax({
		url:"projectInsert",
		datatype:"JSON",
		data:{projectName:$("#ProjectName").val(), languageNum:radioVal},
		success:function(data){
			alert("프로젝트생성성공");
			console.log("등록이다")
		}
		
	})
}