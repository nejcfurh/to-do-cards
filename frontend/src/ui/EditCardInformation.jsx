/* eslint-disable react/prop-types */
import styled, { createGlobalStyle } from 'styled-components';
import { HiOutlineLogin } from 'react-icons/hi';
import { useState } from 'react';
import SpinnerMini from './SpinnerMini';
import toast from 'react-hot-toast';

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
  width: 44rem;
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
  font-weight: 300;
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
  const { name, body, _id } = list;
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState(name);
  //   const [listImg, setListImg] = useState(url);
  const [listBody, setListBody] = useState(body);

  const handleReset = () => {
    onClose();
  };

  //   const handleUpload = () => {
  //     console.log('picture upload triggered');
  //   };

  //   const handleUpdateInformation = () => {
  //     console.log('click for update registered!');
  //   };

  //   const truncatedListImg =
  //     listImg.length > 10 ? `${listImg.substring(0, 55)}...` : listImg;

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
          body: JSON.stringify({ listId, listName, listBody }),
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
          <div>Update card information ...</div>
          <ExitIcon>
            <HiOutlineLogin onClick={onClose} />
          </ExitIcon>
        </Title>
        <Subtitle>
          Below you can update name or the subtitle of the card!
        </Subtitle>
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
        <br />
        {/* <div className="input-upload">
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
          <HiOutlineUpload className="upload-icon" onClick={handleUpload} />
        </div> */}
        <br />
        <input
          className="edit-body-input"
          type="text"
          name="listBody"
          placeholder="Description"
          autoComplete="off"
          value={listBody}
          onChange={e => setListBody(e.target.value)}
        />
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
