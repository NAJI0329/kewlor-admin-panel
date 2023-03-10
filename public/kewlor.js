const messageDiv = document.createElement("div");
messageDiv.innerHTML = `
<div class="kewlor-message-button">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square">
<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
</svg> </div>`;

document.body.appendChild(messageDiv);

const formDiv = document.createElement("div");
formDiv.innerHTML = `
  <div id="kewlor-modal" class="kewlor-modal">
    <!-- Modal content -->
    <div class="kewlor-modal-content">
      <div class="kewlor-modal-header">
        <p>Text us!</p>
        <span class="kewlor-modal-close">&times;</span> 
      </div>
      <form
        class="kewlor-form"
        action="javascript:onkewlorCreateConversation()"
      >
      <p class="kewlor-success-text">Successfully sent.</p>
        <div class="kewlor-input-group">
            <input type="text" class="kewlor-input" id="kewlor-fullname" placeholder="First and Last Name" required/>
        </div>
        <div class="kewlor-input-group">
            <input type="tel" class="kewlor-input" id="kewlor-phonenumber" placeholder="Phone Number" required>
        </div>
        <div class="kewlor-input-group">
            <textarea
            class="kewlor-input"
            rows="6"
            id="kewlor-message"
            required
            placeholder="How can we help you?"
            ></textarea>
        </div>
        <div class="kewlor-form-footer">
            <input type="submit" class="kewlor-submit-btn" id="kewlor-submit-btn" value="Submit" />
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
var span = document.getElementsByClassName("kewlor-modal-close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "flex";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetInputs();
  }
};

// When the user clicks the button, open the modal
span.onclick = function () {
  modal.style.display = "none";
  resetInputs();
};

async function onkewlorCreateConversation() {
  const name = document.getElementById("kewlor-fullname").value;
  const phonenumber = document.getElementById("kewlor-phonenumber").value;
  const message = document.getElementById("kewlor-message").value;
  const clientId = document.getElementById("kewlor-clientId").value;

  document.getElementById("kewlor-submit-btn").value = "Loading...";
  const res = await fetch("http://127.0.0.1:1000/api/conversation", {
    method: "POST",
    body: JSON.stringify({
      phonenumber: phonenumber,
      clientId: clientId,
      message: message,
      name: name,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
  document.getElementById("kewlor-submit-btn").value = "Submit";
  if (res.status === 200) {
    const SuccessText = document.getElementsByClassName(
      "kewlor-success-text"
    )[0];
    SuccessText.style.display = "block";
    setTimeout(() => {
      SuccessText.style.display = "none";
    }, [1000]);

    resetInputs();
  }
}

function resetInputs() {
  document.getElementById("kewlor-fullname").value = "";
  document.getElementById("kewlor-phonenumber").value = "";
  document.getElementById("kewlor-message").value = "";
}
