const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const questionContainerElement = document.getElementById('question-container');
const answerButtonElement = document.getElementById('answer-buttons');
const questionElement = document.getElementById('question');
const resultContainerElement = document.getElementById('result-container');
const resultTextElement = document.getElementById('result-text');

let currentQuestionIndex = 1;

const planets = {
    "Mars"     : 0,    // Adventurous
    "Venus"    : 0,    // Analytical
    "Jupiter"  : 0,    // Optimistic
    "Uranus"   : 0,    // Romantic
};

const planetDescriptions = {
    "Mars": "You're adventurous and bold! Like Mars, you have a fiery spirit and thrive on challenges. You're not afraid to take risks and explore uncharted territories. Your courage and determination make you a natural leader in any expedition.",
    "Venus": "You're analytical and thoughtful! Like Venus, you have a scientific mind and love to learn. You approach life with curiosity and wisdom, always seeking to understand the deeper meaning behind things. Your intellectual nature makes you a valuable guide and teacher.",
    "Jupiter": "You're optimistic and spontaneous! Like Jupiter, you radiate positive energy and see the bright side of every situation. You embrace life with enthusiasm and aren't afraid to take chances. Your joyful spirit lifts those around you and makes any journey more enjoyable.",
    "Uranus": "You're romantic and mysterious! Like Uranus, you have a unique perspective and approach life with creativity. You value meaningful connections and see beauty in the unexpected. Your dreamy nature helps you find wonder in the cosmos of everyday life."
};

startButton.addEventListener('click', startQuiz);
if(restartButton){
    restartButton.addEventListener('click', restartQuiz);
}


function startQuiz() {
    console.log('Started');
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 1;
    resetPlanetScores();
    setNextQuestion();

}

function restartQuiz() {
    resultContainerElement.classList.add('hide');
    startButton.classList.remove('hide');
    currentQuestionIndex = 1;
    resetPlanetScores();

}

function resetPlanetScores() {
    for(let planet in planets){
        planets[planet] = 0;
    }
}

function setNextQuestion() {
    if(questions[currentQuestionIndex]){
        showQuestion(currentQuestionIndex);
    }
    else{
        showResults();
    }
}

function showQuestion(questionNumber) {
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }

    const question = questions[questionNumber];
    questionElement.innerText = question.question_text;

    // Update the question image if available
    const questionImage = document.getElementById('question-image');
    if (question.image) {
    questionImage.src = question.image;
    // Make sure the image is displayed if it was previously hidden
    questionImage.style.display = "block";
    } else {
    // Hide image if none is provided for this question
    questionImage.style.display = "none";
    }

    Object.entries(question.question_choices).forEach(([choice, value]) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(value));
        answerButtonElement.appendChild(button);
    });

}

function selectAnswer(answerData) {
    const nextQuestionIndex = answerData[0];
    const planetPoints = answerData[1];

    planetPoints.forEach(planet => {
        planets[planet] += 1;
    });

    currentQuestionIndex = nextQuestionIndex;
    setNextQuestion();
}

function showResults() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    
    // Find the planet with the highest score
    let maxScore = 0;
    let dominantPlanet = "";
    
    for (const planet in planets) {
        if (planets[planet] > maxScore) {
            maxScore = planets[planet];
            dominantPlanet = planet;
        }
    }
    
    // Check for ties
    const tiedPlanets = [];
    for (const planet in planets) {
        if (planets[planet] === maxScore && planet !== dominantPlanet) {
            tiedPlanets.push(planet);
        }
    }
    
    // Display results
    let resultText = "";
    if (tiedPlanets.length > 0) {
        // Handle tie
        tiedPlanets.push(dominantPlanet);
        resultText = `Your cosmic personality is a blend of ${tiedPlanets.join(' and ')}!\n\n`;
        tiedPlanets.forEach(planet => {
            resultText += `${planet}: ${planetDescriptions[planet]}\n\n`;
        });
    } else {
        resultText = `Your cosmic personality aligns with ${dominantPlanet}!\n\n${planetDescriptions[dominantPlanet]}`;
    }

    window.dominantPlanet = dominantPlanet;
    resultTextElement.innerText = resultText;

    document.getElementById('start-photo-btn').addEventListener('click', startPhotoReveal);
    console.log("Final scores:", planets);
}

