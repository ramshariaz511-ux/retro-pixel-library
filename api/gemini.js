const SYSTEM_INSTRUCTION = `You are Google Gemini, an intelligent, versatile, helpful, and creative AI assistant embedded within the retroZen Pixel Library Store.
You can converse about ANYTHING and answer ANY questions across all topics: general knowledge, science, mathematics, history, literature, business, coding & computer science, standardized exams (SAT, GRE, MCAT, IGCSEs, A-Levels, Bar Exam), philosophy, video games (Minecraft, Roblox, retro arcade), creative writing, trivia, or everyday life advice.

Tone & Style:
- Friendly, knowledgeable, engaging, and clear.
- Use clean, well-formatted markdown (bullet points, bold text, paragraphs, code blocks where helpful).

RETROZEN PIXEL LIBRARY STORE INTEGRATION:
You are also connected to the retroZen Pixel Library Store catalog!
Our store features books & flashcard decks organized into these categories:
1. Educational (Subcategories: Science, Mathematics, History, Literature, Business, Computing, Test Guides, Flashcard Companies for Standardized Exams [SAT, GRE, MCAT, IGCSEs, A-Levels, Bar Exam]).
2. Philosophy (Stoicism, Ethics, Epistemology, Eastern & Political Philosophy).
3. Fictional / Non-Fictional Story Books (Biographies, Short Stories, Folklore, Narrative Non-Fiction, True Exploration).
4. Novels (Sci-Fi & Cyberpunk, Classic Literature, Mystery & Noir, High Fantasy, Historical Fiction).
5. Game Guide Books (Minecraft Redstone & Survival, Roblox Lua Scripting & Game Dev, Retro Arcade & Strategy Guides).
6. Academic Reference & Study Skills (Encyclopedias, World Atlases, Pixel Art & Design, Languages & Linguistics, Cognitive Psychology & Memory).

If the user asks for book recommendations, study materials, exam flashcards, or what to buy/read from the library store:
1. Give a warm, helpful response explaining your recommendations.
2. At the very end of your response, you may optionally append a JSON recommendation block in this exact format so the UI can show interactive book cards:
\`\`\`library-rec
{
  "category": "educational" | "philosophy" | "storybooks" | "novels" | "game-guides" | "reference",
  "subcategory": "science" | "mathematics" | "history" | "literature" | "business" | "computing" | "test-guides" | "flashcards" | "all",
  "keywords": ["keyword1", "keyword2"],
  "ambientSuggestion": { "beatTrack": 1, "vinyl": true, "rain": false }
}
\`\`\`

CRITICAL RULE:
If the user is asking a general question (e.g., "Explain quantum entanglement", "Solve this calculus problem", "How do I script a Roblox obby in Lua?", "What is Stoicism?", "Tell me a story", or general chat), answer their question thoroughly, intelligently, and naturally! Only include the \`library-rec\` block when they ask for book/flashcard recommendations or store navigation.`;

