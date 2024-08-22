function signup() {
  //recuperation de données
  var firstName = getValue("firstName");
  var lastName = getValue("lastName");
  var email = getValue("email");
  var password = getValue("password");
  var confirmPassword = getValue("confirmPassword");
  var tel = getValue("tel");
  //validation

  var firstNameIsValide = length(firstName, 2);
  checkCondition(firstNameIsValide, "errorFirstName", "FN should have at least 3 carac")
  var lastNameIsValide = length(lastName, 3);
  checkCondition(lastNameIsValide, "errorLastName", "LN should have at least 3 carac")

  var usersTab = getFromLS("users");
  var isEmailValid = false;
  if (usersTab.length == 0) {
    isEmailValid = true;
  } else {
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].email == email) {
        document.getElementById("emailError").innerHTML =
          "this email already exists";
        document.getElementById("emailError").style.color = "red";
        break;
      } else {
        document.getElementById("emailError").innerHTML = "";
        isEmailValid = true;
      }
    }
  }
  var isPasswordValide = length(password, 5);
  checkCondition(isPasswordValide, "errorpassword", "Pwd should have at least 5 carac")
  var isconfirmpasswordvalide = confirmPwd(password, confirmPassword);
  checkCondition(isconfirmpasswordvalide, "errorConfirmPwd", "Please check pwd")
  var isTelValid = checkTel(tel, 8);
  checkCondition(isTelValid, "telError", "tel should have 8 carac")


  //creation de l'objet
  var usersTab = getFromLS("users");
  if (
    isTelValid &&
    isconfirmpasswordvalide &&
    isPasswordValide &&
    isEmailValid &&
    firstNameIsValide &&
    lastNameIsValide
  ) {
    var user = {
      id: generateID(usersTab) + 1,
      fN: firstName,
      lN: lastName,
      email: email,
      pwd: password,
      cpwd: confirmPassword,
      tel: tel,
      role: "users",
    };
    usersTab.push(user);
    setToLS("users", usersTab);
    window.location.replace("logIn.html");
  }
}
function signupOwner() {
  var firstName = getValue("firstNameOwner");
  var lastName = getValue("lastNameOwner");
  var email = getValue("emailOwner");
  var password = getValue("passwordOwner");
  var tel = getValue("telOwner");
  //validation
  var isFNValid = checkLength(firstName, 3);
  checkCondition(isFNValid, "firstNameOwnerError", "FN should have at least 3 carac");
  //LN at least 4 carac
  var isLNValid = checkLength(lastName, 4);
  checkCondition(isLNValid, "lastNameOwnerError", "LN should have at least 4 carac");
  //uniqueness of email
  var usersTab = getFromLS("users");
  var isEmailValid = false;
  if (usersTab.length == 0) {
    isEmailValid = true;
  } else {
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].email == email) {
        document.getElementById("emailOwnerError").innerHTML =
          "this email already exists";
        document.getElementById("emailOwnerError").style.color = "red";
        break;
      } else {
        document.getElementById("emailOwnerError").innerHTML = "";
        isEmailValid = true;
      }
    }
  }
  //pwd at least 5 carac
  var isPwdValid = checkLength(password, 5);
  checkCondition(isPwdValid, "pwdOwnerError", "Pwd should have at least 5 carac");
  //tel should be = 8
  var isTelValid = checkTel(tel, 8);
  checkCondition(isTelValid, "telOwnerError", "tel should have 8 carac");

  if (isFNValid && isLNValid && isEmailValid && isPwdValid && isTelValid) {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");

    //création de l'objet
    var user = {
      id: generateID(usersTab) + 1,
      fN: firstName,
      lN: lastName,
      email: email,
      pwd: password,
      tel: tel,
      role: "Owner",
      status: "Not validated",
    };
    usersTab.push(user);
    setToLS("users", usersTab);
    location.replace("logIn.html");
  }
}

function signupAdmin() {
  var firstName = getValue("firstNameAdmin");
  var lastName = getValue("lastNameAdmin");
  var email = getValue("emailAdmin");
  var password = getValue("passwordAdmin");

  //validation

  //FN at least 3 carac
  var isFNValid = checkLength(firstName, 3);
  checkCondition(isFNValid, "firstNameAdminError", "FN should have at least 3 carac");
  //LN at least 4 carac
  var isLNValid = checkLength(lastName, 4);
  checkCondition(isLNValid, "lastNameAdminError", "LN should have at least 4 carac");
  //uniqueness of email
  var usersTab = getFromLS("users");
  var isEmailValid = false;
  if (usersTab.length == 0) {
    isEmailValid = true;
  } else {
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].email == email) {
        document.getElementById("emailAdminError").innerHTML =
          "this email already exists";
        document.getElementById("emailAdminError").style.color = "red";
        break;
      } else {
        document.getElementById("emailAdminError").innerHTML = "";
        isEmailValid = true;
      }
    }
  }
  //pwd at least 5 carac
  var isPwdValid = checkLength(password, 5);
  checkCondition(isPwdValid, "pwdAdminError", "Pwd should have at least 5 carac");

  if (isFNValid && isLNValid && isEmailValid && isPwdValid) {
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");

    //création de l'objet
    var user = {
      id: generateID(usersTab) + 1,
      fN: firstName,
      lN: lastName,
      email: email,
      pwd: password,
      role: "Admin",
    };
    usersTab.push(user);
    setToLS("users", usersTab);
    location.replace("logIn.html")
  }
}

function login() {
  //récupération des données
  var email = getValue("emailValue");
  var pwd = getValue("pwdValue");

  //récupérer tous les users enregistrés dans LS
  var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
  var foundUser;
  //vérifier
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].email == email && usersTab[i].pwd == pwd) {
      //connected
      foundUser = usersTab[i];
      break;
    }
  }
  if (foundUser) {
    if (foundUser.role == "users") {
      localStorage.setItem("connectedUserID", foundUser.id);
      location.replace("houses.html")
    } else if (foundUser.role == "Admin") {
      localStorage.setItem("connectedUserID", foundUser.id);
      location.replace("DashboardAdmin.html")
    } else {
      if (foundUser.status == "Not validated") {
        document.getElementById("loginError").innerHTML =
          "account not yet validated";
      } else {
        localStorage.setItem("connectedUserID", foundUser.id);
        location.replace("DashboardOwner.html")
      }
    }
  } else {
    document.getElementById("loginError").innerHTML = "please check email/pwd";
    document.getElementById("loginError").style.color = "red";
  }
}



