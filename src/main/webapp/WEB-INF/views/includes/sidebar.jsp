<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>

<%-- <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


<script src="resources/js/msg/inviteMsg.js"></script>
<script src="resources/js/msg/msgSocket.js"></script>
<script src="resources/js/keyUp.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
<script src="resources/js/header/headerSocket.js"></script>

<input type="hidden" id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" > --%>

<div class="navbar nav_title" style="border: 0;">
  <a href="index.html" class="site_title"><i class="fa fa-paw"></i> <span>Gentellela Alela!</span></a>
</div>
<div class="clearfix"></div>

<!-- menu prile quick info -->
<div class="profile">
  <div class="profile_pic">
    <img src="images/img.jpg" alt="..." class="img-circle profile_img">
  </div>
  <div class="profile_info">
    <span>Welcome,</span>
    <h2>John Doe</h2>
  </div>
</div>
<!-- /menu prile quick info -->

<br />

<!-- sidebar menu -->
<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

  <div class="menu_section">
    <h3>General</h3>
    <ul class="nav side-menu">
      <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="index.html">Dashboard</a>
          </li>
          <li><a href="index2.html">Dashboard2</a>
          </li>
          <li><a href="index3.html">Dashboard3</a>
          </li>
        </ul>
      </li>
      <li><a><i class="fa fa-edit"></i> Forms <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="form.html">General Form</a>
          </li>
          <li><a href="form_advanced.html">Advanced Components</a>
          </li>
          <li><a href="form_validation.html">Form Validation</a>
          </li>
          <li><a href="form_wizards.html">Form Wizard</a>
          </li>
          <li><a href="form_upload.html">Form Upload</a>
          </li>
          <li><a href="form_buttons.html">Form Buttons</a>
          </li>
        </ul>
      </li>
      <li><a><i class="fa fa-desktop"></i> UI Elements <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="general_elements.html">General Elements</a>
          </li>
          <li><a href="media_gallery.html">Media Gallery</a>
          </li>
          <li><a href="typography.html">Typography</a>
          </li>
          <li><a href="icons.html">Icons</a>
          </li>
          <li><a href="glyphicons.html">Glyphicons</a>
          </li>
          <li><a href="widgets.html">Widgets</a>
          </li>
          <li><a href="invoice.html">Invoice</a>
          </li>
          <li><a href="inbox.html">Inbox</a>
          </li>
          <li><a href="calender.html">Calender</a>
          </li>
        </ul>
      </li>
      <li><a><i class="fa fa-table"></i> Tables <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="tables.html">Tables</a>
          </li>
          <li><a href="tables_dynamic.html">Table Dynamic</a>
          </li>
        </ul>
      </li>
      <li><a><i class="fa fa-bar-chart-o"></i> Data Presentation <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="chartjs.html">Chart JS</a>
          </li>
          <li><a href="chartjs2.html">Chart JS2</a>
          </li>
          <li><a href="morisjs.html">Moris JS</a>
          </li>
          <li><a href="echarts.html">ECharts </a>
          </li>
          <li><a href="other_charts.html">Other Charts </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="menu_section">
    <h3>Live On</h3>
    <ul class="nav side-menu">
      <li><a><i class="fa fa-bug"></i> Additional Pages <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="e_commerce.html">E-commerce</a>
          </li>
          <li><a href="projects.html">Projects</a>
          </li>
          <li><a href="project_detail.html">Project Detail</a>
          </li>
          <li><a href="contacts.html">Contacts</a>
          </li>
          <li><a href="profile.html">Profile</a>
          </li>
        </ul>
      </li>
      <li><a><i class="fa fa-windows"></i> Extras <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="page_404.html">404 Error</a>
          </li>
          <li><a href="page_500.html">500 Error</a>
          </li>
          <li><a href="plain_page.html">Plain Page</a>
          </li>
          <li><a href="login.html">Login Page</a>
          </li>
          <li><a href="pricing_tables.html">Pricing Tables</a>
          </li>

        </ul>
      </li>
      <li><a><i class="fa fa-laptop"></i> Landing Page <span class="label label-success pull-right">Coming Soon</span></a>
      </li>
    </ul>
  </div>

</div>
<!-- /sidebar menu -->
