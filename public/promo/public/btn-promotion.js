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