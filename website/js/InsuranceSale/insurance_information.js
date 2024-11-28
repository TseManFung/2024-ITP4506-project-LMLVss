$(document).ready(() => {
  $("input").attr("disabled", true);
  $("select").attr("disabled", true);
  $("textarea").attr("disabled", true);
  $(".step button").attr("disabled", true);

  const buttonGroup = $(".btnGrp button");
  const btn_next = $("#btnNext");
  btn_next.click(() => {
    const curr = parseInt(btn_next.attr("curr"));
    const fin = btn_next.attr("fin");
    if (curr == fin) {
      modelEnableStatic();
      modalSetTitle("insurance quotation");
      modalLoadBody("./insurance_quotation.html");
      modalSetCloseBtn(false);
      modalSetSecondaryBtn(true, "Back");
      modalSetPrimaryBtn(true, "Confirm", () => {
        i = checkInputIn("main-modal-body", "is-invalid");
        if (i.length > 0) {
          return;
        }
        modalSetPrimaryBtn(false);
        modalSetSecondaryBtn(false);
        modalSetTitle("Processing");
        modalLoadBody("../component/loader.html");
        setTimeout(() => {
          modalSetTitle("Successful");
          modalSetBody(
            "The page will be re-directed in three seconds. Please wait a moment..."
          );
          setTimeout(() => {
            window.location.href = "./application_manage.html";
          }, 3000);
        }, 2000);
      });
      showModal();
    } else {
      $(`#step-label-${curr + 1}`).click();
    }
  });

  $("#btnReject").click(() => {
    modalDisableStatic();
    modalSetTitle("Reject");
    modalSetBody("Are you sure to reject the application?");
    modalSetCloseBtn(true);
    modalSetPrimaryBtn(true, "Confirm", () => {
      window.location.href = "./application_manage.html";
    });
    showModal();
  });

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
});
