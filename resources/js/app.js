App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load legends.
        $.getJSON('../data/legends.json', function (data) {
            var legendsRow = $('#legendRow');
            var legendTemplate = $('#legendTemplate');

            for (i = 0; i < data.length; i++) {
                var url = '../images/avatar/boy2.jpg';// + data[i].id;
                var level = 'Level ' + data[i].level;
                legendTemplate.find('.legend-avatar').attr('src', url);
                legendTemplate.find('.legend-name').text(data[i].name);
                legendTemplate.find('.legend-level').text(level);
                legendTemplate.find('.legend-other').text(data[i].level);
                legendsRow.append(legendTemplate.html());
            }
        });

        /* test for for-in and for-of
        let list = [5,6,7,8];
        for (const i in list) {
            console.log("for-in");
            console.log(i);
        }

        for (const i of list) {
            console.log("for-of");
            console.log(i);
        }
        */

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

    initContract: function() {
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});