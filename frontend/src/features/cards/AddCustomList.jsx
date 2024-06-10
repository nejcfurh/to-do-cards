/* eslint-disable react/prop-types */
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineUpload } from 'react-icons/hi';
import Modal from '../../ui/Modal';
import UploadImage from '../../ui/UploadImage';

function AddCustomList({ setDaily, setLists }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listName, setListName] = useState('');
  const [listImg, setListImg] = useState('');
  const [listBody, setListBody] = useState('');

  const handleRadioChange = event => {
    setDaily(event.target.id);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = {
      listName,
      listImg,
      listBody,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/todos/addCard`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setLists(data.data);
      setDaily(data.defaultListName);
      setListBody('');
      setListImg('');
      setListName('');
      toast.success('List created succesfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpload = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleImageUpload = url => {
    setListImg(url);
  };

  const closeModal = () => setIsOpenModal(false);

  const truncatedListImg =
    listImg.length > 10 ? `${listImg.substring(0, 17)}...` : listImg;

  return (
    <>
      <input
        type="radio"
        name="slide"
        id="addList"
        onChange={handleRadioChange}
      />
      <label htmlFor="addList" className="card">
        <div className="form-title-flex">
          <div className="title-div-add">
            <h4 className="title-add">ADD A CUSTOM LIST</h4>
          </div>
          <div className="card-form">
            <form
              className="card-item"
              action="/api/todos/addCard"
              method="post"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="listName"
                placeholder="Name"
                autoComplete="off"
                required="required"
                value={listName}
                onChange={e => setListName(e.target.value)}
              />
              <br />
              <div className="input-upload">
                <input
                  type="url"
                  name="listImg"
                  placeholder="Image (url)"
                  autoComplete="off"
                  required="required"
                  value={truncatedListImg}
                  onChange={e => setListImg(e.target.value)}
                />
                <HiOutlineUpload
                  className="upload-icon"
                  onClick={handleUpload}
                />
              </div>
              <br />
              <input
                type="text"
                name="listBody"
                placeholder="Description"
                autoComplete="off"
                value={listBody}
                onChange={e => setListBody(e.target.value)}
              />
              <br />
              <button
                className="button-add-list"
                type="submit"
                name="list"
                value="accept"
              >
                Add List
              </button>
            </form>
          </div>
        </div>
        <div className="row-add">
          <div className="description-add">
            <p>You can add additional lists here!</p>
          </div>
        </div>
        <Modal open={isOpenModal} onClose={closeModal}>
          <UploadImage
            onCloseModal={closeModal}
            onImageUpload={handleImageUpload}
          />
        </Modal>
      </label>
    </>
  );
}

export default AddCustomList;
