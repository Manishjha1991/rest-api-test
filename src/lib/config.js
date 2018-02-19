export const configurationFile = {
  production: {
    mongoUrl:
      "mongodb://manish:manishjha.123@basisxelpmoc-shard-00-00-fnd24.mongodb.net:27017,basisxelpmoc-shard-00-01-fnd24.mongodb.net:27017,basisxelpmoc-shard-00-02-fnd24.mongodb.net:27017/basisXelpmoc?ssl=true&replicaSet=BasisXelpmoc-shard-0&authSource=admin"
  },

  staging: {
    mongoUrl:
      "mongodb://manish:manishjha.123@basisxelpmoc-shard-00-00-fnd24.mongodb.net:27017,basisxelpmoc-shard-00-01-fnd24.mongodb.net:27017,basisxelpmoc-shard-00-02-fnd24.mongodb.net:27017/basisXelpmoc?ssl=true&replicaSet=BasisXelpmoc-shard-0&authSource=admin"
  },
  development: {
    mongoUrl: "mongodb://localhost:27017/test?authMechanism=DEFAULT"
  },
  test: {
    mongoUrl: "mongodb://localhost:27017/test?authMechanism=DEFAULT"
  }
};
