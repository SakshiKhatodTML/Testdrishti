const CosmosClient = require('@azure/cosmos').CosmosClient;
const {CosmosDB}= require("../envConfig");

class CosmosDataBase {
    static client=null; // eslint-disable-line
    
    static  Connection() {
        // if(this.client==null){
        //     let endpoint=CosmosDB.Endpoint;
        //     let key= CosmosDB.Key;
        //     this.client= new CosmosClient({ endpoint, key });
        // }
        // this.client.databases.createIfNotExists({
        //     id: CosmosDB.Database
        //  }).then(res=>{
        //      console.log(res.id);
        //  }).catch(err=>{
        //      console.log(err);
        //  })

        return this.client;
    }
    async Upsert(email,conversion){
        try{
        let db= CosmosDataBase.Connection();
        return await db.database(CosmosDB.Database).container("TMLDrishti").items.upsert({id:email,conversion:conversion})
        }
        catch(err){
            console.log(err);
        }
    }
    async Find(email){
        let db= CosmosDataBase.Connection();
        let querySpec={
            query: 'SELECT r.conversion, r.id FROM TMLDrishti r WHERE  ARRAY_CONTAINS(@email, r.id)',
            parameters: [
            {
                name: '@email',
                value: email
            }
            ]
        }
        let results=await db.database(CosmosDB.Database).container("TMLDrishti").items.query(querySpec).fetchAll();
        return results? results.resources: null;
    }
    async GetAll(){
        let db= CosmosDataBase.Connection();
        let querySpec={
            query: 'SELECT r.conversion, r.id FROM TMLDrishti r'
        }
        let results=await db.database(CosmosDB.Database).container("TMLDrishti").items.query(querySpec).fetchAll();
        return results? results.resources: null;
    }
}
module.exports.CosmosDataBase=CosmosDataBase;
