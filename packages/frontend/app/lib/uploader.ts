const cloudName = process.env.CLOUDINARY_BUCKET;
const unsignedUploadPreset = process.env.CLOUDINARY_PRESET || '';

const XHR_MAX_PROGRESS = 100.0;
const XHR_READY_STATE = 4;
const XHR_SUCCESS = 200;

// eslint-disable-next-line no-unused-vars
export const uploadFile = (file: any, observer: any) =>
  new Promise((resolve) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.upload.onprogress = (event) => {
      const progress = Math.round((event.loaded * XHR_MAX_PROGRESS) / event.total);

      observer.next(progress);
    };

    xhr.upload.onerror = (error) => {
      observer.error(error);
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XHR_READY_STATE && xhr.status === XHR_SUCCESS) {
        const response = JSON.parse(xhr.responseText);

        observer.complete();
        resolve(response);
      }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);

    xhr.send(fd);
  });

const handleUpload = (files: any, observer: any) =>
  new Promise((resolve) => {
    let i = files.length;
    const promises = [];

    // tslint:disable-next-line:no-increment-decrement
    while (i--) {
      promises.push(uploadFile(files[i], observer));
    }

    return Promise.all(promises).then((urls) => {
      observer.complete();
      resolve(urls);
    });
  });

export default handleUpload;
