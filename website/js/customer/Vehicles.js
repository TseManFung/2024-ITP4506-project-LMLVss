document.addEventListener('DOMContentLoaded', function () {
    const dealerCheckboxes = document.querySelectorAll('.dealer-checkbox');
    const modelCheckboxes = document.querySelectorAll('.model-checkbox');
    const colorCheckboxes = document.querySelectorAll('.color-checkbox');
    const dealerCount = document.getElementById('dealer-count');
    const modelCount = document.getElementById('model-count');
    const colorCount = document.getElementById('color-count');
    const resetButton = document.getElementById('reset-button');
  
    function updateCount(checkboxes, countElement) {
      const selectedCount = document.querySelectorAll(checkboxes + ':checked').length;
      countElement.textContent = selectedCount > 0 ? selectedCount : '';
    }
  
    dealerCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateCount('.dealer-checkbox', dealerCount);
      });
    });
  
    modelCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateCount('.model-checkbox', modelCount);
      });
    });
  
    colorCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateCount('.color-checkbox', colorCount);
      });
    });
  
    // Initialize the count on page load
    updateCount('.dealer-checkbox', dealerCount);
    updateCount('.model-checkbox', modelCount);
    updateCount('.color-checkbox', colorCount);
  
    // Reset button functionality
    resetButton.addEventListener('click', function() {
      dealerCheckboxes.forEach(checkbox => checkbox.checked = false);
      modelCheckboxes.forEach(checkbox => checkbox.checked = false);
      colorCheckboxes.forEach(checkbox => checkbox.checked = false);
      updateCount('.dealer-checkbox', dealerCount);
      updateCount('.model-checkbox', modelCount);
      updateCount('.color-checkbox', colorCount);
    });

    if (getCookie("itemsView") === "cell") {
      itemsSetCell();
    } else {
      itemsSetList();
    }

    
  $("#cell-icon").on("click", () => {
    itemsSetCell();
  });
  $("#list-icon").on("click", () => {
    itemsSetList();
  });
  });

  