import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPost, formatDate } from "@/lib/content";
import useDocumentMeta from "@/hooks/useDocumentMeta";
import Prose from "@/components/mdx/Prose";
import NotFound from "./NotFound";

export default function WritingPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useDocumentMeta({
    title: post ? `${post.frontmatter.title} — Sujal Maheshwari` : "Not found",
    description: post?.frontmatter.summary,
  });

  if (!post) return <NotFound />;
  const { frontmatter: fm, Component, readingTime } = post;

  return (
    <article className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-[680px]">
        <Link
          to="/writing"
          viewTransition
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-spot"
        >
          <ArrowLeft className="size-3.5" /> Writing
        </Link>

        <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
          <span>{formatDate(fm.date)}</span>
          <span>·</span>
          <span>{readingTime} min read</span>
        </div>
        <h1 className="font-serif text-[clamp(34px,5.5vw,60px)] font-normal leading-[1.02] tracking-[-0.01em] text-foreground">
          {fm.title}
        </h1>
        {fm.summary && (
          <p className="mt-4 font-serif text-[20px] italic leading-snug text-muted-foreground">
            {fm.summary}
          </p>
        )}
        <div className="mb-10 mt-5 flex flex-wrap gap-1.5">
          {(fm.tags || []).map((t) => (
            <span
              key={t}
              className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <hr className="mb-10 border-border" />

        <Prose>
          <Component />
        </Prose>
      </div>
    </article>
  );
}
