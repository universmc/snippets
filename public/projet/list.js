document.getElementById('genererImage').addEventListener('click', async () => {
    try {
        const response = await fetch('/image');
        const imageData = await response.json();
        const imageElement = document.createElement('img');
        imageElement.src = `data:image/png;base64,${imageData.image}`;
        document.getElementById('resultatImage').innerHTML = '';
        document.getElementById('resultatImage').appendChild(imageElement);
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatImage').innerHTML = 'Erreur lors de la génération de l\'image.';
    }
});

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

document.getElementById('genererDatathon').addEventListener('click', async () => {
    try {
        const response = await fetch('/datathon');
        const datathonDetails = await response.text();
        document.getElementById('resultatsDatathon').innerHTML = datathonDetails;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatsDatathon').innerHTML = 'Erreur lors de la génération des détails du datathon.';
    }
});

document.getElementById('genererIdeesHackathon').addEventListener('click', async () => {
    try {
        const response = await fetch('/hackathon');
        const idees = await response.text();
        document.getElementById('resultatsHackathon').innerHTML = idees;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatsHackathon').innerHTML = 'Erreur lors de la génération des idées de projets.';
    }
});
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
document.getElementById('analyserDechets').addEventListener('click', async () => {
    try {
        const response = await fetch('/recyclage');
        const resultatAnalyse = await response.text();
        document.getElementById('resultatAnalyseDechets').innerHTML = resultatAnalyse;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatAnalyseDechets').innerHTML = 'Erreur lors de l\'analyse des déchets.';
    }
});
document.getElementById('genererBootcamp').addEventListener('click', async () => {
    try {
        const response = await fetch('/bootcamp');
        const bootcampDetails = await response.text();
        document.getElementById('resultatsBootcamp').innerHTML = bootcampDetails;
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('resultatsBootcamp').innerHTML = 'Erreur lors de la génération des détails du bootcamp.';
    }
});