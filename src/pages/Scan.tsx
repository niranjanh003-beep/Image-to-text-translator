import React, { useState, useRef } from 'react';
import { Upload, Camera, Languages, Loader2, AlertCircle, CheckCircle, Copy, Eye } from 'lucide-react';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'kannada', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
    { code: 'telugu', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setExtractedText('');
        setTranslatedText('');
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setExtractedText('');
        setTranslatedText('');
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const extractTextFromImage = async () => {
    if (!selectedImage) return;

    setIsExtracting(true);
    setError('');
    setExtractedText('');

    try {
      // Convert base64 to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // Create FormData for OCR API
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');
      formData.append('apikey', 'K88864393188957'); // Add your API here
      formData.append('language', 'eng'); // OCR.space supports multiple languages
      formData.append('isOverlayRequired', 'false');
      formData.append('detectOrientation', 'true');
      formData.append('scale', 'true');
      formData.append('OCREngine', '2'); // Use OCR Engine 2 for better accuracy

      const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData
      });

      if (!ocrResponse.ok) {
        throw new Error(`OCR API Error: ${ocrResponse.status}`);
      }

      const ocrData = await ocrResponse.json();
      
      if (ocrData.IsErroredOnProcessing) {
        throw new Error(ocrData.ErrorMessage || 'OCR processing failed');
      }

      if (ocrData.ParsedResults && ocrData.ParsedResults.length > 0) {
        const extractedContent = ocrData.ParsedResults[0].ParsedText.trim();
        if (extractedContent) {
          setExtractedText(extractedContent);
        } else {
          throw new Error('No text found in the image');
        }
      } else {
        throw new Error('No text could be extracted from the image');
      }
    } catch (err) {
      console.error('Text extraction error:', err);
      setError(err instanceof Error ? err.message : 'Text extraction failed. Please try again with a clearer image.');
    } finally {
      setIsExtracting(false);
    }
  };

  const getTranslationPrompt = (text: string, targetLanguage: string) => {
    const prompts = {
      english: `Translate the following text to English. If the text is already in English, return it exactly as it is. Only provide the translated text without any additional explanations or formatting:\n\n${text}`,
      kannada: `Translate the following text to Kannada (ಕನ್ನಡ). If the text is already in Kannada, return it exactly as it is. Only provide the translated text in Kannada script without any additional explanations or formatting:\n\n${text}`,
      hindi: `Translate the following text to Hindi (हिन्दी). If the text is already in Hindi, return it exactly as it is. Only provide the translated text in Devanagari script without any additional explanations or formatting:\n\n${text}`,
      telugu: `Translate the following text to Telugu (తెలుగు). If the text is already in Telugu, return it exactly as it is. Only provide the translated text in Telugu script without any additional explanations or formatting:\n\n${text}`
    };
    return prompts[targetLanguage as keyof typeof prompts] || prompts.english;
  };

  const translateExtractedText = async () => {
    if (!extractedText) return;

    setIsLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const apiKey = 'AIzaSyCi5-KGYoTavwC2XY_9-dpr8nkTxuVwS-0';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [                    
          {
            parts: [
              {
                text: getTranslationPrompt(extractedText, selectedLanguage)
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(`Translation API Error: ${apiResponse.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await apiResponse.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        const translatedContent = data.candidates[0].content.parts[0].text.trim();
        if (translatedContent) {
          setTranslatedText(translatedContent);
        } else {
          throw new Error('Translation failed. Please try again.');
        }
      } else {
        throw new Error('No translation received from API. Please try again.');
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError(err instanceof Error ? err.message : 'Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  const selectedLangInfo = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Extract & Translate
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Image Text
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image to extract text with perfect accuracy, then translate it to your preferred language
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {selectedImage ? (
              <div className="space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <p className="text-gray-600">Click to upload a different image</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-16 h-16 mx-auto">
                  <Upload className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your image here, or click to browse
                  </p>
                  <p className="text-gray-600">
                    Supports JPG, PNG, WEBP and other image formats
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Extract Text Button */}
        {selectedImage && !extractedText && (
          <div className="text-center mb-8">
            <button
              onClick={extractTextFromImage}
              disabled={isExtracting}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Extracting Text...
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  Extract Text from Image
                </>
              )}
            </button>
          </div>
        )}

        {/* Extracted Text Display */}
        {extractedText && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                Extracted Text
              </h2>
              <button
                onClick={() => copyToClipboard(extractedText)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {extractedText}
              </p>
            </div>
          </div>
        )}

        {/* Language Selection */}
        {extractedText && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Languages className="h-6 w-6 mr-2 text-purple-600" />
              Select Target Language
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedLanguage === lang.code
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md transform scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{lang.flag}</div>
                  <div className="text-sm font-semibold mb-1">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.nativeName}</div>
                </button>
              ))}
            </div>
            {selectedLangInfo && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700">
                  <strong>Selected:</strong> {selectedLangInfo.name} ({selectedLangInfo.nativeName})
                </p>
              </div>
            )}
          </div>
        )}

        {/* Translate Button */}
        {extractedText && (
          <div className="text-center mb-8">
            <button
              onClick={translateExtractedText}
              disabled={isLoading}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="h-5 w-5 mr-2" />
                  Translate to {selectedLangInfo?.name}
                </>
              )}
            </button>
          </div>
        )}

        {/* Translation Results */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Error</span>
            </div>
            <p className="text-red-600 mt-2">{error}</p>
            <div className="mt-4 text-sm text-red-600">
              <p><strong>Tips:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Make sure the image contains clear, readable text</li>
                <li>Try uploading a higher quality image</li>
                <li>Ensure the text in the image is not too small or blurry</li>
                <li>Check your internet connection</li>
              </ul>
            </div>
          </div>
        )}

        {translatedText && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-blue-600" />
                Translation Result
              </h2>
              <button
                onClick={() => copyToClipboard(translatedText)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Translation
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Translated to: <span className="font-semibold text-purple-600">{selectedLangInfo?.name} ({selectedLangInfo?.nativeName})</span>
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-l-4 border-purple-500">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {translatedText}
              </p>
            </div>
          </div>
        )}

        {/* Process Flow */}
        {selectedImage && (
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Process Flow</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 ${extractedText ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Eye className={`h-8 w-8 mx-auto mt-2 ${extractedText ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">1. Extract Text</h4>
                <p className="text-sm text-gray-600">
                  {extractedText ? 'Text extracted successfully!' : 'Extract exact text from your image'}
                </p>
              </div>
              
              <div className="text-center">
                <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 ${extractedText ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  <Languages className={`h-8 w-8 mx-auto mt-2 ${extractedText ? 'text-purple-600' : 'text-gray-400'}`} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">2. Select Language</h4>
                <p className="text-sm text-gray-600">
                  {extractedText ? `Target: ${selectedLangInfo?.name}` : 'Choose your target language'}
                </p>
              </div>
              
              <div className="text-center">
                <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 ${translatedText ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <CheckCircle className={`h-8 w-8 mx-auto mt-2 ${translatedText ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Get Translation</h4>
                <p className="text-sm text-gray-600">
                  {translatedText ? 'Translation completed!' : 'Receive accurate translation'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to get perfect results:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Image Quality Tips</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Use high-resolution, clear images</li>
                <li>• Ensure good lighting and contrast</li>
                <li>• Avoid blurry or distorted text</li>
                <li>• Keep text horizontal when possible</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Text Requirements</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Text should be clearly visible and readable</li>
                <li>• Printed text works better than handwritten</li>
                <li>• Multiple languages in one image are supported</li>
                <li>• Minimum text size should be readable by human eye</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
