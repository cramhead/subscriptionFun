Commit 1
So calling subscribe on a subscription that already has been subscribed to does nothing. It's checked at the client.


So what about subscribing to a subset via a different publish.
The initial subscribe returns one item as expected.
The doSubscribe return one item, item 9, and item 8 and 9 are now in the collection.

Commit 2
Having to subscribes on the same collection to the same publish endpoints with two different parameters. No extra regetting of data happens


Commit 3
To be double sure. We add observeChanges tobe notified if anything is added or removed from the collection. 


Commit 4
