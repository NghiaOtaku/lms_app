/* eslint-disable react/prop-types */
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import { DOMAIN } from "../../constants/api";
import React from "react";
const VideoPlayer = ({ lesson, endVideo }) => {
  let url = lesson.url ? DOMAIN + lesson.url : "";
  return <ReactHlsPlayer onEnded={endVideo} src={url} id={lesson?.name} width="100%" height="100%" controls />;
};
export default React.memo(VideoPlayer);
