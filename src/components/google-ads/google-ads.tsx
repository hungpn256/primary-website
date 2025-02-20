"use client";
import Script from "next/script";

const GoogleAds = () => {
  return (
    <div>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5363184513090245"
        crossOrigin="anonymous"
      ></Script>
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "728px", height: "90px" }}
        data-ad-client="ca-pub-5363184513090245"
        data-ad-slot="9592390340"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="google-ads-init">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
};

export default GoogleAds;
