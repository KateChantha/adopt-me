import React, { FunctionComponent, useContext } from "react";
import { Photo } from "@frontendmasters/pet";
import { Link } from "@reach/router"
import ThemeContext from "./ThemeContext";

interface IProps {
  name: string;
  animal: string;
  breed: string;
  media: Photo[];
  location: string;
  id: number;
}

const Pet: FunctionComponent<IProps> = props => {
  const [theme] = useContext(ThemeContext);
  const { name, animal, breed, media, location, id } = props
  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }

  return (
    // benefit of Link to have HTML history to navigate the page
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1 style={{ color: theme }}>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}

export default Pet;
