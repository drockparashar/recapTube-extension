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
            const response = await fetch('https://recaptube-extension.onrender.com/fetch', {
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
        return summary
            .replace(/<h1>(.*?)<\/h1>/g, '<h1 style="color: #2c3e50;">$1</h1>') // Style h1
            .replace(/<h2>(.*?)<\/h2>/g, '<h2 style="color: #34495e;">$1</h2>') // Style h2
            .replace(/<strong>(.*?)<\/strong>/g, '<strong style="color: #d35400;">$1</strong>') // Highlight key points
            .replace(/<li>(.*?)<\/li>/g, '<li style="margin-left: 20px;">$1</li>'); // Indent bullet points
    }
});
