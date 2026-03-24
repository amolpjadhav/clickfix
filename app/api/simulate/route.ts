import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const { elements, title, description } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        score: 0,
        summary: 'ANTHROPIC_API_KEY is not set. Add it to your .env.local file.',
        bottlenecks: [],
        failureScenarios: [],
        strengths: [],
        recommendations: ['Set ANTHROPIC_API_KEY in .env.local to enable simulation.'],
        tradeoffs: [],
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  const client = new Anthropic({ apiKey });

  // Extract meaningful text/shapes from Excalidraw elements
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const labeled = (elements as any[])
    .filter((el) => el.text || el.label)
    .map((el) => `[${el.type}] "${el.text || el.label}"`)
    .join('\n');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shapes = (elements as any[])
    .filter((el) => !el.text && el.type !== 'text')
    .reduce((acc: Record<string, number>, el) => {
      acc[el.type] = (acc[el.type] || 0) + 1;
      return acc;
    }, {});

  const shapesSummary = Object.entries(shapes)
    .map(([t, c]) => `${c}x ${t}`)
    .join(', ');

  const prompt = `You are a Principal Engineer at a top-tier tech company performing a "Bar Raiser" design review. Analyze this system design and provide expert-level architectural feedback.

Design Title: ${title || 'Untitled'}
Description: ${description || 'No description provided'}

Canvas Elements:
${labeled || '(No labeled elements found on canvas)'}

Shape Summary: ${shapesSummary || '(Empty canvas)'}

Total elements: ${(elements as unknown[]).length}

Provide a comprehensive architectural analysis. Be specific and opinionated — name exact failure points, not generic advice. For example:
- "This design will fail during a 31% traffic spike because the auth service has no circuit breaker"
- "Missing data isolation in the fulfillment hook — tenant writes share the same shard key"

Respond ONLY with valid JSON matching this exact structure (no markdown, no preamble):
{
  "score": <integer 0-100, where 100 = production-ready>,
  "summary": "<2-3 sentence executive summary of the architecture>",
  "bottlenecks": [
    {
      "component": "<component name>",
      "severity": "<critical|high|medium|low>",
      "description": "<specific failure description>"
    }
  ],
  "failureScenarios": [
    "<specific scenario like: This design will fail when...>"
  ],
  "strengths": [
    "<specific strength of this design>"
  ],
  "recommendations": [
    "<specific actionable recommendation>"
  ],
  "tradeoffs": [
    {
      "type": "<e.g., Stateless vs Stateful>",
      "analysis": "<specific analysis for this design>"
    }
  ]
}`;

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: 'claude-opus-4-6',
          max_tokens: 4096,
          thinking: { type: 'adaptive' },
          messages: [{ role: 'user', content: prompt }],
        });

        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              score: 0,
              summary: `Simulation error: ${msg}`,
              bottlenecks: [],
              failureScenarios: [],
              strengths: [],
              recommendations: [],
              tradeoffs: [],
            })
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
