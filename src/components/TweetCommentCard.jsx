import React from "react";

export default function TweetCommentCard({ avatar, name, username, time, content }) {
  const displayName = name || username;

  return (
    <div className="flex gap-3 p-4 border-b border-gray-200 bg-white text-gray-900">
      {/* Sol Kısım: Profil Fotoğrafı */}
      <div className="shrink-0">
        <img
          src={avatar || "/profile.png"}
          alt={displayName}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Sağ Kısım: İçerik Alanı */}
      <div className="flex-1 min-w-0">
        {/* Kullanıcı Bilgileri ve Zaman */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-bold truncate">{displayName}</span>
          {username && username !== displayName && (
            <span className="text-gray-500 truncate">@{username}</span>
          )}
          <span className="text-gray-500">·</span>
          <span className="text-gray-500 whitespace-nowrap">{time}</span>
        </div>

        {/* Yorum Metni */}
        <p className="mt-1 text-sm leading-normal whitespace-pre-wrap wrap-break-word">
          {content}
        </p>
      </div>
    </div>
  );
}