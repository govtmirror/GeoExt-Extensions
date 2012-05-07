Ext.ns("CIDA");

CIDA.SOSGetCapabilitiesStore = function(meta) {
    meta = meta || {};
    
    meta.format = new OpenLayers.Format.SOSCapabilities();
    //meta.format.write(meta.opts);
    meta.fields = [
            {name: "capabilities"} // root capabilities object
    ];
    CIDA.SOSGetCapabilitiesStore.superclass.constructor.call(
        this,
        Ext.apply(meta, {
            proxy: meta.proxy || (!meta.data ? new Ext.data.HttpProxy({url: meta.url, disableCaching: false, method: "GET"}) : undefined),
            baseParams : meta.baseParams || { xmlData : meta.format.write(meta.opts) },
            reader: new CIDA.SOSGetCapabilitiesReader(meta)
        })
    );
};

Ext.extend(CIDA.SOSGetCapabilitiesStore, Ext.data.Store);
