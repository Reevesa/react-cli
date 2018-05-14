import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import ScrollLock from 'react-scrolllock';
import DragAndZoom from 'react-drag-and-zoom';

import theme from './theme';
import Arrow from './components/Arrow';
import Rotate from './components/Rotate';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';

import { bindFunctions, canUseDom } from './utils';

class Gallery extends Component {
	constructor () {
		super();

		bindFunctions.call(this, [
			'gotoNext',
			'gotoPrev',
			'handleKeyboardInput',
		]);
	}
	getChildContext () {
		return {
			theme: this.props.theme,
		};
	}
	componentDidMount () {
		if (this.props.isOpen && this.props.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
	}
	componentWillReceiveProps (nextProps) {
		if (!canUseDom) return;

		// preload images
		if (nextProps.preloadNextImage) {
			const currentIndex = this.props.currentImage;
			const nextIndex = nextProps.currentImage + 1;
			const prevIndex = nextProps.currentImage - 1;
			let preloadIndex;

			if (currentIndex && nextProps.currentImage > currentIndex) {
				preloadIndex = nextIndex;
			} else if (currentIndex && nextProps.currentImage < currentIndex) {
				preloadIndex = prevIndex;
			}

			// if we know the user's direction just get one image
			// otherwise, to be safe, we need to grab one in each direction
			if (preloadIndex) {
				this.preloadImage(preloadIndex);
			} else {
				this.preloadImage(prevIndex);
				this.preloadImage(nextIndex);
			}
		}

		// add/remove event listeners
		if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
		if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}
	componentWillUnmount () {
		if (this.props.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}

	// ==============================
	// METHODS
	// ==============================

	preloadImage (idx) {
		const image = this.props.images[idx];

		if (!image) return;

		const img = new Image();

		img.src = image.src;

		if (image.srcset) {
			img.srcset = image.srcset.join();
		}
	}
	gotoNext (event) {
		if (this.props.currentImage === (this.props.images.length - 1)) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickNext();

	}
	gotoPrev (event) {
		if (this.props.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickPrev();

	}
	doRotate (direction, proxy, event) {
		this.props.onRotate(direction);
	}
	handleKeyboardInput (event) {
		if (event.keyCode === 37) { // left
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) { // right
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) { // esc
			this.props.onClose();
			return true;
		}
		return false;

	}

	preventDefault = e => {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}

	// ==============================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.props.currentImage === 0) return null;

		return (
			<Arrow
				direction="left"
				icon="arrowLeft"
				onClick={this.gotoPrev}
				title={this.props.leftArrowTitle}
				type="button"
			/>
		);
	}
	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return null;

		return (
			<Arrow
				direction="right"
				icon="arrowRight"
				onClick={this.gotoNext}
				title={this.props.rightArrowTitle}
				type="button"
			/>
		);
	}
    renderToolBar () {
        return (
            <div className={css(classes.toolBar)}>
                <Rotate
                    direction="left"
                    icon="rotateLeft"
                    onClick={this.doRotate.bind(this, 'left')}
                    title={this.props.leftArrowTitle}
                    type="button"
                />
                {<Rotate
                    direction="right"
                    icon="rotateRight"
                    onClick={this.doRotate.bind(this, 'right')}
                    title={this.props.rightArrowTitle}
                    type="button"
                />}
            </div>
        )
    }
	renderDialog () {
		const {
			backdropClosesModal,
			customControls,
			isOpen,
			onClose,
			showCloseButton,
			showThumbnails,
			width,
			images,
			currentImage,
			imageCountSeparator,
			showImageCount
		} = this.props;

		if (!isOpen) return <span key="closed" />;

		let offsetThumbnails = 0;
		if (showThumbnails) {
			offsetThumbnails = theme.thumbnail.size + theme.container.gutter.vertical;
		}

		return (
			<Container
				key="open"
				onClick={backdropClosesModal ? onClose : undefined}
				onTouchEnd={backdropClosesModal ? onClose : undefined}
			>
                        <Header
                            customControls={customControls}
                            onClose={onClose}
                            showCloseButton={showCloseButton}
                            closeButtonTitle={this.props.closeButtonTitle}
                        />
                <DragAndZoom
                    zoomStep={1.5}
                    minZoom={50}
                    maxZoom={200}
                    initialZoom={100}
                    onZoom={(zoom, e) => {}}
                    onDrag={e => this.preventDefault(e)}
                >
                    <div className={css(classes.content)} style={{ marginBottom: offsetThumbnails, maxWidth: width }}>
                        {this.renderImages()}
                    </div>
                </DragAndZoom>
                {this.renderToolBar()}
				{this.renderThumbnails()}
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
				<Footer
					caption={images[currentImage].caption}
					countCurrent={currentImage + 1}
					countSeparator={imageCountSeparator}
					countTotal={images.length}
					showCount={showImageCount}
				/>
				<ScrollLock />
			</Container>
		);
	}
	renderImages () {
		const {
			currentImage,
			images,
			// imageCountSeparator,
			onClickImage,
			// showImageCount,
			showThumbnails,
		} = this.props;

		if (!images || !images.length) return null;

		const image = images[currentImage];

		let srcset;
		let sizes;

		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}

		const thumbnailsSize = showThumbnails ? theme.thumbnail.size : 0;
		const heightOffset = `${theme.header.height + theme.footer.height + thumbnailsSize + (theme.container.gutter.vertical)}px`;

		return (
			<figure className={css(classes.figure)}>
				{/*
					Re-implement when react warning "unknown props"
					https://fb.me/react-unknown-prop is resolved
					<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
				*/}
				<img
					className={css(classes.image)}
					onClick={onClickImage ? onClickImage : undefined}
					sizes={sizes}
					alt={image.alt}
					src={image.src}
					srcSet={srcset}
					style={{
						transform: `rotate(${this.props.currentDegree}deg)`,
						cursor: this.props.onClickImage ? 'pointer' : 'move',
						maxHeight: `calc(100vh - ${heightOffset})`,
					}}
				/>
				{/*<Footer
					caption={images[currentImage].caption}
					countCurrent={currentImage + 1}
					countSeparator={imageCountSeparator}
					countTotal={images.length}
					showCount={showImageCount}
				/>*/}
			</figure>
		);
	}
	renderThumbnails () {
		const { images, currentImage, onClickThumbnail, showThumbnails, thumbnailOffset } = this.props;

		if (!showThumbnails) return;

		return (
			<PaginatedThumbnails
				currentImage={currentImage}
				images={images}
				offset={thumbnailOffset}
				onClickThumbnail={onClickThumbnail}
			/>
		);
	}
	render () {
		return (
			<Portal>
				{this.renderDialog()}
			</Portal>
		);
	}
}

