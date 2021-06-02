  var idd;
  cart=getCart();
  populateCart();
  
var hello=getCart();
const items=[];
console.log(Object.keys(hello).length)
  for(var item in hello) {
    console.log(item)
    var cartItem = hello[item];
      var dollars = JSON.stringify(cartItem.data.price);
      var dollars1 = dollars.replace(/["']/g, "")
      var str = dollars1;
      var resStr=str.substring(0,str.length-2)+"."+str.substring(str.length-2);
      pricethat = '$'+resStr;
    pushdata= {value: false, id: `${cartItem.data.id}`, name: `${cartItem.data.description}`, quantity: `${cartItem.quantity}`, price: pricethat}
    items.push(pushdata)
    console.log(Object.keys(hello[item]).length)

    //console.log(cartItem.data.id);
  }
  console.log(items)
  function populateCart(){

    var cartBody = document.querySelector("#cart > tbody");
    var cart = getCart();
    Crtitems = (JSON.stringify(Object.keys(cart).length))

    // update total
    //var totalEl = document.getElementById("total");
    var total = Object.keys(cart).reduce((prev, curr) => {

      var q = cart[curr].quantity;
      var p = cart[curr].data.price;
      return prev + (q*p);
    }, 0);

    totalDollars = total / 100;
    
    totalDollars1 = totalDollars.toFixed(2)
    //totalEl.innerHTML = `$${totalDollars1}`;
    

    // remove all cart items
    /*while (cartBody.firstChild) {
      cartBody.removeChild(cartBody.firstChild);
    }*/

    // add cart items back
    /*for (var item in cart) {
      var cart = getCart();
      var cartItem = cart[item];
      var tr = document.createElement("tr");
      var desc = document.createElement("td");
      desc.innerHTML = cartItem.data.description;
      tr.appendChild(desc);

      var quantity = document.createElement("td");
      quantity.innerHTML = cartItem.quantity;
      tr.appendChild(quantity);

      var price = document.createElement("td");
      var dollars = JSON.stringify(cartItem.data.price);
      var dollars1 = dollars.replace(/["']/g, "")
      var str = dollars1;
      var resStr=str.substring(0,str.length-2)+"."+str.substring(str.length-2);

      price.innerHTML = '$'+resStr;
      tr.appendChild(price);


      var size1 = JSON.stringify(cartItem.data.size);
      if(typeof size1 !== "undefined") {
        var size = document.createElement("td");
        var size2 = size1.replace(/["']/g, "")
        var str1 = size2;
        var resStr1=str1.substring(0,str1.length-2)+str1.substring(str1.length-2);

        size.innerHTML = resStr1;
        tr.appendChild(size);
    }

      var color1 = JSON.stringify(cartItem.data.color);
      if(typeof color1 !== "undefined") {
        var color = document.createElement("td");
        var color2 = color1.replace(/["']/g, "")
        var str2 = color2;
        var resStr2=str2.substring(0,str2.length-2)+str2.substring(str2.length-2);

        color.innerHTML = resStr2;
        tr.appendChild(color);
    }
    var size1 = JSON.stringify(cartItem.data.size);
      if(typeof size1 == "undefined") {
        var size = document.createElement("td");
        tr.appendChild(size);
    }
      if(typeof color1 == "undefined") {
        var color = document.createElement("td");
        tr.appendChild(color);
    }
      var rem = document.createElement("td");
      var but = document.createElement("button");

      }
      but.addEventListener("click", removeListener(item));
      but.innerHTML = 'X';
      but.style ="background-color: #52b36c; color: white; border-color:white;"
      rem.appendChild(but);
      tr.appendChild(rem);

      cartBody.appendChild(tr);
    }
  }*/}

  function addToCart(data) {
    var cart = getCart()
    var prevQuantity = cart[data.id] ? cart[data.id].quantity: 0;
    cart[data.id] = {
      quantity: prevQuantity + 1,
      data,

    }
    data1 = data.price.replace("$","")
    data2 = data1.replace(".","")
    data.price = data2;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    populateCart();
  }

  function removeFromCart(id) {
    id=idd
    var cart = getCart();
    if (!cart[id]) {
      console.error(`${id} not found in cart`);
      return;
    }

    var prevQuantity = cart[id].quantity;
    if (prevQuantity === 1) {
      // remove item if will go to 0
      delete cart[id];
    } else {
      cart[id].quantity = prevQuantity - 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    populateCart();
  }

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || {};
  }

  window.addEventListener("storage", function(e) {
    populateCart();
  })
  new Vue({
  el: '#app',
  vuetify: new Vuetify(),
    data: () => ({
     dialog2: false,
    dialog3: false,
    notifications: false,
    sound: true,
    widgets: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Your Items',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: items,
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = items
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item, id) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        idd=id
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()

      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  })