export type DesignType = 'challenge' | 'blueprint' | 'design';
export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface Design {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  type: DesignType;
  challengeId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appState: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  votes: number;
  votedBy: string[];
  isBadged: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  designId: string;
  parentId?: string;
  author: string;
  authorId: string;
  isPrincipalReview: boolean;
  content: string;
  tradeoffTags: string[];
  createdAt: string;
  replies: Comment[];
}

export interface Bottleneck {
  component: string;
  severity: Severity;
  description: string;
}

export interface Tradeoff {
  type: string;
  analysis: string;
}

export interface SimulationResult {
  score: number;
  summary: string;
  bottlenecks: Bottleneck[];
  failureScenarios: string[];
  strengths: string[];
  recommendations: string[];
  tradeoffs?: Tradeoff[];
}

export const TRADEOFF_TAGS = [
  'Stateless vs Stateful',
  'Session vs JWT',
  'SQL vs NoSQL',
  'Sync vs Async',
  'Monolith vs Microservices',
  'Strong vs Eventual Consistency',
  'Push vs Pull',
  'Cache vs DB',
  'Horizontal vs Vertical Scale',
] as const;
