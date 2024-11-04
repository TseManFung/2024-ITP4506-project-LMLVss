$(document).ready(function() {
    urlParam = new URLSearchParams(window.location.search);
    if (urlParam.has('price')) {
        $('span[name="price"]').text(urlParam.get('price'));
    }else{
        $('span[name="price"]').text('Error');
    }
    const timer = $('#timer');
        let time = 300; // 5 minutes in seconds

        const countdown = setInterval(function() {
            // Calculate minutes and seconds
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;

            // Format the time as MM:SS
            const formattedTime = 
                (minutes < 10 ? '0' : '') + minutes + ':' + 
                (seconds < 10 ? '0' : '') + seconds;

            // Display the formatted time
            timer.text(formattedTime);

            // Decrease the time
            time--;

            // Stop the countdown when time is up
            if (time < 0) {
                clearInterval(countdown);
                timer.text("00:00"); // Optional: display 00:00 when finished
            }
        }, 1000); // Update every second

})