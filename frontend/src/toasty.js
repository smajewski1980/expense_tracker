export default function toasty(message, bgColor, outlineClr) {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bgColor,
      outline: `2px solid ${outlineClr}`,
      padding: ".5rem .75rem .5rem 2.25rem",
      textIndent: "-1.5rem",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
