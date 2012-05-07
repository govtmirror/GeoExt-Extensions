Ext.ns("GDP");

GDP.SOSGetCapabilitiesStore = function(meta) {
    meta = meta || {};
    
    meta.format = new OpenLayers.Format.SOSCapabilities();
    //meta.format.write(meta.opts);
    meta.fields = [
            {name: "capabilities"} // root capabilities object
    ];
    GDP.SOSGetCapabilitiesStore.superclass.constructor.call(
        this,
        Ext.apply(meta, {
            proxy: meta.proxy || (!meta.data ? new Ext.data.HttpProxy({url: meta.url, disableCaching: false, method: "GET"}) : undefined),
            baseParams : meta.baseParams || { xmlData : meta.format.write(meta.opts) },
            reader: new GDP.SOSGetCapabilitiesReader(meta)
        })
    );
};

Ext.extend(GDP.SOSGetCapabilitiesStore, Ext.data.Store);
