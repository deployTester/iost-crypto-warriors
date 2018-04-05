App = {
    web3Provider: null,
    gameContracts: {},

    init: function () {
		// Load legends.
		// TODO: should get data from server or chain...
        $.getJSON('../data/legends.json', function (data) {
            var legendsRow = $('#legendRow');
            var legendTemplate = $('#legendTemplate');

            for (i = 0; i < data.length; i++) {
                var url = '../images/avatar/boy2.jpg'; // + data[i].id;
                var level = 'Level ' + data[i].level;
                legendTemplate.find('.legend-avatar').attr('src', url);
                legendTemplate.find('.legend-name').text(data[i].name);
                legendTemplate.find('.legend-level').text(level);
                legendTemplate.find('.legend-other').text(data[i].level);
                legendsRow.append(legendTemplate.html());
            }
        });

        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            console.log('web3 exists! ');
            App.web3Provider = web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        console.log(web3);
        // TODO: web3.js 1.0 prefers to a ws provider, while Metamask doesn't support it yet. 
        // Update required later.
        // var web3Infura = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));        
        // var czEvents = new web3Infura.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);
        return App.initContract();
    },

    initContract: function () {
        // 🚀：Artifacts are information about our contract such as its deployed address and Application Binary Interface (ABI). 
        // The ABI is a JavaScript object defining how to interact with the contract including its variables, functions and their parameters.
        $.getJSON('../ethereum/build/contracts/Game.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var GameArtifact = data;
            App.gameContracts.Adoption = TruffleContract(GameArtifact);

            // Set the provider for our contract
            App.gameContracts.Adoption.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            return App.markAdopted();
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '#create-legend-save', App.createLegend);
    },

	createLegend: function() {
		console.log('createLegend called');

		var name = $('#legend-name').val()
		var gender = $('.btn-group > .btn.active').text()
	
		console.log(name, gender)
		// TODO: call create legend functions in contract
	}

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});