'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Shield, Tag, ChevronDown, ChevronRight } from 'lucide-react';
import type { Comment } from '@/lib/types';
import { TRADEOFF_TAGS } from '@/lib/types';

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  onReply: (parentId: string, content: string, isPrincipal: boolean, tags: string[]) => void;
}

function CommentItem({ comment, depth = 0, onReply }: CommentItemProps) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showReplies, setShowReplies] = useState(true);

  const submitReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText, isPrincipal, selectedTags);
    setReplyText('');
    setReplying(false);
    setSelectedTags([]);
    setIsPrincipal(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]);
  };

  return (
    <div className={`${depth > 0 ? 'ml-4 border-l border-slate-800 pl-3' : ''}`}>
      <div className="py-3">
        {/* Author row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-mono text-xs text-indigo-400 flex-none">
            {comment.author[0]}
          </div>
          <span className="font-mono text-xs text-slate-300 font-bold">{comment.author}</span>
          {comment.isPrincipalReview && (
            <span className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-sm">
              <Shield className="w-2.5 h-2.5" /> Principal
            </span>
          )}
          <span className="text-slate-600 text-xs ml-auto">{timeAgo(comment.createdAt)}</span>
        </div>

        {/* Content */}
        <p className="text-slate-300 text-sm leading-relaxed mb-2">{comment.content}</p>

        {/* Tradeoff tags */}
        {comment.tradeoffTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {comment.tradeoffTags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 font-mono text-xs text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded-sm">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setReplying(!replying)}
            className="font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            Reply
          </button>
          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              {showReplies ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>
          )}
        </div>

        {/* Reply form */}
        {replying && (
          <div className="mt-3 space-y-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${comment.author}...`}
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPrincipal(!isPrincipal)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-sm border font-mono text-xs transition-all ${
                  isPrincipal
                    ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                    : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-600'
                }`}
              >
                <Shield className="w-3 h-3" /> Principal
              </button>
              <button
                onClick={submitReply}
                disabled={!replyText.trim()}
                className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-mono text-xs rounded-sm hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
              >
                <Send className="w-3 h-3" /> Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {showReplies && comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} onReply={onReply} />
      ))}
    </div>
  );
}

interface Props {
  designId: string;
  onClose: () => void;
}

export default function ReviewPanel({ designId, onClose }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?designId=${designId}`);
      const data = await res.json();
      setComments(data);
    } finally {
      setLoading(false);
    }
  }, [designId]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const toggleTag = (tag: string) => {
    setSelectedTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]);
  };

  const submitComment = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          designId,
          content,
          isPrincipalReview: isPrincipal,
          tradeoffTags: selectedTags,
          author: 'You',
          authorId: 'current-user',
        }),
      });
      setContent('');
      setIsPrincipal(false);
      setSelectedTags([]);
      setShowTagPicker(false);
      await fetchComments();
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string, replyContent: string, replyIsPrincipal: boolean, replyTags: string[]) => {
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        designId,
        parentId,
        content: replyContent,
        isPrincipalReview: replyIsPrincipal,
        tradeoffTags: replyTags,
        author: 'You',
        authorId: 'current-user',
      }),
    });
    await fetchComments();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex-none flex items-center justify-between px-4 h-12 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <span className="font-mono font-bold text-sm text-slate-200">Design Review</span>
          {!loading && (
            <span className="font-mono text-xs text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded-sm">
              {comments.length}
            </span>
          )}
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-400 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Comment Form */}
      <div className="flex-none border-b border-slate-800 p-4 space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a design review comment... Be specific about trade-offs and failure modes."
          rows={4}
          className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
        />

        {/* Tag picker */}
        <div>
          <button
            onClick={() => setShowTagPicker(!showTagPicker)}
            className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors mb-2"
          >
            <Tag className="w-3 h-3" />
            {selectedTags.length > 0 ? `${selectedTags.length} trade-off tag(s) selected` : 'Add trade-off tags'}
          </button>
          {showTagPicker && (
            <div className="flex flex-wrap gap-1.5">
              {TRADEOFF_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`font-mono text-xs px-2 py-1 rounded-sm border transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-400/15 border-indigo-400/40 text-indigo-400'
                      : 'bg-slate-900 border-slate-800 text-slate-600 hover:border-slate-600 hover:text-slate-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
          {selectedTags.length > 0 && !showTagPicker && (
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPrincipal(!isPrincipal)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border font-mono text-xs transition-all ${
              isPrincipal
                ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-600'
            }`}
          >
            <Shield className="w-3 h-3" />
            {isPrincipal ? 'Principal Review' : 'Mark as Principal'}
          </button>
          <button
            onClick={submitComment}
            disabled={!content.trim() || submitting}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-indigo-500 text-white font-mono text-xs rounded-sm hover:bg-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3 h-3" />
            {submitting ? 'Posting...' : 'Post Review'}
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto px-4">
        {loading && (
          <div className="py-8 text-center font-mono text-xs text-slate-600">Loading reviews...</div>
        )}
        {!loading && comments.length === 0 && (
          <div className="py-12 text-center">
            <MessageSquare className="w-8 h-8 text-slate-700 mx-auto mb-3" />
            <p className="font-mono text-sm text-slate-600">No reviews yet</p>
            <p className="font-mono text-xs text-slate-700 mt-1">Be the first to review this design</p>
          </div>
        )}
        {!loading && comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}
