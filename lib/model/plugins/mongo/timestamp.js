module.exports = function timestamp(schema, options){
  schema.add({
    createdAt: Date,
    updatedAt: Date
  });

  schema.pre('save', function(next){
    var timestamp = new Date;

    if (!this.createdAt) {
      this.createdAt = timestamp;
    }

    this.updatedAt = timestamp;
    next();
  });

  if (options && options.index) {
    schema.path('createdAt').index(options.index);
    schema.path('updatedAt').index(options.index);
  }
};