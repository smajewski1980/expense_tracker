export default function toasty(message) {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        "linear-gradient(to top, rgba(194, 91, 78, 1), rgba(131, 60, 60, 1)",
      padding: ".5rem .75rem .5rem 2.25rem",
      textIndent: "-1.5rem",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
