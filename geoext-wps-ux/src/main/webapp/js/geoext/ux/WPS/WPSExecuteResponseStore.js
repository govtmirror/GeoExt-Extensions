Ext.ns("CIDA");

CIDA.WPSExecuteResponseStore = function(meta) {
    meta = meta || {};
    
    meta.format = new OpenLayers.Format.WPSExecute();
    meta.fields = [
        {name: "version", type: "string"},
        {name: "languages"}, // Array of objects
        {name: "operationsMetadata"}, // Array of objects
        {name: "processOfferings"}, // Object
        {name: "serviceIdentification"}, // Object
        {name: "serviceProvider"}
    ]
    CIDA.WPSExecuteResponseStore.superclass.constructor.call(
        this,
        Ext.apply(meta, {
            proxy: meta.proxy || (!meta.data ? new Ext.data.HttpProxy({url: meta.url, disableCaching: false, method: "GET"}) : undefined),
            reader: new CIDA.WPSExecuteResponseReader(meta)
        })
    );
};

Ext.extend(CIDA.WPSExecuteResponseStore, Ext.data.Store);