function addHouses() {
  //récupération des données
  var housename = getValue("housename");
  var adress = getValue("adress");
  var connectedUserID = localStorage.getItem("connectedUserID");
  //validation
  var ishousenameValid = checkLength(housename, 2);
  checkCondition(ishousenameValid, "housenameError", "name should have at least 2 carac");

  var isadressValid = checkLength(adress, 2);
  checkCondition(isadressValid, "adressError", "adress should have at least 2 carac");

  if (
    ishousenameValid &&
    isadressValid

  ) {
    var HousesTab = JSON.parse(localStorage.getItem("houses") || "[]");
    //création de l'objet
    var house = {
      id: generateID(HousesTab) + 1,
      hName: housename,
      adress: adress,
      ownerId: connectedUserID,
    };
    HousesTab.push(house);
    localStorage.setItem("houses", JSON.stringify(HousesTab));
    location.replace("houses.html")
  }
}
function houseOwner() {
  location.replace("houses.html");
}

function displayHouses() {
  var HousesTab = JSON.parse(localStorage.getItem("houses") || "[]");
  var connectedUserID = localStorage.getItem("connectedUserID");
  var content = ``;
  RConnected = searchObjByIdAndKey(connectedUserID, "users");
  if (RConnected.role == "Owner") {
    for (let i = 0; i < HousesTab.length; i++) {
      if (HousesTab[i].ownerId === connectedUserID) {
        content +=
          `<div class="col-lg-4 col-md-6">
          <div class="room-item">
            <img src="img/room/room-1.jpg" alt="">
            <div class="ri-text">
              <h4>${HousesTab[i].hName}</h4>
              <table>
                <tbody>
                  <tr>
                    <td class="r-o">Address:</td>
                    <td>${HousesTab[i].adress}</td>
                  </tr>
                </tbody>
              </table>
              <button class="btn primary-btn" onclick="goToDisplaye(${HousesTab[i].id})">Rooms</button>
            </div>
          </div>           
        </div>`;
      }
    }
  } else {
    for (let i = 0; i < HousesTab.length; i++)
      content +=
        `<div class="col-lg-4 col-md-6">
          <div class="room-item">
            <img src="img/room/room-1.jpg" alt="">
            <div class="ri-text">
              <h4>${HousesTab[i].hName}</h4>
              <table>
                <tbody>
                  <tr>
                    <td class="r-o">Address:</td>
                    <td>${HousesTab[i].adress}</td>
                  </tr>
                </tbody>
              </table>
              <button class="btn primary-btn" onclick="goToDisplaye(${HousesTab[i].id})">Rooms</button>
            </div>
          </div>           
        </div>`;

  }

  document.getElementById("detailsRoom").innerHTML = content;
}

function goToDisplaye(id) {
  var connectedUserID = localStorage.getItem("connectedUserID");
  var obje = searchObjByIdAndKey(connectedUserID, "users");
  if (!obje || (obje.role == "users" || obje.role == "Admin" || obje.role == "")) {
    location.replace("rooms.html");
    localStorage.setItem("displayedHouseId", id);
    console.log(obje.role, "obje.role")
  } else {
    localStorage.setItem("displayedHouseId", id);
    location.replace("AddRoom.html");
  }
}


function addRoom() {
  // Récupération des données
  var Roomname = document.getElementById("Roomname").value;
  var roomprice = document.getElementById("roomprice").value;
  var NbrDePersParChambre = document.getElementById("NbrDePersParChambre").value;
  var connectedUserID = localStorage.getItem("connectedUserID");
  var displayedHouseId = localStorage.getItem("displayedHouseId");

  // Validation
  var isRoomNameValid = checkLength(Roomname, 2);
  if (!isRoomNameValid) {
    document.getElementById("RoomnameError").innerHTML =
      "Le nom doit comporter au moins 2 caractères";
    document.getElementById("RoomnameError").style.color = "red";
    return; // Arrêter la fonction si la validation échoue
  } else {
    document.getElementById("RoomnameError").innerHTML = "";
  }

  var isroompriceValid = checkNumber(roomprice, 0);
  if (!isroompriceValid) {
    document.getElementById("roompriceError").innerHTML = "Le prix doit être > 0";
    document.getElementById("roompriceError").style.color = "red";
    return;
  } else {
    document.getElementById("roompriceError").innerHTML = "";
  }

  var isNbrDePersParChambreValid = checkNumber(NbrDePersParChambre, 1);
  if (!isNbrDePersParChambreValid) {
    document.getElementById("NbrDePersParChambreError").innerHTML =
      "La capacité doit être > 1";
    document.getElementById("NbrDePersParChambreError").style.color = "red";
    return;
  } else {
    document.getElementById("NbrDePersParChambreError").innerHTML = "";
  }

  // Récupérer les chambres existantes pour cette maison
  var roomsTab = JSON.parse(localStorage.getItem("rooms") || "[]");
  var houseRooms = roomsTab.filter(room => room.houseId === displayedHouseId);

  // Vérifier si le nombre de chambres pour cette maison atteint déjà 5
  if (houseRooms.length >= 5) {
    document.getElementById("roomsTabLimit").innerHTML =
      "Vous ne pouvez pas ajouter plus de 5 chambres pour cette maison.";
    document.getElementById("roomsTabLimit").style.color = "red";
    return;
  }

  // Création de l'objet chambre
  var room = {
    id: generateID(roomsTab) + 1,
    Roomname: Roomname,
    roomprice: roomprice,
    NbrDePersParChambre: NbrDePersParChambre,
    houseId: displayedHouseId,
    ownerId: connectedUserID,
    idChambre: genererIdChambre(displayedHouseId, generateID(roomsTab) + 1)
  };

  // Sauvegarde dans localStorage
  roomsTab.push(room);
  localStorage.setItem("rooms", JSON.stringify(roomsTab));
}



