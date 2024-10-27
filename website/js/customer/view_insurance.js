$(document).ready(() => {
  $("#yearInput").attr("max", new Date().getFullYear());
  $("#f").on("submit", (e) => {
    e.preventDefault();
    return false;
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
    CarModal.load(`../API/getCarModel/${brand}.html`)
  });
  $("#btnSubmit").on("click", (e) => {
    e.preventDefault();
    ok = true;
    CarBrand = $("#CarBrand");
    CarModal = $("#CarModal");
    yearInput = $("#yearInput");
    if (CarBrand.val() === "") {
      CarBrand.addClass("is-invalid");
      ok = false;
    }
    else {
      CarBrand.removeClass("is-invalid");
    }
    if (CarModal.val() === "") {
      CarModal.addClass("is-invalid");
      ok = false;
    }
    else {
      CarModal.removeClass("is-invalid");
    }
    if (yearInput.val() === "") {
      yearInput.addClass("is-invalid");
      ok = false;
    }
    else {
      yearInput.removeClass("is-invalid");
    }
    if (!ok) {
      modalSetTitle("Field missing");
      modalSetBody("Please fill all the fields");
      modalSetPrimaryBtn(show=false);
      showModal();
      return;
    }
    url=`./find_insurance.html?brand=${CarBrand.val()}&modal=${CarModal.val()}&year=${yearInput.val()}`;
    window.location.href = url;
  })
});
