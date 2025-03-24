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
