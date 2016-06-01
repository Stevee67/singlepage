var CirclesMaster = function () {
    return {
        initCirclesMaster1: function () {
            Circles.create({
                id: 'circle-1',
                percentage: 87,
                radius: 80,
                width: 8,
                number: 87,
                text: '%',
                colors: ['#eee', '#72c02c'],
                duration: 500
            });
        }
    };
}();