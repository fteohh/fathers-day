const MAP_SIZE = 500
const NU_CENTER = ol.proj.fromLonLat([-87.6753, 42.056])

// downtown center, uncomment to use downtown instead, or make your own
// const NU_CENTER = ol.proj.fromLonLat([-87.6813, 42.049])
const AUTOMOVE_SPEED = 1
const UPDATE_RATE = 100
/*
 Apps are made out of a header (title/controls) and footer
 and some number of columns
 If its vertical, the columns can become sections in one column
 */


let landmarkCount = 0

let gameState = {
	points: 0,
	captured: [],
	messages: [],
	jokes: []
}

let jokeNum = Math.floor(Math.random() * 82)

var dadJokes = [
	{
		joke: "What did one pirate say to the other when he beat him at chess?",
		punchline: "Checkmatey."
	}, 
	{
		joke: "I burned 2000 calories today...",
		punchline: "I left my food in the oven for too long."
	},
	{
		joke: "I startled my next-door neighbor with my new electric power tool...",
		punchline: "I had to calm him down by saying 'Don’t worry, this is just a drill!'"
	},
	{
		joke: "I broke my arm in two places...",
		punchline: "My doctor told me to stop going to those places."
	},
	{
		joke: "I quit my job at the coffee shop the other day...",
		punchline: "It was just the same old grind over and over."
	},
	{
		joke: "I never buy anything that has Velcro with it...",
		punchline: "it’s a total rip-off."
	},
	{
		joke: "I used to work at a soft drink can crushing company...",
		punchline: "it was soda pressing."
	},
	{
		joke: "I wondered why the frisbee kept on getting bigger...",
		punchline: "Then it hit me."
	},
	{
		joke: "I was going to tell you a fighting joke...",
		punchline: "but I forgot the punch line."
	},
	{
		joke: "What is the most groundbreaking invention of all time?",
		punchline: "The shovel. "
	},
	{
		joke: "I’m starting my new job at a restaurant next week...",
		punchline: "I can’t wait."
	},
	{
		joke: "I visited a weight loss website...",
		punchline: "they told me I have to have cookies disabled."
	},
	{
		joke: "Did you hear about the famous Italian chef that recently died?",
		punchline: "He pasta way."
	},
	{
		joke: "Broken guitar for sale: ",
		punchline: "no strings attached."
	},
	{
		joke: "I could never be a plumber...",
		punchline: "it’s too hard watching your life’s work go down the drain."
	},
	{
		joke: "I cut my finger slicing cheese the other day...",
		punchline: "but I think I may have grater problems than that."
	},
	{
		joke: "What time did you go to the dentist yesterday?",
		punchline: "Tooth-hurty."
	},
	{
		joke: "What kind of music do astronauts listen to?",
		punchline: "Neptunes."
	},
	{
		joke: "Rest in peace, boiled water...",
		punchline: "You will be mist."
	},
	{
		joke: "What is the only concert in the world that costs 45 cents?",
		punchline: "50 Cent, featuring Nickelback."
	},
	{
		joke: "It’s not a dad bod...",
		punchline: "it’s a father figure."
	},
	{
		joke: "My wife recently went on a tropical food diet and now our house is full of this stuff...",
		punchline: "It’s enough to make a mango crazy."
	},
	{
		joke: "What do you call Santa’s little helpers?",
		punchline: "Subordinate clauses."
	},
	{
		joke: "Want to hear a construction joke?",
		punchline: "Sorry, I’m still working on it."
	},
	{
		joke: "What’s the difference between a hippo and a zippo?",
		punchline: "One is extremely big and heavy, and the other is a little lighter."
	},
	{
		joke: "I burnt my Hawaiian pizza today in the oven...",
		punchline: "I should have cooked it on aloha temperature."
	},
	{
		joke: "Anyone can be buried when they die...",
		punchline: "but if you want to be cremated then you have to urn it."
	},
	{
		joke: "Where did Captain Hook get his hook?",
		punchline: "From the second-hand store."
	},
	{
		joke: "I am such a good singer that people always ask me to sing solo... ",
		punchline: "solo that they can’t hear me. "
	},
	{
		joke: "I am such a good singer that people ask me to sing tenor...",
		punchline: "tenor twelve miles away."
	},
	{
		joke: "Occasionally to relax I just like to tuck my knees into my chest and lean forward...",
		punchline: "That’s just how I roll."
	},
	{
		joke: "What did the glass of wine say to the glass of beer?",
		punchline: "Nothing. They barley knew each other."
	},
	{
		joke: "I’ve never trusted stairs...",
		punchline: "They are always up to something."
	},
	{
		joke: "Why did Shakespeare’s wife leave him?",
		punchline: "She got sick of all the drama."
	},
	{
		joke: "I just bought a dictionary but all of the pages are blank...",
		punchline: "I have no words to describe how mad I am."
	},
	{
		joke: "If you want to get a job at the moisturizer factory...",
		punchline: "you’re going to have to apply daily."
	},
	{
		joke: "I don’t know what’s going to happen next year...",
		punchline: "It’s probably because I don’t have 2020 vision."
	},
	{
		joke: "Want to hear a joke about going to the bathroom?",
		punchline: "Urine for a treat."
	},
	{
		joke: "I couldn’t figure out how to use the seat belt...",
		punchline: "Then it just clicked."
	},
	{
		joke: "I got an email the other day teaching me how to read maps backwards–",
		punchline: "turns out it was just spam."
	},
	{
		joke: "I'm reading a book about anti-gravity...",
		punchline: "It's impossible to put down!"
	},
	{
		joke: "You're American when you go into the bathroom, and you're American when you come out, but do you know what you are while you're in there?",
		punchline: "European."
	},
	{
		joke: "Did you know the first French fries weren't actually cooked in France?",
		punchline: "They were cooked in Greece."
	},
	{
		joke: "Want to hear a joke about a piece of paper?",
		punchline: "Never mind...it's tearable."
	},
	{
		joke: "I just watched a documentary about beavers...",
		punchline: "It was the best dam show I ever saw!"
	},
	{
		joke: "If you see a robbery at an Apple Store what are you?",
		punchline: "An iWitness?"
	},
	{
		joke: "Spring is here!",
		punchline: "I got so excited I wet my plants!"
	},
	{
		joke: "What’s Forrest Gump’s password?",
		punchline: "1forrest1"
	},
	{
		joke: "Why did the Clydesdale give the pony a glass of water?",
		punchline: "Why did the Clydesdale give the pony a glass of water?"
	},
	{
		joke: "Did you hear about the guy who invented Lifesavers?",
		punchline: "They say he made a mint."
	},
	{
		joke: "I bought some shoes from a drug dealer...",
		punchline: "I don't know what he laced them with, but I was tripping all day!"
	},
	{
		joke: "Why do chicken coops only have two doors?",
		punchline: "Because if they had four, they would be chicken sedans!"
	},
	{
		joke: "How do you make a Kleenex dance?",
		punchline: "Put a little boogie in it!"
	},
	{
		joke: "A termite walks into a bar and asks,",
		punchline: "'Is the bar tender here?'"
	},
	{
		joke: "Why did the invisible man turn down the job offer?",
		punchline: "He couldn't see himself doing it."
	},
	{
		joke: "I used to have a job at a calendar factory–",
		punchline: "but I got the sack because I took a couple of days off."
	},
	{
		joke: "I used to have a job at a calendar factory...",
		punchline: "but I got the sack because I took a couple of days off."
	},
	{
		joke: "A woman is on trial for beating her husband to death with his guitar collection. Judge says, 'First offender?'",
		punchline: "She says, 'No, first a Gibson! Then a Fender!'"
	},
	{
		joke: "How do you make holy water?",
		punchline: "You boil the hell out of it."
	},
	{
		joke: "I had a dream that I was a muffler last night.",
		punchline: "I woke up exhausted!"
	},
	{
		joke: "Did you hear about the circus fire?",
		punchline: "It was in tents!"
	},
	{
		joke: "Don't trust atoms...",
		punchline: "They make up everything!"
	},
	{
		joke: "How many tickles does it take to make an octopus laugh?",
		punchline: "Ten-tickles."
	},
	{
		joke: "I’m only familiar with 25 letters in the English language...",
		punchline: "I don’t know why."
	},
	{
		joke: "Why did the cow in the pasture get promoted at work?",
		punchline: "Because he is OUT-STANDING in his field!"
	},
	{
		joke: "What do prisoners use to call each other?",
		punchline: "Cell phones."
	},
	{
		joke: "Why couldn't the bike standup by itself?",
		punchline: "It was two tired."
	},
	{
		joke: "Why couldn't the bike standup by itself?",
		punchline: "It was two tired."
	},
	{
		joke: "Who was the roundest knight at King Arthur’s round table?",
		punchline: "Sir Cumference. "
	},
	{
		joke: "Did you see they made round bails of hay illegal in Wisconsin?",
		punchline: "It’s because the cows weren’t getting a square meal."
	},
	{
		joke: "You know what the loudest pet you can get is?",
		punchline: "A trumpet."
	},
	{
		joke: "What do you get when you cross a snowman with a vampire?",
		punchline: "Frostbite."
	},
	{
		joke: "What do you call a deer with no eyes?",
		punchline: "No idea!"
	},
	{
		joke: "Can February March?",
		punchline: "No, but April May!"
	},
	{
		joke: "What do you call a lonely cheese?",
		punchline: "Provolone."
	},
	{
		joke: "Why can't you hear a pterodactyl go to the bathroom?",
		punchline: "Because the pee is silent."
	},
	{
		joke: "What did the buffalo say to his son when he dropped him off at school?",
		punchline: "What did the buffalo say to his son when he dropped him off at school?"
	},
	{
		joke: "What do you call someone with no body and no nose?",
		punchline: "Nobody knows."
	},
	{
		joke: "You heard of that new band 1023MB?",
		punchline: "They're good but they haven't got a gig yet."
	},
	{
		joke: "Why did the crab never share?",
		punchline: "Because he's shellfish."
	},
	{
		joke: "How do you get a squirrel to like you?",
		punchline: "Act like a nut."
	},
	{
		joke: "Why don't eggs tell jokes?",
		punchline: "They'd crack each other up."
	},
	
	// {
	//     joke: "",
	//     punchline: ""
	// },
	
	]

