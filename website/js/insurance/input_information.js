function resetActive(event, percent, step) {
  $(".progress-bar")
    .css("width", percent + "%")
    .attr("aria-valuenow", percent);
  $(".progress-completed").text(percent + "%");

  $("div").each(function () {
    if ($(this).hasClass("activestep")) {
      $(this).removeClass("activestep");
    }
  });

  if (event.target.className == "col-md-2") {
    $(event.target).addClass("activestep");
  } else {
    $(event.target.parentNode).addClass("activestep");
  }

  hideSteps();
  showCurrentStepInfo(step);
  nextBTN(parseInt(step.replace("step-", "")));
}

function nextBTN(next) {
  const btn_next = $("#btn-next");
  const fin = btn_next.attr("fin");
  if (next > fin) {
    return;
  }
  text = "";
  if (fin == next) {
    text = btn_next.attr("fin-text");
  } else {
    text = btn_next.attr("pre-text");
  }
  btn_next.text(text);
  btn_next.attr("curr", next);
}

function hideSteps() {
  $("div").each(function () {
    if ($(this).hasClass("activeStepInfo")) {
      $(this).removeClass("activeStepInfo");
      $(this).addClass("hiddenStepInfo");
    }
  });
}

function showCurrentStepInfo(step) {
  var id = "#" + step;
  $(id).addClass("activeStepInfo");
}

function driver_box_formatter(driverNum) {
  return `<div class="driver-box" id="driver${driverNum}" data-driver="${driverNum}"><h5 class="underline">Car Owner / Named Driver ${driverNum} Information</h5><div id="d${driverNum}_personal_information"><div class="row"><div class="col m-1"><div class="form-floating"><input type="text" class="form-control" id="d${driverNum}_FirstName" placeholder="First Name in english"><label for="d${driverNum}_FirstName">First Name in english</label></div></div><div class="col m-1"><div class="form-floating"><input type="text" class="form-control" id="d${driverNum}_LastName" placeholder="Last Name in english"><label for="d${driverNum}_LastName">Last Name in english</label></div></div></div><div class="row"><div class="col m-1"><div class="form-floating"><input type="text" class="form-control" id="d${driverNum}_CnName" placeholder="Chinese Name"><label for="d${driverNum}_CnName">Chinese Name</label></div></div></div><div class="row"><div class="col m-1"><div class="form-floating"><input type="date" class="form-control" id="d${driverNum}_DoB" placeholder="Date of Birth"><label for="d${driverNum}_DoB">Date of Birth</label></div></div><div class="col m-1"><div class="form-floating"><select class="form-select" id="d${driverNum}_gender"><option selected value="">Select a gender</option><option value="M">Male</option><option value="F">Female</option><option value="O">Other</option></select><label for="d${driverNum}_gender">Gender</label></div></div></div><div class="row"><div class="col m-1"><div class="input-group"><button class="btn btn-outline-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown" aria-expanded="false"id="d${driverNum}_dropdownID">HKID</button><ul class="dropdown-menu"><li><div class="dropdown-item cursor-pointer" name="ID_card">HKID</div></li><li><div class="dropdown-item cursor-pointer" name="ID_card">Visa ID</div></li></ul><div class="form-floating"><input type="password" class="form-control" id="d${driverNum}_inputID" placeholder="HKID" autocomplete="off"><label for="d${driverNum}_inputID" id="d${driverNum}_labelID">HKID</label></div></div></div></div><br><h5 class="underline">Content</h5><div class="row"><div class="col m-1"><div class="form-floating"><input type="email" class="form-control" id="d${driverNum}_email" placeholder="Email"><label for="d${driverNum}_email">Email</label></div></div></div><div class="row"><div class="col m-1"><div class="form-floating"><input type="d${driverNum}_tel" class="form-control" id="d${driverNum}_tel" placeholder="Phone number"><label for="d${driverNum}_tel">Phone number</label></div></div></div></div><br><h5 class="underline">Driver information</h5><div class="row"><div class="col m-1"><div class="form-floating"><select class="form-select" id="d${driverNum}_marry"><option selected value="S">Single</option><option value="M">Married</option><option value="D">Divorced</option><option value="W">Widowed</option></select><label for="d${driverNum}_marry">Marriage status</label></div></div><div class="col m-1"><div class="form-floating"><input type="number" class="form-control" id="d${driverNum}_drive_year" placeholder="Driving Years" step="1" min="0"><label for="d${driverNum}_drive_year">Driving Years</label></div></div></div></div>`;
}

$(document).ready(() => {
  const dropdownID = $("#dropdownID");
  const inputID = $("#inputID");
  const labelID = $("#labelID");
  $("div[name='ID_card']").click((event) => {
    t = event.target.innerText;
    dropdownID.text(t);
    inputID.attr("placeholder", t);
    labelID.text(t);
  });

  const btn_next = $("#btn-next");
  btn_next.click(() => {
    const curr = parseInt(btn_next.attr("curr"));
    const fin = btn_next.attr("fin");
    if (curr == fin) {
      window.location.href = "input_information.html";
    } else {
      $(`#step-label-${curr + 1}`).click();
    }
  });

  $("#addDriver").click(() => {
    newestDriver = $(".driver-box").last();
    driverNum = parseInt(newestDriver.attr("data-driver")) + 1;
    newDriver = driver_box_formatter(driverNum);
    newestDriver.after(newDriver);
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
  fileList = []
  liNum = 0;
  function change_img() {
    if (fileInput.val() === "") {
      fileInput.removeClass("image-dropping");
    } else {
      fileInput.addClass("image-dropping");
    }
    if (fileInput[0].files && fileInput[0].files[0] && !fileList.includes(fileInput[0].files[0].name)) {
      fileList.push(fileInput[0].files[0].name);
      $("#file-list").append(`<li id="file${liNum}">${fileInput[0].files[0].name} <div id="del${liNum}">X</div></li>`);
      //add click event to remove file
      $(`#file${liNum} div`).click(function () {
        p = $(this).parent()
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
    var popup = window.open("../customer/payment.html?price=123", "Payment", "width=720,height=1280");

    window.addEventListener("message", function (event) {
      popup.close();
      if (event.data) {
        $("#openPayment").hide();
        $("#pay-status").addClass("success");
        $("#pay-status").text("Payment Success");
      } else {
        $("#pay-status").addClass("fail");
        $("#pay-status").text("Payment Failed");

      }
    });
  });
});
