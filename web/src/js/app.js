App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load fighters.
        // TODO: should get data from server or chain...
        $.getJSON('../data/fighters.json', function (data) {
            var fightersRow = $('#fighterRow');
            var fighterTemplate = $('#fighterTemplate');

            for (i = 0; i < data.length; i++) {
                var url = '../images/avatar/boy2.jpg'; // + data[i].id;
                var level = 'Level ' + data[i].level;
                fighterTemplate.find('.fighter-avatar').attr('src', url);
                fighterTemplate.find('.fighter-name').text(data[i].name);
                fighterTemplate.find('.fighter-level').text(level);
                fighterTemplate.find('.fighter-other').text(data[i].level);
                fightersRow.append(fighterTemplate.html());
            }
        });

        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            console.log('web3 exists! ');
            App.web3Provider = web3.currentProvider;
        } else {
            // TODO: web3.js 1.0 prefers to a ws provider, while Metamask doesn't support it yet. 
            // Update required later.            
            // var web3Infura = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));        
            // var czEvents = new web3Infura.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function () {
        // 🚀：Artifacts are information about our contract such as its deployed address and Application Binary Interface (ABI). 
        // The ABI is a JavaScript object defining how to interact with the contract including its variables, functions and their parameters.
        // TODO: pretend to get json from contract compiled abi json.
        $.getJSON('../data/Fighter.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var FighterArtifact = data;
            // console.log(data);
            App.contracts.Fighter = TruffleContract(FighterArtifact);

            // Set the provider for our contract
            App.contracts.Fighter.setProvider(App.web3Provider);

            // Use our contract to retrieve your fighter if any
            return App.getFighterData(data);
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '#create-fighter-save', App.createFighter);
    },

    createFighter: function () {
        console.log('createFighter called');

        var name = $('#fighter-name').val();
        var gender = $('.btn-group > .btn.active').text();

        console.log(name, $.trim(gender))
        // TODO: call create fighter functions in contract
    },

    getFighterData: function(data) {
        // TODO: render a fighter and his data if any
        console.log(data);
    },

    startFight: function() {

    }
};

$(function () {
    $(window).on('load', function(){ 
        App.init();
    });
});