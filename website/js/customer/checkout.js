document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 4;

    function updateProgressBar() {
        const progressPercentage = (currentStep / totalSteps) * 100;
        let progressBar = document.getElementById('formProgressBar');
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        progressBar.style.width = progressPercentage + '%';
        progressBar.textContent = progressPercentage + '%';

        if (progressPercentage === 100) {
            progressBar.textContent = 'Finish';
        } else {
            progressBar.textContent = Math.round(progressPercentage) + '%';
        }
        
    }

    function updateFormStep() {
        for (let i = 1; i <= totalSteps; i++) {
            document.getElementById(`step${i}`).style.display = 'none';
        }
        document.getElementById(`step${currentStep}`).style.display = 'block';
    }

    document.getElementById('nextButton').addEventListener('click', function () {
        if (currentStep < totalSteps) {
            currentStep++;
            updateFormStep();
            updateProgressBar();
        }

        if (currentStep === totalSteps) {
            this.textContent = 'Check Out';
        }

        document.getElementById('backButton').disabled = false;
    });

    document.getElementById('backButton').addEventListener('click', function () {
        if (currentStep > 1) {
            currentStep--;
            updateFormStep();
            updateProgressBar();
        }

        if (currentStep === 1) {
            this.disabled = true;
        }

        if (currentStep < totalSteps) {
            document.getElementById('nextButton').textContent = 'Next';
        }
    });

  
    updateFormStep();
    updateProgressBar();
});
