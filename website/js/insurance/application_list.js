$(document).ready(function () {
  $(".btn-primary").click(function () {
    window.location.href = "./insurance_information.html";
  });
  $(".btn-danger").click(function () {
    modalSetTitle("Are you sure you want to terminate this insurance?");
    modalSetBody("This action cannot be undone.");
    modalSetSecondaryBtn(true, "Cancel");
    modalSetPrimaryBtn(true, "Terminate", function () {
      hideModal();
    });
    showModal();
  });
  $(".btn-warning[name='pay']").click(function () {
    window.location.href = "./input_information.html?price=123";
  });
    $(".btn-warning[name='edit']").click(function () {
        window.location.href = "./input_information.html";
    });
  $(".btn-success").click(function () {
    window.location.href = "../customer/payment.html?price=12345";
  });
});
