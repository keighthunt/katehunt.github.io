(function($) {
  "use strict";
  $.KateHunt = function() {
    var params = {
          timelineBlocks: $('.timeline-block'),
          portfolioBlock: $('#portfolio .item'),
          offset: 0.8,
          portfolioCalled: false
        },
        scrollSection;


    function hideBlocks(blocks, offset) {
      blocks.each(function(){
        ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.timeline-milestone, .timeline-content').addClass('is-hidden');
      });
    }

    function showBlocks(blocks, offset) {
      blocks.each(function(){
        ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.timeline-milestone').hasClass('is-hidden') ) && $(this).find('.timeline-milestone, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
      });
    }

    function checkStatusOfTimeline() {
      (!window.requestAnimationFrame)
          ? setTimeout(function(){ showBlocks(params.timelineBlocks, params.offset); }, 100)
          : window.requestAnimationFrame(function(){ showBlocks(params.timelineBlocks, params.offset); });
    }

    function scrollTo(section) {
      $('html, body').animate({
        scrollTop: section.offset().top - 50
      }, 500);
      return false;
    }

    function displayPortfolioItems() {
      $('#portfolio .item').each(function(i){
        $(this).delay(200*i).css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 1000);
      });
    }

    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop(),
          docViewBottom = docViewTop + $(window).height(),
          elemTop = $(elem).offset().top,
          elemBottom = elemTop + $(elem).height();

      if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
        params.portfolioCalled = true;
        displayPortfolioItems();
      }
    }

    function init() {
      hideBlocks(params.timelineBlocks, params.offset);
      $(window).on('scroll', function(){
        checkStatusOfTimeline();
        if((params.portfolioCalled == false) && ($(window).width() > 768)) {
          isScrolledIntoView(params.portfolioBlock);
        }
      });

      $('.navbar-nav>li>a, .navbar-brand').click(function(){
        event.preventDefault();
        scrollSection = $( $.attr(this, 'href') );
        scrollTo(scrollSection);
      });

      $('.arrow').click(function(){
        event.preventDefault();
        scrollSection = $(this).parent().attr('id');
        scrollTo($('#'+scrollSection));
      });
    }
    return {
      init: init
    }
  }();
  $(document).ready($.KateHunt.init);
})(jQuery);
