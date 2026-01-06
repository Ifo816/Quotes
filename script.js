const quotes = [
    { text: "Where focus goes, energy flows.", author: "Tony Robbins", keywords: ["focus", "energy"] },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", keywords: ["great work", "love"] },
    { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll", keywords: ["react"] },
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", keywords: ["difficulty", "opportunity"] },
    { text: "Yesterday is history, tomorrow is a mystery, but today is a gift. That’s why it’s called the present.", author: "Master Oogway", keywords: ["today", "gift"] },
    { text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", keywords: ["power", "mind", "strength"] },
    { text: "The obstacle on the path becomes the path. Never forget, within every obstacle is an opportunity to improve our condition.", author: "Zen Proverb", keywords: ["obstacle", "path", "opportunity"] }
];

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const nextBtn = document.getElementById('next-quote');
const quoteCard = document.querySelector('.quote-card');

let lastIndex = -1;   // Tracks last quote to prevent repeats
let animating = false; // Prevent clicks during animation

// Function to show a quote with highlighted keywords
function showQuote(quote) {
    let highlighted = quote.text;
    quote.keywords.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        highlighted = highlighted.replace(regex, `<span class="highlight">$1</span>`);
    });
    quoteText.innerHTML = `“${highlighted}”`;
    quoteAuthor.textContent = `– ${quote.author}`;
}

// Function to pick a new random quote (no consecutive repeats)
function nextQuote() {
    if (animating) return;
    animating = true;

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastIndex && quotes.length > 1);

    lastIndex = randomIndex;
    const quote = quotes[randomIndex];

    // Fade out
    quoteCard.style.opacity = 0;

    setTimeout(() => {
        showQuote(quote);      // Update text while invisible
        quoteCard.style.opacity = 1; // Fade back in
        animating = false;
    }, 600); // match the CSS transition duration
}


// Event listener for button
nextBtn.addEventListener('click', nextQuote);

// Show initial quote on page load
nextQuote();
