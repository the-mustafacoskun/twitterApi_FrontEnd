import { Heart, MessageCircle, Repeat2, Share, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import TweetCommentCard from "./TweetCommentCard";
import api from "../data/api";

function formatTime(createdAt) {
  if (!createdAt) return "";
  const seconds = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / 1000,
  );
  if (seconds < 60) return "şimdi";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}dk`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}sa`;
  return `${Math.floor(hours / 24)}g`;
}

export default function TweetCardTemplate({
  tweet,
  retweetedByMe = false,
  onRetweetChange,
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(tweet.commentCount);
  const [commentError, setCommentError] = useState("");

  const [retweeted, setRetweeted] = useState(retweetedByMe);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount);

  const [reaction, setReaction] = useState(null);
  const [likeCount, setLikeCount] = useState(tweet.likeCount);
  const [dislikeCount, setDislikeCount] = useState(tweet.dislikeCount);

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .get("/reaction", { params: { tweetId: tweet.id } })
      .then((res) => setReaction(res.data?.reactionType ?? null))
      .catch(() => setReaction(null));
  }, [tweet.id]);

  const loadComments = async () => {
    try {
      setCommentError("");
      const res = await api.get("/comment/findByTweetId", {
        params: { tweetId: tweet.id },
      });
      setComments(res.data);
      setCommentCount(res.data.length);
    } catch (err) {
      setCommentError(err.response?.data?.message || "Yorumlar alınamadı");
    }
  };

  const handleShowComments = () => {
    const next = !showComments;
    setShowComments(next);
    if (next) loadComments();
  };

  const handleAddComment = async (content) => {
    try {
      setCommentError("");
      await api.post(
        "/comment",
        { content },
        { params: { tweetId: tweet.id } },
      );
      await loadComments();
      return true;
    } catch (err) {
      setCommentError(err.response?.data?.message || "Yorum gönderilemedi");
      return false;
    }
  };

  const handleRetweet = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await api.post("/retweet", { id: tweet.id });

      setRetweetCount((n) => (retweeted ? n - 1 : n + 1));
      setRetweeted((prev) => !prev);
      onRetweetChange?.();
    } catch (err) {
      console.error("Retweet başarısız", err);
    } finally {
      setBusy(false);
    }
  };

  const handleReaction = async (type) => {
    if (busy) return;
    setBusy(true);
    try {
      const endpoint = type === "LIKE" ? "/like" : "/dislike";
      const res = await api.post(endpoint, null, {
        params: { tweetId: tweet.id },
      });
      const next = res.data?.reactionType ?? null;

      if (reaction === "LIKE") setLikeCount((n) => n - 1);
      if (reaction === "DISLIKE") setDislikeCount((n) => n - 1);
      if (next === "LIKE") setLikeCount((n) => n + 1);
      if (next === "DISLIKE") setDislikeCount((n) => n + 1);

      setReaction(next);
    } catch (err) {
      console.error("Reaksiyon başarısız", err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="bg-white flex items-center justify-center p-4">
        <div className="bg-white border border-gray-100 max-w-xl w-full rounded-lg overflow-hidden shadow-sm">
          <article className="p-4 flex space-x-3">
            <div className="shrink-0">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                src="/profile.png"
                alt="User Avatar"
              />
            </div>

            <div className="flex-1 min-w-0">
              {retweeted && (
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <Repeat2 className="w-3 h-3" />
                  <span>Retweetledin</span>
                </div>
              )}
              <div className="flex items-baseline space-x-1 text-sm min-w-0 mb-1">
                <span className="font-bold text-gray-900 truncate">
                  {tweet.userName}
                </span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 whitespace-nowrap">
                  {formatTime(tweet.createdAt)}
                </span>
              </div>

              <p className="text-gray-800 text-sm sm:text-base leading-normal mb-2 whitespace-pre-wrap wrap-break-word">
                {tweet.content}
              </p>

              <div className="flex justify-between items-center mt-4 text-gray-500 text-xs sm:text-sm -ml-2">
                <button
                  aria-label="Reply"
                  onClick={handleShowComments}
                  className="flex items-center space-x-1 hover:text-blue-500 p-2 rounded-full hover:bg-blue-100 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{commentCount}</span>
                </button>

                <button
                  aria-label="Retweet"
                  onClick={handleRetweet}
                  disabled={busy}
                  className={`flex items-center space-x-1 p-2 rounded-full cursor-pointer hover:bg-green-100 hover:text-green-500 ${
                    retweeted ? "text-green-600 font-bold" : ""
                  }`}
                >
                  <Repeat2 className="w-4 h-4" />
                  <span>{retweetCount}</span>
                </button>

                <button
                  aria-label="Like"
                  onClick={() => handleReaction("LIKE")}
                  disabled={busy}
                  className={`flex items-center space-x-1 p-2 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-500 ${
                    reaction === "LIKE" ? "text-red-600 font-bold" : ""
                  }`}
                >
                  <Heart
                    className="w-4 h-4"
                    fill={reaction === "LIKE" ? "currentColor" : "none"}
                  />
                  <span>{likeCount}</span>
                </button>

                <button
                  aria-label="Dislike"
                  onClick={() => handleReaction("DISLIKE")}
                  disabled={busy}
                  className={`flex items-center space-x-1 p-2 rounded-full cursor-pointer hover:bg-gray-200 hover:text-gray-800 ${
                    reaction === "DISLIKE" ? "text-gray-900 font-bold" : ""
                  }`}
                >
                  <ThumbsDown
                    className="w-4 h-4"
                    fill={reaction === "DISLIKE" ? "currentColor" : "none"}
                  />
                  <span>{dislikeCount}</span>
                </button>

                <button
                  aria-label="Share"
                  className="flex items-center space-x-1 hover:text-blue-500 p-2 rounded-full hover:bg-blue-100"
                >
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {showComments && (
        <div className="m-4">
          <CommentInput onAddComment={handleAddComment} />
          {commentError && (
            <p className="text-red-600 text-sm p-2">{commentError}</p>
          )}
          {comments.map((c) => (
            <TweetCommentCard
              key={c.id}
              name={c.username}
              username={c.username}
              time={formatTime(c.createdAt)}
              content={c.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}
