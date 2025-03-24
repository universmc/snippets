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

document.getElementById('genererEvenements').addEventListener('click', async () => {
    try {
        const response = await fetch('/evenements');
        const evenements = await response.text();
        document.getElementById('resultatsEvenements').innerHTML = evenements;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatsEvenements').innerHTML = 'Erreur lors de la génération des événements.';
    }
});

document.getElementById('genererPromotion').addEventListener('click', async () => {
    try {
        const response = await fetch('/promotion');
        const promotion = await response.text();
        document.getElementById('resultatsPromotion').innerHTML = promotion;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatsPromotion').innerHTML = 'Erreur lors de la génération des idées de promotion.';
    }
});