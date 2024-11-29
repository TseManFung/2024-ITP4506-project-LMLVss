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
  if ($("#btnNext").length === 0) {
    btn_next = $("#btn-next");
  } else {
    btn_next = $("#btnNext");
  }
  const btn_reject = $("#btnReject");
  const fin = btn_next.attr("fin");
  if (next > fin) {
    return;
  }
  text = "";
  if (fin == next) {
    if (btn_reject) {
      btn_reject.show();
    }
    text = btn_next.attr("fin-text");
  } else {
    if (btn_reject) {
      btn_reject.hide();
    }
    text = btn_next.attr("pre-text");
  }
  btn_next.text(text);
  btn_next.attr("curr", next);
}

function hideSteps() {
  $(".setup-content").each(function () {
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
