const { ApolloServer } = require("apollo-server");
// Import schema from graphql file
const { importSchema } = require("graphql-import");  
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables
require("dotenv").config();

const resolvers = {
  Query: {
    // Resolver to get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get latest ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get average block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
