require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
const port = 5007;

app.use(express.static('public/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/hashtag', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Générez plus de 15 \n\
                    #hashtag ☁️ Idée géniale** : Trouver des idées originales et innovantes pour le développement de prompt --engine ( Gestion des ressources et recylage en <meta/> donnée et de la capacité de l équipe )</br>.`,
                },
            ],
            model: 'gemma2-9b-it',
        });
  
        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
  });
// ... code précédent ...
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));