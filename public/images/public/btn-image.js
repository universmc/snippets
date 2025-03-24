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