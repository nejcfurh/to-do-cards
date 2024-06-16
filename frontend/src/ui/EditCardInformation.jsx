/* eslint-disable react/prop-types */
import styled, { createGlobalStyle } from 'styled-components';
import { HiOutlineLogin, HiOutlineUpload } from 'react-icons/hi';
import { useRef, useState } from 'react';
import SpinnerMini from './SpinnerMini';
import toast from 'react-hot-toast';
import supabase from '../services/supabase';

const MIN_WIDTH = 700;
const MIN_HEIGHT = 700;

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #2b2a2a;
    --primary-hover: ##111111;
    --bg: #111315;
    --secondary: #63636355;
    --secondary-hover: #e52d27;
    --dropzone-bg: #111111;
    --gray: #D3D3D3;
    --border: #333333;
    --dropzone-border: #FFF;
    --headline: #FFF;
    --text: #FFF;
    --primary-text: #F2F7FE;
    --dropzone-over: var(--secondary);
  }

  *::selection {
    background: var(--primary);
    color: var(--btn-text);
  }
`;

const DropzoneBox = styled.form`
  border-radius: 0.8rem;
  padding: 2.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 32rem;
  box-shadow: 0px 0px 20px 12px rgba(255, 254, 254, 0.2);
  background: var(--dropzone-bg);
`;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  margin-bottom: 0.7rem;
  color: var(--headline);
  margin-top: 0;
  font-weight: 200;
`;

const Subtitle = styled.h5`
  font-size: 1rem;
  color: var(--gray);
  font-weight: 200;
  margin-top: 0;
  margin-bottom: 2rem;
  /* text-align: center; */
`;

const DropzoneActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  font-family: 'Roboto', sans-serif;
  flex-grow: 1;
  font-size: 1.1rem;
  font-weight: 200;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;

  ${({ type }) =>
    type === 'reset' &&
    `
    border-radius: 20px;
    color: var(--text);
    background: var(--secondary);
    cursor: pointer;
    border: 1px solid var(--border);

    &:hover {
      background: var(--secondary-hover);
      opacity: 0.8;
    }
  `}

  ${({ type }) =>
    type === 'submit' &&
    `
    background: var(--primary);
    border-radius: 20px;
    padding: 1rem 2rem;
    color: var(--text);
    cursor: pointer;
    border: 1px solid var(--border);

    &:hover {
      background: var(--primary-hover);
      background: #2e962a;
      opacity: 0.8;
    }
  `}
`;

const ExitIcon = styled.div`
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.4;
  }
`;

// eslint-disable-next-line react/prop-types
function EditCardInformation({ onClose, list, setLists, setDaily }) {
  const { name, body, _id, url } = list;
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState(name);
  const [listImg, setListImg] = useState(url);
  const [listBody, setListBody] = useState(body);
  const inputFile = useRef(null);

  const handleReset = () => {
    onClose();
  };

  const onUploadButtonClick = () => {
    console.log('click');
    inputFile.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      validateImageDimensions(file);
    }
  };

  const validateImageDimensions = file => {
    const reader = new FileReader();

    reader.onload = e => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        if (img.width >= MIN_WIDTH && img.height >= MIN_HEIGHT) {
          return file;
        } else {
          e.target.value = '';
        }
      };
    };

    reader.readAsDataURL(file);
    handleUpload(file);
  };

  const handleUpload = async file => {
    setLoading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error } = await supabase.storage
      .from('card-images')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading file:', error.message);
    } else {
      const { data } = supabase.storage
        .from('card-images')
        .getPublicUrl(filePath);

      const imageUrl = data.publicUrl;
      if (imageUrl) {
        setListImg(imageUrl);
      }
    }
    setLoading(false);
  };

  const truncatedListImg =
    listImg.length > 10 ? `${listImg.substring(0, 38)}...` : listImg;

  // UPDATING THE CARD
  const handleUpdate = async (event, listId) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/todos/updateCard`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listId, listName, listBody, listImg }),
        }
      );
      const data = await response.json();
      if (data.success) {
        onClose();
        setLoading(false);
        setLists(data.data);
        setDaily(data.defaultListName);
        toast.success('List information updated!');
      } else {
        console.error('Failed to update card!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <DropzoneBox
        onReset={handleReset}
        onSubmit={e => handleUpdate(e, _id)}
        value={_id}
        action="/api/todos/updateCard"
        method="put"
      >
        <Title>
          Update information for &quot;{name}&quot;
          <ExitIcon>
            <HiOutlineLogin onClick={onClose} />
          </ExitIcon>
        </Title>
        <Subtitle>
          {name === 'Daily'
            ? `On the "${name}" list you can only update the background image!`
            : `Update name, image, or the subtitle of "${name}" list!`}
        </Subtitle>
        {name === 'Daily' ? null : (
          <input
            className="edit-name-input"
            type="text"
            name="listName"
            placeholder="Name"
            autoComplete="off"
            required="required"
            value={listName}
            onChange={e => setListName(e.target.value)}
          />
        )}
        <br />
        <div className="input-upload">
          <input
            className="edit-url-input"
            type="url"
            name="listImg"
            placeholder="Image (url)"
            autoComplete="off"
            required="required"
            value={truncatedListImg}
            onChange={e => setListImg(e.target.value)}
          />
          <input
            type="file"
            ref={inputFile}
            id="upload-file"
            name="uploaded-file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <HiOutlineUpload
            className="upload-icon"
            onClick={onUploadButtonClick}
          />
        </div>
        <br />
        {name === 'Daily' ? null : (
          <input
            className="edit-body-input"
            type="text"
            name="listBody"
            placeholder="Description"
            autoComplete="off"
            value={listBody}
            onChange={e => setListBody(e.target.value)}
          />
        )}
        <DropzoneActions>
          <ActionButton type="reset">Cancel</ActionButton>
          <ActionButton type="submit">
            {!loading ? 'Update' : <SpinnerMini />}
          </ActionButton>
        </DropzoneActions>
      </DropzoneBox>
    </>
  );
}

export default EditCardInformation;
