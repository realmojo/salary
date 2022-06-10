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
        <div className="adsense-component">adsense</div>
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
