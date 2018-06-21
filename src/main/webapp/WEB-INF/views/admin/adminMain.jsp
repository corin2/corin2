<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<link rel="stylesheet" type="text/css" href="resources/css/admin/adminMain.css">
<style>
	.admin-align-center {
		text-align: center;
	}
	.admin-chart-box {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-top {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-center {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-bottom {
		text-align: center;
		border: 1px solid #E6E9ED;
	}
	.admin-icon {
		font-size: 5em;
		padding: 50px 0;
	    text-align: center;
	}
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script> <!-- Chart JS -->
<script src="resources/js/chart/echarts.min.js"></script> <!-- ECharts -->
<script src="https://code.highcharts.com/highcharts.js"></script> <!-- highcharts -->
<script src="https://code.highcharts.com/modules/wordcloud.js"></script> <!-- highcharts: wordcloud -->
<!-- [js] adminMain -->
<script src="resources/js/admin/adminMain.js"></script>

<div class="container">
	<!-- [1번째 단] -->
	<div class="row">
		<!-- 방문자 수 -->
		<div class="admin-chart-box col-md-4">
			<div class="row">
				<div class="col-md-8" style="height:200px;">
					<div class="row">
						<div class="col-md-12">
							<h1>방문자</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h1>3,854</h1>
						</div>
					</div>
				</div>
				<div class="admin-icon col-md-4" style="height:200px;">
					<i class="glyphicon glyphicon-eye-open"></i>
				</div>
			</div>
		</div>
		<!-- 회원 수 -->
		<div class="admin-chart-box col-md-4">
			<div class="row">
				<div class="col-md-8" style="height:200px;">
					<div class="row">
						<div class="col-md-12">
							<h1>회원</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h1 id="allUserCountResult">null</h1>
						</div>
					</div>
				</div>
				<div class="admin-icon col-md-4" style="height:200px;">
					<i class="glyphicon glyphicon-user"></i>
				</div>
			</div>
		</div>
		<!-- 프로젝트 수 -->
		<div class="admin-chart-box col-md-4">
			<div class="row">
				<div class="col-md-8" style="height:200px;">
					<div class="row">
						<div class="col-md-12">
							<h1>프로젝트</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h1 id="allProjectCountResult">null</h1>
						</div>
					</div>
				</div>
				<div class="admin-icon col-md-4" style="height:200px;">
					<i class="glyphicon glyphicon-th-large"></i>
				</div>
			</div>
		</div>
	</div>
	<!-- [2번째 단] -->
	<div class="row">
		<!-- 프로그래밍 언어-->
		<div class="admin-chart-box col-md-6">
			<div class="row">
				<h1>프로그래밍 언어</h1>
			</div>
			<div class="row">
				<div id="container"></div>
			</div>
		</div>
		<!-- 회원 이메일 순위 -->
		<div class="admin-chart-box col-md-6">
			<div class="row">
				<h1>회원 이메일 순위</h1>
			</div>
			<div class="row">
				<div id="emailRank" style="width: 100%;height:400px;"></div>
			</div>
		</div>
	</div>
	<!-- [3번째 단] -->
	<div class="row">
		<!-- 통계 -->
		<div class="admin-chart-box col-md-12">
			<div class="row">
				<h1>통계</h1>
			</div>
			<div class="row">
				<div id="stats" style="width: 100%;height:400px;"></div>
			</div>
		</div>
	</div>
	
</div>
