const isUsernameAndHourNeedToBeDisplayed = (index, message, messages) => {
  if (index >= 0) {
    return messages[index].username &&
      messages[index].username === message.username &&
      formatHour(messages[index].updated_at) === formatHour(message.updated_at)
      ? false
      : true;
  }
  return true;
};

const formatHour = date => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return `${hours}:${minutes}`;
};

module.exports = {
  isUsernameAndHourNeedToBeDisplayed,
  formatHour,
};
