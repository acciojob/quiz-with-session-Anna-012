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
