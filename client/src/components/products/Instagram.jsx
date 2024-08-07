import { useEffect } from "react";

function loadInstagramEmbed() {
  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = "//www.instagram.com/embed.js";
  document.body.appendChild(script);
}

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    loadInstagramEmbed();
  }, [url]);

  return (
    <div className="instagram-post">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: "auto", maxWidth: "540px" }}
      ></blockquote>
    </div>
  );
};
export default InstagramEmbed;
