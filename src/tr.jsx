import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Play, 
  Clock, 
  Calendar, 
  Mail, 
  MapPin, 
  Menu, 
  X,
  ExternalLink,
  Search,
  Bot,
  Zap,
  Globe2
} from 'lucide-react';

export default function TanotHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    goal: ''
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Our SEO Strategist will review your site and contact you within 24 hours.');
  };

  const clientLogos = [
    { name: "Enhancv", tag: "Resume Builder" },
    { name: "LearnTastic", tag: "EdTech" },
    { name: "Kommo", tag: "CRM SaaS" },
    { name: "SendPulse", tag: "Marketing Automation" },
    { name: "EngageBay", tag: "All-in-One CRM" },
    { name: "FreshLearn", tag: "Course Platform" },
    { name: "StationX", tag: "Cybersecurity" },
    { name: "LeadSync", tag: "Lead Gen" },
    { name: "Smoothstack", tag: "Tech Talent" },
    { name: "Gravyty", tag: "Fundraising AI" },
    { name: "BeamJobs", tag: "Career Tech" },
    { name: "TraceFuse", tag: "Reputation" },
    { name: "Movinnza", tag: "Digital Agency" },
    { name: "AHCA", tag: "Healthcare" },
    { name: "Flux Engine", tag: "Enterprise Dev" },
    { name: "Ultahost", tag: "Next-Gen Cloud" }
  ];

  const faqs = [
    {
      q: "How will working with Tanot Solutions help grow my business?",
      a: "We focus on what actually moves your business forward: qualified traffic, high-intent leads, and revenue, not just vanity keywords. From technical SEO and AI search optimization (GEO) to high-authority link acquisition, every sprint is engineered to outrank competitors and capture buyers looking for your solutions."
    },
    {
      q: "Are your link building services safe and Google-friendly?",
      a: "100% white-hat and manual. We strictly avoid PBNs, automated spam links, or link farms. Every backlink is earned through manual editorial outreach, contextual relevance, and relationships with established industry publishers with real organic traffic (DR 50-90+)."
    },
    {
      q: "How long does SEO take to show measurable results?",
      a: "Most clients begin witnessing initial indexation jumps and targeted keyword movement within 60 to 90 days. For highly competitive SaaS and B2B categories, significant revenue-impacting traffic compounding generally solidifies between months 4 to 6."
    },
    {
      q: "Do you offer complete SEO services or only link building?",
      a: "We provide full end-to-end organic growth suites: Technical Site Audits, On-Page Architecture, AI Search / LLM Engine Optimization (ChatGPT & Perplexity citations), Content Strategy, as well as standalone high-impact Link Building campaigns."
    },
    {
      q: "Will I have complete visibility into the work being done?",
      a: "Yes. You get 24/7 access to a dedicated live client dashboard, bi-weekly progress updates, transparent backlink placement reports, and monthly executive calls tracking organic revenue attribution."
    },
    {
      q: "Do you work with agencies on a white-label basis?",
      a: "Yes. Many digital marketing, PR, and web design agencies leverage Tanot Solutions as their white-label SEO execution partner with custom-branded reporting and NDA protection."
    }
  ];

  const blogPosts = [
    {
      category: "GEO & AI SEARCH",
      title: "11 Best GEO Agencies Helping B2B Brands Win AI Search",
      readTime: "7 min read",
      date: "October 16, 2026",
      author: "Renu Sharma",
      color: "from-blue-600 to-indigo-600",
      description: "How generative search engines (Perplexity, ChatGPT Search, Gemini) cite sources and how to position your SaaS."
    },
    {
      category: "LINK BUILDING",
      title: "Link Building For Startups: How To Get Quality Backlinks On A Budget",
      readTime: "5 min read",
      date: "October 8, 2026",
      author: "Renu Sharma",
      color: "from-emerald-600 to-teal-600",
      description: "A battle-tested playbook for bootstrapped and early-stage companies to secure DR60+ tier 1 backlinks."
    },
    {
      category: "SEARCH ENGINE OPTIMIZATION",
      title: "13 White Hat SEO Techniques: How To Rank Higher On Google & AI Search",
      readTime: "9 min read",
      date: "October 2, 2026",
      author: "Renu Sharma",
      color: "from-sky-600 to-cyan-600",
      description: "Actionable technical optimization and entity mapping strategies that keep you ahead of algorithm updates."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased selection:bg-sky-500 selection:text-white font-sans">
      
      {/* ── TOP NOTIFICATION TICKER ── */}
      <div className="bg-slate-900 text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ⚡ New Standard
            </span>
            <span>Optimizing for Google AI Overviews, ChatGPT Search & Perplexity Engine</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> 100% White-Hat Only</span>
            <span className="text-slate-600">•</span>
            <a href="mailto:info@tanotsolutions.com" className="hover:text-white transition-colors">info@tanotsolutions.com</a>
          </div>
        </div>
      </div>

      {/* ── STICKY GLASS HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                  Tanot<span className="text-sky-600">Solutions</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-0.5">
                  SEO & AI Growth Lab
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#case-studies" className="hover:text-sky-600 transition-colors">Case Studies</a>
              <a href="#reviews" className="hover:text-sky-600 transition-colors">Client Reviews</a>
              <div className="relative group cursor-pointer py-2 flex items-center gap-1 hover:text-sky-600 transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
              </div>
              <div className="relative group cursor-pointer py-2 flex items-center gap-1 hover:text-sky-600 transition-colors">
                <span>Company</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
              </div>
              <a href="#insights" className="hover:text-sky-600 transition-colors">Blog & Insights</a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="#audit-form"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all bg-slate-950 rounded-xl hover:bg-sky-600 shadow-md shadow-slate-950/10 hover:shadow-sky-600/25 active:scale-[0.98]"
              >
                Book a Free Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <a href="#case-studies" className="block py-2 text-slate-700 font-medium">Case Studies</a>
            <a href="#reviews" className="block py-2 text-slate-700 font-medium">Reviews</a>
            <a href="#services" className="block py-2 text-slate-700 font-medium">Services</a>
            <a href="#insights" className="block py-2 text-slate-700 font-medium">Insights</a>
            <a 
              href="#audit-form" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-600/20"
            >
              Book a Strategy Call
            </a>
          </div>
        )}
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1500px] h-[600px] pointer-events-none -z-10 opacity-40">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-sky-300 rounded-full blur-3xl mix-blend-multiply" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-200 rounded-full blur-3xl mix-blend-multiply" />
        </div>

        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-sky-100 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-700 to-teal-700 bg-clip-text text-transparent">
                  Next-Gen Organic Growth: Search + LLMs
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Best SEO Services <span className="relative inline-block text-white px-3 py-0.5 rounded-lg bg-sky-600 shadow-sm">for</span> <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 bg-clip-text text-transparent">
                  Google, AI Search, and Revenue Growth
                </span>
              </h1>

              {/* Descriptive Value Prop */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Tanot Solutions helps your business rank higher on Google and get cited by AI tools like 
                <strong className="text-slate-800 font-semibold"> ChatGPT, Perplexity, and Google AI Overviews</strong>. 
                From technical architecture and content marketing to high-authority manual link building and local SEO, we turn search into your most profitable revenue channel.
              </p>

              {/* CTAs & Social Proof */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#audit-form"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-500 shadow-xl shadow-sky-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="w-5 h-5 ml-2.5" />
                </a>

                <a
                  href="#reviews"
                  className="inline-flex items-center justify-center px-7 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all text-center"
                >
                  See Client Results
                </a>
              </div>

              {/* Clutch Review Badge */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-200/80">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Reviewed On</div>
                    <div className="text-sm font-black text-slate-900">Clutch</div>
                  </div>
                  <div className="h-7 w-[1px] bg-slate-200" />
                  <div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs font-bold text-slate-700">5.0 RATING</div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-tight">
                  <span className="font-bold text-slate-800">150+ Happy Brands</span><br />
                  Zero long-term lock-ins • Month-to-month flexibility
                </div>
              </div>
            </div>

            {/* Right Card: High-Converting Audit Form (5 Cols) */}
            <div id="audit-form" className="lg:col-span-5">
              <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-200/60 border border-slate-200/80">
                
                {/* Form Top Decorator */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Get Your Free SEO Strategy</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Tell us about your goals and we'll audit where your organic revenue is leaking.
                    </p>
                  </div>
                  <span className="p-2 rounded-lg bg-sky-50 text-sky-600">
                    <Sparkles className="w-5 h-5" />
                  </span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@yourcompany.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="https://yourbrand.com"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">What is your primary growth bottleneck? *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="E.g., Need tier-1 backlinks, recovering from updates, ranking in ChatGPT search..."
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Claim Free SEO & AI Growth Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    🔒 100% Confidential. No obligation. Direct strategy from a Senior SEO Consultant.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      <section className="bg-slate-900 py-10 border-y border-slate-800 text-white">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-white">150+</div>
                <div className="text-xs text-slate-400 font-medium">Global Clients Served</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-white">98%</div>
                <div className="text-xs text-slate-400 font-medium">Client Satisfaction Score</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-white">11+</div>
                <div className="text-xs text-slate-400 font-medium">Years of SEO Experience</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-white">02+ Yrs</div>
                <div className="text-xs text-slate-400 font-medium">Average Client Retention</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CLIENT LOGO CLOUD ── */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Trusted By 150+ High-Growth Brands Across SaaS, Healthcare, Marketing, B2B & Enterprise
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center">
            {clientLogos.map((client, idx) => (
              <div 
                key={idx} 
                className="group p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col items-center justify-center h-20"
              >
                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 group-hover:scale-105 transition">
                  {client.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {client.tag}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-6 font-medium italic">
            ...and many more fast-scaling tech companies worldwide.
          </p>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIAL & CASE STUDY SHOWCASE ── */}
      <section id="reviews" className="py-20 lg:py-24 bg-slate-50">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <span className="text-sky-600 font-bold text-xs uppercase tracking-widest">Proven Client Success</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Reviews From Businesses We've Helped Grow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Don't just take our word for it. Here's what founders and marketing leaders say about partnering with Tanot Solutions.
            </p>
          </div>

          {/* Testimonial Box */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Video Player Column (7 cols) */}
            <div className="lg:col-span-7 relative bg-slate-900 aspect-video lg:aspect-auto min-h-[340px] flex items-center justify-center group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80" 
                alt="Client Video Testimonial Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {!isVideoPlaying ? (
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="relative z-10 w-20 h-20 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-2xl shadow-sky-600/50 group-hover:scale-110 transition-transform active:scale-95"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              ) : (
                <div className="relative z-10 text-white text-center p-6">
                  <div className="animate-spin w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="text-sm font-semibold">Connecting to secure stream...</p>
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-white text-xs">
                <span className="font-semibold bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                  ▶ Video Testimonial (1:45)
                </span>
                <span className="text-slate-300">Verified Client Story</span>
              </div>
            </div>

            {/* Quote & Results Column (5 cols) */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <blockquote className="text-slate-800 text-lg lg:text-xl font-medium leading-relaxed">
                  "After we started link building with Tanot Solutions, they helped our CRM's high-converting product page rank higher with an impressive <mark className="bg-sky-100 text-sky-900 font-bold px-1 rounded">80% increase in traffic</mark> and an equally exceptional <mark className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded">80% increase in sign-ups</mark> every single day."
                </blockquote>
              </div>

              {/* Verified Metrics Card */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Organic Traffic</span>
                  <span className="text-2xl font-black text-sky-600">+80% Surge</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Daily Sign-ups</span>
                  <span className="text-2xl font-black text-emerald-600">+80% Growth</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">Sandeep Das</h4>
                <p className="text-xs font-semibold text-slate-500">Marketing Manager • Kommo CRM SaaS</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Prompt Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Frequently Asked Questions</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Questions to ask before hiring an SEO agency
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Can't find your answer? We're happy to walk you through our exact backlink methodology and roadmap on a quick discovery call.
              </p>

              {/* Mini CTA Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4">
                <h4 className="font-bold text-base text-white">Still deciding?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Get a free, no-obligation audit showing your website's current search footprint and a step-by-step roadmap to 2X your qualified leads.
                </p>
                <a 
                  href="#audit-form"
                  className="inline-flex items-center justify-center w-full py-3 px-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-sky-500/25"
                >
                  Claim Your Free SEO Growth Plan
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
            </div>

            {/* Right Accordion Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl border transition-all ${isOpen ? 'border-sky-300 bg-sky-50/30 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-sky-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-sky-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── LATEST INSIGHTS & BLOG ── */}
      <section id="insights" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Thought Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Latest SEO & Link Building Insights
              </h2>
            </div>
            <a href="#" className="hidden md:inline-flex items-center text-sm font-bold text-sky-600 hover:text-sky-700">
              View All Articles <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <article 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Decorative Header Art */}
                  <div className={`h-48 bg-gradient-to-tr ${post.color} p-6 flex flex-col justify-between relative overflow-hidden`}>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md self-start">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-sky-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <a href="#" className="inline-flex items-center text-sm font-bold text-sky-600">
              View All Articles <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>

        </div>
      </section>

      {/* ── 30-DAY TRIAL RISK-REVERSAL BANNER ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-teal-500 p-8 sm:p-12 lg:p-14 text-white shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Guaranteed Satisfaction
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Try Our SEO and Link Building Service for 30 Days – Then Choose to Stay
              </h2>
              <p className="text-sky-100 text-sm sm:text-base mt-3 leading-relaxed">
                We believe in earning your business every single month. Experience our transparent execution, high-impact outreach, and tactical speed firsthand.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="#audit-form"
                className="w-full sm:w-auto px-8 py-4 bg-slate-950 text-white font-bold rounded-xl text-center text-sm shadow-xl hover:bg-slate-900 transition active:scale-95"
              >
                Book a Call
              </a>
              <a
                href="mailto:info@tanotsolutions.com"
                className="w-full sm:w-auto px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-xl text-center text-sm transition active:scale-95 border border-white/30"
              >
                Contact Us
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── ENTERPRISE FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 text-sm pt-16 pb-12 border-t border-slate-900">
        <div className="max-w-[1300px] 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
            
            {/* Col 1: Bio (2 cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-black">
                  T
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  Tanot<span className="text-sky-400">Solutions</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                We are an SEO and link-building agency that helps global brands 5X their ROI through strategic SEO, AI Search Optimization, and high-quality backlink strategies.
              </p>
              
              <div className="pt-2 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-white">Sales & Strategic Inquiries:</div>
                <a href="mailto:info@tanotsolutions.com" className="text-sky-400 hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> info@tanotsolutions.com
                </a>
              </div>
            </div>

            {/* Col 2: Company */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#insights" className="hover:text-white transition">Blog</a></li>
                <li><a href="#case-studies" className="hover:text-white transition">Case Studies</a></li>
                <li><a href="#reviews" className="hover:text-white transition">Client Reviews</a></li>
                <li><a href="#audit-form" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Services</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-white transition">High-Authority Link Building</a></li>
                <li><a href="#" className="hover:text-white transition">AI Search & GEO Optimization</a></li>
                <li><a href="#" className="hover:text-white transition">SaaS SEO Strategy</a></li>
                <li><a href="#" className="hover:text-white transition">Technical Site Audits</a></li>
                <li><a href="#" className="hover:text-white transition">Content Marketing Engine</a></li>
                <li><a href="#" className="hover:text-white transition">White Label Agency SEO</a></li>
              </ul>
            </div>

            {/* Col 4: Resources */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Resources</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-white transition">How to Choose an Agency</a></li>
                <li><a href="#" className="hover:text-white transition">Link Building Tools 2026</a></li>
                <li><a href="#" className="hover:text-white transition">Contextual Backlink Secrets</a></li>
                <li><a href="#" className="hover:text-white transition">Free Backlinks Playbook</a></li>
                <li><a href="#" className="hover:text-white transition">Safe Link Buying Guide</a></li>
                <li><a href="#" className="hover:text-white transition">SaaS Growth Benchmarks</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Location */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 Tanot Solutions. All rights reserved.
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Headquartered in Jodhpur, Rajasthan, India • Serving Clients Worldwide</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}