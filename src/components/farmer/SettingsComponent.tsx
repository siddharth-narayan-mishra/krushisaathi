import { Bell, Globe, Lock, Moon, Sun, UserCog } from 'lucide-react';
import React, { useState } from 'react'

const SettingsComponent = () => {

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("english");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <UserCog className="w-6 h-6 text-green-600" />
                    <h2 className="text-lg font-medium text-gray-900">Account Preferences</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Language</p>
                          <p className="text-sm text-gray-500">Select your preferred language</p>
                        </div>
                      </div>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="punjabi">Punjabi</option>
                        <option value="gujarati">Gujarati</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {darkMode ? (
                          <Moon className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Sun className="w-5 h-5 text-gray-600" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">Dark Mode</p>
                          <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${darkMode ? "bg-green-600" : "bg-gray-200"
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${darkMode ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Bell className="w-6 h-6 text-green-600" />
                    <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about your soil samples</p>
                      </div>
                      <button
                        onClick={() => setNotifications(!notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${notifications ? "bg-green-600" : "bg-gray-200"
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${notifications ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Lock className="w-6 h-6 text-green-600" />
                    <h2 className="text-lg font-medium text-gray-900">Security</h2>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                      <span className="font-medium text-gray-900">Change Password</span>
                      <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                      <span className="font-medium text-gray-900">Two-Factor Authentication</span>
                      <span className="text-gray-400">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SettingsComponent
