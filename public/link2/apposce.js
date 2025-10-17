var previousquestion = "What's your name";//delete these in the real thing
var response_question = "I'm Marc";//delete these in the real thing





const generateResponse = async (oscetrial) => {
  const response = await fetch("https://openai-question-generator.onrender.com/api/oscetrial", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oscetrial })
  });

  const data = await response.json();
  return data.content;
};



document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("inputField");//the Doctor's question
  const submitButton = document.getElementById("submitButton");
  const responseArea = document.getElementById("responseArea");

  submitButton.addEventListener("click", async () => {
    const input = inputField.value.trim();
    if (!input) {
      responseArea.textContent = "Please enter a song first!";
      return;
    }

    responseArea.textContent = "Generating your song...";
    try {
      const output = await generateResponse(input);
      responseArea.textContent = output + "Trial:" + previousquestion + response_question;
    } catch (error) {
      responseArea.textContent = "Something went wrong 😕 Check the console.";
      console.error(error);
    }
  });
});




const newquestion = document.getElementById("newquestion");
newquestion.addEventListener('click', () => {
      // This sends the browser to another page (like about.html)
      window.location.href = '../index.html';
    });