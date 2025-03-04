import express from "express";
import cors from "cors";
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyDfe0-qhJmbtqaXED1Op6zuHfZDwwuTjPE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/fetch", async (req, res) => {
    try {
        const url = req.body.url;
        const captions = await YoutubeTranscript.fetchTranscript(url);

        let sub = "";
        for (const caption of captions) {
            sub += `${caption.text} `;
        }

        console.log(sub);

        const prompt = `
You are an AI designed to create structured study notes from a YouTube transcript.
Format the summary as **detailed notes** with clear headings, subheadings, and bullet points.
Use HTML formatting with <h1>, <h2>, and <ul> for better readability.

### **Example Format:**
<h1>Topic Title</h1>
<h2>1. Key Concept</h2>
<ul>
  <li><strong>Main Idea:</strong> Explanation</li>
  <li>Supporting details</li>
  <li>Examples if applicable</li>
</ul>

---
Now, generate the structured study notes from the following transcript:

${sub}
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        console.log(text);

        return res.status(200).json({ summary: text });
    } catch (error) {
        console.error("Error fetching or summarizing transcript:", error);
        return res.status(500).json({ error: "An error occurred while processing the request." });
    }
});

app.listen(3002, () => console.log("Server started on port 3002"));
