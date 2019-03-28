const cloudName = process.env.CLOUDINARY_BUCKET;
const unsignedUploadPreset = process.env.CLOUDINARY_PRESET || '';

const XHR_MAX_PROGRESS = 100.0;
const XHR_READY_STATE = 4;
const XHR_SUCCESS = 200;

// eslint-disable-next-line no-unused-vars
export const uploadFile = (file: File, destination: string, observer?: any) =>
  new Promise((resolve) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.upload.onprogress = (event) => {
      if (observer) {
        const progress = Math.round((event.loaded * XHR_MAX_PROGRESS) / event.total);

        observer.next(progress);
      }
    };

    xhr.upload.onerror = (error) => {
      if (observer) {
        observer.error(error);
      }
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XHR_READY_STATE && xhr.status === XHR_SUCCESS) {
        const response = JSON.parse(xhr.responseText);

        if (observer) {
          observer.complete();
        }

        resolve(response);
      }
    };

    fd.append('folder', `/pdbeats/${destination}`);
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload');
    fd.append('file', file);

    xhr.send(fd);
  });

const handleUpload = (files: any, destination: string, observer?: any) =>
  new Promise((resolve) => {
    let i = files.length;
    const promises = [];

    // tslint:disable-next-line:no-increment-decrement
    while (i--) {
      promises.push(uploadFile(files[i], destination, observer));
    }

    return Promise.all(promises).then((urls) => {
      if (observer) {
        observer.complete();
      }
      resolve(urls);
    });
  });

export default handleUpload;
