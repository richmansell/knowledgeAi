const OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
/**
 * Generate modular story chapter prompts.
 * This function builds a detailed meta prompt including all the questions,
 * then asks OpenAI to produce prompts for five chapters.
 */

async function makeCustomRequest(userContent, systemContent) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemContent
        },
        {
          role: 'user',
          content: userContent
        }
      ]
    })

    // Get the output text
    const outputText = response.choices[0].message.content

    return outputText
  } catch (error) {
    console.error('Error in OpenAI call:', error)
    throw error
  }
}

module.exports = {
  makeCustomRequest
}
