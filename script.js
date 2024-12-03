//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Select DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load saved progress from session storage
function loadProgress() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  return savedProgress;
}

// Save progress to session storage
function saveProgress(questionIndex, selectedChoice) {
  const progress = loadProgress();
  progress[questionIndex] = selectedChoice;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Render questions dynamically
function renderQuestions() {
  const savedProgress = loadProgress();

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Create question wrapper
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    // Create and append question text
    const questionText = document.createElement("h3");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    // Create and append choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      // Create input for choice
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the saved progress matches this choice
      if (savedProgress[i] === choice) {
        choiceElement.checked = true;
      }

      // Add event listener to save progress when a choice is selected
      choiceElement.addEventListener("change", () => {
        saveProgress(i, choice);
      });

      // Create label for choice and append input and text
      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));

      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Calculate the score
function calculateScore() {
  const savedProgress = loadProgress();
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (savedProgress[i] === questions[i].answer) {
      score++;
    }
  }

  return score;
}

// Handle quiz submission
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
  localStorage.setItem("score", score); // Save score in local storage
});

// Render questions on page load
renderQuestions();
