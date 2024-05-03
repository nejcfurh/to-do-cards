'use strict';

// our own date module

export const getDate = function () {
  const today = new Date();

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return today.toLocaleDateString('en-US', options);
};

export const getDay = function () {
  const today = new Date();

  const options = {
    weekday: 'long',
  };

  return today.toLocaleDateString('en-US', options);
};
