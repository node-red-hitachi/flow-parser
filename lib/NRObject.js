/**
 * NRObject - Description
 * @property {string} id - unique identifier for this object
 * @property {string} z - identifier of the flow/subflow this object is on
 * @property {string} type - the type of the object
 * @property {boolean} disabled - whether the object is disabled
 * @property {object} config - the item-specific configuration properties
 * @property {NRFlow|NRSubflow} parent - the parent object. This will be the NRFlow/NRSubflow that 'owns' this object
 */
class NRObject {
    /**
     * constructor - Description
     * @param {type} config Description
     *
     */
    constructor(config) {
        this.id = config.id;
        this.z = config.z;
        this.type = config.type;
        this.disabled = !!config.d;
        delete config.id;
        delete config.z;
        delete config.type;
        delete config.d;
        this.config = config;
        // This is set by a later call to `setParent` providing the actual NRFlow/NRSubflow object
        this.parent = null;
    }

    /**
     * setParent - Sets the parent object of this object. Either a Flow or Subflow
     * @param {NRFlow|NRSubflow} parent Description
     */
    setParent(parent) {
        this.z = parent.id;
        this.parent = parent;
    }


    /**
     * export - Exports this object as an Object that can be included in a flow
     * @return {object} the exported object
     */
    export() {
        let obj = {
            id: this.id,
            type: this.type
        }
        if (this.z) {
            obj.z = this.z;
        }
        if (this.disabled) {
            obj.d = true;
        }
        for (let property in this.config) {
            if (this.config.hasOwnProperty(property)) {
                obj[property] = this.config[property];
            }
        }
        return obj;
    }

    walk(callback) {
        if (this.id) {
            callback(this);
        }
    }
}

module.exports = NRObject;
