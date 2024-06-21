const { GroqCloud } = require("@groqcloud/groqcloud");
const { LangChain } = require("langchain");
const sqlite3 = require("sqlite3").verbose();

// Initialize GroqCloud client
const groqCloud = new GroqCloud({
  apiKey: "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",
});

// Initialize LangChain instance
const langChain = new LangChain({
  model: "llama3",
  temperature: 0.5,
});

// Initialize SQLite database
const db = new sqlite3.Database("northwind.db");

// Define function to convert user input to SQL query
async function convertToSQLQuery(input) {
  const response = await langChain.generate(input, {
    prompt: "Convert the following question to a SQL query:",
    maxTokens: 256,
  });

  const sqlQuery = response.generatedText.trim();
  return sqlQuery;
}

// Define function to execute SQL query
async function executeSQLQuery(sqlQuery) {
  const results = await db.all(sqlQuery);
  return results;
}

// Define function to answer user's question
async function answerQuestion(results) {
  const response = await langChain.generate(results, {
    prompt: "Generate a response to the user's question:",
    maxTokens: 256,
  });

  const answer = response.generatedText.trim();
  return answer;
}

// Create command-line interface
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Ask a question: ");
rl.prompt();

rl.on("line", async (input) => {
  const sqlQuery = await convertToSQLQuery(input);
  const results = await executeSQLQuery(sqlQuery);
  const answer = await answerQuestion(results);
  console.log(answer);
  rl.prompt();
});

//... (rest of the code remains the same)

// Define function to answer user's question
async function answerQuestion(results) {
  const response = await langChain.generate(results, {
    prompt: "Generate a response to the user's question:",
    maxTokens: 256,
  });

  const answer = response.generatedText.trim();
  return answer;
}

//... (rest of the code remains the same)

rl.on("line", async (input) => {
  try {
    const sqlQuery = await convertToSQLQuery(input);
    const results = await executeSQLQuery(sqlQuery);
    const answer = await answerQuestion(results);
    console.log(answer);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  rl.prompt();
});
