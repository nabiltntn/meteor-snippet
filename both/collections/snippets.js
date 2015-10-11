SnippetSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  content: {
    type: String,
    label: "Snippet content"
  },
  language: {
    type: String,
    label: "Description"
  },
  level: {
    type: Number,
    label: "Level"
  },
  numberOfVotes : {
    type: Number,
    label : 'Number of votes',
    min : 0,
    defaultValue : 0
  },
  voters: {
    label : 'Voters',
    type: [String],
    defaultValue : []
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

// Define the snippet collection
Snippets = new Mongo.Collection("snippets");
// Attach schema to snippet to collection
Snippets.attachSchema(SnippetSchema);