// Create an interactive map
// Change any of these functions

let map = new InteractiveMap({
	mapCenter: NU_CENTER,

	// Ranges
	ranges: [500, 200, 90, 1], // must be in reverse order

	initializeMap() {
		// A good place to load landmarks
		this.loadLandmarks("landmarks-shop-evanston", (landmark) => {
			// Keep this landmark?

			// Keep all landmarks in the set
			return true

			// Only keep this landmark if its a store or amenity, e.g.
			// return landmark.properties.amenity || landmark.properties.store
		})

		// Create random landmarks
		// You can also use this to create trails or clusters for the user to find
		for (var i = 0; i < 10; i++) {

			// make a polar offset (radius, theta) 
			// from the map's center (units are *approximately* meters)
			let position = clonePolarOffset(NU_CENTER, 400*Math.random() + 300, 20*Math.random())
			this.createLandmark({
				pos: position,
				name: words.getRandomWord(),
			})
		}
	},

	update() {
		// Do something each frame
	},

	initializeLandmark: (landmark, isPlayer) => {
		// Add data to any landmark when it's created

		// Any openmap data?
		if (landmark.openMapData) {
			console.log(landmark.openMapData)
			landmark.name = landmark.openMapData.name
		}
		
		// *You* decide how to create a marker
		// These aren't used, but could be examples
		landmark.idNumber = landmarkCount++
		landmark.color = [Math.random(), 1, .5]

		// Give it a random number of points
		landmark.points = Math.floor(Math.random()*10 + 1)
		return landmark
	}, 

	onEnterRange: (landmark, newLevel, oldLevel, dist) => {
		// What happens when the user enters a range
		// -1 is not in any range

		

		console.log("enter", landmark.name, newLevel)

		//add joke to gamestate
		if (newLevel ==1){
			gameState.jokes.push(dadJokes[jokeNum].joke)
		}
		else if (newLevel == 2) {

			// Add points to my gamestate
			gameState.points += landmark.points

			// add punchline to gamestate
			gameState.jokes.push(dadJokes[jokeNum].punchline)

			// Have we captured this?
			if (!gameState.captured.includes(landmark.name)) {
				gameState.captured.push(landmark.name)
				//change joke number for next landmark
				jokeNum = Math.floor(Math.random() * 82)
				// Add a message
				gameState.messages.push(`You captured ${landmark.name} for ${landmark.points} points`)
			}

		}
	},

	onExitRange: (landmark, newLevel, oldLevel, dist) => {
		// What happens when the user EXITS a range around a landmark 
		// e.g. (2->1, 0->-1)
		
		console.log("exit", landmark.name, newLevel)
	},
	
	
	featureToStyle: (landmark) => {
		// How should we draw this landmark?
		// Returns an object used to set up the drawing

		if (landmark.isPlayer) {
			return {
				icon: "person_pin_circle",
				noBG: true // skip the background
			}
		}
		
		// Pick out a hue, we can reuse it for foreground and background
		let hue = landmark.points*.1
		return {
			label: landmark.name + "\n" + landmark.distanceToPlayer +"m",
			fontSize: 8,

			// Icons (in icon folder)
			icon: "stars",

			// Colors are in HSL (hue, saturation, lightness)
			iconColor: [hue, 1, .5],
			bgColor: [hue, 1, .2],
			noBG: false // skip the background
		}
	},

	
})



window.onload = (event) => {


	const app = new Vue({
		template: `
		<div id="app">
		<header></header>
			<div id="main-columns">

				<div class="main-column" style="flex:1;overflow:scroll;max-height:200px">
					
					{{gameState}}
					
				</div>

				<div class="main-column" style="overflow:hidden;width:${MAP_SIZE}px;height:${MAP_SIZE}px">
					<location-widget :map="map" />
				
				</div>

			</div>	
		<footer></footer>
		</div>`,

		data() {
			return {
			
				map: map,
				gameState: gameState
			}
		},

		// Get all of the intarsia components, plus various others
		components: Object.assign({
			// "user-widget": userWidget,
			// "room-widget": roomWidget,
			"location-widget": locationWidget,
		}),

		el: "#app"
	})

};

