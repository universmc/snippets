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
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
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
// ... code précédent ...

app.get('/IA_et_Sante', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Rédige un article de blog sur l'IA et ses applications dans le domaine de la santé à Caen. Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
});

app.get('/IA_et_Education', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Rédige un article de blog sur l'IA et ses applications dans le domaine des IA et de Education à Caen. Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
});

app.get('/IA_et_Ville_Intelligente', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Rédige un article de blog sur l'IA et ses applications dans le domaine des IA et des Villes Intelligente à Caen. Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer`,
                },
            ],
            model: 'gemma2-9b-it',
        });

        res.status(200).send(chatCompletion.choices[0].message.content);
    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
});

app.get('/IA_et_Entreprises_Locales', async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'assistant', content: `** **<br/> | in box |.`, },
                {
                    role: 'user',
                    content: `** Rédige un article de blog sur l'IA et ses applications dans le domaine des IA et Entreprises Locales autour de Caen.Ta réponse doit être rédigé au format liste en HTML, respectant les normes du Web sémantique W3C intégrant des emoji intélligent associer`,
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