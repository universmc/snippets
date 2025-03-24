// script.js
require('dotenv').config();
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const fs = require('fs');
const path = require('path');

const models = require('./models.json');
const outputDir = path.join(__dirname, 'output'); // Chemin vers le répertoire output

// Création du répertoire output s'il n'existe pas
fs.mkdirSync(outputDir, { recursive: true });

async function completeText(modelName, prompt, options = {}) {
  const model = models.find(m => m.name === modelName);
  if (!model) {
    throw new Error(`Le modèle ${modelName} n'existe pas.`);
  }

  const { temperature, max_tokens, top_p, stream, stop } = {
    ...model,
    ...options
  };

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: model.model,
      temperature,
      max_tokens,
      top_p,
      stop,
      stream,
    });

    let fullContent = "";

    if (stream) {
      if (chatCompletion.body) {
        for await (const chunk of chatCompletion.body) {
          const decodedChunk = new TextDecoder().decode(chunk);
          try {
            const jsonChunk = JSON.parse(decodedChunk);
            if (jsonChunk.choices && jsonChunk.choices[0] && jsonChunk.choices[0].delta && jsonChunk.choices[0].delta.content) {
              fullContent += jsonChunk.choices[0].delta.content;
              console.log("Chunk:", jsonChunk.choices[0].delta.content);
            }
          } catch (error) {
            console.error("Erreur parsing JSON:", error, decodedChunk);
          }
        }
      } else {
        throw new Error("Réponse API invalide: Pas de corps de réponse.");
      }
    } else {
      if (!chatCompletion || !chatCompletion.choices || chatCompletion.choices.length === 0 || !chatCompletion.choices[0].message || !chatCompletion.choices[0].message.content) {
        throw new Error("Réponse API invalide: Structure invalide.");
      }
      fullContent = chatCompletion.choices[0].message.content;
    }

    // Enregistrement dans un fichier
    const timestamp = Date.now();
    const filename = `${modelName}_${timestamp}.txt`; // Nom du fichier plus descriptif
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, fullContent);
    console.log(`Réponse enregistrée dans: ${filepath}`);

    return fullContent;

  } catch (error) {
    console.error("Erreur API Groq:", error);
    throw error;
  }
}


async function testCompletion() {
  try {
    const result = await completeText("Mixtral", "Écris un poème sur l'hiver.", { temperature: 0.7 });
    console.log("Résultat:\n", result);
  } catch (error) {
    console.error("Erreur testCompletion:", error);
  }
}
async function MixtralCompletion() {
  try {
    const result = await completeText("Mixtral", "Écris un poème sur le vent MISTRAL", { temperature: 0.7 });
    console.log("Résultat:\n", result);
  } catch (error) {
    console.error("Erreur testCompletion:", error);
  }
}
async function GeminiCompletion() {
  try {
    const result = await completeText("gemimi", "Écris un poème sur la constellation GEMINI.", { temperature: 0.7 });
    console.log("Résultat:\n", result);
  } catch (error) {
    console.error("Erreur testCompletion:", error);
  }
}
async function deepSeekCompletion() {
  try {
    const result = await completeText("deepseek", "Écris un poème pour un OVNI appeller DEEPSEEK.", { temperature: 0.7 });
    console.log("Résultat:\n", result);
  } catch (error) {
    console.error("Erreur testCompletion:", error);
  }
}

deepSeekCompletion();
GeminiCompletion();
MixtralCompletion();
testCompletion();