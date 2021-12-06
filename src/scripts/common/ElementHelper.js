import { BASE_URL } from './api';

// ElementHelper utility class
export class ElementHelper {
  htmlElement;

  constructor(tagName) {
    this.htmlElement = document.createElement(tagName);
  }

  setId(id) {
    this.htmlElement.id = id;
    return this;
  }

  setClass(className) {
    this.htmlElement.className = className;
    return this;
  }

  setOnClick(onClick) {
    this.htmlElement.addEventListener('click', onClick);
    return this;
  }

  setSrc(src) {
    if (this.htmlElement.tagName === 'IMG') {
      const isAsset = src.startsWith('assets/');
      const isPicsum = src.startsWith('https://picsum.photos/');
      this.htmlElement.src = (isAsset || isPicsum) ? src : `${BASE_URL}/api/files/${src}`;
      return this;
    }
  }

  setText(textContent) {
    this.htmlElement.textContent = textContent;
    return this;
  }

  setParent(parent) {
    parent.htmlElement.appendChild(this.htmlElement);
    return this;
  }

  static create(tagName) {
    return new ElementHelper(tagName);
  }
}
