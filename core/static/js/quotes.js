var quotes = [
    "<b>A journey of a thousand miles begins with a single step. –Lao Tzu</b>",
    "<b>Whatever you do, or dream you can, begin it. Boldness has genius and power and magic in it. –Johann Wolfgang von Goethe</b>",
    "<b>If you can\’t fly\, then run\, if you can\’t walk run\, then walk\, if you can\’t walk\, then crawl\, but by all means keep moving. –Martin Luther King Jr.</b>",
    "<b>To dare is to lose one\’s footing momentarily. To not dare is to lose oneself. –Søren Kierkegaard</b>",
    "<b>The only impossible journey is the one you never begin. –Tony Robbins</b>",
    "<b>Life is a journey that must be traveled no matter how bad the roads and accommodations. -Oliver Goldsmith</b>",
    "<b>The journey is never ending. There\'s always gonna be growth\, improvement\, adversity; you just gotta take it all in and do what\'s right\, continue to grow\, continue to live in the moment. -Antonio Brown</b>",
    "<b>Perseverance is not a long race; it is many short races one after the other. -Walter Elliot</b>",
    "<b>Sometimes it\'s the journey that teaches you a lot about your destination. -Drake</b>",
    "<b>Just remember\, you can do anything you set your mind to\, but it takes action\, perseverance\, and facing your fears. -Gillian Anderson</b>",
    "<b>Aim for the sky\, but move slowly\, enjoying every step along the way. It is all those little steps that make the journey complete. -Chanda Kochhar</b>",
    "<b>Focus on the journey\, not the destination. Joy is found not in finishing an activity but in doing it. -Greg Anderson</b>"
]

function randomQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('showQuotes').innerHTML = quotes[randomNumber];
    // quotes.style.fontWeight = 'bold';
}