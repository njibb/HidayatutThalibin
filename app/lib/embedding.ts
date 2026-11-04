
function generateEmbedding(text: string): number[] {
  const vector = new Array(384).fill(0);
  if (!text) return vector;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const index = i % 384;
    vector[index] += charCode / 255.0;
  }
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return magnitude === 0 ? vector : vector.map(val => val / magnitude);
}

export async function getSemanticEmbedding(text: string): Promise<number[]> {
  try {
    return generateEmbedding(text);
  } catch (error) {
    console.error("Embedding generation error:", error);
    return new Array(384).fill(0);
  }
}