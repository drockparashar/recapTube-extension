document.addEventListener('DOMContentLoaded', () => {
    const summarizeButton = document.getElementById('summarizeButton');
    const videoUrlInput = document.getElementById('videoUrl');
    const summaryContainer = document.getElementById('summaryContainer');
    const summaryText = document.getElementById('summaryText');
    const loadingIndicator = document.getElementById('loading');

    summarizeButton.addEventListener('click', async () => {
        const url = videoUrlInput.value;

        if (!url) {
            alert('Please enter a YouTube video URL.');
            return;
        }

        // Show loading indicator
        loadingIndicator.style.display = 'block';

        try {
            // Send POST request to backend
            const response = await fetch('http://localhost:3002/fetch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            summaryText.innerHTML = formatSummary(data.summary);

            // Show summary container
            summaryContainer.style.display = 'block';
        } catch (error) {
            console.error('Error fetching summary:', error);
            alert('An error occurred while fetching the summary.');
        } finally {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        }
    });

    // Function to format summary text into HTML
    function formatSummary(summary) {
        // Convert Markdown to HTML
        return summary
            .replace(/\*\*\s*(.*?)\s*\*\*/g, '<strong>$1</strong>') // Convert **bold text** to <strong>
            .replace(/##\s*(.*?)\s*\n/g, '<h2>$1</h2>') // Convert ## Heading to <h2>
            .replace(/^\s*\*\s*(.*?)\s*$/gm, '<li>$1</li>') // Convert * Bullet Points * to <li>
            .replace(/(<li>.*<\/li>)(?!<\/ul>)/g, '<ul>$1</ul>') // Wrap <li> items with <ul>
            .replace(/<\/ul>\s*<ul>/g, '') // Remove extra <ul> tags
            .replace(/\n\s*\n/g, '<br><br>') // Convert double newlines into <br><br>
            .replace(/\n/g, '<br>'); // Convert single newlines into <br>
    }
});
