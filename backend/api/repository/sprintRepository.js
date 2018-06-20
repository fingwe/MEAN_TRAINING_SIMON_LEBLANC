const { MongoClient } = require('mongodb');

function sprintRepository() {

    const url = 'mongodb://localhost:27017';
    const dbName = 'sprintApp';
    

    function getTimers(_id) {

        
    }

    function setTimer(timer) {
        (async function  mongo() {
          let client;
          try {
            client = await MongoClient.connect(url);
            console.log('Connected to mongoDB successfully');

            const db = client.db(dbName);

            const response = await db.collection('sprints').insertOne(timer);

            return response;

          } catch (err) {
              console.log(err.stack);
          }
        }());
    }

    function getTimer(_id) {

    }
    

    return {getTimers,
            setTimer,
            getTimer};
}

module.exports = sprintRepository;
