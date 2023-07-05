const express = require("express");
const app = express();
require("dotenv").config()


const axios = require('axios');

const API_KEY = process.env.OPENAI_API_KEY; 
const API_URL = 'https://api.openai.com/v1/engines/text-davinci-003/completions'; 

async function generateText(prompt) {
  try {
    const response = await axios.post(API_URL, {
      prompt: prompt,
      max_tokens: 2000, 
      temperature: 0.7, 
      n: 1, 
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.log(error.response.data)
    return('Error:', error.response.data);
  }
}

// Example usage



  app.get("/",(req,res)=>{
    const prompt = 'Once upon a time';
    generateText(prompt)
      .then((response) => {
        res.send('Generated text:', response);
      })
      .catch((error) => {
         res.send('Error:', error);
    });
  })

app.listen(process.env.port,()=>{
    console.log(`Server running at http://localhost:${process.env.port}`)
})