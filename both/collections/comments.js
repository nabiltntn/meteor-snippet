CommentsSchema = new SimpleSchema({
  content: {
    type: String,
    label: "content"
  },
  snippetId: {
    type: String,
    label: "snippet id"
  },

  createdAt: {
    label : 'Created at',
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }

});

// Define the comments collection
Comments = new Mongo.Collection("comments");
// Attach schema to comments  collection
Comments.attachSchema(CommentsSchema);
