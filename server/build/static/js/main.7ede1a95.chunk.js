(this.webpackJsonpstayvirtual_chat_application=this.webpackJsonpstayvirtual_chat_application||[]).push([[0],{102:function(e,t,n){},104:function(e,t,n){},128:function(e,t,n){},154:function(e,t){},159:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),o=n(49),s=n.n(o),c=n(11),i=n(16),l=(n(102),n(7));var u=function(e){var t=e.users;return Object(l.jsx)("div",{className:"container",style:{position:"fixed",top:"200px",zIndex:"99999",pointerEvents:"auto",maxWidth:"250px",display:"flex",flexDirection:"column"},children:t?Object(l.jsxs)("div",{children:[Object(l.jsx)("p",{style:{whiteSpace:"pre-wrap",fontSize:"12px"},children:"THE HRWAILL ARCHIVE of Human Expressions is a user generated data set that unfolds into a 3D landscape.  \n\nPlay as data input for the semi-sentient machine learning algorithm HRWAILL and enjoy First Person Shooter access to its slowly expanding index of signs, images and symbols.  \n\nClick on landscape to toggle controls AWSD \nClick ESC to reclaim control of your cursor.  \n\nDrop images in the box below to teach me expressions"}),Object(l.jsx)("p",{className:"users-headline",children:"Online users"}),Object(l.jsx)("div",{className:"users",children:t.map((function(e){return Object(l.jsxs)("div",{className:"activeItem",children:[Object(l.jsx)("p",{children:e.name}),Object(l.jsx)("img",{alt:"Online Icon",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAExJREFUCB1jbPh/le3lx5tNDIwMcQwg8J9hkTi/eh0LWJCBoRwoAAPlQDEGJrhKmDCIBupmQuYjs5lAZiILgNlAMRaQRSAz4UZCLQcAIwYaiAejKoYAAAAASUVORK5CYII="})]},e.name)}))})]}):null})},f=n(66),m=n.n(f),j=function(e){var t,n=e.message,a=n.text,r=n.user,o=e.name,s=!1;return o&&(t=o.trim()),r===t&&(s=!0),s?Object(l.jsxs)("div",{className:"messageContainer justifyEnd",children:[Object(l.jsx)("p",{className:"sentText pr-10",children:t}),Object(l.jsx)("p",{className:"messageText",children:m.a.emojify(a)})]}):Object(l.jsxs)("div",{className:"messageContainer justifyEnd",children:[Object(l.jsx)("p",{className:"sentText pl-10 ",children:r}),Object(l.jsx)("p",{className:"messageText",children:m.a.emojify(a)})]})};var d=function(e){var t=e.messages,n=e.name,r=Object(a.useRef)(null);return Object(a.useEffect)((function(){r.current.scrollIntoView({behavior:"smooth"})}),[t]),Object(l.jsxs)("div",{className:"messages",style:{pointerEvents:"auto"},children:[t.map((function(e,t){return Object(l.jsx)("div",{children:Object(l.jsx)(j,{message:e,name:n})},t)})),Object(l.jsx)("div",{ref:r})]})},p=(n(104),function(e){var t=e.setMessage,n=e.sendMessage,a=e.message;return Object(l.jsxs)("form",{className:"form",children:[Object(l.jsx)("input",{className:"input",type:"text",placeholder:"Type a message...",value:a,onChange:function(e){var n=e.target.value;return t(n)},onKeyPress:function(e){return"Enter"===e.key?n(e):null}}),Object(l.jsx)("button",{className:"sendButton",onClick:function(e){return n(e)},children:"Send"})]})}),b=function(e){var t=e.socket,n=Object(a.useState)(),r=Object(c.a)(n,2),o=r[0],s=r[1],f=Object(a.useState)(""),m=Object(c.a)(f,2),j=m[0],b=m[1],h=Object(a.useState)(""),O=Object(c.a)(h,2),x=O[0],g=O[1],v=Object(a.useState)([]),w=Object(c.a)(v,2),y=w[0],M=w[1];Object(a.useEffect)((function(){e.loggedIn&&(t.on("message",(function(e){M((function(t){return[].concat(Object(i.a)(t),[e])}))})),t.on("roomData",(function(e){var t=e.users,n=e.username;b(t),s(n)})))}),[e.loggedIn,t]);return Object(l.jsx)("div",{style:{position:"absolute",top:"0",bottom:"0",right:"0",left:"0",zIndex:"0",pointerEvents:"none"},children:e.loggedIn&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("div",{className:"chatContainer containerframe",style:{pointerEvents:"auto"},children:[Object(l.jsx)(d,{messages:y,name:o}),Object(l.jsx)(p,{message:x,setMessage:g,sendMessage:function(e){e.preventDefault(),x&&t.emit("sendMessage",x,(function(){return g("")}))}})]}),Object(l.jsx)(u,{users:j})]})})},h=n(22),O=n.n(h),x=n(29),g=n(1),v=n(4),w=n(5),y=n(6),M=n(10),S=n(13),I=n(56),k=n(91);Object(S.b)({PointerLockControlsImpl:k.a});var P=function(e){var t=Object(S.f)(),n=t.camera,r=t.gl,o=Object(a.useRef)();return Object(a.useEffect)((function(){document.getElementById("canvas").addEventListener("click",(function(){o.current&&o.current.lock()}))}),[]),Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("pointerLockControlsImpl",Object(M.a)({ref:o,args:[n,r.domElement]},e))})},_=n(14);function A(e){return{KeyW:"moveForward",KeyS:"moveBackward",KeyD:"moveRight",KeyA:"moveLeft",ArrowUp:"moveForward",ArrowDown:"moveBackward",ArrowRight:"moveRight",ArrowLeft:"moveLeft",Space:"jump"}[e]}var E=n(0),R=n(164),D=function(e){var t=Object(S.f)().camera,n=function(){var e=Object(a.useState)({moveForward:!1,moveBackward:!1,moveLeft:!1,moveRight:!1,jump:!1}),t=Object(c.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){var e=function(e){A(e.code)&&r((function(t){return Object(M.a)(Object(M.a)({},t),{},Object(_.a)({},A(e.code),!0))}))},t=function(e){A(e.code)&&r((function(t){return Object(M.a)(Object(M.a)({},t),{},Object(_.a)({},A(e.code),!1))}))};return document.addEventListener("keydown",e),document.addEventListener("keyup",t),function(){document.removeEventListener("keydown",e),document.removeEventListener("keyup",t)}}),[]),n}(),r=n.moveForward,o=n.moveBackward,s=n.moveLeft,i=n.moveRight,u=n.jump,f=Object(I.b)((function(){return Object(M.a)({mass:1,type:"Dynamic"},e)})),m=Object(c.a)(f,2),j=m[0],d=m[1],p=Object(a.useRef)([0,0,0]);return Object(a.useEffect)((function(){d.velocity.subscribe((function(e){return p.current=e}))}),[d.velocity]),Object(S.c)((function(){t.position.copy(j.current.position);var e=new E.Vector3,n=new E.Vector3(0,0,(o?1:0)-(r?1:0)),a=new E.Vector3((s?1:0)-(i?1:0),0,0);e.subVectors(n,a).normalize().multiplyScalar(6).applyEuler(t.rotation),u&&Math.abs(p.current[1].toFixed(2))<.05&&(d.velocity.set(p.current[0],2,p.current[2]),u=!1),d.velocity.set(e.x,p.current[1],e.z)})),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(P,{starter:e.starter}),Object(l.jsx)("mesh",{ref:j})]})},N=function(e){var t=Object(a.useState)(!1),n=Object(c.a)(t,2),r=n[0],o=n[1],s=Object(S.f)().camera;return Object(a.useEffect)((function(){document.getElementById("canvas").addEventListener("click",(function(){r||o(!0)}))}),[r]),Object(l.jsx)(l.Fragment,{children:r?Object(l.jsx)(D,{position:[s.position.x,1,s.position.y]}):Object(l.jsx)(l.Fragment,{children:Object(l.jsx)(R.a,{autoRotate:!0,autoRotateSpeed:-1.8,maxZoom:30,minZoom:10,minDistance:10,maxDistance:50,maxPolarAngle:Math.PI/2-.1})})})},z=function(e){Object(w.a)(n,e);var t=Object(y.a)(n);function n(){return Object(g.a)(this,n),t.call(this,{uniforms:{uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uSize:{value:150}},vertexShader:"\n      uniform float uPixelRatio;\n      uniform float uSize;\n      uniform float uTime;\n      attribute float aScale;    \n      void main() {\n        vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n        modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;\n        modelPosition.z += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;\n        modelPosition.x += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;\n        vec4 viewPosition = viewMatrix * modelPosition;\n        vec4 projectionPostion = projectionMatrix * viewPosition;    \n        gl_Position = projectionPostion;\n        gl_PointSize = uSize * aScale * uPixelRatio;\n        gl_PointSize *= (1.0 / - viewPosition.z);\n      }",fragmentShader:"\n      void main() {\n        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n        float strength = 0.05 / distanceToCenter - 0.1;\n        gl_FragColor = vec4(1.0, 1.0, 1.0, strength);\n      }"})}return Object(v.a)(n,[{key:"time",get:function(){return this.uniforms.uTime.value},set:function(e){this.uniforms.uTime.value=e}}]),n}(E.ShaderMaterial);function L(e){var t=e.count,n=e.position,r=Object(a.useRef)(),o=Object(a.useMemo)((function(){for(var e=new Float32Array(3*t),n=new Float32Array(t),a=0;a<t;a++)new E.Vector3(100*(Math.random()-.5),1.5*Math.random(),100*(Math.random()-.5)).toArray(e,3*a),n[a]=Math.random();return[e,n]}),[t]),s=Object(c.a)(o,2),i=s[0],u=s[1];return Object(S.c)((function(e,t){return r.current.time+=t/2})),Object(l.jsx)("mesh",{position:n,children:Object(l.jsxs)("points",{children:[Object(l.jsxs)("bufferGeometry",{children:[Object(l.jsx)("bufferAttribute",{attachObject:["attributes","position"],count:t,array:i,itemSize:3}),Object(l.jsx)("bufferAttribute",{attachObject:["attributes","aScale"],count:t,array:u,itemSize:1})]}),Object(l.jsx)("fireflyMaterial",{ref:r,transparent:!0,depthWrite:!1})]},t)})}Object(S.b)({FireflyMaterial:z});var F=n(162),C=n(163),U=n(165),T=n(166),B=n(20),W=n(160),H=function(e){Object(w.a)(n,e);var t=Object(y.a)(n);function n(){var e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(g.a)(this,n),(e=t.call(this,a)).setValues(a),e._flowMapOffset0={value:null},e._flowMapOffset1={value:null},e._tDiffuse={value:null},e._tNormalMap0={value:null},e._tNormalMap1={value:null},e._textureMatrix={value:null},e._reflectorOpacity={value:.2},e}return Object(v.a)(n,[{key:"onBeforeCompile",value:function(e){e.uniforms.flowMapOffset0=this._flowMapOffset0,e.uniforms.flowMapOffset1=this._flowMapOffset1,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tNormalMap0=this._tNormalMap0,e.uniforms.tNormalMap1=this._tNormalMap1,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.reflectorOpacity=this._reflectorOpacity,e.vertexShader="\n        uniform mat4 textureMatrix;\n        varying vec4 my_vUv;\n     \n      ".concat(e.vertexShader,"\n    "),e.vertexShader=e.vertexShader.replace("#include <project_vertex>","\n        #include <project_vertex>\n        my_vUv = textureMatrix * vec4( position, 1.0 );\n        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        "),e.fragmentShader="\n        uniform sampler2D tDiffuse;\n        uniform float flowMapOffset0;\n        uniform float flowMapOffset1;\n        uniform float reflectorOpacity;\n        uniform sampler2D tNormalMap0;\n        uniform sampler2D tNormalMap1;\n        varying vec4 my_vUv;\n        ".concat(e.fragmentShader,"\n    "),e.fragmentShader=e.fragmentShader.replace("#include <map_fragment>","\n        #include <map_fragment>\n\n        float halfCycle = 1.0/2.0;\n        float scale = 1.0;\n        vec3 toEye = normalize( vec3(1.0,1.0,0.0) );\n        \n        // determine flow direction\n        vec2 flow = vec2(0.8,0.3);\n        flow.x *= - 1.0;\n        \n        // sample normal maps (distort uvs with flowdata)\n        vec4 normalColor0 = texture2D( tNormalMap0, ( vUv * scale ) + flow * flowMapOffset0 );\n        vec4 normalColor1 = texture2D( tNormalMap1, ( vUv * scale ) + flow * flowMapOffset1 );\n        \n        // linear interpolate to get the final normal color\n        float flowLerp = abs( halfCycle - flowMapOffset0 ) / halfCycle;\n        vec4 normalColor = mix( normalColor0, normalColor1, flowLerp );\n        \n        // calculate normal vector\n        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );\n        \n        // calculate the fresnel term to blend reflection and refraction maps\n        float theta = max( dot( toEye, my_normal ), 0.0 );\n        float reflectance = 1.0 + ( 1.0 - 1.0 ) * pow( ( 1.0 - theta ), 5.0 );\n        \n        // calculate final uv coords\n        vec3 coord = my_vUv.xyz / my_vUv.w;\n        vec2 uv = coord.xy + coord.z * my_normal.xz * 0.05;\n        \n        vec4 myTexelRoughness = texture2D( roughnessMap, vUv );\n        vec4 baseWater = texture2D( tDiffuse, uv);\n        vec4 base = texture2DProj( tDiffuse, my_vUv );\n        vec4 mixedBase = mix(base, baseWater, myTexelRoughness.r > 0.5 ? 0.0 : 1.0);\n        mixedBase *= 1.0 - myTexelRoughness.r;\n        diffuseColor.rgb += reflectorOpacity * mixedBase.rgb;\n      ")}},{key:"flowMapOffset0",get:function(){return this._flowMapOffset0.value},set:function(e){this._flowMapOffset0.value=e}},{key:"flowMapOffset1",get:function(){return this._flowMapOffset1.value},set:function(e){this._flowMapOffset1.value=e}},{key:"tDiffuse",get:function(){return this._tDiffuse.value},set:function(e){this._tDiffuse.value=e}},{key:"tNormalMap0",get:function(){return this._tNormalMap0.value},set:function(e){this._tNormalMap0.value=e}},{key:"tNormalMap1",get:function(){return this._tNormalMap1.value},set:function(e){this._tNormalMap1.value=e}},{key:"textureMatrix",get:function(){return this._textureMatrix.value},set:function(e){this._textureMatrix.value=e}},{key:"reflectorOpacity",get:function(){return this._reflectorOpacity.value},set:function(e){this._reflectorOpacity.value=e}}]),n}(E.MeshPhysicalMaterial),V=function(e){var t=e.savePass,n=e.textureMatrix;return r.a.forwardRef((function(e,r){var o=Object(a.useState)((function(){return new H})),s=Object(c.a)(o,1)[0],i=Object(W.a)(["/BASE.jpg","/AO.jpg","/HEIGHT.png","/NORMAL.jpg","/ROUGHNESS.jpg"]),u=Object(W.a)(["/Water_2.jpg","/Water_2.jpg"]);return Object(a.useEffect)((function(){i.forEach((function(e){e.wrapS=e.wrapT=E.RepeatWrapping,e.repeat.set(1,1)})),u.forEach((function(e){e.wrapS=e.wrapT=E.RepeatWrapping,e.repeat.set(1,1)}))}),[i,u]),Object(S.c)((function(e){var t=e.clock;if(s){var n=t.getDelta();s.flowMapOffset0+=10*n,s.flowMapOffset1=s.flowMapOffset0+.5,s.flowMapOffset0>=1?(s.flowMapOffset0=0,s.flowMapOffset1=.5):s.flowMapOffset1>=1&&(s.flowMapOffset1=s.flowMapOffset1-1)}})),Object(l.jsx)("primitive",Object(M.a)(Object(M.a)({object:s,ref:r,attach:"material"},e),{},{textureMatrix:n,tDiffuse:t.renderTarget.texture,side:E.DoubleSide,map:i[0],aoMap:i[1],myMap:i[2],displacementMap:i[2],displacementScale:.5,normalMap:i[3],normalScale:[.7,.7],roughnessMap:i[4],tNormalMap0:u[0],tNormalMap1:u[1]}))}))};var G=n(38);var K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=Object(S.f)(),n=t.gl,r=t.size,o=t.scene,s=t.camera,l=Object(S.e)(B.m),u=Object(a.useMemo)((function(){var t=new B.f(n,{frameBufferType:E.HalfFloatType,multisampling:0}),a=new B.k(o,s),r=new B.c({offset:new E.Vector2(.001,.001)}),c=new B.b({luminanceSmoothing:.3,intensity:.5}),u=new B.i({blendFunction:B.a.COLOR_DODGE});u.blendMode.opacity.value=.03;var f=Object(G.a)(B.l,Object(i.a)(l));f.edgeDetectionMaterial.setEdgeDetectionThreshold(.05),f.edgeDetectionMaterial.setPredicationMode(B.j.DEPTH),f.edgeDetectionMaterial.setPredicationThreshold(.002),f.edgeDetectionMaterial.setPredicationScale(1);var m=new B.o({blendFunction:B.a.SKIP,texture:f.renderTargetEdges.texture}),j=new B.o({blendFunction:B.a.SKIP,texture:f.renderTargetWeights.texture}),d=new B.g(s,f,m,j,c,u),p=new B.g(s,r);return e.forEach((function(e){return t.addPass(e)})),t.addPass(a),t.addPass(d),t.addPass(p),[t]}),[n,o,s,e,l]),f=Object(c.a)(u,1),m=f[0];Object(a.useEffect)((function(){m.setSize(r.width,r.height)}),[m,r]),Object(S.c)((function(e,t){m.render(t)}),-1)},J=n(23),Y=n(161),q=n(92);function Q(e){var t=e.pose,n=Object(J.a)(e,["pose"]),r=Object(C.a)("/stacy.glb"),o=r.scene,s=r.animations,i=Object(a.useMemo)((function(){return q.a.clone(o)}),[o]),u=Object(S.d)(i).nodes,f=Object(W.a)("/NORMAL.jpg"),m=Object(Y.a)(s),j=m.ref,d=m.actions,p=m.names,b=Object(a.useState)(!1),h=Object(c.a)(b,2),O=h[0],x=h[1],g=Object(a.useState)(t),v=Object(c.a)(g,2),w=v[0],y=v[1];return Object(a.useEffect)((function(){document.body.style.cursor=O?"pointer":"auto"}),[O]),Object(a.useEffect)((function(){return d[p[w]]&&d[p[w]].reset().fadeIn(.5).play(),function(){return d[p[w]].fadeOut(.5)}}),[w,d,p]),Object(l.jsx)("group",Object(M.a)(Object(M.a)({ref:j},n),{},{dispose:null,children:Object(l.jsxs)("group",{onPointerOver:function(){return x(!0)},onPointerOut:function(){return x(!1)},onClick:function(){return y((w+1)%p.length)},rotation:[Math.PI/2,0,0],scale:[.05,.05,.05],children:[Object(l.jsx)("primitive",{object:u.mixamorigHips}),Object(l.jsx)("skinnedMesh",{castShadow:!0,receiveShadow:!0,geometry:u.stacy.geometry,skeleton:u.stacy.skeleton,rotation:[-Math.PI/2,0,0],scale:[100,100,100],children:Object(l.jsx)("meshStandardMaterial",{map:f,"map-flipY":!1,skinning:!0})})]})}))}n(93);function Z(e){var t=Object(a.useState)(!1),n=Object(c.a)(t,2);n[0],n[1],Object(a.useRef)();return Object(a.useEffect)((function(){})),Object(l.jsx)("div",{className:"container",style:{position:"fixed",top:"0",left:"0",zIndex:"99999",pointerEvents:"auto",width:"250px",height:"180px",display:"flex",flexDirection:"column"},children:Object(l.jsx)("img",{style:{height:"100%",objectFit:"contain"},id:"logo",src:"https://res.cloudinary.com/www-houseofkilling-com/image/upload/v1623355136/contentRedistribution/logo_y5vsqo.png",alt:"HRWAILL_icon"})})}function X(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function $(e){var t=e.imageUrls,n=(e.material,Object(a.useRef)());return t.map((function(e,t){return Object(l.jsxs)("mesh",{ref:n,position:[X(-50,50),Math.floor(10*Math.random()),X(-50,50)],castShadow:!0,receiveShadow:!0,children:[Object(l.jsx)("boxBufferGeometry",{attach:"geometry",args:[5,5,5],color:"white"}),Object(l.jsx)(a.Suspense,{fallback:null,children:Object(l.jsx)(ee,{imageUrl:e})})]},t)}))}Object(F.a)();var ee=function(e){var t=Object(S.e)(E.TextureLoader,e.imageUrl);return Object(l.jsx)("meshStandardMaterial",{attach:"material",roughness:1,color:"white",map:t,side:E.DoubleSide})};function te(){var e=Object(a.useRef)(),t=Object(a.useRef)();return Object(S.c)((function(n){var a=.5*n.clock.getElapsedTime();e.current&&t.current&&(e.current.position.x=50*Math.sin(a),t.current.position.x=50*Math.sin(a),e.current.position.z=50*Math.cos(a),t.current.position.z=50*Math.sin(a),t.current.position.y=50*Math.sin(a))})),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("spotLight",{ref:e,position:[20,20,10],intensity:3,castShadow:!0,color:"#00e9ff",angle:Math.PI/3,penumbra:1,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),Object(l.jsx)("spotLight",{ref:t,position:[20,20,10],intensity:.2,castShadow:!0,color:"#e1ff00",angle:Math.PI/3,penumbra:1,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024})]})}function ne(){var e=Object(a.useState)((function(){var e=document.getElementById("video").getElementsByTagName("video")[0];return e.crossOrigin="Anonymous",e})),t=Object(c.a)(e,1)[0],n=Object(S.f)().camera,r=Object(a.useRef)();return console.log("opens stream boxes"),Object(S.c)((function(e){e.clock;r.current&&(r.current.position.set(n.position.x,n.position.y,n.position.z),r.current.rotation.y+=.008)})),Object(l.jsxs)("group",{ref:r,position:[n.position.x,n.position.y,n.position.z],children:[Object(l.jsxs)("mesh",{position:[0,3,33],children:[Object(l.jsx)("boxBufferGeometry",{args:[10,9,.1],rotation:[Math.PI/2,Math.PI/2,Math.PI/2]}),Object(l.jsx)("meshBasicMaterial",{children:Object(l.jsx)("videoTexture",{attach:"map",args:[t]})})]}),Object(l.jsxs)("mesh",{position:[20,7,0],children:[Object(l.jsx)("boxBufferGeometry",{args:[.1,5,6],rotation:[Math.PI/2,0,0]}),Object(l.jsx)("meshBasicMaterial",{children:Object(l.jsx)("videoTexture",{attach:"map",args:[t]})})]}),Object(l.jsxs)("mesh",{position:[-10,15,-5],children:[Object(l.jsx)("boxBufferGeometry",{args:[7,.1,6],rotation:[Math.PI/2,0,0]}),Object(l.jsx)("meshBasicMaterial",{children:Object(l.jsx)("videoTexture",{attach:"map",args:[t]})})]})]})}function ae(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:512,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:512,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=Object(a.useRef)(),o=Object(a.useState)((function(){return new E.Plane})),s=Object(c.a)(o,1)[0],i=Object(a.useState)((function(){return new E.Vector3})),l=Object(c.a)(i,1)[0],u=Object(a.useState)((function(){return new E.Vector3})),f=Object(c.a)(u,1)[0],m=Object(a.useState)((function(){return new E.Vector3})),j=Object(c.a)(m,1)[0],d=Object(a.useState)((function(){return new E.Matrix4})),p=Object(c.a)(d,1)[0],b=Object(a.useState)((function(){return new E.Vector3(0,0,-1)})),h=Object(c.a)(b,1)[0],O=Object(a.useState)((function(){return new E.Vector4})),x=Object(c.a)(O,1)[0],g=Object(a.useState)((function(){return new E.Vector3})),v=Object(c.a)(g,1)[0],w=Object(a.useState)((function(){return new E.Vector3})),y=Object(c.a)(w,1)[0],M=Object(a.useState)((function(){return new E.Vector4})),I=Object(c.a)(M,1)[0],k=Object(a.useState)((function(){return new E.Matrix4})),P=Object(c.a)(k,1)[0],_=Object(a.useState)((function(){return new E.PerspectiveCamera})),A=Object(c.a)(_,1)[0],R=Object(S.f)(),D=R.gl,N=R.scene,z=R.camera,L=Object(a.useCallback)((function(){if(r.current&&(r.current.visible=!1,f.setFromMatrixPosition(r.current.matrixWorld),j.setFromMatrixPosition(z.matrixWorld),p.extractRotation(r.current.matrixWorld),l.set(0,0,1),l.applyMatrix4(p),v.subVectors(f,j),!(v.dot(l)>0))){v.reflect(l).negate(),v.add(f),p.extractRotation(z.matrixWorld),h.set(0,0,-1),h.applyMatrix4(p),h.add(j),y.subVectors(f,h),y.reflect(l).negate(),y.add(f),A.position.copy(v),A.up.set(0,1,0),A.up.applyMatrix4(p),A.up.reflect(l),A.lookAt(y),A.far=z.far,A.updateMatrixWorld(),A.projectionMatrix.copy(z.projectionMatrix),P.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),P.multiply(A.projectionMatrix),P.multiply(A.matrixWorldInverse),P.multiply(r.current.matrixWorld),s.setFromNormalAndCoplanarPoint(l,f),s.applyMatrix4(A.matrixWorldInverse),x.set(s.normal.x,s.normal.y,s.normal.z,s.constant);var e=A.projectionMatrix;I.x=(Math.sign(x.x)+e.elements[8])/e.elements[0],I.y=(Math.sign(x.y)+e.elements[9])/e.elements[5],I.z=-1,I.w=(1+e.elements[10])/e.elements[14],x.multiplyScalar(2/x.dot(I)),e.elements[2]=x.x,e.elements[6]=x.y,e.elements[10]=x.z+1-n,e.elements[14]=x.w}}),[n,r,z,s,l,f,j,p,h,x,v,y,I,P,A]);function F(){r.current&&(r.current.visible=!0)}var C=Object(a.useMemo)((function(){var n={minFilter:E.LinearFilter,magFilter:E.LinearFilter,format:E.RGBFormat},a=new E.WebGLRenderTarget(e,t,n);a.texture.encoding=D.outputEncoding,E.MathUtils.isPowerOfTwo(e)&&E.MathUtils.isPowerOfTwo(t)||(a.texture.generateMipmaps=!1);var r=new B.k(N,A),o=new B.e(N,A),s=new B.d(A,{focusDistance:.3,focalLength:.6,bokehScale:3}),c=new B.g(A,s);return c.setDepthTexture(o.texture,E.RGBADepthPacking),{renderPass:r,savePass:new B.n(a),lambdaPassBefore:new B.h(L),lambdaPassAfter:new B.h(F),blurPass:c,depthPass:o}}),[e,t,L,A,N,D.outputEncoding]),U=C.renderPass,T=C.savePass,W=C.depthPass,H=C.blurPass,G=C.lambdaPassBefore,K=C.lambdaPassAfter,J=Object(a.useMemo)((function(){return V({savePass:T,textureMatrix:P})}),[T,P]);return[r,J,[G,U,W,H,T,K]]}(),t=Object(c.a)(e,3),n=t[0],r=t[1],o=t[2];return K(o),Object(l.jsx)("group",{"position-z":-5,children:Object(l.jsxs)("mesh",{receiveShadow:!0,ref:n,"rotation-x":-Math.PI/2,"position-y":-3.001,children:[Object(l.jsx)("planeBufferGeometry",{receiveShadow:!0,attach:"geometry",args:[300,300]}),Object(l.jsx)(r,{metalness:.8,roughness:.3,clearcoat:.5,reflectorOpacity:.3,args:[300,300]})]})})}function re(e){var t=e.url,n=Object(a.useRef)(),r=Object(S.f)().camera,o=Object(a.useState)((function(){return new E.AudioListener})),s=Object(c.a)(o,1)[0],i=Object(S.e)(E.AudioLoader,t);return Object(a.useEffect)((function(){return n.current.setBuffer(i),n.current.setRefDistance(1),n.current.setLoop(!0),n.current.play(),r.add(s),function(){return r.remove(s)}})),Object(l.jsx)("positionalAudio",{ref:n,args:[s]})}function oe(e){var t=Object(a.useRef)();return Object(S.c)((function(e){var n=.5*e.clock.getElapsedTime();t.current&&t.current.children.forEach((function(e){e.rotation.x=.05*Math.sin(n),e.rotation.y=.05*Math.sin(n),e.rotation.z=.05*Math.sin(n)}))})),Object(l.jsx)("group",{"position-z":-5,children:Object(l.jsx)("group",{ref:t,children:Object(l.jsx)($,{imageUrls:e.props})})})}var se=function(){var e=Object(C.a)("slum_house/scene.gltf"),t=Object(a.useRef)();return Object(a.useEffect)((function(){if(e){var t=e.scene;t.scale.set(7,7,7),t.traverse((function(e){e instanceof E.Mesh&&(e.castShadow=!0,e.receiveShadow=!0,e.geometry.computeVertexNormals())}))}}),[e]),e?Object(l.jsxs)("group",{position:[70,-2.3,70],children:[Object(l.jsx)("primitive",{ref:t,object:e.scene}),Object(l.jsx)(Q,{pose:1,position:[0,0,0]})]}):null},ce=function(e){Object(w.a)(n,e);var t=Object(y.a)(n);function n(e){var a;return Object(g.a)(this,n),(a=t.call(this,e)).callbackFunction=function(){a.setState({hasStream:!0}),console.log("sets stream to true")},a.state={imageUrls:a.props.imageUrls,hasStream:a.props.hasStream},a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){console.log("canvas did mount",this.props.imageUrls.length)}},{key:"componentDidUpdate",value:function(){console.log("canvas did update",this.props.imageUrls.length)}},{key:"shouldComponentUpdate",value:function(e,t){return this.props.imageUrls.length!==e.imageUrls.length||this.props.loggedIn!==e.loggedIn||this.state.hasStream!==t.hasStream}},{key:"render",value:function(){return Object(l.jsxs)(l.Fragment,{children:[this.props.loggedIn&&Object(l.jsx)(Z,{callbackFunction:this.callbackFunction}),Object(l.jsxs)(S.a,{id:"canvas",colorManagement:!0,shadowMap:!0,camera:{position:[0,0,10],far:170,near:.1,fov:100},resize:{debounce:{scroll:0,resize:0}},invalidateFrameloop:!0,gl:{powerPreference:"high-performance",antialias:!1,alpha:!1},style:{background:"black",position:"fixed",top:"0",bottom:"0",right:"0",left:"0",zIndex:"0"},children:[Object(l.jsx)(ae,{}),Object(l.jsx)(oe,{props:this.state.imageUrls}),Object(l.jsx)("ambientLight",{intensity:.3}),Object(l.jsx)(a.Suspense,{fallback:null,children:Object(l.jsx)(re,{url:"https://res.cloudinary.com/www-houseofkilling-com/video/upload/v1620900008/sounds/AliveForever_clhtnw.mp3"})}),Object(l.jsx)(U.a,{files:"collage.hdr",background:!0}),Object(l.jsx)(L,{count:500,position:[0,0,0]}),Object(l.jsx)(L,{count:500,position:[-50,0,0]}),Object(l.jsx)(L,{count:500,position:[-50,0,20]}),Object(l.jsx)(I.a,{gravity:[0,0,0],children:Object(l.jsx)(N,{})}),Object(l.jsxs)("mesh",{position:[0,0,40],rotation:[0,0,Math.PI/3],castShadow:!0,receiveShadow:!0,children:[Object(l.jsx)("boxBufferGeometry",{attach:"geometry",args:[40,40,40],color:"white"}),Object(l.jsx)(ee,{imageUrl:"https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_315/v1624263178/textures/Artboard_20_rasqma.png"})]}),Object(l.jsxs)("mesh",{position:[-90,0,40],rotation:[0,Math.PI/2,Math.PI/3],castShadow:!0,receiveShadow:!0,children:[Object(l.jsx)("boxBufferGeometry",{attach:"geometry",args:[45,45,45],color:"white"}),Object(l.jsx)(ee,{imageUrl:"https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_361/v1624263162/textures/Artboard_4_oc8m0v.png"})]}),Object(l.jsxs)("mesh",{position:[130,20,140],rotation:[Math.PI/2,Math.PI/2,Math.PI/3],castShadow:!0,receiveShadow:!0,children:[Object(l.jsx)("boxBufferGeometry",{attach:"geometry",args:[100,100,100],color:"white"}),Object(l.jsx)(ee,{imageUrl:"https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_338/v1624263172/textures/Artboard_13_sifhhu.png"})]}),Object(l.jsxs)("mesh",{position:[-120,20,-120],rotation:[Math.PI/2,Math.PI/2,Math.PI/3],castShadow:!0,receiveShadow:!0,children:[Object(l.jsx)("boxBufferGeometry",{attach:"geometry",args:[100,100,100],color:"white"}),Object(l.jsx)(ee,{imageUrl:"https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_372/v1624263715/textures/Artboard_5explosion_rpkdlq.png"})]}),Object(l.jsxs)("mesh",{position:[0,60,-90],rotation:[1,Math.PI/2,Math.PI/3],castShadow:!0,receiveShadow:!0,children:[Object(l.jsx)("boxBufferGeometry",{attach:"geometry",args:[100,100,100],color:"white"}),Object(l.jsx)(ee,{imageUrl:"https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_383/v1624263172/textures/Artboard_9_zq7vvq.png"})]}),Object(l.jsx)(te,{}),Object(l.jsx)(se,{}),this.state.hasStream&&Object(l.jsx)(ne,{})]}),Object(l.jsx)(T.a,{dataInterpolation:function(e){return"waking up ".concat(e.toFixed(5),"%")}})]})}}]),n}(r.a.Component),ie=n(98);function le(e){var t=Object(a.useState)("Drag 'n' drop some files here, \nor click to select files"),n=Object(c.a)(t,2),r=n[0],o=n[1],s=Object(a.useState)(!1),i=Object(c.a)(s,2),u=i[0],f=i[1],m=Object(a.useState)("dropzone-basic"),j=Object(c.a)(m,2),d=j[0],p=j[1],b=Object(a.useCallback)((function(t){if(t[0]){var n=new FileReader;console.log("accptedfile",t[0].previewElement),n.readAsDataURL(t[0]),n.onloadstart=function(){o("loading file:"),f(!0),p("dropzone-loading")},n.onloadend=function(){n.error?o("that didnt go according to plan"):(e.uploadImage(n.result),setTimeout((function(){o("thank you for your expression. \nI love it \nYou and everyone else can find it here in the archive now."),f(!1),p("dropzone-succes"),setTimeout((function(){o("Drag 'n' drop some files here, \nor click to select files"),f(!1),p("dropzone-basic")}),3e3)}),2e3))}}}),[e]);return Object(l.jsxs)("div",{style:{position:"absolute",bottom:"0",left:"0",zIndex:"99999999999",height:"150px",width:"250px"},className:"container ".concat(d),children:[Object(l.jsx)("p",{style:{position:"absolute",bottom:"105%",fontSize:"15px"},children:"Feed me expressions plz"}),Object(l.jsx)(ie.a,{onDrop:b,accept:"image/*",minSize:1024,maxSize:3072e3,addRemoveLinks:!0,className:"container",previewsContainer:"dropzone-previews",children:function(e){var t=e.getRootProps,n=e.getInputProps;return Object(l.jsxs)("div",Object(M.a)(Object(M.a)({},t({className:"dropzone"})),{},{style:{width:"100%",height:"100%"},children:[Object(l.jsx)("input",Object(M.a)({},n())),u?Object(l.jsx)("p",{children:"is loading"}):Object(l.jsx)("p",{style:{color:"inherit",whiteSpace:"pre-wrap"},children:r})]}))}}),Object(l.jsx)("div",{className:"dropzone-previews"})]})}var ue=function(e){Object(w.a)(n,e);var t=Object(y.a)(n);function n(e){var a;return Object(g.a)(this,n),(a=t.call(this,e)).loadImages=Object(x.a)(O.a.mark((function e(){var t,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/getallimages");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,a.setState({imageUrls:n.images}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("this is the output error",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])}))),a.handleFileInputChange=function(e){var t=e.target.files[0];console.log(t),a.previewFile(t)},a.uploadImage=function(){var e=Object(x.a)(O.a.mark((function e(t){var n,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/upload",{method:"POST",body:JSON.stringify({data:t}),headers:{"Content-type":"application/json"}});case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,console.log("succesful upload",r),a.setState({hasNewImage:!0,previewSource:""}),a.props.socket.emit("uploadImage",{data:r},(function(e){})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),a.state={imageUrls:[],hasNewImage:!0,previewSource:"",hasBroadcast:!1},a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.loadImages(),this.setState({hasNewImage:!1}),this.props.socket.on("message",(function(t){t.newImage&&(e.state.imageUrls.includes(t.newImage)||e.setState({imageUrls:[].concat(Object(i.a)(e.state.imageUrls),[t.newImage])})),t.broadcast&&(console.log("has broadcast",t),e.setState({hasBroadcast:!0}))}))}},{key:"render",value:function(){return Object(l.jsxs)(l.Fragment,{children:[this.state.imageUrls.length>1?Object(l.jsx)(a.Suspense,{fallback:null,children:Object(l.jsx)(ce,{imageUrls:this.state.imageUrls,loggedIn:this.props.loggedIn,hasBroadcast:this.state.hasBroadcast})}):null,this.props.loggedIn&&Object(l.jsx)(l.Fragment,{children:Object(l.jsx)(le,{uploadImage:this.uploadImage})})]})}}]),n}(r.a.Component),fe=(n(128),n(96)),me=n(21),je=n(95),de=n.n(je)()("https://stayvirtual-chat-backend.herokuapp.com/"),pe=function(){var e=Object(a.useState)(),t=Object(c.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(),s=Object(c.a)(o,2),i=s[0],u=s[1],f=Object(a.useState)(),m=Object(c.a)(f,2),j=m[0],d=m[1],p=Object(a.useRef)();return Object(l.jsx)(fe.a,{children:Object(l.jsxs)(me.a,{path:"/",exact:!0,children:[i?null:Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("div",{className:"outer-container",style:{zIndex:"1"},children:[Object(l.jsx)("img",{style:{height:"200px",objectFit:"contain"},id:"logo",src:"https://res.cloudinary.com/www-houseofkilling-com/image/upload/v1623355136/contentRedistribution/logo_y5vsqo.png",alt:"HRWAILL_icon"}),Object(l.jsx)("p",{style:{whiteSpace:"pre-wrap",fontSize:"12px",textAlign:"center"},children:"www.stayvirtual.online** softly introduces  \n THE HRWAILL ARCHIVE of Human Expression* Your semi-sentient 3D dataset \ncreated by Esben Holk @ HOUSE OF KILLING  \n with music by Sophie Harkins and Font by Jules Durand \n\nEnter with your name to share your jpgs with HRWAILL   "}),Object(l.jsx)("div",{className:"container",children:Object(l.jsx)("input",{placeholder:"Name",className:"input",type:"text",ref:p})}),Object(l.jsx)("button",{onClick:function(e){r(p.current.value),function(e){var t=e;u(!0),de.emit("join",{name:t},(function(e){e&&(alert(e),u(!1))})),de.on("me",(function(e){d(e)}))}(p.current.value)},className:"sendButton",type:"submit",children:"Sign In"})]}),Object(l.jsxs)("p",{children:["* a generative encyclopedia of images as expressions. ",Object(l.jsx)("br",{}),"** an open source landscape ",Object(l.jsx)("br",{})," + live chat ",Object(l.jsx)("br",{}),"created by Esben Holk @"," ",Object(l.jsx)("a",{href:"http://beta.houseofkilling.com/",children:" HOUSE OF KILLING"}),Object(l.jsx)("br",{}),"with music by Sophie Harkins and Font by"," ",Object(l.jsx)("a",{href:"https://www.julesdurand.xyz/",children:"Jules Durand"})]})]}),Object(l.jsxs)(a.Suspense,{fallback:null,children:[Object(l.jsx)(ue,{socket:de,loggedIn:i,name:n,myID:j}),Object(l.jsx)(b,{socket:de,loggedIn:i,name:n,myID:j})]})]})})};s.a.render(Object(l.jsx)(pe,{}),document.getElementById("root"))}},[[159,1,2]]]);
//# sourceMappingURL=main.7ede1a95.chunk.js.map