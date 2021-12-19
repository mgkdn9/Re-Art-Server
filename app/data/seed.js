const mongoose = require('mongoose')
const Piece = require('../models/piece')
const Tag = require('../models/tag')

//Impressionist
[{
    "title": "Impression Sunrise",
    "description": "The painting is credited with inspiring the name of the Impressionist movement. mpression, Sunrise depicts the port of Le Havre, Monet's hometown.",
    "artist": "Claude Monet",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://https://www.claude-monet.com/images/paintings/impression-sunrise.jpg.britannica.com/w:690,h:388,c:crop/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg"
},
{
    "title": "The Basket of Apples",
    "description": "The Basket of Apples is a still life oil painting by French artist Paul Cézanne, which he created c. 1893. The painting rejected realistic representation in favour of distorting objects to create multiple perspectives.",
    "artist": "Paul Cézanne",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://www.artic.edu/iiif/2/52ac8996-3460-cf71-cb42-5c4d0aa29b74/full/1686,/0/default.jpg"
},
{
    "title": "Paris Street; Rainy Day",
    "description": "Paris Street; Rainy Day  is a large 1877 oil painting by the French artist Gustave Caillebotte (1848–1894), and is his best known work. It shows a number of individuals walking through the Place de Dublin, then known as the Carrefour de Moscou, at an intersection to the east of the Gare Saint-Lazare in north Paris.",
    "artist": "Gustave Caillebotte",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://www.artic.edu/iiif/2/52ac8996-3460-cf71-cb42-5c4d0aa29b74/full/1686,/0/default.jpg"
},
{
    "title": "Bal du moulin de la Galette",
    "description": "The painting depicts a typical Sunday afternoon at the original Moulin de la Galette in the district of Montmartre in Paris. In the late 19th century, working class Parisians would dress up and spend time there dancing, drinking, and eating galettes into the evening.",
    "artist": "Pierre-Auguste Renoir",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://www.renoir.net/images/paintings/bal-du-moulin-de-la-galette.jpg"
}]

// Pop
[{
    "title": "Andy Mouse III",
    "description": "Andy Mouse is a series of silkscreen prints created by American artist Keith Haring in 1986. The character Andy Mouse is a fusion between Disney's Mickey Mouse and Andy Warhol. The series consists of four silkscreen prints on wove paper, all signed and dated in pencil by Haring and Warhol.",
    "artist": "Keith Haring",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://www.guyhepner.com/wp-content/uploads/2015/04/andymouse3.gif"
},
{
    "title": "Portrait of an Artist (Pool with Two Figures)",
    "description": "An accidental encounter of two photographs taken by David Hockney, one of a swimmer in a Hollywood’s pool, the other of a figure (Peter) staring at the floor, inspired him in 1966. September 1971, the canvas is sketched then abandoned. The canvas would be finished a few days just before its exhibition in André Emmerich Gallery in New-York on May 1972.",
    "artist": "David Hockney",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://www.guyhepner.com/wp-content/uploads/2018/06/unnamed-3.jpg"
},
{
    "title": "Jean-Michel Basquiat",
    "description": "Andy Warhol was an American artist, film director, and producer who was a leading figure in the visual art movement known as pop art. His works explore the relationship between artistic expression, advertising, and celebrity culture that flourished by the 1960s, and span a variety of media, including painting, silkscreening, photography, film, and sculpture. Some of his best known works include the silkscreen paintings Campbell's Soup Cans (1962) and Marilyn Diptych (1962), the experimental films Empire (1964) and Chelsea Girls (1966), and the multimedia events known as the Exploding Plastic Inevitable (1966–67).",
    "artist": "Andy Warhol",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://news.artnet.com/app/news-upload/2021/10/Warhol-1-1024x1001.jpg"
},
{
    "title": "Chain Smoker",
    "description": "Rosalyn Drexler is an American visual artist, novelist, Obie Award-winning playwright, and Emmy Award-winning screenwriter. Drexler is perhaps best known for her pop art paintings and as the author of the novelization of the film Rocky, under the pseudonym Julia Sorel. Rosalyn Drexler was one of the early artists to mine American kitsch and pop culture for her practice. In the early 1960s, Drexler created paintings by collaging images from B-movies, tabloids, and pulp novels directly onto her canvases, before painting over them in a cool, flat style with acrylic paint.",
    "artist": "Rosalyn Drexler",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/59137eb49de4bb5c37ca5043/1501701238454-0X2V8PL8KWRDP84TQNO0/DREPT079-%5Bhi-res%5D.png?format=1500w"
}]

// Contemporary
[{
    "title": "Milky Way",
    "description": `"As Doig explains, “The tree line in Milky Way is a mixture of what I could see from my working space in my parent’s barn and other sketches I made of Northern-looking pines and dying trees. The idea was the trees were illuminated by city light or artificial light from afar - I had just read Don Delillo’s White Noise that influenced the light in these paintings as well."`,
    "artist": "Peter Doig",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://www.nationalgalleries.org/sites/default/files/styles/feature-figure-large/public/features/milky%20way_0.jpg?itok=NGSkO-lP"
},
{
    "title": "Retopistics: A Renegade Excavation",
    "description": `"My aim is to have a picture that appears one way from a distance--almost like a cosmology, city or universe from afar--but then when you approach the work, the overall image shatters into numerous other pictures stories and events...My initial impulse and investigation was to try and develop, through drawing, a language that could communicate different types of narratives and build a cityscape, each mark having a character, a modus operandi of social behavior. As they continued to grow and develop in the drawing I wanted to see them layered; to build a different kind of dimension of space and time into the narratives."`,
    "artist": "Julie Mehretu",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://i1.wp.com/www.culturetype.com/wp-content/uploads/2016/10/kjm_dz_studio.jpg?ssl=1"
},
{
    "title": "Untitled (Studio)",
    "description": "Untitled (Studio) is in part about that discovery of a Black artist’s workshop—a place of labor where an allegorical catalogue of all modes of art making is on display. At the same time, it is also a majestic ode to the job of the artist, the history of painting, and the multiple possibilities that still pump through the heart of its practice.",
    "artist": "Kerry James Marshall",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://www.artic.edu/iiif/2/52ac8996-3460-cf71-cb42-5c4d0aa29b74/full/1686,/0/default.jpg"
},
{
    "title": "The Longest Night",
    "description": "Yoshitomo Nara is a pioneering figure in contemporary art whose signature style—which expresses children in a range of emotional complexities from resistance and rebellion to quietude and contemplation—celebrates the introspective freedom of the imagination and the individual.",
    "artist": "Yoshitomo Nara",
    "tags": ["61b79b4c9c25695d79ddf829"],
    "imgUrl": "https://i.guim.co.uk/img/media/6c3daf2300be54340e978fa9c19ec8c3e1e2a71f/58_496_2436_1462/master/2436.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=c0a49d737604c48d7c6e7046e4f1d262"
}]