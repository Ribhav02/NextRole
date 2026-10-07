import { env } from "../../config/env.js";

const BHASHINI_BASE_URL = process.env.BHASHINI_BASE_URL || "https://dhruva-api.bhashini.gov.in";

export async function processBhashiniPipeline({ pipelineTasks, inputData }) {
  if (!env.bhashiniApiKey) {
    throw new Error("BHASHINI_API_KEY is not configured.");
  }

  const response = await fetch(`${BHASHINI_BASE_URL}/services/inference/pipeline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: env.bhashiniApiKey,
    },
    body: JSON.stringify({ pipelineTasks, inputData }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`BHASHINI request failed: ${response.status} ${body}`);
  }

  return response.json();
}

export async function speechToText({ audioBase64, sourceLanguage }) {
  return processBhashiniPipeline({
    pipelineTasks: [
      {
        taskType: "asr",
        config: {
          language: { sourceLanguage },
          serviceId: process.env.BHASHINI_ASR_SERVICE_ID,
        },
      },
    ],
    inputData: {
      audio: [{ audioContent: audioBase64 }],
    },
  });
}

export async function translateText({ text, sourceLanguage, targetLanguage }) {
  return processBhashiniPipeline({
    pipelineTasks: [
      {
        taskType: "translation",
        config: {
          language: { sourceLanguage, targetLanguage },
          serviceId: process.env.BHASHINI_TRANSLATION_SERVICE_ID,
        },
      },
    ],
    inputData: {
      input: [{ source: text }],
    },
  });
}

export async function textToSpeech({ text, targetLanguage }) {
  return processBhashiniPipeline({
    pipelineTasks: [
      {
        taskType: "tts",
        config: {
          language: { sourceLanguage: targetLanguage },
          serviceId: process.env.BHASHINI_TTS_SERVICE_ID,
        },
      },
    ],
    inputData: {
      input: [{ source: text }],
    },
  });
}
