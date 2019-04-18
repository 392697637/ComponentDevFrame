<template>
	<div class="main">
		<div id="mainMap" >        
      
	   </div>
	</div>
    
</template>

<script>
import MapLib from "@module/olMap/src/mapHelper/index.js";
    export default {
        name: 'Main',
        components:{
        },
        data() {
            return {
               }
        },
        mounted() {
        //	this.getButton();  //权限设置
           var factory = MapLib.mapHelperFactory;
		    var layers = MapLib.layers;
		    var enums = MapLib.enums;
		    var extensions = MapLib.extensions
		    var mapHelper = factory.createMapHelper();
		    var eviaEx = new extensions.eviaEx(
		      {
		        url: this.$config.eviaSearchUrl,
		        translate: true,
		        ignore: ["id", "gid"],
		        date: "2009"
		      },
		      { ol: ol }
		    );
		    mapHelper.init(
		      {
		        // crateDefBarControl: false
		        // layers: [layers.test()]
		        exBarOpt: [
		          {
		            id: enums.defBarId.mainTopRight,
		            opt: {
		              exControlOpt: [
		                {
		                  id: enums.defControlId.identify,
		                  opt: {
		                    events: {
		                      exSearch: eviaEx.identify
		                    }
		                  }
		                }
		              ]
		            }
		          }
		        ],
		         target: "mainMap",
		      },
		     
		      { ol: ol }
		    );
		
		    //图层
		    mapHelper.addLayer(enums.mapId.GoogleImage, layers.getGoogleImage());
		    mapHelper.addLayer(
		      "evia",
		      layers.getEviaLayer(null, null, this.$config.eviaLayer)
		    );
           
        },
        computed: {
        	
			   
        },
        watch:{
				
		},
        methods: {
        	
           
            
        }
    }


</script>
<style scoped="scoped">
div.main{
	width:100%;
	height:100%;
}
div#map {
  margin: -10px;
}
#map {
  height: calc(100% - 30px);
  width: 100%;
  position: absolute;
  z-index: 10;
}
div.control {
  position: absolute;
  z-index: 20;
}
</style>
