import React, { useState, useEffect, useContext, FunctionComponent } from "react";
import pet, { ANIMALS, Animal } from "@frontendmasters/pet";
import { RouteComponentProps } from "@reach/router";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "All", ANIMALS);
  // Custom hook - useDropdown() will return [state, Dropdown, setState]
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([] as Animal[]);
  const [theme, setTheme] = useContext(ThemeContext)

  // requestPets() is called onSubmitt by <form>
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    // if there is no animals data come back, then set pets to emtpy array
    setPets(animals || []);
  }

  // run only if there is change in dependecies-> animal state in Animal dropdown
  useEffect(() => {
    // pet.breeds("dog").then(console.log, console.error);

    setBreeds([]);
    setBreed("");

    // asynchronously request data from the Petfinder API to get breeds, then setBreeds
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      // iterate over each object apiBreeds to get name of type value
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <AnimalDropdown />
        <BreedDropdown />

        <label htmlFor="theme" >
          ThemeContext
          <select
            value={theme}
            onChange={ e => setTheme(e.target.value)}
            onBlur={ e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }} >Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
