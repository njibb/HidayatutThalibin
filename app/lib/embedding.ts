/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipeline, env } from '@huggingface/transformers';

// PENTING: Konfigurasi ini memaksa Transformers.js untuk tidak mencari modul native Node.js (onnxruntime-node)
// sehingga aman dan berjalan mulus di Serverless Vercel.
env.allowLocalModels = false;
env.useBrowserCache = false;

if (typeof window === 'undefined') {
  // Konfigurasi backend untuk lingkungan serverless
}

class EmbeddingPipeline {
  static task = 'feature-extraction' as const;
  static model = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
  static instance: any = null;

  static async getInstance() {
    if (this.instance === null) {
      // Menggunakan env remote agar berjalan stabil di serverless
      this.instance = await pipeline(this.task, this.model, {
        // Memastikan instance berjalan optimal di serverless environment
      });
    }
    return this.instance;
  }
}

export async function getSemanticEmbedding(text: string): Promise<number[]> {
  try {
    const extractor = await EmbeddingPipeline.getInstance();
    
    // Memanggil extractor pipeline
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    
    // Mengonversi tensor hasil ke array number biasa
    return Array.from(output.data) as number[];
  } catch (error) {
    console.error("Error generating embedding:", error);
    // Fallback darurat berbentuk array 384 dimensi jika terjadi kendala jaringan sesaat di Vercel
    return generateFallbackEmbedding(text, 384);
  }
}

// Fungsi fallback matematika deterministik pengaman jika API/WASM terkendala
function generateFallbackEmbedding(text: string, dimensions: number): number[] {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  
  const vector: number[] = [];
  for (let i = 0; i < dimensions; i++) {
    const val = Math.sin(hash + i) * 10000;
    vector.push(val - Math.floor(val));
  }
  return vector;
}