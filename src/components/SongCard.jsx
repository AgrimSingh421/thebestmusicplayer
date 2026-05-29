import React from "react";
import { NavLink } from "react-router-dom";

const SongCard = ({
  id,
  name,
  album,
  length,
  artists,
  song,
  link,
  cover,
  index,
}) => {
  return (
    <div class="song" id={id}>
      <div class="song_thumbnail">
        <NavLink to={link}>
          <img src={cover} alt="" />
        </NavLink>
      </div>
      <div class="song_details">
        <span>
          <NavLink to={link}>{name}</NavLink> | {length}
        </span>
        <span class="artists">{artists}</span>
      </div>
    </div>
  );
};

export default SongCard;
