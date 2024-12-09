//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
function renderQuestions() {
  const savedProgress = loadProgress();

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Create question wrapper
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    // Create and append question text (remove numbering)
    const questionText = document.createElement("h3");
    questionText.textContent = question.question; // Exclude numbering here
    questionElement.appendChild(questionText);

    // Create and append choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      if (savedProgress[i] === choice) {
        choiceElement.checked = true;
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));

      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Questions data
const questions = [
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5"],
    answer: "4",
  },
  {
    question: "Which language is used for web development?",
    choices: ["Python", "JavaScript", "C++"],
    answer: "JavaScript",
  },
  {
    question: "Which tag is used to create a hyperlink?",
    choices: ["<a>", "<link>", "<href>"],
    answer: "<a>",
  },
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter"],
    answer: "Mars",
  },
];

// DOM Elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load progress from sessionStorage
function loadProgress() {
  return JSON.parse(sessionStorage.getItem("progress")) || {};
}

// Save progress to sessionStorage
function saveProgress(progress) {
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Render questions
function renderQuestions() {
  const savedProgress = loadProgress();

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Create question wrapper
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    // Create and append question text
    const questionText = document.createElement("h3");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Create and append choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore progress
      if (savedProgress[i] === choice) {
        choiceElement.checked = true;
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));

      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));

      // Add change listener to save progress
      choiceElement.addEventListener("change", () => {
        const progress = loadProgress();
        progress[i] = choice;
        saveProgress(progress);
      });
    }

    questionsElement.appendChild(questionElement);
  }
}

// Calculate score
function calculateScore() {
  const progress = loadProgress();
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (progress[i] === questions[i].answer) {
      score++;
    }
  }

  return score;
}

// Submit quiz and display score
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;

  // Save score to localStorage
  localStorage.setItem("score", score);
});

// Initialize quiz
renderQuestions();

