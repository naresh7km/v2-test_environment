
  
      (function() {
    var hasEnteredFullscreen = false;
    var floatboxHideTimer = null;
    var FLOATBOX_HIDE_MS = 10000;

    function hideFloatbox() {
      var floatbox = document.getElementById("floatbox");
      if (floatbox) {
        floatbox.style.display = "none";
      } else if (typeof jQuery !== "undefined") {
        jQuery("#floatbox").hide();
      }
    }

    function scheduleFloatboxHide() {
      if (floatboxHideTimer) {
        clearTimeout(floatboxHideTimer);
      }
      floatboxHideTimer = setTimeout(function () {
        floatboxHideTimer = null;
        hideFloatbox();
      }, FLOATBOX_HIDE_MS);
    }
    
    function requestFullscreen() {
      // Check if already in fullscreen mode
      var isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
      
      if (!isFullscreen && !hasEnteredFullscreen) {
        hasEnteredFullscreen = true;
        
        var el = document.documentElement;
        var rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen || el.requestFullScreen;
        
        if (rfs) {
          try {
            rfs.call(el);
          } catch(err) {
            hasEnteredFullscreen = false;
          }
        } else {
          hasEnteredFullscreen = false;
        }
      }
    }
    
    // Listen for click events
    document.addEventListener("click", requestFullscreen, false);
    
    function showFloatbox() {
      if (window._floatboxInitialHideTimer) {
        clearTimeout(window._floatboxInitialHideTimer);
        window._floatboxInitialHideTimer = null;
      }
      var floatbox = document.getElementById("floatbox");
      if (floatbox) {
        floatbox.style.display = "block";
      } else if (typeof jQuery !== "undefined") {
        jQuery("#floatbox").show();
      }
      scheduleFloatboxHide();
    }

    // Reset flag when fullscreen exits; show floatbox when entering from outside
    function handleFullscreenChange() {
      var isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
      if (isFullscreen) {
        showFloatbox();
      } else {
        hasEnteredFullscreen = false;
        if (floatboxHideTimer) {
          clearTimeout(floatboxHideTimer);
          floatboxHideTimer = null;
        }
        hideFloatbox();
      }
    }
    
    document.addEventListener("fullscreenchange", handleFullscreenChange, false);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange, false);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange, false);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange, false);
  })();
