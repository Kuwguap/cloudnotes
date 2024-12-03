const CLOUDINARY_CLOUD_NAME = 'dmyhjnaao';
const CLOUDINARY_UPLOAD_PRESET = 'cloudnotes_unsigned';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image');
    }

    const data = await response.json() as CloudinaryResponse;
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error instanceof Error ? error : new Error('Failed to upload image');
  }
};

export const getImagePublicId = (url: string): string | null => {
  try {
    const matches = url.match(/\/v\d+\/([^/]+)\.[^.]+$/);
    return matches ? matches[1] : null;
  } catch {
    return null;
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  // Note: Image deletion should be handled on the server side
  // for security reasons
  console.warn('Image deletion should be handled on the server side');
}; 