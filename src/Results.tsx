import React, { FunctionComponent, useContext } from "react";
import { Animal } from "@frontendmasters/pet";
import Pet from "./Pet";
import ThemeContext from "./ThemeContext";

interface IProps {
  pets: Animal[];
}

const Results: FunctionComponent<IProps> = ({ pets }) => {
  const [theme] = useContext(ThemeContext)
  // console.log("PETS", pets);
  return (
    <div className="search">
      {!pets.length ? (
        <h1 style={{ color: theme }}>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.type}
            key={pet.id}
            name={pet.name}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