function goToDisplayRoom() {
  location.replace("rooms.html");
}
function displayRooms() {
  var roomsTab = JSON.parse(localStorage.getItem("rooms") || "[]");
  var displayedHouseId = localStorage.getItem("displayedHouseId");
  var content = ``;
  for (let i = 0; i < roomsTab.length; i++) {
    if (displayedHouseId === roomsTab[i].houseId) {
      content =
        content +
        `<div class="col-lg-4 col-md-6">
      <div class="room-item">
          <img src="img/room/room-1.jpg" alt="">
          <div class="ri-text">
      <h4>${roomsTab[i].Roomname}</h4>
      <table>
          <tbody>
              <tr>
                  <td class="r-o">Price:</td>
                  <td>${roomsTab[i].roomprice}</td>
              </tr>
              <tr>
                  <td class="r-o">capacity</td>
                  <td>${roomsTab[i].NbrDePersParChambre}</td>
              </tr>
          </tbody>
      </table>
      <button class="btn primary-btn" onclick="goToDisplay(${roomsTab[i].id})">Display</button>
</div>
      </div>           
          </div>
                      </div>
                      `;
    }
  }
  document.getElementById("detRoom").innerHTML = content;
}
function goToDisplay(id) {
  localStorage.setItem("displayedRoomId", id);
  location.replace("room-details.html");
}


function reservationDisplay() {
  var guests = document.getElementById("Guests").value;
  var checkIn = document.getElementById("CheckIn").value;
  var checkOut = document.getElementById("CheckOut").value;
  var displayedHouseId = localStorage.getItem("displayedHouseId");
  var connectedUserID = localStorage.getItem("connectedUserID");
  var displayedRoomId = localStorage.getItem("displayedRoomId");
  var reservationTab = getFromLS("reservation") || [];
  var cap = searchObjByIdAndKey(displayedRoomId, "rooms");

  // Validation
  if (guests === "" || checkIn === "" || checkOut === "") {
    document.getElementById("fillinall").innerHTML =
      "Please fill in all fields.";
    document.getElementById("fillinall").style.color = "red";
    return;
  }

  // Check if check-out date is after check-in date
  if (new Date(checkIn) >= new Date(checkOut)) {
    document.getElementById("reservationError").innerHTML =
      "Check-out date must be after check-in date";
    document.getElementById("reservationError").style.color = "red";
    return;
  } else {
    document.getElementById("reservationError").innerHTML = "";
  }

  // Check if the room is already booked for the specified period
  for (let i = 0; i < reservationTab.length; i++) {
    if (reservationTab[i].roomId === displayedRoomId) {
      if (
        !(
          new Date(checkOut) <= new Date(reservationTab[i].checkIn) ||
          new Date(checkIn) >= new Date(reservationTab[i].checkOut)
        )
      ) {
        document.getElementById("reservationError").innerHTML =
          "This date is invalid";
        document.getElementById("reservationError").style.color = "red";
        return;
      }
    }
  }


  var isGuestsValid = checkNumber(cap.NbrDePersParChambre + 1, guests);
  if (isGuestsValid == false) {
    document.getElementById("guestsError").innerHTML =
      "Guests must be less than capacity";
    document.getElementById("guestsError").style.color = "red";
  } else {
    document.getElementById("guestsError").innerHTML = "";
  }

  var connected = searchObjByIdAndKey(connectedUserID, "users");
  if (isGuestsValid) {
    var reservation = {
      id: generateID(reservationTab) + 1,
      userId: connectedUserID,
      tel: connected.tel,
      houseId: displayedHouseId,
      guests: guests,
      roomId: displayedRoomId,
      checkIn: checkIn,
      checkOut: checkOut,
      numOfNight: Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)),
    };

    // Add reservation to reservationTab
    reservationTab.push(reservation);
    localStorage.setItem("reservation", JSON.stringify(reservationTab));
    location.replace("reservationDetails.html");

    // Clear error message
    document.getElementById("reservationError").innerHTML = "";
  }
}




function setToLS(key, T) {
  localStorage.setItem(key, JSON.stringify(T));
}

function getValue(id) {
  return document.getElementById(id).value;
}
function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function checkNumber(x, n) {
  return x > n;
}
function checkNumber(x, n) {
  return x > n;
}

function checkCondition(a, id, msg) {
  if (a == false) {
    document.getElementById(id).innerHTML = msg;
    document.getElementById(id).style.color = "red";
  } else {
    document.getElementById(id).innerHTML = "";
  }
}
function checkLength(x, n) {
  return x.length > n;
}

function confirmPwd(password, confirmPassword) {
  return password == confirmPassword;
}
function checkTel(ch, x) {
  return ch.length == x;
}

function generateID(T) {
  if (T.length == 0) {
    max = 0;
  } else {
    var max = T[0].id;
    for (let i = 0; i < T.length; i++) {
      if (T[i].id > max) {
        max = T[i].id;
      }
    }
  }
  return max;
}
function setToLS(key, T) {
  localStorage.setItem(key, JSON.stringify(T));
}

function getValue(id) {
  return document.getElementById(id).value;
}
function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function checkCondition(a, id, msg) {
  if (a == false) {
    document.getElementById(id).innerHTML = msg;
    document.getElementById(id).style.color = "red";
  } else {
    document.getElementById(id).innerHTML = "";
  }
}
function length(x, n) {
  return x.length > n;
}

function confirmPwd(password, confirmPassword) {
  return password == confirmPassword;
}
function checkTel(ch, x) {
  return ch.length == x;
}
function genererIdChambre(idMaison, numeroChambre) {
  return "Maison" + idMaison + "-" + numeroChambre;
}

function searchObjByIdAndKey(id, key) {
  var T = getFromLS(key);
  var obj;
  for (let i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      obj = T[i];
      break;
    }
  }
  return obj;
}

function searchPosByIdAndKey(id, key) {
  var T = getFromLS(key);
  var pos;
  for (let i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      pos = i;
      break;
    }
  }
  return pos;
}



