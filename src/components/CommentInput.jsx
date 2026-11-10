import React, { useState } from "react";

export default function CommentInput({ onAddComment }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const ok = onAddComment ? await onAddComment(text) : true;
    if (ok) setText(""); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b border-gray-200 bg-white"
    >
      <div className="shrink-0">
        <img
          src="/profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yanıtınızı gönderin..."
          rows="2"
          maxLength={280}
          className="w-full resize-none outline-none text-gray-900 placeholder-gray-400 text-sm py-2 bg-transparent"
        ></textarea>

        <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-1">
          <span className="text-xs text-gray-400">{text.length}/280</span>
          <button
            type="submit"
            disabled={!text.trim()}
            className="bg-sky-500 text-white font-bold px-4 py-1.5 rounded-full text-sm hover:bg-sky-600 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Yanıtla
          </button>
        </div>
      </div>
    </form>
  );
}