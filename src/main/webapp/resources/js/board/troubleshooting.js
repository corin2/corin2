/**
 * 
 */

//태그 값을 불러와 ',' 단위로 잘라서 tag버튼들을 생성하는 스크립트.
function fncTegSplit(str,pnum){

	var result='';
	var split = str.split(',');
	var i  = 0;

	for( i; i<split.length; i++ ){
		switch(i){
			case 0:
				result += "<a href='searchAct?search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-primary'>#";
				break;
			case 1:
				result += "<a href='searchAct?search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-success'>#";
				break;
			case 2:
				result += "<a href='searchAct?search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-info'>#";
				break;
			case 3:
				result += "<a href='searchAct?search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-warning'>#";
				break;
			case 4:
				result += "<a href='searchAct?search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-danger'>#";
				break;
		}
 		result += split[i];
 		result += "</span></a>&nbsp&nbsp";
 		
	}
	
	document.write(result);	
}