import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { addServerUrl } from 'common/utils/url';

import './ImageInput.scss';

const types = ['image/jpeg', 'image/jpg', 'image/png'];

type TPreviewUrl = string | ArrayBuffer | null;

interface ImageInputProps {
  onInput: (image: File) => any;
  imageSrc?: string;
  addImageText?: string;
}

const ImageInput = ({
  onInput,
  imageSrc = '',
  addImageText = 'Add an image',
}: ImageInputProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<TPreviewUrl>(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const imageInputRef = useRef<any>(null);

  useEffect(() => {
    if (imageSrc) {
      const avatarUrl = addServerUrl(imageSrc);
      setPreviewUrl(avatarUrl);
    }
  }, [imageSrc]);

  useEffect(() => {
    if (!image) return;
    const fileReader = new FileReader(); // from the Web API interfaces
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    let pickedImage;
    if (files && files.length === 1) {
      pickedImage = files[0];

      const type = pickedImage.type;
      if (types.includes(type)) {
        // don't executes immediately
        setImage(pickedImage);
        onInput(pickedImage);
      } else {
        setShowErrorMessage(true);
      }
    }
  };

  const pickImageHandler = () => {
    if (imageInputRef?.current) {
      imageInputRef.current.click();
    }
  };

  const notificationEl = (
    <div className="image-input__notification">
      <div
        className={classNames('image-input__notification__title', {
          'image-input__notification__title--error': showErrorMessage,
        })}
      >
        {showErrorMessage ? 'Incorrect image type' : addImageText}
      </div>
      <div className="image-input__notification-content">.png /.jpg</div>
    </div>
  );

  return (
    <div className="image-input">
      <input
        ref={imageInputRef}
        onChange={imageChangeHandler}
        type="file"
        accept=".jpg,.jpg,.png"
        className="image-input__input-field"
      />
      <div className="image-input__image-container" onClick={pickImageHandler}>
        {previewUrl ? (
          <img
            src={previewUrl.toString()}
            className="image-input__preview"
            alt="preview"
          />
        ) : (
          notificationEl
        )}
      </div>
    </div>
  );
};

export { ImageInput };
