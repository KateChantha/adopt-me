import React from "react";
import { Photo } from "@frontendmasters/pet";

interface IProps {
  media: Photo[];
}

interface IState {
  active: number;
  photos: string[];
}

/**
 * @desc contains as array of various images
 * @desc Shows the active image by id number
 */
class Carousel extends React.Component<IProps, IState> {
  state = {
    photos: [],
    active: 0, // by default, seclect 1st photo
  };

  // a React method, must be static, that take in a set of props and return a new set of state
  // accept media props from parent 
  static getDerivedStateFromProps({ media }: IProps) {
    // defaut pet photo
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      // keep only large photos
      photos = media.map(({ large }) => large);
    }

    // photos is an array of string URL will be merge to initail state
    return { photos };
  }

  // property method syntax - use arrow function
  handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {

    // typescript warning to handle if event.target.dataset.index is not an HTMLElement or undefined
    // solution - handle if event.target.dataset.index is not an HTMLElement
    if (!(event.target instanceof HTMLElement)) return;

    // solution - handle if event.target.dataset.index is undefined(means no index pass in) - do nothing ** make sure that index exist
    if (event.target.dataset.index) {
      this.setState({
      // add + sign for coercion string to number
      // dataset is refered to <img data-index={index} />
        active: +event.target.dataset.index
      });
    }
    
  }

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /** to ignore rule -accssibility rule in this case */
            // eslint-disable-next-line
            <img
              key={photo}
              alt="animal thumnail"
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
