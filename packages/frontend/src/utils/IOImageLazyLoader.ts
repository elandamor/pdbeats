// @ts-nocheck
import preloadImage from './preloadImage';

/**
 * Class to lazyload images
 */
class IOLazyImageLoader {
  /**
   * Check browser support for IntersectionObserver(IO)
   * @return {boolean} true or false - True if browser supports IO
   */
  static get SUPPORTS_INTERSECTION_OBSERVER() {
    return ('IntersectionObserver' in window);
  }
  /**
   * Get css-class to set on image once it has been handled by IO
   * @return {string} css-class - The css class attached to a handled image
   */
  static get HANDLED_CLASS() {
    return 'lazy-image-handled';
  }
  /**
   * Get css-class to set on image once it has been loaded by preloader
   * @return {string} css-class - The css class attached to a loaded image
   */
  static get LOADED_CLASS() {
    return 'lazy-image-loaded';
  }

  constructor(image) {
    console.log(image);
    // Load image immediately if IO is not supported
    if (!IOLazyImageLoader.SUPPORTS_INTERSECTION_OBSERVER) {
      this._preloadImage(image);
      return;
    }
    // Setup IO
    this._observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('lazy-image-handled'))
            return;
          // ... otherwise label the image as handled ...
          entry.target.classList.add('lazy-image-handled');

          this._preloadImage(entry.target);
        }
      }
    });

    // ... observe image
    this._observer.observe(image);
  }

  _disconnect() {
    if (!this._observer) {
      return;
    }

    this._observer.disconnect();
  }
  /**
   * Preload the respective image
   * @param {element} img - The image to be loaded
   * @return {callback} _applyImage - A method that adds the image to the DOM
   */
  _preloadImage(image) {
    // Get the source for the image.
    const src = image.dataset.src;
    // Do nothing if image source is missing.
    if (!src) {
      return;
    }

    return preloadImage(src).then(() => this._applyImage(image, src));
  }
  /**
   * Add the respective image to the DOM
   */
  _applyImage(img, src) {
    const el = img;

    el.classList.add('lazy-image-loaded');

    if (!el) {
      return;
    }
    // If target element is an image ...
    if (el.tagName.toLowerCase() === 'img') {
      // ... set src attribute of element ...
      el.src = src;
    } else {
      // ... otherwise set image source as background of element.
      el.style.backgroundImage = `url(${src})`;
    }
  }
}

export default IOLazyImageLoader;
