const quizzes = {
  js: [
    {
      question: "Which method is used to output data to the console in JavaScript?",
      options: ["console.log()", "print()", "echo()", "display()"],
      answer: "console.log()"
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "#", "--", "/* */"],
      answer: "//"
    },
    {
      question: "What is the correct syntax to create a function in JavaScript?",
      options: ["function myFunc()", "def myFunc()", "create myFunc()", "fn myFunc()"],
      answer: "function myFunc()"
    },
    {
      question: "Which keyword is used to define a constant in JavaScript?",
      options: ["const", "let", "var", "define"],
      answer: "const"
    }
  ],
  py: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      answer: "def"
    },
    {
      question: "Which of these is a correct way to print in Python?",
      options: ["echo()", "console.log()", "print()", "write()"],
      answer: "print()"
    },
    {
      question: "How do you write a comment in Python?",
      options: ["-- comment", "# comment", "// comment", "/* comment */"],
      answer: "# comment"
    },
    {
      question: "Which data type is used to store text in Python?",
      options: ["str", "text", "char", "string"],
      answer: "str"
    }
  ]
};

let currentQuiz = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const quizTitle = document.getElementById("quizTitle");

function startQuiz(category) {
  currentQuiz = quizzes[category];
  currentQuestion = 0;
  score = 0;
  quizTitle.textContent = `${category.toUpperCase()} Quiz`;
  loadQuestion();
}

function loadQuestion() {
  const q = currentQuiz[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => {
      document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
      if (option === q.answer) {
        score++;
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
        [...document.querySelectorAll('.option-btn')].find(b => b.textContent === q.answer).classList.add("correct");
      }
      nextBtn.style.display = "inline-block";
    };
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < currentQuiz.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    resultEl.textContent = `Your Final Score: ${score}/${currentQuiz.length}`;
  }
});

// Joke API
const loadJokeBtn = document.getElementById("loadJoke");
const jokeText = document.getElementById("jokeText");

loadJokeBtn.addEventListener("click", async () => {
  jokeText.textContent = "Loading...";
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    const data = await res.json();
    jokeText.textContent = data.joke;
  } catch (error) {
    jokeText.textContent = "Failed to load joke.";
  }
});
