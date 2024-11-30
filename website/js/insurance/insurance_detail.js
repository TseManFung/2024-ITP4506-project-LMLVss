$(document).ready(() => {
    $("#goBack").on("click", () => {
        goBack()
    });

    $("#apply").on("click", () => {
        window.location.href = "../login.html?redirect=insurance/input_information.html";
    });

    $("#btn-compare").click(() => {
        window.location.href = "./compare.html";
    })
});
