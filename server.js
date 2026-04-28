import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

const API_URL = "https://sii3.top/api/v2/chat";
const API_KEY = "568A10DBF87C957AEE886658";

app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        const body = new URLSearchParams();
        body.append("key", API_KEY);
        body.append("prompt", prompt);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body.toString()
        });

        const data = await response.text();

        res.send(data);

    } catch (err) {
        res.status(500).json({ error: "proxy error", details: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("Proxy is running 😈");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
