(function () {
  var BACKEND_URL = "https://latest-phone-fetch.onrender.com/api/phone";
  var INTERVAL_MS = 60 * 1000;

  function updatePhoneElements(phone) {
    document.querySelectorAll(".js-support-phone").forEach(function (el) {
      el.textContent = phone;
    });
  }

  function fetchPhone() {
    fetch(BACKEND_URL)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data && data.phone) {
          window.SUPPORT_PHONE = data.phone;
          updatePhoneElements(data.phone);
        }
      })
      .catch(function (err) {
        console.warn("Phone number fetch failed:", err);
        if (window.SUPPORT_PHONE) {
          updatePhoneElements(window.SUPPORT_PHONE);
        }
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.SUPPORT_PHONE) {
      updatePhoneElements(window.SUPPORT_PHONE);
    }
    fetchPhone();
    setInterval(fetchPhone, INTERVAL_MS);
  });
})();
