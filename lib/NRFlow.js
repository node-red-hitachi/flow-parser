const NRContainer = require("./NRContainer.js");


/**
 * NRFlow - Description
 * @property {Set} configs - Configuration nodes in this flow/subflow
 * @property {Set} subflows - Subflows in this flow/subflow
 * @property {Set} groups - Groups in this flow/subflow
 * @extends NRContainer
 */
class NRFlow extends NRContainer {

    /**
     * constructor - Description
     *
     * @param {type} config Description
     */
    constructor(config) {
        super(config);
        this.disabled = !!config.disabled;
        this.info = config.info;

        delete config.disabled;
        delete config.info;

        this.configs = new Map();
        this.subflows = new Map();
        this.groups = new Map();
    }

    export() {
        let obj = super.export();
        obj.disabled = this.disabled;
        delete obj.d;
        obj.info = this.info;
        return obj
    }
    exportContents() {
        let result = [];
        this.configs.forEach((n,_) => {
            result.push(n.export());
        })
        this.subflows.forEach((n,_) => {
            result.push(n.export())
            result = result.concat(n.exportContents());
        })
        this.groups.forEach((n,_) => {
            result.push(n.export());
        })
        // Nodes exported last
        result = result.concat(super.exportContents());
        return result;
    }
    /**
     * addSubflow - Description
     * @param {NRSubflow} subflow Description
     */
    addSubflow(subflow) {
        this.subflows.set(subflow.id, subflow);
        subflow.setParent(this);
    }

    /**
     * addConfigNode - Description
     * @param {NRConfigNode} configNode Description
     */
    addConfigNode(configNode) {
        this.configs.set(configNode.id, configNode);
        configNode.setParent(this);
    }

    /**
     * addGroup - Description
     * @param {NRGroup} group Description
     */
    addGroup(group) {
        this.groups.set(group.id, group);
        group.setParent(this);
    }

    walk(callback) {
        super.walk(callback);
        this.subflows.forEach(n => n.walk(callback))
        this.configs.forEach(n => n.walk(callback))
        this.groups.forEach(n => n.walk(callback))
    }
}
module.exports = NRFlow;
