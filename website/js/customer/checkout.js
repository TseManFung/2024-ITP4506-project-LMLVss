document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 4;

    const form = document.getElementById("address-form");

    // Helper function to show error messages using Toast
    function showToast(message) {
        const toastBody = document.getElementById("toastBody");
        toastBody.textContent = message;
        const toast = new bootstrap.Toast(document.getElementById("toastMessage"));
        toast.show();
    }

    // Validate the form on Next button click
    document.getElementById('nextButton').addEventListener('click', function () {
        if (currentStep === 2) {
            // Step 2 validation logic
            let isValid = true;

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
            }

            // Validate City
            const city = document.getElementById("city");
            const cityError = document.getElementById("city-error");
            if (city.value.trim() === "") {
                cityError.textContent = "City is required";
                city.classList.add("is-invalid");
                isValid = false;
            } else {
                cityError.textContent = "";
                city.classList.remove("is-invalid");
            }

            // Validate Zip Code
            const zipcode = document.getElementById("zipcode");
            const zipcodeError = document.getElementById("zipcode-error");
            if (zipcode.value.trim() === "") {
                zipcodeError.textContent = "Zip Code is required";
                zipcode.classList.add("is-invalid");
                isValid = false;
            } else {
                zipcodeError.textContent = "";
                zipcode.classList.remove("is-invalid");
            }

            // Validate Phone Number
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
            }

            // If the form is valid, proceed to the next step
            if (isValid) {
                currentStep++;
                updateFormStep();
                updateProgressBar();
            } else {
                showToast("Please fill in all required fields correctly.");
            }
        } else if (currentStep < totalSteps) {
            // Move to the next step if it's not step 2
            currentStep++;
            updateFormStep();
            updateProgressBar();
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
        let progressBar = document.getElementById('formProgressBar');
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        progressBar.style.width = progressPercentage + '%';
        progressBar.textContent = Math.round(progressPercentage) + '%';

        if (progressPercentage === 100) {
            progressBar.textContent = 'Finish';
        }
    }

    // Update the form to show the current step
    function updateFormStep() {
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
            document.getElementById('nextButton').textContent = 'Submit';
        } else {
            document.getElementById('nextButton').textContent = 'Next';
        }
    }

    // Set up initial form step and progress bar
    updateFormStep();
    updateProgressBar();
});
