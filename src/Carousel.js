import React from "react";

/**
 * @desc contains as array of various images
 * @desc Shows the active image by id number
 */
class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0, // by default, seclect 1st photo
  };

  // a React method, must be static, that take in a set of props and return a new set of state
  // accept media props from parent 
  static getDerivedStateFromProps({ media }) {
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
  handleIndexClick = event => {
    this.setState({
      // add + sign for coercion string to number
      // dataset is refered to <img data-index={index} />
      active: +event.target.dataset.index
    });
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
