let currentQuestion = 1;
const totalQuestions = 3;

function showQuestion(questionNumber) {
    jQuery('.question').removeClass('active'); // Remove 'active' class from all questions
    jQuery('.question').eq(questionNumber - 1).addClass('active'); // Add 'active' class to the specified question
}


jQuery(document).ready(function() {
    showQuestion(currentQuestion);
    updateProgressBar();

    jQuery('#prevButton').click(function() {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgressBar();
        }
        if (currentQuestion !== 3) {
            jQuery('#nextButton').text("Next")
            jQuery('#nextButton').show()
        }
    });
    
    jQuery('#nextButton').click(function() {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgressBar();
        }
        if (currentQuestion == 3) {
            jQuery('#nextButton').hide()
            jQuery('#nextButton').text("Finished")
        } else {
            jQuery('#nextButton').text("Next")
        }
    });

    function updateProgressBar() {
        const progress = (currentQuestion - 1) / (totalQuestions - 1) * 100;
        jQuery('#progressBar').css('width', progress + '%');
    }
});