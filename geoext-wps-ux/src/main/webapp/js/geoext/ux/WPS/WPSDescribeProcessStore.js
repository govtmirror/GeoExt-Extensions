Ext.ns("CIDA");

CIDA.WPSDescribeProcessStore = function(meta) {
    meta = meta || {};
    
    meta.format = new OpenLayers.Format.WPSDescribeProcess();
    meta.fields = [
        {name: "title", type: "string"},
        {name: "storeSupported", type: "boolean"},
        {name: "statusSupported", type: "boolean"},
        {name: "processVersion", type: "string"},
        {name: "abstract", type: "string"},
        {name: "dataInputs"}, // Array
        {name: "processOutputs"} // Array
    ]
    CIDA.WPSDescribeProcessStore.superclass.constructor.call(
        this,
        Ext.apply(meta, {
            proxy: meta.proxy || (!meta.data ? new Ext.data.HttpProxy({url: meta.url, disableCaching: false, method: "GET"}) : new Ext.data.MemoryProxy(meta.data)),
            reader: new CIDA.WPSDescribeProcessReader(meta)
        })
    );
};

Ext.extend(CIDA.WPSDescribeProcessStore, Ext.data.Store);
