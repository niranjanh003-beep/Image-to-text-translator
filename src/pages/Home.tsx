import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Languages, Zap, Shield, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Images to
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Multiple Languages
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload any image with text and instantly translate it to Kannada, Hindi, English, or Telugu. 
              Powered by advanced AI technology for accurate and fast translations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scan"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Translating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ImageTranslate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of AI-driven translation with our cutting-edge features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Languages className="h-8 w-8 text-purple-600 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Language</h3>
              <p className="text-gray-600">Support for Kannada, Hindi, English, and Telugu translations</p>
            </div>
            
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Get instant translations with our optimized AI engine</p>
            </div>
            
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-teal-100 to-green-100 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-teal-600 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your images are processed securely and never stored</p>
            </div>
            
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-green-100 to-purple-100 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-green-600 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Universal Access</h3>
              <p className="text-gray-600">Works on any device, anywhere in the world</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Break Language Barriers?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of users who trust ImageTranslate for their translation needs
            </p>
            <Link
              to="/scan"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Try It Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;