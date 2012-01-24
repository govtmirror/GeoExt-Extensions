Ext.ns('NAWQA');

NAWQA.ImportProcess  = function(args) {
	if (!args) args = {};
	var _identifier = 'gs:Import';
	var _workspace = args.workspace || 'agoutput';
	var _store = args.store || 'agoutput';
	var _srs = args.srs || 'EPSG:4326';
	var _outId = args.outId || 'layerName';
	var _reference = args.reference || undefined;
	
	
	var that = {
		init : function(args) {
			that.workspace = args.workspace || that.workspace;
			that.store = args.store || that.store;
			that.srs = args.srs || that.srs;
			that.outId = args.outId || that.outId;
			that.reference = args.reference || that.reference;
		},
		identifier : _identifier,
		workspace : _workspace,
		store : _store,
		srs : _srs,
		outId : _outId,
		reference : _reference,
		createWpsExecuteRequest : function() {
			// To easier see what's happening here, take a look at:
			// js/openlayers/lib/OpenLayers/Format/WPSExecute.js 
			// at the writers object.
			var writer = new OpenLayers.Format.WPSExecute();
			var executeXml = writer.writeNode('wps:Execute', {
				identifier : that.identifier,
				dataInputs : [
				{
					title : 'features',
					identifier : 'features',
					reference : that.reference
				},{
					title : 'workspace',
					identifier : 'workspace',
					data : {
						literalData : {
							value : that.workspace
						}
					}
				},{
					title : 'store',
					identifier : 'store',
					data : {
						literalData : {
							value : that.store
						}
					}
				},{
					title : 'srs',
					identifier : 'srs',
					data : {
						literalData : {
							value : that.srs
						}
					}
				}
				],
				responseForm : {
					rawDataOutput : {
						identifier : that.outId
					}
				}
			});
			
			return new OpenLayers.Format.XML().write(executeXml);
		}
	};
	
	return that;
}