Gallery.propTypes = {
	backdropClosesModal: PropTypes.bool,
	closeButtonTitle: PropTypes.string,
	currentImage: PropTypes.number,
	currentDegree: PropTypes.number,
	customControls: PropTypes.arrayOf(PropTypes.node),
	enableKeyboardInput: PropTypes.bool,
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			thumbnail: PropTypes.string,
		})
	).isRequired,
	isOpen: PropTypes.bool,
	leftArrowTitle: PropTypes.string,
	onClickImage: PropTypes.func,
	onClickNext: PropTypes.func,
	onClickPrev: PropTypes.func,
	onRotate: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	preloadNextImage: PropTypes.bool,
	rightArrowTitle: PropTypes.string,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	theme: PropTypes.object,
	thumbnailOffset: PropTypes.number,
	width: PropTypes.number,
};
Gallery.defaultProps = {
	closeButtonTitle: 'Close (Esc)',
	currentImage: 0,
	currentDegree: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	leftArrowTitle: 'Previous (Left arrow key)',
	onClickShowNextImage: true,
	preloadNextImage: true,
	rightArrowTitle: 'Next (Right arrow key)',
	showCloseButton: true,
	showImageCount: true,
	theme: {},
	thumbnailOffset: 2,
	width: 1024,
};
Gallery.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

const classes = StyleSheet.create({
	content: {
		position: 'relative',
	},
	figure: {
		margin: 0, // remove browser default
	},
	image: {
		display: 'block', // removes browser default gutter
		height: 'auto',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},
    toolBar: {
        position: 'absolute',
        bottom: '85px',
        textAlign: 'center',
        height: '60px',
        left: '50%',
    }
});

export default Gallery;
