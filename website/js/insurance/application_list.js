$(document).ready(function () {
  $(".btn-primary").click(function () {
    if ($(this).text().trim() !== "Insurance Detail") {
      return;
    }
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
  $(".btn-info").click(function () {
    modalSetTitle("Claim Insurance");
    modalLoadBody("./claim.html");
    modalSetSecondaryBtn(true, "Cancel");
    modalSetPrimaryBtn(true, "Submit", function (e) {
      e.preventDefault();
      claimText = $("#claimForm textarea").val().trim();
      if (claimText === null || claimText === undefined || claimText === "") {
        $("#claimForm").addClass("was-validated");
        return;
      }
      hideModal();
    });
    showModal();
  });
});
