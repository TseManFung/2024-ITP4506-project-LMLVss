$(document).ready(function () {
  urlParam = new URLSearchParams(window.location.search);
  price = urlParam.get("price");
  if (urlParam.has("price")) {
    $('span[name="price"]').text(price);
  } else {
    $('span[name="price"]').text("Error");
  }
  const timer = $("#timer");
  var time = 300; // 5 minutes in seconds

  const countdown = setInterval(function () {
    // Calculate minutes and seconds
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Format the time as MM:SS
    const formattedTime =
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;

    // Display the formatted time
    timer.text(formattedTime);

    // Decrease the time
    time--;

    // Stop the countdown when time is up
    if (time < 0) {
      clearInterval(countdown);
      timer.text("00:00"); // Optional: display 00:00 when finished
      alert("Time's up!"); // Optional: alert the user when time is up
      window.opener.postMessage(false, "*");
    }
  }, 1000); // Update every second

  $("#btn-pay").click(function () {
    if (price == undefined || price == null || price == "" || price <= "0") {
      alert("Price error");
      return;
    }
    backupTime = time;
    time = 300;
    method = $("input[name='paymentMethod']:checked").val();
    modelEnableStatic();
    modalSetSecondaryBtn("Cancel", () => {
      time = backupTime;
      hideModal();
    });
    modalSetCloseBtn(false);
    if (method == "credit") {
      modalSetTitle("Credit Card Payment");
      modalLoadBody("creditCard.html");
      modalSetPrimaryBtn(true, "Pay", () => {
        i = checkInputIn("main-modal-body", "is-invalid");
        if (i.length == 0) {
          window.opener.postMessage("credit card", "*");
        }
      });
    } else if (method == "FPS") {
      modalSetTitle("FPS Payment");
      modalSetBody(
        `<p>Click "Paid" after you paid.</p> <p>You need to upload your FPS transaction record.</p><div id="qrcode"></div>`
      );
      generateQRCode("qrcode", price, 256, 256);
      modalSetPrimaryBtn(true, "Paid", () => {
        window.opener.postMessage("FPS", "*");
      });
    }
    showModal();
  });
});
