<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<link rel="stylesheet" href="resources/css/leancanvas/leancanvas.css">
	<script src="resources/js/leancanvas/leancanvas.js"></script>


<div class="container-fluid leantain">
	<div id="leanheader">
	<h2 class="leanh2"><input type="text" id="leanTeamName" placeholder="팀명을 입력하세요" class="search"></h2>
	<br>
	 <input type="button" value="save" class="btn btn-success" onclick="insertLean()" style="float: right; margin-right: 8%">
	 <br>
	 <br>
	 </div>
	   <div class="row">
	       <div class="col-sm-1"></div>
	       <div class="col-sm-2 leanheight2 leanh2"><h4>문제</h4>
	       	<p class="candivsize" id="problem">
	       		<a class="leanatag" onclick="problemClick('problem')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight leanh2"><h4>솔루션</h4>
	       	<p class="candivsize" id="solution">
	       		<a class="leanatag" onclick="problemClick('solution')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight2 leanh2"><h4>고유의가치제안</h4>
	       	<p class="candivsize" id="uniquevalue">
	       		<a class="leanatag" onclick="problemClick('uniquevalue')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight leanh2"><h4>경쟁우위</h4>
	       	<p class="candivsize" id="compettive">
	       		<a class="leanatag" onclick="problemClick('compettive')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight2 leanh2"><h4>고객군</h4>
	       	<p class="candivsize" id="customer">
	       		<a class="leanatag" onclick="problemClick('customer')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-1"></div>
	   </div>
	   <div class="row">
	       <div class="col-sm-1"></div>
	       <div class="col-sm-2 leanheight3 leanh2"><h4>기존대안</h4>
	       	<p class="candivsize" id="alternatives">
	       		<a class="leanatag" onclick="problemClick('alternatives')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight leanh2"><h4>핵심지표</h4>
	       	<p class="candivsize" id="mainpoint">
	       		<a class="leanatag" onclick="problemClick('mainpoint')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight3 leanh2"><h4>상위개념</h4>
	       	<p class="candivsize" id="parentconcept">
	       		<a class="leanatag" onclick="problemClick('parentconcept')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight leanh2"><h4>채널</h4>
	       	<p class="candivsize" id="channel">
	       		<a class="leanatag" onclick="problemClick('channel')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight3 leanh2"><h4>얼리어답터</h4>
	       	<p class="candivsize" id="earlyadopter">
	       		<a class="leanatag" onclick="problemClick('earlyadopter')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-1"></div>
	   </div>
	   <div class="row">
	       <div class="col-sm-1"></div>
	       <div class="col-sm-5 leanheight leanh2"><h4>비용구조</h4>
	       	<p class="candivsize" id="coststructuer">
	       		<a class="leanatag" onclick="problemClick('coststructuer')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-5 leanheight leanh2"><h4>수익원</h4>
	       	<p class="candivsize" id="profit">
	       		<a class="leanatag" onclick="problemClick('profit')">add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-1"></div>
	   </div>
</div>