document.querySelectorAll('a[data-topic]').forEach(link => {
    link.addEventListener('click', async (event) => {
        event.preventDefault();
        const topic = link.dataset.topic;
        const sectionId = link.getAttribute('href').substring(1); // Récupère l'ID de la section
        try {
            const response = await fetch(`/${topic}`);
            const topicContent = await response.text();
            document.getElementById(`resultats${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`).innerHTML = topicContent;
        } catch (error) {
            console.error('Erreur :', error);
            document.getElementById(`resultats${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`).innerHTML = 'Erreur lors de la génération du contenu.';
        }
    });
});