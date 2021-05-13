var product_items;
var catshit;
var user_data = [];
var user;
var email1;
function getuserprodata(prodata){
  const db = firebase.firestore();
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


