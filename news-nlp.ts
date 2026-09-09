import { pipeline } from '@huggingface/transformers';

export type NewsSentiment = 'positive' | 'negative' | 'neutral';
export type SentimentResult = { sentiment: NewsSentiment; score: number };

const MODEL = 'Xenova/finbert';
let classifierPromise: Promise<any> | null = null;

export async function getFinBert(onProgress?: (p: number, text: string) => void) {
  if (!classifierPromise) {
    classifierPromise = pipeline('text-classification', MODEL, {
      device: 'webgpu',
      dtype: 'q4f16',
      progress_callback: (d: any) => {
        if (typeof d?.progress === 'number') onProgress?.(Math.round(d.progress), d?.file ?? d?.status ?? 'Loading FinBERT');
      },
    }) as Promise<any>;
  }
  return classifierPromise;
}

export async function classifyFinancialHeadline(text: string): Promise<SentimentResult> {
  const classifier = await getFinBert();
  const output = await classifier(text, { topk: 3 });
  const rows = Array.isArray(output) ? output as Array<any> : [output as any];
  const best = rows[0] ?? { label: 'neutral', score: 0 };
  const label = String(best.label ?? 'neutral').toLowerCase();
  return {
    sentiment: label.includes('positive') ? 'positive' : label.includes('negative') ? 'negative' : 'neutral',
    score: Number(best.score ?? 0),
  };
}

export function releaseFinBert() {
  // Transformers.js pipelines expose dispose() in supported versions.
  if (!classifierPromise) return;
  classifierPromise.then((pipe: any) => pipe?.dispose?.()).catch(() => undefined);
  classifierPromise = null;
}