// tracker for our current photo
let currentPhotoIndex = 0;

function startPhotoReveal() {
    resultContainerElement.classList.add('hide');
    document.getElementById('photo-container').classList.remove('hide');

    currentPhotoIndex = 0;
    showNextPhoto();
    document.getElementById('yes-button').addEventListener('click', handleYes);
    document.getElementById('no-button').addEventListener('click', handleNo);
}

// function to show the next photos
function showNextPhoto() {
    const dominantPlanet = window.dominantPlanet;
    const photos = planetPhotos[dominantPlanet];
    const photoElement = document.getElementById('match-photo');

    // checking for if no more photos available
    if (currentPhotoIndex < photos.length) {
        photoElement.src = photos[currentPhotoIndex];
        photoElement.style.display = "block";
    }

    else { // no more photos
        document.getElementById('photo-message').innerText = "picky ass, you don't deserve anyone";
        document.getElementById('photo-message').classList.remove('hide');

    }
}
// if yes, match made
function handleYes() {
    document.querySelector('.photo-controls').classList.add('hide');

    // Set and show the congratulatory message.
    const photoMessage = document.getElementById('photo-message');
    photoMessage.innerText = "Congrats! You have officially found your alien soulmate!";
    photoMessage.classList.remove('hide');
}
// no means to go to the next one
function handleNo() {
   currentPhotoIndex++;
   showNextPhoto();
}

