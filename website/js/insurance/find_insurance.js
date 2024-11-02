$(document).ready(() => {
  //current_url=`./find_insurance.html?brand=${CarBrand.val()}&modal=${CarModal.val()}&year=${yearInput.val()}`;
  const CarBrand = $("#CarBrand");
  const CarModal = $("#CarModal");
  const yearInput = $("#yearInput");
  const urlParams = new URLSearchParams(window.location.search);
  const brand = urlParams.get("brand");
  const modal = urlParams.get("modal");
  const year = urlParams.get("year");

  if (brand) {
    CarBrand.val(brand);
  }
  if (modal) {
    CarModal.prop("disabled", false);
    CarModal.load(`../API/getCarModel/${brand}.html`);
    CarModal.val(modal);
  }
  if (year) {
    yearInput.val(year);
  }
  if (getCookie("itemsView") === "cell") {
    itemsSetCell();
  } else {
    itemsSetList();
  }
  $("#yearInput").attr("max", new Date().getFullYear());
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

  $("#cell-icon").on("click", () => {
    itemsSetCell();
  });
  $("#list-icon").on("click", () => {
    itemsSetList();
  });
  $("button[name='AddToApplicationList']").on("click", (e) => {
    e.preventDefault();
  })
  $("button[name='ShowMoreDetail']").on("click", (e) => {
    e.preventDefault();
    window.location.href = "./insurance_detail.html";
  })
  $("button[name='AddToApplicationList']").on("click", (e) => {
    e.preventDefault();
    console.log("Add to application list");
    const url = `input_information.html?brand=${CarBrand.val()}&modal=${CarModal.val()}&year=${yearInput.val()}`;
    window.location.href = url;
  })
});
