$(document).ready(function () {
    $(".answer").click(function (event) {
        event.preventDefault();
        var selectedNumber = +$(this).attr("id").substring(6);
        answerQuestion(selectedNumber);
    });

    $("#playMovie").click(function (event) {
        newQuiz(event, 0);
    });
    $("#playMusic").click(function (event) {
        newQuiz(event, 1);
    });
    $("#playTelevision").click(function (event) {
        newQuiz(event, 2);
    });
});

/* Note: These question numbers are one based. Array index operations need to take one away from these numbers */
var quiz;
var totalQuestions;
var currentQuestionNumber;

function newQuiz(event, quizNumber) {
    event.preventDefault();
    $("#menu").hide();
    $("#quizBoard").show();
    quiz = data.quizzes[quizNumber];
    totalQuestions = quiz.questions.length;
    startTimer();
    currentQuestionNumber = 0;
    moveNext();
}

function answerQuestion(answerNumber) {
    var question = quiz.questions[currentQuestionNumber - 1];
    question.userAnswer = answerNumber;
    showAnswer(question.message, question.userAnswer == question.correctAnswer);
}

function moveNext() {
    if (currentQuestionNumber < totalQuestions) {
        currentQuestionNumber++;
        updateDisplayForQuestion(quiz.questions[currentQuestionNumber - 1]);
    }
    else {
        finish();
    }
}

function finish() {
    var score = 0;
    for (var i = 0; i < quiz.questions.length; i++) {
        var question = quiz.questions[i];
        if (question.correctAnswer == question.userAnswer) {
            score++;
        }
    }

    var message = "That's it! You're finished. You scored " + score + " out of a possible " + quiz.questions.length + ".";
    showFinish(message);
}

function updateDisplayForQuestion(question) {
    $("#questionNumber").text(question.number + "/" + totalQuestions);
    $("#question").text(question.question);
    for (var i = 0; i <= 3; i++) {
        $("#answer" + (i + 1)).text(question.answers[i].answer);
    }
}

function showAnswer(message, correct) {
    var title = "Correct";
    var type = BootstrapDialog.TYPE_SUCCESS;
    if (!correct) {
        title = "Incorrect";
        type = BootstrapDialog.TYPE_DANGER;
    }
    BootstrapDialog.show({
        message: message,
        title: title,
        type: type,
        onhidden: function (dialogRef) {
            moveNext();
        },
        buttons: [
            {
                id: 'btn-ok',
                icon: 'glyphicon glyphicon-check',
                label: 'OK',
                cssClass: 'btn-primary',
                autospin: false,
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }
        ]
    });
}

function showFinish(message) {
    BootstrapDialog.show({
        title: "Completed",
        message: message,
        buttons: [
            {
                id: 'btn-ok',
                icon: 'glyphicon glyphicon-check',
                label: 'OK',
                cssClass: 'btn-primary',
                autospin: false,
                action: function (dialogRef) {
                    dialogRef.close();
                    $("#quizBoard").hide();
                    $("#menu").show();
                }
            }
        ]
    });
}

function startTimer() {
    var timerDate = new Date();
    var minutesDuration = 3;
    timerDate.setMinutes(timerDate.getMinutes() + minutesDuration);
    $("#timer").countdown({until: timerDate, format: 'MS', layout: '{mnn}{sep}{snn}', onExpiry: finish});
}

