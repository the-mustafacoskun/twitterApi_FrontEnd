import React, { useState } from 'react';

export default function TweetInput({ onAddTweet }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return; 

    if (onAddTweet) {
      onAddTweet(content);
    }

    setContent(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 border-b border-gray-200 bg-white">
      <div className="shrink-0">
        <img 
          src="/profile.png" 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Neler oluyor?"
          rows="3"
          className="w-full resize-none outline-none text-gray-900 placeholder-gray-400 text-base py-2 bg-transparent"
        ></textarea>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
          {/* Alt Simge Alanı (Medya, Emoji vb. ikonlar) */}
          <div className="flex items-center gap-3 text-sky-500">
            {/* Resim İkonu */}
            <svg className="w-5 h-5 cursor-pointer hover:opacity-80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {/* Anket İkonu */}
            <svg className="w-5 h-5 cursor-pointer hover:opacity-80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </div>

          {/* Gönder / Tweetle Butonu */}
          <button 
            type="submit"
            disabled={!content.trim()}
            className="bg-sky-500 text-white font-bold px-4 py-1.5 rounded-full text-sm hover:bg-sky-600 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
}