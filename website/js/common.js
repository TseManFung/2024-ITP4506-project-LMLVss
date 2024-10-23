// scroll
function scrollTo(elementID) {

targetElement = document.getElementById(elementID);

targetElement.scrollIntoView();
}

function modalSetTitle(title) {
  $("#main-modal-title").text(title);
}

function modalSetBody(body) {
  $("#main-modal-body").text(body);
}

function modalSetPrimaryBtn(Show=true,text="Confirm",action=null) {
  if (Show) {
    $("#main-modal-primary").text(text);
    $("#main-modal-primary").click(action);
    $("#main-modal-primary").show();
  }
  else {
    $("#main-modal-primary").hide();
  }
}

function modalSetSecondaryBtn(Show=true,text="Cancel",action=null) {
  if (Show) {
    $("#main-modal-secondary").text(text);
    $("#main-modal-secondary").click(action);
    $("#main-modal-secondary").show();
  }
  else {
    $("#main-modal-secondary").hide();
  }
}

// page top
document.addEventListener("DOMContentLoaded", function () {
    topBtn = document.querySelector("#page-top");
    if (topBtn === null) {
        return;
    }
    topBtn.style.display = "none";

    window.addEventListener("scroll", function () {
        if (window.scrollY > 350) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", function () {
        scrollTo("header-wrap");
        return false;
    });
});

// page
function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + "px";
}

// get parameter from URL
function getParameterFromURL(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

// go back to previous page
function goBack() {
    window.history.back();
}


  function addToCart1(itemID) {
    $.ajax({
      type: "POST",
      url: "./addToCart.php",
      data: {
        sparePartNum: itemID,
        qty: 1
      },
      success: function (data) {
        location.reload();
      }
    });
  }
  
  function addToCart(itemID, quantity) {
    $.ajax({
      type: "POST",
      url: "./addToCart.php",
      data: {
        sparePartNum: itemID,
        qty: quantity
      },
      success: function (data) {
        window.location.href = "./dealer_cart.php";
      }
    });
    
  }



  function GoToPage_POST(action, kvPair) {
    var form = document.createElement('form');
    form.style.visibility = 'hidden'; // no user interaction is necessary
    form.method = 'POST'; // forms by default use GET query strings
    form.action = action;
    obj = Object.keys(kvPair);
    for (key in obj) {
      var input = document.createElement('input');
      input.name = obj[key];
      input.value = kvPair[obj[key]];
      form.appendChild(input); // add key/value pair to form
    }
    document.body.appendChild(form); // forms cannot be submitted outside of body
    form.submit();}