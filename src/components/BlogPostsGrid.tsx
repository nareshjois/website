"use client";

import React, { useEffect, useRef, useState } from "react";
import { CometCard } from "./ui/comet-card";
import { cn } from "@/lib/utils";

export type SerializedPost = {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  heroImage: { src: string; width?: number; height?: number } | null;
};

const BATCH_SIZE = 6;

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PostCard({
  post,
  featured = false,
}: {
  post: SerializedPost;
  featured?: boolean;
}) {
  const hasImage = !!post.heroImage;

  return (
    <CometCard className="w-full">
      <a
        href={`/blog/${post.id}/`}
        className={cn(
          "block overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm",
          "min-h-full flex flex-col",
          featured ? "min-h-[320px]" : "min-h-[280px]"
        )}
      >
        {hasImage ? (
          <div
            className={cn(
              "relative overflow-hidden bg-white/5",
              featured ? "h-64" : "h-40"
            )}
          >
            <img
              src={post.heroImage!.src}
              alt=""
              className="h-full w-full object-cover"
              width={post.heroImage!.width}
              height={post.heroImage!.height}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        )}
        <div
          className={cn(
            "flex flex-1 flex-col text-white",
            hasImage ? "p-5" : "p-6"
          )}
        >
          <h3
            className={cn(
              "font-bold text-white",
              hasImage
                ? featured
                  ? "text-xl line-clamp-2"
                  : "text-base line-clamp-2"
                : featured
                  ? "text-2xl line-clamp-3"
                  : "text-xl line-clamp-2"
            )}
          >
            {post.title}
          </h3>
          {(featured || !hasImage) && (
            <p
              className={cn(
                "mt-2 text-white/70",
                hasImage ? "line-clamp-2 text-sm" : "line-clamp-3 text-base"
              )}
            >
              {post.description}
            </p>
          )}
          <p className="mt-auto pt-3 text-sm text-white/70">
            {formatDate(post.pubDate)}
          </p>
        </div>
      </a>
    </CometCard>
  );
}

export default function BlogPostsGrid({ posts }: { posts: SerializedPost[] }) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [featuredPost, ...gridPosts] = posts;
  const visibleGridPosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setVisibleCount((n) => Math.min(n + BATCH_SIZE, gridPosts.length));
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, gridPosts.length]);

  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-gray-400">No posts yet.</p>
    );
  }

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      {/* Featured post - full width */}
      {featuredPost && (
        <div className="w-full">
          <PostCard post={featuredPost} featured />
        </div>
      )}

      {/* Grid - 3 cards per row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGridPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load more sentinel */}
      {hasMore && <div ref={loadMoreRef} className="h-4 w-full" />}
    </div>
  );
}
