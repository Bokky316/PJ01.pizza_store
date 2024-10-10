// JavaScript Document

jQuery(document).ready(function () {
  // nav 
  $('.navi>li').mouseover(function () {
    $('.submenu').stop().slideDown(500);
    $('#menu_bg').stop().slideDown(500);
  }).mouseout(function () {
    $('.submenu').stop().slideUp(500);
    $('#menu_bg').stop().slideUp(500);
  });

  // slide
  setInterval(function () {
    $('.slidelist').delay(1500);
    $('.slidelist').animate({ marginLeft: "-100%"});
    $('.slidelist').delay(2000);
    $('.slidelist').animate({  marginLeft: "-200%"});
    $('.slidelist').delay(2000);
    $('.slidelist').animate({ marginLeft: "-300%"});
    $('.slidelist').delay(2000);
    $('.slidelist').animate({ marginLeft: "-0%"});
    $('.slidelist').delay(2000);
  });

  // popup (혜택보기)
  // 도미노 매니아만의 혜택보기! 눌렀을 때 뜨는 팝업창
    // .benefit_contents안에 있는 첫번째.benefit_cont(도미노 매니아만의 혜택보기!)를 누르면
    // .membership_popup의 이미지, 팝업창, 팝업창 배경은 보이게 하고, .discount_popup()의 이미지는 보이지 않게 한다.
  $(".benefit_contents .benefit_cont:first-child").click(function(){
    $(".membership_popup img").css("display", "block");
    $(".discount_popup img").css("display", "none");
    $("#benefit_popupwrap").css("display", "block");
    $("#benefit_back").css("display", "block");
  });
  // 제휴 할인 혜택보기! 눌렀을 때 뜨는 팝업창
    // .benefit_contents 안에 있는 두번째.benefit_cont(제휴 할인 혜택보기!)를 누르면
    // .discount_popup의 이미지, 팝업창, 팝업창 배경은 보이게 하고, .membership_popup()의 이미지는 보이지 않게 한다.
  $(".benefit_contents .benefit_cont:nth-child(2)").click(function(){
    $(".discount_popup img").css("display", "block");
    $(".membership_popup img").css("display", "none");
    $("#benefit_popupwrap").css("height", "650px");
    $("#benefit_popupwrap").css("display", "block");
    $("#benefit_back").css("display", "block");
  });
  // 팝업창 닫기 버튼 누르면 닫힘
    // 팝업창 안에 있는 버튼을 누르면 팝업창과 팝업창 배경을 보이지 않게 한다.
  $("#benefit_popupwrap button").click(function(){
    $("#benefit_popupwrap").css("display", "none");
    $("#benefit_back").css("display", "none");
  });
});
