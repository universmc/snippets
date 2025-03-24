document.getElementById('genererHashtags').addEventListener('click', async () => {
    try {
        const response = await fetch('/server');
        const hashtags = await response.text();
        document.getElementById('resultatsHashtags').innerHTML = hashtags;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatsHashtags').innerHTML = 'Erreur lors de la génération des hashtags.';
    }
});