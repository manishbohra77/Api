const apiKey ='93e8792f5b0b44548d80e0cb86a27905'
const blogcontainer = document.getElementById('block-conatiner')
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');



async function fetchRandomNews (){

     try{
            const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
           const response= await fetch (apiUrl);
           const data = await response.json();
           return data.articles;

     }

     catch(error){

        console.log(error)
        return [];

     }
}

searchButton.addEventListener('click',async ()=>{
    const query = searchField.value.trim();
    if (query !==""){
        try{
                const articles = await fetchNewsQuery(query);
                display(articles);
        }
        catch(error){
            console.log(error)

        }
    }
})


async function  fetchNewsQuery(query)
{
    try{
        const apiUrl =`
        https://newsapi.org/v2/everything?q=${query}&from=2024-06-11&sortBy=publishedAt&apiKey=${apiKey}`;
       const response= await fetch (apiUrl);
       const data = await response.json();
       return data.articles;

    }

        catch(error){
        console.log(error)
        return [];

 }

}







function display(articles){
    blogcontainer.innerHTML='';
    articles.forEach((article)=>{
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card')
        const img = document.createElement('img');
        img.src=article.urlToImage;
        img.alt=article.title;
        const title = document.createElement('h2');
        const truncatedTitle = article.title.length>30?article.title.slice(0,30)+"..." :article.title;
        title.textContent=truncatedTitle
        // title.textContent = article.title;
        const description=document.createElement('p');
        title.textContent=truncatedTitle
        // description.textContent=article.description;
        const truncatedDes = 
        article.description.length>120?article.description.slice(0,120)+"..." :article.description;
        description.textContent=truncatedDes;

        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank ")
        })
        blogCard.appendChild(img);
        blogCard.appendChild(title)
        blogCard.appendChild(description) 
        blogcontainer.appendChild(blogCard);
    })
}


(async()=>{
    try{
        const articles = await fetchRandomNews();
        display(articles)
    }

    catch(error){
        console.log(error)
    }
})();
