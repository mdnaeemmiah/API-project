const loadPhone = async (searchText,isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones= data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}

const displayPhones =(phones,isShowAll) => {
console.log(phones);
 
const phoneContainer= document.getElementById('phone-container');

phoneContainer.textContent ='';

// display show all button 12 
const shoowAllContainer = document.getElementById('show-all-container');
if(phones.length>12 && !isShowAll){
  shoowAllContainer.classList.remove('hidden');
}else{
  shoowAllContainer.classList.add('hidden');
}

console.log('is show all',isShowAll);
// display 1st 10 phone  
if(!isShowAll){
  phones = phones.slice(0,12);
}

phones.forEach(phone => {
    // console.log(phone);

 const phoneCard =document.createElement('div');
 phoneCard.classList =`card w-96 bg-gray-100 shadow-xl`;
 phoneCard.innerHTML =`
 <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name
                      }</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handelShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
 `
phoneContainer.appendChild(phoneCard);

});
// hide loading spinner 
toggleSpiner(false);

}

const handelShowDetails = async (id) => {
  // console.log('hello',id);
  const res = await fetch (`https://openapi.programming-hero.com/api/phone/apple_iphone${id}`);
  const data = await res.json();
 const phone =data.data;
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-details-Phone-name');
  phoneName.innerText = phone.name;
const showdetailscontainer =document.getElementById('show-details-container');
showdetailscontainer.innerHTML = `
  <img src ="${phone.image}" alt="" />
`

  show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
  toggleSpiner(true);
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

// const handleSearch2  =() => {
//   toggleSpiner(true);
//   const searchField =document.getElementById('search-field2');
//   const searchText = searchField.value;
//   loadPhone(searchText);
// }

const toggleSpiner = (isLoading)=>{
  const loadingSpiner= document.getElementById('loading-spiner');
 if(isLoading){
  loadingSpiner.classList.remove('hidden');
 }
 else{
  loadingSpiner.classList.add('hidden');
 }
}

// handle show all
const handleShowAll =()=>{
  handleSearch(true);
}


loadPhone();

