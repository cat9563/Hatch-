var quotes = [
    "<b><i>A journey of a thousand miles begins with a single step. –Lao Tzu</i></b>",
    "<b><i>Whatever you do, or dream you can, begin it. Boldness has genius and power and magic in it. –Johann Wolfgang von Goethe</i></b>",
    "<b><i>If you can\’t fly\, then run\, if you can\’t walk run\, then walk\, if you can\’t walk\, then crawl\, but by all means keep moving. –Martin Luther King Jr.</i></b>",
    "<b><i>To dare is to lose one\’s footing momentarily. To not dare is to lose oneself. –Søren Kierkegaard</i></b>",
    "<b><i>The only impossible journey is the one you never begin. –Tony Robbins</i></b>",
    "<b><i>Life is a journey that must be traveled no matter how bad the roads and accommodations. -Oliver Goldsmith</i></b>",
    "<b><i>The journey is never ending. There\'s always gonna be growth\, improvement\, adversity; you just gotta take it all in and do what\'s right\, continue to grow\, continue to live in the moment. -Antonio Brown</i></b>",
    "<b><i>Perseverance is not a long race; it is many short races one after the other. -Walter Elliot</i></b>",
    "<b><i>Sometimes it\'s the journey that teaches you a lot about your destination. -Drake</i></b>",
    "<b><i>Just remember\, you can do anything you set your mind to\, but it takes action\, perseverance\, and facing your fears. -Gillian Anderson</i></b>",
    "<b><i>Aim for the sky\, but move slowly\, enjoying every step along the way. It is all those little steps that make the journey complete. -Chanda Kochhar</i></b>",
    "<b><i>Focus on the journey\, not the destination. Joy is found not in finishing an activity but in doing it. -Greg Anderson</i></b>"
]

function randomQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('showQuotes').innerHTML = quotes[randomNumber];
}