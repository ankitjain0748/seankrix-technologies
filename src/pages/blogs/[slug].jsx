import Layout from "@/Components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import blogData from "../../json/blog.json";

const SITE_URL = "https://seankrixtechnologies.com";

export async function getStaticPaths() {
  const paths = blogData.map((b) => ({
    params: { slug: b.slug },
  }));

  return {
    paths,
    fallback: false, // Naye slugs ke liye build ke time generate hoga; agar dynamic chahiye to true/'blocking' karein
  };
}

export async function getStaticProps({ params }) {
  const blog = blogData.find((b) => b.slug === params.slug) || null;

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: { blog },
  };
}

export default function BlogDetailsPage({ blog: propBlog }) {
  const router = useRouter();
  const slug = propBlog?.slug || router.query.slug;
  const [copied, setCopied] = useState(false);

  const blog = propBlog || blogData.find((b) => b.slug === slug);

  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-gray-400">Loading article...</p>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">
            The post you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/blogs"
            className="bg-[#00BFFF] text-black font-semibold px-6 py-3 rounded-xl hover:bg-white transition"
          >
            Back to Blogs
          </Link>
        </div>
      </Layout>
    );
  }

  // Same category ko priority dekar related articles filter karein
  const otherBlogs = blogData.filter((item) => item.slug !== blog.slug);
  const sameCategory = otherBlogs.filter((item) => item.category === blog.category);
  const differentCategory = otherBlogs.filter((item) => item.category !== blog.category);
  const relatedArticles = [...sameCategory, ...differentCategory].slice(0, 2);
  const moreInsights = otherBlogs.slice(0, 3);

  const currentUrl = `${SITE_URL}/blogs/${blog.slug}`;
  const ogImage = blog.image?.startsWith("http")
    ? blog.image
    : `${SITE_URL}${blog.image || "/og-default.png"}`;
  const metaDescription =
    blog.description || blog.excerpt || blog.content.trim().slice(0, 155);
  const metaKeywords = Array.isArray(blog.keywords)
    ? blog.keywords.join(", ")
    : `${blog.category}, Web Development, SEO, Seankrix Technologies`;

  const copyToClipboard = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Inline parser: **bold**, `code`, [Text](url), aur raw https:// URLs ke liye
  const renderInlineText = (text) => {
    const tokenRegex =
      /(\[[^\]]+\]\((?:https?:\/\/[^\s)]+|\/[^\s)]+)\)|\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s)]+)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, idx) => {
      if (!part) return null;

      // Markdown link: [Label](URL)
      const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (mdLinkMatch) {
        const [, label, rawHref] = mdLinkMatch;
        const isInternal =
          rawHref.startsWith("/") || rawHref.includes("seankrixtechnologies.com");
        const href = rawHref.replace(/^https?:\/\/(www\.)?seankrixtechnologies\.com/, "") || "/";

        if (isInternal) {
          return (
            <Link
              key={idx}
              href={href}
              className="text-[#00BFFF] underline underline-offset-4 hover:text-white transition"
            >
              {label}
            </Link>
          );
        }
        return (
          <a
            key={idx}
            href={rawHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00BFFF] underline underline-offset-4 hover:text-white transition"
          >
            {label}
          </a>
        );
      }

      // Bold text: **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline code: `code`
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={idx}
            className="bg-white/10 text-[#00BFFF] px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Raw URL: https://...
      if (/^https?:\/\//.test(part)) {
        const cleanUrl = part.replace(/[.,;!?]+$/, "");
        const trailingPunct = part.slice(cleanUrl.length);
        const isInternal = cleanUrl.includes("seankrixtechnologies.com");
        const internalPath =
          cleanUrl.replace(/^https?:\/\/(www\.)?seankrixtechnologies\.com/, "") || "/";

        return (
          <React.Fragment key={idx}>
            {isInternal ? (
              <Link
                href={internalPath}
                className="text-[#00BFFF] underline underline-offset-4 hover:text-white transition break-all"
              >
                {cleanUrl}
              </Link>
            ) : (
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00BFFF] underline underline-offset-4 hover:text-white transition break-all"
              >
                {cleanUrl}
              </a>
            )}
            {trailingPunct}
          </React.Fragment>
        );
      }

      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  // Full Markdown Content Parser
  const renderContent = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    const elements = [];
    let currentList = [];
    let currentTable = [];

    const flushList = (keyPrefix) => {
      if (currentList.length === 0) return;
      elements.push(
        <ul key={`ul-${keyPrefix}`} className="space-y-3.5 my-6 pl-1 list-none">
          {currentList.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-gray-300 text-[16px] md:text-[18px] leading-7"
            >
              <span
                className={`font-bold select-none mt-[2px] ${
                  item.icon === "✘" ? "text-red-400" : "text-[#00BFFF]"
                }`}
              >
                {item.icon}
              </span>
              <span>{renderInlineText(item.text)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    };

    const flushTable = (keyPrefix) => {
      if (currentTable.length === 0) return;
      const rows = currentTable
        .map((row) =>
          row
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim())
        )
        .filter((cells) => cells.length > 0 && !cells.every((c) => /^[-:\s]+$/.test(c)));

      if (rows.length > 0) {
        const [header, ...body] = rows;
        elements.push(
          <div
            key={`table-${keyPrefix}`}
            className="overflow-x-auto my-8 rounded-2xl border border-white/10 bg-white/[0.02]"
          >
            <table className="w-full text-left border-collapse text-sm md:text-base">
              <thead>
                <tr className="border-b border-white/10 bg-[#00BFFF]/10">
                  {header.map((col, i) => (
                    <th key={i} className="py-3.5 px-4 font-semibold text-white">
                      {renderInlineText(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-white/5 last:border-none hover:bg-white/[0.02] transition"
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 text-gray-300">
                        {renderInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      currentTable = [];
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        flushList(index);
        flushTable(index);
        return;
      }

      // Markdown Table line
      if (trimmedLine.startsWith("|") && trimmedLine.endsWith("|")) {
        flushList(index);
        currentTable.push(trimmedLine);
        return;
      } else {
        flushTable(index);
      }

      // List items: "* ", "- ", "• ", "✔", "✘"
      if (
        /^\*\s+/.test(trimmedLine) ||
        /^-\s+/.test(trimmedLine) ||
        /^•\s*/.test(trimmedLine) ||
        trimmedLine.startsWith("✔") ||
        trimmedLine.startsWith("✘")
      ) {
        const icon = trimmedLine.startsWith("✘") ? "✘" : "✔";
        const cleanText = trimmedLine.replace(/^(\*\s+|-\s+|•\s*|✔\s*|✘\s*)/, "").trim();
        currentList.push({ icon, text: cleanText });
        return;
      }

      flushList(index);

      // Horizontal Rule "---"
      if (/^---+$/.test(trimmedLine)) {
        elements.push(<hr key={`hr-${index}`} className="border-white/10 my-8" />);
        return;
      }

      // Headings
      if (trimmedLine.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 tracking-tight"
          >
            {renderInlineText(trimmedLine.replace(/^###\s+/, "").trim())}
          </h3>
        );
      } else if (trimmedLine.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 tracking-tight border-l-4 border-[#00BFFF] pl-4"
          >
            {renderInlineText(trimmedLine.replace(/^##\s+/, "").trim())}
          </h2>
        );
      } else if (trimmedLine.startsWith("# ")) {
        const headingText = trimmedLine.replace(/^#\s+/, "").trim();
        // Agar content ke andar duplicate blog.title wala H1 ho to skip karein
        if (headingText.toLowerCase() !== blog.title.toLowerCase()) {
          elements.push(
            <h2
              key={`h1-sub-${index}`}
              className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 tracking-tight border-l-4 border-[#00BFFF] pl-4"
            >
              {renderInlineText(headingText)}
            </h2>
          );
        }
      } else {
        elements.push(
          <p
            key={`p-${index}`}
            className="text-gray-300 font-light tracking-wide text-[16px] md:text-[18px] leading-[32px] md:leading-[36px] mb-6"
          >
            {renderInlineText(trimmedLine)}
          </p>
        );
      }
    });

    flushList("final");
    flushTable("final");

    return elements;
  };

  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{blog.title} | Seankrix Technologies</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content={blog.author || "Seankrix Technologies"} />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content="en-IN" />
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.country" content="India" />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Seankrix Technologies" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={`${blog.title} | Seankrix Technologies`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={blog.isoDate || "2026-05-01"} />
        <meta property="article:author" content={SITE_URL} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} | Seankrix Technologies`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* BlogPosting + Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": currentUrl,
                },
                headline: blog.title,
                image: ogImage,
                datePublished: blog.isoDate || "2026-05-01",
                dateModified: blog.isoDate || "2026-05-01",
                description: metaDescription,
                author: {
                  "@type": "Organization",
                  name: blog.author || "Seankrix Technologies",
                  url: SITE_URL,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Seankrix Technologies",
                  url: SITE_URL,
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                  { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
                  { "@type": "ListItem", position: 3, name: blog.title, item: currentUrl },
                ],
              },
            ]),
          }}
        />
      </Head>

      <section className="bg-black text-white py-16 md:py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00BFFF]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#00BFFF] transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-[#00BFFF] transition">
              Blogs
            </Link>
            <span>/</span>
            <span className="text-gray-400 truncate max-w-xs">{blog.title}</span>
          </nav>

          {/* Title Header */}
          <div className="mb-10">
            <span className="bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mt-6 leading-tight tracking-tight max-w-5xl">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-400 mt-6 text-sm border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#00BFFF]/20 text-[#00BFFF] flex items-center justify-center font-bold text-xs">
                  S
                </span>
                <span>By {blog.author || "Seankrix Technologies"}</span>
              </div>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <span className="text-[#00BFFF] font-medium">{blog.readTime || "6 min read"}</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[24px] md:rounded-[32px] mb-12 shadow-2xl border border-white/10 bg-white/[0.02]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          )}

          {/* Content Layout */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <article className="max-w-none text-gray-300 antialiased selection:bg-[#00BFFF]/30">
                {renderContent(blog.content)}
              </article>

              {/* Social Share Group */}
              <div className="border-t border-b border-white/10 py-6 my-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm font-semibold text-gray-400">
                  Enjoyed reading? Share this article:
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      currentUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0077b5]/10 hover:bg-[#0077b5] text-white text-xs font-semibold rounded-xl transition-all duration-300"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      currentUrl
                    )}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black text-white text-xs font-semibold rounded-xl transition-all duration-300"
                  >
                    Twitter (X)
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      blog.title + " - " + currentUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366] text-white text-xs font-semibold rounded-xl transition-all duration-300"
                  >
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-white/5 hover:bg-[#00BFFF] hover:text-black text-white text-xs font-semibold rounded-xl transition-all duration-300"
                  >
                    {copied ? "Copied! ✓" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side Strategy Panel */}
            <aside className="space-y-8 lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-[#00BFFF]/20 via-black to-black border border-[#00BFFF]/30 rounded-[32px] p-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00BFFF]/10 blur-xl rounded-full"></div>
                <h3 className="text-2xl font-bold mb-3">Want a Custom Solution?</h3>
                <p className="text-gray-400 text-sm leading-6 mb-6">
                  Build fast, enterprise-grade, SEO-friendly websites with India&apos;s trusted
                  development agency.
                </p>
                <Link
                  href="/contact"
                  className="block bg-[#00BFFF] hover:bg-white text-black font-semibold text-sm py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#00BFFF]/20"
                >
                  Book A Free Strategy Call
                </Link>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6">
                <h4 className="text-lg font-bold mb-4 border-b border-white/10 pb-3">
                  More Insights
                </h4>
                <div className="space-y-4">
                  {moreInsights.map((item) => (
                    <Link key={item.slug} href={`/blogs/${item.slug}`} className="group block">
                      <p className="text-xs text-[#00BFFF] font-medium mb-1">{item.category}</p>
                      <p className="text-sm text-gray-300 group-hover:text-white font-medium line-clamp-2 transition duration-200">
                        {item.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Recommended Section */}
          <div className="mt-20 border-t border-white/10 pt-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Recommended <span className="text-[#00BFFF]">Articles</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/blogs/${article.slug}`} className="block">
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 flex flex-col md:flex-row gap-5 hover:border-[#00BFFF]/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full">
                    <div className="relative w-full md:w-40 h-28 overflow-hidden rounded-2xl shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 160px"
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <span className="text-[#00BFFF] text-xs font-semibold uppercase tracking-wider">
                          {article.category}
                        </span>

                        <h4 className="text-lg font-bold text-white mt-1 line-clamp-2 group-hover:text-[#00BFFF] transition duration-200">
                          {article.title}
                        </h4>
                      </div>

                      <span className="text-sm text-gray-400 group-hover:text-white flex items-center gap-1 mt-3 transition">
                        Read Article{" "}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}