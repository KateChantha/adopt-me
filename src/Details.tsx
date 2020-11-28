import React from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from "./ThemeContext";


class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  
  /**
   * solution - give state all initail default values
   */
  // react syntax "classProperties"
  state = { 
    loading: true, 
    showModal: false,
    name: "",
    animal: "",
    location: "",
    description: "",
    media: [] as Photo[], // prevent typescript from never[]
    url: "",
    breed: ""
  };

  componentDidMount() {
    /**
     * Typescript - this.props.id: Type 'undefined' is not assignable
     * solution - handle if this.props.id is undefined
     */
    if (!this.props.id) {
      navigate("/");
      return;
    }

    // get id as a props from path="/details/:id"
    // make AJAX call to petfinder API
    // arrow function will not create a new context, so this will refer to 
    /**
     * Typescript - this.props.id: Argument of type 'string' is not assignable to parameter of type 'number'
     * solution - add plus sign to corecion string to number
     */
    pet.animal(+this.props.id).then(({ animal }) => {
      // setState does do a shallow merge
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    })
    .catch((err: Error) => this.setState({ error: err }));
  }

  // react syntax "classProperties"
  toggleModal = () => this.setState({showModal: !this.state.showModal});
  /**
   * Typescript - this.state.url: Property 'url' does not exist on type 
   * solution - 1st sol. define type for state at component parameters (at the component parameter, the 1st param is props and 2nd param is state)
   * solution - 2nd sol. give state all initail default values
   */
  // this can be handle by Redirect component as well
  adopt = () => navigate(this.state.url); 

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const { animal, breed, location, description, name, media, showModal } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{`My name is ${name}!`}</h1>
          <h2>{`Breed: ${animal} - ${breed}`}</h2>
          <h2>{`From: ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button 
              style={{ backgroundColor: theme }}
              onClick={this.toggleModal} 
              >
                More About {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          { showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name} ?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt} >Yes, Go to Petfinder</button>
          <button onClick={this.toggleModal} >Back to {name}'s Profile</button>
                  </div>
                </div>
              </Modal>
            ) : null }
        </div>
      </div>
    );
  }
}

// HOC wrapper
export default function DetailsWithErrorBoundary(props: RouteComponentProps<{ id: string }>) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
}
