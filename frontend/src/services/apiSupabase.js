import supabase from './supabase';

// DELETE IMAGE
export const deleteImageSupabase = async imageName => {
  let { error } = await supabase.storage
    .from('card-images')
    .remove([imageName]);

  if (error) {
    console.error('Error deleting image:', error.message);
    return false;
  }
  return true;
};

// DELETE AVATAR
export const deleteAvatarSupabase = async imageName => {
  let { error } = await supabase.storage
    .from('avatar-images')
    .remove([imageName]);

  if (error) {
    console.error('Error deleting image:', error.message);
    return false;
  }
  return true;
};
