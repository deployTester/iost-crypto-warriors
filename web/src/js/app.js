App = {
    web3Provider: null,
    game: null,

    init: function () {
        // Load fighters.
        // TODO: should get data from server or chain...
        // $.getJSON('../data/fighters.json', function (data) {
        //     var fightersRow = $('#fighterRow');
        //     var fighterTemplate = $('#fighterTemplate');

        //     for (i = 0; i < data.length; i++) {
        //         var url = '../images/avatar/boy2.jpg'; // + data[i].id;
        //         var level = 'Level ' + data[i].level;
        //         fighterTemplate.find('.fighter-avatar').attr('src', url);
        //         fighterTemplate.find('.fighter-name').text(data[i].name);
        //         fighterTemplate.find('.fighter-level').text(level);
        //         fighterTemplate.find('.fighter-other').text(data[i].level);
        //         fightersRow.append(fighterTemplate.html());
        //     }
        // });

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
        const contractAddress = '0x045a15F8C38c91c56fc6749311fAC0f77a9bb55d';

        $.getJSON('../data/Game.json', function (data) {
            // console.log(data);

            var abi = data['abi'];
            // console.log(abi);

            game = new web3.eth.Contract(
                abi,
                contractAddress
            );
            game.setProvider(App.web3Provider);

            // console.log("game.methods:", game.methods);
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        // console.log('bind click');
        $(document).on('click', '#create-fighter-save', App.createFighter);
    },

    createFighter: function () {
        // console.log('createFighter called');

        var name = $('#fighter-name').val();
        var gender = $('.btn-group > .btn.active').text();
        gender = $.trim(gender);
        console.log(name, gender);

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            console.log(account);

            game.methods.createFighter(name, 0).send(
                {from: account,
                gas: 200000}
            )
            .on('transactionHash', function(hash) {
                console.log('transactionHash: ', hash);
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log('confirmation: ', confirmationNumber, receipt);
            })
            .on('receipt', function(receipt){
                console.log('receipt: ', receipt);
            })
            .on('error', console.error);
            // console.log('get all the fighters: ', game.methods.fighters(0).call());
            // game.methods.fighters(2).call().then(console.log);
        });
    },

    getFighterData: function (data) {
        // TODO: render a fighter and his data if any
        console.log(data['abi'][0]);

    },

    startFight: function () {

    }
};

$(function () {
    $(window).on('load', function () {
        App.init();
    });
});