/* thank-etc-ok.com */

$(document).ready(function() {
  /* Pop out if in iframe */
  if (window.location != window.parent.location) {
    top.location = self.location.href;
  }
  
  var isiOS = isItiOS();
  
  /* iOS CSS */
  if (isiOS) {
    $('body').addClass('ios');
  }
  
  /* Menu scroll animation */
  $('a').click(function() {
    var offset = 50;
    if ($(this).hasClass('no-offset')) offset = 0;
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - offset
    }, 1300, 'easeInOutExpo');
    return false;
  });
  
  var menuFixed = false;
  var currentSection = '';
  
  $(document).scroll(function() {
    /* Affix menu */
    var secondMenuY = $('div#title-container').offset().top + $('div#title-container').height();
  
    if ($(document).scrollTop() >= secondMenuY) {
      if (!menuFixed) {
        $('div#second-menu-container').addClass('fixed');
        $('div#second-menu-container').fadeIn();
        menuFixed = true;
      }
    } else {
      if (menuFixed) {
        $('div#second-menu-container').fadeOut(function() {
          $('div#second-menu-container').removeClass('fixed');
        });
        menuFixed = false;
      }
    }
    
    /* Parallax */
    if (!isiOS) {
      var y = -($(window).scrollTop() / 10);
      var coords = 'center '+ y + 'px';

      $('div#title-container').css({ backgroundPosition: 'center ' + y + 'px' });
      $('div#intro-container').css({ backgroundPosition: getFocusBackgroundReposition() + 'px ' + y + 'px' });
    }
    
    /* Menu highlight (TODO refactor (use data-* or class)) */
    if ($(document).scrollTop() < $('div#intro-container').offset().top - 50) {
      $('.intro').removeClass('intro');
    } else if ($(document).scrollTop() >= $('div#intro-container').offset().top - 50 && $(document).scrollTop() < $('div#verkoop-container').offset().top - 50) {
      $('.intro').removeClass('intro');
      $('li#menu-intro a').addClass('intro');
    } else if ($(document).scrollTop() >= $('div#verkoop-container').offset().top - 50 && $(document).scrollTop() < $('div#koop-container').offset().top - 50) {
      $('.intro').removeClass('intro');
      $('li#menu-koop a').addClass('intro');
    } else if ($(document).scrollTop() >= $('div#koop-container').offset().top - 50 && $(document).scrollTop() < $('div#team-top-container').offset().top - 50) {
      $('.intro').removeClass('intro');
      $('li#menu-verkoop a').addClass('intro');
    } else if ($(document).scrollTop() >= $('div#contact-container').offset().top - 50 || $(window).scrollTop() + $(window).height() == $(document).height()  )  {
      $('.intro').removeClass('intro');
      $('li#menu-contact a').addClass('intro');
    } else if ($(document).scrollTop() >= $('div#team-top-container').offset().top - 50 && $(document).scrollTop() < $('div#contact-container').offset().top - 50) {
      $('.intro').removeClass('intro');
      $('li#menu-team a').addClass('intro');
    }
    
    /* Section highlight (TODO refactor (use data-* or class)) */
    if ($(document).scrollTop() < $('div#intro-container').offset().top - 50 && 
        currentSection !== '') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Intro');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = '';
    } else if ($(document).scrollTop() >= $('div#intro-container').offset().top - 50 && 
        $(document).scrollTop() < $('div#verkoop-container').offset().top - 50 && 
        currentSection !== 'Home') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Home');
        $('div#header-mobile-section span').fadeIn();
      });

      currentSection = 'Home';
    } else if ($(document).scrollTop() >= $('div#verkoop-container').offset().top - 50 && 
    $(document).scrollTop() < $('div#koop-container').offset().top - 50 && 
        currentSection !== 'Koop') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Koop');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Koop';
    } else if ($(document).scrollTop() >= $('div#koop-container').offset().top - 50 && 
    $(document).scrollTop() < $('div#team-top-container').offset().top - 50 && 
        currentSection !== 'Verkoop') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Verkoop');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Verkoop';
    } else if ($(document).scrollTop() >= $('div#contact-container').offset().top - 50 || 
    $(window).scrollTop() + $(window).height() == $(document).height() && 
        currentSection !== 'Contact') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Contact');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Contact';
    } else if ($(document).scrollTop() >= $('div#team-top-container').offset().top - 50 && 
    $(document).scrollTop() < $('div#contact-container').offset().top - 50 && 
        currentSection !== 'Team') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Chiefs');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Team';
    }

  });
  
  /* Title digital effect */
  /*$('h1#title-text').digital('Verse Markt');
  $('h1#title-text-mobile-1').digital('Verse');
  $('h1#title-text-mobile-2').digital('Markt');*/
  $('h2#subtitle-text').digital('v0.1 trotstomaat');
  $('h2#subtitle-text-mobile-1').digital('v0.1');
  $('h2#subtitle-text-mobile-2').digital('trotstomaat');
  
  /* Koop background fix */
  $(window).resize(function() {
    koopBackgroundReposition();
  });
  
  koopBackgroundReposition();
});

function koopBackgroundReposition() {
  var offset = -95;
  var newPosition = ($(window).width() / 2) + offset;
  $('div#koop-container').css({'background-position': newPosition + 'px top'});
}

function getKoopBackgroundReposition() {
  return ($(window).width() / 2) - 95;
}

function isItiOS(){
  return (
    /* Detect iPhone */
    (navigator.platform.indexOf("iPhone") != -1) ||
    /* Detect iPod */
    (navigator.platform.indexOf("iPod") != -1) ||
    /* Detect iPad */
    (navigator.platform.indexOf("iPad") != -1)
  );
}
