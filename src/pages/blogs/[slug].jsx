import Layout from "@/Components/Layout";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const blogData = {
  "future-of-web-development": {
    slug: "future-of-web-development",

    title: "The Future of Modern Web Development",

    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",

    category: "Web Development",

    date: "May 2026",

    content: `
Modern web development is evolving rapidly with technologies like React, Next.js, AI tools, server components, and cloud infrastructure.

Businesses now require fast, scalable, SEO-friendly, and responsive applications to compete online.

Next.js has become one of the most powerful frameworks for building modern websites due to its speed, performance, and SEO optimization features.

AI-powered tools are also transforming development workflows by increasing productivity and improving user experience.

Developers who learn modern frontend technologies and performance optimization techniques will have massive opportunities in the future.
    `,
  },

  "seo-strategies-2026": {
    slug: "seo-strategies-2026",

    title: "Top SEO Strategies To Rank Higher in 2026",

    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1400&auto=format&fit=crop",

    category: "SEO",

    date: "May 2026",

    content: `
SEO continues to evolve with Google's algorithm updates and AI-driven search experiences.

Modern SEO focuses on content quality, page speed, mobile optimization, and user experience.

Businesses should prioritize technical SEO, structured data, keyword research, and content marketing.

High-quality backlinks and optimized user engagement metrics also play a major role in search rankings.

Consistent SEO strategies can help businesses generate long-term organic traffic and leads.
    `,
  },

  "importance-of-ui-ux": {
    slug: "importance-of-ui-ux",

    title: "Why UI/UX Design Matters For Business",

    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1400&auto=format&fit=crop",

    category: "UI/UX Design",

    date: "May 2026",

    content: `
UI/UX design directly impacts how users interact with digital products and websites.

A clean and modern design improves customer trust, engagement, and conversion rates.

Good UX design ensures users can navigate smoothly and complete actions easily.

Businesses investing in user-centered design often see better customer retention and satisfaction.

Modern UI trends include minimal layouts, smooth animations, dark themes, and mobile-first design.
    `,
  },
};

export default function BlogDetailsPage() {
  const router = useRouter();

  const { slug } = router.query;

  const blog = blogData[slug];

  if (!blog) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>
          {blog.title} | Seankrix Technologies
        </title>

        <meta
          name="description"
          content={blog.content.slice(0, 150)}
        />

        <meta
          name="keywords"
          content={`${blog.category}, Web Development, SEO, UI UX, Technology`}
        />

        <meta
          name="author"
          content="Seankrix Technologies"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        {/* Open Graph */}
        <meta property="og:type" content="article" />

        <meta
          property="og:url"
          content={`https://seankrixtechnologies.com/blogs/${blog.slug}`}
        />

        <meta
          property="og:title"
          content={blog.title}
        />

        <meta
          property="og:description"
          content={blog.content.slice(0, 150)}
        />

        <meta
          property="og:image"
          content={blog.image}
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={blog.title}
        />

        <meta
          name="twitter:description"
          content={blog.content.slice(0, 150)}
        />

        <meta
          name="twitter:image"
          content={blog.image}
        />

        <link
          rel="canonical"
          href={`https://seankrixtechnologies.com/blogs/${blog.slug}`}
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Image */}
          <div className="relative overflow-hidden rounded-[40px] mb-10">

            <Image
              src={blog.image}
              alt={blog.title}
              width={1400}
              height={700}
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-8 left-8">

              <span className="bg-[#00BFFF] text-black px-4 py-2 rounded-full text-sm font-semibold">
                {blog.category}
              </span>

              <h1 className="text-4xl md:text-6xl font-bold mt-6 max-w-4xl leading-tight">
                {blog.title}
              </h1>

              <p className="text-gray-300 mt-4">
                {blog.date}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-14">

            <div className="text-gray-300 leading-[40px] text-lg whitespace-pre-line">
              {blog.content}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}