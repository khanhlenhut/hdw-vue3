export default {
  mounted(el) {
    el.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  },
};
