<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
  .carousel-inner > .item > img,
  .carousel-inner > .item > a > img {
      width: 70%;
      margin: auto;
  }
</style>
	
<div class="modal fade" id="myModalca" role="dialog">
<div class="container">
  <br>
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">

      <div class="item active">
        <img src="resources/images/makeperson/낙곱새.jpg" alt="Chania" width="460" height="345">
        <div class="carousel-caption">
          <h3>즐거운회식</h3>
        </div>
      </div>

      <div class="item">
        <img src="resources/images/makeperson/열심히코딩.jpg" alt="Chania" width="460" height="345">
        <div class="carousel-caption">
          <h3>코딩하는 우리들</h3>
        </div>
      </div>
    
      <div class="item">
        <img src="resources/images/makeperson/회의열심.jpg" alt="Flower" width="460" height="345">
        <div class="carousel-caption">
          <h3>회의하는 우리들</h3>
        </div>
      </div>
<!-- 
      <div class="item">
        <img src="img_flower2.jpg" alt="Flower" width="460" height="345">
        <div class="carousel-caption">
          <h3>Flowers</h3>
          <p>Beautiful flowers in Kolymbari, Crete.</p>
        </div>
      </div> -->
  
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
</div>