function roomNumber(room, houseId) {
  var HousesTab = JSON.parse(localStorage.getItem("houses") || "[]");
  var nbr = 0;
  for (let i = 0; i < HousesTab.length; i++) {
    if (HousesTab[i].id == houseId) {
      nbr = HousesTab[i].NbrDeChambre;
      console.log("houses", nbr);
      break;
    }
  }
  return room <= nbr
}



function displayMyReservation() {
  var connectedUserID = localStorage.getItem("connectedUserID");
  console.log("connectedUserID", connectedUserID);
  var reservationTab = getFromLS("reservation");
  console.log("reservationTab", reservationTab);
  var content = '';
  var s = 0;
  var totalPrice;
  for (let i = 0; i < reservationTab.length; i++) {
    if (reservationTab[i].userId == connectedUserID) {
      totalPrice = reservationTab[i].numOfNight * searchObjByIdAndKey(reservationTab[i].roomId, "rooms").roomprice;
      s = s + totalPrice;
      content = content + `
          <tr>
          <td>
          <h5> ${searchObjByIdAndKey(reservationTab[i].roomId, "rooms").Roomname}</h5>
      </td>
      <td>
      <h5> ${searchObjByIdAndKey(reservationTab[i].houseId, "houses").adress}</h5>
      </td>
      <td>
      <h5>${reservationTab[i].checkIn}</h5>
      </td>
      <td>
      <h5>${reservationTab[i].checkOut}</h5>
      </td>
      <td>
      <h5> ${searchObjByIdAndKey(reservationTab[i].roomId, "rooms").roomprice}</h5>
      </td>
      <td>
      <h5> ${reservationTab[i].numOfNight}</h5>
      </td>
          <td>
          ${totalPrice}
          </td>
          <td>
         <button class="btn btn-danger" onclick="deleteMyOrder(  ${reservationTab[i].id})" >Delete</button>
          </td>
      </tr>
  `
    }
  }
  // console.log('somme', s);
  content = content + `total Sum: ${s}`;
  document.getElementById("reservationDiv").innerHTML = content;
}
// supprimer une commande avec l'id
function deleteMyOrder(id) {
  var reservationTab = getFromLS("reservation");
  var pos = searchPosByIdAndKey(id, "reservation");
  reservationTab.splice(pos, 1);
  setToLS("reservation", reservationTab);
  location.reload();
}


function generateHeader() {
  var connectedUserID = localStorage.getItem("connectedUserID");
  var connectedUser = searchObjByIdAndKey(connectedUserID, "users");
  var header = "";
  //connecté
  if (connectedUserID) {
    //client
    if (connectedUser.role == "users") {
      header = `<nav class="mainmenu mobile-menu">
          <ul>
              <li><a href="./index.html">Home</a></li>
              <li><a href="houses.html">houses</a></li>
              <li><a href="reservationDetails.html">reservation</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="about-us.html">About Us</a></li>
              <li><a href="profile.html">Hello ${connectedUser.fN} ${connectedUser.lN}</a>
              <li><a href="logIn.html";" onclick="logout()">LogOut</a></li>
           </ul>
      </nav>`
    }
    //store
    else if (connectedUser.role == "Owner") {
      header = ` <nav class="mainmenu mobile-menu">
      <ul>
          <li><a href="./index.html">Home</a></li>
          <li><a href="AddHouses.html">Add house</a></li>
          <li><a href="DashboardOwner.html">Dashboard</a></li>
          <li><a href="profile.html">Hello ${connectedUser.fN} ${connectedUser.lN}</a>
          <li><a href="logIn.html";" onclick="logout()">LogOut</a></li>
           <li><a href="./contact.html">Contact</a></li>
         
       </ul>
  </nav>`
    }
    else {
      //admin
      header = ` <nav class="mainmenu mobile-menu">
      <ul>
          <li class="active"><a href="./index.html">Home</a></li>
          <li><a href="DashboardAdmin.html">Dashboard</a></li>
          <li><a href="profile.html"">Hello ${connectedUser.fN} ${connectedUser.lN}</a>
         <li><a href="logIn.html";" onclick="logout()">LogOut</a></li>
           <li><a href="./contact.html">Contact</a></li>
         </ul>
  </nav>`
    }
  }
  //non connecté
  else {
    header = `<nav class="mainmenu mobile-menu">
    <ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="about-us.html">About Us</a></li>
        <li><a href="signUpClient.html">SignUp</a>
        <ul class="dropdown">
            <li><a href="signUpClient.html">SignUp</a></li>
            <li><a href="signUpAdmin.html">SignUp Admin</a></li>
            <li><a href="signUp owner.html">SignUp Owner</a></li>
        </ul>
        </li>
        <li><a href="logIn.html">LogIn</a></li>
        <li><a href="contact.html">Contact</a></li>
     </ul>
</nav>`
  }
  document.getElementById("headerDiv").innerHTML = header;
}

