import Layout from "@/Components/Layout";

function Index() {
    return ( 
        <Layout>

            <section className="max-w-5xl mx-auto px-6 py-20 text-white">
  <h1 className="text-4xl font-bold mb-8">
    Privacy <span className="text-[#00BFFF]">Policy</span>
  </h1>

  <div className="space-y-8 text-gray-300 leading-8">

    <p>
      At Seankrix Technologies, we value your privacy and are committed to
      protecting your personal information. This Privacy Policy explains how
      we collect, use, and safeguard your information when you visit our
      website or use our services.
    </p>

    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        Information We Collect
      </h2>

      <p>
        We may collect personal information such as your name, email address,
        phone number, company details, and project requirements when you
        contact us or fill out forms on our website.
      </p>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        How We Use Your Information
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>To provide IT and web development services</li>
        <li>To improve our website and customer experience</li>
        <li>To communicate regarding projects and support</li>
        <li>To send updates, offers, or service information</li>
      </ul>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        Data Protection
      </h2>

      <p>
        We implement industry-standard security measures to protect your data
        from unauthorized access, misuse, or disclosure.
      </p>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        Third-Party Services
      </h2>

      <p>
        Our website may use third-party tools and services such as analytics,
        hosting providers, and communication platforms. These services may
        collect information according to their own privacy policies.
      </p>
    </div>

    <div>
      <h2 className="text-2xl font-semibold text-white mb-3">
        Contact Us
      </h2>

      <p>
        If you have any questions regarding this Privacy Policy, you may
        contact us at:
      </p>

      <p className="mt-3">
        Email: info@seankrixtechnologies.com
        <br />
        Phone: +91 88247 44976
      </p>
    </div>

  </div>
</section>
        </Layout>
     );
}

export default Index;