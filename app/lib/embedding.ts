/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipeline } from '@huggingface/transformers';

class EmbeddingPipeline {
  static task = 'feature-extraction' as const;
  static model = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
  static instance: unknown = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model);
    }
    return this.instance;
  }
}

export async function getSemanticEmbedding(text: string): Promise<number[]> {
  const extractor = await EmbeddingPipeline.getInstance();
  
  // Memanggil extractor pipeline dengan tipe data yang aman
  const output = await (extractor as any)(text, { pooling: 'mean', normalize: true });
  
  // Mengonversi tensor hasil ke array number biasa
  return Array.from(output.data) as number[];
}