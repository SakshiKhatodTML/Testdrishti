/**
 * EntityProperty captures entity name and values
 */
class EntityProperty {
    /**
         * Entity Property constructor.
         *
         * @param {String} name entity name
         * @param {String} value entity value
         */
    constructor(name, value) {
        if (!name || !value) throw new Error('Need name and value to create an entity')
        this.entityName = name
        this.entityValue = value
    }
}

module.exports.EntityProperty = EntityProperty

