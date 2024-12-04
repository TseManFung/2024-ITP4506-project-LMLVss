document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 4;

    // Helper function to show error messages using Toast
    function showToast(message) {
        const toastBody = document.getElementById("toastBody");
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(document.getElementById("toastMessage"));
        toast.show();
    }

    // Handle showing or hiding billing address form based on checkbox
    const billingCheckbox = document.getElementById('billingAddress');
    const billingForm = document.getElementById('billingAddressForm');

    // Listen for changes to the checkbox
    billingCheckbox.addEventListener('change', function () {
        if (this.checked) {
            billingForm.setAttribute('hidden', 'true');  // Hide billing address form
        } else {
            billingForm.removeAttribute('hidden');  // Show billing address form
        }
    });

    // Real-time validation on input blur
    const inputs = document.querySelectorAll('#billform input, #billform select, #address-form input');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (input.checkValidity()) {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            }
        });
    });

    // Remove product row when "Remove" button is clicked
    const removeButtons = document.querySelectorAll('.btn-outline-danger');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');  // Get the closest row of the button
            row.remove();  // Remove the row from the table
        });
    });

    // Validate the form on Next button click
    document.getElementById('nextButton').addEventListener('click', function () {
        if (currentStep < totalSteps) {
            let isValid = true;

            // Step 2 Validation
            if (currentStep === 2) {
                // Validate Recipient's Name
                const name = document.getElementById("name");
                const nameError = document.getElementById("name-error");
                if (name.value.trim() === "") {
                    nameError.textContent = "Recipient's Name is required";
                    name.classList.add("is-invalid");
                    isValid = false;
                } else {
                    nameError.textContent = "";
                    name.classList.remove("is-invalid");
                    name.classList.add("is-valid");
                }

                // Validate Street Address
                const street = document.getElementById("street");
                const streetError = document.getElementById("street-error");
                if (street.value.trim() === "") {
                    streetError.textContent = "Street Address is required";
                    street.classList.add("is-invalid");
                    isValid = false;
                } else {
                    streetError.textContent = "";
                    street.classList.remove("is-invalid");
                    street.classList.add("is-valid");
                }

                // Validate City, Zip Code, Phone Number (in one row)
                const city = document.getElementById("city");
                const cityError = document.getElementById("city-error");
                if (city.value.trim() === "") {
                    cityError.textContent = "City is required";
                    city.classList.add("is-invalid");
                    isValid = false;
                } else {
                    cityError.textContent = "";
                    city.classList.remove("is-invalid");
                    city.classList.add("is-valid");
                }

                const zipcode = document.getElementById("zipcode");
                const zipcodeError = document.getElementById("zipcode-error");
                if (zipcode.value.trim() === "") {
                    zipcodeError.textContent = "Zip Code is required";
                    zipcode.classList.add("is-invalid");
                    isValid = false;
                } else {
                    zipcodeError.textContent = "";
                    zipcode.classList.remove("is-invalid");
                    zipcode.classList.add("is-valid");
                }

                const phone = document.getElementById("phone");
                const phoneError = document.getElementById("phone-error");
                const phonePattern = /^\d{3}[\-]?\d{3}[\-]?\d{4}$/;
                if (!phone.value.match(phonePattern)) {
                    phoneError.textContent = "Please enter a valid phone number";
                    phone.classList.add("is-invalid");
                    isValid = false;
                } else {
                    phoneError.textContent = "";
                    phone.classList.remove("is-invalid");
                    phone.classList.add("is-valid");
                }

                // Validate Email
                const email = document.getElementById("email");
                const emailError = document.getElementById("email-error");
                if (email.value.trim() === "") {
                    emailError.textContent = "Email Address is required";
                    email.classList.add("is-invalid");
                    isValid = false;
                } else {
                    emailError.textContent = "";
                    email.classList.remove("is-invalid");
                    email.classList.add("is-valid");
                }
            }

            // Step 3 Validation
            if (currentStep === 3) {
                // Validate Credit Card
                const creditCard = document.getElementById("creditCard");
                if (creditCard.value.trim() === "") {
                    showToast("Credit Card Number is required.");
                    creditCard.classList.add('is-invalid');
                    isValid = false;
                } else {
                    creditCard.classList.remove('is-invalid');
                    creditCard.classList.add('is-valid');
                }

                // Validate CVV
                const cvv = document.getElementById("cvv");
                if (cvv.value.trim() === "") {
                    showToast("CVV is required.");
                    cvv.classList.add('is-invalid');
                    isValid = false;
                } else {
                    cvv.classList.remove('is-invalid');
                    cvv.classList.add('is-valid');
                }

                // Validate Expiry Date
                const expiryDate = document.getElementById("expiryDate");
                if (expiryDate.value.trim() === "") {
                    showToast("Expiry Date is required.");
                    expiryDate.classList.add('is-invalid');
                    isValid = false;
                } else {
                    expiryDate.classList.remove('is-invalid');
                    expiryDate.classList.add('is-valid');
                }
            }

            // If the form is valid, proceed to the next step
            if (isValid) {
                currentStep++;
                updateFormStep();
                updateProgressBar();
            } else {
                showToast("Please fill in all required fields correctly.");
            }
        } else if (currentStep === totalSteps) {
            // Step 4: Submit the form after confirming
            const confirmationCheckbox = document.getElementById('confirmationCheckbox');
            
            if (!confirmationCheckbox.checked) {
                showToast("You must confirm that all information is correct before submitting.");
                confirmationCheckboxtext.classList.add('is-invalid');
                document.getElementById('confirmationCheckboxtext').classList.add('is-invalid');
            } else {
                // If confirmed, redirect to Google
                //window.location.href = "https://www.google.com";  // Jump to Google when finish
                modalSetTitle("Order");
                modalSetBody("Order Success");
                modalDisableStatic();
                modalSetCloseBtn(false);
                modalSetSecondaryBtn(false)
                modalSetPrimaryBtn(true,"OK",function () {
                    window.location.href = "/website/pages/customer/UpdateInforPage.html?card=Order"
                })
                showModal()
            }
        }
    });

    // Back button click event
    document.getElementById('backButton').addEventListener('click', function () {
        if (currentStep > 1) {
            currentStep--;
            updateFormStep();
            updateProgressBar();
        }
    });

    // Update the progress bar based on current step
    function updateProgressBar() {
        const progressPercentage = (currentStep / totalSteps) * 100;
        const progressBar = document.getElementById('formProgressBar');
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        progressBar.style.width = progressPercentage + '%';
        progressBar.textContent = Math.round(progressPercentage) + '%';
        if (progressPercentage === 100) {
            progressBar.textContent = 'Finish';
        }
    }

    // Update the form to show the current step
    function updateFormStep() {
        if(currentStep === 1) {
            //hide the back button on the first step
            document.getElementById('backButton').style.display = 'none';
        } else {
            document.getElementById('backButton').style.display = 'block';
        }
        
        for (let i = 1; i <= totalSteps; i++) {
            document.getElementById(`step${i}`).style.display = 'none';
        }
        document.getElementById(`step${currentStep}`).style.display = 'block';

        // Enable/Disable the Back and Next buttons based on current step
        if (currentStep === 1) {
            document.getElementById('backButton').disabled = true;
        } else {
            document.getElementById('backButton').disabled = false;
        }

        if (currentStep === totalSteps) {
            document.getElementById('nextButton').textContent = 'Submit'; // Change button text to 'Submit' on Step 4
        } else {
            document.getElementById('nextButton').textContent = 'Next'; // Default text for other steps
        }
    }

    // Set up initial form step and progress bar
    updateFormStep();
    updateProgressBar();
});
