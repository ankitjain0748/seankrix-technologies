import Layout from "@/Components/Layout";

function Index() {
    return (
        <Layout>

            <section className="max-w-5xl mx-auto px-6 py-20 text-white">
                <h1 className="text-4xl font-bold mb-8">
                    Terms & <span className="text-[#00BFFF]">Conditions</span>
                </h1>

                <div className="space-y-8 text-gray-300 leading-8">

                    <p>
                        By accessing and using the services of Seankrix Technologies, you agree
                        to comply with the following terms and conditions.
                    </p>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Services
                        </h2>

                        <p>
                            We provide web development, software development, UI/UX design,
                            digital solutions, and related IT services based on project
                            requirements agreed upon with clients.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Payments
                        </h2>

                        <p>
                            Clients are required to complete payments according to the agreed
                            project milestones or invoices. Delayed payments may affect project
                            timelines.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Intellectual Property
                        </h2>

                        <p>
                            All designs, code, and content created by Seankrix Technologies remain
                            our intellectual property until full payment is received.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Limitation of Liability
                        </h2>

                        <p>
                            We are not liable for any direct or indirect damages resulting from
                            the use or inability to use our services or website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Changes to Terms
                        </h2>

                        <p>
                            We reserve the right to modify these terms at any time without prior
                            notice. Continued use of our website and services indicates acceptance
                            of updated terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Contact Information
                        </h2>

                        <p>
                            For any questions regarding these Terms & Conditions, contact us:
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