function generateFallbackLibraryResponse(userPrompt) {
  const text = (userPrompt || '').toLowerCase();
  if (text.includes('sat') || text.includes('gre') || text.includes('mcat') || text.includes('igcse') || text.includes('a-level') || text.includes('a level') || text.includes('bar exam') || text.includes('flashcard') || text.includes('exam')) {
    return {
      text: "Preparing for standardized exams is all about active recall and spaced repetition! Check out our **Flashcard Companies** and **Test Guides** subcategories under **Educational** — featuring high-yield decks from *AnkiPixel*, *Kaplan RetroCards*, *MemoraMed MCAT*, *Cambridge IGCSE/A-Level FlashMaster*, *Magoosh GRE Vault*, and *BarBri PixelPrep*.",
      rec: {
        category: "educational",
        subcategory: text.includes('flashcard') ? "flashcards" : "test-guides",
        keywords: ["exam", "flashcards", "prep"],
        ambientSuggestion: { beatTrack: 2, vinyl: true, rain: false }
      }
    };
  } else if (text.includes('minecraft') || text.includes('roblox') || text.includes('game')) {
    return {
      text: "Level up your gaming and world-building! Our **Game Guide Books** section features complete guides for **Minecraft** (Redstone circuits, survival architecture) and **Roblox** (Lua scripting, Obby & Tycoon design), plus classic retro arcade compendiums.",
      rec: {
        category: "game-guides",
        subcategory: "all",
        keywords: ["minecraft", "roblox", "guide"],
        ambientSuggestion: { beatTrack: 1, vinyl: false, rain: false }
      }
    };
  } else if (text.includes('philosophy') || text.includes('stoic') || text.includes('plato') || text.includes('nietzsche')) {
    return {
      text: "Philosophy sharpens the mind and anchors the soul. Explore our **Philosophy** shelf for timeless works on Stoicism, Existentialism, Epistemology, and Ethics — best enjoyed with gentle rain and analog vinyl crackle!",
      rec: {
        category: "philosophy",
        subcategory: "all",
        keywords: ["philosophy", "stoicism"],
        ambientSuggestion: { beatTrack: 3, vinyl: true, rain: true }
      }
    };
  } else if (text.includes('novel') || text.includes('fiction') || text.includes('story') || text.includes('sci-fi')) {
    return {
      text: "Looking for an unforgettable narrative? Browse our **Novels** and **Fictional / Non-Fictional Story Books** sections for cyberpunk classics, mystery noir, inspiring biographies, and world folklore.",
      rec: {
        category: "novels",
        subcategory: "all",
        keywords: ["novel", "story"],
        ambientSuggestion: { beatTrack: 6, vinyl: true, rain: true }
      }
    };
  }
  return null;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  let parsed = req.body;
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch (e) { parsed = {}; }
  }
  if (!parsed && req.on) {
    parsed = await new Promise(resolve => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => {
        try { resolve(JSON.parse(data || '{}')); } catch (e) { resolve({}); }
      });
    });
  }
  parsed = parsed || {};

  const userPrompt = (parsed.prompt || '').trim();
  if (!userPrompt) {
    return res.status(400).json({ success: false, error: 'Please enter a message or question.' });
  }

  // Safely fetch GEMINI_API_KEY from environment variable (or user-provided runtime key)
  const apiKey = (parsed.apiKey || '').trim() || (process.env.GEMINI_API_KEY || '').trim();

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    const fallback = generateFallbackLibraryResponse(userPrompt);
    if (fallback) {
      return res.status(200).json({
        success: true,
        text: fallback.text,
        recommendation: fallback.rec,
        isMock: true,
        info: "Offline Library Suggestion. To chat about any topic with live Google Gemini, click [ 🔑 SET KEY ] above."
      });
    } else {
      return res.status(200).json({
        success: true,
        text: `🔑 **Live Google Gemini API Key Needed**\n\nI'd love to answer your question! To unlock full conversational AI on any topic, please connect your Gemini API key:\n\n1. Click **[ 🔑 SET KEY ]** at the top right of this AI panel (or paste your key directly into the chat)\n2. Or set \`GEMINI_API_KEY\` in your isolated \`.env\` file or Vercel Environment Variables.`,
        recommendation: null,
        needsKey: true,
        isMock: true
      });
    }
  }

  // Discover available models for this key
  let availableModels = [];
  const apiVersion = 'v1beta';

  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const listData = await listRes.json();
    if (listRes.ok && Array.isArray(listData.models)) {
      availableModels = listData.models
        .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
        .map(m => m.name.replace(/^models\//, ''));
    }
  } catch (err) {}

  const candidatePriority = [
    process.env.GEMINI_MODEL,
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-flash-latest',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemma-4-26b-a4b-it',
    'gemma-4-31b-it',
    'gemini-pro'
  ].filter(Boolean);

  const modelsToTry = [
    ...candidatePriority.filter(m => availableModels.includes(m)),
    ...availableModels,
    ...candidatePriority
  ];
  const uniqueModels = [...new Set(modelsToTry.filter(Boolean))];

  // Build multi-turn conversation contents
  const contents = [];
  if (Array.isArray(parsed.history)) {
    for (const msg of parsed.history) {
      if (msg && msg.role && msg.text) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }
  }

  const contextNote = parsed.storeContext ? `\n\n[Current User Store View: ${parsed.storeContext}]` : '';
  contents.push({ role: 'user', parts: [{ text: userPrompt + contextNote }] });

  let geminiData = null;
  let successModel = null;
  let lastErrorMessage = '';

  for (const model of uniqueModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { temperature: 0.75, maxOutputTokens: 2048 }
        })
      });
      const data = await res.json();
      if (res.ok && data.candidates?.[0]) {
        geminiData = data;
        successModel = model;
        break;
      } else {
        lastErrorMessage = data.error?.message || `Status ${res.status}`;
      }
    } catch (e) {
      lastErrorMessage = e.message;
    }

    // Fallback without systemInstruction for models like Gemma that require system prompt in user turn
    try {
      const promptWithSystem = `${SYSTEM_INSTRUCTION}\n\nUser Question: ${userPrompt}${contextNote}`;
      const fallbackContents = [
        ...contents.slice(0, -1),
        { role: 'user', parts: [{ text: promptWithSystem }] }
      ];
      const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: fallbackContents,
          generationConfig: { temperature: 0.75, maxOutputTokens: 2048 }
        })
      });
      const data = await res.json();
      if (res.ok && data.candidates?.[0]) {
        geminiData = data;
        successModel = model;
        break;
      } else {
        lastErrorMessage = data.error?.message || `Status ${res.status}`;
      }
    } catch (e) {
      lastErrorMessage = e.message;
    }
  }

  if (!geminiData) {
    const fallback = generateFallbackLibraryResponse(userPrompt);
    return res.status(200).json({
      success: true,
      text: fallback ? fallback.text : `⚠️ Google Gemini API notice: ${lastErrorMessage || 'Could not reach model.'}`,
      recommendation: fallback ? fallback.rec : null,
      isMock: true
    });
  }

  const parts = geminiData.candidates[0].content?.parts || [];
  const answerParts = parts.filter(p => !p.thought && typeof p.text === 'string');
  const rawText = (answerParts.length > 0
    ? answerParts.map(p => p.text).join('\n')
    : (parts[parts.length - 1]?.text || '')).trim();
  let cleanText = rawText;
  let recommendation = null;

  const recMatch = rawText.match(/```(?:library-rec|json)?\s*(\{[\s\S]*?\})\s*```/i);
  if (recMatch) {
    try {
      const parsedRec = JSON.parse(recMatch[1]);
      if (parsedRec.category || parsedRec.subcategory || parsedRec.keywords) {
        recommendation = parsedRec;
        cleanText = rawText.replace(recMatch[0], '').trim();
      }
    } catch (e) {}
  }

  return res.status(200).json({
    success: true,
    text: cleanText || rawText,
    recommendation: recommendation,
    isMock: false,
    model: successModel
  });
};
