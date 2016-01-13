this.Documents2 = new Mongo.Collection("documents2");

if (Meteor.isClient) {

    // update the session current_date
    // variable every 1000 ms

    Meteor.setInterval(()=>{
        Session.set("current_date", new Date());
    }, 1000);

    Template.date_display.helpers({
        current_date:()=>{
            return Session.get("current_date");
        }
    });

    Template.editor.helpers({
        docid:function(){
            var doc = Documents2.findOne();
            if (doc){
                return doc._id;
            }
            else {
                return undefined;
            }
        },
        config:()=>{
            return editor=>{
                editor.on("change", (cm_editor, info)=>{
                    console.log(cm_editor.getValue());
                    $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
                });
            }
        }
    });

    Template.viewer.helpers({

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
