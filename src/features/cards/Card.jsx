/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useState } from 'react';
import Tasks from '../tasks/Tasks';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  padding-right: 30px;
  cursor: pointer;
`;

function Card({
  list,
  index,
  day,
  daily,
  handleDelete,
  handleCreate,
  handleDeleteTask,
  setLists,
  setDaily,
}) {
  const { name, body, _id, url } = list;
  const [selectedOption, setSelectedOption] = useState(daily);

  const handleRadioChange = event => {
    setSelectedOption(event.target.id);
  };

  return (
    <>
      <input
        type="radio"
        name="slide"
        id={name}
        onChange={handleRadioChange}
        defaultChecked={selectedOption === name}
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
            handleDeleteTask={handleDeleteTask}
            handleCreate={handleCreate}
            _id={_id}
            list={list}
            setDaily={setDaily}
            setLists={setLists}
          />
        </div>
        <div className="row">
          <div className="icon">{index + 1}</div>
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
                  <img
                    className="delete-icon"
                    src="src/assets/photos/deleteIcon.png"
                  />
                </StyledButton>
              )}
            </form>
          </div>
        </div>
      </label>
    </>
  );
}
export default Card;
