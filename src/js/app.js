App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load legends.
        $.getJSON('../legends.json', function (data) {
            var legendsRow = $('#legendRow');
            var legendTemplate = $('#legendTemplate');

            for (i = 0; i < data.length; i++) {
                var url = 'https://avatars.dicebear.com/v1/male/' + data[i].id + '/100.png'
                legendTemplate.find('.legend-avatar').attr('src', url);
                legendTemplate.find('.legend-name').text(data[i].name);
                legendTemplate.find('.legend-level').text(data[i].level);
                legendTemplate.find('.legend-level').text(data[i].level);
                legendsRow.append(legendTemplate.html());
            }
        });

        return App.initWeb3();
    },

    initWeb3: function () {

    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
