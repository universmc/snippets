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

app.get('/image', async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = `
    **Éléments Clés Identifiés :**

    * **Promotion / Événement IA :** Le thème central est l'Intelligence Artificielle et un événement ou une promotion y étant lié.
    * **Couleurs de l'IA :** Une demande d'imaginer des couleurs associées à l'IA.
    * **Futur (Avenir) :** L'image doit évoquer une vision du futur.
    * **Caen, Normandie :** Le lieu de cet événement ou la ville où l'on imagine le futur de l'IA.
    * **cityLogo IA :** Suggère la création d'un logo IA pour la ville de Caen (ou pour l'événement).

    **Interprétation et Conception de l'Image :**

    Je vais créer une image qui combine ces éléments en visualisant un événement futuriste lié à l'IA se déroulant à Caen. L'image intégrera un logo IA stylisé pour Caen et utilisera des couleurs souvent associées à la technologie et à l'innovation.

    **L'image représentera :**

    * **Un arrière-plan urbain moderne de Caen** (inspiré de l'architecture locale, peut-être avec une touche futuriste).
    * **Des éléments graphiques évoquant l'IA :** réseaux neuronaux abstraits, flux de données lumineux, formes géométriques complexes.
    * **Le "cityLogo IA" de Caen :** Un logo stylisé intégrant les initiales "C" et "N" (pour Caen et Normandie) ou un symbole reconnaissable de Caen (comme le château) fusionné avec des motifs futuristes ou des icônes liées à l'IA (circuits, points de connexion).
    * **Une palette de couleurs associée à l'IA :** Des tons de bleu électrique, de vert néon, de violet profond, contrastés avec des touches de blanc ou de gris métallisé pour un aspect technologique et futuriste.
    * **Une ambiance générale de dynamisme et d'innovation**, suggérant un événement ou une promotion.
    `;

    const contents = `
    Image d'un événement futuriste lié à l'IA à Caen, Normandie.
    Arrière-plan : Un paysage urbain moderne de Caen avec des bâtiments historiques fusionnés avec des éléments architecturaux futuristes, des écrans holographiques projetant des informations sur l'IA, une atmosphère nocturne avec des lumières vives et des reflets métalliques.
    Éléments IA : Des réseaux neuronaux abstraits avec des lignes lumineuses pulsantes de couleur bleu électrique et violet profond, des formes géométriques complexes en 3D avec des effets holographiques, des flux de données lumineux qui s'entrelacent et convergent vers le logo IA.
    Logo IA de Caen : Un logo stylisé intégrant les initiales "C" et "N" avec des motifs de circuits imprimés et des icônes de connexion, des effets de lumière néon et des reflets métalliques, placé au centre de l'image.
    Couleurs : Palette de couleurs dominée par le bleu électrique, le vert néon et le violet profond, avec des touches de blanc métallique et de gris anthracite pour un aspect technologique et futuriste.
    Ambiance : Dynamique, innovante et futuriste, suggérant un événement ou une promotion de l'IA, avec une sensation d'énergie et de progrès.
    `;

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp-image-generation',
        generationConfig: {
            responseModalities: ['Text', 'Image'],
        },
    });

    try {
        const response = await model.generateContent(contents);
        for (const part of response.response.candidates[0].content.parts) {
            if (part.inlineData) {
                const imageData = part.inlineData.data;
                res.json({ image: imageData });
                return;
            }
        }
        res.status(500).send('Image non trouvée');
    } catch (error) {
        console.error('Erreur :', error);
        res.status(500).send('Erreur lors de la génération de l\'image');
    }
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
app.get('/hackathon', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Générez 5 idées de projets innovants pour un hackathon sur l'IA à Caen. Incluez des descriptions, des objectifs et des technologies potentielles. Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
});
app.get('/datathon', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Décrivez en détail les soirée de type "Datathon IA pour Caen". Incluez le format, les objectifs, les participants, et les bénéfices attendus.conception : 🏆, compétition d'idées, sessions de financement et de demonstration.Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error('Erreur :', error);
        res.status(500).send('Erreur lors de la génération des détails du datathon.');
    }
});
app.get('/projets', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Générez 5 idées de projets créatifs pour une startup, axé sur l'art, les crypto game, les jeux et les performances interactives. Incluez des titres, des descriptions et des technologies IA potentielles.Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
});

app.get('/recyclage', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Décris comment un système d'IA pourrait analyser des images de déchets pour aider au tri à Caen, et propose quelques fonctionnalités pour une application mobile. Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer.`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Erreur lors de l\'analyse des déchets');
    }
});
app.get('/bootcamp', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Détaille le contenu d'un Bootcamp Model la vision apprentissage superviser de l'IA à Caen. Inclut les modules previsionnel et spécifique, les intervenants, les dates et les lieux.Vous pouvez enrichir ce programme en ajoutant des informations sur les projets concrets, les outils et les technologies utilisés, les prérequis, ainsi que les modalités d'inscription. Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer`,
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