$(document).ready(() => {
    $("#goBack").on("click", () => {
        goBack()
    });

    $("#apply").on("click", () => {
        window.location.href = "input_information.html";
    });
});
