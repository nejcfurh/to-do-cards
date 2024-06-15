import styled, { createGlobalStyle } from 'styled-components';
import { HiOutlineLogin, HiOutlineUpload } from 'react-icons/hi';
import { useState } from 'react';
import supabase from '../services/supabase';
import SpinnerMini from './SpinnerMini';

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

const DropzoneGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: all 0.5s ease-in-out;
`;

const DropzoneArea = styled.div`
  padding: 1rem;
  position: relative;
  min-height: 4rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: 2px dashed var(--dropzone-border);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: -webkit-fill-available;

  &:hover {
    background: var(--dropzone-over);
  }
`;

const FileInfo = styled.p`
  font-size: 1.3rem;
  color: 'white';
  font-weight: 200;
`;

const FileInput = styled.input`
  cursor: pointer;
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const FileUploadIcon = styled.div`
  svg {
    height: 3rem;
    max-width: 3rem;
    width: 100%;
    margin-right: 20px;
    stroke: var(--headline);
  }
`;

const ImagePreviewContainer = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--dropzone-border);
  border-radius: 1rem;
  background: var(--dropzone-bg);
  margin-left: 15px;
`;

const ImagePreview = styled.img`
  max-height: 100px;
  max-width: 100px;
  border-radius: 2rem;
  padding: 18px;
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

const AlertMessage = styled.div`
  color: #ff0000cd;
  background: #f8d7da;
  border: 1px solid #f5c2c7;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  text-align: center;
  width: 100%;
`;

// eslint-disable-next-line react/prop-types
function UploadAvatar({ onCloseModal, onImageUpload }) {
  const [fileInfo, setFileInfo] = useState('No Files Selected');
  const [previewSrc, setPreviewSrc] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [dropzoneOver, setDropzoneOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      validateImageDimensions(file);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateImageDimensions(file);
    }
    setDropzoneOver(false);
  };

  const validateImageDimensions = file => {
    const reader = new FileReader();

    reader.onload = e => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        if (img.width >= MIN_WIDTH && img.height >= MIN_HEIGHT) {
          setFileInfo(`${file.name}, ${Math.round(file.size / 1024)} KB`);
          setPreviewSrc(e.target.result);
          setAlertMessage('');
          setSelectedFile(file);
        } else {
          setAlertMessage(
            `Image dimensions must be at least ${MIN_WIDTH}x${MIN_HEIGHT} pixels.`
          );
          e.target.value = '';
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDropzoneOver(true);
  };

  const handleDragLeave = () => {
    setDropzoneOver(false);
  };

  const handleReset = () => {
    setFileInfo('No Files Selected');
    setPreviewSrc('');
    setAlertMessage('');
    setSelectedFile(null);
    if (!previewSrc) onCloseModal();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setAlertMessage('No file selected!');
      return;
    }

    setLoading(true);

    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error } = await supabase.storage
      .from('avatar-images')
      .upload(filePath, selectedFile);

    if (error) {
      setAlertMessage('Failed to upload image!');
      console.error('Error uploading file:', error.message);
    } else {
      const { data } = supabase.storage
        .from('avatar-images')
        .getPublicUrl(filePath);

      const imageUrl = data.publicUrl;
      if (onImageUpload) {
        onImageUpload(imageUrl);
      }
      onCloseModal();
    }
    setLoading(false);
  };

  return (
    <>
      <GlobalStyle />
      <DropzoneBox onReset={handleReset} onSubmit={e => e.preventDefault()}>
        <Title>
          <div>Upload an avatar image ...</div>
          <ExitIcon>
            <HiOutlineLogin onClick={onCloseModal} />
          </ExitIcon>
        </Title>
        <Subtitle>
          Drag & drop the image into the area, or click on the icon below!
        </Subtitle>
        <DropzoneGroup>
          <DropzoneArea
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={dropzoneOver ? 'dropzone--over' : ''}
          >
            <FileUploadIcon>
              <HiOutlineUpload />
            </FileUploadIcon>
            <FileInput
              type="file"
              required
              id="upload-file"
              name="uploaded-file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <FileInfo style={{ color: 'white' }}>{fileInfo}</FileInfo>
          </DropzoneArea>
          <ImagePreviewContainer
            id="image-preview-container"
            show={!!previewSrc}
          >
            <ImagePreview
              id="image-preview"
              src={previewSrc}
              alt="Image Preview"
            />
          </ImagePreviewContainer>
        </DropzoneGroup>
        {alertMessage && (
          <AlertMessage id="alert-message">{alertMessage}</AlertMessage>
        )}
        <DropzoneActions>
          <ActionButton type="reset">Cancel</ActionButton>
          <ActionButton type="submit" onClick={handleUpload}>
            {!loading ? 'Upload' : <SpinnerMini />}
          </ActionButton>
        </DropzoneActions>
      </DropzoneBox>
    </>
  );
}

export default UploadAvatar;
