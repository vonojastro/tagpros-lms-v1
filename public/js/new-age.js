(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });



 // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 60 ) {
      // $("#mainNav").removeClass("navbar-announce");
      $("#mainNav").addClass("navbar-shrink");
      $("#mainNavSearch").addClass("navbar-search-visible");
      $('#tagpros-logo-nav').attr("src","./img/tagpros-logo-small2.png");
    } 
    else if ($(window).width()<1200){
      // $("#mainNav").addClass("navbar-announce");
      $("#mainNav").addClass("navbar-shrink");
      $('#tagpros-logo-nav').attr("src","./img/tagpros-logo-small2.png");
    }
    else {
      // $("#mainNav").addClass("navbar-announce");
      $("#mainNav").removeClass("navbar-shrink");
      $("#mainNavSearch").removeClass("navbar-search-visible");
      $('#tagpros-logo-nav').attr("src","./img/tagpros-logo-small2.png");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);


})(jQuery); // End of use strict


(function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector("#parallax");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${5 - (_mouseY - _h) * 0.01}%`;
        let x = `${_depth1}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();