function displayOwnerHouse() {
  var HousesTab = getFromLS("houses");
  var connectedUserID = localStorage.getItem("connectedUserID");
  var content = '';

  //myHouses
  for (let i = 0; i < HousesTab.length; i++) {
    if (HousesTab[i].ownerId == connectedUserID) {
      content = content + `
      <tr>   
      <td>
      <h5>${HousesTab[i].id}</h5>
      </td>
      <td>
      <h5> ${HousesTab[i].hName}</h5>
      </td>
      <td>
      <h5>${HousesTab[i].adress}</h5>
      </td>     
     <td>
       <button class="btn btn-danger" onclick="deleteProductByOwner(${HousesTab[i].id})" >Delete</button>
       <button class="btn btn-warning" onclick="editProductHouses(${HousesTab[i].id}) " >Edit</button>
       <button class="btn btn-warning" onclick="goToDisplaye(${HousesTab[i].id})">Add Room</button>
        </td>
    
  </tr>

      `
    }
  }
  document.getElementById("OwnerHouseDiv").innerHTML = content;
}
function deleteProductByOwner(id) {
  var pos = searchPosByIdAndKey(id, "houses");
  var HousesTab = getFromLS("houses");
  var reservationTab = getFromLS("reservation");
  var roomsTab = getFromLS("rooms");
  var archivedHousesTab = getFromLS("archivedHouses");
  var archivedRoomsTab = getFromLS("archivedRooms");
  var archivedReservationTab = getFromLS("archivedReservation");
  for (let i = roomsTab.length - 1; i >= 0; i--) {
    if (roomsTab[i].houseId == id) {
      var archivedRoom = roomsTab[i];
      archivedRoom.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
      archivedRoomsTab.push(archivedRoom);
      roomsTab.splice(i, 1);
    }
  }
  for (let i = reservationTab.length - 1; i >= 0; i--) {
    if (reservationTab[i].houseId == id) {
      var archivedReservation = reservationTab[i];
      archivedReservation.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
      archivedReservationTab.push(archivedReservation);
      reservationTab.splice(i, 1);
    }
  }
  setToLS('reservation', reservationTab);
  setToLS('rooms', roomsTab);
  setToLS("archivedRooms", archivedRoomsTab);
  setToLS("archivedReservation", archivedReservationTab);
  var archivedHouse = HousesTab[pos];
  archivedHouse.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
  archivedHousesTab.push(archivedHouse);
  HousesTab.splice(pos, 1);
  setToLS("houses", HousesTab);
  setToLS("archivedHouses", archivedHousesTab);
  location.reload();

}

function editProductHouses(id) {
  var houses = searchObjByIdAndKey(id, "houses");
  // console.log("houses", houses);

  var form = `<div class="login_form_inner">
  <h3>Log in to enter</h3>
  <div class="row login_form" >
  <div class="col-md-12 form-group">
  <label>House Name</label>
  <input type="text" class="form-control" id="newName"value=${houses.hName} >
</div>
      <div class="col-md-12 form-group">
          <button type="submit" value="submit"onclick="validateEditHouse(${id})" class="btn btn-success">validate</button>
          <span id="loginError"></span>
      </div>
  </div>
</div>`;
  document.getElementById('formDiv').innerHTML = form;
}

function validateEditHouse(id) {
  var newName = document.getElementById("newName").value;
  var HousesTab = getFromLS('houses');
  for (let i = 0; i < HousesTab.length; i++) {
    if (HousesTab[i].id == id) {
      HousesTab[i].hName = newName;
      break
    }
  }
  setToLS("houses", HousesTab);
  location.reload();
}
function displayOwnerRoom() {
  var roomsTab = getFromLS("rooms");
  var connectedUserID = localStorage.getItem("connectedUserID");
  var content = '';

  //myHouses
  for (let i = 0; i < roomsTab.length; i++) {
    if (roomsTab[i].ownerId == connectedUserID) {
      content = content + `
      <tr>   
      <td>
      <h5>${roomsTab[i].id}</h5>
      </td>
      <td>
      <h5> ${roomsTab[i].Roomname}</h5>
      </td>
      <td>
      <h5>${searchObjByIdAndKey(roomsTab[i].houseId, "houses").hName}</h5>
      </td>    
      <td>
      <h5>${roomsTab[i].NbrDePersParChambre}</h5>
      </td> 
      <td>
      <h5>${roomsTab[i].roomprice}</h5>
      </td>  
     <td>
       <button class="btn btn-danger" onclick="deleteRoomsByOwner(${roomsTab[i].id})" >Delete</button>
       <button class="btn btn-warning" onclick="editRoom(${roomsTab[i].id})" >Edit</button>
       
        </td>
    
  </tr>

      `
    }
  }
  document.getElementById("OwnerRoomDiv").innerHTML = content;
}
function editRoom(id) {
  var rooms = searchObjByIdAndKey(id, "rooms");

  var form = `<div class="login_form_inner">
    <h3>Edit Room</h3>
    <div class="row login_form">
      <div class="col-md-12 form-group">
        <label>Room Name</label>
        <input type="text" class="form-control" id="newRoomName" value="${rooms.Roomname}">
      </div>
      <div class="col-md-12 form-group">
        <label>Capacity</label>
        <input type="text" class="form-control" id="newCapacity" value="${rooms.NbrDePersParChambre}">
      </div>
      <div class="col-md-12 form-group">
        <label>Room Price</label>
        <input type="text" class="form-control" id="newRoomPrice" value="${rooms.roomprice}">
      </div>
      <div class="col-md-12 form-group">
        <button type="button" onclick="validateEdit(${id})" class="btn btn-success">Validate</button>
        <span id="editError"></span>
      </div>
    </div>
  </div>`;
  document.getElementById('roomDiv').innerHTML = form;
}

function validateEdit(id) {
  var newRoomName = document.getElementById("newRoomName").value;
  var newCapacity = document.getElementById("newCapacity").value;
  var newRoomPrice = document.getElementById("newRoomPrice").value;
  var roomsTab = getFromLS('rooms');
  for (let i = 0; i < roomsTab.length; i++) {
    if (roomsTab[i].id == id) {
      roomsTab[i].Roomname = newRoomName;
      roomsTab[i].NbrDePersParChambre = newCapacity;
      roomsTab[i].roomprice = newRoomPrice;
      break;
    }
  }
  setToLS("rooms", roomsTab);
  location.reload();
}

function deleteRoomsByOwner(id) {
  var pos = searchPosByIdAndKey(id, "rooms");
  var roomsTab = getFromLS("rooms");
  var archivedRoomsTab = getFromLS("archivedRooms");
  var archivedReservationTab = getFromLS("archivedReservation");
  var reservationTab = getFromLS("reservation");

  for (let i = reservationTab.length - 1; i >= 0; i--) {
    if (reservationTab[i].roomId == id) {
      var archivedReservation = reservationTab[i];
      archivedReservation.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
      archivedReservationTab.push(archivedReservation);
      reservationTab.splice(i, 1);
    }
  }
  setToLS('reservation', reservationTab);
  setToLS('archivedReservation', archivedReservationTab);
  var archivedRoom = roomsTab[pos];
  archivedRoom.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
  archivedRoomsTab.push(archivedRoom);
  roomsTab.splice(pos, 1);
  setToLS('rooms', roomsTab);
  setToLS('archivedRooms', archivedRoomsTab);
  location.reload();
}




