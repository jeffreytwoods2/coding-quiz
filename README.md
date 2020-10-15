# coding-quiz

Functionality:

Students take quiz to prepare for coding interview.
5-minute timer starts once the student begins the quiz.
If the student gets a question wrong, they lose one minute of time.
If they get a question right, they gain a point.
Points are tallied up at the end, and student may save their username and their high score if they wish.


HTML:

Layout is very simple; <h1> header is repurposed after landing page to be the question-asking element
Parapgraph element is hidden after quiz begins, and is repurposed to show the score at the end
Question buttons only appear once quiz has begun and disappear once quiz has ended
  
  
CSS:

Bootstrap framework used, mostly for the button styling. 
Most adjustments such as center-aligning text and elements were done on my own stylesheet; Bootstrap may not have been necessary at all

JavaScript:

Timer is an interval counting down one second at a time
Logic was applied to start and stop the timer at the correct pages, and to display the digits correctly (eg. there is a "0" in front of single-digit numbers)
Separate functions that either build up the score or dock minutes, tied to answer buttons with the 'onclick' attribute
If user enters a username, then their username and score are stored in local storage and are called back on the following page, showing their name and score together

