/**
* @함수명 : fncTegSplit(str,pnum)
* @작성일 : 2018. 07. 1.
* @작성자 : 배현준
* @설명 : 태그 값을 불러와 ',' 단위로 잘라서 tag버튼들을 생성하는 스크립트.
* @param str - 태그들   
* @param pnum - 프로젝트넘버  
**/
function fncTegSplit(str,pnum){

	var result='';
	var split = str.split(',');
	var i  = 0;

	for( i; i<split.length; i++ ){
		switch(i){
			case 0:
				result += "<a href='searchAct?countPerPage=5&blockCount=5&nowPage=1&search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-primary'>#";
				break;
			case 1:
				result += "<a href='searchAct?countPerPage=5&blockCount=5&nowPage=1&search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-success'>#";
				break;
			case 2:
				result += "<a href='searchAct?countPerPage=5&blockCount=5&nowPage=1&search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-info'>#";
				break;
			case 3:
				result += "<a href='searchAct?countPerPage=5&blockCount=5&nowPage=1&search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-warning'>#";
				break;
			case 4:
				result += "<a href='searchAct?countPerPage=5&blockCount=5&nowPage=1&search="+split[i]+"&type=tag&projectNum="+pnum+"'><span class='label label-danger'>#";
				break;
		}
 		result += split[i];
 		result += "</span></a>&nbsp&nbsp";
 		
	}
	
	document.write(result);	
}

/**
* @함수명 : fncTegSplit(str,pnum)
* @작성일 : 2018. 07. 1.
* @작성자 : 배현준
* @설명 : 전체 트러블슈팅, 태그 값을 불러와 ',' 단위로 잘라서 tag버튼들을 생성하는 스크립트.
* @param str - 태그들     
**/
function fncTegSplitAll(str){

	var result='';
	var split = str.split(',');
	var i  = 0;

	for( i; i<split.length; i++ ){
		switch(i){
			case 0:
				result += "<a href='searchTag?countPerPage=5&blockCount=5&nowPage=1&searchTag="+split[i]+"'><span class='label label-primary'>#";
				break;
			case 1:
				result += "<a href='searchTag?countPerPage=5&blockCount=5&nowPage=1&searchTag="+split[i]+"'><span class='label label-success'>#";
				break;
			case 2:
				result += "<a href='searchTag?countPerPage=5&blockCount=5&nowPage=1&searchTag="+split[i]+"'><span class='label label-info'>#";
				break;
			case 3:
				result += "<a href='searchTag?countPerPage=5&blockCount=5&nowPage=1&searchTag="+split[i]+"'><span class='label label-warning'>#";
				break;
			case 4:
				result += "<a href='searchTag?countPerPage=5&blockCount=5&nowPage=1&searchTag="+split[i]+"'><span class='label label-danger'>#";
				break;
		}
 		result += split[i];
 		result += "</span></a>&nbsp&nbsp";
 		
	}
	
	document.write(result);	
}