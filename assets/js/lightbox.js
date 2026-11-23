/* Lightbox: any .zoom button in a case study opens its image full window.
   A native <dialog> gives us focus trapping, Escape and the top layer for free.
   Click anywhere, press Escape or use Close to put it back. */
(function () {
  var buttons = document.querySelectorAll(".case-study .zoom, .blog-post .zoom");
  if (!buttons.length || typeof HTMLDialogElement === "undefined") return;

  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var opener = null;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Image, full window");
  dialog.innerHTML =
    '<button type="button" class="lightbox-close">Close <span aria-hidden="true">&times;</span></button>' +
    '<figure class="lightbox-figure">' +
      '<img class="lightbox-img" alt="">' +
      '<figcaption class="lightbox-caption"></figcaption>' +
    "</figure>";
  document.body.appendChild(dialog);

  var img = dialog.querySelector(".lightbox-img");
  var caption = dialog.querySelector(".lightbox-caption");
  var closeBtn = dialog.querySelector(".lightbox-close");

  function open(btn) {
    var thumb = btn.querySelector("img");
    opener = btn;
    img.src = btn.getAttribute("data-zoom");
    img.alt = thumb ? thumb.alt : "";
    var ground = thumb ? getComputedStyle(thumb).backgroundColor : "";
    if (ground) img.style.setProperty("--lb-ground", ground); // keep the plate the screen sat on
    var text = btn.getAttribute("data-zoom-caption") || "";
    caption.textContent = text;
    caption.hidden = !text;
    document.documentElement.classList.add("lightbox-open");
    dialog.showModal();
    closeBtn.focus({ preventScroll: true });
    requestAnimationFrame(function () { dialog.classList.add("is-open"); });
  }

  function close() {
    if (!dialog.open) return;
    dialog.classList.remove("is-open");
    var done = function () {
      dialog.close();
      document.documentElement.classList.remove("lightbox-open");
      if (opener) opener.focus({ preventScroll: true });
    };
    if (still) done(); else setTimeout(done, 180);
  }

  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener("click", function () { open(btn); });
  });

  dialog.addEventListener("click", close);            // anywhere, including the image
  dialog.addEventListener("cancel", function (e) { e.preventDefault(); close(); });
})();
