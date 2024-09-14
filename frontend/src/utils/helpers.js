'use strict';

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

export const truncateListImgUrl = listImgUrl =>
  listImgUrl.length > 10 ? `${listImgUrl.substring(0, 15)}...` : listImgUrl;
