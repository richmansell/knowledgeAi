const express = require('express');
const app = express();
const port = 3000;
const { makeCustomRequest } = require('./ai') // Import OpenAI request function;

app.use(express.json());

// POST /changeText
app.post('/changeText', async (req, res) => {
  const { content, charsToRemove } = req.body;

  // === INSERT OPENAI INTEGRATION HERE ===
  // Example: use content and charsToRemove to modify text
  const promptContent = `Number of characters to remove: ${charsToRemove} 
  The text: ${content}`

  const systemContent = `You are an expert at modifying text to ensure it fits within a certain character limit.
  You are an experienced newspaper editor and you will always ensure that the text is engaging and interesting.
  You will never generate text that is boring or uninteresting.
  If possible, and it makes gramatical sense, you will attempt to just shorten the existing text
  If that is not possible, you will attempt to remove the least important information from the text.
  You will never generate text that is long or contains any unnecessary information.
  You will always remove the exact amount or MORE characters than specified
  You will always ensure the number of characters removed is as close to the number of characters specified as possible
  You will note provide a response that is longer than the number of characters in the string, minus the number of characters to remove
  The text will always make grammatical sense.`

  // Get a summary of the story through the custom prompt
  const response = await makeCustomRequest(promptContent, systemContent)

  res.json({ response }); // for now, just return the same content

});

// POST /shortText
app.post('/shortText', async (req, res) => {
  const { content, charsToRemove } = req.body;

  // === INSERT OPENAI INTEGRATION HERE ===
  // Example: use content and charsToRemove to shorten text
  const promptContent = `Number of characters to remove: ${charsToRemove} 
  The text: ${content}`

  const systemContent = `You are an expert as subbing text to ensure it fits within a certain character limit.
  You are an experienced newspaper editor and you will always ensure that the text is engaging and interesting.
  You will never modify the text that has been provided
  You will only ever remove whole sentences from the text
  You will not change the content of any of the text
  You will always remove the number of characters specified or more
  You will ensure the number of characters removed is as close to the number of characters specified as possible
  You will never generate text that is longer than the number of characters in the string, minus the number of characters to remove
  The text will always make grammatical sense.
  You will always remove the least important information from the text.`

  // Get a summary of the story through the custom prompt
  const response = await makeCustomRequest(promptContent, systemContent)

  res.json({ response }); // for now, just return the same content

});

// POST /shortHeadline
 app.post('/shortHeadline', async (req, res)  =>  {
  const { content } = req.body;

  // === INSERT OPENAI INTEGRATION HERE ===
  // Example: use content to generate a short headline
  const promptContent = `Generate a headline for a news paper article based on the following text: ${content}`

  const systemContent = `You are an expert at generating headlines for use in news papers, you will only ever generate headlines for news papers.
  You will always generate headlines that are eyecatching and engaging.
  You will never generate headlines that are boring or uninteresting.
  You will never generate headlines for any other type of publication. You will always generate headlines that are short and to the point.
  You will never generate headlines that are long or contain any unnecessary information.
  You will always generate headlines that are between 5 and 6 words long.
  You will always generate headlines that do not contain words longer than 8 characters.
  You will always generate headlines that do not contain any special characters.
  You will always generate headlines that do not contain any numbers.
  Ensure that the headline is relevant to the content of the article.
  You will never generate headlines that are not relevant to the content of the article.
  Ensure you invlude key details from the article in the headline.
  You will never include locations in the headline.`

  // Get a summary of the story through the custom prompt
  const response = await makeCustomRequest(promptContent, systemContent)

  res.json({ response }); // for now, just return the same content
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});