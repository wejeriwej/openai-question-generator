const generateResponse = async (input) => {
  const response = await fetch("https://openai-question-generator.onrender.com/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input })
  });

  const data = await response.json();
  return data.content;
};

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("inputField");
  const submitButton = document.getElementById("submitButton");
  const responseArea = document.getElementById("responseArea");

  submitButton.addEventListener("click", async () => {
    const input = inputField.value.trim();
    if (!input) {
      responseArea.textContent = "Please enter a topic first!";
      return;
    }

    responseArea.textContent = "Generating question...";
    try {
      const output = await generateResponse(input);
      responseArea.textContent = output;
    } catch (error) {
      responseArea.textContent = "Something went wrong 😕 Check the console.";
      console.error(error);
    }
  });
});