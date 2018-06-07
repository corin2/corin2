
function deleteCard(e,cardNum){
	e.stopPropagation();
	console.log(cardNum)
		$.ajax({
			url:"cardDelete",
			datatype:"JSON",
			data:{cardNum:cardNum},
			success:function(data){
				
				if(data.result==1){
					
					$("#cardNum"+cardNum).remove();
					
				}
				
			}
		});
		
}