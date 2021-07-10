const { LuisRecognizer } = require('botbuilder-ai')
// const { LUIS_ENTITIES_LIST, LUIS_INTENTS, LUIS_ENTITIES} = require('../src/luisEnums');
const { EntityProperty } = require('./entityProperty')

/**
 * On turn property class.
 *   On turn property captures intent and entities from card based input or
 *   NLP results from LUIS.ai
 */
class OnTurnProperty {
    /**
     * On Turn Property constructor.
     *
     * @param {String} intent intent name
     * @param {EntityProperty} entities Array of Entities
     */
    constructor(intent, entities,instance) {
        this.intent = intent || ''
        this.entities = entities || []
        this.instance = instance || {}
    }
}

/**
 *
 * Static method to create an on turn property object from LUIS results
 *
 * @param {Object} LUISResults
 * @returns {OnTurnProperty}
 */
OnTurnProperty.fromLUISResults = function(LUISResults, childappentities) {
    let onTurnProperties = new OnTurnProperty()

    if (childappentities !== null) {
        onTurnProperties.intent = childappentities.topIntent
    }
    else if (LUISResults.luisResult && LUISResults.luisResult.prediction.intents[LUISResults.luisResult.prediction.topIntent].score > 0.30) {
        onTurnProperties.intent = LuisRecognizer.topIntent(LUISResults)
    }
    if(LUISResults.entities['$instance']){
        onTurnProperties.instance=LUISResults.entities['$instance']
    }
    let entities = {}
    // Gather entity values if available. Uses a const list of LUIS entity names.
    if (childappentities !== null) {
        entities = Object.keys(childappentities.entities)

    } else {
        entities = LUISResults.luisResult ? Object.keys(LUISResults.luisResult.prediction.entities) : []

    }
    try {
        if (entities.length > 0) {
            entities.forEach(luisEntity => {
                if (luisEntity !== '$instance') {
                    if (childappentities !== null) {
                        if (childappentities.entities[luisEntity][0] && childappentities.entities[luisEntity][0].type) {
                            /*
                             * In order to travers the array when multiple entities were found like in dateTimeV2
                             * multiple entities that can be found are data, range and duration
                             */
                            childappentities.entities[luisEntity].forEach((entityObject) => {
                                onTurnProperties.entities.push(new EntityProperty(entityObject.type, entityObject.values))
                            })

                            // onTurnProperties.entities.push(new EntityProperty(LUISResults.luisResult.prediction.entities[luisEntity][0].type, LUISResults.luisResult.prediction.entities[luisEntity]));

                        } else {
                            onTurnProperties.entities.push(new EntityProperty(luisEntity, childappentities.entities[luisEntity]))
                        }
                    }
                    else if (LUISResults.luisResult.prediction.entities[luisEntity][0] && LUISResults.luisResult.prediction.entities[luisEntity][0].type) {
                        /*
                         * In order to travers the array when multiple entities were found like in dateTimeV2
                         * multiple entities that can be found are data, range and duration
                         */

                        LUISResults.luisResult.prediction.entities[luisEntity].forEach((entityObject) => {
                            onTurnProperties.entities.push(new EntityProperty(entityObject.type, entityObject.values))
                        })

                        // onTurnProperties.entities.push(new EntityProperty(LUISResults.luisResult.prediction.entities[luisEntity][0].type, LUISResults.luisResult.prediction.entities[luisEntity]));

                    } else {
                        onTurnProperties.entities.push(new EntityProperty(luisEntity, LUISResults.luisResult.prediction.entities[luisEntity]))
                    }
                }
            })
        }
        //console.log('Entities found from LUIS=====>', JSON.stringify(onTurnProperties.entities));
    } catch (err) {
        console.log(err)
    }
    return onTurnProperties
}

/**
 * sample of onTrunPropoerty object
 * {"intent":"LMS_ApplyLeave_Transactions","entities":[{"entityName":"ApproveType","entityValue":[["leave"]]}]}
 */

OnTurnProperty.findEntity = (entitylist, entityname) => {
    let res
    entitylist.forEach((data) => {
        if (data.entityName == entityname) {
            res = data
        }
    })
    return res
}


OnTurnProperty.findAllEntities = (entitylist, entityname) => {
    let enitityList = []
    entitylist.forEach((data) => {
        if (data.entityName === entityname) {
            enitityList.push(data)
        }

    })
    return enitityList
}
OnTurnProperty.getDateTimeNumber=(dateTimeInstanceList,entityname)=>{
    let enitityList = []
    let reg = /\d+/g
    //entityname= datetime
    if(dateTimeInstanceList[entityname]){
        dateTimeInstanceList[entityname].forEach((data) => {
            enitityList=String(data.text).match(reg)
    if(String(data.text).toLowerCase().match('hours')|| String(data.text).toLowerCase().match('hrs')){
        enitityList=[]
        return []
    }
  
        })
    }
    
    return enitityList
}

module.exports.OnTurnProperty = OnTurnProperty
