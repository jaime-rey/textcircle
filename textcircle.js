this.Documents2 = new Mongo.Collection("documents2");

if (Meteor.isClient) {
    Template.editor.helpers({
        docid:function(){
            var doc = Documents2.findOne();
            if (doc){
                return doc._id;
            }
            else {
                return undefined;
            }
        }
    });
}

if ( Meteor.isServer ) {
  Meteor.startup( function () {
      // code to run on server at startup
      if(!Documents2.findOne()){ // no documents yethsu
        Documents2.insert({title:"my new document"});
      }

  });
}
