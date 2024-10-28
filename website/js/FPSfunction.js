document.addEventListener("DOMContentLoaded", function () {
  insertScript("website/js/FPS.js");
  insertScript(
    "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
  );
});

var jsonPath = "website/FPS.json";

function FPSsetPrice(targetID, price) {
  const target = document.getElementById(targetID);
  target.setAttribute("data-price", price);
}

function generateQRCode(targetID, width, height) {
  const target = document.getElementById(targetID);
  const transactionAmount = target.getAttribute("data-price");
  readJsonFile(jsonPath, (data) => {
    phone = data.phone;
    bank = data.bank;
    fpsData = new FPS();
    fpsData.setMobile(phone); //hk phone number
    fpsData.setAmount(transactionAmount);
    if (bank !== undefined) {
      fpsData.setBank(bank);
    }

    target.innerHTML = "";

    new QRCode(target, {
      text: fpsData.generate().data,
      width: width,
      height: height,
    });
    target.title = "Scan to pay";
  });
}
