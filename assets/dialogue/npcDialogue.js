var RPG = RPG || {};

var moveToIndex = function(index,num) {
	return index + num;
}

//moveToIndex(npcDialogue['Carl'],2);
var r = RPG.npcFunctions;

var npcDialogue = {
	'Jason Kenney' : [
		[
			['People of Alberta. I am here to lead you!'],
			0,1, function() { r.intro_rick_01()}
		],
		[
			['Friends! Let us break steak together, as is the Albertan custom, and discuss a merging of our parties.',
			'Only as a united front can we ‘free enterprise’ Albertans break the NDP scourge bringing ruin to our province.'],
			0,2, function() { r.intro_rick_02()}
		],
		[
			['Brian, Richard. Take a look at the numbers! The numbers! Our votes combined all but guarantee us victory in the next election.',
			'Alberta can’t afford its leaders on the right to dwell on their differences. Now is the time to unite!'],
			0,3,function() { r.intro_rick_03(); }
		],
		[
			['I AM listening, Brian. What I hear is the song of destiny and, reluctantly, I must obey.'],
			0,4,function() { r.intro_brian_03(); }
		],
		[
			['I can see convincing my people that I’m their rightful leader will be more challenging than I’d previously thought.',
			'Much face-to-face discussion with the good people of this land is necessary to show them I can lead.',
			'But in the end, I WILL restore the Alberta Advantage!'],
			0,5,function() { RPG.GameState.callInstruction('intro'); }//tutorial call here
		],
		[//5
			['Victory!'],
			0,6,function() { r.end_harper_ascends(); }
		],
		[//6
			['If there is no way to avoid it, then so it is the Will of Destiny.',
			'I weep for the political careers that will be lost.'],
			0,15,function() { r.end_other_characters(); }
		],
		[//7
			['A talking cow. How bizarre!',
			'But as Sun Tzu writes...',
			'...victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.',
			'I\'d best seek out whatever advantage I can before meeting Brian on the field.'],
			0,8,function() { RPG.GameState.initDialogue(['Head south along main road to meet Empress Bovina.']) }
		],
		[//8
			[
			'Do I dare aid self-interested elites in the service of securing my own political advantage?',
			[ ['Yes.',9],['...',10] ]
			],
			0,8
		],
		[//9
			[
			'Empress Bovina, I will aid you in fulfilling my destiny!'
			],
			0,8,function() {
				Player.animations.play(RPG.GameState.bwd);
				var tween = t.add.tween(Player).to({y:320},800).start();
				tween.onComplete.add(function() {
					Player.animations.stop();
					Player.frame = 3;
				},this);
				RPG.GameState.npcs.children[0].data.dialogueIndex = 27;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true); }
		],
		[//10
			[
			'Hmm...',
			[ ['Yes.',9],['Of course!',9] ]
			],
			0,10
		],
		[//11
			[
			'Dumb beasts!',
			'I mean, uh...Delicious beasts!',
			'Erm...rather...Noble...cows...',
			[ ['Moo...moo...?',12],['Moo Bos Tauroo!',13] ]
			],
			0,10
		],
		[//12
			[
			'Dammit, no. Uh...Moo...Moo...'
			],
			0,14,function() { r.herdFailing(); }
		],
		[//13
			[
			'That\'s it!'
			],
			0,14,function() { RPG.GameState.camera.follow(null); r.cowResponse(RPG.GameState.npcs.children[0],1); }
		],
		[//14
			[
			'Ah...Moo...Moo...',
			'Moo...Bos Tauroo! That\'s it!'
			],
			0,15,function() { RPG.GameState.camera.follow(null); r.cowResponse(RPG.GameState.npcs.children[0],1); }
		],
		[//15
			[
			'And so the curtain closes on this chapter of my holy quest.',
			'But there is still much toil ahead.',
			'As freemarket Albertans gather under a single tent with the might of conservative values at our side...',
			'...the day of Alberta\'s return to its rightful rulers who will ensure prosperity for all draws closer at hand.',
			'And now...',
			'And now...SONG!'
			],
			0,16,function() { r.finale_musical(); }
		],
		[//16
			[
			'Just as I thought. The surrounding lands are crawling with socialists. I must keep my sword close.'
			],
			0,16,function() { RPG.GameState.callInstruction('attack'); }
		]

	],
	'Brian Jean' : [
		[
			['Jason, anyone wishing to work with the corrupt PCs and return them to power will never have the support of the Wildrose Party.'],
			0,1,function() { r.intro_kenney_02() }
		],
		[
			['Kenney, we’ve been friends in the past, working to restore conservatism’s rightful place in Canada.',
			'Listen to me — listen to ALBERTANS: A return to PC rule would be bad for the province.'],
			0,2,function() { r.intro_kenney_04(); }
		],
		[
			['*Gag*'],
			0,3,function() { r.intro_kenney_05(); }
		],
		[//3
			['This is impossible!',
			'Unity between our parties is out of the question. I\'ll go to war before joining you.'],
			0,3,function() { r.end_kenney_dialogue_a(); }
		],
		[//4
			['Are you so mistrusting? You remember we\'re the straight-shootin\' types here in the West.',
			'Albertan poiticians are as practiced in duplicity as anywhere else.',
			'Keenly observed. I think we may actually be of mutual aid to one another.',
			'Yes! Kneel before me and pledge your steel to unity. Only then can you truly advance your interests.',
			'I have another way: we face off in a test of manliness. Mano a mano. A classic duel.',
			[['Like a duel with pistols?',7],['I ask again: what advantage do you think you have?',9]]],
			0,1,function() {}
		],
		[//5
			['I think we may actually be of help to one another.',
			'Yes! Kneel before me and pledge your steel to unity. Only then can you truly advance your interests.',
			'I have another way: we face off in a test of manliness. Mano a mano. A classic duel.',
			[['Like a duel with pistols?',7],['The idea\'s absurd.',8]]],
			0,1,function() {}
		],
		[//6
			['Jason! Good of you to drop by!',
			'The Wildrose camp is looking orderly.',
			'Spare me the pleasantries. I was just reviewing strategy and you\'ve now become a key factor!',
			[ ['What advantage do you think you have over me?',4],['Go on...',5] ]],
			0,6
		],
		[//7
			['No. Nothing messy. Nothing that would compromise our political careers.',
			'What other kind of duel is there?',
			'A rodeo showdown. Good ol\' cattle herdin\'. It\'ll give Wildrosers a show they won\'t soon forget.',
			[['Hmm...perhaps another time.',13],['If I can command Ottawa bureaucrats I can command a herd of cows. Easy.',10]]],
			0,0
		],
		[//8
			['I disagree! Wildrose voters respect masculine prowess. They drink the very sweat and the seed of their herd\'s bull for communion.',
			'...Ew.',
			'Ha! And therein lies my advantage: you\'re nothing more than an city-slickin\' dandy.',
			[['Very well. I will rise to the occasion!',14],['There is nothing emasculating in the enjoyment of the finer things.',11]]],
			0,0
		],
		[//9
			['I keep my cards as close as you, Jason.',
			'But your face gives you away, Brian. Remember: we once worked together.',
			'Enlighten me.',
			'Whether I win or lose, I have little to gain other than a small portion of potential Wildrose supporters.',
			'Go on...',
			'Whereas if you win, you win everything. It\'s your best calculation.',
			'Brava!',
			[['Will this be a duel with pistols?',7],['I need to give this some thought.',13]]],
			0,0
		],
		[//10
			['Excellent! Meet me in the valley to the east. The NDP stalks those lands and there are herds aplenty. I\'ll have the guards open the way.',
			'May the best man win.'],
			0,0,function() { r.q_wr_b_brianLeave(); }
		],
		[//11
			['Yes! Oh...no. No. I remember...the pressed satin sheets at Chateau Laurier...',
			'Piping-hot kutya at the Ukrainian embassy during Christmas...',
			'The House of Commons\' interior design staff. Edmundo had the deftest touch...',
			'You see? As former MPs we\'re cut from the same cloth.',
			'Those days are over, Jason. We\'re back in Alberta now. We have to play our message to Albertans.',
			[['Our fight isn\'t with one another.',12],['Then duel we must.',10]]],
			0,0
		],
		[//12
			['No. It very much is. The Wildrose was formed in opposition to everything the decadent PC Albertans have become. To join them is folly.',
			'Compromise and our tent will accomodate all ends of the political spectrum while hearkening a new dawn of transparency and responsibility!',
			'Or we can have a classic cattle herding showdown and put to bed your foolish campaign for unity now. What do you say?',
			[["Very well. You leave me little choice.",10],["You\'ll have to wait on my answer.",15]]],
			0,0
		],
		[//13
			['A pity! If you change your mind you know where I am.'],
			0,16
		],
		[//14
			['Excellent! It will be a classic rodeo duel: cattle herding. I\'ll have the guards open the way.',
			'May the best man win.',
			'Be advised the NDP stalks the land between here and the valley. Like your whole campaign, you\'ll have to fight your enemies alone.'],
			0,0,function() { r.q_wr_b_brianLeave(); }
		],
		[//15
			['Very well! When you\'re ready to answer wisely you know where I am.'],
			0,16
		],
		[//16
			[
			'Jason, you\'ve returned! What is your answer?',
			[['I will duel you.',10],['On second thought, I need more time.',15]]
			],
			0,16
		],
		[//17
			[
			'Jason, you\'re here! I honestly thought you\'d chicken out.',
			'Never! I have an appointment with desti—',
			'Yes, yes. We know. Look who just happened to be here: the media! With cameras and everything!',
			'Good of you to provide exposure for me, Brian. Heh heh heh...',
			'You won\'t be laughing so hard when I put a definitive end to any chance you have of pulling my party out from under me.',
			'We\'ll see about that. Show me the herd.'
			],
			0,18,function() { r.q_wr_bb_herdIntro(); }
		],
		[//18
			[
			'Your herd\'s on the left, Jason. The pen\'s just up ahead.',
			'Very good.',
			'Since you seem so confident I\'ll leave you get on pretending to be a real cattleman. Are the cameras rolling? Good luck!'
			],
			0,19,function() { r.q_wr_bb_herd_b();  }
		],
		[//19
			[
			'Hee-yah! Hee-yah!',
			'Yip! Yip! Yip!'
			],
			0,20,function() { r.runInterval = true; r.herdJasonReturn();  }
		],
		[//20
			[
			'...',
			'Well...',
			'Well... dangit.'
			],
			0,21,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[4].data,true,true)  }
		],
		[//21
			[
			'Brian! The best man has won!',
			'Can it, Jason. The Wildrose will never fall to you. Let\'s go.'
			],
			1,21,function() { RPG.npcFunctions.jeanExit();  }
		]
	],
	'Tent Guard' : [
		[
			["The delegated convention will be held this way. You may not enter now."],
			0,0
		]
	],
	'Big Troll' : [
		[
			['NDP villains! Return Jim Prentice his balls at once!',
			'Nyagh! Trophies for Queen Notley! Never!'],
			1,0
		]
	],
	'Rick McIver' : [
		[//0
			['Boo! As interim leader of the Progressive Conservatives of this province, I say, "Go back to Ottawa!"'],
			0,1,function() { r.intro_brian_01(); }
		],
		[//1
			['You’ve been east too long, Jason. You think you can run the west\'s affairs just like they do.'],
			0,2,function() { r.intro_kenney_03(); }
		],
		[//2
			['You’re a fool and a charlatan, Kenney. No self-respecting PROGRESSIVE conservative voter will answer to the likes of you.'],
			0,3,function() { r.intro_brian_02(); }
		],
		[//3
			['Jason. You see yourself fit to show your face at a candidates\' meeting?',
			'The leadership race is open to all, as it should be in any transparent, democratic system.',
			'You forget our party\'s Do No Harm clause. Wanting to disband the party to unite with Wildrose should automatically disqualify you.',
			'Ha! I can\'t imagine a scenario where the Alberta PCs would run a Soviet-style election that excludes candidates or grassroots members.',
			'What have we got to lose? Our very survival\'s at stake. Which is why we\'ve already taken steps to limit your influence.',
			'And what would those be?'],
			0,4,function() {
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[2].data,true,false);
			}
		],
		[//4
			['What\'s more, five of every 15 delegates from each of the province\'s 87 ridings have to be party insiders.',
			'You\'ve stacked the deck in your favour. It\'s this very entitlement that has brought ruin to Alberta!'],
			0,5,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[2].data,true,true); }
		],
		[//5
			['Silence!'],
			0,3,function() { 
				RPG.GameState.npcs.children[1].data.dialogueIndex = 8;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true);
			 } 
		],
		[//6
			['Silence!',
			'Your small minded thinking has produced a small-tent party. Albertans will no longer grovel at your feet as they have for a generation.',
			'Nonsense! Our tent is huge. The biggest!',
			[ ['My tent would be bigger.',7],['Not so!',8] ]],
			0,3
		],
		[//7
			['I doubt that.'],
			0,3, function() { 
				RPG.GameState.npcs.children[3].data.dialogueIndex = 9;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[3].data,true,true); }
		],
		[//8
			['In your haste to destroy us you give the PCs of Alberta too little credit.',
			'This party can\'t be an exercise in nostalgia! You claim to represent everyone but you\'re all the same old insiders.',
			'As interim leader and the only one here not running, I\' ll say this:'],
			0,8,function() { 
				RPG.GameState.npcs.children[1].data.dialogueIndex = 9;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true); 
			} 
		],
		[//9
			['Alberta\'s too smart a province for the likes of you, Kenney. I\'ll eat my hat the day I see you leading a united right in this great land.',
			'That day will come sooner than you think.'],
			0,11,function() {
				RPG.GameState.npcs.children[2].data.dialogueIndex = 7; // set richard to index 5
				RPG.GameState.npcs.children[3].data.dialogueIndex = 3; // set byron to index 2
				RPG.GameState.npcs.children[5].data.dialogueIndex = 1; // set stephen to index 1
				RPG.GameState.setJSONDialogueIndex('Byron Nelson',3);
				RPG.GameState.setJSONDialogueIndex('Stephen Khan',1);
				RPG.GameState.setJSONDialogueIndex('Richard Starke',7);
			}
		],
		[//10
			['Damn and blast! Well, I said I\'d eat my hat if I had one and this day has come.',
			'Myself and the party will fall in line behind you. But this doesn\'t mean uniting with the Wildrose is guaranteed.'],
			0,3,function() {
				RPG.npcFunctions.end_brian_jean();
			}
		],
		[//11
			['Return to Ottawa, Kenney. You\'re already finished here.'],
			0,11
		],
		[//12
			[
			'Jason! You\'ll find the convention through the door ahead. Heh heh heh...',
			'My, you\'re in a jolly mood today!'
			],
			0,13
		],
		[
			[
			'Heh heh heh...'
			],
			0,13
		]

	],
	// 'Sandra Jansen' : [
	// 	[//0
	// 		['We\'ve changed the rules.',
	// 		'Again?!',
	// 		'You\'ve quickly become too big for your britches. We other candidates had to act quickly.',
	// 		'What are you planning?'],
	// 		0,0,function() { 
	// 			RPG.GameState.initDialogue({'character':'Donna Kennedy-Glans','dialogueIndex':1,'name':'npc_donna_glans'},true,true);
	// 		}
	// 	],
	// 	[//1
	// 		['We\'ve changed the rules. The one-member, one-vote system is out. The party\'s decided to move to a delegated convention.'],
	// 		0,2,function() { 
	// 			RPG.GameState.initDialogue(RPG.GameState.npcs.children[3].data,true,true);
	// 		}
	// 	],
	// 	[//2
	// 		['It takes big talk about entitlement to know it, Kenney. You\'re just a carpetbagger out of the federal establishment.',
	// 		[ ['The grassroots won\'t stand for this.',3],['Am not!',4] ]],
	// 		0,3
	// 	],
	// 	[//3
	// 		['The "grassroots" you keep nattering on about doesn\'t care.',
	// 		'Hmph. Then you\'ve already conceded defeat.',
	// 		'As if.'],
	// 		0,3,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true); }
	// 	],
	// 	[//4
	// 		['Are, too!'],
	// 		0,3,function() { 
	// 			RPG.GameState.npcs.children[1].data.dialogueIndex = 6;
	// 			RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true); 
	// 		}
	// 	],
	// 	[//5
	// 		['I\'m Sandra Jansen, MLA for Calary-North West and a big deal to my constituents.',
	// 		'Ms. Jansen, I don\'t doubt it.',
	// 		'But my constituency doubts you.',
	// 		'They are right to be skeptical. They\'ve endured rules of misrule by their own leaders.',
	// 		'Cute. Listen: Albertan women aren\'t to be messed with. We will run your life into the ground.',
	// 		'Uh...',
	// 		'We wear big spurs just like the cowboys and we\'re not afraid to grind our heels into bottom-feeders like you.',
	// 		'Woah, hold on there Ms. Jansen...',
	// 		'And when we\'re done we will raise a @!*ing barn and square dance over your broken, sorry carcass.',
	// 		'Ah...Hmm...',
	// 		'All that said, good luck out there, hombre!'],
	// 		0,6
	// 	],
	// 	[//6
	// 		['Still fighting the wrong fight, Jason?',
	// 		'Look, you\'re just a Dipper in blue clothing.',
	// 		'You\'re going to up your rhetoric if you\'re going to hurt my feelings, bucko.'],
	// 		0,7
	// 	],
	// 	[//7
	// 		['Good luck out there, hombre!'],
	// 		0,7
	// 	]
	// ],
	// 'Donna Kennedy-Glans' : [
	// 	[//0
	// 		['You\'re finished in Alberta, Mr. Kenney.',
	// 		'I\'m no fool. I recognise what this means.'],
	// 		0,3,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[4].data,true,true); }
	// 	],
	// 	[//1
	// 		['Alone we haven\'t the name recognition nor high-profile endorsements to win over the electorate.'],
	// 		0,2,function() { RPG.GameState.initDialogue({'character':'Byron Nelson','dialogueIndex':0,'name':'npc_byron_nelson'},true,false); }
	// 	],
	// 	[//2
	// 		['Ignite hyperpower!'],
	// 		0,2,function() { RPG.GameState.initDialogue({'character':'Byron Nelson','dialogueIndex':1,'name':'npc_byron_nelson'},true,false); }
	// 	],
	// 	[//3
	// 		['Checkmate, hotshot.'],
	// 		0,4,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[2].data,true,true); }
	// 	],
	// 	[//4
	// 		['Enough. Really.'],
	// 		0,5,function() {
	// 			RPG.GameState.npcs.children[1].data.dialogueIndex = 9;
	// 			RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true); }
	// 	],
	// 	[//5
	// 		[
	// 		'Donna Kennedy-Glans...NOT at your service. Former MLA for Calgary Varsity and Associate Minister for Electrity and Renewable Energy.',
	// 		'I understand you were one of the first ministers under Redford to show some spine and question her leadership.',
	// 		'Just as I question yours.',
	// 		'I assure you, Ms. Glans, you\'ll soon see me in a different light.',
	// 		'Hmm. I\'ve had to make decisions of conscience before. I agree this party\'s history of entitlement has been the undoing of the province...',
	// 		'Then you agree it\'s time to end it.',
	// 		'No. It\'s time to unite the centre, the broadest, biggest tent there is.',
	// 		[ ['*chuckle* You mean the mushy middle?',7],['You believe my approach to be polarizing?',8] ]
	// 		],
	// 		0,5
	// 	],
	// 	[//6
	// 		['Stay out of Alberta, cupcake. Go back to eating canapes with foreign leaders in Ottawa where you belong.' ],
	// 		0,6
	// 	],
	// 	[//7
	// 		['The PC Party served this province best when it was a broad coalition of views spanning from the centre to the right.',
	// 		'I don\'t disagree. And I\'d add those who\'d vote for the NDP would be quick to fall in line under my banner.',
	// 		'Hmph. Federal politics and regular canapes with foreign leaders have made you cocky, Mr. Kenney.'],
	// 		0,6
	// 	],
	// 	[//8
	// 		['Absolutely. You talk of the province requiring change, Mr. Kenney, but heed my words.',
	// 		'Yes?',
	// 		'Alberta already HAS changed and it will no longer elect your kind. You\'ve spent too much time in Ottawa to realise that.'],
	// 		0,6
	// 	]
	// ],
	'Byron Nelson' : [
		[//0
			['You\'re finished in Alberta, Jason.',
			'I\'m no fool. I recognise what this means.'],
			0,3,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[5].data,true,true); }
		],

		[//1
			['Alone we haven\'t the name recognition nor high-profile endorsements to win over the electorate.',
			'But together we can rally the anti-Kenney vote into the ultimate anyone-but-Kenney candidate.' ],
			0,2,function() {
				RPG.GameState.initDialogue({'character':'Richard Starke','dialogueIndex':5,'name':'npc_richard_starke'},true,false); 
				RPG.continueMusic = true;
				RPG.GameState.music.stop();
				RPG.GameState.music = RPG.GameState.game.add.audio('music_boss_assemble',0.25,true).play();
			}
		],
		[//2
			[ 'All units interlock!' ],
			0,0,function() {
				RPG.GameState.initDialogue({'character':'Richard Starke','dialogueIndex':6,'name':'npc_richard_starke'},true,false);
			}
		],
		[//3
			['Huh, I do admit: I\'m disarmingly handsome. Was that your question?',
			'Erm, no. What\'s your position on Alberta\'s future?',
			'Alberta must be restored to the land of opportunity.',
			'That\'s the Alberta Advantage! What about carbon taxes?',
			'I\'m favourable so long as they\'re revenue neutral.',
			[['Wrong choice!',4],['Uniting the right?',5]]
			],
			0,3
		],
		[//4
			[
			'What do you mean "Wrong choice?."',
			'Just my opinion. Uniting the right?'
			],
			0,5,function() {
				RPG.GameState.npcs.children[3].data.dialogueIndex = 5;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[3].data,true,true);
			}
		],
		[//5
			[
			'I don\'t see a formal merger for either parties in the future.',
			[ ['Wrong choice again!',7],['Having the name recognition to actually be elected?',8] ]
			],
			0,6
		],
		[//6
			[
			'Go away.'
			],
			0,6
		],
		[//7
			[
			'Very funny, Kenney. But your cunning federal ways won\'t get the better of me. I\'ve been a trial lawyer far too long.',
			'*aside* Heh heh. Master Harper has taught me well.'
			],
			0,6
		],
		[//8
			[
			'I — What the hell? Are you gaslighting me?! You know I\'m a trial lawyer, right?',
			'*aside* Heh heh. Master Harper has taught me well.'
			],
			0,6
		],
		[//9
			['You fail to realise how even in your language you polarize, Kenney. You\'re the wrong leader for Alberta.'],
			0,2,function() { RPG.GameState.initDialogue({'character':'Rick McIver','dialogueIndex':8,'name':'npc_rick_mciver'},true,false); }
		]
	],
	'Richard Starke' : [
		[//0
			['We\'ve changed the rules. The one-member, one-vote system is out. The party\'s decided to move to a delegated convention.'],
			0,1,function() {
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[3].data,true,true);
			}
		],
		[//1
			['It takes big talk about entitlement to know it, Kenney. You\'re just a carpetbagger out of the federal establishment.',
			[ ['The grassroots won\'t stand for this.',2],['Am not!',3] ]],
			0,1
		],
		[//2
			['The "grassroots" you keep nattering on about doesn\'t care.',
			'Hmph. Then you\'ve already conceded defeat.',
			'As if.'],
			0,4,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true); }
		],
		[//3
			['Are, too!'],
			0,4,function() {
				RPG.GameState.npcs.children[1].data.dialogueIndex = 6;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true);
			}
		],
		[//4
			['The days of selling memberships for easy votes are over.'],
			0,4,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true); }
		],
		[//5
			['Giga Candidate!',
			'Ready to form!'],
			0,6,function() { RPG.GameState.initDialogue({'character':'Stephen Khan','dialogueIndex':4,'name':'npc_stephen_khan'},true,false);  }
		],
		[//6
			['Activate megathrusters!'],
			0,6,function() { RPG.npcFunctions.final_boss_begin(); }
		],
		[//7
			['Richard Starke! MLA for Vermillion-Lloydminster.',
			'Jason Kenney! Holder of Ukraine\'s Order of Merit!',
			'Huh?',
			'It\'s a big deal in international circles.',
			'...',
			'Okay, a moderate deal.'],
			0,8
		],
		[//8
			['One thing I\'m certain of is that this party will continue.',
			'Do you not see, Richard, this party has grown weak and must transform!',
			'Says who? The pundits? The media? All the people who want to put an end to this party?',
			'The time has come to march forward and end PC entitlement. The right must join hands!',
			'This party has chosen to rebuild, not die. The convention will put an end to that debate.'],
			0,9
		],
		[//9
			['The convention will put an end to any debate about this party\'s future.'],
			0,9
		],
		[//10
			['Your quest ends here, Jason.',
			'What\'s this? Where are the delegates?'],
			0,10,function() {
				RPG.GameState.initDialogue({'character':'Stephen Khan','dialogueIndex':3,'name':'npc_stephen_khan'},true,true);
			}
		]

	],
	'Stephen Khan' : [
		[//0
			['The days of selling memberships for easy votes are over.'],
			0,4,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true); }
		],

		[//1
			[
			'The PCs of Alberta are down but not out. You, Jason, would bring us down for good.',
			'You misunderstand! I wish to bring ALL of us back up. Divided we all lose.',
			'I agree we must unite our people, but there is too great a chasm between us and the Wildrose. What worked on the national stage is folly here.',
			'I have much to prove to all of you. Have faith: I will.'
			],
			0,2
		],
		[//2
			[
			'What worked on the national stage is folly here.'
			],
			0,2
		],
		[//3
			['We\'ve changed the rules.',
			'Again?!',
			'You\'ve quickly become too big for your britches. We other candidates had to act quickly.',
			'What are you planning?'],
			0,0,function() {
				RPG.GameState.initDialogue({'character':'Byron Nelson','dialogueIndex':1,'name':'npc_byron_nelson'},true,false);
			}
		],
		[//4
			['Ignite hyperpower!'],
			0,2,function() { RPG.GameState.initDialogue({'character':'Byron Nelson','dialogueIndex':2,'name':'npc_byron_nelson'},true,false); }
		]
	],
	'npc' : [
		[
			["Hello!"],
			0,0
		]
	],
	'Wildrose Soldier' : [
		[//0
			["You drive a Dodge? Wuss."],
			0,1
		],
		[//1
			["This will be the year the Oilers turn it around."],
			0,2
		],
		[//2
			["Rexall Place surpasses the glory of Rome!"],
			0,3
		],
		[//3
			["I can sense your Ontario cooties from here."],
			0,0
		]
	],
	'First Road Sentry' : [
		[//0
			["Sorry, the road\'s closed right now. Party leader\'s orders."],
			0,0
		],
		[//1
			["Uh, still trying to get this dang truck started. Give us a minute."],
			0,0
		],
		[//2
			["The road\'s all yours, chief."],
			0,0
		]
	],
	'Second Road Sentry' : [
		[//0
			['We\'re on guard against the socialist enemy!'],
			0,0
		]
	],
	'BBQ' : [
		[//0
			[
			'You look injured. Try some Vitamin Steak!'
			],
			0,1,function() { 
					RPG.npcFunctions.healthRestored();
				}
		],
		[//1
			[
			'I\'m not vegetarian. But my food is!'
			],
			0,2,function() { 
					RPG.npcFunctions.healthRestored();
				}
		],
		[//2
			[
			'Wash down those troubles with some beef!'
			],
			0,0,function() { 
					RPG.npcFunctions.healthRestored();
				}

		]	
	],
	'PC Soldier' : [
		[//0
			["Move along."],
			0,1
		],
		[//1
			["Nickelback did nuthin\' wrong."],
			0,2
		],
		[//2
			["Four Loko is a perfectly acceptable alcoholic beverage."],
			0,3
		],
		[//3
			["I thought Alberta got rid of all its rats."],
			0,4
		],
			[//4
			["Mr., you\'re no Ralph Klein."],
			0,4
		]
	],
	'Jeffrey' : [
		[//0
			["I hear PC Alberta\'s recent former leader has taken residence high in the mountains."],
			0,0
		]	
	],
	'Deb' : [
		[
			["Alberta needs a strong leader. But what do I know? I'm just a gardener."],
			0,0
		]
	],
	'Alison Redford' : [
		[//0
			["W-who goes there?",
			"It is I, Jason Kenney! Are you Alison Redford?",
			"Yes? Yes! Alison. Alison Redford. Th-that\'s me. As former PC leader I receive...few visitors.",
			'I have come to...',
			'To reclaim the province. I know, I know. The visions have sh-shown me everything.',
			'Ah! Omens foretelling my arrival and retaking of the province YOU lost.',
			'Th-that I lost? BA HA HA!',
			'What\'s so funny?',
			'Do you know not s-see? This province c-created me! Arrogance. I-incompetence. The squandering of easy m-money.'
			],
			0,1,function() {
				//RPG.GameState.changeLevel(Player,{'targetMap':'q_wr_a','targetPosition':[930,1800]});
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true);
			}
		],
		[//1
			["I invented none of it, M-mr. Kenney. I AM Alberta!",
			[['Nonsense!',2],['You\'re clearly consumed by your devils. I\'ll be off.',3]]
			],
			0,1
		],
		[//2
			['Not at all!',
			'The resourceful, non-complacent Alberta of my youth still exists.',
			'I was honest about my f-faults, Mr. Kenney, and I paid for them.',
			[['I\'m listening...',4],['I\'m off.',5]]
			],
			1,1
		],
		[//3
			['Heed my words, Mr. Kenney, lest your devils consume YOU.',
			'And what would those words be?',
			'No saviour of the province can lead it until they\'ve faced their own hypocrocies, and you have many indeed.',
			[['Hmph!',6],['I\'m off.',5]]
			],
			0,3
		],
		[//4
			[
			"Look into the flames and confront the foe within...",
			"I'm...I'm suddenly so tired...",
			"Return now to parliament and confront the sins of your past!"
			],
			0,6,function() {  
				if (!RPG.GameState.hasQuest('q_wr_a')) {
					RPG.GameState.acquire([['quest','q_wr_a']]);
				}
				RPG.GameState.changeLevel(Player,{'targetMap':'q_wr_a','targetPosition':[930,1800]}); }
		],
		[//5
			[
			'You ignore me at your p-peril. Return when you seek wisdom.'
			],
			0,8
		],
		[//6
			[
			"But look at you! A s-small government crusader whose party oversaw years of d-deficits.",
			"*mumble* ...financial crisis...",
			"A social conservative who now talks of a 'broad, tolerant, free enterprise' coalition.",
			"You know how politics is...",
			"A free speech advocate who barred George Galloway from entering Canada...",
			"Silence!",
			"A 'BARBARIC CULTURAL PRACTICES HOTLINE,' KENNEY. WHOSE ELECTION PROMISE WAS THAT?",
			"Enough!",
			"The Fates have granted me the means to help you in your quest. Look into the flames and confront the foe within...",
			[ ['I will look...',7],['Not...not today, m\'lady.',5] ]
			],
			0,6
		],
		[//7
			[
			'What do you see?',
			'I\'m suddenly...very...tired...',
			"Return now to parliament and confront the sins of your past!"
			],
			1,9,function() {  
				if (!RPG.GameState.hasQuest('q_wr_a')) {
					RPG.GameState.acquire([['quest','q_wr_a']]);
				}
				RPG.GameState.changeLevel(Player,{'targetMap':'q_wr_a','targetPosition':[930,1800]}); }
		],
		[//8
			[
			'You return. Have you come seeking my wisdom?',
			[['I am here to listen.',4],['Ha ha! No.',5]]
			],
			0,8
		],
		[//9
			[
			'R-remember what the fire s-showed you, Jason. Because the past ALWAYS r-returns!'
			],
			0,9,function() { RPG.npcFunctions.end_scenes(); }
		]

	],
	'Detonator' : [
			[
				[
					'This should clear the path outside.',
					[['Yes',1],['No',2]]
				],
				0,0
			],
			[
				['Boom!'],
				0,0,function() {
					RPG.GameState.game.sound.play('explosion');
					RPG.GameState.removeJSONEnemy(1);
					RPG.GameState.removeTiles([499,499,499,499,499],3,false,'q_pcwr_ab');
					RPG.GameState.removeTiles([500,500,500,500,500],1,false,'q_pcwr_ab');
					RPG.GameState.removeTiles([501],1,true,'q_pcwr_ab_hut',502);
				}
			],
			[
				[],
				0,0
			]
	],
	'Ralph Klein' : [
		[//0
			["Fee Fi Fo! Who dares disturb me?",
			'Ralph Klein, Great Guardian of these lands! It is I, Jason Kenney, come seeking your favour as Alberta\'s next great leader.',
			'Hmph. Presumptive little mortal! I\'m gonna have to kick your ass!',
			'I am ready.',
			'FREEZE IN THE DARK!'],
			0,0,function() {
				if (!RPG.instrBools.boss) RPG.GameState.callInstruction('boss_begin');
				RPG.GameState.enemies.children[0].move();
				Player.canAttack = true;
				RPG.GameState.music.stop();
				RPG.GameState.music = RPG.game.add.audio('music_boss',0.6,true).play();
				Player.speed = 170;
			}
		],
		[//1
			["Oof! Oh! I\'m not the giant phantasm I once was. And YOU\'RE not just some eastern bum.",
			"Your power is still great in the hearts and minds of the people I am to lead, oh Gorgon of the West!",
			"Yes, yes. And so it will always be. You have my favour  — what was it — Kentucky?",
			"Kenney, your Divine Grace.",
			"Canary. Stupid name but whatever. Return to our people and they will speak your name favourably. The power of Klein compels them.",
			"Thank you, oh Wise and Indomitable Ruler."],
			0,1,function() {
				//RPG.GameState.enemies.children[0].hover();
				RPG.GameState.enemies.children[0].shootingTimer.stop();
				var tween = RPG.game.add.tween(RPG.GameState.enemies.children[0]).to({alpha:0},2000,null,false).start();
				tween.onComplete.add(function() {
					// TO INCLUDE: code to remove Lougheed sprite
					RPG.GameState.removeJSONEnemy(1);
					RPG.GameState.enemies.children[0].destroy();
					Player.attackActive = false;
					Player.attackTarget = {};
					Player.isAttacking = false;
					Player.canAttack = true;
					RPG.GameState.camera.follow(Player);
					RPG.eventQueue = [function() { RPG.npcFunctions.boss_klein_end(); }];
					RPG.GameState.changeLevel(Player,{targetPosition:[440,870],targetMap:'camp'});
				},this)
			}
		]
	],
	'Empress Bovina' : [
		[//0
			['Hello, Jason.',
			'Good Heavens! A talking cow!',
			'A speechless politician! I ne\'er believed I\'d see the day.',
			'What...? Who...are you?',
			'I am Empress Bovina, Queen to the Charolaingians. We are in urgent need of your help.',
			'Uh...huh. Ha ha. No! Cows are for eating. I\'m trying to lead Alberta, not PETA.',
			'Our quarrel is not with Alberta, Jason. Your foe and ours is the same: the Wildrose.',
			[ ['That cursed Brian Jean!',2],['Hold it, heifer...',1] ]],
			0,0
		],
		[//1
			['Yes?',
			'I\'m not about to do anything that hurts my standing with the Wildrose. I need their support.',
			'On the contrary, our interests align.',
			'This isn\'t a viral gag campaign for Earl\'s, is it? C\'mon guys. You can come out of hiding...',
			'This matter is of the utmost seriousness. In return, my subjects will help you defeat Brian Jean in your sacred contest.',
			[['How do you know about that?',3],['It\'s hardly sacred...',4]]],
			0,3
		],
		[//2
			['Quite. Help us and we will be of aid to you in your sacred contest with the Wildrose leader.',
			[['How do you know about that?',3],['It\'s hardly sacred...',4]]],
			0,3
		],
		[//3
			['Not all us cows are mere dumb beasts. Though pretending so works to our advantage.',
			'Surely not!',
			'If you choose to help — and you\'d be wise to — find me along the road leading south to the valley where you will carry out your contest.',
			'Yes...I suppose I\'ll look for you.'],
			0,3,function() { r.q_wr_b_bovinaExit(); }
		],
		[//4
			['Jason! You have indeed been away from Alberta too long. You\'ve forgotten the ways of its cattle ranchers.',
			'I...you\'re right. There is much I have to relearn.',
			'If you choose to help — and you\'d be wise to — find me on the path leading east to the valley where you will carry out your contest.',
			'Yes...I suppose I\'ll look for you.'],
			0,4,function() { r.q_wr_b_bovinaExit(); }
		],
		[//5
			['You found me. Good.',
			'The road is dangerous!',
			'NDP tax hikes have made mobility difficult everywhere. But not for us. Ready?',
			'Where are we --?',
			'Bang! Zoom! Straight over the moon!'],
			0,6, function() { r.q_wr_b_bovinaMoon(); }
		],
		[//6
			['Welcome to the once great Charolaingian homeland.',
			'It reminds me of Alberta under the last Trudeau government...',
			'Its fate was, in fact, similar. Once a thriving source of energy and a major feedlot for the earth\'s cattle...',
			'...',
			'...radical ideological policies at the service of earth-based elites reduced our proud moon kingdom to a mere vassal state.',
			'A tragedy.',
			'We ruling few thus led our herd to earth, and reside now in Arizona.',
			[ ['Your story offers eerie parallels.',7],['So why do you need me?',8] ]],
			0,7,function() {  }
		],
		[//7
			[
			'Alberta and the bovine species share a special relationship, long providing one another mutual enrichment.',
			'Um, not that I\'m opposed to it, but being raised for your meat is...enriching...for your species?',
			'Well, yes. Uh...at least...for, er, some of us.',
			'Huh?',
			'Come.'
			],
			0,9,function() { r.moonWalk_a(); }
		],
		[//8
			[
			'Alberta and the bovine species share a special relationship, long providing one another mutual enrichment.',
			'Um, not that I\'m opposed to it, but being raised for your meat is...enriching...for your species?',
			'Yes. To those of us who matter it is.',
			'Huh?',
			'Come with me.'
			],
			0,9,function() { r.moonWalk_a(); }
		],
		[//9
			[
			'Jason, this is Professor Steerhorn.'
			],
			0,10,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,false) }
		],
		[//10
			[
			'And my daughter, the Princess Brahman.'
			],
			0,11,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[2].data,true,true) }
		],
		[//11
			[
			'Humans often say the enemy of my enemy is my friend. While that is the case here, our ultimate goals make us more than mere friends of convenience.',
			[ ['Friends with cows? This is a hard sell.',12],['You, too, seek to return Greatness to Alberta?',13] ]],
			0,11
		],
		[//12
			['Not so after you hear what we have to say.'],
			0,14,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,false) }
		],
		[//13
			[
			'Explain to him, Professor.'
			],
			0,14,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,false) }
		],
		[//14
			[
			'I will speak!'
			],
			0,15,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true) }
		],
		[//15
			[
			'That is why we seek to depose Brian Jean and unite Alberta\'s free enterprisers.',
			'Music to my ears!',
			'An Alberta that\'s happily subservient to business is one we can enrich ourselves in.',
			[ ['Enrich yourselves?',16],['How is it you propose Brian Jean\'s removal helps me?',17] ]
			],
			0,15
		],
		[//16
			[
			'Through the selling of our subjects, Jason.',
			'You...all of you are...',
			'Judas steers. Yes. ',
			'Why, this is a cultural practice that\'s entirely...entirely...',
			[ ['...barbaric.',19],['...profitable.',18] ]
			],
			0,15
		],
		[//17
			['Don\'t be silly. Brian Jean wants to keep his job and knows he stands no chance against you.'],
			0,21,function() {
				RPG.GameState.npcs.children[1].data.dialogueIndex = 2;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,false) }
		],
		[//18
			[
			'Impressive, no?',
			'I\'d never have guessed cows had such business acumen.',
			'And political savvy. For to advance both our interests it is imperative Derek Fildebrandt holds the seat of Wildrose power.',
			'Derek. Yes! He, too, seeks a holy uniting of the right!',
			'Then our game is clear?'],
			1,21,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,false) } //throw to prof's speech
		],
		[//19
			[
			'But you seem impressed?',
			'I am! AYN RAND would be impressed! Relentlessly bigoted against you, but impressed.',
			'That\'s not all. To advance all our interests it is imperative Derek Fildebrandt holds the seat of Wildrose power.',
			'Derek. Yes! He, too, seeks a holy uniting of the right!',
			'Then our game is clear?'],
			1,21,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,false,false) } //throw to prof's speech
		],
		[//20
			['What we will do is ensure you win your contest with Brian Jean and embarrass him. He has staked his reputation on this contest, certain he will win.',
			'Will you have his cattle throw the match, uh, so to speak?',
			'You will speak the ancient creed of all Bovinia to the herd: Moo Bos Tauroo.',
			'Moo...Bos...Tauroo...',
			'The ancient creed is what binds all cattle in vapid obeisance. All inferior cattle, anyway. It has been used for millennia by us superior stock to profit off of them.',
			'I will remember these words and win the day!',
			'Go, then, Jason. And fulfill your destiny'],
			0,29,function() { r.moonExit(); }
		],
		[//21
			[
			'What is it?',
			'I need to think about this.'],
			1,21,function() { r.moonReflection(); }
		],
		[//22
			['I. SPEAK.'],
			0,23,function() {
				RPG.GameState.npcs.children[0].data.dialogueIndex = 24;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true); }
		],
		[//23
			[''],
			0,24,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true); }
		],
		[//24
			['So we can put Wildrose MLA Derek Fildebrandt in power and TRULY unite the right.',
			'Derek. Of course! He, too, seeks unity.',
			'He is already at work with the only Alberta PC MLA to have endorsed you, Mike Ellis.',
			'This is good news.',
			'Forces are marshalling in your favour, Jason, and we wish to aid you in giving those advantage the nudge they need to ensure victory and restore our profits.',
			[ ['Profits?',25 ] ]],
			0,25,function() {
				RPG.GameState.npcs.children[0].data.dialogueIndex = 25;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true); }
		],
		[//25
			[
			'Don\'t be daft, Jason. The selling of our subjects.',
			'You\'re the Judas steers of Wildrose cattlemen, aren\'t you?!',
			'Well perceived. And we will not see our influence threatened.',
			'Why, this is a cultural practice that\'s entirely...entirely...',
			[ ['...barbaric.',26],['...profitable.',19] ] ],
			0,26
		],
		[//26
			['I\'d never have guessed cows had such political savvy.',
			'Then our game is clear?'],
			1,21,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,false,true); } //throw to prof's speech
		],
		[//27
			['Excellent!'],
			0,20,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true); }
		],
		[//28
			[
			'What do you say, Jason?',
			[ ['Hold on.',21],['I will aid you in fulfilling my destiny!',27] ]
			],
			0,28
		],
		[//29
			[
			'Plans are in motion, Jason. Soon the right will be reunited and Alberta\'s ag industry will return to profitability.'
			],
			0,29,function() { RPG.npcFunctions.end_scenes(); }
		]
	],
	'Cow' : [
		[//0
			['Moo.'],
			0,0
		],
		[//1
			['Moo!'],
			0,1,function() { r.cowResponse(RPG.GameState.npcs.children[1],2); }
		],
		[//2
			['Moo!'],
			0,3,function() { r.cowResponse(RPG.GameState.npcs.children[2],3); }
		],
		[//3
			['Moo!!'],
			0,3,function() { r.cowResponse(RPG.GameState.npcs.children[3],4); }
		],
		[//4
			['Mooooo!'],
			0,4,function() { r.herdSuccess(); }
		]
	],
	'Princess Brahman' : [
		[//0
			[
			'Thank you for coming to our aid, Jason.',
			'You\'re welcome? I still don\'t understand how we can be of any help to one another.',
			'It is that awful, awful man, Brian Jean!'
			],
			0,1,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true) }
		],
		[//1
			[
			'And that Brian Jean is such a weak leader. That\'s why—'
			],
			0,2,function() { 
			RPG.GameState.npcs.children[0].data.dialogueIndex = 14;
			RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true) }
		],
		[//2
			[
			'Plus we need Brian Jean out of the way so we can—'
			],
			0,3,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,true) }
		],
		[//3
			[
			'Also, I REFUSE to move out of our estate in Arizona and back to Edmonton.',
			'UGH! It\'s SO unfair.'
			],
			0,4,function() { 
				RPG.GameState.npcs.children[0].data.dialogueIndex = 28;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true) }
			]
	],
	'Professor Steerhorn' : [
		[//0
			[
			'Hello, Jason.'
			],
			0,1,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,false) }
		],
		[//1
			[
			'Alberta\'s wealth has been good for us! The economic downturn in addition to the anti-business NDP has harmed the cattle industry.'
			],
			0,2,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[2].data,true,false)  }
		],
		[//2
			[
			'My dear boy, you have the retail political skills, the fundraising advantage and major party endorsements to truly unite Alberta\'s right.'
			],
			0,3,function() { RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,true,false)  }
		],
		[//3
			[
			'The Charolaingian elite have long understood the consequences of division within the right to its business interests.',
			'As cattle prices have soared then fallen, the high prices producers paid for our subjects have forced them to sell their cattle off at a major loss, resulting in their foreclosure.',
			'The market for our subjects has shrunk. Under the NDP government business prospects look even bleaker.', 
			'They don\'t understand business. Our profits are threatened.',
			'To remove the unsympathetic NDP and return the ag business to its rightful place in Alberta is why we seek unity on the right.'
			],
			0,4,function() { 
				RPG.GameState.npcs.children[2].data.dialogueIndex = 3;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[2].data,true,false)  }
		]
	],
	'Giga Candidate' : [
		[//0
			['I see your party got into military procurement while its hand was at the public trough!',
			'There is no future for you in Alberta. And for you, there is no FUTURE!'],
			1,0,function() {
				RPG.GameState.enemies.children[1].move(); // 1 because shadow in 0 
				Player.canAttack = true;
				RPG.GameState.music.stop();
				RPG.GameState.music = RPG.game.add.audio('music_boss',0.6,true).play();
			}
		],
		[//1
			['Noooooooo! We are defeated!'],
			0,1,function() {
				r.final_boss_defeat();
			}
		]
	],
	'Peter Lougheed' : [
		[//0
			['Jason Kenney. You seek to put an end to my party\'s legacy?.',
			'Peter Lougheed! I — No! I merely seek to continue it.',
			'*Sigh* I have resigned myself to the knowledge that the era I founded may truly be over.',
			'Then let this new era in the history of our great province find its voice in a worthy leader.',
			'Hmm, yes. I see something in you. Take this key and head west to prove your worth.'],
			0,1,function() {
				RPG.GameState.acquire([['quest','q_pc_b'],['item','iron_key']]);
			}
		],
		[//1
			[
			'To the west are the black riches to which this land owes its wealth. There you will find a door.'
			],
			0,1
		],
		[//2
			[
			'You have vanquished the Guardian. Well done! Alberta\'s minstrels will sing your name across the land.',
			'Now I must return to my slumber. Godspeed, hero.'
			],
			0,1,function() { 
				var index = RPG.GameState.retrieveJSONIndex('Peter Lougheed');
				RPG.GameState.removeJSONEnemy(index);
				RPG.GameState.npcs.children.forEach(function(targ) {
					if (targ.data.name==="npc_peter_lougheed") {
						targ.destroy();
					}
				},this);
				RPG.GameState.removeQuest('q_pc_b');
				index = RPG.GameState.retrieveJSONIndex('q_pc_b');
				RPG.GameState.removeJSONEnemy(index);
				RPG.GameState.updateJSONWaypoint('q_pc_b','camp',null,true);
				RPG.GameState.waypoints.children[0].destroy();
				RPG.GameState.showSupport(2,0);

				// Player.animations.play('celebrate');
			 }
		],
	],
	'Stephen Harper' : [
		[
			['Jason! You have done well.',
			"Master Harper!",
			"No enemy, whether on the House floor, in the Senate, media, public sector union, social advocacy group...",
			"Yes?",
			"...is of greater fortitude than the foe within.",
			"I see now our sins while in government were many. Now with my conscience clear I can truly lead Alberta.",
			"When you are stuck, Jason, my consultancy firm will be there to guide you.",
			"Thank you, Master!"],
			0,3,function() {
						RPG.GameState.npcs.children[0].frame = 1;
						var tween = RPG.GameState.add.tween(RPG.GameState.npcs.children[0]).to({y:RPG.GameState.camera.y-30},1800).start();
						tween.onComplete.add(function() {
							RPG.eventQueue = [function() { RPG.npcFunctions.q_wr_a_end(); }];
							RPG.GameState.changeLevel(Player,{targetPosition:[420,550],targetMap:'camp_wr_04'});
						},this);
					}
		],
		[
			['Well done, Jason! You have won the day.',
			'Truly, it is OUR victory!',
			'Soon the Progressive Conservatives will crown you and the real work will begin.',
			'My voice is my sword and my heart my shield!',
			'Through the grime we march on a road to gold. The Conservative army is the army of Canada!',
			'And I its...sub-leader!',
			'There is no virtue greater than free-market business principles.',
			'Nor end as sacred as small, fiscally responsible government.',
			'Soon pipeliness will roar across this nation!',
			'Delivering Alberta\'s resources to market and CANADIAN values to the world!'],
			0,1,function() { 
				var tween = t.add.tween(RPG.GameState.npcs.children[1]).to({alpha:0},1000,null,true,300);
				tween.onComplete.add(function() {
					RPG.GameState.npcs.children[1].destroy();
				},this);
				r.end_rick_mciver() }
		]
	],
	'All' : [
		[//0
			['Goooooooo Giga-Candidate!' ],
			0,0
		],
		[//1
			['The soldiers of the Right are linked in friendly tether.'],
			0,2,function() {t.initDialogue({'character':'All','dialogueIndex':2},false,false,null,3600);}
		],
		[//2
			['Upon the battle site they fight the foe together.'],
			0,3,function() {t.initDialogue({'character':'All','dialogueIndex':3},false,false,null,3400);}
		],
		[//3
			['There ev\'ry mother\'s son prepared to fight and fall is.'],
			0,4,function() {t.initDialogue({'character':'All','dialogueIndex':4},false,false,null,3000);}
		],
		[//4
			[
			'The enemy of one the enemy of all is!'],
			0,5,function() {t.initDialogue({'character':'All','dialogueIndex':5},false,false,null,3000);}
		],
		[//5
			['The enemy of one the e-ne-my of all is!!'],
			0,5
		]
	],
	'Naheed Nenshi' : [
		[//0
			['Jason! Just the man we\'ve been looking for.',
			'Huh? Naheed? What is this?',
			'You\'re in time to be my very special guest on my new YouTube series: "People like Us!"',
			'Funny. It works on two levels.',
			'As Calgary\'s mayor I wanted to better reach out to Albertans by going one-on-one with other famous Albertans.',
			'Is this an opportunity to share my message with everyday, hardworking Albertans?',
			'You bet! What do you say? Will you do it?',
			[[ 'Gladly!',1 ],['Find some other hip millennial, Nenshi.',2]] ],
			0,1
		],
		[//1
			[ 'Excellent! Just come get behind the camera here.' ],
			0,4,function() {
				if (!RPG.GameState.hasQuest('q_pcwr_b')) {
					RPG.GameState.acquire([['quest','q_pcwr_b']]);
					t.updateJSONWaypoint('q_pcwr_b','camp',null,null,true);
				}
				r.initQuiz(); }
		],
		[//2
			[ 'Fiddlesticks. Come talk to me if you change your mind.' ],
			0,3
		],
		[//3
			[ 'Jason, you\'re back! What do you say?',
			[ ['I\'m ready for my closeup!',1 ],['The answer\'s still no.',2  ]] ],
			0,1
		],
		[//4
			[ 'And we\'re live asking Alberta PC leadership hopeful Jason Kenney some provincial trivia. First question!',
			 'Wait. What?' ,
			 'Albertans want to be sure you\'re not just a carpetbagger out of Ottawa, Jason.',
			 'You didn\'t say this was a quiz show or that I\'m live!',
			 'Don\'t wiggle your way out of this one. Alberta is watching!'],
			0,5,function() {
				RPG.GameState.npcs.children[1].frame = 0;
				RPG.GameState.npcs.children[1].data.dialogueIndex = 1;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[1].data,false,false); 
			}
		],
		[//5
			[
			'Can it, Phil. Money\'s tight right now. We can\'t afford to lose advertisers.',
			'Let\'s do this. A leader shies away from nothing.',
			'Right! Which of these people is NOT from Alberta?',
			[['Stompin\' Tom Connors',6],['Tommy Banks',7],['Trevor Linden',7]]
			],
			0,6
		],
		[//6
			[
			'Correct!',
			'Huzzah!',
			'Next question: True or false: The majority of the oil sands comes from mines.',
			[['True!',9],['False!',8]]
			],
			0,6,function() { RPG.GameState.score++; }
		],
		[//7
			[
			'That\'s incorrect! It\'s Stompin\' Tom!',
			'Blast!',
			'Next question: True or false: The majority of the oil sands comes from mines.',
			[['True!',9],['False!',8]]
			],
			0,6
		],
		[//8
			[
			'Correct! In-situ operations get the oil out of the ground without disturbing the top soil.',
			'Not that Neil Young ever mentions that.',
			'Next question: Which of these communities does not exist in Alberta?',
			[['Medicine Hat.',11],['Moose Jaw.',10],['Fort Saskatchewan.',11]]
			],
			0,8,function() { RPG.GameState.score++; }
		],
		[//9
			[
			'Incorrect!',
			'A year out of government and already I\'m rusty on the energy file...',
			'Next question: Which of these communities does not exist in Alberta?',
			[['Medicine Hat.',11],['Moose Jaw.',10],['Fort Saskatchewan.',11]]
			],
			0,8
		],
		[//10
			[
			'Correct!',
			'You can\'t pull a question like that over on me.',
			'Next question: WHAT is Ian Tyson?',
			[['A Legend.',12],['A country singer.',13],['An Albertan.',13]]
			],
			0,8,function() { RPG.GameState.score++; }
		],
		[//11
			[
			'Incorrect!',
			'A pox on me!',
			'Next question: What is Ian Tyson?',
			[['A Legend.',12],['A country singer.',13],['An Albertan.',13]]
			],
			0,8
		],
		[//12
			[
			'Correct!',
			'Pfft. A gimme.',
			'The next question is for the the province\'s many Newfoundlanders.',
			'That\'s big-tent thinking. I like it.',
			'What\'s being discussed in the phrase: \'Tis a mauzy ol\' night, right enough. Ye can\'t see up past d\'droke!\'',
			[['Health.',15],['Fishing conditions.',15],['The weather.',14]]
			],
			0,12,function() { RPG.GameState.score++; }
		],
		[//13
			[
			'Incorrect!',
			'I should have anticipated nuance.',
			'The next question is for the province\'s many Newfoundlanders.',
			'That\'s big-tent thinking. I like it.',
			'What\'s being discussed in the phrase: \'Tis a mauzy ol\' night, right enough. Ye can\'t see up past d\'droke!\'',
			[['Health.',15],['Fishing conditions.',15],['The weather.',14]]
			],
			0,13
		],
		[//14
			[
			'Correct!',
			'Alberta and Newfoundland live together in perpetual fraternity.',
			'Last question: Who is Danielle Smith?',
			[['Danielle Who?',16],['Danielle what?',16],['Former leader of the Wildrose',17]]
			],
			0,14,function() { RPG.GameState.score++; }
		],
		[//15
			[
			'Incorrect!',
			'*mumble* ...Aleppo moment...',
			'Last question: Who is Danielle Smith?',
			[['Danielle Who?',16],['Danielle what?',16],['Former leader of the Wildrose',17]]
			],
			0,14
		],
		[//16
			[
			'Correct! Alberta does not speak of her.',
			],
			0,18,function() { RPG.GameState.score++; r.calculateQuiz(); }
		],
		[//17
			[
			'Incorrect! True Albertans no longer speak of her.',
			'C\'mon!'
			],
			0,18,function() { r.calculateQuiz(); }
		],
		[//18
			[
			'It looks like you did well enough to make Alberta proud. Nice work!',
			'I am truly fit to restore the Alberta Advantage.',
			'Thanks for tuning in everyone. This has been another episode of People Like Us, with Naheed Nenshi.'
			],
			0,20,function(){ 
				RPG.GameState.npcs.children[4].destroy();
				RPG.GameState.removeQuest('q_pcwr_b');
				RPG.GameState.showSupport(1,1);
				RPG.game.sound.play('music_success');
				RPG.GameState.updateJSONWaypoint('q_pcwr_b','camp',null,true);
			 }
		],
		[//19
			[
			'Hmm, that was unfortunate. Better luck out there on the campaign trail!',
			'Hmph! Whatever.',
			'Thanks for tuning in everyone. This has been another episode of People Like Us, with Naheed Nenshi.'
			],
			0,20,function() { RPG.GameState.npcs.children[4].destroy();
							  RPG.GameState.removeQuest('q_pcwr_b',false);
							  RPG.GameState.updateJSONWaypoint('q_pcwr_b','camp',null,true);
			 }
		],
		[//20
			['Thanks for doing my show. My clickthrough rates have gone...well, nowhere. But thanks anyway!'],
			0,20
		],
		[//21
			['This whole scenario is perfect for my show. The right devouring one another? Fabulous!'],
			0,22, function() { RPG.GameState.initDialogue({'character':'Producer','dialogueIndex':0},false,false) }
		],
		[//22
			['Jason! Where\'d you learn to do that?',
			'Mmm...cabinet meetings.'],
			0,22, function() { var index = !RPG.GameState.checkQuest('q_pcwr_b')?23:24;
				RPG.GameState.npcs.children[4].data.dialogueIndex = index;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[4].data,true,false);
			 }
		],
		[//23
			['If you\'ve got the time, I\'d like to invite you on my show to ask some questions.',
			'With Alberta so skeptical of you it would be a great chance to show them you know the province.',
			'It\'s in the tent between the Wildrose and PC Alberta camps. As an independent I can freely travel through them.',
			'Come check it out!'],
			0,24, function() { RPG.GameState.acquire([['quest','q_pcwr_b']]); }
		],
		[//24
			['Hilarious!'],
			0,24
		],
		[//25
			['Huh. Wow! I\'ll probably never entirely trust you as I\'m totes obvs a lefty but as an indepedent you have my congratulations!'],
			0,25,function() { RPG.npcFunctions.end_scenes(); }
		]
	],
	'Producer' : [
		[
			[
			'Man, Kenney\'s choking out there. Looks like Brian Jean\'s already won this one.'
			],
			0,1,function() { r.herdJean(); }
		],
		[//1
			[
				'That was something, Mr. Kenney!',
				'Thank you!',
				'I\'ll never in a million years vote for you on account of working for the CBC, but I was nonetheless impressed.',
				'Baby steps, my good man!'
			],
			0,2
		],
		[//2
			[
				'Very impressive!'
			],
			0,2
		]
	],
	'Phil' : [
		[//0
			[
			'Don\'t mind me. I\'m just the producer.'
			],
			0,0
		],
		[//1
			[
			'Well, technically, only about 546 live viewers at present, sir.'
			],
			0,0,function() { 
				RPG.GameState.npcs.children[1].frame = 3;
				RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,true,true) 
			}
		]
	],
	'Tom' : [
			[
				['I worked as a server in a local alehouse until NDP minimum wage hikes forced my hours back.',
				'Minimum wage hikes are as misguided as carbon pricing schemes!',
				'Oh well. This side hustle\'s pretty good. Mayor Nenshi gets me coffee. What a guy!'],
				0,0
			]

	],
	'Sally' : [
		[	
			[
			'I see you\'re doing your part to help Alberta\'s hot air sector.'
			],
			0,0
		]
	],
	'Dark Kenney' : [
		[//0
			[
			"Barbaric cultural practices hotline....hsssss!"
			],
			0,1
		],
		[//1
			[
			"Referring to HMCS Margaret Brook at 'THE' HMCS Margaret Brooke....hsssss!"
			],
			0,2
		],
		[//2
			[
			"Restrictions on the Temporary Foreign Workers plan...hssss!"
			],
			0,3
		],
		[//3
			[
			"Your anti-gay marriage speech....hssss!"
			],
			0,4
		],
		[//4
			[
			'Calling Thomas Lukaszuk a “complete and utter asshole” in an email and then replying all...hssss!'
			],
			0,4
		]
	],
	'Glen' : [
		[
			[
				'Look here. A hero! Sword and all. That\'s not going to help us.',
				'Why not?',
				'We\'ve been stuck here nearly a fortnight trying to fight our way past the NDP goons controlling the road ahead.',
				'You appear to be with valuable cargo.',
				'Yes. We\'re returning with the provisions for the PC Alberta and Wildrose hockey tournament.',
				'An effort at bilateral cooperation on the right foiled by NDP meddling! Scandal!',
				'I\'ll say. It\'s the one thing either camp is looking forward to as we wait out these long nights.'
			],
			0,1,function() { if (!RPG.GameState.hasQuest('q_pcwr_a')) RPG.GameState.acquire([['quest','q_pcwr_a']]); }
		],
		[
			[
				'Hopefully an answer will come to us soon.'
			],
			0,1
		]
	],
	'Tallie' : [
		[//0
			[
				'What ho! A stranger! State your business.'
			],
			0,0,function() {
				var index = RPG.GameState.hasQuest('q_pcwr_a')?2:1;
					RPG.GameState.npcs.children[0].data.dialogueIndex = index;
					RPG.GameState.initDialogue(RPG.GameState.npcs.children[0].data,false,true);
			}
		],
		[//1
			[
			'I only just stumbled upon your hapless caravan. What\'s the matter?',
			'The NDP has erected a toll on the road ahead and refuses us passage.',
			'Gah! The Evil Queen Notley knows not where to draw the line!',
			'What\'s worse is we carry needed equipment for the PC Alberta vs. Wildrose hockey tournament.',
			'Hockey is the mainstay of the Canadian people. It is a tragedy the NDP chooses to stand in your way.',
			'You look a hero. Can you come to the aid of our party? Nay, BOTH our parties?',
			[['I shall go forth and retake the road!',2],['Hmm, perhaps some other time.',4]]
			],
			1,5
		],
		[//2
			['I come to free your caravan from the NDP scourge ahead.',
			 'Hallelujah! Just give the boys and I a moment to open the road.'],
			1,5,function() {
				if (!RPG.GameState.hasQuest('q_pcwr_a')) RPG.GameState.acquire([['quest','q_pcwr_a']]);
				RPG.GameState.removeTiles([210,211,212,213,214,215,216,217],1,true);
			}
		],
		[//3
			[
			'Hallelujah! Just give the boys and I a moment to open the road.'
			],
			0,2, function() {
				if (!RPG.GameState.hasQuest('q_pcwr_a')) RPG.GameState.acquire([['quest','q_pcwr_a']]);
				RPG.GameState.removeTiles([210,211,212,213,214,215,216,217],1,true);	
			}
		],
		[//4
			[
			'Well, if you know of anyone seeking glory across the province let us know. We\'re not going anywhere.'
			],
			0,4
		],
		[//5
			[
			'We await your triumphant return...just who are you?',
			'Jason Kenney. The next great hope for Alberta.',
			'I\'ll believe it when you get us home, Sir Kenney.'
			],
			0,6
		],
		[//6
			[
			'I\'ll believe it when you get us home, Sir Kenney.'
			],
			0,6
		],
		[//7
			[
			'Sir Kenney, you truly are a hero! I shall grill a great t-bone in your honour.',
			'All in a day\'s work.',
			'Those you\'ve helped return are already spreading tales of your bravery. Alberta truly needs a leader like you.',
			'Ah, shucks!'
			],
			0,7,function(){  
				var index = RPG.GameState.npcs.children.length-1;
				var tallie = RPG.GameState.npcs.children[index];
				tallie.scale.setTo(1);
				tallie.animations.play('walkFwd');
				var tween = RPG.GameState.add.tween(tallie).to({y:RPG.GameState.camera.y+RPG.GameState.height+60},2200).start();
				RPG.GameState.showSupport(1,1);
				RPG.GameState.removeQuest('q_pcwr_a');
				var index = RPG.GameState.retrieveJSONIndex('q_pcwr_aa','forest_a');
				RPG.GameState.removeJSONEnemy(index,'forest_a');

				t.updateJSONWaypoint('q_pcwr_a','camp',null,true);

				Player.animations.play('celebrate');
				tween.onComplete.add(function() {
					tallie.destroy();
				},this);
			}
		]

	],
	'Stephen' : [
		[[
		'@#%! I hate nature.'
		],
		0,0
		]
	],
	'Corey' : [
		[[
		'I\'ll take basketball over hockey any day.'
		],
		0,0
		]
	],
	'Zain' : [
		[
		[
			'We\'ve been out here for weeks. No wi-fi! No phone reception! God help us!'
		],
		0,0
		]
	],
	'Wildrose Royal Guard' : [
		[//0
			['Misbehave and we\'ll make you squeal like a piggy.'],
			0,0
		],
		[//1
			['* The guard glowers at you. *'],
			0,0
		]
	],
	"Justin Trudeau" : [
		[//0
			['Jason! Hey, buddy!',
			'Justin! What are you doing here?',
			'*Chuckle* Well, I wouldn\'t normally share party strategy, but seeing as how you\'ve found me in hiding the cat\'s out of the bag.',
			'What Liberal machinations have you been plotting?',
			'Carbon pricing! Carbon pricing! I\'m going to Make Alberta Green Again. You like it?',
			[ ['Absolutely not.',1],['Get out of here. This is MY video game!',2] ]],
			0,0
		],
		[//1
			['You\'ve got to admit it\'s way better than a \'Monument to the Victims of Communism.\'',
			'Progressives, the media party, everyone laughed at that because socialism is good for them.',
			'We could go on about ideological agendas all day but I\'m working on the  taxpayer\'s dime, something you forgot while campaigning here while still an MP.',
			[ ['What are you working on?',5],['Rich words from a pro-tax socialist.',4] ]],
			0,1
		],
		[//2
			['What are you talking about?',
			'GAH! You ruin EVERYTHING!',
			'Coming from a Conservative...thank you!',
			'Isn\'t it enough that your carbon tax will harm Alberta? Now you have to come here and inflict your ideological agenda in person?',
			'You\'re going to lose here for the same reasons you lost federally, Jason: you\'re out of touch with a changing Canada.',
			[ ['Changing? Hardly!',3],['So the greening of Canada includes Pacific LNG\'s approval?',4] ]],
			0,3
		],
		[//3
			['Trust me, big guy. I know something about youth demographics and Alberta\'s young silent majority works in my favour.',
			'Pfft. And people tell me I\'M out to lunch.',
			'Alberta\'s economic advantage has attracted scads of youth. Today its 18 to 40 set dwarfs the over 50 crowd.',
			'...',
			'And while your voters still hold the province\'s economic reins its many disenfranchised young people won\'t buy into the conservative story for much longer.',
			[ ['What are you working on?',5]]],
			0,3
		],
		[//4
			['Realpolitik, baby. You know the game.',
			'Oooh, if I\'d stayed in Ottawa I\'d have given you a run for your money.',
			'Instead you\'ve left the federal race to the likes of Leitch and Bernier. Once again you have my thanks.',
			[ ['What are you working on?',5]]],
			0,3
		],
		[//5
			['The very thing that will cement my government\'s pro-environemt legacy in Canada and abroad.',
			'No! You\'re not...',
			'Yes! A new Liberal sword I\'m forging here on conservatism\'s own shining hill: the Neo Laurentia!'
			],
			0,9,function() {  
				RPG.GameState.dialogueUp = true;
				setTimeout(function() {
				var t = RPG.GameState;
				t.npcs.children[0].animations.add('flash',[1,2,3,1],5,false);
				t.npcs.children[0].animations.play('flash');
				RPG.game.sound.play('sword_shine');
				setTimeout(function() {
					t.initDialogue(t.npcs.children[0].data,true,true);
					t.npcs.children[0].frame = 0;
				},1200);
			},600);
			}
		],
		[//6
			[
			'Dams! Now there\'s an energy project I could get behind. You think Alberta would be interested in access to Quebec\'s grid?',
			'You\'re a meddling...upper-Laurentian...bike-riding...selfie-taking pinko, Trudeau!',
			'All that but one with a majority house government. Checkmate.'
			],
			0,8
		],
		[//7
			[
			'Hey, even if I don\'t Alberta\'s youth and ample immigrant population will take the province from you eventually.',
			'...',
			'In the meantime, I\'ve got inroads to make. Ta ta!'
			],
			0,8
		],
		[//8
			[
			'Excuse me, but I\'ve really got to get back to undermining you. Later, gator.'
			],
			0,8
		],
		[//9
			['Hmph. Well, your forge looks none too carbon neutral to me...',
			'On the contrary, I\'m using it in Canada\'s newest, most reliable energy source: the smouldering embers of own superlative reflection.',
			[ ['Damn you, Trudeau!',6],['You\'ll never take Alberta.',7] ]],
			0,0
		],
		[//10
			[
			'Jason, you\'re going to be the best thing that\'s ever happened to Alberta\'s reigning NDP and, by extension, my government.',
			'I mean, have you been FOLLOWING the federal conservative leadership race?!',
			'Thanks for the bump, bud!'
			],
			0,10
		],
		[//11
			[
			'Hey, bud. Good work securing your leadership. With my bitchin\' new sword Ottawa\'ll be Liberal redder than ever!.'
			],
			0,11, function() { RPG.npcFunctions.end_scenes(); }
		],
	],
	'Messenger' : [
		[//0
			[
			'Sir Kenney! I bring word from the PC leadership candidates that the convention is ready to commence!',
			'Summons from the party itself. Excellent! They\'ve chosen to include me after all.',
			'You will find the convention through the PC Alberta leadership tent in the camp\'s northeast. Do you wish to go there now?',
			[ ['Take me there.',2]]
			],
			0,1
		],
		[//1
			[
			'Very good, sir. But tarry not!'
			],
			0,1,function() { 
				RPG.GameState.dialogueUp = true;
				RPG.GameState.acquire([['quest','q_pc_final']]);
				var campTileset = RPG.GameState.cache.getTilemapData('camp').data.layers[2].objects;
				var trig1 = RPG.GameState.retrieveJSONIndex('camp_pc_01_a','camp');
				var trig2 = RPG.GameState.retrieveJSONIndex('camp_pc_01_b','camp');
				//campTileset[trig1].properties['function'] = 'clearTent';
				//campTileset[trig2].properties['function'] = 'clearTent';
				//console.log(campTileset[trig1].properties['function']);
				var mI = RPG.GameState.npcs.children.length-1;
				var messenger = RPG.GameState.npcs.children[mI];
				messenger.animations.play('walkFwd');
				var exitTween = RPG.GameState.add.tween(messenger).to({y:RPG.GameState.camera.y+RPG.GameState.game.height+60},2200).start();
				exitTween.onComplete.add(function() {
					messenger.destroy();
					RPG.GameState.dialogueUp = false;
				},this);
			}

		],
		[//2
			[
			'Let us make haste!'
			],
			0,1,function() {
				Player.data.quests.push(['Head to the PC Alberta leadership tent for the leadership convention.','q_pc_final',0]);
				RPG.eventQueue = [function() {RPG.npcFunctions.clearTent()}];
				r.final_boss_tent_travel();
			}
		]
	],
	'Nurse': [
		[//0
			[
			'These cattleranchers playin\' at politics have me all anxious.'
			],
			0,0
		],
		[//1
			[
			'Sir Kenney, you\'ve awoken!',
			'W-where am I?',
			'A patrol of Wildrose soldiers found you unconscious in the mountains. We feared the worst.',
			'No, no. I\'m alright. I don\'t know what happened, but whatever did, I feel...freer.',
			'I must say you gave us a fright, but you seem well. Take care out there.'
			],
			0,2,function() {
				RPG.GameState.setJSONDialogueIndex('Nurse',2);
				RPG.GameState.removeQuest('q_wr_a');
				t.updateJSONWaypoint('q_wr_a','forest_a',null,true);
				RPG.GameState.showSupport(0,1);
				var index = RPG.GameState.retrieveJSONIndex('mountain_a','forest_a');
				RPG.GameState.removeJSONEnemy(index,'forest_a');
				Player.frame = 8;
			}
		],
		[//1
			[
			'Y\'all take care now!'
			],
			0,2
		]
	],
	'Wildrose Soldier in Remission' : [
		[//0
			[
			'Bitumen and vermouth are a dangerous mix.'
			],
			0,0
		]
	],
	'Tent Sentry' : [
		[//0
			[
			'Nothing to see this way!'
			],
			0,0
		],
		[//1
			[
			'No admittance!'
			],
			0,1
		]
	],
	'Anna' : [
		[//0
			[
			'This camp is surrounded on all sides by socialists and our leaders STILL refuse to work together!' 
			],
			0,0
		]
	],
	'Bear' : [
		[//0
			[
			'Rachel Notley is a serpent. Believe me, I have sources.'
			],
			0,0
		]
	],
	'Alvaro' : [
		[//0
			[
			'We\'ve been hearing howling lately from the mountains to the west. It\'s like someone\'s doing witchcraft up there.'
			],
			0,0
		]
	],
	'Meadow' : [
		[//0
			[
			'The kids from Edmonton wear all manner of tattoos and metal in their faces.',
			'And wear socialist paraphernalia glorifying their atrocities to boot!',
			'Thankfully we\'ve managed to keep such nonesense out of Lethbridge.'
			],
			0,0
		]
	],
	'Jasper' : [
		[//0
			[
			'Kenney, the PC party is best left to slip away quietly beneath the political waves.'
			],
			0,0
		]
	],
	'Josie' : [
		[//0
			[
			'Have at \'em, Jason.'
			],
			0,0
		]
	],
	'Benjamin' : [
		[//0
			[
			'This is terrible...Just awful.',
			'My good man! You look worried!',
			'Yes. A party of Alberta PCs and Wildrose soldiers left three days ago to bring back to camp an important shipment.',
			'I assume they have yet to return?',
			'That\'s right. This was an important initiative for us looking to unite the right. These provisions were key to our survival out here.',
			[['What was in the shipment?',1],['I will find them!',2]]
			],
			0,0
		],
		[//1
			[
			'Tim Horton\'s and hockey equipment for our bipartisan hockey tourney.',
			'I see.',
			'It\'s the only thing keeping our soldiers happy in these dark times.',
			'Dark they are. But worry not, I will retrieve the precious shipment.',
			'Oh, thank you, hero! The road they were to return on is directly ahead of us. We await your return.'
			],
			0,3,function() { r.q_pcwr_a_init(); }
		],
		[//2
			[
			'Oh, thank you. The unite-the-right movement has the hero it needs!',
			'Yes. I AM that hero!',
			'The road they were to return on is directly ahead of us. We await your return.'
			],
			0,3,function() { r.q_pcwr_a_init(); }
		],
		[//3
			[
			'The road they were to return on is directly ahead of us. We await your return.'
			],
			0,3
		],
		[//4
			[
			'Thank you for returning the shipment. The troops\' morale is high once more!'
			],
			0,4
		]
	],
	'Olivia' : [
		[//0
			[
			'Carbon taxes are probably the most vile ideological filth to ever poison Alberta.'
			],
			0,0
		]
	],
	'Aurora' : [
		[//0
			[
			'The party leadership has told us to be contemptuous of you, but everybody knows you\'ve got them scared.'
			],
			0,0
		]
	],
	'Daniel' : [
		[//0
			[
			'Dammit. The right in Alberta needs a non-compete clause!'
			],
			0,0
		]
	],
	'Rachel Notley' : [
		[//0
			[
			'MWA-hahahaaaa! You have miles yet to go before you can defeat me, Jason. Best to kneel before me now!',
			'Queen Notley! I will never yield to you. Not while hard working Albertans watch you bleed their taxdollars.',
			'Such fiscal-minded hypocrisy from one to take up the PC Alberta mantle. Tut tut!',
			'Whatever size you grow the dark hand of your government to, Notley, be prepared to watch the Right scale it back once in power again!',
			'Foolish, Kenney. Alberta is the stronghold of the Left, now and forever more. Onward, Proletaria!'
			],
			0,0,function() {
					RPG.game.sound.play('roar');
					var index = RPG.GameState.npcs.children.length-1;
					var notley = RPG.GameState.npcs.children[index];
					var tween = RPG.GameState.add.tween(notley).to({y:RPG.GameState.camera.y-200},2000,'Quad.easeIn').start();
					tween.onComplete.add(function(){
						notley.destroy();
						RPG.npcFunctions.end_scenes(); 
					},this);
				//},this);
			}
		]
	]
}