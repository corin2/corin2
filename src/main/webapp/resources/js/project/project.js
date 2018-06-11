function addProject() {
	console.log($("#ProjectName").val);
	var radioVal = $('input[name="language"]:checked').val();
	$.ajax({
		url:"projectInsert",
		datatype:"JSON",
		data:{projectName:$("#ProjectName").val(), languageNum:radioVal},
		success:function(data){
			console.log("등록이다")
		}
		
	})
}