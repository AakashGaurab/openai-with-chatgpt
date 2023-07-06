const express = require("express");
const app = express();
require("dotenv").config()
const cors = require("cors");

app.use(cors({origin:"*"}))


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

    console.log(response.data.choices[0].text.trim())
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.log(error)
    return('Error:', error);
  }
}

// Example usage

app.get("/",(req,res)=>{
  res.send("HELLO")
})


app.get('/story', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `I want you to give me a story on topic ${keyword} in hinglish`,
      max_tokens: 4000,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const story = response.data.choices[0].text.trim();
    res.json({ story });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.listen(process.env.port,()=>{
    console.log(`Server running at http://localhost:${process.env.port}`)
})