
$(document).ready(function () {

  var right = 0;
  var wrong = 0;
  var secs = 10;
  var timer;
  var questionNum = 1;
  var newBut;
  var answer;
  var answered = false;
  var score;
  var newBut;
  var response = $("<h3>");
  var responsePic = $("<img>");
  var questionDisplay = $("<p>");
  var timeDisplay = $("#timer");
  var answerSpot;

  var data = [["General Computer Industry Trivia", "./assets/images/circuit-board-background.jpg"],
  ["The first computer ever made was the….?", "ENIAC (1946)", "MARVIN (1932)", "WOPER (1986)","HAL(2000)",1, "./assets/images/ENIAC.jpg"],
  ["What was going to be google’s name before landed on google (a derivation of googol.)", "Backrub (because of weighting importance of backlinks.)", "Bubble sort (because of the sorting algorithm.)", "Dogpile (because the site with the biggest pile of links is referenced.)", "Hullie (combination of the founder’s girlfriend’s names.)", 1, "./assets/images/backrub.png"],
  ["What standard allows us to type in names to find web servers instead of numbers?", "TCP/IP - Transmission control/ internet protocol", "SMTP – Simple Mail Transfer Protocol", "DNS – Domain Name System", "Whois -  query and response protocol over RPC", 3, "./assets/images/DNS.jpg"],
  ["According to Forbes Richest List of 2017, who is the richest person from Tech industry?", "Jeff Bezos, Amazon", "Bill gates, Microsoft", "Mark Zuckerberg, FaceBook", "Larry Ellison, Oracle", 2, "./assets/images/bgates.jpg"],
  ["True/False – The term “bug” actually came about because a moth was found inside of a computer causing problems.", "True – it was found by Grace Hopper and even taped into the log book.", "False - the term was around since WWII.",2, "./assets/images/bug.jpg"],
  ["When was the first SPAM sent?", "1982 by a Microsoft salesman to a bulletin board.", "1992 on a NetWare server.", "1978 by a DEC salesman to 400 unsuspecting users on ARPANET.",3, "./assets/images/first_spam_email.jpg"],
  ["Who invented the floppy disk?", "IBM", "Tandy", "Apple", "TEAC", 1, "./assets/images/floppy.jpg"]
  ];


 var title=$("#title");
 title.text(data[0][0]);
 $("#title").append(title);


  startButton();



  $(".start").on("click", function (event) {
    event.preventDefault();
    question();
  });





// Functions 


  function clicker () {


    $(".choices").on("click", function (event) {
      event.preventDefault();
      console.log("click");

      // check to stop multiple button clicks (could add rights/wrongs to game)
      if (answered) {
        return;
      };
      answered = true;
      answer = $(this).val();

  
      if (answer == data[questionNum][answerSpot]) {
        response.text("correct!");
        right++;
        scoreBoard();
      }
      else {
        wrongAnswer();
      }
    });


  };





  function clock() {
    secs--;
    timeDisplay.text("Time remaining for this question: " + secs + " seconds.");
    if (secs == 0) {

      wrongAnswer();
    }

  }

  function question() {
    if (questionNum > (data.length-1)) {
      restart();
      return;
    };

    timeDisplay.text("Time remaining for this question: 10 seconds.");
    $("#scoreBoard").html("Right Answers: " + right + ", Wrong Answers: " + wrong + ", Questions remaining: " + (data.length-(questionNum)));
    questionDisplay.text(questionNum + ". " + data[questionNum][0]);
    $("#question").append(questionDisplay);
    answered = false;
    answerSpot=data[questionNum].length-2
    timer = setInterval(clock, 1000);


    $("#choices").empty();
    $("#result").empty();
    $("#resultPic").empty();

    for (i = 1; i < (data[questionNum].length - 2); i++) {

      newBut = $("<button>");
      newBut.addClass("choices");
      newBut.text(i + ". " + data[questionNum][i]);
      newBut.attr("value", i);
      $("#choices").append(newBut);
      $("#choices").append("<br>");
      answered = false;
    };
    clicker();
  };

// I had to break wrong answers out so that the countdown clock could also call it.

  function wrongAnswer() {
    response.text("Sorry! it was " + data[questionNum][data[questionNum][answerSpot]]);
    wrong++;
    scoreBoard();    
  };

  function startButton() {
    $("#scoreBoard").empty();
    var startBut = $("<button>");
    startBut.addClass("start");
    startBut.text("Start Game!");
    $("#scoreBoard").append(startBut);
  };

  function scoreBoard() {
    clearInterval(timer);
    $("#scoreBoard").empty();
    score = $("<h2>");
    score = ("Right Answers: " + right + ", Wrong Answers: " + wrong + ", Questions remaining: " + (data.length-(questionNum)));
    var picSpot=data[questionNum].length-1
    console.log("pic spot" + picSpot);
    responsePic.attr("src", data[questionNum][picSpot]);
    $("#scoreBoard").html(score);
    $("#result").append(response);
    $("#resultPic").append(responsePic);
    secs=10;
    questionNum++;
    setTimeout(question, 3000);
  };

  function restart() {

    var restartBut = $("<button>");
    restartBut.addClass("restart");
    restartBut.text("Restart Game!");
    $("#scoreBoard").empty();
    $("#timer").empty();
    $("#question").empty();
    $("#choices").empty();
    $("#result").empty();
    $("#response").empty();
    $("#resultPic").empty();
    $("#question").text("Final Score: ");
    $("#question").append(" Right: " + right);
    $("#question").append(" Wrong: " + wrong);

    $("#resultPic").html(restartBut);

   $(".restart").on("click", function (event) {
     event.preventDefault();
     right = 0;
     wrong = 0;
     secs = 10;
     questionNum = 1;
     answered = false;

  
     $("#resultPic").empty();
     $("#question").empty();

     question();
   });



  }






























































});

