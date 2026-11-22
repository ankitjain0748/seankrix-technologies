import Layout from "@/Components/Layout";
import Head from "next/head";
import Link from "next/link";

const techStack = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "REST APIs",
  "Tailwind CSS",
  "Cloud Deployment",
  "SEO Architecture",
];

const featuredProjects = [
  {
    title: "CadmaxPro",
    category: "Real Estate Platform",
    description:
      "A modern real estate platform showcasing property listings, upcoming projects, services, and career opportunities with a scalable MERN architecture.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "StackEarn",
    category: "EdTech & Referral Platform",
    description:
      "Complete EdTech ecosystem where instructors sell courses, students learn online, and users earn via referrals with Razorpay & admin dashboard.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay"],
  },
  {
    title: "Cadmax Atelier",
    category: "eCommerce & Vendor Booking",
    description:
      "Full-stack MERN & Next.js platform supporting products, services, vendor listings, secure payments, order tracking, and complete admin control.",
    stack: ["Next.js", "React.js", "Node.js", "MongoDB", "Razorpay"],
  },
];

const expertiseAreas = [
  {
    title: "Full-Stack MERN Engineering",
    detail:
      "Building fast, secure, and scalable web apps from database schema design to responsive frontend interfaces.",
  },
  {
    title: "Enterprise CRM & ERP Systems",
    detail:
      "Custom internal software, workflow automation, and role-based dashboards tailored for startups and growing businesses.",
  },
  {
    title: "SEO-First Web Architecture",
    detail:
      "Next.js server-side rendering, clean URLs, and performance optimization designed to rank and convert.",
  },
  {
    title: "Cloud & Production Deployment",
    detail:
      "Reliable API architecture, database management, payment integrations, and end-to-end production hosting.",
  },
];

export default function AnkitJainPage() {
  return (
    <>
      <Head>
        <title>Ankit Kumar Jain | Founder & Full Stack MERN Developer - Seankrix Technologies</title>
        <meta
          name="description"
          content="Meet Ankit Kumar Jain, Founder of Seankrix Technologies and Full Stack MERN Developer with 3+ years of experience building scalable web apps, CRM, ERP & eCommerce platforms."
        />
      </Head>
<Layout>

      <main className="min-h-screen bg-slate-950 text-slate-100 mt-[40px]">
        {/* Top Breadcrumb Navigation */}
        <div className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-cyan-400 transition">
                Home
              </Link>
              <span>/</span>
              <Link href="/about-us" className="hover:text-cyan-400 transition">
                Leadership
              </Link>
              <span>/</span>
              <span className="text-slate-100 font-medium">Ankit Kumar Jain</span>
            </div>

            <Link
              href="/sejal-jain"
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition"
            >
              Meet Co-Founder →
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800/80">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Founder • Seankrix Technologies
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ankit Kumar Jain
              </h1>
              <p className="mt-2 text-lg font-medium text-cyan-400">
                Full Stack MERN Developer &amp; Software Architect
              </p>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                Ankit Kumar Jain is the Founder of{" "}
                <span className="font-semibold text-white">Seankrix Technologies</span>{" "}
                and a passionate Full Stack MERN Developer with{" "}
                <span className="font-semibold text-white">3+ years of professional experience</span>{" "}
                in modern web development. He specializes in building high-performance,
                secure, and user-friendly digital products that create measurable business value.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://ankit-jain-mern-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition"
                >
                  Visit Live MERN Portfolio ↗
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:border-cyan-400 transition"
                >
                  Start a Project with Us
                </Link>
              </div>
            </div>

            {/* Profile Card / Quick Highlights */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
                {/* Replace initials box with <img> when adding your photo */}
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white">
                    AJ
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Ankit Kumar Jain</h2>
                    <p className="text-sm text-cyan-400">Founder &amp; Lead Developer</p>
                    <p className="mt-1 text-xs text-slate-400">Jaipur, Rajasthan, India</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-2xl font-bold text-white">3+ Years</p>
                    <p className="mt-1 text-xs text-slate-400">MERN Stack Experience</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-2xl font-bold text-white">50+</p>
                    <p className="mt-1 text-xs text-slate-400">Positive Client Reviews</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-lg font-bold text-cyan-400">CRM / ERP</p>
                    <p className="mt-1 text-xs text-slate-400">Custom Business Systems</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-lg font-bold text-cyan-400">Next.js</p>
                    <p className="mt-1 text-xs text-slate-400">SEO &amp; Speed Focused</p>
                  </div>
                </div>

                {/* Social / Portfolio Links */}
                <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-5 text-xs">
                  <a
                    href="https://ankit-jain-mern-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-800 px-3 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
                  >
                    Portfolio Website
                  </a>
                  <a
                    href="mailto:info@seankrixtechnologies.com"
                    className="rounded-lg bg-slate-800 px-3 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
                  >
                    Email
                  </a>
                  {/* Add your GitHub & LinkedIn links below */}
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-800 px-3 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-800 px-3 py-2 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & About Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              About Founder &amp; Technical Vision
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              Throughout his career, Ankit has successfully delivered business websites,
              enterprise web applications, CRM systems, ERP solutions, eCommerce platforms,
              and custom software for startups and growing enterprises. At Seankrix Technologies,
              he leads technical architecture so every client product is fast, secure, and built
              for long-term growth.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {expertiseAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-cyan-500/40 transition"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="border-y border-slate-800/80 bg-slate-900/30">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold text-white">Core Technology Stack</h2>
            <p className="mt-2 text-sm text-slate-400">
              Technologies used to architect scalable digital solutions at Seankrix Technologies
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Projects Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Featured Portfolio Work
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Selected full-stack platforms engineered under Ankit&apos;s leadership
              </p>
            </div>
            <a
              href="https://ankit-jain-mern-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-cyan-400 hover:underline"
            >
              Explore Full MERN Portfolio ↗
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-500/40 transition"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Link to Co-Founder Page */}
        <section className="border-t border-slate-800/80 bg-gradient-to-r from-slate-900 to-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Leadership Team
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Meet Our Co-Founder — Sejal Jain
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Learn how Sejal drives operations, client relationships, and timely project delivery.
              </p>
            </div>
            <Link
              href="/sejal-jain"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition"
            >
              View Sejal Jain&apos;s Profile →
            </Link>
          </div>
        </section>
      </main>
</Layout>
    </>
  );
}