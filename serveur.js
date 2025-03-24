const express = require('express');
const Groq = require('groq-sdk');
const path = require('path'); // Ajout de 'path' pour la gestion des chemins

const groq = new Groq();

const app = express();
const port = 5008;

app.use(express.static('public/')); // Sert les fichiers statiques (HTML, CSS, JS)

// Routage pour servir index.html à la racine du serveur
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/server', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Générez plus de 15 \n\
                    #hashtag ☁️ Idée géniale** : Trouver des idées originales et innovantes pour le développement de prompt --engine ( Gestion des ressources et recylage en <meta/> donnée et de la capacité de l équipe ), Ta réponse de t'être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
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
app.get('/evenements', async (req, res) => {
  try {
      const chatCompletion = await groq.chat.completions.create({
          messages: [
              { role: 'assistant', content: `** **<br/> | in box |.`, },
              {
                  role: 'user',
                  content: `** Générez 5 idées d'événements innovants pour promouvoir l'IA à Caen. Incluez des titres, des descriptions et des formats. Ta réponse de t'être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
              },
          ],
          model: 'gemma2-9b-it',
      });

      res.status(200).send(chatCompletion.choices[0].message.content);
  } catch (error) {
      res.status(500).send('Une erreur est survenue');
  }
});

app.get('/promotion', async (req, res) => {
  try {
      const chatCompletion = await groq.chat.completions.create({
          messages: [
              { role: 'assistant', content: `** **<br/> | in box |.`, },
              {
                  role: 'user',
                  content: `** Générez 5 idées de stratégies de promotion pour l'IA à Caen. Incluez des canaux, des messages clés et des publics cibles. Ta réponse de t'être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
              },
          ],
          model: 'gemma2-9b-it',
      });

      res.status(200).send(chatCompletion.choices[0].message.content);
  } catch (error) {
      res.status(500).send('Une erreur est survenue');
  }
});

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));