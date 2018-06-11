<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="modal fade" id="myModal2" role="dialog">
	<div class="modal-dialog modal-lg">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 id="modalHeader" class="modal-title"></h4>
			</div>
			
			<input type="hidden" id="hiddenCardNum">
			
			<div class="modal-body container">
				<div class="flex2">
					<div class="form-group">
					<h3>프로젝트제목입력:</h3>
					<input id ="ProjectName" type="text">
					<br>
					<input type="radio" name="language" value="L001">JAVA<br>
					<input type="radio" name="language" value="L002">C#<br>
					<input type="radio" name="language" value="L003">C<br>
					<input type="radio" name="language" value="L004">Ruby<br>
					<input type="radio" name="language" value="L005">Python<br>
					<input type="radio" name="language" value="L006">GO<br>
					<input type="radio" name="language" value="L007">ASP<br>
					<input type="radio" name="language" value="L008">Visual+Basic<br>
					<input type="radio" name="language" value="L009">PHP<br>
					<input type="radio" name="language" value="L010">JavaScript<br>
					</div>
					<input id="addProject" class="btn btn-success" type="button" onclick="addProject()" value="생성">
					<input id="cancleProject" class="btn btn-danger" data-dismiss="modal" type="button" value="취소">		

				</div>
			</div>
		</div>
	</div>
</div>

