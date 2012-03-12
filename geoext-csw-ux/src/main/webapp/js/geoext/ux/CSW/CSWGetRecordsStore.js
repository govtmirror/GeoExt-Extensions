Ext.ns("CIDA");

CIDA.CSWGetRecordsStore = function(meta) {
    meta = meta || {};
    
    meta.format = new OpenLayers.Format.CSWGetRecords(meta.opts);
    meta.format.write();
    
    CIDA.CSWGetRecordsStore.superclass.constructor.call(
        this,
        Ext.apply(meta, {
            proxy: meta.proxy || (!meta.data ? new Ext.data.HttpProxy({url: meta.url, disableCaching: false, method: "POST"}) : undefined),
            baseParams : { xmlData : meta.format.write() },
            reader: meta.reader || new CIDA.CSWGetRecordsReader(meta)
        })
    );
};

Ext.extend(CIDA.CSWGetRecordsStore, Ext.data.Store);