const questions = {
    // question 1
    "1": {
        "question_text": "Imagine you're about to go on a space expedition. Which mission resonates with you the most?",
        "question_choices": {
            "The Red Frontier: a daring expedition full of challenges and bold adventures": [2, ["Mars"]],
            "The Enchanted Orbit: a mellow expedition with a touch of mystery and unexpectedness, while enjoying the scenery": [2, ["Uranus"]],
            "The Timeless Voyage: an educational expedition, using the opportunity to learn something": [2, ["Venus"]],
            "The Radiant Journey: focusing on having a good time through spontaneous activities": [2, ["Jupiter"]]
        },
        "image": "images/question_1.jpg"
    },


    // question 2
    "2": {
        "question_text": "While traversing through a star system, you come across a mysterious nebula pulsing with energy. How do you interact with it?",
        "question_choices": {
            "Reflective Sage: You stop to think about the deeper meanings and lessons the nebula might be able to offer.": [3, ["Venus"]],
            "Bold Explorer: You leap into the unknown, being eager and experienced to experience its raw energy and want to uncover its secrets.": [3, ["Mars"]],
            "Overthink Genie:  You deeply think about its energy and wonder what it potentially has to benefit you. ": [3, ["Uranus"]],
            "Hopeful Dreamer: You see the nebula as a symbol of infinite possibilities and want to embrace the encounter with optimism.": [3, ["Jupiter"]]
        },
        "image": "images/question_2.jpg"
    },

    // question 3
    "3": {
        "question_text": "Through your journey through space, your spaceship suddenly encounters a mysterious cosmic rift. How do you feel?",
        "question_choices": {
            "Double Dare: You enter the rift, having the only thought in your mind to move forward!": [4, ["Jupiter"]],
            "Spiriter: You've been waiting for something like this to happen, driven and excited by the thrill of what might be in there.": [4, ["Mars"]],
            "Future Prayer: You want to embrace the rift, thinking of it as a symbol of boundless opportunity and renewal. Confident that it will hold positive changes for your future.": [4, ["Uranus"]],
            "Thoughtful Learner: You're excited to use this opportunity as a lesson to learn what's inside.": [4, ["Venus"]],
        },
        "image": "images/question_3.jpg"
    },
    
    // question 4
     "4": {
        "question_text": "Your co-astronauts have some conflict amongst each other. How do you resolve it?",
        "question_choices": {
            "Instigator: You join in, what's the worst that can happen?": [5, ["Mars"]],
            "Lovers Quarrel: You consider the fact that you might ruin your relationship with either one, so you leave it alone.": [5, ["Uranus"]],
            "High thinker: You believe that it won't escalate too far, so you leave them be.": [5, ["Jupiter"]],
            "Friendly Teacher: You break the fight and lecture them.": [5, ["Venus"]],
        },
        "image": "images/question_4.jpg"
    },

    // question 5
    "5": {
        "question_text": "While everyone is sleeping, you notice something unfamiliar coming your way. What do you do?",
        "question_choices": {
            "Don't Care: You ignore it, worst case scenario it makes a small dent.": [6, ["Jupiter"]],
            "Crying Wolf: You run to the others, relying on them to know what to do.": [6, ["Uranus"]],
            "Curious George: You move the ship forward, you have to know what it is.": [6, ["Mars"]],
            "Teach me: You wake the others, out of hopes they can teach you what it is.": [6, ["Venus"]],
        },
        "image": "images/question_5.avif"
    },

    // question 6
    "6": {
        "question_text": "You and your team finally land on an unknown planet. What is the first thing you do?",
        "question_choices": {
            "Observing Nerd: You immediately look and observe, analyzing the dust, temperature, etc.": [7, ["Venus"]],
            "Buddy System: Grab a partner! You can't explore without experiencing it with somebody. Makes it more enjoyable.": [7, ["Uranus"]],
            "Priorities: You have to explore every inch, what if there are aliens on planet?": [7, ["Jupiter"]],
            "Faster: You run off, the thought of everything being unknown thrills you to the bone.": [7, ["Mars"]],
        },
        "image": "images/question_6.jpg"
    },

    // question 7
    "7": {
        "question_text": "During your adventure on this new planet, you get lost. How do you feel?",
        "question_choices": {
            "Who Cares: You'll find them eventually.": [8, ["Jupiter"]],
            "Tunnel Vision: This marking on this rock is too fascinating.": [8, ["Venus"]],
            "Solo: Awesome, the thought of being alone excites you.": [8, ["Mars"]],
            "Help!: You're absolutely terrified. who knows what's around here?!": [8, ["Uranus"]],
        },
        "image": "images/question_7.jpg"
    },
    
    // question 8
    "8": {
        "question_text": "After about an hour, you're still alone and have encountered a liquid that appears to look like water. What do you do?",
        "question_choices": {
            "Patience is Key: You would rather wait until you have fully deduced if it's ok to drink it or not.": [9, ["Venus"]],
            "Lets do it: The thought of the unknown intruiges you. You take a sip.": [9, ["Mars"]],
            "Partnership!: Thirstiness is not important, finding someone is. ": [9, ["Uranus"]],
            "Why not: It looks close enough, lets try it.": [9, ["Jupiter"]],
        },
        "image": "images/question_8.jpg"
    },

    // question 9
    "9": {
        "question_text": "Some time goes by and you finally found your peers. How did you find them?",
        "question_choices": {
            "Mapper: You found them through your own deduction skills.": [10, ["Venus"]],
            "Isolation: You sat in place until someone found you.": [10, ["Uranus"]],
            "Oh well: Random chance. You knew you'd find them eventually.": [10, ["Jupiter"]],
            "Random Chance: You were adventuring randomly and just happened to encounter them.": [10, ["Mars"]],
        },
        "image": "images/question_9.webp"
    },

    // question 10
    "10": {
        "question_text": "It's time to head back to the ship. What would be your regret?",
        "question_choices": {
            "Memorable thoughts: That you didn't get to write down every thought you had.": [0, ["Venus"]],
            "Unseen: How you wish you could've used this chance to bond with everyone more.": [0, ["Uranus"]],
            "New beginnings: No regrets, everything will come to happen anyways. ": [0, ["Jupiter"]],
            "Thriller: To explore more. ": [0, ["Mars"]],
        },
        "image": "images/question_10.jpg"
    },
}

// photos for each planet
const planetPhotos = {
    "Mars" : [
        "images/mars_alien_one.webp",
        "images/mars_alien_two.webp",
        "images/mars_alien_three.webp"

    ],

    "Venus" : [
        "images/venus_alien_one.webp",
        "images/venus_alien_two.webp",
        "images/venus_alien_three.webp"
    ],
    "Jupiter" : [
        "images/jupiter_alien_one.webp",
        "images/jupiter_alien_two.webp",
        "images/jupiter_alien_three.webp"

    ],
    "Uranus" : [
        "images/uranus_alien_one",
        "images/uranus_alien_two.webp",
        "images/uranus_alien_three.webp"
    ]
};

        