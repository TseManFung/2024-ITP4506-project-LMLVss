$(document).ready(() => {
    $(".btn-primary").click(() => {
        window.location.href = "./insurance_information.html";
    })

    $(".btn-danger").click(() => {
        modalSetTitle("Reject Application");
        modalSetBody("Are you sure you want to reject this application(<span style='color:red;'>ABC123456</span>)?");
        modalSetSecondaryBtn(true, "Cancel");
        modalSetCloseBtn(true);
        modalSetPrimaryBtn(true, "Reject", () => {
            modalSetTitle("Reject Successfully");
            modalSetBody("This application(<span style='color:red;'>ABC123456</span>) has been rejected.");
            modalSetSecondaryBtn(false);
            modalSetCloseBtn(false);
            modalSetPrimaryBtn(true, "OK",()=>{
                hideModal();
            });
        });
        showModal();
    })
})