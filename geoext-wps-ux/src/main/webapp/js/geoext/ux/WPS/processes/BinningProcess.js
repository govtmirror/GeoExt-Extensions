Ext.ns('NAWQA');

NAWQA.BinningProcess  = function(args) {
	if (!args) args = {};
	var _identifier = 'gs:Binning';
	var _layerName = args.layerName || undefined;
	var _binColumn = args.binColumn || 'value';
	var _numBins = args.numBins || 5;
	var _strategy = args.strategy || 'EqualCount';
	var _outId = args.outId || 'output';
	
	
	var that = {
		init : function(args) {
			that.layerName = args.layerName || that.layerName;
			that.binColumn = args.binColumn || that.binColumn;
			that.numBins = args.numBins || that.numBins;
			that.strategy = args.strategy || that.strategy;
			that.outId = args.outId || that.outId;
		},
		identifier : _identifier,
		layerName : _layerName,
		binColumn : _binColumn,
		numBins : _numBins,
		strategy : _strategy,
		outId : _outId,
		createWpsExecuteRequest : function() {
			// To easier see what's happening here, take a look at:
			// js/openlayers/lib/OpenLayers/Format/WPSExecute.js 
			// at the writers object.
			var writer = new OpenLayers.Format.WPSExecute();
			var executeXml = writer.writeNode('wps:Execute', {
				identifier : that.identifier,
				dataInputs : [
				{
					title : 'layer-name',
					identifier : 'layer-name',
					data : {
						literalData : {
							value : that.layerName
						}
					}
				},{
					title : 'identifier',
					identifier : 'identifier',
					data : {
						literalData : {
							value : that.binColumn
						}
					}
				},{
					title : 'num-bins',
					identifier : 'num-bins',
					data : {
						literalData : {
							value : that.numBins
						}
					}
				},{
					title : 'strategy',
					identifier : 'strategy',
					data : {
						literalData : {
							value : that.strategy
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
