function driver_box_formatter(driverNum) {
  return `<div class="driver-box" id="driver${driverNum}" data-driver="${driverNum}"><h5 class="underline">Car Owner / Named Driver ${driverNum} Information</h5><div id="d${driverNum}_personal_information"><div class="row"><div class="col m-1"><div class="form-floating"><input type="text" class="form-control" id="d${driverNum}_FirstName" placeholder="First Name in english" required><label for="d${driverNum}_FirstName">First Name in english<span style='color: red;'>*</span></label></div></div><div class="col m-1"><div class="form-floating"><input type="text" class="form-control" id="d${driverNum}_LastName" placeholder="Last Name in english" required><label for="d${driverNum}_LastName">Last Name in english<span style='color: red;'>*</span></label></div></div></div><div class="row"><div class="col m-1"><div class="form-floating"><input type="text" class="form-control" id="d${driverNum}_CnName" placeholder="Chinese Name"><label for="d${driverNum}_CnName">Chinese Name</label></div></div></div><div class="row"><div class="col m-1"><div class="form-floating"><input required type="date" class="form-control" id="d${driverNum}_DoB" placeholder="Date of Birth"><label for="d${driverNum}_DoB">Date of Birth<span style='color: red;'>*</span></label></div></div><div class="col m-1"><div class="form-floating"><select class="form-select" id="d${driverNum}_gender" required><option selected value disabled>Select a gender</option><option value="M">Male</option><option value="F">Female</option><option value="O">Other</option></select><label for="d${driverNum}_gender">Gender</label></div></div></div><div class="row"><div class="col m-1"><div class="input-group"><button class="btn btn-outline-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown" aria-expanded="false"id="d${driverNum}_dropdownID">HKID</button><ul class="dropdown-menu"><li><div class="dropdown-item cursor-pointer" data-id="${driverNum}" name="ID_card">HKID</div></li><li><div class="dropdown-item cursor-pointer" data-id="${driverNum}" name="ID_card">Visa ID</div></li></ul><div class="form-floating"><input type="password" class="form-control" id="d${driverNum}_inputID" placeholder="HKID" autocomplete="off" required><label for="d${driverNum}_inputID" id="d${driverNum}_labelID">HKID<span style='color: red;'>*</span></label></div></div></div></div><br><h5 class="underline">Content</h5><div class="row"><div class="col m-1"><div class="form-floating"><input type="email" class="form-control" id="d${driverNum}_email" placeholder="Email"required><label for="d${driverNum}_email">Email<span style='color: red;'>*</span></label></div></div></div><div class="row"><div class="col m-1"><div class="form-floating"><input type="d${driverNum}_tel" class="form-control" id="d${driverNum}_tel" placeholder="Phone number" required><label for="d${driverNum}_tel">Phone number<span style='color: red;'>*</span></label></div></div></div></div><br><h5 class="underline">Driver information</h5><div class="row"><div class="col m-1"><div class="form-floating"><select class="form-select" id="d${driverNum}_marry" required><option selected value="S">Single</option><option value="M">Married</option><option value="D">Divorced</option><option value="W">Widowed</option></select><label for="d${driverNum}_marry">Marriage status<span style='color: red;'>*</span></label></div></div><div class="col m-1"><div class="form-floating"><input type="number" class="form-control" id="d${driverNum}_drive_year" placeholder="Driving Years" step="1" min="0" required><label for="d${driverNum}_drive_year">Driving Years<span style='color: red;'>*</span></label></div></div></div><div class="row"><div class="col d-grid m-1"><button data-id="${driverNum}" class="btn btn-danger" onclick="removeDriver(this)">Remove</button></div></div></div>`;
}

