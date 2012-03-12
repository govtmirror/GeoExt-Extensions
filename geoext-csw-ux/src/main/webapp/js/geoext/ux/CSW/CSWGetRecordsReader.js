Ext.ns("CIDA");

CIDA.CSWGetRecordsReader = function(meta, recordType) {
            
    meta = meta || {};
    if(!meta.format) {
        meta.format = new OpenLayers.Format.CSWGetRecords();
    }
    if(typeof recordType !== "function") {
        recordType = Ext.data.Record.create(meta.fields || [
            {name: "characterSet", defaultValue: []},
            {name: "dataQualityInfo", defaultValue: []},
            {name: "dateStamp", type: "date", useNull: true},
            {name: "distributionInfo", defaultValue: {}},
            {name: "identificationInfo", defaultValue: []},
            {name: "fileIdentifier",  type: "string", useNull: true},
            {name: "language",  type: "string", useNull: true},
            {name: "metadataStandardName",  type: "string", useNull: true},
            {name: "metadataStandardVersion",  type: "string", useNull: true},
            {name: "referenceSystemInfo", defaultValue: []},
            {name: "type", type: "string", useNull: true}
        ]
        );
    }
    CIDA.CSWGetRecordsReader.superclass.constructor.call(
        this, meta, recordType
        );
};

Ext.extend(CIDA.CSWGetRecordsReader, Ext.data.DataReader, {
    /**
    * Takes an element, checks the array for that element
    * and if found, returns the index of that element. 
    * Otherwise, returns -1
    */
    arrayContains : function(array, element) {
        for (var i = 0;i < array.length;i++) {
            if (array[i] == element) {
                return i;
            }
        }
        return -1;
    },

    /** api: config[attributionCls]
     *  ``String`` CSS class name for the attribution DOM elements.
     *  Element class names append "-link", "-image", and "-title" as
     *  appropriate.  Default is "gx-attribution".
     */
    attributionCls: "gx-attribution",
            
    /** private: method[read]
     *  :param request: ``Object`` The XHR object which contains the parsed XML
     *      document.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     */
    read: function(request) {
        var data = request.responseXML;
        if(!data || !data.documentElement) {
            data = request.responseText;
        }
        return this.readRecords(data);
    },
    

    /** private: method[readRecords]
     *  :param data: ``DOMElement | String | Object`` A document element or XHR
     *      response string.  As an alternative to fetching capabilities data
     *      from a remote source, an object representing the capabilities can
     *      be provided given that the structure mirrors that returned from the
     *      capabilities parser.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     *  
     *  Create a data block containing Ext.data.Records from an XML document.
     */
    readRecords: function(data) {
        if(typeof data === "string" || data.nodeType) {
            data = this.meta.format.read(data);
        }
        
        var records = [];

        Ext.iterate(data.records, function (item) {
            var values = {};
            
            values.characterSet = null; 
            values.dataQualityInfo = null; 
            values.dateStamp = null; 
            values.distributionInfo = item.distributionInfo || null; 
            values.identificationInfo = null; 
            values.fileIdentifier = null; 
            values.language = null; 
            values.metadataStandardName = null; 
            values.metadataStandardVersion = null; 
            values.referenceSystemInfo = null; 
            values.type = item.type || null; 

            if (item.characterSet && item.characterSet.length > 0) values.characterSet = item.characterSet;
            if (item.dataQualityInfo && item.dataQualityInfo.length > 0) values.dataQualityInfo = item.dataQualityInfo;
            if (item.dateStamp) values.dateStamp = item.dateStamp.DateTime.value;
            if (item.fileIdentifier) values.fileIdentifier = item.fileIdentifier.CharacterString.value;
            if (item.identificationInfo && item.identificationInfo.length > 0) values.identificationInfo = item.identificationInfo;
            if (item.language) values.language = item.language.CharacterString.value;
            if (item.metadataStandardName) values.metadataStandardName = item.metadataStandardName.CharacterString.value;
            if (item.metadataStandardVersion) values.metadataStandardVersion = item.metadataStandardVersion.CharacterString.value;
            if (item.referenceSystemInfo && item.referenceSystemInfo.length > 0) values.referenceSystemInfo = item.referenceSystemInfo;
            
            records.push(new this.recordType(values));
        }, this);
        
        return {
            totalRecords: records.length,
            success: true,
            records: records
        };

    }

});
