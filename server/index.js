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

        const prompt = `Summarize the transcript of a YouTube video and show the results in bullet points in neat format
        Please provide the response in HTML format. Use HTML tags such as <li> for list items and <h1> for headings. For example, if you need to present a list of items, format it as follows:

<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

If you need to include a heading, use <h1> for the main heading and <h2> for subheadings, like this:

<h1>Main Heading</h1>
<h2>Subheading</h2>

Please provide your response accordingly.
:\n${sub}`;
        
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
