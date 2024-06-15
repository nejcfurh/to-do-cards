import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteAvatarSupabase } from '../services/apiSupabase';
import UploadAvatar from './UploadAvatar';
import Modal from './Modal';

const defaultUserUrl =
  'https://mgpihvqzjbhiowlsiuac.supabase.co/storage/v1/object/public/avatar-images/DefaultUser.png?t=2024-06-15T15%3A56%3A35.569Z';

// eslint-disable-next-line react/prop-types
function ProfileImage({ avatar, refreshAvatar }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [isUpdated, setIsUpdated] = useState(false);

  const updateAvatar = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleImageUpload = url => {
    setAvatarUrl(url);
    setIsUpdated(true);
  };

  const extractImageName = url => {
    if (!url) return null;
    const parts = url?.split('/');
    return parts[parts.length - 1];
  };

  const previousAvatar = extractImageName(avatar);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/account/avatar`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: avatarUrl }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Avatar uploaded successfully!');
        setIsUpdated(true);
        setAvatarUrl(avatarUrl);
        deleteAvatarSupabase(previousAvatar);
      } else {
        toast.error('Avatar failed to upload!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while uploading the avatar.');
    }
  };

  const closeModal = () => setIsOpenModal(false);

  useEffect(() => {
    if (isUpdated && avatarUrl) {
      handleSubmit().then(() => {
        setIsUpdated(false);
        // setTimeout(() => {
        //   refreshAvatar();
        // }, 1000);
        refreshAvatar();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated, avatarUrl, refreshAvatar]);

  return (
    <div className="profile-image">
      <img
        className="profile-pic"
        src={avatarUrl || defaultUserUrl}
        onClick={updateAvatar}
        alt="ProfileImage"
      />
      <Modal open={isOpenModal} onClose={closeModal}>
        <UploadAvatar
          onCloseModal={closeModal}
          onImageUpload={handleImageUpload}
        />
      </Modal>
    </div>
  );
}

export default ProfileImage;
