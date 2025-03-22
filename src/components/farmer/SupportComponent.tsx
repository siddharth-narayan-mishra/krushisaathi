import { Clock, Mail, MessageSquare, Phone } from 'lucide-react'
import React from 'react'

const SupportComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Help & Support</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Phone className="w-8 h-8 text-green-600 mb-4" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">Phone Support</h2>
                <p className="text-gray-600 mb-4">Available Monday to Saturday, 9 AM to 6 PM</p>
                <a href="tel:1800-123-4567" className="text-green-600 font-medium hover:text-green-700">
                  1800-123-4567
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Mail className="w-8 h-8 text-green-600 mb-4" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">Email Support</h2>
                <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
                <a href="mailto:support@farmhelp.com" className="text-green-600 font-medium hover:text-green-700">
                  support@farmhelp.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Support</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Common Issues</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MessageSquare className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">How to submit a soil sample?</h3>
                    <p className="text-gray-600">Follow our step-by-step guide in the soil testing section.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">When will I get my results?</h3>
                    <p className="text-gray-600">Results are typically available within 5-7 working days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>)
}

export default SupportComponent
