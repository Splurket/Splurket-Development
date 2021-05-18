const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
=============
Load Category Products
=============
 */
const categoryCenter = document.querySelector(".category__center");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
});

const displayProductItems = items => {
  let displayProduct = items.map(
    product => ` 
                  <div class="product category__products">
                    <div class="product__header">
                      <img src=${product.image} alt="product">
                    </div>
                    <div class="product__footer">
                      <h3>${product.title}</h3>
                      <div class="rating">
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                        </svg>
                        <svg>
                          <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
                        </svg>
                      </div>
                      <div class="product__price">
                        <h4>$${product.price}</h4>
                      </div>
                      <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
                    </div>
                  <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlink:href="./images/sprite.svg#icon-eye"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlink:href="./images/sprite.svg#icon-loop2"></use>
                          </svg>
                        </a>
                      </li>
                  </ul>
                  </div>
                  `
  );

  displayProduct = displayProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
  }
};

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async e => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach(btn => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter(product => {
        if (product.category === id) {
          return product;
        }
      });

      if (id === "All Products") {
        displayProductItems(products);
      } else {
        displayProductItems(menuCategory);
      }
    }
  });
}

/*
=============
Product Details Left
=============
 */
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;

["mouseover", "touchstart"].forEach(event => {
  if (picContainer) {
    picContainer.addEventListener(event, e => {
      const target = e.target.closest("img");
      if (!target) return;
      const id = target.id.slice(3);
      changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
    });
  }
});

// change active image
const changeImage = (imgSrc, n) => {
  // change the main image
  pic.src = imgSrc;
  // change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   remove the border from the previous active side image
  picList[picActive - 1].classList.remove("img-active");
  // add to the active image
  picList[n - 1].classList.add("img-active");
  //   update the active side picture
  picActive = n;
};

/*
=============
Product Details Bottom
=============
 */

const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", e => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach(btn => {
        // remove active from all btn
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // hide other active
      Array.from(contents).forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}

var product_items;
var catshit;
var user_data = [];
var products=[];
var badges=[];
var reviews=[];
var skills=[];
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
var productid= getParameterByName('product');
title=document.createElement('Title');
title.innerText=product+" | Splurket"
document.getElementsByTagName('head')[0].appendChild(title);

getproductdata(productid);
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
                //document.getElementById("avatarpic").src = pro_pic;
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
function getproductdata(prodata){
  var docRef = db.collection('pubusers').doc(prodata);
    docRef.get().then((doc) => {
      if (doc.exists) {
            var doc= doc.data();
            var reviewsint= parseFloat(`${doc.Reviewsn}`)
            var skills1=doc.Skills
            skills2=skills1.split(',');
            skills2.forEach((skill3) => {skills.push(skill3)
            var push_data1 = {value: false, name: `${doc.username}`, image: `${doc.image}`, location: `${doc.Location}`, education: `${doc.Education}`, date: `${doc.Date}`, tag: `${doc.tagline}`, reviewsn: reviewsint, skills: skills}
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
      /*db.collection("pubusers").doc(prodata).collection('products').get().then((querySnapshot) => {
            querySnapshot.forEach((doc3) => {
              if (doc3.exists) {
                var doc3= doc3.data();
                var productnm = doc3.name;
                prodget(productnm);
                }
              })
            })*/
      /*db.collection("pubusers").doc(prodata).collection('Badges').get().then((querySnapshot) => {
        querySnapshot.forEach((doc2) => {
          if (doc2.exists) {
            var doc= doc2.data();
            var badgedata = {value: false, name: `${doc.Name}`, image: `${doc.image}`};
            if (products.includes('{')){
                var push_data = ','+badgedata;
                badges.push(push_data)


              }else{
                badges.push(badgedata)

              }//document.write(product_data)
            } else {
                // doc.data() will be undefined in this case
                badges=[{
                  value: false,
                  name: 'No Badges Found',
                  image: 'N/A'}]
            }
          })

        })*/
      /*db.collection("pubusers").doc(prodata).collection('reviews').get().then((querySnapshot) => {
        querySnapshot.forEach((doc2) => {
          if (doc2.exists) {
            var doc= doc2.data();
            var reviewrate=parseFloat(`${doc.rate}`)
            var reviewdata = {value: false, name: `${doc.Name}`, reviewer:`${doc.Reviewer}`, desc: `${doc.Description}`, rate: reviewrate};
            if (reviews.includes('{')){
                var push_data = ','+reviewdata;
                reviews.push(push_data)


              }else{
                reviews.push(reviewdata)

              }//document.write(product_data)
            } else {
                // doc.data() will be undefined in this case
                reviews=[{
                  value: false,
                  name: 'No Reviews Found',
                  reviewer: 'N/A',
                  desc: 'N/A',
                  rate: 'N/A' }]
            }
          })

        })*/
    }
    function prodget(productnames){
      console.log(productnames)
      var docRef = db.collection("products").doc(productnames);
        docRef.get().then((doc) => {
          if (doc.exists) {
            var doc= doc.data();
            var push_data2 = {value: false, id: `${doc.product_id}`, name:`${doc.product_name}`, price: `${doc.product_price}`, date: `${doc.creation_date}`, reviewsn: `${doc.product_reviewsn}`, creator: `${doc.product_creator}`, image: `${doc.product_cover}`, creatorpic: `${doc.product_creatorpic}`, desc: `${doc.product_description}`}
            if (products.includes('{')){
              var push_data = ','+push_data2;
              products.push(push_data)


            }else{
              products.push(push_data2)

            }//document.write(product_data)
          } else {

              // doc.data() will be undefined in this case
              products=[{
                value: false,
                name: 'No Products Found',
                Price: 'N/A',
                reviews: 'N/A',
                status: 'N/A' }]
          }
        }).catch((error) => {
            console.log(error)
      // An error happened.
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
      keys1: [
      'Date',
      'Location',
      'Education',
      ],
      keys: [
      'Date',
      'Location',
      'Education',
      ],
      skills:skills,
      products:products,
      badges:badges,
      reviews:reviews,
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


