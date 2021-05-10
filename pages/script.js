var product_items;
var catshit;
var data1=[Design, Logos, data]
var product_data = [];
var user;
var email1;
     db.collection("products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

            if (doc.exists) {
              var doc= doc.data();
              catshit = doc.product_category;
              var push_data1 = {value: false, id: `${doc.product_id}`, name:`${doc.product_name}`, price: `${doc.product_price}`, date: `${doc.creation_date}`, reviewsn: `${doc.product_reviewsn}`, creator: `${doc.product_creator}`, image: `${doc.product_cover}`, creatorpic: `${doc.product_creatorpic}`, desc: `${doc.product_description}`}
              if (product_data.includes('{')){
                var push_data = ','+push_data1;
                product_data.push(push_data)


              }else{
                var push_data = push_data1;
                product_data.push(push_data)

              }//document.write(product_data)




            } else {
                // doc.data() will be undefined in this case
                product_data=[{
                  value: false,
                  name: 'No Products Found',
                  Price: 'N/A',
                  reviews: 'N/A',
                  status: 'N/A' }]
            }
          })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
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


      items: product_data};},
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




 fetch('https://api.trello.com/1/lists/603e5f3afc99b724f835c7dc/cards?key=324ea524ff59f71498da5f35878666f1&token=fc6909bad59ced8b7ea3f2162ac52efe52dc94f2603c712a3cd1d5281541e914')
                      .then(function (response) {
                          return response.json();
                      })
                      .then(function (data) {
                          appendData4(data);
                      })
                      .catch(function (err) {
                          console.log('error: ' + err);
                      });
                    function appendData4(data1) {
                        var dipwad = document.getElementById("w3-container4");
                        var mainContainer = document.getElementById("myData4");
                        
                        for (var i = 0; i < data1.length; i++) {
                            var str = data1[i].desc;
                            var chunks = str.split('</>>')
                            var price = chunks[0];
                            var image = chunks[1];
                            var shipping = chunks[2];
                            var desc = chunks[3];
                            var size = chunks[4];
                            var color = chunks[5];
                            var div2 = document.createElement("div");
                            div2.className = "card content";
                            div2.id = "cardw"
                            var div1 = document.createElement("div");
                          
                            div2.innerHTML = `
                                 <div width="100%">
                                      <img src="${image}" style="max-width:250px; max-height:250px">
                                      <div class="card__title" style="max-height:45px; overflow:hidden; text-overflow: ellipsis; max-width:100px;">${data1[i].name}</div>
                                      <b><p style="font-size:20px;">${price}</p></b>
                                      <button class="w3-button w3-black" style="margin-bottom:10%;" onclick="document.getElementById('c${data1[i].id}').style.display='block'">More Info</a>
                                    </div>
                                  </div>
                                  </div>
                                  `
                            mainContainer.appendChild(div2);
                            var size1 = JSON.stringify(size)
                            var color1 = JSON.stringify(color)

                            var shit = document.getElementById("selectscript")
                            var script = document.createElement("script");
                            script.innerHTML = `var select = document.getElementById("selectSize${data1[i].id}");
                            var options1 = ${size1}.toString();
                            var options = options1.split(",")
                            for(var i = 0; i < options.length; i++) {
                                var opt = options[i];
                                var el = document.createElement("option");
                                el.textContent = opt;
                                el.value = opt;
                                select.appendChild(el);
                            }
                            var select = document.getElementById("selectColor${data1[i].id}");
                            var options3 = ${color1}.toString();
                            var options4 = options3.split(",")
                            for(var i = 0; i < options4.length; i++) {
                                var opt = options4[i];
                                var el = document.createElement("option");
                                el.textContent = opt;
                                el.value = opt;
                                select.appendChild(el);
                            }`
                            shit.appendChild(script)
                        }
                    }
