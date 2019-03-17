THREE.MTLLoader=function(t){this.manager=void 0!==t?t:THREE.DefaultLoadingManager},THREE.MTLLoader.prototype={constructor:THREE.MTLLoader,load:function(t,a,e,r){var s=this,i=void 0===this.path?THREE.LoaderUtils.extractUrlBase(t):this.path,o=new THREE.FileLoader(this.manager);o.setPath(this.path),o.load(t,function(t){a(s.parse(t,i))},e,r)},setPath:function(t){return this.path=t,this},setResourcePath:function(t){return this.resourcePath=t,this},setTexturePath:function(t){return console.warn("THREE.MTLLoader: .setTexturePath() has been renamed to .setResourcePath()."),this.setResourcePath(t)},setCrossOrigin:function(t){return this.crossOrigin=t,this},setMaterialOptions:function(t){return this.materialOptions=t,this},parse:function(t,a){for(var e=t.split("\n"),r={},s=/\s+/,i={},o=0;o<e.length;o++){var n=e[o];if(0!==(n=n.trim()).length&&"#"!==n.charAt(0)){var h=n.indexOf(" "),p=h>=0?n.substring(0,h):n;p=p.toLowerCase();var c=h>=0?n.substring(h+1):"";if(c=c.trim(),"newmtl"===p)r={name:c},i[c]=r;else if("ka"===p||"kd"===p||"ks"===p||"ke"===p){var l=c.split(s,3);r[p]=[parseFloat(l[0]),parseFloat(l[1]),parseFloat(l[2])]}else r[p]=c}}var u=new THREE.MTLLoader.MaterialCreator(this.resourcePath||a,this.materialOptions);return u.setCrossOrigin(this.crossOrigin),u.setManager(this.manager),u.setMaterials(i),u}},THREE.MTLLoader.MaterialCreator=function(t,a){this.baseUrl=t||"",this.options=a,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.side=this.options&&this.options.side?this.options.side:THREE.FrontSide,this.wrap=this.options&&this.options.wrap?this.options.wrap:THREE.RepeatWrapping},THREE.MTLLoader.MaterialCreator.prototype={constructor:THREE.MTLLoader.MaterialCreator,crossOrigin:"anonymous",setCrossOrigin:function(t){return this.crossOrigin=t,this},setManager:function(t){this.manager=t},setMaterials:function(t){this.materialsInfo=this.convert(t),this.materials={},this.materialsArray=[],this.nameLookup={}},convert:function(t){if(!this.options)return t;var a={};for(var e in t){var r=t[e],s={};a[e]=s;for(var i in r){var o=!0,n=r[i],h=i.toLowerCase();switch(h){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(n=[n[0]/255,n[1]/255,n[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===n[0]&&0===n[1]&&0===n[2]&&(o=!1)}o&&(s[h]=n)}}return a},preload:function(){for(var t in this.materialsInfo)this.create(t)},getIndex:function(t){return this.nameLookup[t]},getAsArray:function(){var t=0;for(var a in this.materialsInfo)this.materialsArray[t]=this.create(a),this.nameLookup[a]=t,t++;return this.materialsArray},create:function(t){return void 0===this.materials[t]&&this.createMaterial_(t),this.materials[t]},createMaterial_:function(t){function a(t,a){return"string"!=typeof a||""===a?"":/^https?:\/\//i.test(a)?a:t+a}function e(t,e){if(!i[t]){var s=r.getTextureParams(e,i),o=r.loadTexture(a(r.baseUrl,s.url));o.repeat.copy(s.scale),o.offset.copy(s.offset),o.wrapS=r.wrap,o.wrapT=r.wrap,i[t]=o}}var r=this,s=this.materialsInfo[t],i={name:t,side:this.side};for(var o in s){var n,h=s[o];if(""!==h)switch(o.toLowerCase()){case"kd":i.color=(new THREE.Color).fromArray(h);break;case"ks":i.specular=(new THREE.Color).fromArray(h);break;case"ke":i.emissive=(new THREE.Color).fromArray(h);break;case"map_kd":e("map",h);break;case"map_ks":e("specularMap",h);break;case"map_ke":e("emissiveMap",h);break;case"norm":e("normalMap",h);break;case"map_bump":case"bump":e("bumpMap",h);break;case"map_d":e("alphaMap",h),i.transparent=!0;break;case"ns":i.shininess=parseFloat(h);break;case"d":(n=parseFloat(h))<1&&(i.opacity=n,i.transparent=!0);break;case"tr":n=parseFloat(h),this.options&&this.options.invertTrProperty&&(n=1-n),n>0&&(i.opacity=1-n,i.transparent=!0)}}return this.materials[t]=new THREE.MeshPhongMaterial(i),this.materials[t]},getTextureParams:function(t,a){var e,r={scale:new THREE.Vector2(1,1),offset:new THREE.Vector2(0,0)},s=t.split(/\s+/);return(e=s.indexOf("-bm"))>=0&&(a.bumpScale=parseFloat(s[e+1]),s.splice(e,2)),(e=s.indexOf("-s"))>=0&&(r.scale.set(parseFloat(s[e+1]),parseFloat(s[e+2])),s.splice(e,4)),(e=s.indexOf("-o"))>=0&&(r.offset.set(parseFloat(s[e+1]),parseFloat(s[e+2])),s.splice(e,4)),r.url=s.join(" ").trim(),r},loadTexture:function(t,a,e,r,s){var i,o=THREE.Loader.Handlers.get(t),n=void 0!==this.manager?this.manager:THREE.DefaultLoadingManager;return null===o&&(o=new THREE.TextureLoader(n)),o.setCrossOrigin&&o.setCrossOrigin(this.crossOrigin),i=o.load(t,e,r,s),void 0!==a&&(i.mapping=a),i}};