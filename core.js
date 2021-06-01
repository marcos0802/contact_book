const contacts = [];

let contactSurname = document.querySelector("#surname");
let contactName = document.querySelector("#name");
let contactGroup = document.querySelector("#group");
let contactBio = document.querySelector("#bio");
let contactPicture = document.querySelector("#input_Imagees");
let selectImage = document.querySelector("#inputImage");

const container = document.querySelector("#contact");
const card = document.createElement("div");
card.classList = "card";

const saveBtn = document.querySelector("#saveBtn");
const resetBtn = document.querySelector("#resetBtn");

selectImage = document
  .querySelector('input[type="file"]')
  .addEventListener("change", function () {
    if (this.files && this.files[0]) {
      contactPicture.onload = () => {
        URL.revokeObjectURL(contactPicture.src); // no longer needed, free memory
      };
      contactPicture.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
  });

function addContact(c_surname, c_name, c_group, c_bio) {
  let contact = {
    surname: c_surname,
    name: c_name,
    group: c_group,
    bio: c_bio,
  };
  return contact;
}

function resetFields() {
  contactSurname.value = "";
  contactGroup.value = "-- Select --";
  contactName.value = "";
  contactBio.value = "";
}

function removeContact(contacts, value) {
  let index = contacts.indexOf(value);
  contacts.splice(index, 1);
  return contacts;
}

function contactCard(contacts) {
  let card_body = document.createElement("div");
  let deleteContactBtn = document.createElement("button");
  card_body.classList = "card-body";
  card_body.style.border = "1px solid #c9c9c9";
  card_body.style.margin = "2px";
  card_body.style.borderRadius = "15px";
  deleteContactBtn.setAttribute("type", "button");
  deleteContactBtn.classList = "btn btn-danger btn-sm";
  deleteContactBtn.style.border = "none";
  deleteContactBtn.style.color = "white";
  deleteContactBtn.innerHTML = "X";

  contacts.forEach((user) => {
    let card_body_row = document.createElement("div");
    let image_column = document.createElement("div");
    let img = document.createElement("img");
    let info = document.createElement("div");
    let info_row = document.createElement("div");
    let names = document.createElement("div");
    let user_names = document.createElement("h5");
    let btnColumn = document.createElement("div");
    let ruler = document.createElement("hr");
    let user_group = document.createElement("h6");
    let bio = document.createElement("p");

    card_body_row.classList = "row";
    image_column.classList = "col-md-2";
    img.setAttribute("src", "images/contact-icon.png");
    img.setAttribute("alt", "User Image");
    img.setAttribute("width", "80");
    img.setAttribute("height", "80");
    info.classList = "col-md-10";
    info_row.classList = "row";
    names.classList = "col-md-10";
    user_names.innerHTML = user.surname + " " + user.name;
    btnColumn.classList = "col-md-2";
    user_group.innerHTML = "Group: " + user.group;
    bio.innerHTML = user.bio;

    card_body_row.appendChild(image_column);
    card_body_row.appendChild(info);
    image_column.appendChild(img);
    info.appendChild(info_row);
    info_row.appendChild(names);
    names.appendChild(user_names);
    info_row.appendChild(btnColumn);
    btnColumn.appendChild(deleteContactBtn);
    info.appendChild(ruler);
    info.appendChild(user_group);
    info.appendChild(bio);
    card_body.appendChild(card_body_row);
    card.appendChild(card_body);

    deleteContactBtn.addEventListener("click", function () {
      card.removeChild(card_body);
      contacts.pop();
    });
  });
  container.appendChild(card);
}

saveBtn.addEventListener("click", function () {
  contacts.push(
    addContact(
      contactSurname.value,
      contactName.value,
      contactGroup.value,
      contactBio.value
    )
  );
  console.table(contacts);
  resetFields();
  contactCard(contacts);
  contacts.pop();
});

resetBtn.addEventListener("click", function () {
  location.reload();
});