$(document).ready(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();
  })

  urlParam = new URLSearchParams(window.location.search);
  

  if (urlParam.has("price")) {
    price = urlParam.get("price");
    $("#openPayment").attr("disabled", false);
    $("#price-text").text(price);
    $("#noNeedPayment").hide();
    $("input").attr("disabled", true);
    $("select").attr("disabled", true);
    $("textarea").attr("disabled", true);
    $(".step button").attr("disabled", true);
    $("#step-5 button").attr("disabled", false);
    $("#step-6 input").attr("disabled", false);
    $("#step-label-5").click();
  }else{
    $("#payment").hide();
  }


  const dropdownID = "dropdownID";
  const inputID = "inputID";
  const labelID = "labelID";
  bindClickEvent("div[name='ID_card']", hkidOrVisaSelected);
  function bindClickEvent(query, func) {
    $(query).click((e) => {
      func(e);
    });
  }

  function removeDriver(element) {
    driverId = element.getAttribute("data-id");
    $(`#driver${driverId}`).remove();
  }

  function checkAllStep() {
    allSteps = $(".setup-content");
    for (const index in allSteps) {
      i = parseInt(index);
      const element = allSteps[i];
      if (!element.checkValidity()) {
        $(element).addClass("was-validated");
        $(`#step-label-${i + 1}`).click();
        // get the first invalid element in the step after 0.5s
        setTimeout(() => {
          invalidElement = $(element).find(":invalid")[0];
            invalidElement.scrollIntoView({ block: "center" });
        });
        return false;
      }
    }
    return true;
  }

  function hkidOrVisaSelected(event) {
    t = event.target.innerText;
    id = event.target.getAttribute("data-id");
    if (id === "0") {
      dropdownElement = $(`#${dropdownID}`);
      inputElement = $(`#${inputID}`);
      labelElement = $(`#${labelID}`);
    } else {
      dropdownElement = $(`#d${id}_${dropdownID}`);
      inputElement = $(`#d${id}_${inputID}`);
      labelElement = $(`#d${id}_${labelID}`);
    }
    dropdownElement.text(t);
    inputElement.attr("placeholder", t);
    labelElement.html(t + `<span style='color: red;'>*</span>`);
  }

  $("#CarBrand").on("change", (e) => {
    const brand = $("#CarBrand").val();
    const CarModal = $("#CarModal");
    if (brand === "") {
      CarModal.html("<option value='' select>Select Car Modal</option>");
      CarModal.prop("disabled", true);
      return;
    }
    CarModal.prop("disabled", false);
    CarModal.load(`../API/getCarModel/${brand}.html`);
  });

  const btn_next = $("#btn-next");
  btn_next.click(() => {
    const curr = parseInt(btn_next.attr("curr"));
    const fin = btn_next.attr("fin");
    currstep = $(`#step-${curr}`);
    if (!currstep[0].checkValidity()) {
      currstep.addClass("was-validated");
      return;
    }
    if (curr == fin) {
      if (!checkAllStep()) {
        return;
      }
      modalSetTitle("Submit Successfully");
      modalSetBody(
        'Your application has been submitted successfully. <br>Your application number is <span style="color:red;">ABC123456</span>.<br>This may take 3-5 working days to process.'
      );
      modalSetSecondaryBtn(false);
      modalSetCloseBtn(false);
      modelEnableStatic();
      modalSetPrimaryBtn(true, "OK", () => {
        window.location.href = "./application_list.html";
      });
      showModal();
    } else {
      $(`#step-label-${curr + 1}`).click();
    }
  });

  $("#addDriver").click(() => {
    newestDriver = $(".driver-box").last();
    driverNum = parseInt(newestDriver.attr("data-driver")) + 1;
    newDriver = driver_box_formatter(driverNum);
    newestDriver.after(newDriver);
    $("div[name='ID_card']").off("click", hkidOrVisaSelected);
    bindClickEvent("div[name='ID_card']", hkidOrVisaSelected);
    scrollTo(`d${driverNum - 1}_marry`);
  });
  same_with_applicant = $("#same_with_applicant");
  same_with_applicant.on("change", function () {
    if (same_with_applicant.val() == "Y") {
      $("#d1_personal_information").addClass("d-none");
    } else {
      $("#d1_personal_information").removeClass("d-none");
    }
  });

  fileInput = $('input[type="file"]');
  fileList = [];
  liNum = 0;
  function change_img() {
    if (fileInput.val() === "") {
      fileInput.removeClass("image-dropping");
    } else {
      fileInput.addClass("image-dropping");
    }
    if (
      fileInput[0].files &&
      fileInput[0].files[0] &&
      !fileList.includes(fileInput[0].files[0].name)
    ) {
      fileList.push(fileInput[0].files[0].name);
      $("#file-list").append(
        `<li id="file${liNum}">${fileInput[0].files[0].name} <div id="del${liNum}">X</div></li>`
      );
      //add click event to remove file
      $(`#file${liNum} div`).click(function () {
        p = $(this).parent();
        fileList = fileList.filter(function (value, index, arr) {
          return value != p.text().slice(0, -2);
        });
        p.remove();
      });
    }
    //clear file input
    fileInput.removeClass("image-dropping");
    liNum++;
  }
  fileInput.bind("dragover", function () {
    fileInput.addClass("image-dropping");
  });
  fileInput.bind("dragleave", function () {
    if (fileInput.val() === "") {
      fileInput.removeClass("image-dropping");
    } else {
      fileInput.addClass("image-dropping");
    }
  });
  fileInput.bind("change drop", function () {
    if (fileInput[0].files && fileInput[0].files[0]) {
      const newFileName = fileInput[0].files[0].name;

      if (fileList.includes(newFileName)) {
        const indexToRemove = fileList.indexOf(newFileName);
        fileList.splice(indexToRemove, 1);
        $(`#file${indexToRemove}`).remove();
      }

      change_img();
    }
  });
  $("#openPayment").click(function () {
    var popup = window.open(
      "../customer/payment.html?price="+price,
      "Payment",
      "width=720,height=1280"
    );

    window.addEventListener("message", function (event) {
      popup.close();
      if (event.data) {
        $("#openPayment").hide();
        $("#pay-status").addClass("success");
        $("#pay-status").text(`Payment Success, you pay by ${event.data}`);
      } else {
        $("#pay-status").addClass("fail");
        $("#pay-status").text("Payment Failed");
      }
    });
  });
});
