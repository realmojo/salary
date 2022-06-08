import React, { useEffect } from "react";

export const Adsense = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      {process.env.NODE_ENV === "development" ? (
        <div
          style={{
            width: 1024,
            height: 300,
            background: "#ddd",
            margin: "20px auto",
          }}
        >
          adsense
        </div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
          }}
          data-ad-client="ca-pub-9130836798889522"
          data-ad-slot="5516852654"
        />
      )}
    </div>
  );
};
