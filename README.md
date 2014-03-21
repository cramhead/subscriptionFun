Commit 1
So calling subscribe on a subscription that already has been subscribed to does nothing. It's checked at the client.

Commit 2
So what about subscribing to a subset via a different publish.
The initial subscribe returns one item as expected.
The doSubscribe return one item, item 9, and item 8 and 9 are now in the collection.