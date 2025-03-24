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
    res.sendFile(path.join(__dirname, 'public', 'event.html'));
});
app.get('/evenements', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Générez 5 idées d'événements innovants pour promouvoir l'IA à Caen. Incluez des titres, des descriptions et des formats. Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
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