"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Globe,
  Bookmark,
  Clock,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Image from "next/image";

interface NewsComponentProps {
  setActive: (active: string) => void;
  prevActive: string;
}

const NewsComponent: React.FC<NewsComponentProps> = ({
  setActive,
  prevActive,
}) => {
  interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
  }

  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const url =
          `https://newsapi.org/v2/everything?` +
          `q=farmer+india` +
          `&language=en` +
          `&sortBy=popularity` +
          `&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}` +
          `&pageSize=30`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(
          data.articles.filter(
            (article: { title: string; description: string; url: string }) =>
              article.title !== "[Removed]" &&
              article.description !== "[Removed]" &&
              article.url !== "[Removed]"
          )
        );
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (news.length === 0) {
      getNews();
    }
  }, [news.length]);

  const getTitle = (title: string) => {
    return title.length > 55 ? `${title.slice(0, 55)}...` : title;
  };

  const getMinutesRead = (description: string) => {
    return Math.ceil(description.split(" ").length / 200);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActive(prevActive)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Agriculture News
              </h1>
            </div>
            <Globe className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            <p className="mt-4 text-gray-600">Loading latest news...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => setNews([])}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div
                key={`${article.url}-${index}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative aspect-video">
                  <Image
                    src={
                      article.urlToImage ||
                      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80"
                    }
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{getMinutesRead(article.description)} min read</span>
                    <span className="text-gray-300">•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    {getTitle(article.title)}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4">
                    {article.description?.slice(0, 100)}...
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                  >
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsComponent;
