# RecapTube Chrome Extension

**RecapTube** is a Chrome extension that summarizes YouTube video transcripts. It allows you to quickly get a summary of a video without watching the entire content.

## Features

- Summarizes YouTube video transcripts.
- Displays the summary in a clean, user-friendly popup.
- Simple and intuitive interface.

## Installation

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/recaptube-extension.git
cd recaptube-extension
```

### 2. Prepare the Extension Files

Ensure that your project directory contains the following files:

- `manifest.json`
- `index.html`
- `styles.css`
- `index.js`

### 3. Load the Extension into Chrome

1. **Open Chrome**:
   - Launch Google Chrome or Chromium browser.

2. **Navigate to the Extensions Page**:
   - Click on the three dots (menu) in the top-right corner of Chrome.
   - Go to `More tools` > `Extensions`.

3. **Enable Developer Mode**:
   - Toggle the `Developer mode` switch in the top-right corner of the Extensions page.

4. **Load the Extension**:
   - Click on the `Load unpacked` button.
   - Select the directory where your extension files are located (the directory containing `manifest.json`).

5. **Test the Extension**:
   - Your extension should now appear in the list of installed extensions.
   - Click on the extension icon in the Chrome toolbar to open the popup.

## Usage

1. **Enter a YouTube Video URL**:
   - Paste the URL of the YouTube video you want to summarize into the input field labeled "YouTube Video URL".

2. **Click the "Summarize" Button**:
   - Click the `Summarize` button to fetch the summary.

3. **View the Summary**:
   - The summary will appear in the popup below the input field.

## Troubleshooting

- **No Summary Appears**: Ensure that the video URL is correct and that the video has a transcript available. The extension fetches summaries based on the available transcript.
- **Error Messages**: Check the Chrome console for any errors by right-clicking on the extension popup and selecting "Inspect". This will help diagnose any issues.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push them to your fork.
4. Create a pull request with a description of your changes.
