const scrollToBottomOfElement = container => {
  const element = document.querySelector(container);
  element.scrollTop = element.scrollHeight;
};

module.exports = {
  scrollToBottomOfElement,
};
