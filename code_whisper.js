const getStartedBtn = document.getElementById('getStartedBtn');
const landingSection = document.getElementById('landingSection');
const codeSection = document.getElementById('codeSection');
const explainBtn = document.getElementById('explainBtn');
const pythonCode = document.getElementById('pythonCode');
const lineExplanation = document.getElementById('lineExplanation');
const feedback = document.getElementById('feedback');
const feedbackYes = document.getElementById('feedbackYes');
const feedbackNo = document.getElementById('feedbackNo');
const thankYouMessage = document.getElementById('thankYouMessage');

// Show code section
getStartedBtn.addEventListener('click', () => {
  landingSection.style.opacity = 0;
  landingSection.style.transform = "translateY(-50px)";
  setTimeout(() => {
    landingSection.style.display = "none";
    codeSection.classList.add('show-section');
    pythonCode.focus();
  }, 800);
});

// Explain Python code line by line (human-like, no output)
explainBtn.addEventListener('click', () => {
  const code = pythonCode.value.trim();
  if (!code) {
    alert("Please paste your Python code to explain!");
    return;
  }

  const lines = code.split('\n');
  let explanationHtml = "";

  lines.forEach((line, idx) => {
    if (line.trim() === "") return;
    explanationHtml += `<div><strong>Line ${idx+1}:</strong> <code>${line}</code><br>
      <em>Explanation:</em> ${generateHumanExplanation(line)}</div><br>`;
  });

  lineExplanation.innerHTML = explanationHtml;
  feedback.style.display = 'block';
  thankYouMessage.innerHTML = '';
});

// Feedback buttons
feedbackYes.addEventListener('click', () => {
  thankYouMessage.innerHTML = "Thanks for your feedback! 😊 Glad it was useful.";
});
feedbackNo.addEventListener('click', () => {
  thankYouMessage.innerHTML = "Thanks for your feedback! 🙏 I’ll improve the explanation next time.";
});

// Simple human-like explanation generator (improved)
function generateHumanExplanation(line) {
  line = line.trim();
  
  if (line.startsWith("#")) {
    return "This is a comment explaining the code or giving context.";
  } else if (line.includes("print")) {
    return "This line prints information to the console.";
  } else if (line.includes("=") && !line.includes("==")) {
    const varName = line.split("=")[0].trim();
    return `This line assigns a value to the variable '${varName}'.`;
  } else if (line.includes("if")) {
    return "This line checks a condition; if the condition is true, the code inside will run.";
  } else if (line.includes("for")) {
    return "This line starts a loop to repeat actions for each item in a sequence.";
  } else if (line.includes("while")) {
    return "This line starts a loop that continues while a condition is true.";
  } else {
    return "This line performs an operation or function in the code.";
  }
}