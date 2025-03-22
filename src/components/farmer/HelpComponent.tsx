import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import React, { useState } from 'react'

const FaqComponent = () => {

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I collect a soil sample?",
      answer: "To collect a soil sample: 1. Clean the area of surface debris 2. Dig 6 inches deep 3. Take samples from multiple spots in your field 4. Mix the samples thoroughly 5. Package 500g of soil in a clean bag"
    },
    {
      question: "When is the best time to test soil?",
      answer: "The best time to test soil is before planting or after harvesting. Avoid collecting samples when the soil is too wet or immediately after applying fertilizers."
    },
    {
      question: "How often should I test my soil?",
      answer: "We recommend testing your soil once every 2-3 years. However, if you're trying new crops or experiencing problems, you may want to test more frequently."
    },
    {
      question: "How long does it take to get soil test results?",
      answer: "Soil test results are typically available within 5-7 working days after the laboratory receives your sample."
    },
    {
      question: "What does the soil test report include?",
      answer: "The soil test report includes pH levels, organic matter content, available nutrients (N, P, K), and recommendations for fertilizer application based on your crop type."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h1>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FaqComponent
