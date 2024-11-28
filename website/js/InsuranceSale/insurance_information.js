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
        //TODO: 報價
    } else {
      $(`#step-label-${curr + 1}`).click();
    }
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
