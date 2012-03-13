Ext.ns("CIDA");

CIDA.SOSGetObservationStore = function(meta) {
    meta = meta || {};
    
    meta.format = new OpenLayers.Format.SOSGetObservation();
    //meta.format.write(meta.opts);
    meta.fields = [
            {name: "id", type: "string"},
            {name: "name", type: "string"},
            {name: "bounds"}, // Object
            {name: "fois"}, // Array of objects
            {name: "dataRecord"}, // Array of objects
            {name: "values"} // Array of objects
    ]
    CIDA.SOSGetObservationStore.superclass.constructor.call(
        this,
        Ext.apply(meta, {
            proxy: meta.proxy || (!meta.data ? new Ext.data.HttpProxy({url: meta.url, disableCaching: false, method: "POST"}) : undefined),
            baseParams : meta.baseParams || { xmlData : meta.format.write(meta.opts) },
            reader: new CIDA.SOSGetObservationReader(meta)
        })
    );
};

Ext.extend(CIDA.SOSGetObservationStore, Ext.data.Store);
