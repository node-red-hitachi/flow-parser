const NRNode = require("./NRNode.js");

/**
 * NRSubflowInstance - Description
 * @property {NRSubflow} subflow - The Subflow this is an instance of
 * @property {string} subflowId - The id of the Subflow this is an instance of
 * @extends NRNode
 */
class NRSubflowInstance extends NRNode {

    /**
     * constructor - Description
     * @param {type} config Description
     */
    constructor(config) {
        if (!/^subflow:/.test(config.type)) {
            throw new Error("Not a subflow instance node "+config.id+" type:"+config.type);
        }
        super(config);

        this.subflowId = this.type.substring(8);
        // Set later by a call to setSubflow
        this.subflow = null;
    }


    /**
     * setSubflow - Description
     * @param {NRSubflow} subflow The Subflow this is an instance of
     */
    setSubflow(subflow) {
        if (subflow.id !== this.subflowId) {
            throw new Error("Subflow id does not match expected type id type:"+this.type+" got "+subflow.id)
        }
        this.subflow = subflow;
    }

}

module.exports = NRSubflowInstance;
