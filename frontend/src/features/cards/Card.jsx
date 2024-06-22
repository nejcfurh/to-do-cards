/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Tasks from '../tasks/Tasks';
import MultiOptionMenuButton from '../../ui/MultiOptionMenuButton';
import { useState } from 'react';
import Modal from '../../ui/Modal';
import EditCardInformation from '../../ui/EditCardInformation';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  padding-right: 30px;
  cursor: pointer;
`;

function Card({
  list,
  day,
  daily,
  handleDelete,
  handleCreate,
  handleCompleteTask,
  setLists,
  setDaily,
}) {
  const [activeTasks, setActiveTasks] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { name, body, _id, url } = list;

  const handleCloseModal = () => setIsOpenModal(false);
  const handleEditButton = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleRadioChange = event => {
    setDaily(event.target.id);
  };

  return (
    <>
      <input
        type="radio"
        name="slide"
        id={name}
        onChange={handleRadioChange}
        checked={daily === name}
      />
      <label
        htmlFor={name}
        className="card"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div className="above-title-div">
          <div className="title-div">
            <h4 className="title">{name}</h4>
          </div>
          <Tasks
            handleCompleteTask={handleCompleteTask}
            handleCreate={handleCreate}
            _id={_id}
            list={list}
            setDaily={setDaily}
            setLists={setLists}
            active={activeTasks}
          />
        </div>
        <div className="row">
          <div className="icon">
            <MultiOptionMenuButton
              activeTasks={activeTasks}
              setActiveTasks={setActiveTasks}
              name={name}
              modalOpen={handleEditButton}
            />
          </div>
          <div className="description">
            <p> {name === 'Daily' ? day : body} </p>
            <form
              className="delete-button"
              action="/api/todos/deleteCard"
              method="post"
              onSubmit={e => handleDelete(e, _id)}
              value={_id}
            >
              {name === 'Daily' ? null : (
                <StyledButton type="submit" name="card" value={_id}>
                  <img className="delete-icon" src="../photos/deleteIcon.png" />
                </StyledButton>
              )}
            </form>
          </div>
        </div>
        <Modal open={isOpenModal} onClose={handleCloseModal}>
          <EditCardInformation
            list={list}
            onClose={handleCloseModal}
            setLists={setLists}
            setDaily={setDaily}
          />
        </Modal>
      </label>
    </>
  );
}
export default Card;
