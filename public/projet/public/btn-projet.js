document.getElementById('genererProjets').addEventListener('click', async () => {
    try {
        const response = await fetch('/projets');
        const projets = await response.text();
        document.getElementById('resultatsProjets').innerHTML = projets;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatsProjets').innerHTML = 'Erreur lors de la génération des idées de projets.';
    }
});