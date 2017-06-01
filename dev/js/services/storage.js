app.service('storage', function () {
    var _item;
    return {
        setItem: function (item) {
            _item = item;
        },
        getItem: function () {
            return _item;
        }
    }
})
