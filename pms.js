Projects = new Mongo.Collection("projects");
Goals = new Mongo.Collection("goals");

if (Meteor.isClient) {

  Template.body.helpers({
    projects: function () {
      return Projects.find();
    }
  });

  Template.body.events({
    "submit .new-project": function (event) {
    // This function is called when the new task form is submitted
    var name = event.target.name.value;

    Projects.insert({
      name: name,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.name.value = "";

    // Prevent default form submit
    return false;
  }
  });

  Template.project.helpers({
    genTree: function(){
      root = {text: this.name}
      //root.children = projects.findOne( { _id: this._id} ).children
      return root;
    }
  })

  Template.project.events({
    "submit .new-goal": function(event){
      var text = event.target.text.value;
      var projectId = new Meteor.Collection.ObjectID(event.target.project_id.value);
      var newId = new Meteor.Collection.ObjectId()._str;
      Goals.insert({_id: newId, parentId: id, text: text, createdAt: new Date()})
      Projects.update({id: id}, {})
      event.target.text.value= "";
      return false;
    }
  })

  Template.project.rendered = function(){
    root = {text: this.data.name};
    root.children = [this.data.goal];
    var data = [root];
    var tree = d3.layout.tree();
   // var nodes  = tree.nodes(root);
    //var links = tree.links(nodes);
    svg = d3.selectAll('.chart').append('svg');
    svg.append('circle').attr("cy", 60)
    .attr("cx", 60)
    .attr("r", 20);
  }

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
