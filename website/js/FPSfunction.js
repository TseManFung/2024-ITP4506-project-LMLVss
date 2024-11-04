jsonPath = "../../FPS.json";

function generateQRCode(targetID, price, width, height) {
  const target = FPSsetPrice(targetID, price);
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

function FPSsetPrice(targetID, price) {
  const target = document.getElementById(targetID);
  target.setAttribute("data-price", price);
  return target;
}
