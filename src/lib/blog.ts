import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { BlogPost, BlogPostMeta } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

    const posts: BlogPostMeta[] = [];

    for (const file of mdFiles) {
      const slug = file.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const raw = await fs.readFile(fullPath, "utf-8");
      const { data } = matter(raw);

      posts.push({
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "2026-11-08",
        category: data.category || "Geral",
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author || "Luis Carvalho",
        readTime: data.readTime || "4 min",
        githubRepo: data.githubRepo,
        stars: data.stars,
      });
    }

    return posts.sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<{ post: BlogPost; contentHtml: string } | null> {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`);
    let raw: string;
    try {
      raw = await fs.readFile(fullPath, "utf-8");
    } catch {
      raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
    }

    const { data, content } = matter(raw);
    const contentHtml = await marked.parse(content);

    const post: BlogPost = {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "2026-11-08",
      category: data.category || "Geral",
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || "Luis Carvalho",
      readTime: data.readTime || "4 min",
      githubRepo: data.githubRepo,
      stars: data.stars,
      content,
    };

    return { post, contentHtml };
  } catch (error) {
    console.error(`Error loading post for slug ${slug}:`, error);
    return null;
  }
}
