LangaugeSchema = new SimpleSchema({
  code: {
    type: String,
    label: "Code"
  },
  name: {
    type: String,
    label: "Name"
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

// Define the languauges collection
Languages = new Mongo.Collection("languages");
// Attach schema to languages to collection
Languages.attachSchema(LangaugeSchema);
