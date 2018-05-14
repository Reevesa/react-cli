import React, { Component } from 'react';
import { Button } from 'antd';
import Gallery from '../../components/Gallery';

let tempUrls = [
  {"src":"http://localhost:8000/image/IM2018051400000007"},
  {"src":"http://localhost:8000/image/IM2018051400000015"},
  {"src":"http://localhost:8000/image/IM2018051400000012"}
];

class LightBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayList: tempUrls,
      currentImage: 0,
      deg: 0,
      lightboxIsOpen: false,
    }
  }

  /** ********** Lightbox related event handler *********** start ***/
    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoImage = (index) => {
        this.setState({
            deg: 0,
            currentImage: index,
        });
    }

    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    lightboxRotate = (direction) => {
        this.setState({
            deg: this.state.deg + (direction === 'right' ? 1 : -1) * 90
        });
    }

    clickImage = () => { console.log('click img') }
    /** ********** Lightbox related event handler *********** end ***/

    handleClick = () => {
      this.setState({
        lightboxIsOpen: true
      });
    }

  render() {
    return (<div>
      <p>lightbox</p>
      <Button type="primary" onClick={this.handleClick}>show gallery</Button>
      <Gallery
          images={this.state.displayList}
          showThumbnails={true}
          onClickThumbnail={this.gotoImage}
          currentImage={this.state.currentImage}
          currentDegree={this.state.deg}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClickImage={this.clickImage}
          onClose={this.closeLightbox}
          onRotate={this.lightboxRotate}
          theme={{ container: { zIndex: '9999' } }}
      />
  </div>);
  }
}

export default LightBox;