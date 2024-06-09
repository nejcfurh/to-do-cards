/* eslint-disable react/prop-types */

import { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
`;

function AddTask({ list, setLists, setDaily }) {
  const { name } = list;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  // CREATING THE TASK
  const handleCreate = async event => {
    event.preventDefault();
    const newItem = event.target.newItem.value;
    const listName = name;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/todos/addItems`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newItem: newItem,
            list: listName,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setLists(data.data);
        setDaily(data.defaultListName);
        setInputValue('');
        toast.success('Task created succesfully!');
      } else {
        throw new Error(data.message || 'Failed to create item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      id="add-task-input"
      className="card-task-input"
      onSubmit={handleCreate}
    >
      <input
        id="card-task-input-text"
        type="text"
        name="newItem"
        placeholder="New task"
        autoComplete="off"
        required="required"
        value={inputValue}
        onChange={handleInputChange}
      />
      <StyledButton type="submit" name="list" value={name}>
        <img className="add-task-icon" src="../photos/taskAddIcon.png" />
      </StyledButton>
    </form>
  );
}

export default AddTask;
