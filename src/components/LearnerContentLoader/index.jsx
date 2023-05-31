import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={100}
    height={30}
    viewBox="0 0 100 30"
    backgroundColor="#fafafa"
    foregroundColor="#a6a6a6"
    {...props}
  >
    <rect x="38" y="14" rx="3" ry="3" width="52" height="6" />
    <circle cx="16" cy="16" r="14" />
  </ContentLoader>
);

export default Loader;
