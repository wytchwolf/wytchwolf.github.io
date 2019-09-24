// Matching Horse Coat Colors and Gentics

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, GenCards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /><p><strong>'+ v.name +'</strong></p></div>\
				<div class="back"><img src="card_back_horse.png"\
				alt="horse" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: " ",
			img: "cards/card_horse_bay.png",
			id: 1,
		},
		{
			name: " ",
			img: "cards/card_horse_black.png",
			id: 2
		},
		{
			name: " ",
			img: "cards/card_horse_buckskin.png",
			id: 3
		},
		{
			name: " ",
			img: "cards/card_horse_cremello.png",
			id: 4
		}, 
		{
			name: " ",
			img: "cards/card_horse_dun.png",
			id: 5
		},
		{
			name: " ",
			img: "cards/card_horse_gray.png",
			id: 6
		},
		{
			name: " ",
			img: "cards/card_horse_grullo.png",
			id: 7
		},
		{
			name: " ",
			img: "cards/card_horse_palomino.png",
			id: 8
		},
		{
			name: " ",
			img: "cards/card_horse_sorrel.png",
			id: 9
		},
		{
			name: " ",
			img: "cards/card_horse_white.png",
			id: 10
		},
		{
			name: " ",
			img: "cards/cards_horse_wildbay.png",
			id: 11
		},
		{
			name: " ",
			img: "cards/card_horse_perlino.png",
			id: 12
		},
	];
// Genetic cards	
	var GenCards = [
		{
			name: "Bay",
			img: " ",
			id: 1,
		},
		{
			name: "Black",
			img: " ",
			id: 2
		},
		{
			name: "Buckskin",
			img: " ",
			id: 3
		},
		{
			name: "Cremello",
			img: " ",
			id: 4
		}, 
		{
			name: "Dun",
			img: " ",
			id: 5
		},
		{
			name: "Gray",
			img: " ",
			id: 6
		},
		{
			name: "Grullo",
			img: " ",
			id: 7
		},
		{
			name: "Palomino",
			img: " ",
			id: 8
		},
		{
			name: "Sorrel",
			img: " ",
			id: 9
		},
		{
			name: "White",
			img: " ",
			id: 10
		},
		{
			name: "Wild Bay",
			img: " ",
			id: 11
		},
		{
			name: "Perlino",
			img: " ",
			id: 12
		},
	];
    
	Memory.init(cards);


})();