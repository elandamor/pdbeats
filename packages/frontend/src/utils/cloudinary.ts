import { IMG_BASE_URL } from '../constants';

/**
 * Generates a cloudinary url
 * @param {String} public_id Cloudinary public_id
 */
export const generateCloudinaryUri = (public_id: string) => {
  const options = 'c_scale,f_auto';

  return `${IMG_BASE_URL}/${options}/v1/${public_id}`;
}
