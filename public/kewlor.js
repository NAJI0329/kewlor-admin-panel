const messageDiv = document.createElement("div");
messageDiv.innerHTML = `<button class="kewlor-message-button">Open Modal</button>`;

document.body.appendChild(messageDiv);

const formDiv = document.createElement("div");
formDiv.innerHTML = `
  <div id="kewlor-modal" class="kewlor-modal">
    <!-- Modal content -->
    <div class="kewlor-modal-content">
        <!-- <span class="close">&times;</span> -->
        <form
            class="kewlor-form"
            action="javascript:onkewlorCreateConversation()"
        >
            <div class="kewlor-input-group">
                <p class="kewlor-label">Full Name</p>
                <input type="text" class="kewlor-input" id="kewlor-fullname" required/>
            </div>
            <div class="kewlor-input-group">
                <p class="kewlor-label">Phone Number</p>
                <input type="text" class="kewlor-input" id="kewlor-phonenumber" required />
            </div>
            <div class="kewlor-input-group">
                <p class="kewlor-label">Message</p>
                <textarea
                class="kewlor-input"
                rows="4"
                id="kewlor-message"
                required
                ></textarea>
            </div>
            <input
                type="hidden"
                value="6409029d6198fb28484d28b3"
                id="kewlor-clientId"
            />
            <div class="kewlor-form-footer">
                <input type="submit" class="kewlor-submit-btn" />
            </div>
        </form>
    </div>
  </div>
`;
document.body.appendChild(formDiv);

// Get the modal
var modal = document.getElementById("kewlor-modal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("kewlor-message-button")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "flex";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function onkewlorCreateConversation() {
  const name = document.getElementById("kewlor-fullname").value;
  const phonenumber = document.getElementById("kewlor-phonenumber").value;
  const message = document.getElementById("kewlor-message").value;
  const clientId = document.getElementById("kewlor-clientId").value;
  const res = await fetch("http://173.230.147.100:1000/api/conversation", {
    method: "POST",
    body: JSON.stringify({
      phonenumber: phonenumber,
      clientId: clientId,
      message: message,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (res.status === 200) {
    document.getElementById("kewlor-fullname").value = "";
    document.getElementById("kewlor-phonenumber").value = "";
    document.getElementById("kewlor-message").value = "";
  }
}
