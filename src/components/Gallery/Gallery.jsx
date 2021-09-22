import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { filterMediaFiles, getMediaElement } from "../../store/utils";
import "./style.scss";

const mediaFiles = [
  "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://hips.hearstapps.com/pop.h-cdn.co/assets/17/24/640x320/landscape-1497533116-not-dead.gif",
  "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg",
  "https://i.pinimg.com/564x/8e/2c/45/8e2c45f0ba71c610699c6696cbed3804.jpg",
  "28606760851a477da185da5584b6d2f1.mp4",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
];

const columnCount = null;

const Gallery = () => {
  useEffect(() => {
    filterMediaFiles(mediaFiles);
  }, []);
  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Gallery</h1>
      </div>
      <Link to="/slideshow" className="slideshow-button">
        <img src="slideshow2.svg" alt="slideshow" />
      </Link>
      <div className="gallery" style={columnCount && { columnCount }}>
        {mediaFiles.map((mediaFile, index) => (
          <a href={mediaFile} key={index}>
            {getMediaElement(mediaFile, index)}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
