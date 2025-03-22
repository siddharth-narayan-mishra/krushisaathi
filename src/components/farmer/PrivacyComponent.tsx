import React from 'react'

const PrivacyComponent = () => {
  return (

    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Privacy Policy</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 space-y-6">
                <section>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Information We Collect</h2>
                  <p className="text-gray-600 mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Name and contact information</li>
                    <li>Farm location and size</li>
                    <li>Soil sample data</li>
                    <li>Crop information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Provide soil testing services</li>
                    <li>Generate personalized recommendations</li>
                    <li>Improve our services</li>
                    <li>Contact you about your samples</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Data Security</h2>
                  <p className="text-gray-600">
                    We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely on our servers. We regularly review and update our security practices to ensure the safety of your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Your Rights</h2>
                  <p className="text-gray-600 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-600">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4">
                    <p className="text-gray-600">Email: privacy@farmhelp.com</p>
                    <p className="text-gray-600">Phone: 1800-123-4567</p>
                  </div>
                </section>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-500">
                    Last updated: March 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PrivacyComponent
