var product_items;
var catshit;
var user_data = [];
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
function getuserprodata(prodata){
  var docRef = db.collection('pubusers').doc(prodata);
    docRef.get().then((doc) => {
      console.log(doc)
      if (doc.exists) {
            var doc= doc.data();
            var push_data1 = {value: false, name: `${doc.username}`, image: `${doc.image}`}
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
      itemsPerPage: 15,
      sortBy: 'name',
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