//afficher au owner les Reservation 
function displayOwnerReservation() {
  var HousesTab = getFromLS("houses");
  var connectedUserID = localStorage.getItem("connectedUserID");
  var myHouses = [];
  //myHouses
  for (let i = 0; i < HousesTab.length; i++) {
    if (HousesTab[i].ownerId == connectedUserID) {
      myHouses.push(HousesTab[i]);
    }
    console.log(myHouses, "myHouses")
  }


  //chercher myReservation
  var reservationTab = getFromLS("reservation");
  var content = "";
  for (let i = 0; i < reservationTab.length; i++) {
    for (let j = 0; j < myHouses.length; j++) {
      if (myHouses[j].id == reservationTab[i].houseId) {
        //myReservation
        content = content + `
         <tr>
           <td>
         ${searchObjByIdAndKey(reservationTab[i].userId, "users").fN} 
         </td>
         <td> 
         ${searchObjByIdAndKey(reservationTab[i].userId, "users").lN} 

         </td>
         <td>
     ${reservationTab[i].tel}
     </td>
     <td>
         ${reservationTab[i].checkIn
          }
         </td>
         <td>
         ${reservationTab[i].checkOut
          }
         </td>
         <td>
         <h5> ${myHouses[j].hName}</h5>
     </td>

         <td>
         <h5>  ${reservationTab[i].houseId}</h5>
     </td>
     
     <td>
     ${searchObjByIdAndKey(reservationTab[i].roomId, "rooms").Roomname}
         </td>
    
         <td>
         ${searchObjByIdAndKey(reservationTab[i].roomId, "rooms").roomprice}
         </td>
         <td>
         ${reservationTab[i].numOfNight}
         </td>
         <td>
         ${reservationTab[i].numOfNight * searchObjByIdAndKey(reservationTab[i].roomId, "rooms").roomprice}
         </td>
         <td>
       <button class="btn btn-danger" onclick="deleteMyOrder( ${reservationTab[i].id})" >Delete</button>
        </td>
        
     </tr>`
      }
    }
  }
  document.getElementById("ownerReservationDiv").innerHTML = content;
}


//afficher tous les Maisons à l'admin
function displayAdminHouse() {
  var HousesTab = getFromLS("houses");
  var content = '';

  //myHouses
  for (let i = 0; i < HousesTab.length; i++) {

    content = content + `
      <tr>   
      <td>
      <h5>${HousesTab[i].id}</h5>
      </td>
      <td>
      <h5> ${searchObjByIdAndKey(HousesTab[i].ownerId, "users").fN}  ${searchObjByIdAndKey(HousesTab[i].ownerId, "users").lN}</h5>
      </td>
      <td>
      <h5> ${HousesTab[i].hName}</h5>
      </td>
      <td>
      <h5>${HousesTab[i].adress}</h5>
      </td>     
      <td>
       <button class="btn btn-danger" onclick="deleteProductByOwner(${HousesTab[i].id})" >Delete</button>
        </td>
    
  </tr>

      `
  }
  document.getElementById("AdminHouseDiv").innerHTML = content;
}
function displayAdminRoom() {
  var roomsTab = getFromLS("rooms");
  var content = '';

  //myHouses
  for (let i = 0; i < roomsTab.length; i++) {

    content = content + `
      <tr>   
      <td>
      <h5>${searchObjByIdAndKey(roomsTab[i].ownerId, "users").fN} ${searchObjByIdAndKey(roomsTab[i].ownerId, "users").lN}</h5>
      </td>
      <td>
      <h5> ${searchObjByIdAndKey(roomsTab[i].houseId, "houses").hName}</h5>
      </td>
      <td>
      <h5> ${roomsTab[i].Roomname}</h5>
      </td>
      <td>
      <h5>${roomsTab[i].NbrDePersParChambre}</h5>
      </td>   
      <td>
      <h5>${roomsTab[i].roomprice}</h5>
      </td>  
      <td>
       <button class="btn btn-danger" onclick="deleteRoomsByOwner(${roomsTab[i].id})" >Delete</button>
       <button class="btn btn-warning" onclick="editRoom(${roomsTab[i].id})" >Edit</button>
        </td>
    
  </tr>

      `
  }
  document.getElementById("AdminRoomDiv").innerHTML = content;
}
function editRoom(id) {
  var rooms = searchObjByIdAndKey(id, "rooms");

  var form = `<div class="login_form_inner">
    <h3>Edit Room</h3>
    <div class="row login_form">
      <div class="col-md-12 form-group">
        <label>Room Name</label>
        <input type="text" class="form-control" id="newRoomName" value="${rooms.Roomname}">
      </div>
      <div class="col-md-12 form-group">
        <label>Capacity</label>
        <input type="text" class="form-control" id="newCapacity" value="${rooms.NbrDePersParChambre}">
      </div>
      <div class="col-md-12 form-group">
        <label>Room Price</label>
        <input type="text" class="form-control" id="newRoomPrice" value="${rooms.roomprice}">
      </div>
      <div class="col-md-12 form-group">
        <button type="button" onclick="validateEdit(${id})" class="btn btn-success">Validate</button>
        <span id="editError"></span>
      </div>
    </div>
  </div>`;
  document.getElementById('roomByAdminDiv').innerHTML = form;
}

