import { speechToText, translateText, textToSpeech } from "../services/voice/bhashini.service.js";

export async function speechToTextEndpoint(req, res, next) {
  try {
    const result = await speechToText({
      audioBase64: req.body.audioBase64,
      sourceLanguage: req.body.sourceLanguage,
    });
    res.json({ success: true, provider: "bhashini", result });
  } catch (error) { next(error); }
}

export async function translateEndpoint(req, res, next) {
  try {
    const result = await translateText({
      text: req.body.text,
      sourceLanguage: req.body.sourceLanguage,
      targetLanguage: req.body.targetLanguage,
    });
    res.json({ success: true, provider: "bhashini", result });
  } catch (error) { next(error); }
}

export async function textToSpeechEndpoint(req, res, next) {
  try {
    const result = await textToSpeech({
      text: req.body.text,
      targetLanguage: req.body.targetLanguage,
    });
    res.json({ success: true, provider: "bhashini", result });
  } catch (error) { next(error); }
}
