export default function toasty(message) {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        "linear-gradient(to right, rgb(51, 65, 0), rgba(135, 145, 99, 1)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
