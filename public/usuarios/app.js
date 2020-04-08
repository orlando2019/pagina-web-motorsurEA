// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyABt95UJdmNNhMI8suajUmzqRVHW4t5Zeg",
    authDomain: "usuarios-83626.firebaseapp.com",
    databaseURL: "https://usuarios-83626.firebaseio.com",
    projectId: "usuarios-83626",
    storageBucket: "usuarios-83626.appspot.com",
    messagingSenderId: "78961994982",
    appId: "1:78961994982:web:94d058e1d735ecb860df27"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



//FUNCION REGISTRAR

document.getElementById('formContacto').addEventListener('submit',registrar);

function registrar(e) {
  e.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value; 
  console.log(email);

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(()=>{
    verificar();
  })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;      
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage) ;
      // ...
    });
}


//FUNCION VERIFICAR USUARIO E INGRESO DE USUARIO

document.getElementById('formContacto1').addEventListener('submit',ingreso);

function ingreso(e) {
  e.preventDefault();
  let email1 = document.getElementById('email1').value;
  let password1 = document.getElementById('password1').value;
  
  firebase
    .auth()
    .signInWithEmailAndPassword(email1, password1)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

//FUNCION OBSERVADOR Y VERIFICACION DE USUARIO ACTIVO

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      activo(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user.emailVerified);
      // ...
    } else {

      console.log('Usuario desconectado!!');
      contenido.innerHTML = `  `; 
    }
  });
  
}
observador();


function activo(user) {
  var user = user;
  let contenido = document.getElementById('contenido');

    if (user.emailVerified) {
      contenido.innerHTML = ` 
    <div class="alert alert-warning mt-3" role="alert">
  <h4 class="alert-heading">Hola Bienvenido! ${user.email}</h4>
  <p>Gracias por preferir nuestra App </p>
  <hr>
  <p class="mb-0">OSNEG-WEB... Ingeniería y Desarrollo Web</p>
</div> 
    <button onclick="cerrar()" class="btn btn-danger" data-dismiss="modal">Cerrar Sesión</button>
    `;      
    }
  
  
}

function cerrar() {
  firebase.auth().signOut()
    .then(() => {
      console.log('Saaliendo....')
    })

    .catch(error => {
      console.log(error)
      
    }) 
}

function verificar() {
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function() {
      console.log('Enviando Correo de verificacion...')
    })
    .catch(function(error) {
      // An error happened.
    });  
}