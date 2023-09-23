let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}

// Hide Loding
 function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
 }
//show new Quote
function newQuote(){
    loading();
    // Pick a random quote from a apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   // Check if Author field is blank and replace it with "unknown"
   
   if(!quote.author || quote.author == "type.fit"){
    authorText.textContent = "Unknown";
   }
   else{
    authorText.textContent = quote.author.replace(', type.fit', '');
     
   }
   
    // Check Quote length to determine sylyling
    if(quote.text.length > 150){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try{

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        

        newQuote();
    } catch(error){
        //Catch Error Here
    }


}

//Tweet Quote
function tweetQuote(){
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   window.open(twitterUrl, '_blank');
}

//Event Listeners




twitterBtn?.addEventListener('click', tweetQuote);
newQuoteBtn?.addEventListener('click', newQuote);

//on Load
getQuotes();


