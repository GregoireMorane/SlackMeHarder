const scrollToBottomOfElement = container => {
  // scroll to ref instead query selector
  const element = document.querySelector(container);
  element.scrollTop = element.scrollHeight;
};

module.exports = {
  scrollToBottomOfElement,
};