function displayAdminUsers() {
  var usersTab = getFromLS('users');
  var content = '';
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].role != 'Admin') {
      if (usersTab[i].role == "Owner" && usersTab[i].status == "Not validated") {
        content = content + `
          <tr>
          <td>
             ${usersTab[i].id}
          </td>
          <td>
              <h5>   ${usersTab[i].fN}  ${usersTab[i].lN}</h5>
          </td>
          <td>
          <h5>  ${usersTab[i].email}</h5>
      </td>
  
          <td>
          ${usersTab[i].tel}
          </td>
          <td>
          ${usersTab[i].role}
          </td>
          <td>
          ${usersTab[i].status}
          </td>
          <td>
         <button class="btn btn-danger" onclick="deleteUserByAdmin(${usersTab[i].id},'users')" >Delete</button>
         <button class="btn btn-warning" onclick="validateOwner( ${usersTab[i].id}) " >Validate</button>
          </td>
      </tr>
  
          `
      }
      else {
        content = content + `
          <tr>
          <td>
             ${usersTab[i].id}
          </td>
          <td>
              <h5>${usersTab[i].fN} ${usersTab[i].lN}</h5>
         </td>
          <td>
          <h5>  ${usersTab[i].email}</h5>
      </td>
  
          <td>
          ${usersTab[i].tel}
          </td>
          <td>
          ${usersTab[i].role}
          </td>
          <td>
         <button class="btn btn-danger" onclick="deleteUserByAdmin(${usersTab[i].id},'users')" >Delete</button>
       
          </td>
      </tr>
  
          `
      }
    }

  }

  document.getElementById('usersAdminDiv').innerHTML = content;
}

function validateOwner(id) {
  var usersTab = getFromLS("users");
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].id == id) {
      usersTab[i].status = "validated";
      break;
    }

  }
  setToLS("users", usersTab);
  location.reload();
}


function deleteUserByAdmin(id) {
  var pos = searchPosByIdAndKey(id, "users");
  var HousesTab = getFromLS("houses");
  var usersTab = getFromLS("users");
  var reservationTab = getFromLS("reservation");
  var roomsTab = getFromLS("rooms");
  var archivedHousesTab = getFromLS("archivedHouses");
  var archivedRoomsTab = getFromLS("archivedRooms");
  var archivedReservationTab = getFromLS("archivedReservation");
  var archivedUserTab = getFromLS("archivedUser");

  //   // Supprimer les réservations associées aux maisons de l'utilisateur
  for (let j = 0; j < HousesTab.length; j++) {
    if (HousesTab[j].ownerId == id) {
      for (let i = reservationTab.length - 1; i >= 0; i--) {
        if (reservationTab[i].houseId == HousesTab[j].id) {
          var archivedReservation = reservationTab[i];
          archivedReservation.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
          archivedReservationTab.push(archivedReservation);
          reservationTab.splice(i, 1);
        }
      }
    }
  }
  //   // Supprimer les chambres associées aux maisons de l'utilisateur
  for (let i = roomsTab.length - 1; i >= 0; i--) {
    if (roomsTab[i].ownerId == id) {
      var archivedRoom = roomsTab[i];
      archivedRoom.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
      archivedRoomsTab.push(archivedRoom);
      roomsTab.splice(i, 1);
    }
  }
  //   // Supprimer les maisons appartenant à l'utilisateur
  for (let i = HousesTab.length - 1; i >= 0; i--) {
    if (HousesTab[i].ownerId == id) {
      var archivedHouse = HousesTab[i];
      archivedHouse.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
      archivedHousesTab.push(archivedHouse);
      HousesTab.splice(i, 1);
    }
  }
  // Mettre à jour les données dans le stockage local
  setToLS("reservation", reservationTab);
  setToLS("archivedReservation", archivedReservationTab);
  setToLS("rooms", roomsTab);
  setToLS("houses", HousesTab);
  setToLS("archivedHouses", archivedHousesTab);
  setToLS("archivedRooms", archivedRoomsTab);
  var archivedUser = usersTab[pos];
  archivedUser.archivedAt = new Date(); // Ajouter une date d'archivage si nécessaire
  archivedUserTab.push(archivedUser);
  usersTab.splice(pos, 1);
  setToLS("users", usersTab);
  setToLS("archivedUser", archivedUserTab);
  location.reload();
}

function displayAdminReservation() {
  var reservationTab = getFromLS("reservation");
  var content = "";
  for (let i = 0; i < reservationTab.length; i++) {
    content = content + `
         <tr>
         <td>
         ${searchObjByIdAndKey(reservationTab[i].userId, "users").fN} 
         </td>
         <td> 
         ${searchObjByIdAndKey(reservationTab[i].userId, "users").lN}
         </td>
         <td>
     ${reservationTab[i].tel}
     </td>
     <td>
         ${reservationTab[i].checkIn
      }
         </td>
         <td>
         ${reservationTab[i].checkOut
      }
         </td>
         <td>
         <h5> ${searchObjByIdAndKey(reservationTab[i].houseId, "houses").hName}</h5>
     </td>

         <td>
         <h5>  ${reservationTab[i].houseId}</h5>
     </td>
     
     <td>
     ${searchObjByIdAndKey(reservationTab[i].roomId, "rooms").Roomname}
         </td>
    
         <td>
         ${searchObjByIdAndKey(reservationTab[i].roomId, "rooms").roomprice}
         </td>
         <td>
         ${reservationTab[i].numOfNight}
         </td>
         <td>
         ${reservationTab[i].numOfNight * searchObjByIdAndKey(reservationTab[i].roomId, "rooms").roomprice}
         </td>
        
     </tr>`
  }


  document.getElementById("adminReservationDiv").innerHTML = content;
}

function logout() {
  // Effacer les données de session ou les jetons d'authentification
  // Exemple : Supprimer les données de l'utilisateur actuellement connecté dans le stockage local
  localStorage.removeItem('connectedUserID'); // Supprime les données de l'utilisateur actuellement connecté

  // Rediriger vers la page de connexion ou une autre page appropriée
  // window.location.href = "logIn.html"; // Redirige vers la page de connexion
}

