<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<link rel="stylesheet" href="resources/css/leancanvas/leancanvas.css">
	<script src="resources/js/leancanvas/leancanvas.js"></script>


<div class="container-fluid leantain leanbackdiv">
	<div id="leanheader">
	<h2 class="leanh2"><input type="text" id="leanTeamName" placeholder="팀명을 입력하세요" class="search"></h2>
	<br>
	 <input type="button" value="save" class="btn btn-success" onclick="insertLean()" style="float: right; margin-right: 8%">
	 <br>
	 <br>
	 </div>
	   <div class="row">
	       <div class="col-sm-1"></div>
	       <div class="col-sm-2 leanheight2 leanh2 background1"><h3><b>문제</b></h3>
	       	<p class="candivsize" id="problem">
	       		<a class="leanatag" onclick="problemClick('problem')">대상고객이 가지고 있는 문제 3가지<br>add..</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight4 leanh2 background4"><h3><b>솔루션</b></h3>
	       	<p class="candivsize" id="solution">
	       		<a class="leanatag" onclick="problemClick('solution')">문제해결을 위한 3가지 대안<br>add..</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight2 leanh2 background3"><h3><b>고유의가치제안</b></h3>
	       	<p class="candivsize" id="uniquevalue">
	       		<a class="leanatag" onclick="problemClick('uniquevalue')">구입해야 하는 이유<br>차별성을 알기 쉽게<br>설득력있는<br>한문장의 메세지<br>add..</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight4 leanh2 background5"><h3><b>경쟁우위</b></h3>
	       	<p class="candivsize" id="compettive">
	       		<a class="leanatag" onclick="problemClick('compettive')">쉽게 복제할 수 없는 강점<br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight2 leanh2 background2"><h3><b>고객군</b></h3>
	       	<p class="candivsize" id="customer">
	       		<a class="leanatag" onclick="problemClick('customer')">타겟고객<br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-1"></div>
	   </div>
	   <div class="row">
	       <div class="col-sm-1"></div>
	       <div class="col-sm-2 leanheight3 leanh2"><h3><b>기존대안</b></h3>
	       	<p class="candivsize" id="alternatives">
	       		<a class="leanatag" onclick="problemClick('alternatives')">이전에 문제를 해결 하기 위해<br> 사용한 것 <br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight5 leanh2 background8"><h3><b>핵심지표</b></h3>
	       	<p class="candivsize" id="mainpoint">
	       		<a class="leanatag" onclick="problemClick('mainpoint')">검증이 필요한 항목 도출 <br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight3 leanh2"><h3><b>상위개념</b></h3>
	       	<p class="candivsize" id="parentconcept">
	       		<a class="leanatag" onclick="problemClick('parentconcept')">만들고자 하는 것에 대한 상위 개념<br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight5 leanh2 background9"><h3><b>채널</b></h3>
	       	<p class="candivsize" id="channel">
	       		<a class="leanatag" onclick="problemClick('channel')">고객 접촉 가능 채널들 <br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-2 leanheight3 leanh2"><h3><b>얼리어답터</b></h3>
	       	<p class="candivsize" id="earlyadopter">
	       		<a class="leanatag" onclick="problemClick('earlyadopter')">누구에게 먼저 서비스를<br> 알릴지를 정한다<br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-1"></div>
	   </div>
	   <div class="row">
	       <div class="col-sm-1"></div>
	       <div class="col-sm-5 leanheight6 leanh2 background7"><h3><b>비용구조</b></h3>
	       	<p class="candivsize" id="coststructuer">
	       		<a class="leanatag" onclick="problemClick('coststructuer')">고객 획득 비용<br>유통 비용<br>서버 유지 비용<br>인건비 등<br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-5 leanheight leanh2 background6"><h3><b>수익원</b></h3>
	       	<p class="candivsize" id="profit">
	       		<a class="leanatag" onclick="problemClick('profit')">수익 창출 모델<br>고객 생애 가치<br>운영 수익<br>add...</a>
	       	</p>
	       </div>
	       <div class="col-sm-1"></div>
	   </div>
</div>