function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function generateGradient() {
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();
  const color3 = generateRandomColor();
  return `linear-gradient(to right, ${color1}, ${color2}, ${color3})`;
}

export default {
  mounted(el, binding) {
    const gradient = generateGradient();
    const textColor = binding.value || "#FFFFFF";

    el.style.background = gradient;
    el.style.webkitBackgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";
    el.style.color = textColor;
    el.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
    el.style.fontWeight = "bold";
    el.style.padding = "5px";
    el.style.borderRadius = "5px";
    el.style.transition = "all 0.3s ease";

    el.addEventListener("mouseover", () => {
      el.style.transform = "scale(1.05)";
      el.style.textShadow = "3px 3px 6px rgba(0,0,0,0.5)";
    });

    el.addEventListener("mouseout", () => {
      el.style.transform = "scale(1)";
      el.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
    });
  },
};
