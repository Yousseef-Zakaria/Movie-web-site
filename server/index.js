const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json()) // use json in app
app.use(cors());
const AI_KEY = "GJ4zhZCePpwxs65x1qioi7mhOxQqFc4UyLKLsveM";

app.post('/suggest-movies', async (req,res)=>{    
    const {mood} = req.body;
    const prompt = `
  You are a helpful assistant. Given the user's mood "${mood}", recommend 5 movies that best match the mood
  Return the movie titles as a list between every title comma without '\\n'or any thing without any more words.
  `;
  
  //${moviesData.map(movie => `Title: ${movie.title}, Description: ${movie.overview}`).join('\n')}

  

    const response = await fetch("https://api.cohere.ai/v1/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AI_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "command-r",
          message: prompt,
          temperature: 0.7,
          max_tokens: 200
        })
      });
      let data = await response.json()
    res.json({"message":data.text});
    // const result = data.choices[0].message.content;
    // console.log("results", result)
})

app.listen(3000 , ()=>{
    console.log('server running on port 3000 ........')
})