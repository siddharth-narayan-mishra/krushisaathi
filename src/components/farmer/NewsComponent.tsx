import React, { useEffect, useState } from "react";
import backArrow from "../../../public/assets/icons/back-arrow.svg";
import globe from "../../../public/assets/icons/globe.svg";
import Bookmark from "../../../public/assets/icons/Bookmark.svg";
import clock from "../../../public/assets/icons/Clock.svg";
import Image from "next/image";
import { customImageLoader } from "@/utils/customImageLoader";
import { news_placeholder_bg } from "@/config/ImagesUrl";

interface NewsComponentProps {
  setActive: (active: string) => void;
  prevActive: string;
}

const NewsComponent: React.FC<NewsComponentProps> = ({
  setActive,
  prevActive
}) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const url =
          `https://newsapi.org/v2/everything?` +
          `q=farmer+india` +
          `&language=en` +
          `&sortBy=popularity` +
          `&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}` +
          `&pageSize=30`;

        const req = new Request(url);

        fetch(req).then(async function (response) {
          let data = await response.json();
          setNews(data.articles);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (news.length === 0) {
      getNews();
    }
  }, []);

  const getTitle = (title: string) => {
    if (title.length > 55) {
      return title.slice(0, 55) + "...";
    }
    return title;
  };

  const goToNews = (url: string) => () => {
    window.open(url, "_blank");
  };

  const getMinutesRead = (description: string) => {
    return Math.ceil(description.split(" ").length / 200);
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-between text-2xl px-3 py-2 border-b-2 border-b-gray-400">
        <button onClick={() => setActive(prevActive)}>
          {" "}
          <Image src={backArrow} width={16} height={16} alt="back" />
        </button>
        News Feed
        <button>
          <Image src={globe} width={30} height={30} alt="globe" />
        </button>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="relative flex flex-wrap m-3 mb-10 overflow-auto h-screen">
          {news.map((element: any) => {
            if (
              element.title !== "[Removed]" &&
              element.description !== "[Removed]" &&
              element.url !== "[Removed]"
            ) {
              return (
                <div
                  className="w-full sm:w-1/2 lg:w-1/4 cursor-pointer"
                  key={element.url}
                  onClick={goToNews(element.url)}
                >
                  <div className="mr-3 mb-3 ">
                    <div className="relative">
                      <Image
                        className="rounded-t-lg h-[200px]"
                        src={element.urlToImage || news_placeholder_bg}
                        alt="news"
                        width={500}
                        height={300}
                        loader={customImageLoader}
                      />
                      <span className="absolute rounded-full p-2 bg-[#27612B] top-2 right-2">
                        <Image src={Bookmark} alt="mark" width={8} height={4} />
                      </span>
                      <div className="bg-secondary_green rounded-b-lg p-2 h-[134px]">
                        <p className="text-lg">{getTitle(element.title)}</p>
                        <span className="text-xs text-gray-500 flex mt-3">
                          <Image
                            src={clock}
                            width={18}
                            height={18}
                            alt="clock"
                          />
                          {getMinutesRead(element.description)} minutes read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
