import Layout from "@/Components/Layout";
import Head from "next/head";
import Link from "next/link";

const techStack = [
  "UI/UX & Web Design",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Database Architecture",
  "Git & GitHub Control",
  "REST APIs",
];

const coreExpertise = [
  {
    title: "Strong UI/UX & Frontend Designing",
    description:
      "Crafting modern, responsive, and user-friendly interfaces with strong visual hierarchy, clean layouts, and smooth user experiences using React.js, Next.js, and Tailwind CSS.",
  },
  {
    title: "Full Stack MERN & Backend Development",
    description:
      "Building complete end-to-end web applications with Node.js and Express.js — including secure authentication, RESTful APIs, server-side logic, and frontend-to-backend integration.",
  },
  {
    title: "Database Creation & Management",
    description:
      "Designing structured, scalable databases from scratch in MongoDB and MySQL, covering schema modeling, data relationships, validation, and query optimization.",
  },
  {
    title: "Git Control Manager & Team Workflow",
    description:
      "Managing version control with Git & GitHub — handling branching strategies, pull requests, code reviews, merge conflict resolution, and clean deployment pipelines.",
  },
];

const leadershipPillars = [
  {
    label: "Design + Code Balance",
    detail:
      "Blending creative UI/UX design thinking with solid MERN stack engineering for polished products.",
  },
  {
    label: "Clean Git & Code Standards",
    detail:
      "Organized repositories, structured commits, and reliable version tracking across every sprint.",
  },
  {
    label: "Client & Project Coordination",
    detail:
      "Seamless communication between clients and engineering teams for transparent, on-time delivery.",
  },
  {
    label: "End-to-End Quality",
    detail:
      "From database creation and API testing to responsive UI polish before every production launch.",
  },
];

export default function SejalJainPage() {
  return (
    <>
      <Head>
        <title>
          Sejal Jain | Co-Founder, MERN Stack Developer &amp; UI/UX Designer - Seankrix Technologies
        </title>
        <meta
          name="description"
          content="Meet Sejal Jain, Co-Founder of Seankrix Technologies. A MERN Stack Developer & UI/UX Designer with 1+ years of experience in frontend design, backend APIs, database creation, and Git version control."
        />
      </Head>

   <Layout>
       <main className="min-h-screen bg-slate-950 text-slate-100 mt-[20px]">
        {/* Top Breadcrumb Navigation */}
        <div className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-indigo-400 transition">
                Home
              </Link>
              <span>/</span>
              <Link href="/about-us" className="hover:text-indigo-400 transition">
                Leadership
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-100">Sejal Jain</span>
            </div>

            <Link
              href="/ankit-kumar-jain"
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-indigo-400 hover:text-indigo-300 transition"
            >
              Meet Founder →
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-800/80">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                Co-Founder • Seankrix Technologies
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Sejal Jain
              </h1>
              <p className="mt-2 text-lg font-medium text-indigo-400">
                Full Stack MERN Developer, UI/UX Designer &amp; Technical Operations Lead
              </p>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                Sejal Jain is the Co-Founder of{" "}
                <span className="font-semibold text-white">Seankrix Technologies</span>{" "}
                and a skilled Full Stack MERN Developer with{" "}
                <span className="font-semibold text-white">1+ years of hands-on experience</span>.
                Known for her{" "}
                <span className="font-semibold text-white">
                  strong designing skills, backend development knowledge, database creation, and Git
                  version control management
                </span>
                , she bridges creative design with reliable full-stack engineering while also
                leading client coordination and project execution.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/sejal-jain-883257377/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition"
                >
                  Connect on LinkedIn ↗
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:border-indigo-400 transition"
                >
                  Work With Our Team
                </Link>
              </div>
            </div>

            {/* Profile Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
                {/* Replace initials box with <img> when adding her photo */}
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white">
                    SJ
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Sejal Jain</h2>
                    <p className="text-sm text-indigo-400">
                      Co-Founder &amp; MERN Stack Developer
                    </p>
                    <p className="mt-1 text-xs text-slate-400">Jaipur, Rajasthan, India</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-2xl font-bold text-white">1+ Years</p>
                    <p className="mt-1 text-xs text-slate-400">MERN &amp; Design Experience</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-lg font-bold text-indigo-400">UI / UX</p>
                    <p className="mt-1 text-xs text-slate-400">Strong Design &amp; Frontend</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-lg font-bold text-indigo-400">Backend &amp; DB</p>
                    <p className="mt-1 text-xs text-slate-400">APIs &amp; Schema Creation</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/70 p-4">
                    <p className="text-lg font-bold text-indigo-400">Git Control</p>
                    <p className="mt-1 text-xs text-slate-400">Version &amp; Repo Manager</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-5 text-xs">
                  <a
                    href="https://www.linkedin.com/in/sejal-jain-883257377/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-indigo-500/20 px-3 py-2 font-medium text-indigo-300 hover:bg-indigo-500/30 transition"
                  >
                    LinkedIn Profile ↗
                  </a>
                  <a
                    href="mailto:info@seankrixtechnologies.com"
                    className="rounded-lg bg-slate-800 px-3 py-2 text-slate-200 hover:bg-indigo-500/20 hover:text-indigo-300 transition"
                  >
                    Email Seankrix
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical & Design Expertise Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Technical Expertise, Designing &amp; Engineering Role
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              At Seankrix Technologies, Sejal contributes across the full product lifecycle — from
              designing intuitive user interfaces to developing backend APIs, structuring databases,
              and managing Git workflows so every project stays clean, scalable, and production-ready.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreExpertise.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-indigo-500/40 transition"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="border-y border-slate-800/80 bg-slate-900/30">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold text-white">Skills &amp; Tech Stack</h2>
            <p className="mt-2 text-sm text-slate-400">
              Full-stack development, UI/UX designing, database modeling, and Git workflow tools
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {techStack.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-indigo-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership & Delivery Standards */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-white">
            Co-Founder Leadership &amp; Delivery Standards
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Combining design excellence, clean code management, and smooth client coordination
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadershipPillars.map((pillar) => (
              <div
                key={pillar.label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <h3 className="text-base font-semibold text-indigo-300">{pillar.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Link to Founder Page */}
        <section className="border-t border-slate-800/80 bg-gradient-to-r from-slate-900 to-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Leadership Team
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Meet Our Founder — Ankit Kumar Jain
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Explore Ankit&apos;s MERN stack portfolio, technical expertise, and featured builds.
              </p>
            </div>
            <Link
              href="/ankit-kumar-jain"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-indigo-300 transition"
            >
              View Ankit&apos;s Portfolio Page →
            </Link>
          </div>
        </section>
      </main>
   </Layout>
    </>
  );
}