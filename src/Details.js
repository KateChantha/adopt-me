import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from "./ThemeContext";


class Details extends React.Component {
  // react syntax "classProperties"
  state = { loading: true, showModal: false };

  componentDidMount() {
    // get id as a props from path="/details/:id"
    // make AJAX call to petfinder API
    // arrow function will not create a new context, so this will refer to 
    pet.animal(this.props.id).then(({ animal }) => {
      //setState does do a shallow merge
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
    }, console.error);
  }

  // react syntax "classProperties"
  toggleModal = () => this.setState({showModal: !this.state.showModal});
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
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button 
              style={{ backgroundColor: theme }}
              onClick={this.toggleModal} 
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          { showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name} ?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt} >Yes</button>
                    <button onClick={this.toggleModal} >No, I am monster</button>
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
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
}
