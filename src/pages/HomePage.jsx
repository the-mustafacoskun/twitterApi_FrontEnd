import { useEffect, useState } from "react";
import api from "../data/api";
import TweetInput from "../components/TweetInput";
import TweetCardTemplate from "../components/TweetCardTemplate";

export default function HomePage({ user }) {
  const [tweets, setTweets] = useState([]);
  const [retweetedIds, setRetweetedIds] = useState(new Set());
  const [tab, setTab] = useState("all"); // "all" | "mine"
  const [error, setError] = useState("");

  const loadTweets = async (currentTab = tab) => {
    try {
      setError("");

      const retweetsRes = await api.get("/retweet/mine");
      const ids = new Set(retweetsRes.data.map((r) => r.tweetId));
      setRetweetedIds(ids);

      if (currentTab === "all") {
        const res = await api.get("/tweet");
        setTweets(res.data);
        return;
      }

      const [ownRes, allRes] = await Promise.all([
        api.get("/tweet/findByUserId", { params: { userId: user.id } }),
        api.get("/tweet"),
      ]);

      const retweetTime = new Map(
        retweetsRes.data.map((r) => [r.tweetId, r.createdAt])
      );

     
      const byId = new Map();
      ownRes.data.forEach((t) =>
        byId.set(t.id, { tweet: t, sortDate: t.createdAt })
      );
      allRes.data
        .filter((t) => ids.has(t.id))
        .forEach((t) => {
          const rt = retweetTime.get(t.id);
          const existing = byId.get(t.id);
          const sortDate =
            existing && new Date(existing.sortDate) > new Date(rt)
              ? existing.sortDate
              : rt;
          byId.set(t.id, { tweet: t, sortDate });
        });

      // Retweetler, retweet zamanına göre sıralanır
      const merged = [...byId.values()]
        .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate))
        .map((x) => x.tweet);

      setTweets(merged);
    } catch (err) {
      setError(err.response?.data?.message || "Tweetler alınamadı");
    }
  };

  useEffect(() => {
    loadTweets(tab);
  }, [tab]);

  const handleAddTweet = async (content) => {
    try {
      setError("");
      await api.post("/tweet", { content });
      await loadTweets();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Tweet gönderilemedi");
      return false;
    }
  };

  const tabClass = (name) =>
    `flex-1 py-3 text-sm font-semibold text-center cursor-pointer transition-colors ${
      tab === name
        ? "text-sky-600 border-b-2 border-sky-500"
        : "text-gray-500 hover:bg-gray-50"
    }`;

  return (
    <div className="bg-white border mx-auto mt-6 border-gray-100 max-w-xl w-full rounded-lg overflow-hidden shadow-sm">
      <TweetInput onAddTweet={handleAddTweet} />

      <div className="flex border-b border-gray-200">
        <button className={tabClass("all")} onClick={() => setTab("all")}>
          Tüm Tweetler
        </button>
        <button className={tabClass("mine")} onClick={() => setTab("mine")}>
          Tweetlerim
        </button>
      </div>

      {error && <p className="text-red-600 text-sm p-2">{error}</p>}
      {!error && tweets.length === 0 && (
        <p className="text-gray-500 text-sm p-4">Henüz tweet yok.</p>
      )}

      {tweets.map((tweet) => (
        <TweetCardTemplate
          key={tweet.id}
          tweet={tweet}
          retweetedByMe={retweetedIds.has(tweet.id)}
          onRetweetChange={tab === "mine" ? () => loadTweets("mine") : undefined}
        />
      ))}
    </div>
  );
}