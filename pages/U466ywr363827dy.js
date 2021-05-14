
var product_items;
var catshit;
var user_data = [];
var products=[];
var badges=[];
var reviews=[];
var user;
var email1;
 var name, email, photoUrl, uid, emailVerified;

var config = {
    apiKey: "AIzaSyC-BUGGSsvUX8z4W1LcsJzS59yrL4__EsE",
    authDomain: "splurket-66df1.firebaseapp.com",
    databaseURL: "https://splurket-66df1-default-rtdb.firebaseio.com",
    projectId: "splurket-66df1",
    storageBucket: "splurket-66df1.appspot.com",
    messagingSenderId: "286706779903",
    appId: "1:286706779903:web:fd91c29319f9804e192eca",
    measurementId: "G-QWQ2M658KL"
  };
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); 

function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
var userfile= getParameterByName('user');
getuserprodata(userfile);
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    //splurket@gmail.com
    var email1 = user.email;
    
    /*var email = getParameterByName('user'); 
    console.log(email)*/
    //still splurket
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json, /;q=0.5");

    var raw = JSON.stringify({
      "stringtoencrypt": `${email1}`
    });
    //document.write(raw)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://americanrivergold.com/fluffybunnyin", requestOptions)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
        //should be a base64 string by now
        getuserdata(data);
    });
  } else {
    console.log('fuck')
    document.getElementById("avatar").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById('cartbutton').style.top='20px';
    var all = document.getElementsByClassName('headerdrop');
    for (var i = 0; i < all.length; i++) {
      all[i].style.top = '83px';
    }
  }
});
function getuserdata(data) {
    email = data.encryptedstring;
        var docRef = db.collection("users").doc(email);
        docRef.get().then((doc) => {
            if (doc.exists) {
                data1 = doc.data()
                pro_pic = data1.pro_pic;
                if (data1.username == "" ){
                    user_name = data1.email
                }
                if (data1.username != "") {
                    user_name = data1.username;
                }
                document.getElementById("avatarpic").src = pro_pic;
                //document.getElementById("avatarpic1").src = pro_pic;
                document.getElementById("avatarusername1").innerText = "Signed In As: " + user_name;
                document.getElementById("avatar").style.display = "block";
                document.getElementById("avatarpic").style.display = "inline-block";
                var all = document.getElementsByClassName('headerdrop');
                for (var i = 0; i < all.length; i++) {
                  all[i].style.top = '98px';
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                console.log(doc.data())
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}
function profilego() {
    var localstuff1 = localStorage.getItem('usercreds');
    var localstuff = JSON.parse(localstuff1)
    var loginemail = btoa(localstuff.email);
    var loginpassword = btoa(localstuff.password);
    location.href = "https://myaccount.splurket.com/login?bunnyluck="+loginemail+"&rabbitfoot="+loginpassword

}
function signout() {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('usercreds');
        var all = document.getElementsByClassName('headerdrop');
        for (var i = 0; i < all.length; i++) {
          all[i].style.top = '83px';
        }
    }).catch((error) => {
      // An error happened.
    });
}
function getuserprodata(prodata){
  var docRef = db.collection('pubusers').doc(prodata);
    docRef.get().then((doc) => {
      console.log(doc)
      if (doc.exists) {
            var doc= doc.data();
            var push_data1 = {value: false, name: `${doc.username}`, image: `${doc.image}`, loc: `${doc.Location}`, edu: `${doc.Education}`,date: `${doc.Date}`,tag: `${doc.tagline}`, reviewsn: `${doc.Reviewsn}`}
            if (user_data.includes('{')){
              var push_data = ','+push_data1;
              user.push(push_data)
            }else{
              user_data.push(push_data1)
     
            }//document.write(product_data)
     
     
     
     
          } else {
              // doc.data() will be undefined in this case
              user_data=[{
                value: false,
                name: 'No User Found'}]
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    }
new Vue({
  el: '#app',
    vuetify: new Vuetify(),
  data() {
    return {
      itemsPerPageArray: [15, 25, 50],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 1,
      sortBy: 'name',
      products:products +'}',
      badges:badges +'}',
      reviews:reviews +'}',
      keys1: [
      'Name',
      'Price',
      'Ratings'
      ],
      keys: [
      'Name',
      'Price',
      'Ratings'
      ],


      items: user_data};},
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name');
    } },

  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    } } });


