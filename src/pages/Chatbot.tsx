import React, { useState, useRef } from 'react';
import { Loader2, Send } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'bot', text: 'Hi 👋! I am your Assistant. Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = 'AIzaSyCi5-KGYoTavwC2XY_9-dpr8nkTxuVwS-0';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are a helpful assistant. Answer the following question concisely and clearly:\n\n${input}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 512,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        'Sorry, I could not generate a response.';

      setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [...prev, { from: 'bot', text: 'Error: Unable to get response.' }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Chat with
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Assistant
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ask any question or request information and get a clear response.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-xl ${
                    msg.from === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Send className="h-5 w-5 mr-2" />}
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
