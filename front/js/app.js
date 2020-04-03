/*jshint esversion: 6 */

let theader = {
	props : {
		title : { type : String, default : 'Tyaco'},
		graph : { type : String }
	},

	template : `
	<header class="container box" :class="graph">
		<h1>TYACO</h1>
		<p class="italic">Train Yourself and Challenge Others</p>
		<div>
			<button>Login</button>
			<button>Signin</button>
		</div>
	</header>
	`
};

let contest= {
	props : {
		title : String,
		description : String,
		graph : String
	},

	template : `
	<div class="box contest classicBG darkPEN" :class="graph">
		<h3>{{ title }}</h3>
		<p class="italic">{{ description }}</p>
	</div>
	`
};

let app = new Vue({
	el: '#app',

	data : {
		contests : [
			{ title :'Contest1', description : "Un concours photo"},
			{ title :'Contest2', description : "Un concours photo plus meilleur"},
			{ title :'Contest3', description : "Un concours photo plus meilleur"},
			{ title :'Contest4', description : "Un concours photo plus meilleur"},
			{ title :'Contest5', description : "Un concours photo plus meilleur"},
			{ title :'Contest12', description : "Cette description est beaucoup trop longue pour être afficher ma race !!!!!"}
		]
	},

	components : { theader, contest }
});
