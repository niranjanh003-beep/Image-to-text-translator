import React from 'react';
import { 
  Camera, 
  Languages, 
  Zap, 
  Shield, 
  Globe, 
  FileText, 
  Smartphone, 
  Cloud,
  CheckCircle,
  Target,
  Sparkles,
  Eye,
  RefreshCw
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Exact Text Extraction",
      description: "Advanced OCR technology that extracts text exactly as it appears in your images with 99%+ accuracy using OCR.space API",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Languages className="h-8 w-8" />,
      title: "Multi-Language Support",
      description: "Seamlessly translate between Kannada (ಕನ್ನಡ), Hindi (हिन्दी), English, and Telugu (తెలుగు) with native script support",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: "Two-Step Process",
      description: "First extract exact text from images, then translate to your preferred language for maximum accuracy and control",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast Processing",
      description: "Get text extraction in seconds and translations instantly with our optimized dual-API integration",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy & Security",
      description: "Your images are processed securely with end-to-end encryption and automatically deleted after processing",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Accessibility",
      description: "Works perfectly on any device with internet - desktop, tablet, or mobile with responsive design",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Multiple File Formats",
      description: "Support for JPG, PNG, WEBP, GIF, BMP and other popular image formats with no size restrictions",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description: "Perfect responsive design with touch-friendly interface that works flawlessly on all screen sizes",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "AI-Powered Translation",
      description: "Leveraging Google's Gemini 1.5 Flash AI model for the most accurate and contextual translations available",
      color: "from-violet-500 to-purple-500"
    }
  ];

  const accuracyFeatures = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Exact Text Extraction",
      description: "OCR.space API ensures you get exactly what's written in the image - character by character"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Same-Language Detection",
      description: "Intelligently handles when source and target languages match, preserving original text"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Script Preservation",
      description: "Maintains proper native scripts for each language with perfect formatting"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Perfect Text Extraction & Translation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how ImageTranslate combines advanced OCR technology with Google Gemini AI 
            to deliver the most accurate image text extraction and translation experience possible.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Accuracy Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Accuracy & Precision Features
            </h2>
            <p className="text-xl text-gray-600">
              Advanced dual-API system ensures perfect text extraction and contextual translations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {accuracyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-6 shadow-lg">
                  <div className="text-purple-600 mt-2">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple three-step process for perfect text extraction and translation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full w-16 h-16 mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600 leading-8">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Extract Text</h3>
              <p className="text-gray-600">
                Upload your image and our advanced OCR technology extracts the exact text as it appears - character by character with perfect accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-16 h-16 mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600 leading-8">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Select Language</h3>
              <p className="text-gray-600">
                Choose your target language from Kannada, Hindi, English, or Telugu. You can see the extracted text before translation.
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full w-16 h-16 mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600 leading-8">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Translation</h3>
              <p className="text-gray-600">
                Receive accurate, contextual translations instantly, powered by Google's advanced Gemini AI technology with native script support.
              </p>
            </div>
          </div>
        </div>

        {/* Languages Supported */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Supported Languages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Kannada', code: 'ಕನ್ನಡ', flag: '🇮🇳', desc: 'Native Kannada script support' },
              { name: 'Hindi', code: 'हिन्दी', flag: '🇮🇳', desc: 'Devanagari script support' },
              { name: 'English', code: 'English', flag: '🇺🇸', desc: 'International standard' },
              { name: 'Telugu', code: 'తెలుగు', flag: '🇮🇳', desc: 'Native Telugu script support' }
            ].map((lang, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-3xl mb-3">{lang.flag}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{lang.name}</h3>
                <p className="text-xl text-purple-600 font-medium mb-2">{lang.code}</p>
                <p className="text-sm text-gray-600">{lang.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Integration */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dual-API Integration
            </h2>
            <p className="text-xl text-gray-600">
              Combining the best of both worlds for maximum accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg w-fit mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">OCR.space API</h3>
              <p className="text-gray-600 mb-4">
                Industry-leading Optical Character Recognition for exact text extraction from images.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 99%+ accuracy for clear images</li>
                <li>• Supports multiple image formats</li>
                <li>• Handles various text orientations</li>
                <li>• Preserves exact formatting</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg w-fit mb-4">
                <Languages className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Gemini AI</h3>
              <p className="text-gray-600 mb-4">
                Advanced AI model for contextual and accurate translations between languages.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Context-aware translations</li>
                <li>• Native script preservation</li>
                <li>• Cultural nuance understanding</li>
                <li>• Same-language detection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600">
              Built with cutting-edge technology for optimal performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">OCR Engine</h3>
              <p className="text-gray-600">OCR.space API Engine 2</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Translation AI</h3>
              <p className="text-gray-600">Google Gemini 1.5 Flash</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Time</h3>
              <p className="text-gray-600">Text extraction: 2-5 seconds</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Accuracy Rate</h3>
              <p className="text-gray-600">99%+ for clear images</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Formats</h3>
              <p className="text-gray-600">JPG, PNG, WEBP, GIF, BMP</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Security</h3>
              <p className="text-gray-600">End-to-end encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;