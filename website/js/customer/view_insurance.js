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
      CarModal.html("<option value=''>Select Car Modal</option>");
      CarModal.prop("disabled", true);
      return;
    }
    CarModal.prop("disabled", false);
    CarModal.load(`../API/getCarModel/${brand}.html`)
  });
});
