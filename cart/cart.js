  populateCart();

  function populateCart() {

    var cartBody = document.querySelector("#cart > tbody");
    var cart = getCart();
    Crtitems = (JSON.stringify(Object.keys(cart).length))

    // update total
    var totalEl = document.getElementById("total");
    var total = Object.keys(cart).reduce((prev, curr) => {

      var q = cart[curr].quantity;
      var p = cart[curr].data.price;
      return prev + (q*p);
    }, 0);

    totalDollars = total / 100;
    
    totalDollars1 = totalDollars.toFixed(2)
    totalEl.innerHTML = `$${totalDollars1}`;
    

    // remove all cart items
    while (cartBody.firstChild) {
      cartBody.removeChild(cartBody.firstChild);
    }

    // add cart items back
    for (var item in cart) {
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

      function removeListener(id) {
        return function(e) {
          removeFromCart(id);
          window.location.reload();
        }
      }
      but.addEventListener("click", removeListener(item));
      but.innerHTML = 'X';
      but.style ="background-color: black; color: white; border-color:white;"
      rem.appendChild(but);
      tr.appendChild(rem);

      cartBody.appendChild(tr);
    }
  }

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