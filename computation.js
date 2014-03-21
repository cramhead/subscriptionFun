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

    Meteor.publish('specificItems', function(params){
      return Items.find({index: params});
    });

    // Facts.setUserIdFilter(function(userId) {
    //     return true;
    // });
}

if (Meteor.isClient) {

    Template.hello.item = Items.find();

    Template.item.item = Items.find();

    computation = Deps.autorun(function() {
        Meteor.subscribe('items');
        console.log("computation run");
    });

    doSubscribe = function(){
      Meteor.subscribe('items', 9);
    };

    doInvalidation = function() {
        computation.invalidate();
        console.log('computation is invalid');

        Deps.flush();
        console.log('flush is complete');

    }

    doStop = function() {
        computation.stop();
        console.log('computation is stopped');
        Deps.flush();
        console.log('flush is complete');
    }
}
