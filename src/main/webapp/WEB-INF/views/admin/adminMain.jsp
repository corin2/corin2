<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<link rel="stylesheet" type="text/css" href="resources/css/admin/adminMain.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script> <!-- Chart JS -->
<script src="resources/js/chart/echarts.min.js"></script> <!-- ECharts -->
<script src="https://code.highcharts.com/highcharts.js"></script> <!-- highcharts -->
<script src="https://code.highcharts.com/modules/wordcloud.js"></script> <!-- highcharts: wordcloud -->
<script src= "https://cdn.zingchart.com/zingchart.min.js"></script> <!-- zingchart -->
<script> zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/";
ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9","ee6b7db5b51705a13dc2339db3edaf6d"];</script>

<!-- [js] adminMain -->
<script src="resources/js/admin/adminMain.js"></script>

<div class="row adminmaindiv">
	<!-- [1번째 단] -->
	<div class="col-sm-8 first-row">
		<!-- 방문자 수 -->
		<div class="row">
			<div class="admin-chart-box col-sm-4 adminmainpage">
				<div class="row adminmainpageundo">
					<div class="admin-icon col-md-4 eye-open" style="height:100px;">
						<i class="glyphicon glyphicon-eye-open adminmainglyphi"></i>
					</div>
					<div class="col-md-7 adminmainfirstrow">
						<div class="row">
							<div class="col-md-12">
								<h2>방문자</h2>
								<h1 id="allVisitCountResult"></h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		<!-- 회원 수 -->
			<div class="admin-chart-box col-sm-4 adminmainpage">
				<div class="row adminmainpageundo">
					<div class="admin-icon col-md-4 usercount" style="height:100px;">
						<i class="glyphicon glyphicon-user adminmainglyphi"></i>
					</div>
					<div class="col-md-7 adminmainfirstrow">
						<div class="row">
							<div class="col-md-12">
								<h2>회원</h2>
								<h1 id="allUserCountResult"></h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		<!-- 프로젝트 수 -->
			<div class="admin-chart-box col-sm-4 adminmainpage">
				<div class="row adminmainpageundo">
					<div class="admin-icon col-md-4 th-large" style="height:100px;">
						<i class="glyphicon glyphicon-th-large adminmainglyphi"></i>
					</div>
					<div class="col-md-7 adminmainfirstrow">
						<div class="row">
							<div class="col-md-12">
								<h2>프로젝트</h2>
								<h1 id="allProjectCountResult"></h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="row">
		<!-- 통계 -->
			<div class="admin-chart-box col-sm-12 adminmainpage">
				<div class="row adminmainpageundo">
					<h2>통계</h2>
					<hr class="hr-style">
					<div id="stats" style="width: 94%;height:450PX;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- [2번째 단] -->
	<div class="col-sm-4 second-row">
		<div class="row">
			<!-- 프로그래밍별 언어 순위-->
			<div class="admin-chart-box col-sm-12 adminmainpage">
				<div class="row adminmainpageundo">
					<h2>프로젝트별  언어 순위</h2>
					<hr class="hr-style">
					<div id="languageRank" style="width: 94%;height:291px;"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<!-- 회원 이메일 순위 -->
			<div class="admin-chart-box col-sm-12 adminmainpage">
				<div class="row adminmainpageundo">
					<h2>회원 이메일 순위</h2>
					<hr class="hr-style">
					<div id="emailRank" style="width: 94%;height:291px;"></div>
				</div>
			</div>
		</div>
	</div>
</div>
