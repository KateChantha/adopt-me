import React from "react";
import pet from "@frontendmasters/pet";

class Details extends React.Component {
  // react syntax "classProperties"
  state = { loading: true };

  componentDidMount() {
    // get id as a props from path="/details/:id"
    // make AJAX call to petfinder API
    // arrow function will not create a new context, so this will refer to 
    pet.animal(this.props.id).then(({ animal }) => {
      //setState does do a shallow merge
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const { animal, breed, location, description, name } = this.state;
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
export default Details;
