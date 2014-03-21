Items = new Meteor.Collection('items');
if (Meteor.isServer) {

    Meteor.startup(function() {
        if (Items.find().count() === 0) {
            for (var i = 10 - 1; i >= 0; i--) {
                var item = {
                    index: i,
                    name: "item " + i,
                    creationDate: new Date()
                }
                Items.insert(item, function(err, result) {
                    if (err) {
                        console.log("Error: " + err.message);
                    }
                });
            };
        }
    });


    Meteor.publish('items', function() {
        return Items.find();
        console.log("publishing");
    });

    Meteor.publish('specificItems', function(params) {
        return Items.find({
            index: params
        });
        console.log("publishing specificItems");
    });

    // Facts.setUserIdFilter(function(userId) {
    //     return true;
    // });
}

if (Meteor.isClient) {



    var firstParam = 8;
    var secondParam = 9;

    var queryHello = Items.find({
        index: firstParam
    });
    var queryItem = Items.find({
        index: secondParam
    });

    queryHello.observeChanges({
      added: function (id, fields) {
        console.log("hello added");
      },
      changed: function (id, fields) {
        console.log("hello changed");
      },
      movedBefore: function (id, fields) {
        console.log("hello movedBefore");
      },
      removed: function (id) {
        console.log("hello removed");
      }
    });

    queryItem.observeChanges({
      added: function (id, fields) {
        console.log("queryItem added");
      },
      changed: function (id, fields) {
        console.log("queryItem changed");
      },
      movedBefore: function (id, fields) {
        console.log("queryItem movedBefore");
      },
      removed: function (id) {
        console.log("queryItem removed");
      }
    });
    Template.hello.item = queryHello;

    Template.item.item = queryItem;

    //computation = Deps.autorun(function() {
    Meteor.subscribe('specificItems', firstParam);
    console.log("computation run");
    //});

    doSubscribe = function() {
        Meteor.subscribe('specificItems', secondParam);
    };

    // doInvalidation = function() {
    //     computation.invalidate();
    //     console.log('computation is invalid');

    //     Deps.flush();
    //     console.log('flush is complete');

    // }

    // doStop = function() {
    //     computation.stop();
    //     console.log('computation is stopped');
    //     Deps.flush();
    //     console.log('flush is complete');
    // }
}
