import rawArtigos from "../../content/artigos/artigos.json";
import { marked } from "marked";
import { BlogPost, BlogPostMeta } from "./types";

interface ArtigoData extends BlogPostMeta {
  content: string;
}

export async function getAllArtigos(): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = (rawArtigos as ArtigoData[]).map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    date: item.date,
    category: item.category,
    tags: item.tags,
    author: item.author,
    readTime: item.readTime,
    githubRepo: item.githubRepo,
    stars: item.stars,
  }));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArtigoBySlug(slug: string): Promise<{ post: BlogPost; contentHtml: string } | null> {
  const match = (rawArtigos as ArtigoData[]).find((item) => item.slug === slug);
  if (!match) return null;

  const contentHtml = await marked.parse(match.content);
  const post: BlogPost = {
    ...match,
  };
  return { post, contentHtml };
}

// Backwards compatibility aliases
export const getAllPosts = getAllArtigos;
export const getPostBySlug = getArtigoBySlug;
