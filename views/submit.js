// Client side unique ID - This could and probably should move to server with UUID
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

document.getElementById("submitBtn").addEventListener("click", () => {
  let postid = uuidv4();
  let inputElem = document.getElementById("imgfile");
  let file = inputElem.files[0];
  // Create new file so we can rename the file
  let blob = file.slice(0, file.size, "image/jpeg");
  newFile = new File([blob], `${postid}_post.jpeg`, { type: "image/jpeg" });
  // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
  let formData = new FormData();
  formData.append("imgfile", newFile);
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then(loadPosts());
});
// Loads the posts on page load
function loadPosts() {
  fetch("/upload")
    .then((res) => res.json())
    .then((x) => {
      for (y = 0; y < x[0].length; y++) {
        console.log(x[0][y]);
        const newimg = document.createElement("img");
        newimg.setAttribute(
          "src",
          "https://storage.googleapis.com/dansstorage/" + x[0][y].id
        );
        newimg.setAttribute("width", 50);
        newimg.setAttribute("height", 50);
        document.getElementById("images").appendChild(newimg);
      }
    });
}
