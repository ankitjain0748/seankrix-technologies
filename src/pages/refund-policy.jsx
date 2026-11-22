
import Layout from "@/Components/Layout";
import Head from "next/head";

export default function RefundPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      content: `At Seankrix Technologies, we are committed to providing high-quality digital services and ensuring customer satisfaction. This Refund Policy explains the terms and conditions regarding cancellations and refunds for services purchased through our website or directly from our company.`
    },
    {
      title: "2. Refund Eligibility",
      content: `Refund requests may be considered under the following circumstances:

• If Seankrix Technologies is unable to start or deliver the agreed project due to reasons within our control.
• If a payment has been made twice for the same service.
• If an incorrect amount has been charged due to a technical or payment processing error.

All refund requests will be reviewed individually and are subject to the terms of the agreed project proposal or service agreement.`
    },
    {
      title: "3. Non-Refundable Services",
      content: `Refunds will generally not be provided in the following situations:

• Once work on the project has started or significant development work has been completed.
• For completed services, delivered websites, software, or digital products.
• For domain registration, hosting, third-party subscriptions, licenses, or other external services purchased on the customer's behalf.
• For delays caused by the customer's failure to provide required content, approvals, or information.
• If the customer changes their mind after approving the project scope or making payment.

Any exceptions will be considered at the sole discretion of Seankrix Technologies.`
    },
    {
      title: "4. Cancellation Policy",
      content: `Customers may request cancellation of a project by contacting us through our official email address.

If the project has not been started, a refund may be considered after deducting any applicable payment gateway charges or administrative costs.

If development or other project work has already started, the refundable amount, if any, will be determined based on the work completed, resources utilized, and the terms of the service agreement.`
    },
    {
      title: "5. Refund Processing",
      content: `Once a refund request is approved, the refund will generally be initiated within 7–10 business days.

The actual time taken for the amount to reflect in your account may depend on your bank, payment gateway, or payment provider.

Refunds will normally be processed through the original payment method wherever possible.`
    },
    {
      title: "6. Project Delays & Disputes",
      content: `We make reasonable efforts to deliver projects within the agreed timelines. However, delays may occur due to technical issues, changes in project requirements, third-party dependencies, or delays in receiving information and approvals from customers.

Customers are encouraged to contact us to resolve any concerns before initiating a payment dispute or chargeback.`
    },
    {
      title: "7. Changes to This Policy",
      content: `Seankrix Technologies reserves the right to update or modify this Refund Policy at any time without prior notice. Any changes will be published on this page with the updated effective date.`
    },
    {
      title: "8. Contact Us",
      content: `If you have any questions or would like to request a refund, please contact us:

Company: Seankrix Technologies
Email: info@seankrixtechnologies.com
Phone: +91 88247 44976
Website: www.seankrixtechnologies.com`
    }
  ];

  return (
    <>
      <Head>
        <title>Refund Policy | Seankrix Technologies</title>
        <meta
          name="description"
          content="Read the Refund Policy of Seankrix Technologies to understand our refund eligibility, cancellation terms, and refund processing procedures."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.seankrixtechnologies.com/refund-policy"
        />
      </Head>

     <Layout>
         <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#071426] text-white py-20 px-5">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#00BFFF] uppercase tracking-[3px] text-sm font-semibold mb-4">
              Legal Information
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Refund Policy
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto leading-7">
              Transparency and customer satisfaction are important to us.
              Please review our refund and cancellation terms.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 border-l-4 border-[#00BFFF] pl-5">
              <p className="text-gray-500 text-sm">
                Effective Date: November 22, 2026
              </p>
              <p className="text-gray-600 mt-3 leading-7">
                Please read this policy carefully before purchasing any
                products or services from Seankrix Technologies.
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <article key={index}>
                  <h2 className="text-xl md:text-2xl font-bold text-[#071426] mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-8 whitespace-pre-line">
                    {section.content}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-14 bg-[#F0F9FF] border border-[#D6F0FF] rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#071426] mb-2">
                Need Assistance?
              </h3>
              <p className="text-gray-600 mb-4">
                Our team is here to help you with any refund-related queries.
              </p>
              <a
                href="mailto:info@seankrixtechnologies.com"
                className="inline-block bg-[#00BFFF] hover:bg-[#009ACD] text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
     </Layout>
    </>
  );
}