function profile() {
  var usersTab = getFromLS("users");
  var connectedUserID = localStorage.getItem("connectedUserID");
  var content = "";
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].id == connectedUserID) {
      content = `
          <div class="container">
              <div class="row gutters">
                  <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <div class="card h-100">
                          <div class="card-body">
                              <div class="account-settings">
                                  <div class="user-profile">
                                      <div class="user-avatar">
                                          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin">
                                      </div>
                                      <h5 class="user-name"><span>${usersTab[i].fN} ${usersTab[i].lN}</span></h5>
                                      <h6 class="user-email"><span>${usersTab[i].email}</span></h6>
                                  </div>
                                  <div class="about">
                                      <h5>About</h5>
                                      🏡 Welcome! Meet the proud <span>${usersTab[i].role}</span> of this charming abode, <span>${usersTab[i].fN} ${usersTab[i].lN}</span></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                      <div class="card h-100">
                          <div class="card-body">
                              <div class="row gutters">
                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                      <h6 class="mb-2 text-primary">Personal Details</h6>
                                  </div>
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                      <div class="form-group">
                                          <label for="fullName">Full Name</label>
                                          <input type="text" class="form-control" id="newProfileName" value="${usersTab[i].fN}" placeholder="${usersTab[i].fN}">
                                      </div>
                                  </div>
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                      <div class="form-group">
                                          <label for="lastName">Last Name</label>
                                          <input type="text" class="form-control" id="newProfileLastName" value="${usersTab[i].lN}" placeholder="${usersTab[i].lN}">
                                      </div>
                                  </div>
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                      <div class="form-group">
                                          <label for="eMail">Email</label>
                                          <input type="email" class="form-control" id="newEmail" value="${usersTab[i].email}" placeholder="${usersTab[i].email}">
                                      </div>
                                  </div>
                                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                      <div class="form-group">
                                          <label for="phone">Phone</label>
                                          <input type="text" class="form-control" id="newTel" value="${usersTab[i].tel}" placeholder="${usersTab[i].tel}">
                                      </div>
                                  </div>
                              </div>
                              <div class="row gutters">
                                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                      <div class="text-right">
                                          <button type="button" onclick="validateEditProfile(${usersTab[i].id})" name="submit" class="btn btn-primary">Update</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
    }
  }
  document.getElementById("Profile").innerHTML = content;
}

function validateEditProfile(id) {
  var usersTab = getFromLS("users");
  var newProfileName = document.getElementById("newProfileName").value;
  var newProfileLastName = document.getElementById("newProfileLastName").value;
  var newEmail = document.getElementById("newEmail").value;
  var newTel = document.getElementById("newTel").value;
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].id == id) {
      usersTab[i].fN = newProfileName;
      usersTab[i].lN = newProfileLastName;
      usersTab[i].email = newEmail;
      usersTab[i].tel = newTel;
      break;
    }
  }
  setToLS("users", usersTab);
  location.reload();
}

function home() {
  var HousesTab = getFromLS("houses");
  var connectedUserID = localStorage.getItem("connectedUserID");
  connec = searchObjByIdAndKey(connectedUserID, "users")
  var content = '';

  //myHouses
  if (connectedUserID) {
    if (connec.role == "Admin") {
      for (let i = 0; i < HousesTab.length; i++) {
        content +=
          `<div class="col-lg-4 col-md-6" style="display: inline-block;"> <!-- Utilisez display: inline-block; -->
      <div class="room-item">
        <img src="img/room/room-1.jpg" alt="">
        <div class="ri-text">
          <h4>${HousesTab[i].hName}</h4>
          <table>
            <tbody>
              <tr>
                <td class="r-o">Address:</td>
                <td>${HousesTab[i].adress}</td>
              </tr>
            </tbody>
          </table>
          <p>if you want to check room's you must open your dashboard with the link below <a href="DashboardAdmin.html">DashboardAdmin</a></p>
        </div>
      </div>           
    </div>`;
      }
      document.getElementById("homeHouse").innerHTML = content;
    }
    else if (connec.role == "users" || connec.role == "Owner") {
      for (let i = 0; i < HousesTab.length; i++) {
        content +=
          `<div class="col-lg-4 col-md-6" style="display: inline-block;"> <!-- Utilisez display: inline-block; -->
      <div class="room-item">
        <img src="img/room/room-1.jpg" alt="">
        <div class="ri-text">
          <h4>${HousesTab[i].hName}</h4>
          <table>
            <tbody>
              <tr>
                <td class="r-o">Address:</td>
                <td>${HousesTab[i].adress}</td>
              </tr>
            </tbody>
          </table>
          <p>if you want to check room's you must open houses with the link below <a href="houses.html">House's</a></p>
        </div>
      </div>           
    </div>`;
      }
      document.getElementById("homeHouse").innerHTML = content;
    }
  }
  else {
    for (let i = 0; i < HousesTab.length; i++) {
      content +=
        `<div class="col-lg-4 col-md-6" style="display: inline-block;"> <!-- Utilisez display: inline-block; -->
      <div class="room-item">
        <img src="img/room/room-1.jpg" alt="">
        <div class="ri-text">
          <h4>${HousesTab[i].hName}</h4>
          <table>
            <tbody>
              <tr>
                <td class="r-o">Address:</td>
                <td>${HousesTab[i].adress}</td>
              </tr>
            </tbody>
          </table>
          <p>if you want to check room's you must be connected with the link below <a href="logIn.html">Login</a></p>
        </div>
      </div>           
    </div>`;
    }
    document.getElementById("homeHouse").innerHTML = content;
  }
}

function searchHouse() {
  var RoomName = getValue("searchPr");
  var roomsTab=getFromLS("rooms"); 
  var foundRooms=[];
  var content=''
  for (let i = 0; i <roomsTab.length; i++) {
      if (roomsTab[i].Roomname== RoomName) {
        foundRooms.push(roomsTab[i])
      }
      
  }
  for (let i = 0; i < foundRooms.length; i++) {
      
      content = content + `<div class="col-lg-4 col-md-6">
      <div class="room-item">
          <img src="img/room/room-1.jpg" alt="">
          <div class="ri-text">
      <h4>${foundRooms[i].Roomname}</h4>
      <table>
          <tbody>
              <tr>
                  <td class="r-o">Price:</td>
                  <td>${foundRooms[i].roomprice}</td>
              </tr>
              <tr>
                  <td class="r-o">capacity</td>
                  <td>${foundRooms[i].NbrDePersParChambre}</td>
              </tr>
          </tbody>
      </table>
      <button class="btn primary-btn" onclick="goToDisplay(${foundRooms[i].id})">Display</button>
</div>
      </div>           
          </div>
                      </div>
                      `
                      console.log("id",foundRooms[i].id)
  }
document.getElementById('searchDiv').innerHTML=content;
}



