Ext.ns('NAWQA');

NAWQA.AggregateProcess  = function(args) {
	if (!args) args = {};
	var _identifier = 'gs:Aggregate';
	var _aggregateType = args.aggregateType || 'average';
	var _outId = args.outId || 'output';
	
	var that = {
		init : function(args) {
			that.aggregateType = args.aggregateType || that.aggregateType;
			that.outId = args.outId || that.outId;
		},
		identifier : _identifier,
		aggregateType : _aggregateType,
		outId : _outId,
		createWpsExecuteReference : function() {
			return {
				mimeType : "text/xml; subtype=wfs-collection/1.0",
				href : "http://geoserver/wps",
				method : "POST",
				body : {
					identifier : that.identifier,
					dataInputs : [
					{
						title : 'aggregate_type',
						identifier : 'aggregate_type',
						data : {
							literalData : {
								value : that.aggregateType
							}
						}
					}
					],
					responseForm : {
						rawDataOutput : {
							mimeType :"text/xml; subtype=wfs-collection/1.0",
							identifier : that.outId
						}
					}
				}
			};
		},
		createWpsExecuteRequest : function() {
			// To easier see what's happening here, take a look at:
			// js/openlayers/lib/OpenLayers/Format/WPSExecute.js 
			// at the writers object.
			var writer = new OpenLayers.Format.WPSExecute();
			var executeXml = writer.writeNode('wps:Execute', that.createWpsExecuteReference().body);
			
			return new OpenLayers.Format.XML().write(executeXml);
		}
	};
	
	return that;
}
