import type { Design, Comment } from './types';

// In-memory store — replace with Supabase/Postgres in production
const designs: Design[] = [
  {
    id: 'design-2',
    title: 'Netflix Video Streaming Architecture',
    description:
      'A production-grade streaming architecture with CDN edge caching, adaptive bitrate encoding, and regional failover. Handles 200M+ concurrent streams with P99 < 50ms.',
    author: 'Alex Rivera',
    authorId: 'user-2',
    type: 'blueprint',
    elements: [],
    appState: {},
    files: {},
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    votes: 312,
    votedBy: [],
    isBadged: true,
    tags: ['streaming', 'cdn', 'high-availability', 'video'],
  },
  {
    id: 'design-3',
    title: 'Ride-Share Real-Time Matching System',
    description:
      'Design the matching algorithm and system architecture for a ride-share platform that processes 50K match requests/sec with geo-spatial indexing and surge pricing.',
    author: 'Priya Nair',
    authorId: 'user-3',
    type: 'challenge',
    elements: [],
    appState: {},
    files: {},
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    votes: 89,
    votedBy: [],
    isBadged: false,
    tags: ['geospatial', 'real-time', 'matching', 'marketplace'],
  },
  {
    id: 'design-4',
    title: 'URL Shortener at 100B URLs',
    description:
      'A Standardized Blueprint for a URL shortener that scales to 100 billion URLs with consistent hashing, read-heavy optimization, and global low-latency redirects.',
    author: 'Marcus Webb',
    authorId: 'user-4',
    type: 'blueprint',
    elements: [],
    appState: {},
    files: {},
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    votes: 201,
    votedBy: [],
    isBadged: true,
    tags: ['url-shortener', 'consistent-hashing', 'read-heavy', 'caching'],
  },
  {
    id: 'design-5',
    title: 'Distributed Rate Limiter',
    description:
      'Design a rate limiter that works across 500+ microservices with token bucket algorithm, Redis cluster backing, and <1ms overhead per request.',
    author: 'Jordan Kim',
    authorId: 'user-5',
    type: 'challenge',
    elements: [],
    appState: {},
    files: {},
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    votes: 34,
    votedBy: [],
    isBadged: false,
    tags: ['rate-limiting', 'redis', 'microservices', 'distributed'],
  },
];

const comments: Comment[] = [
  {
    id: 'comment-1',
    designId: 'design-2',
    author: 'David Park',
    authorId: 'user-6',
    isPrincipalReview: true,
    content:
      'This blueprint has a critical gap in the fulfillment hook — missing data isolation between tenant writes. Under a 31% traffic spike, the shared session store becomes a bottleneck because there is no shard key on tenantId. Consider partitioning by region+tenantId compound key.',
    tradeoffTags: ['Stateless vs Stateful', 'Strong vs Eventual Consistency'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    replies: [
      {
        id: 'comment-1-1',
        designId: 'design-2',
        parentId: 'comment-1',
        author: 'Alex Rivera',
        authorId: 'user-2',
        isPrincipalReview: false,
        content:
          'Great catch — addressed in v2 by adding a composite shard key. Also switched from session tokens to JWT with short TTL to make the edge layer stateless.',
        tradeoffTags: ['Session vs JWT'],
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        replies: [],
      },
    ],
  },
];

export function getDesigns(): Design[] {
  return [...designs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getDesignById(id: string): Design | undefined {
  return designs.find((d) => d.id === id);
}

export function createDesign(data: Partial<Design>): Design {
  const design: Design = {
    id: `design-${Date.now()}`,
    title: data.title || 'Untitled Design',
    description: data.description || '',
    author: data.author || 'Anonymous',
    authorId: data.authorId || `anon-${Date.now()}`,
    type: data.type || 'design',
    challengeId: data.challengeId,
    elements: data.elements || [],
    appState: data.appState || {},
    files: data.files || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    votes: 0,
    votedBy: [],
    isBadged: false,
    tags: data.tags || [],
  };
  designs.push(design);
  return design;
}

export function updateDesign(id: string, data: Partial<Design>): Design | null {
  const idx = designs.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  designs[idx] = {
    ...designs[idx],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };
  return designs[idx];
}

export function voteDesign(
  id: string,
  userId: string
): { votes: number; voted: boolean } | null {
  const design = designs.find((d) => d.id === id);
  if (!design) return null;
  const alreadyVoted = design.votedBy.includes(userId);
  if (alreadyVoted) {
    design.votes = Math.max(0, design.votes - 1);
    design.votedBy = design.votedBy.filter((u) => u !== userId);
  } else {
    design.votes += 1;
    design.votedBy.push(userId);
  }
  return { votes: design.votes, voted: !alreadyVoted };
}

export function getComments(designId: string): Comment[] {
  return comments.filter((c) => c.designId === designId && !c.parentId);
}

export function createComment(data: Partial<Comment>): Comment {
  const comment: Comment = {
    id: `comment-${Date.now()}`,
    designId: data.designId!,
    parentId: data.parentId,
    author: data.author || 'Anonymous',
    authorId: data.authorId || `anon-${Date.now()}`,
    isPrincipalReview: data.isPrincipalReview || false,
    content: data.content || '',
    tradeoffTags: data.tradeoffTags || [],
    createdAt: new Date().toISOString(),
    replies: [],
  };

  if (data.parentId) {
    const parent = findComment(comments, data.parentId);
    if (parent) parent.replies.push(comment);
  } else {
    comments.push(comment);
  }
  return comment;
}

function findComment(list: Comment[], id: string): Comment | null {
  for (const c of list) {
    if (c.id === id) return c;
    const found = findComment(c.replies, id);
    if (found) return found;
  }
  return null;
}