var data =
{
    quizzes: [
        {
            title: "Movie Quiz",
            questions: [
                {
                    number: 1,
                    question: "Superman is known for wearing which items of clothing?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "Superman is known for wearing a cape.",
                    answers: [
                        {
                            number: 1,
                            answer: "Cape"
                        },
                        {
                            number: 2,
                            answer: "High Heels"
                        },
                        {
                            number: 3,
                            answer: "Lipstick"
                        },
                        {
                            number: 4,
                            answer: "Baseball Cap"
                        }
                    ]
                },
                {
                    number: 2,
                    question: "What names did Walt Disney choose when he animated his dwarves?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "The Seven Dwarves were Happy, Sneezy, Dopey, Grumpy, Sleepy, Doc and Bashful.",
                    answers: [
                        {
                            number: 1,
                            answer: "Dave, Mick, Dash, Jake, Carter, Sidney and Geo"
                        },
                        {
                            number: 2,
                            answer: "Sneeky, Fiddler, Liar, Jumpy, Quicky, Devious and Bliss"
                        },
                        {
                            number: 3,
                            answer: "Happy, Sneezy, Dopey, Grumpy, Sleepy, Doc and Bashful"
                        },
                        {
                            number: 4,
                            answer: "Sniffles, Quirky, Runner, Weepy, Angry, Easy and Frosty"
                        }
                    ]
                },
                {
                    number: 3,
                    question: "According to Peter Pan, what can you do with the right combination of lovely things and fairy dust?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "According to Peter Pan, you can fly with the right combination of lovely things and fairy dust.",
                    answers: [
                        {
                            number: 1,
                            answer: "Teleport"
                        },
                        {
                            number: 2,
                            answer: "Shapeshift"
                        },
                        {
                            number: 3,
                            answer: "Invisible"
                        },
                        {
                            number: 4,
                            answer: "Fly"
                        }
                    ]
                },
                {
                    number: 4,
                    question: "What did James Cagney say he was 'on top of' in the 1948 movie White Heat?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "James Cagney said he was 'on top of the world' in the 1948 movie White Heat.",
                    answers: [
                        {
                            number: 1,
                            answer: "The world"
                        },
                        {
                            number: 2,
                            answer: "The planet"
                        },
                        {
                            number: 3,
                            answer: "The land"
                        },
                        {
                            number: 4,
                            answer: "The earth"
                        }
                    ]
                },
                {
                    number: 5,
                    question: "In which 1984 film did Arnold Schwarzenegger say I'll be back?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Arnold Schwarzenegger said I'll be back in The Terminator",
                    answers: [
                        {
                            number: 1,
                            answer: "Kindergarten Cop"
                        },
                        {
                            number: 2,
                            answer: "Last Action Hero"
                        },
                        {
                            number: 3,
                            answer: "Eraser"
                        },
                        {
                            number: 4,
                            answer: "The Terminator"
                        }
                    ]
                },
                {
                    number: 6,
                    question: "Which of these is the name of a romantic comedy film featuring Julia Roberts?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Julia Roberts starred in Pretty Woman.",
                    answers: [
                        {
                            number: 1,
                            answer: "Titanic"
                        },
                        {
                            number: 2,
                            answer: "What Women Want"
                        },
                        {
                            number: 3,
                            answer: "Serendipity"
                        },
                        {
                            number: 4,
                            answer: "Pretty Woman"
                        }
                    ]
                },
                {
                    number: 7,
                    question: "Which actor played the character 'John McClane' in the 1995 film 'Die Hard: With a Vengeance?'",
                    correctAnswer: 2,
                    userAnswer: 0,
                    message: "Bruce Willis played 'John McClane' in 'Die Hard: With a Vengeance.",
                    answers: [
                        {
                            number: 1,
                            answer: "Graham Greene"
                        },
                        {
                            number: 2,
                            answer: "Bruce Willis"
                        },
                        {
                            number: 3,
                            answer: "Samuel L. Jackson"
                        },
                        {
                            number: 4,
                            answer: "Jeremy Irons"
                        }
                    ]
                }
            ]
        },
        {
            title: "Music Quiz",
            questions: [
                {
                    number: 1,
                    question: "Which singer went from 'Rehab' to cover the Zutons' song 'Valerie' with Mark Ronson?",
                    correctAnswer: 2,
                    userAnswer: 0,
                    message: "Amy Winehouse sang 'Valerie' with Mark Ronson.",
                    answers: [
                        {
                            number: 1,
                            answer: "Adele"
                        },
                        {
                            number: 2,
                            answer: "Amy Winehouse"
                        },
                        {
                            number: 3,
                            answer: "Duffy"
                        },
                        {
                            number: 4,
                            answer: "Lily Allen"
                        }
                    ]
                },
                {
                    number: 2,
                    question: "Which band was led by Kurt Cobain until his untimely death?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Kurt Cobain was the lead singer of Nirvana.",
                    answers: [
                        {
                            number: 1,
                            answer: "Heaven"
                        },
                        {
                            number: 2,
                            answer: "Paradise"
                        },
                        {
                            number: 3,
                            answer: "Utopia"
                        },
                        {
                            number: 4,
                            answer: "Nirvana"
                        }
                    ]
                },
                {
                    number: 3,
                    question: "What was the title of Vanilla Ice's best-selling single?",
                    correctAnswer: 2,
                    userAnswer: 0,
                    message: "Vanilla Ice sang Ice Ice Baby.",
                    answers: [
                        {
                            number: 1,
                            answer: "Ice Dancing"
                        },
                        {
                            number: 2,
                            answer: "Ice Ice Baby"
                        },
                        {
                            number: 3,
                            answer: "Ice to the max"
                        },
                        {
                            number: 4,
                            answer: "Ice Time"
                        }
                    ]
                },
                {
                    number: 4,
                    question: "Who were 'Scary, Baby, Ginger, Posh and Sporty'?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "'Scary, Baby, Ginger, Posh and Sporty' were The Spice Girls.",
                    answers: [
                        {
                            number: 1,
                            answer: "The Bangles"
                        },
                        {
                            number: 2,
                            answer: "Girls Aloud"
                        },
                        {
                            number: 3,
                            answer: "The Spice Girls"
                        },
                        {
                            number: 4,
                            answer: "The Saturdays"
                        }
                    ]
                },
                {
                    number: 5,
                    question: "Fill in the missing word from the Beatles' song '... in the Sky with Diamonds'",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "The Beatles sang 'Lucy in the Sky with Diamonds.'",
                    answers: [
                        {
                            number: 1,
                            answer: "Deidre"
                        },
                        {
                            number: 2,
                            answer: "Claire"
                        },
                        {
                            number: 3,
                            answer: "Brenda"
                        },
                        {
                            number: 4,
                            answer: "Lucy"
                        }
                    ]
                },
                {
                    number: 6,
                    question: "Which reggae star sang with The Wailers and had a hit with 'No Woman, No Cry'?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "Bob Marley sang with The Wailers and sang 'No Woman, No Cry.'",
                    answers: [
                        {
                            number: 1,
                            answer: "Junior Braithwaite"
                        },
                        {
                            number: 2,
                            answer: "Bunny Wailer"
                        },
                        {
                            number: 3,
                            answer: "Peter Tosh"
                        },
                        {
                            number: 4,
                            answer: "Bob Marley"
                        }
                    ]
                },
                {
                    number: 7,
                    question: "Which Californian 'surfing' group was founded by the Wilson brothers?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "The Beach Boys were founded by the Wilson brothers.",
                    answers: [
                        {
                            number: 1,
                            answer: "Beach Boys"
                        },
                        {
                            number: 2,
                            answer: "Monkees"
                        },
                        {
                            number: 3,
                            answer: "The Seekers"
                        },
                        {
                            number: 4,
                            answer: "The New Seekers"
                        }
                    ]
                },
                {
                    number: 8,
                    question: "Fill in the state name of this song title 'Sweet Home...' by Lynyrd Skynyrd",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "The name of the song is 'Sweet Home Alabama.'",
                    answers: [
                        {
                            number: 1,
                            answer: "Arkansas"
                        },
                        {
                            number: 2,
                            answer: "Alaska"
                        },
                        {
                            number: 3,
                            answer: "Alabama"
                        },
                        {
                            number: 4,
                            answer: "Arizona"
                        }
                    ]
                }
            ]
        },
        {
            title: "Television Quiz",
            questions: [
                {
                    number: 1,
                    question: "What is the correct name of the 1984 sit-com starring Phylicia Rashad?",
                    correctAnswer: 1,
                    userAnswer: 0,
                    message: "Phylicia Rashad starred in 'The Cosby Show.'",
                    answers: [
                        {
                            number: 1,
                            answer: "The Cosby Show"
                        },
                        {
                            number: 2,
                            answer: "The Posby Show"
                        },
                        {
                            number: 3,
                            answer: "The Fosby Show"
                        },
                        {
                            number: 4,
                            answer: "The Losby Show"
                        }
                    ]
                },
                {
                    number: 2,
                    question: "What is the correct name of the 1989 sit-com starring Elizabeth Berkley?",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "Elizabeth Berkley starred in 'Saved By The Bell'.",
                    answers: [
                        {
                            number: 1,
                            answer: "Saved By The Ding"
                        },
                        {
                            number: 2,
                            answer: "Saved By The Dong"
                        },
                        {
                            number: 3,
                            answer: "Saved By The Bell"
                        },
                        {
                            number: 4,
                            answer: "Saved By The Chime"
                        }
                    ]
                },
                {
                    number: 3,
                    question: "Which character is played by William Roache in 'Coronation Street'?",
                    correctAnswer: 2,
                    userAnswer: 0,
                    message: "William Roache played Ken Barlow in 'Coronation Street.'",
                    answers: [
                        {
                            number: 1,
                            answer: "Keith Appleyard"
                        },
                        {
                            number: 2,
                            answer: "Ken Barlow"
                        },
                        {
                            number: 3,
                            answer: "Dev Alahan"
                        },
                        {
                            number: 4,
                            answer: "Jamie Baldwin"
                        }
                    ]
                },
                {
                    number: 4,
                    question: "Bullseye combined a quiz with which game?",
                    correctAnswer: 4,
                    userAnswer: 0,
                    message: "'Bullseye' combines a quiz game with Darts.",
                    answers: [
                        {
                            number: 1,
                            answer: "Snooker"
                        },
                        {
                            number: 2,
                            answer: "Tennis"
                        },
                        {
                            number: 3,
                            answer: "Football"
                        },
                        {
                            number: 4,
                            answer: "Darts"
                        }
                    ]
                },
                {
                    number: 5,
                    question: "What is the correct name of the 1985 sit-com starring Beatrice Arthur",
                    correctAnswer: 3,
                    userAnswer: 0,
                    message: "Beatrice Arthur starred in 'The Golden Girls.'",
                    answers: [
                        {
                            number: 1,
                            answer: "The Murrh Girls"
                        },
                        {
                            number: 2,
                            answer: "The Bronze Girls"
                        },
                        {
                            number: 3,
                            answer: "The Golden Girls"
                        },
                        {
                            number: 4,
                            answer: "The Silver Girls"
                        }
                    ]
                }
            ]
        }
    ]
};