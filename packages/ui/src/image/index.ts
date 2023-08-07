import Image from './image';
import ImageBrowser from './image-browser';

export type ImageType = typeof Image & {
  Browser: typeof ImageBrowser;
};

(Image as ImageType).Browser = ImageBrowser;

export type { ImageProps } from './image';
export type { ImageAnchorProps, ImageBrowserProps } from './image-browser';

export default Image as ImageType;
