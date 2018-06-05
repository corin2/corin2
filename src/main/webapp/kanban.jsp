<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>칸반보드</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<link rel="stylesheet" href="resources/css/kanban.css">
<link rel="stylesheet" href="resources/css/jquery.mCustomScrollbar.css">
<script src="resources/js/kanban.js"></script>
<jsp:include page="carddetail.jsp"></jsp:include>


</head>
<body>
	<div class="content-wrapper">
		<div id="mainScreen" class="container-fluid" scrollTop="5px">
			<h2 id='boardTitle'>칸반보드</h2>
			<hr>
			<div id="content-md">
			
				<div class="kanbanbox">
					<div class="listtitle"><label>BACKLOG</label></div>
					
					<div class="listbox">
						<div>
							<div class="card ui-sortable-handle" data-toggle="modal" data-target="#myModal">
								카드
								<button type="button" class="close">&times;</button>
							</div>
						</div>
						
						<div>
							<div class="card ui-sortable-handle" data-toggle="modal" data-target="#myModal">
								카드2
								<button type="button" class="close">&times;</button>
							</div>
						</div>
						
						<a class="cardcreate" onclick="addCardView(this)">Add a card...</a>
					</div>
				</div>
				
				<div>
					<div class="userbox">
						<div class="listtitle" style="float: left;"><label>구분</label></div>
						<div class="userprofilebox">지너니</div>
						<div class="userprofilebox">재욱짱</div>
						<div class="userprofilebox">지너니</div>
						<div class="userprofilebox">재욱짱</div>
					</div>
						
					<div class="kanbanbox">
						<div class="listtitle" style="float: left;"><label>TODO</label></div>
						<div class="listingbox"></div>
						<div class="listingbox"></div>
						<div class="listingbox"></div>
						<div class="listingbox"></div>
					</div>
					
					<div class="kanbanbox">
						<div class="listtitle" style="float: left;"><label>INPROGRESS</label></div>
						<div class="listingbox"></div>
						<div class="listingbox"></div>
						<div class="listingbox"></div>
						<div class="listingbox"></div>
					</div>
					
					<div class="kanbanbox">
						<div class="listtitle" style="float: left;"><label>DONE</label></div>
						<div class="donebox"></div>
						<div class="donebox"></div>
						<div class="donebox"></div>
						<div class="donebox"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>