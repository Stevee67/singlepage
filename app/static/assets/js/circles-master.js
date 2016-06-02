var CirclesMaster = function () {
    return {
        initCirclesMaster: function (val) {
            Circles.create({
                id: 'circle-1',
                percentage: val,
                radius: 80,
                width: 8,
                number: val,
                text: '%',
                colors: ['#eee', '#72c02c'],
                duration: 500
            });
        }
    };
}();