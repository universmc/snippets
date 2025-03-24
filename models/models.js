function initialiserModeles(models) {
    // Parcourir le tableau de modèles
    models.forEach(modele => {
      // Créer une instance de la classe ou de l'objet approprié pour chaque modèle.
      // Cela dépend de la manière dont vous interagissez avec les différents modèles.
      // Par exemple, si vous utilisez une librairie spécifique pour chaque modèle,
      // vous devrez initialiser cette librairie avec les paramètres du modèle.
  
      switch (modele.name) {
        case "Mistral":
          const mistral = new MistralModel(modele.model, modele.temperature, modele.max_tokens, modele.top_p, modele.stream, modele.stop);
          // ... autres initialisations spécifiques à Mistral
          break;
        case "llma":
          const llma = new LLAMAModel(modele.model, modele.temperature, modele.max_tokens, modele.top_p, modele.stream, modele.stop);
          // ... autres initialisations spécifiques à LLAMA
          break;
        case "gemma":
          const gemma = new GemmaModel(modele.model, modele.temperature, modele.max_tokens, modele.top_p, modele.stream, modele.stop);
          // ... autres initialisations spécifiques à Gemma
          break;
        case "gpt":
          const gpt = new GPTModel(modele.model, modele.temperature, modele.max_tokens, modele.top_p, modele.stream, modele.stop);
          // ... autres initialisations spécifiques à GPT
          break;
        case "dall-e":
          const dalle = new DALLEModel(modele.model, modele.temperature, modele.max_tokens, modele.top_p, modele.stream, modele.stop);
          // ... autres initialisations spécifiques à DALL-E
          break;
        case "deepSeek":
          const deepseek = new DeepSeekModel(modele.model, modele.temperature, modele.max_tokens, modele.top_p, modele.stream, modele.stop);
          // ... autres initialisations spécifiques à DeepSeek
          break;
        default:
          console.log("Modèle non reconnu :", modele.name);
      }
    });
  }