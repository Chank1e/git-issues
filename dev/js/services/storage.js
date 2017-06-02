app.service('storage', function () {
    var _item='default';
    return {
        setItem: function (item) {
            _item = item;
        },
        getItem: function () {
            return _item;
        }
    }
})
