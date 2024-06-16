/* eslint-disable react/prop-types */
import { useState } from 'react';

function MultiOptionMenuButton({ activeTasks, setActiveTasks, modalOpen }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnMouseEnter = () => {
    setIsVisible(true);
  };

  const handleOnMouseLeave = () => {
    setIsVisible(false);
  };

  const toggleActiveTasks = () => {
    setActiveTasks(true);
  };

  const toggleCompletedTasks = () => {
    setActiveTasks(false);
  };

  return (
    <>
      <div
        className="wrapper-menu"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <div className="popup-menu">
          <div className="linee linee1"></div>
          <div className="linee linee2"></div>
          <div className="linee linee3"></div>
        </div>
        {/* <div className={`nav-items items1 ${isVisible ? 'show-menu' : ''}`}>
          <i className="fas fa-edit"></i>
        </div> */}
        <div className={`nav-items items1 ${isVisible ? 'show-menu' : ''}`}>
          {!activeTasks ? (
            <i className="fas fa-tasks" onClick={toggleActiveTasks}></i>
          ) : (
            <i className="fas fa-check" onClick={toggleCompletedTasks}></i>
          )}
        </div>
        <div
          className={`nav-items items2 ${isVisible ? 'show-menu' : ''}`}
          onClick={modalOpen}
        >
          <i className="fas fa-edit"></i>
        </div>
      </div>
    </>
  );
}

export default MultiOptionMenuButton;
