const result = document.querySelector('.result')

const fetchData = async ()=> {
    try {
 const {data } = await axios.get('/api/2-basic-api');
 const products = data.map((products)=> {
     const {image:{url},name,price} = products
     return `<article class="product">
     <img
       src="${url}"
       alt="${name}"
     />
     <div class="info">
       <h5>${name}</h5>
       <h5 class="price">$${price}</h5>
     </div>
   </article>`
 }).join('')
      result.innerHTML = products
    } catch (error) {
        result.innerHTML = `<h4> there was an error</h4>`
    }
}


fetchData()
