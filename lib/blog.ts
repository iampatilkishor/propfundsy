import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = join(process.cwd(), "content/blog");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  category?: string;
  featured?: boolean;
  content: string;
  html: string;
}

/** Load all blog posts, sorted newest first. */
export function getAllPosts(): Post[] {
  try {
    const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
    const posts = files.map((f) => {
      const slug = f.replace(".md", "");
      return getPost(slug);
    });
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

/** Load a single post by slug. */
export function getPost(slug: string): Post {
  const path = join(BLOG_DIR, `${slug}.md`);
  const file = readFileSync(path, "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().split("T")[0],
    updated: data.updated,
    author: data.author,
    category: data.category,
    featured: data.featured ?? false,
    content,
    html: marked(content) as string,
  };
}

/** Check if a post exists. */
export function postExists(slug: string): boolean {
  try {
    readFileSync(join(BLOG_DIR, `${slug}.md`), "utf8");
    return true;
  } catch {
    return false;
  }
}
