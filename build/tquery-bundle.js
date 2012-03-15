// tquery.js - https://github.com/jeromeetienne/tquery - MIT License
// Three.js r47 - http://github.com/mrdoob/three.js
'use strict';var THREE=THREE||{};if(!self.Int32Array)self.Int32Array=Array,self.Float32Array=Array;
(function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"RequestCancelAnimationFrame"];if(!window.requestAnimationFrame)window.requestAnimationFrame=function(b){var c=(new Date).getTime(),f=Math.max(0,16-(c-a)),g=window.setTimeout(function(){b(c+f)},f);a=c+f;return g};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=
function(a){clearTimeout(a)}})();THREE.Clock=function(a){this.autoStart=void 0!==a?a:!0;this.elapsedTime=this.oldTime=this.startTime=0;this.running=!1};THREE.Clock.prototype.start=function(){this.oldTime=this.startTime=Date.now();this.running=!0};THREE.Clock.prototype.stop=function(){this.getElapsedTime();this.running=!1};THREE.Clock.prototype.getElapsedTime=function(){return this.elapsedTime+=this.getDelta()};
THREE.Clock.prototype.getDelta=function(){var a=0;this.autoStart&&!this.running&&this.start();if(this.running){var b=Date.now(),a=0.001*(b-this.oldTime);this.oldTime=b;this.elapsedTime+=a}return a};THREE.Color=function(a){void 0!==a&&this.setHex(a);return this};
THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,copy:function(a){this.r=a.r;this.g=a.g;this.b=a.b;return this},copyGammaToLinear:function(a){this.r=a.r*a.r;this.g=a.g*a.g;this.b=a.b*a.b;return this},copyLinearToGamma:function(a){this.r=Math.sqrt(a.r);this.g=Math.sqrt(a.g);this.b=Math.sqrt(a.b);return this},convertGammaToLinear:function(){var a=this.r,b=this.g,c=this.b;this.r=a*a;this.g=b*b;this.b=c*c;return this},convertLinearToGamma:function(){this.r=Math.sqrt(this.r);this.g=Math.sqrt(this.g);
this.b=Math.sqrt(this.b);return this},setRGB:function(a,b,c){this.r=a;this.g=b;this.b=c;return this},setHSV:function(a,b,c){var d,e,f;if(0===c)this.r=this.g=this.b=0;else switch(d=Math.floor(6*a),e=6*a-d,a=c*(1-b),f=c*(1-b*e),b=c*(1-b*(1-e)),d){case 1:this.r=f;this.g=c;this.b=a;break;case 2:this.r=a;this.g=c;this.b=b;break;case 3:this.r=a;this.g=f;this.b=c;break;case 4:this.r=b;this.g=a;this.b=c;break;case 5:this.r=c;this.g=a;this.b=f;break;case 6:case 0:this.r=c,this.g=b,this.b=a}return this},setHex:function(a){a=
Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;this.b=(a&255)/255;return this},getHex:function(){return Math.floor(255*this.r)<<16^Math.floor(255*this.g)<<8^Math.floor(255*this.b)},getContextStyle:function(){return"rgb("+Math.floor(255*this.r)+","+Math.floor(255*this.g)+","+Math.floor(255*this.b)+")"},clone:function(){return(new THREE.Color).setRGB(this.r,this.g,this.b)}};THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0};
THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(a,b){this.x=a;this.y=b;return this},copy:function(a){this.x=a.x;this.y=a.y;return this},clone:function(){return new THREE.Vector2(this.x,this.y)},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;return this},
divideScalar:function(a){a?(this.x/=a,this.y/=a):this.set(0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,a=this.y-a.y;return b*b+a*a},setLength:function(a){return this.normalize().multiplyScalar(a)},
equals:function(a){return a.x===this.x&&a.y===this.y}};THREE.Vector3=function(a,b,c){this.x=a||0;this.y=b||0;this.z=c||0};
THREE.Vector3.prototype={constructor:THREE.Vector3,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},
addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;return this},multiply:function(a,b){this.x=a.x*b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},multiplySelf:function(a){this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},divideSelf:function(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;return this},
divideScalar:function(a){a?(this.x/=a,this.y/=a,this.z/=a):this.z=this.y=this.x=0;return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.lengthSq())},lengthManhattan:function(){return this.x+this.y+this.z},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){return this.normalize().multiplyScalar(a)},
cross:function(a,b){this.x=a.y*b.z-a.z*b.y;this.y=a.z*b.x-a.x*b.z;this.z=a.x*b.y-a.y*b.x;return this},crossSelf:function(a){var b=this.x,c=this.y,d=this.z;this.x=c*a.z-d*a.y;this.y=d*a.x-b*a.z;this.z=b*a.y-c*a.x;return this},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){return(new THREE.Vector3).sub(this,a).lengthSq()},setPositionFromMatrix:function(a){this.x=a.n14;this.y=a.n24;this.z=a.n34},setRotationFromMatrix:function(a){var b=Math.cos(this.y);
this.y=Math.asin(a.n13);1.0E-5<Math.abs(b)?(this.x=Math.atan2(-a.n23/b,a.n33/b),this.z=Math.atan2(-a.n12/b,a.n11/b)):(this.x=0,this.z=Math.atan2(a.n21,a.n22))},isZero:function(){return 1.0E-4>this.lengthSq()}};THREE.Vector4=function(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=void 0!==d?d:1};
THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=void 0!==a.w?a.w:1},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;this.w=a.w+b.w;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-
b.z;this.w=a.w-b.w;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;this.w*=a;return this},divideScalar:function(a){a?(this.x/=a,this.y/=a,this.z/=a,this.w/=a):(this.z=this.y=this.x=0,this.w=1);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.dot(this)},length:function(){return Math.sqrt(this.lengthSq())},
normalize:function(){return this.divideScalar(this.length())},setLength:function(a){return this.normalize().multiplyScalar(a)},lerpSelf:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;this.w+=(a.w-this.w)*b;return this}};THREE.Frustum=function(){this.planes=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4]};
THREE.Frustum.prototype.setFromMatrix=function(a){var b,c=this.planes;c[0].set(a.n41-a.n11,a.n42-a.n12,a.n43-a.n13,a.n44-a.n14);c[1].set(a.n41+a.n11,a.n42+a.n12,a.n43+a.n13,a.n44+a.n14);c[2].set(a.n41+a.n21,a.n42+a.n22,a.n43+a.n23,a.n44+a.n24);c[3].set(a.n41-a.n21,a.n42-a.n22,a.n43-a.n23,a.n44-a.n24);c[4].set(a.n41-a.n31,a.n42-a.n32,a.n43-a.n33,a.n44-a.n34);c[5].set(a.n41+a.n31,a.n42+a.n32,a.n43+a.n33,a.n44+a.n34);for(a=0;6>a;a++)b=c[a],b.divideScalar(Math.sqrt(b.x*b.x+b.y*b.y+b.z*b.z))};
THREE.Frustum.prototype.contains=function(a){for(var b=this.planes,c=a.matrixWorld,d=THREE.Frustum.__v1.set(c.getColumnX().length(),c.getColumnY().length(),c.getColumnZ().length()),d=-a.geometry.boundingSphere.radius*Math.max(d.x,Math.max(d.y,d.z)),e=0;6>e;e++)if(a=b[e].x*c.n14+b[e].y*c.n24+b[e].z*c.n34+b[e].w,a<=d)return!1;return!0};THREE.Frustum.__v1=new THREE.Vector3;
THREE.Ray=function(a,b){function c(a,b,c){o.sub(c,a);r=o.dot(b);s=p.add(a,m.copy(b).multiplyScalar(r));return t=c.distanceTo(s)}function d(a,b,c,d){o.sub(d,b);p.sub(c,b);m.sub(a,b);u=o.dot(o);v=o.dot(p);x=o.dot(m);B=p.dot(p);D=p.dot(m);C=1/(u*B-v*v);A=(B*x-v*D)*C;H=(u*D-v*x)*C;return 0<=A&&0<=H&&1>A+H}this.origin=a||new THREE.Vector3;this.direction=b||new THREE.Vector3;this.intersectScene=function(a){return this.intersectObjects(a.children)};this.intersectObjects=function(a){var b,c,d=[];for(b=0,
c=a.length;b<c;b++)Array.prototype.push.apply(d,this.intersectObject(a[b]));d.sort(function(a,b){return a.distance-b.distance});return d};var e=new THREE.Vector3,f=new THREE.Vector3,g=new THREE.Vector3,h=new THREE.Vector3,i=new THREE.Vector3,l=new THREE.Vector3,k=new THREE.Vector3,n=new THREE.Vector3,q=new THREE.Vector3;this.intersectObject=function(a){for(var b,m=[],o=0,p=a.children.length;o<p;o++)Array.prototype.push.apply(m,this.intersectObject(a.children[o]));if(a instanceof THREE.Particle){o=
c(this.origin,this.direction,a.matrixWorld.getPosition());if(o>a.scale.x)return[];b={distance:o,point:a.position,face:null,object:a};m.push(b)}else if(a instanceof THREE.Mesh){o=c(this.origin,this.direction,a.matrixWorld.getPosition());p=THREE.Frustum.__v1.set(a.matrixWorld.getColumnX().length(),a.matrixWorld.getColumnY().length(),a.matrixWorld.getColumnZ().length());if(o>a.geometry.boundingSphere.radius*Math.max(p.x,Math.max(p.y,p.z)))return m;var r,s,j=a.geometry,t=j.vertices,y;a.matrixRotationWorld.extractRotation(a.matrixWorld);
for(o=0,p=j.faces.length;o<p;o++)if(b=j.faces[o],i.copy(this.origin),l.copy(this.direction),y=a.matrixWorld,k=y.multiplyVector3(k.copy(b.centroid)).subSelf(i),n=a.matrixRotationWorld.multiplyVector3(n.copy(b.normal)),r=l.dot(n),!(1.0E-4>Math.abs(r))&&(s=n.dot(k)/r,!(0>s)&&(a.doubleSided||(a.flipSided?0<r:0>r))))if(q.add(i,l.multiplyScalar(s)),b instanceof THREE.Face3)e=y.multiplyVector3(e.copy(t[b.a].position)),f=y.multiplyVector3(f.copy(t[b.b].position)),g=y.multiplyVector3(g.copy(t[b.c].position)),
d(q,e,f,g)&&(b={distance:i.distanceTo(q),point:q.clone(),face:b,object:a},m.push(b));else if(b instanceof THREE.Face4&&(e=y.multiplyVector3(e.copy(t[b.a].position)),f=y.multiplyVector3(f.copy(t[b.b].position)),g=y.multiplyVector3(g.copy(t[b.c].position)),h=y.multiplyVector3(h.copy(t[b.d].position)),d(q,e,f,h)||d(q,f,g,h)))b={distance:i.distanceTo(q),point:q.clone(),face:b,object:a},m.push(b)}return m};var o=new THREE.Vector3,p=new THREE.Vector3,m=new THREE.Vector3,r,s,t,u,v,x,B,D,C,A,H};
THREE.Rectangle=function(){function a(){f=d-b;g=e-c}var b,c,d,e,f,g,h=!0;this.getX=function(){return b};this.getY=function(){return c};this.getWidth=function(){return f};this.getHeight=function(){return g};this.getLeft=function(){return b};this.getTop=function(){return c};this.getRight=function(){return d};this.getBottom=function(){return e};this.set=function(f,g,k,n){h=!1;b=f;c=g;d=k;e=n;a()};this.addPoint=function(f,g){h?(h=!1,b=f,c=g,d=f,e=g):(b=b<f?b:f,c=c<g?c:g,d=d>f?d:f,e=e>g?e:g);a()};this.add3Points=
function(f,g,k,n,q,o){h?(h=!1,b=f<k?f<q?f:q:k<q?k:q,c=g<n?g<o?g:o:n<o?n:o,d=f>k?f>q?f:q:k>q?k:q,e=g>n?g>o?g:o:n>o?n:o):(b=f<k?f<q?f<b?f:b:q<b?q:b:k<q?k<b?k:b:q<b?q:b,c=g<n?g<o?g<c?g:c:o<c?o:c:n<o?n<c?n:c:o<c?o:c,d=f>k?f>q?f>d?f:d:q>d?q:d:k>q?k>d?k:d:q>d?q:d,e=g>n?g>o?g>e?g:e:o>e?o:e:n>o?n>e?n:e:o>e?o:e);a()};this.addRectangle=function(f){h?(h=!1,b=f.getLeft(),c=f.getTop(),d=f.getRight(),e=f.getBottom()):(b=b<f.getLeft()?b:f.getLeft(),c=c<f.getTop()?c:f.getTop(),d=d>f.getRight()?d:f.getRight(),e=e>
f.getBottom()?e:f.getBottom());a()};this.inflate=function(f){b-=f;c-=f;d+=f;e+=f;a()};this.minSelf=function(f){b=b>f.getLeft()?b:f.getLeft();c=c>f.getTop()?c:f.getTop();d=d<f.getRight()?d:f.getRight();e=e<f.getBottom()?e:f.getBottom();a()};this.intersects=function(a){return d<a.getLeft()||b>a.getRight()||e<a.getTop()||c>a.getBottom()?!1:!0};this.empty=function(){h=!0;e=d=c=b=0;a()};this.isEmpty=function(){return h}};
THREE.Math={clamp:function(a,b,c){return a<b?b:a>c?c:a},clampBottom:function(a,b){return a<b?b:a},mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-b)},random16:function(){return(65280*Math.random()+255*Math.random())/65535},randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},randFloat:function(a,b){return a+Math.random()*(b-a)},randFloatSpread:function(a){return a*(0.5-Math.random())}};THREE.Matrix3=function(){this.m=[]};
THREE.Matrix3.prototype={constructor:THREE.Matrix3,transpose:function(){var a,b=this.m;a=b[1];b[1]=b[3];b[3]=a;a=b[2];b[2]=b[6];b[6]=a;a=b[5];b[5]=b[7];b[7]=a;return this},transposeIntoArray:function(a){var b=this.m;a[0]=b[0];a[1]=b[3];a[2]=b[6];a[3]=b[1];a[4]=b[4];a[5]=b[7];a[6]=b[2];a[7]=b[5];a[8]=b[8];return this}};
THREE.Matrix4=function(a,b,c,d,e,f,g,h,i,l,k,n,q,o,p,m){this.set(void 0!==a?a:1,b||0,c||0,d||0,e||0,void 0!==f?f:1,g||0,h||0,i||0,l||0,void 0!==k?k:1,n||0,q||0,o||0,p||0,void 0!==m?m:1);this.flat=Array(16);this.m33=new THREE.Matrix3};
THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(a,b,c,d,e,f,g,h,i,l,k,n,q,o,p,m){this.n11=a;this.n12=b;this.n13=c;this.n14=d;this.n21=e;this.n22=f;this.n23=g;this.n24=h;this.n31=i;this.n32=l;this.n33=k;this.n34=n;this.n41=q;this.n42=o;this.n43=p;this.n44=m;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(a){this.set(a.n11,a.n12,a.n13,a.n14,a.n21,a.n22,a.n23,a.n24,a.n31,a.n32,a.n33,a.n34,a.n41,a.n42,a.n43,a.n44);return this},lookAt:function(a,
b,c){var d=THREE.Matrix4.__v1,e=THREE.Matrix4.__v2,f=THREE.Matrix4.__v3;f.sub(a,b).normalize();if(0===f.length())f.z=1;d.cross(c,f).normalize();0===d.length()&&(f.x+=1.0E-4,d.cross(c,f).normalize());e.cross(f,d).normalize();this.n11=d.x;this.n12=e.x;this.n13=f.x;this.n21=d.y;this.n22=e.y;this.n23=f.y;this.n31=d.z;this.n32=e.z;this.n33=f.z;return this},multiply:function(a,b){var c=a.n11,d=a.n12,e=a.n13,f=a.n14,g=a.n21,h=a.n22,i=a.n23,l=a.n24,k=a.n31,n=a.n32,q=a.n33,o=a.n34,p=a.n41,m=a.n42,r=a.n43,
s=a.n44,t=b.n11,u=b.n12,v=b.n13,x=b.n14,B=b.n21,D=b.n22,C=b.n23,A=b.n24,H=b.n31,I=b.n32,N=b.n33,$=b.n34,K=b.n41,Q=b.n42,L=b.n43,G=b.n44;this.n11=c*t+d*B+e*H+f*K;this.n12=c*u+d*D+e*I+f*Q;this.n13=c*v+d*C+e*N+f*L;this.n14=c*x+d*A+e*$+f*G;this.n21=g*t+h*B+i*H+l*K;this.n22=g*u+h*D+i*I+l*Q;this.n23=g*v+h*C+i*N+l*L;this.n24=g*x+h*A+i*$+l*G;this.n31=k*t+n*B+q*H+o*K;this.n32=k*u+n*D+q*I+o*Q;this.n33=k*v+n*C+q*N+o*L;this.n34=k*x+n*A+q*$+o*G;this.n41=p*t+m*B+r*H+s*K;this.n42=p*u+m*D+r*I+s*Q;this.n43=p*v+m*
C+r*N+s*L;this.n44=p*x+m*A+r*$+s*G;return this},multiplySelf:function(a){return this.multiply(this,a)},multiplyToArray:function(a,b,c){this.multiply(a,b);c[0]=this.n11;c[1]=this.n21;c[2]=this.n31;c[3]=this.n41;c[4]=this.n12;c[5]=this.n22;c[6]=this.n32;c[7]=this.n42;c[8]=this.n13;c[9]=this.n23;c[10]=this.n33;c[11]=this.n43;c[12]=this.n14;c[13]=this.n24;c[14]=this.n34;c[15]=this.n44;return this},multiplyScalar:function(a){this.n11*=a;this.n12*=a;this.n13*=a;this.n14*=a;this.n21*=a;this.n22*=a;this.n23*=
a;this.n24*=a;this.n31*=a;this.n32*=a;this.n33*=a;this.n34*=a;this.n41*=a;this.n42*=a;this.n43*=a;this.n44*=a;return this},multiplyVector3:function(a){var b=a.x,c=a.y,d=a.z,e=1/(this.n41*b+this.n42*c+this.n43*d+this.n44);a.x=(this.n11*b+this.n12*c+this.n13*d+this.n14)*e;a.y=(this.n21*b+this.n22*c+this.n23*d+this.n24)*e;a.z=(this.n31*b+this.n32*c+this.n33*d+this.n34)*e;return a},multiplyVector4:function(a){var b=a.x,c=a.y,d=a.z,e=a.w;a.x=this.n11*b+this.n12*c+this.n13*d+this.n14*e;a.y=this.n21*b+this.n22*
c+this.n23*d+this.n24*e;a.z=this.n31*b+this.n32*c+this.n33*d+this.n34*e;a.w=this.n41*b+this.n42*c+this.n43*d+this.n44*e;return a},rotateAxis:function(a){var b=a.x,c=a.y,d=a.z;a.x=b*this.n11+c*this.n12+d*this.n13;a.y=b*this.n21+c*this.n22+d*this.n23;a.z=b*this.n31+c*this.n32+d*this.n33;a.normalize();return a},crossVector:function(a){var b=new THREE.Vector4;b.x=this.n11*a.x+this.n12*a.y+this.n13*a.z+this.n14*a.w;b.y=this.n21*a.x+this.n22*a.y+this.n23*a.z+this.n24*a.w;b.z=this.n31*a.x+this.n32*a.y+this.n33*
a.z+this.n34*a.w;b.w=a.w?this.n41*a.x+this.n42*a.y+this.n43*a.z+this.n44*a.w:1;return b},determinant:function(){var a=this.n11,b=this.n12,c=this.n13,d=this.n14,e=this.n21,f=this.n22,g=this.n23,h=this.n24,i=this.n31,l=this.n32,k=this.n33,n=this.n34,q=this.n41,o=this.n42,p=this.n43,m=this.n44;return d*g*l*q-c*h*l*q-d*f*k*q+b*h*k*q+c*f*n*q-b*g*n*q-d*g*i*o+c*h*i*o+d*e*k*o-a*h*k*o-c*e*n*o+a*g*n*o+d*f*i*p-b*h*i*p-d*e*l*p+a*h*l*p+b*e*n*p-a*f*n*p-c*f*i*m+b*g*i*m+c*e*l*m-a*g*l*m-b*e*k*m+a*f*k*m},transpose:function(){var a;
a=this.n21;this.n21=this.n12;this.n12=a;a=this.n31;this.n31=this.n13;this.n13=a;a=this.n32;this.n32=this.n23;this.n23=a;a=this.n41;this.n41=this.n14;this.n14=a;a=this.n42;this.n42=this.n24;this.n24=a;a=this.n43;this.n43=this.n34;this.n34=a;return this},clone:function(){var a=new THREE.Matrix4;a.n11=this.n11;a.n12=this.n12;a.n13=this.n13;a.n14=this.n14;a.n21=this.n21;a.n22=this.n22;a.n23=this.n23;a.n24=this.n24;a.n31=this.n31;a.n32=this.n32;a.n33=this.n33;a.n34=this.n34;a.n41=this.n41;a.n42=this.n42;
a.n43=this.n43;a.n44=this.n44;return a},flatten:function(){this.flat[0]=this.n11;this.flat[1]=this.n21;this.flat[2]=this.n31;this.flat[3]=this.n41;this.flat[4]=this.n12;this.flat[5]=this.n22;this.flat[6]=this.n32;this.flat[7]=this.n42;this.flat[8]=this.n13;this.flat[9]=this.n23;this.flat[10]=this.n33;this.flat[11]=this.n43;this.flat[12]=this.n14;this.flat[13]=this.n24;this.flat[14]=this.n34;this.flat[15]=this.n44;return this.flat},flattenToArray:function(a){a[0]=this.n11;a[1]=this.n21;a[2]=this.n31;
a[3]=this.n41;a[4]=this.n12;a[5]=this.n22;a[6]=this.n32;a[7]=this.n42;a[8]=this.n13;a[9]=this.n23;a[10]=this.n33;a[11]=this.n43;a[12]=this.n14;a[13]=this.n24;a[14]=this.n34;a[15]=this.n44;return a},flattenToArrayOffset:function(a,b){a[b]=this.n11;a[b+1]=this.n21;a[b+2]=this.n31;a[b+3]=this.n41;a[b+4]=this.n12;a[b+5]=this.n22;a[b+6]=this.n32;a[b+7]=this.n42;a[b+8]=this.n13;a[b+9]=this.n23;a[b+10]=this.n33;a[b+11]=this.n43;a[b+12]=this.n14;a[b+13]=this.n24;a[b+14]=this.n34;a[b+15]=this.n44;return a},
setTranslation:function(a,b,c){this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1);return this},setScale:function(a,b,c){this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1);return this},setRotationX:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1);return this},setRotationY:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1);return this},setRotationZ:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1);return this},
setRotationAxis:function(a,b){var c=Math.cos(b),d=Math.sin(b),e=1-c,f=a.x,g=a.y,h=a.z,i=e*f,l=e*g;this.set(i*f+c,i*g-d*h,i*h+d*g,0,i*g+d*h,l*g+c,l*h-d*f,0,i*h-d*g,l*h+d*f,e*h*h+c,0,0,0,0,1);return this},setPosition:function(a){this.n14=a.x;this.n24=a.y;this.n34=a.z;return this},getPosition:function(){return THREE.Matrix4.__v1.set(this.n14,this.n24,this.n34)},getColumnX:function(){return THREE.Matrix4.__v1.set(this.n11,this.n21,this.n31)},getColumnY:function(){return THREE.Matrix4.__v1.set(this.n12,
this.n22,this.n32)},getColumnZ:function(){return THREE.Matrix4.__v1.set(this.n13,this.n23,this.n33)},getInverse:function(a){var b=a.n11,c=a.n12,d=a.n13,e=a.n14,f=a.n21,g=a.n22,h=a.n23,i=a.n24,l=a.n31,k=a.n32,n=a.n33,q=a.n34,o=a.n41,p=a.n42,m=a.n43,r=a.n44;this.n11=h*q*p-i*n*p+i*k*m-g*q*m-h*k*r+g*n*r;this.n12=e*n*p-d*q*p-e*k*m+c*q*m+d*k*r-c*n*r;this.n13=d*i*p-e*h*p+e*g*m-c*i*m-d*g*r+c*h*r;this.n14=e*h*k-d*i*k-e*g*n+c*i*n+d*g*q-c*h*q;this.n21=i*n*o-h*q*o-i*l*m+f*q*m+h*l*r-f*n*r;this.n22=d*q*o-e*n*o+
e*l*m-b*q*m-d*l*r+b*n*r;this.n23=e*h*o-d*i*o-e*f*m+b*i*m+d*f*r-b*h*r;this.n24=d*i*l-e*h*l+e*f*n-b*i*n-d*f*q+b*h*q;this.n31=g*q*o-i*k*o+i*l*p-f*q*p-g*l*r+f*k*r;this.n32=e*k*o-c*q*o-e*l*p+b*q*p+c*l*r-b*k*r;this.n33=c*i*o-e*g*o+e*f*p-b*i*p-c*f*r+b*g*r;this.n34=e*g*l-c*i*l-e*f*k+b*i*k+c*f*q-b*g*q;this.n41=h*k*o-g*n*o-h*l*p+f*n*p+g*l*m-f*k*m;this.n42=c*n*o-d*k*o+d*l*p-b*n*p-c*l*m+b*k*m;this.n43=d*g*o-c*h*o-d*f*p+b*h*p+c*f*m-b*g*m;this.n44=c*h*l-d*g*l+d*f*k-b*h*k-c*f*n+b*g*n;this.multiplyScalar(1/a.determinant());
return this},setRotationFromEuler:function(a,b){var c=a.x,d=a.y,e=a.z,f=Math.cos(c),c=Math.sin(c),g=Math.cos(d),d=Math.sin(d),h=Math.cos(e),e=Math.sin(e);switch(b){case "YXZ":var i=g*h,l=g*e,k=d*h,n=d*e;this.n11=i+n*c;this.n12=k*c-l;this.n13=f*d;this.n21=f*e;this.n22=f*h;this.n23=-c;this.n31=l*c-k;this.n32=n+i*c;this.n33=f*g;break;case "ZXY":i=g*h;l=g*e;k=d*h;n=d*e;this.n11=i-n*c;this.n12=-f*e;this.n13=k+l*c;this.n21=l+k*c;this.n22=f*h;this.n23=n-i*c;this.n31=-f*d;this.n32=c;this.n33=f*g;break;case "ZYX":i=
f*h;l=f*e;k=c*h;n=c*e;this.n11=g*h;this.n12=k*d-l;this.n13=i*d+n;this.n21=g*e;this.n22=n*d+i;this.n23=l*d-k;this.n31=-d;this.n32=c*g;this.n33=f*g;break;case "YZX":i=f*g;l=f*d;k=c*g;n=c*d;this.n11=g*h;this.n12=n-i*e;this.n13=k*e+l;this.n21=e;this.n22=f*h;this.n23=-c*h;this.n31=-d*h;this.n32=l*e+k;this.n33=i-n*e;break;case "XZY":i=f*g;l=f*d;k=c*g;n=c*d;this.n11=g*h;this.n12=-e;this.n13=d*h;this.n21=i*e+n;this.n22=f*h;this.n23=l*e-k;this.n31=k*e-l;this.n32=c*h;this.n33=n*e+i;break;default:i=f*h,l=f*
e,k=c*h,n=c*e,this.n11=g*h,this.n12=-g*e,this.n13=d,this.n21=l+k*d,this.n22=i-n*d,this.n23=-c*g,this.n31=n-i*d,this.n32=k+l*d,this.n33=f*g}return this},setRotationFromQuaternion:function(a){var b=a.x,c=a.y,d=a.z,e=a.w,f=b+b,g=c+c,h=d+d,a=b*f,i=b*g,b=b*h,l=c*g,c=c*h,d=d*h,f=e*f,g=e*g,e=e*h;this.n11=1-(l+d);this.n12=i-e;this.n13=b+g;this.n21=i+e;this.n22=1-(a+d);this.n23=c-f;this.n31=b-g;this.n32=c+f;this.n33=1-(a+l);return this},scale:function(a){var b=a.x,c=a.y,a=a.z;this.n11*=b;this.n12*=c;this.n13*=
a;this.n21*=b;this.n22*=c;this.n23*=a;this.n31*=b;this.n32*=c;this.n33*=a;this.n41*=b;this.n42*=c;this.n43*=a;return this},compose:function(a,b,c){var d=THREE.Matrix4.__m1,e=THREE.Matrix4.__m2;d.identity();d.setRotationFromQuaternion(b);e.setScale(c.x,c.y,c.z);this.multiply(d,e);this.n14=a.x;this.n24=a.y;this.n34=a.z;return this},decompose:function(a,b,c){var d=THREE.Matrix4.__v1,e=THREE.Matrix4.__v2,f=THREE.Matrix4.__v3;d.set(this.n11,this.n21,this.n31);e.set(this.n12,this.n22,this.n32);f.set(this.n13,
this.n23,this.n33);a=a instanceof THREE.Vector3?a:new THREE.Vector3;b=b instanceof THREE.Quaternion?b:new THREE.Quaternion;c=c instanceof THREE.Vector3?c:new THREE.Vector3;c.x=d.length();c.y=e.length();c.z=f.length();a.x=this.n14;a.y=this.n24;a.z=this.n34;d=THREE.Matrix4.__m1;d.copy(this);d.n11/=c.x;d.n21/=c.x;d.n31/=c.x;d.n12/=c.y;d.n22/=c.y;d.n32/=c.y;d.n13/=c.z;d.n23/=c.z;d.n33/=c.z;b.setFromRotationMatrix(d);return[a,b,c]},extractPosition:function(a){this.n14=a.n14;this.n24=a.n24;this.n34=a.n34;
return this},extractRotation:function(a){var b=THREE.Matrix4.__v1,c=1/b.set(a.n11,a.n21,a.n31).length(),d=1/b.set(a.n12,a.n22,a.n32).length(),b=1/b.set(a.n13,a.n23,a.n33).length();this.n11=a.n11*c;this.n21=a.n21*c;this.n31=a.n31*c;this.n12=a.n12*d;this.n22=a.n22*d;this.n32=a.n32*d;this.n13=a.n13*b;this.n23=a.n23*b;this.n33=a.n33*b;return this},rotateByAxis:function(a,b){if(1===a.x&&0===a.y&&0===a.z)return this.rotateX(b);if(0===a.x&&1===a.y&&0===a.z)return this.rotateY(b);if(0===a.x&&0===a.y&&1===
a.z)return this.rotateZ(b);var c=a.x,d=a.y,e=a.z,f=Math.sqrt(c*c+d*d+e*e),c=c/f,d=d/f,e=e/f,f=c*c,g=d*d,h=e*e,i=Math.cos(b),l=Math.sin(b),k=1-i,n=c*d*k,q=c*e*k,k=d*e*k,c=c*l,o=d*l,l=e*l,e=f+(1-f)*i,f=n+l,d=q-o,n=n-l,g=g+(1-g)*i,l=k+c,q=q+o,k=k-c,h=h+(1-h)*i,i=this.n11,c=this.n21,o=this.n31,p=this.n41,m=this.n12,r=this.n22,s=this.n32,t=this.n42,u=this.n13,v=this.n23,x=this.n33,B=this.n43;this.n11=e*i+f*m+d*u;this.n21=e*c+f*r+d*v;this.n31=e*o+f*s+d*x;this.n41=e*p+f*t+d*B;this.n12=n*i+g*m+l*u;this.n22=
n*c+g*r+l*v;this.n32=n*o+g*s+l*x;this.n42=n*p+g*t+l*B;this.n13=q*i+k*m+h*u;this.n23=q*c+k*r+h*v;this.n33=q*o+k*s+h*x;this.n43=q*p+k*t+h*B;return this},rotateX:function(a){var b=this.n12,c=this.n22,d=this.n32,e=this.n42,f=this.n13,g=this.n23,h=this.n33,i=this.n43,l=Math.cos(a),a=Math.sin(a);this.n12=l*b+a*f;this.n22=l*c+a*g;this.n32=l*d+a*h;this.n42=l*e+a*i;this.n13=l*f-a*b;this.n23=l*g-a*c;this.n33=l*h-a*d;this.n43=l*i-a*e;return this},rotateY:function(a){var b=this.n11,c=this.n21,d=this.n31,e=this.n41,
f=this.n13,g=this.n23,h=this.n33,i=this.n43,l=Math.cos(a),a=Math.sin(a);this.n11=l*b-a*f;this.n21=l*c-a*g;this.n31=l*d-a*h;this.n41=l*e-a*i;this.n13=l*f+a*b;this.n23=l*g+a*c;this.n33=l*h+a*d;this.n43=l*i+a*e;return this},rotateZ:function(a){var b=this.n11,c=this.n21,d=this.n31,e=this.n41,f=this.n12,g=this.n22,h=this.n32,i=this.n42,l=Math.cos(a),a=Math.sin(a);this.n11=l*b+a*f;this.n21=l*c+a*g;this.n31=l*d+a*h;this.n41=l*e+a*i;this.n12=l*f-a*b;this.n22=l*g-a*c;this.n32=l*h-a*d;this.n42=l*i-a*e;return this},
translate:function(a){var b=a.x,c=a.y,a=a.z;this.n14=this.n11*b+this.n12*c+this.n13*a+this.n14;this.n24=this.n21*b+this.n22*c+this.n23*a+this.n24;this.n34=this.n31*b+this.n32*c+this.n33*a+this.n34;this.n44=this.n41*b+this.n42*c+this.n43*a+this.n44;return this}};
THREE.Matrix4.makeInvert3x3=function(a){var b=a.m33,c=b.m,d=a.n33*a.n22-a.n32*a.n23,e=-a.n33*a.n21+a.n31*a.n23,f=a.n32*a.n21-a.n31*a.n22,g=-a.n33*a.n12+a.n32*a.n13,h=a.n33*a.n11-a.n31*a.n13,i=-a.n32*a.n11+a.n31*a.n12,l=a.n23*a.n12-a.n22*a.n13,k=-a.n23*a.n11+a.n21*a.n13,n=a.n22*a.n11-a.n21*a.n12,a=a.n11*d+a.n21*g+a.n31*l;if(0===a)return null;a=1/a;c[0]=a*d;c[1]=a*e;c[2]=a*f;c[3]=a*g;c[4]=a*h;c[5]=a*i;c[6]=a*l;c[7]=a*k;c[8]=a*n;return b};
THREE.Matrix4.makeFrustum=function(a,b,c,d,e,f){var g;g=new THREE.Matrix4;g.n11=2*e/(b-a);g.n12=0;g.n13=(b+a)/(b-a);g.n14=0;g.n21=0;g.n22=2*e/(d-c);g.n23=(d+c)/(d-c);g.n24=0;g.n31=0;g.n32=0;g.n33=-(f+e)/(f-e);g.n34=-2*f*e/(f-e);g.n41=0;g.n42=0;g.n43=-1;g.n44=0;return g};THREE.Matrix4.makePerspective=function(a,b,c,d){var e,a=c*Math.tan(a*Math.PI/360);e=-a;return THREE.Matrix4.makeFrustum(e*b,a*b,e,a,c,d)};
THREE.Matrix4.makeOrtho=function(a,b,c,d,e,f){var g,h,i,l;g=new THREE.Matrix4;h=b-a;i=c-d;l=f-e;g.n11=2/h;g.n12=0;g.n13=0;g.n14=-((b+a)/h);g.n21=0;g.n22=2/i;g.n23=0;g.n24=-((c+d)/i);g.n31=0;g.n32=0;g.n33=-2/l;g.n34=-((f+e)/l);g.n41=0;g.n42=0;g.n43=0;g.n44=1;return g};THREE.Matrix4.__v1=new THREE.Vector3;THREE.Matrix4.__v2=new THREE.Vector3;THREE.Matrix4.__v3=new THREE.Vector3;THREE.Matrix4.__m1=new THREE.Matrix4;THREE.Matrix4.__m2=new THREE.Matrix4;
THREE.Object3D=function(){this.name="";this.id=THREE.Object3DCount++;this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.eulerOrder="XYZ";this.scale=new THREE.Vector3(1,1,1);this.flipSided=this.doubleSided=this.dynamic=!1;this.renderDepth=null;this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixRotationWorld=new THREE.Matrix4;this.matrixWorldNeedsUpdate=this.matrixAutoUpdate=
!0;this.quaternion=new THREE.Quaternion;this.useQuaternion=!1;this.boundRadius=0;this.boundRadiusScale=1;this.visible=!0;this.receiveShadow=this.castShadow=!1;this.frustumCulled=!0;this._vector=new THREE.Vector3};
THREE.Object3D.prototype={constructor:THREE.Object3D,translate:function(a,b){this.matrix.rotateAxis(b);this.position.addSelf(b.multiplyScalar(a))},translateX:function(a){this.translate(a,this._vector.set(1,0,0))},translateY:function(a){this.translate(a,this._vector.set(0,1,0))},translateZ:function(a){this.translate(a,this._vector.set(0,0,1))},lookAt:function(a){this.matrix.lookAt(a,this.position,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)},add:function(a){if(-1===
this.children.indexOf(a)){void 0!==a.parent&&a.parent.remove(a);a.parent=this;this.children.push(a);for(var b=this;void 0!==b.parent;)b=b.parent;void 0!==b&&b instanceof THREE.Scene&&b.addObject(a)}},remove:function(a){var b=this.children.indexOf(a);if(-1!==b){a.parent=void 0;this.children.splice(b,1);for(b=this;void 0!==b.parent;)b=b.parent;void 0!==b&&b instanceof THREE.Scene&&b.removeObject(a)}},getChildByName:function(a,b){var c,d,e;for(c=0,d=this.children.length;c<d;c++){e=this.children[c];if(e.name===
a||b&&(e=e.getChildByName(a,b),void 0!==e))return e}},updateMatrix:function(){this.matrix.setPosition(this.position);this.useQuaternion?this.matrix.setRotationFromQuaternion(this.quaternion):this.matrix.setRotationFromEuler(this.rotation,this.eulerOrder);if(1!==this.scale.x||1!==this.scale.y||1!==this.scale.z)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,Math.max(this.scale.y,this.scale.z));this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){this.matrixAutoUpdate&&
this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)this.parent?this.matrixWorld.multiply(this.parent.matrixWorld,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)}};THREE.Object3DCount=0;
THREE.Projector=function(){function a(){var a=g[f]=g[f]||new THREE.RenderableObject;f++;return a}function b(){var a=l[i]=l[i]||new THREE.RenderableVertex;i++;return a}function c(a,b){return b.z-a.z}function d(a,b){var c=0,d=1,e=a.z+a.w,f=b.z+b.w,g=-a.z+a.w,h=-b.z+b.w;if(0<=e&&0<=f&&0<=g&&0<=h)return!0;if(0>e&&0>f||0>g&&0>h)return!1;0>e?c=Math.max(c,e/(e-f)):0>f&&(d=Math.min(d,e/(e-f)));0>g?c=Math.max(c,g/(g-h)):0>h&&(d=Math.min(d,g/(g-h)));if(d<c)return!1;a.lerpSelf(b,c);b.lerpSelf(a,1-d);return!0}
var e,f,g=[],h,i,l=[],k,n,q=[],o,p=[],m,r,s=[],t,u,v=[],x={objects:[],sprites:[],lights:[],elements:[]},B=new THREE.Vector3,D=new THREE.Vector4,C=new THREE.Matrix4,A=new THREE.Matrix4,H=new THREE.Frustum,I=new THREE.Vector4,N=new THREE.Vector4;this.projectVector=function(a,b){b.matrixWorldInverse.getInverse(b.matrixWorld);C.multiply(b.projectionMatrix,b.matrixWorldInverse);C.multiplyVector3(a);return a};this.unprojectVector=function(a,b){b.projectionMatrixInverse.getInverse(b.projectionMatrix);C.multiply(b.matrixWorld,
b.projectionMatrixInverse);C.multiplyVector3(a);return a};this.pickingRay=function(a,b){var c;a.z=-1;c=new THREE.Vector3(a.x,a.y,1);this.unprojectVector(a,b);this.unprojectVector(c,b);c.subSelf(a).normalize();return new THREE.Ray(a,c)};this.projectGraph=function(b,d){f=0;x.objects.length=0;x.sprites.length=0;x.lights.length=0;var g=function(b){if(!1!==b.visible){(b instanceof THREE.Mesh||b instanceof THREE.Line)&&(!1===b.frustumCulled||H.contains(b))?(C.multiplyVector3(B.copy(b.position)),e=a(),e.object=
b,e.z=B.z,x.objects.push(e)):b instanceof THREE.Sprite||b instanceof THREE.Particle?(C.multiplyVector3(B.copy(b.position)),e=a(),e.object=b,e.z=B.z,x.sprites.push(e)):b instanceof THREE.Light&&x.lights.push(b);for(var c=0,d=b.children.length;c<d;c++)g(b.children[c])}};g(b);d&&x.objects.sort(c);return x};this.projectScene=function(a,e,f){var g=e.near,G=e.far,j,B,y,E,S,T,R,ka,ga,V,ba,ca,da,ha,Qa,la;u=r=o=n=0;x.elements.length=0;void 0===e.parent&&(console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."),
a.add(e));a.updateMatrixWorld();e.matrixWorldInverse.getInverse(e.matrixWorld);C.multiply(e.projectionMatrix,e.matrixWorldInverse);H.setFromMatrix(C);x=this.projectGraph(a,!1);for(a=0,j=x.objects.length;a<j;a++)if(ga=x.objects[a].object,V=ga.matrixWorld,ca=ga.material,i=0,ga instanceof THREE.Mesh){ba=ga.geometry;da=ga.geometry.materials;E=ba.vertices;ha=ba.faces;Qa=ba.faceVertexUvs;ba=ga.matrixRotationWorld.extractRotation(V);for(B=0,y=E.length;B<y;B++)h=b(),h.positionWorld.copy(E[B].position),V.multiplyVector3(h.positionWorld),
h.positionScreen.copy(h.positionWorld),C.multiplyVector4(h.positionScreen),h.positionScreen.x/=h.positionScreen.w,h.positionScreen.y/=h.positionScreen.w,h.visible=h.positionScreen.z>g&&h.positionScreen.z<G;for(E=0,B=ha.length;E<B;E++){y=ha[E];if(y instanceof THREE.Face3)if(S=l[y.a],T=l[y.b],R=l[y.c],S.visible&&T.visible&&R.visible&&(ga.doubleSided||ga.flipSided!=0>(R.positionScreen.x-S.positionScreen.x)*(T.positionScreen.y-S.positionScreen.y)-(R.positionScreen.y-S.positionScreen.y)*(T.positionScreen.x-
S.positionScreen.x)))ka=q[n]=q[n]||new THREE.RenderableFace3,n++,k=ka,k.v1.copy(S),k.v2.copy(T),k.v3.copy(R);else continue;else if(y instanceof THREE.Face4)if(S=l[y.a],T=l[y.b],R=l[y.c],ka=l[y.d],S.visible&&T.visible&&R.visible&&ka.visible&&(ga.doubleSided||ga.flipSided!=(0>(ka.positionScreen.x-S.positionScreen.x)*(T.positionScreen.y-S.positionScreen.y)-(ka.positionScreen.y-S.positionScreen.y)*(T.positionScreen.x-S.positionScreen.x)||0>(T.positionScreen.x-R.positionScreen.x)*(ka.positionScreen.y-
R.positionScreen.y)-(T.positionScreen.y-R.positionScreen.y)*(ka.positionScreen.x-R.positionScreen.x))))la=p[o]=p[o]||new THREE.RenderableFace4,o++,k=la,k.v1.copy(S),k.v2.copy(T),k.v3.copy(R),k.v4.copy(ka);else continue;k.normalWorld.copy(y.normal);ba.multiplyVector3(k.normalWorld);k.centroidWorld.copy(y.centroid);V.multiplyVector3(k.centroidWorld);k.centroidScreen.copy(k.centroidWorld);C.multiplyVector3(k.centroidScreen);R=y.vertexNormals;for(S=0,T=R.length;S<T;S++)ka=k.vertexNormalsWorld[S],ka.copy(R[S]),
ba.multiplyVector3(ka);for(S=0,T=Qa.length;S<T;S++)if(la=Qa[S][E])for(R=0,ka=la.length;R<ka;R++)k.uvs[S][R]=la[R];k.material=ca;k.faceMaterial=null!==y.materialIndex?da[y.materialIndex]:null;k.z=k.centroidScreen.z;x.elements.push(k)}}else if(ga instanceof THREE.Line){A.multiply(C,V);E=ga.geometry.vertices;S=b();S.positionScreen.copy(E[0].position);A.multiplyVector4(S.positionScreen);for(B=1,y=E.length;B<y;B++)if(S=b(),S.positionScreen.copy(E[B].position),A.multiplyVector4(S.positionScreen),T=l[i-
2],I.copy(S.positionScreen),N.copy(T.positionScreen),d(I,N))I.multiplyScalar(1/I.w),N.multiplyScalar(1/N.w),ga=s[r]=s[r]||new THREE.RenderableLine,r++,m=ga,m.v1.positionScreen.copy(I),m.v2.positionScreen.copy(N),m.z=Math.max(I.z,N.z),m.material=ca,x.elements.push(m)}for(a=0,j=x.sprites.length;a<j;a++)if(ga=x.sprites[a].object,V=ga.matrixWorld,ga instanceof THREE.Particle&&(D.set(V.n14,V.n24,V.n34,1),C.multiplyVector4(D),D.z/=D.w,0<D.z&&1>D.z))g=v[u]=v[u]||new THREE.RenderableParticle,u++,t=g,t.x=
D.x/D.w,t.y=D.y/D.w,t.z=D.z,t.rotation=ga.rotation.z,t.scale.x=ga.scale.x*Math.abs(t.x-(D.x+e.projectionMatrix.n11)/(D.w+e.projectionMatrix.n14)),t.scale.y=ga.scale.y*Math.abs(t.y-(D.y+e.projectionMatrix.n22)/(D.w+e.projectionMatrix.n24)),t.material=ga.material,x.elements.push(t);f&&x.elements.sort(c);return x}};THREE.Quaternion=function(a,b,c,d){this.set(a||0,b||0,c||0,void 0!==d?d:1)};
THREE.Quaternion.prototype={constructor:THREE.Quaternion,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w;return this},setFromEuler:function(a){var b=Math.PI/360,c=a.x*b,d=a.y*b,e=a.z*b,a=Math.cos(d),d=Math.sin(d),b=Math.cos(-e),e=Math.sin(-e),f=Math.cos(c),c=Math.sin(c),g=a*b,h=d*e;this.w=g*f-h*c;this.x=g*c+h*f;this.y=d*b*f+a*e*c;this.z=a*e*f-d*b*c;return this},setFromAxisAngle:function(a,b){var c=b/2,d=Math.sin(c);
this.x=a.x*d;this.y=a.y*d;this.z=a.z*d;this.w=Math.cos(c);return this},setFromRotationMatrix:function(a){var b=Math.pow(a.determinant(),1/3);this.w=Math.sqrt(Math.max(0,b+a.n11+a.n22+a.n33))/2;this.x=Math.sqrt(Math.max(0,b+a.n11-a.n22-a.n33))/2;this.y=Math.sqrt(Math.max(0,b-a.n11+a.n22-a.n33))/2;this.z=Math.sqrt(Math.max(0,b-a.n11-a.n22+a.n33))/2;this.x=0>a.n32-a.n23?-Math.abs(this.x):Math.abs(this.x);this.y=0>a.n13-a.n31?-Math.abs(this.y):Math.abs(this.y);this.z=0>a.n21-a.n12?-Math.abs(this.z):Math.abs(this.z);
this.normalize();return this},calculateW:function(){this.w=-Math.sqrt(Math.abs(1-this.x*this.x-this.y*this.y-this.z*this.z));return this},inverse:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var a=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);0===a?this.w=this.z=this.y=this.x=0:(a=1/a,this.x*=a,this.y*=a,this.z*=a,this.w*=a);return this},multiplySelf:function(a){var b=
this.x,c=this.y,d=this.z,e=this.w,f=a.x,g=a.y,h=a.z,a=a.w;this.x=b*a+e*f+c*h-d*g;this.y=c*a+e*g+d*f-b*h;this.z=d*a+e*h+b*g-c*f;this.w=e*a-b*f-c*g-d*h;return this},multiply:function(a,b){this.x=a.x*b.w+a.y*b.z-a.z*b.y+a.w*b.x;this.y=-a.x*b.z+a.y*b.w+a.z*b.x+a.w*b.y;this.z=a.x*b.y-a.y*b.x+a.z*b.w+a.w*b.z;this.w=-a.x*b.x-a.y*b.y-a.z*b.z+a.w*b.w;return this},multiplyVector3:function(a,b){b||(b=a);var c=a.x,d=a.y,e=a.z,f=this.x,g=this.y,h=this.z,i=this.w,l=i*c+g*e-h*d,k=i*d+h*c-f*e,n=i*e+f*d-g*c,c=-f*
c-g*d-h*e;b.x=l*i+c*-f+k*-h-n*-g;b.y=k*i+c*-g+n*-f-l*-h;b.z=n*i+c*-h+l*-g-k*-f;return b}};
THREE.Quaternion.slerp=function(a,b,c,d){var e=a.w*b.w+a.x*b.x+a.y*b.y+a.z*b.z;0>e?(c.w=-b.w,c.x=-b.x,c.y=-b.y,c.z=-b.z,e=-e):c.copy(b);if(1<=Math.abs(e))return c.w=a.w,c.x=a.x,c.y=a.y,c.z=a.z,c;var f=Math.acos(e),e=Math.sqrt(1-e*e);if(0.001>Math.abs(e))return c.w=0.5*(a.w+b.w),c.x=0.5*(a.x+b.x),c.y=0.5*(a.y+b.y),c.z=0.5*(a.z+b.z),c;b=Math.sin((1-d)*f)/e;d=Math.sin(d*f)/e;c.w=a.w*b+c.w*d;c.x=a.x*b+c.x*d;c.y=a.y*b+c.y*d;c.z=a.z*b+c.z*d;return c};THREE.Vertex=function(a){this.position=a||new THREE.Vector3};
THREE.Face3=function(a,b,c,d,e,f){this.a=a;this.b=b;this.c=c;this.normal=d instanceof THREE.Vector3?d:new THREE.Vector3;this.vertexNormals=d instanceof Array?d:[];this.color=e instanceof THREE.Color?e:new THREE.Color;this.vertexColors=e instanceof Array?e:[];this.vertexTangents=[];this.materialIndex=f;this.centroid=new THREE.Vector3};
THREE.Face4=function(a,b,c,d,e,f,g){this.a=a;this.b=b;this.c=c;this.d=d;this.normal=e instanceof THREE.Vector3?e:new THREE.Vector3;this.vertexNormals=e instanceof Array?e:[];this.color=f instanceof THREE.Color?f:new THREE.Color;this.vertexColors=f instanceof Array?f:[];this.vertexTangents=[];this.materialIndex=g;this.centroid=new THREE.Vector3};THREE.UV=function(a,b){this.u=a||0;this.v=b||0};
THREE.UV.prototype={constructor:THREE.UV,set:function(a,b){this.u=a;this.v=b;return this},copy:function(a){this.u=a.u;this.v=a.v;return this},clone:function(){return new THREE.UV(this.u,this.v)}};
THREE.Geometry=function(){this.id=THREE.GeometryCount++;this.vertices=[];this.colors=[];this.materials=[];this.faces=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.dynamic=this.hasTangents=!1};
THREE.Geometry.prototype={constructor:THREE.Geometry,applyMatrix:function(a){var b=new THREE.Matrix4;b.extractRotation(a,new THREE.Vector3(1,1,1));for(var c=0,d=this.vertices.length;c<d;c++)a.multiplyVector3(this.vertices[c].position);c=0;for(d=this.faces.length;c<d;c++){var e=this.faces[c];b.multiplyVector3(e.normal);for(var f=0,g=e.vertexNormals.length;f<g;f++)b.multiplyVector3(e.vertexNormals[f]);a.multiplyVector3(e.centroid)}},computeCentroids:function(){var a,b,c;for(a=0,b=this.faces.length;a<
b;a++)c=this.faces[a],c.centroid.set(0,0,0),c instanceof THREE.Face3?(c.centroid.addSelf(this.vertices[c.a].position),c.centroid.addSelf(this.vertices[c.b].position),c.centroid.addSelf(this.vertices[c.c].position),c.centroid.divideScalar(3)):c instanceof THREE.Face4&&(c.centroid.addSelf(this.vertices[c.a].position),c.centroid.addSelf(this.vertices[c.b].position),c.centroid.addSelf(this.vertices[c.c].position),c.centroid.addSelf(this.vertices[c.d].position),c.centroid.divideScalar(4))},computeFaceNormals:function(){var a,
b,c,d,e,f,g=new THREE.Vector3,h=new THREE.Vector3;for(a=0,b=this.faces.length;a<b;a++)c=this.faces[a],d=this.vertices[c.a],e=this.vertices[c.b],f=this.vertices[c.c],g.sub(f.position,e.position),h.sub(d.position,e.position),g.crossSelf(h),g.isZero()||g.normalize(),c.normal.copy(g)},computeVertexNormals:function(){var a,b,c,d;if(void 0===this.__tmpVertices){d=this.__tmpVertices=Array(this.vertices.length);for(a=0,b=this.vertices.length;a<b;a++)d[a]=new THREE.Vector3;for(a=0,b=this.faces.length;a<b;a++)if(c=
this.faces[a],c instanceof THREE.Face3)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];else if(c instanceof THREE.Face4)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]}else{d=this.__tmpVertices;for(a=0,b=this.vertices.length;a<b;a++)d[a].set(0,0,0)}for(a=0,b=this.faces.length;a<b;a++)c=this.faces[a],c instanceof THREE.Face3?(d[c.a].addSelf(c.normal),d[c.b].addSelf(c.normal),d[c.c].addSelf(c.normal)):c instanceof THREE.Face4&&(d[c.a].addSelf(c.normal),
d[c.b].addSelf(c.normal),d[c.c].addSelf(c.normal),d[c.d].addSelf(c.normal));for(a=0,b=this.vertices.length;a<b;a++)d[a].normalize();for(a=0,b=this.faces.length;a<b;a++)c=this.faces[a],c instanceof THREE.Face3?(c.vertexNormals[0].copy(d[c.a]),c.vertexNormals[1].copy(d[c.b]),c.vertexNormals[2].copy(d[c.c])):c instanceof THREE.Face4&&(c.vertexNormals[0].copy(d[c.a]),c.vertexNormals[1].copy(d[c.b]),c.vertexNormals[2].copy(d[c.c]),c.vertexNormals[3].copy(d[c.d]))},computeTangents:function(){function a(a,
b,c,d,e,f,T){h=a.vertices[b].position;i=a.vertices[c].position;l=a.vertices[d].position;k=g[e];n=g[f];q=g[T];o=i.x-h.x;p=l.x-h.x;m=i.y-h.y;r=l.y-h.y;s=i.z-h.z;t=l.z-h.z;u=n.u-k.u;v=q.u-k.u;x=n.v-k.v;B=q.v-k.v;D=1/(u*B-v*x);I.set((B*o-x*p)*D,(B*m-x*r)*D,(B*s-x*t)*D);N.set((u*p-v*o)*D,(u*r-v*m)*D,(u*t-v*s)*D);A[b].addSelf(I);A[c].addSelf(I);A[d].addSelf(I);H[b].addSelf(N);H[c].addSelf(N);H[d].addSelf(N)}var b,c,d,e,f,g,h,i,l,k,n,q,o,p,m,r,s,t,u,v,x,B,D,C,A=[],H=[],I=new THREE.Vector3,N=new THREE.Vector3,
$=new THREE.Vector3,K=new THREE.Vector3,Q=new THREE.Vector3;for(b=0,c=this.vertices.length;b<c;b++)A[b]=new THREE.Vector3,H[b]=new THREE.Vector3;for(b=0,c=this.faces.length;b<c;b++)f=this.faces[b],g=this.faceVertexUvs[0][b],f instanceof THREE.Face3?a(this,f.a,f.b,f.c,0,1,2):f instanceof THREE.Face4&&(a(this,f.a,f.b,f.c,0,1,2),a(this,f.a,f.b,f.d,0,1,3));var L=["a","b","c","d"];for(b=0,c=this.faces.length;b<c;b++){f=this.faces[b];for(d=0;d<f.vertexNormals.length;d++)Q.copy(f.vertexNormals[d]),e=f[L[d]],
C=A[e],$.copy(C),$.subSelf(Q.multiplyScalar(Q.dot(C))).normalize(),K.cross(f.vertexNormals[d],C),e=K.dot(H[e]),e=0>e?-1:1,f.vertexTangents[d]=new THREE.Vector4($.x,$.y,$.z,e)}this.hasTangents=!0},computeBoundingBox:function(){if(0<this.vertices.length){var a;a=this.vertices[0].position;this.boundingBox?(this.boundingBox.min.copy(a),this.boundingBox.max.copy(a)):this.boundingBox={min:a.clone(),max:a.clone()};for(var b=this.boundingBox.min,c=this.boundingBox.max,d=1,e=this.vertices.length;d<e;d++){a=
this.vertices[d].position;if(a.x<b.x)b.x=a.x;else if(a.x>c.x)c.x=a.x;if(a.y<b.y)b.y=a.y;else if(a.y>c.y)c.y=a.y;if(a.z<b.z)b.z=a.z;else if(a.z>c.z)c.z=a.z}}},computeBoundingSphere:function(){for(var a,b=0,c=0,d=this.vertices.length;c<d;c++)a=this.vertices[c].position.length(),a>b&&(b=a);this.boundingSphere={radius:b}},mergeVertices:function(){var a={},b=[],c=[],d,e=Math.pow(10,4),f,g;for(f=0,g=this.vertices.length;f<g;f++)d=this.vertices[f].position,d=[Math.round(d.x*e),Math.round(d.y*e),Math.round(d.z*
e)].join("_"),void 0===a[d]?(a[d]=f,b.push(this.vertices[f]),c[f]=b.length-1):c[f]=c[a[d]];for(f=0,g=this.faces.length;f<g;f++)if(a=this.faces[f],a instanceof THREE.Face3)a.a=c[a.a],a.b=c[a.b],a.c=c[a.c];else if(a instanceof THREE.Face4)a.a=c[a.a],a.b=c[a.b],a.c=c[a.c],a.d=c[a.d];this.vertices=b}};THREE.GeometryCount=0;
THREE.Spline=function(a){function b(a,b,c,d,e,f,g){a=0.5*(c-a);d=0.5*(d-b);return(2*(b-c)+a+d)*g+(-3*(b-c)-2*a-d)*f+a*e+b}this.points=a;var c=[],d={x:0,y:0,z:0},e,f,g,h,i,l,k,n,q;this.initFromArray=function(a){this.points=[];for(var b=0;b<a.length;b++)this.points[b]={x:a[b][0],y:a[b][1],z:a[b][2]}};this.getPoint=function(a){e=(this.points.length-1)*a;f=Math.floor(e);g=e-f;c[0]=0===f?f:f-1;c[1]=f;c[2]=f>this.points.length-2?f:f+1;c[3]=f>this.points.length-3?f:f+2;l=this.points[c[0]];k=this.points[c[1]];
n=this.points[c[2]];q=this.points[c[3]];h=g*g;i=g*h;d.x=b(l.x,k.x,n.x,q.x,g,h,i);d.y=b(l.y,k.y,n.y,q.y,g,h,i);d.z=b(l.z,k.z,n.z,q.z,g,h,i);return d};this.getControlPointsArray=function(){var a,b,c=this.points.length,d=[];for(a=0;a<c;a++)b=this.points[a],d[a]=[b.x,b.y,b.z];return d};this.getLength=function(a){var b,c,d,e=b=b=0,f=new THREE.Vector3,g=new THREE.Vector3,h=[],i=0;h[0]=0;a||(a=100);c=this.points.length*a;f.copy(this.points[0]);for(a=1;a<c;a++)b=a/c,d=this.getPoint(b),g.copy(d),i+=g.distanceTo(f),
f.copy(d),b*=this.points.length-1,b=Math.floor(b),b!=e&&(h[b]=i,e=b);h[h.length]=i;return{chunks:h,total:i}};this.reparametrizeByArcLength=function(a){var b,c,d,e,f,g,h=[],i=new THREE.Vector3,l=this.getLength();h.push(i.copy(this.points[0]).clone());for(b=1;b<this.points.length;b++){c=l.chunks[b]-l.chunks[b-1];g=Math.ceil(a*c/l.total);e=(b-1)/(this.points.length-1);f=b/(this.points.length-1);for(c=1;c<g-1;c++)d=e+c*(1/g)*(f-e),d=this.getPoint(d),h.push(i.copy(d).clone());h.push(i.copy(this.points[b]).clone())}this.points=
h}};THREE.Edge=function(a,b,c,d){this.vertices=[a,b];this.vertexIndices=[c,d];this.faces=[];this.faceIndices=[]};THREE.Camera=function(){if(arguments.length)return console.warn("DEPRECATED: Camera() is now PerspectiveCamera() or OrthographicCamera()."),new THREE.PerspectiveCamera(arguments[0],arguments[1],arguments[2],arguments[3]);THREE.Object3D.call(this);this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=new THREE.Matrix4;this.projectionMatrixInverse=new THREE.Matrix4};
THREE.Camera.prototype=new THREE.Object3D;THREE.Camera.prototype.constructor=THREE.Camera;THREE.Camera.prototype.lookAt=function(a){this.matrix.lookAt(this.position,a,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)};THREE.OrthographicCamera=function(a,b,c,d,e,f){THREE.Camera.call(this);this.left=a;this.right=b;this.top=c;this.bottom=d;this.near=void 0!==e?e:0.1;this.far=void 0!==f?f:2E3;this.updateProjectionMatrix()};THREE.OrthographicCamera.prototype=new THREE.Camera;
THREE.OrthographicCamera.prototype.constructor=THREE.OrthographicCamera;THREE.OrthographicCamera.prototype.updateProjectionMatrix=function(){this.projectionMatrix=THREE.Matrix4.makeOrtho(this.left,this.right,this.top,this.bottom,this.near,this.far)};THREE.PerspectiveCamera=function(a,b,c,d){THREE.Camera.call(this);this.fov=void 0!==a?a:50;this.aspect=void 0!==b?b:1;this.near=void 0!==c?c:0.1;this.far=void 0!==d?d:2E3;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype=new THREE.Camera;
THREE.PerspectiveCamera.prototype.constructor=THREE.PerspectiveCamera;THREE.PerspectiveCamera.prototype.setLens=function(a,b){this.fov=2*Math.atan((void 0!==b?b:43.25)/(2*a));this.fov*=180/Math.PI;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype.setViewOffset=function(a,b,c,d,e,f){this.fullWidth=a;this.fullHeight=b;this.x=c;this.y=d;this.width=e;this.height=f;this.updateProjectionMatrix()};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var a=this.fullWidth/this.fullHeight,b=Math.tan(this.fov*Math.PI/360)*this.near,c=-b,d=a*c,a=Math.abs(a*b-d),c=Math.abs(b-c);this.projectionMatrix=THREE.Matrix4.makeFrustum(d+this.x*a/this.fullWidth,d+(this.x+this.width)*a/this.fullWidth,b-(this.y+this.height)*c/this.fullHeight,b-this.y*c/this.fullHeight,this.near,this.far)}else this.projectionMatrix=THREE.Matrix4.makePerspective(this.fov,this.aspect,this.near,
this.far)};THREE.Light=function(a){THREE.Object3D.call(this);this.color=new THREE.Color(a)};THREE.Light.prototype=new THREE.Object3D;THREE.Light.prototype.constructor=THREE.Light;THREE.Light.prototype.supr=THREE.Object3D.prototype;THREE.AmbientLight=function(a){THREE.Light.call(this,a)};THREE.AmbientLight.prototype=new THREE.Light;THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;
THREE.DirectionalLight=function(a,b,c){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,1,0);this.target=new THREE.Object3D;this.intensity=void 0!==b?b:1;this.distance=void 0!==c?c:0;this.onlyShadow=this.castShadow=!1;this.shadowCameraLeft=-500;this.shadowCameraTop=this.shadowCameraRight=500;this.shadowCameraBottom=-500;this.shadowCameraVisible=!1;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;this.shadowMatrix=this.shadowCamera=this.shadowMapSize=
this.shadowMap=null};THREE.DirectionalLight.prototype=new THREE.Light;THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.PointLight=function(a,b,c){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,0,0);this.intensity=void 0!==b?b:1;this.distance=void 0!==c?c:0};THREE.PointLight.prototype=new THREE.Light;THREE.PointLight.prototype.constructor=THREE.PointLight;
THREE.SpotLight=function(a,b,c,d){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,1,0);this.target=new THREE.Object3D;this.intensity=void 0!==b?b:1;this.distance=void 0!==c?c:0;this.castShadow=void 0!==d?d:!1;this.onlyShadow=!1;this.shadowCameraNear=50;this.shadowCameraFar=5E3;this.shadowCameraFov=50;this.shadowCameraVisible=!1;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;this.shadowMatrix=this.shadowCamera=this.shadowMapSize=this.shadowMap=null};
THREE.SpotLight.prototype=new THREE.Light;THREE.SpotLight.prototype.constructor=THREE.SpotLight;
THREE.Material=function(a){a=a||{};this.name="";this.id=THREE.MaterialCount++;this.opacity=void 0!==a.opacity?a.opacity:1;this.transparent=void 0!==a.transparent?a.transparent:!1;this.blending=void 0!==a.blending?a.blending:THREE.NormalBlending;this.depthTest=void 0!==a.depthTest?a.depthTest:!0;this.depthWrite=void 0!==a.depthWrite?a.depthWrite:!0;this.polygonOffset=void 0!==a.polygonOffset?a.polygonOffset:!1;this.polygonOffsetFactor=void 0!==a.polygonOffsetFactor?a.polygonOffsetFactor:0;this.polygonOffsetUnits=
void 0!==a.polygonOffsetUnits?a.polygonOffsetUnits:0;this.alphaTest=void 0!==a.alphaTest?a.alphaTest:0;this.overdraw=void 0!==a.overdraw?a.overdraw:!1};THREE.MaterialCount=0;THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NormalBlending=0;THREE.AdditiveBlending=1;THREE.SubtractiveBlending=2;THREE.MultiplyBlending=3;THREE.AdditiveAlphaBlending=4;
THREE.LineBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=void 0!==a.color?new THREE.Color(a.color):new THREE.Color(16777215);this.linewidth=void 0!==a.linewidth?a.linewidth:1;this.linecap=void 0!==a.linecap?a.linecap:"round";this.linejoin=void 0!==a.linejoin?a.linejoin:"round";this.vertexColors=a.vertexColors?a.vertexColors:!1;this.fog=void 0!==a.fog?a.fog:!0};THREE.LineBasicMaterial.prototype=new THREE.Material;THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial;
THREE.MeshBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=void 0!==a.color?new THREE.Color(a.color):new THREE.Color(16777215);this.map=void 0!==a.map?a.map:null;this.lightMap=void 0!==a.lightMap?a.lightMap:null;this.envMap=void 0!==a.envMap?a.envMap:null;this.combine=void 0!==a.combine?a.combine:THREE.MultiplyOperation;this.reflectivity=void 0!==a.reflectivity?a.reflectivity:1;this.refractionRatio=void 0!==a.refractionRatio?a.refractionRatio:0.98;this.fog=void 0!==a.fog?a.fog:
!0;this.shading=void 0!==a.shading?a.shading:THREE.SmoothShading;this.wireframe=void 0!==a.wireframe?a.wireframe:!1;this.wireframeLinewidth=void 0!==a.wireframeLinewidth?a.wireframeLinewidth:1;this.wireframeLinecap=void 0!==a.wireframeLinecap?a.wireframeLinecap:"round";this.wireframeLinejoin=void 0!==a.wireframeLinejoin?a.wireframeLinejoin:"round";this.vertexColors=void 0!==a.vertexColors?a.vertexColors:!1;this.skinning=void 0!==a.skinning?a.skinning:!1;this.morphTargets=void 0!==a.morphTargets?a.morphTargets:
!1};THREE.MeshBasicMaterial.prototype=new THREE.Material;THREE.MeshBasicMaterial.prototype.constructor=THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=void 0!==a.color?new THREE.Color(a.color):new THREE.Color(16777215);this.ambient=void 0!==a.ambient?new THREE.Color(a.ambient):new THREE.Color(328965);this.wrapAround=void 0!==a.wrapAround?a.wrapAround:!1;this.wrapRGB=new THREE.Vector3(1,1,1);this.map=void 0!==a.map?a.map:null;this.lightMap=void 0!==a.lightMap?a.lightMap:null;this.envMap=void 0!==a.envMap?a.envMap:null;this.combine=void 0!==a.combine?a.combine:THREE.MultiplyOperation;
this.reflectivity=void 0!==a.reflectivity?a.reflectivity:1;this.refractionRatio=void 0!==a.refractionRatio?a.refractionRatio:0.98;this.fog=void 0!==a.fog?a.fog:!0;this.shading=void 0!==a.shading?a.shading:THREE.SmoothShading;this.wireframe=void 0!==a.wireframe?a.wireframe:!1;this.wireframeLinewidth=void 0!==a.wireframeLinewidth?a.wireframeLinewidth:1;this.wireframeLinecap=void 0!==a.wireframeLinecap?a.wireframeLinecap:"round";this.wireframeLinejoin=void 0!==a.wireframeLinejoin?a.wireframeLinejoin:
"round";this.vertexColors=void 0!==a.vertexColors?a.vertexColors:!1;this.skinning=void 0!==a.skinning?a.skinning:!1;this.morphTargets=void 0!==a.morphTargets?a.morphTargets:!1};THREE.MeshLambertMaterial.prototype=new THREE.Material;THREE.MeshLambertMaterial.prototype.constructor=THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=void 0!==a.color?new THREE.Color(a.color):new THREE.Color(16777215);this.ambient=void 0!==a.ambient?new THREE.Color(a.ambient):new THREE.Color(328965);this.specular=void 0!==a.specular?new THREE.Color(a.specular):new THREE.Color(1118481);this.shininess=void 0!==a.shininess?a.shininess:30;this.metal=void 0!==a.metal?a.metal:!1;this.perPixel=void 0!==a.perPixel?a.perPixel:!1;this.wrapAround=void 0!==a.wrapAround?a.wrapAround:
!1;this.wrapRGB=new THREE.Vector3(1,1,1);this.map=void 0!==a.map?a.map:null;this.lightMap=void 0!==a.lightMap?a.lightMap:null;this.envMap=void 0!==a.envMap?a.envMap:null;this.combine=void 0!==a.combine?a.combine:THREE.MultiplyOperation;this.reflectivity=void 0!==a.reflectivity?a.reflectivity:1;this.refractionRatio=void 0!==a.refractionRatio?a.refractionRatio:0.98;this.fog=void 0!==a.fog?a.fog:!0;this.shading=void 0!==a.shading?a.shading:THREE.SmoothShading;this.wireframe=void 0!==a.wireframe?a.wireframe:
!1;this.wireframeLinewidth=void 0!==a.wireframeLinewidth?a.wireframeLinewidth:1;this.wireframeLinecap=void 0!==a.wireframeLinecap?a.wireframeLinecap:"round";this.wireframeLinejoin=void 0!==a.wireframeLinejoin?a.wireframeLinejoin:"round";this.vertexColors=void 0!==a.vertexColors?a.vertexColors:!1;this.skinning=void 0!==a.skinning?a.skinning:!1;this.morphTargets=void 0!==a.morphTargets?a.morphTargets:!1};THREE.MeshPhongMaterial.prototype=new THREE.Material;
THREE.MeshPhongMaterial.prototype.constructor=THREE.MeshPhongMaterial;THREE.MeshDepthMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.shading=void 0!==a.shading?a.shading:THREE.SmoothShading;this.wireframe=void 0!==a.wireframe?a.wireframe:!1;this.wireframeLinewidth=void 0!==a.wireframeLinewidth?a.wireframeLinewidth:1};THREE.MeshDepthMaterial.prototype=new THREE.Material;THREE.MeshDepthMaterial.prototype.constructor=THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.shading=a.shading?a.shading:THREE.FlatShading;this.wireframe=a.wireframe?a.wireframe:!1;this.wireframeLinewidth=a.wireframeLinewidth?a.wireframeLinewidth:1};THREE.MeshNormalMaterial.prototype=new THREE.Material;THREE.MeshNormalMaterial.prototype.constructor=THREE.MeshNormalMaterial;THREE.MeshFaceMaterial=function(){};
THREE.MeshShaderMaterial=function(a){console.warn("DEPRECATED: MeshShaderMaterial() is now ShaderMaterial().");return new THREE.ShaderMaterial(a)};
THREE.ParticleBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=void 0!==a.color?new THREE.Color(a.color):new THREE.Color(16777215);this.map=void 0!==a.map?a.map:null;this.size=void 0!==a.size?a.size:1;this.sizeAttenuation=void 0!==a.sizeAttenuation?a.sizeAttenuation:!0;this.vertexColors=void 0!==a.vertexColors?a.vertexColors:!1;this.fog=void 0!==a.fog?a.fog:!0};THREE.ParticleBasicMaterial.prototype=new THREE.Material;THREE.ParticleBasicMaterial.prototype.constructor=THREE.ParticleBasicMaterial;
THREE.ParticleCanvasMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=void 0!==a.color?new THREE.Color(a.color):new THREE.Color(16777215);this.program=void 0!==a.program?a.program:function(){}};THREE.ParticleCanvasMaterial.prototype=new THREE.Material;THREE.ParticleCanvasMaterial.prototype.constructor=THREE.ParticleCanvasMaterial;THREE.ParticleDOMMaterial=function(a){THREE.Material.call(this);this.domElement=a};
THREE.ShaderMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.fragmentShader=void 0!==a.fragmentShader?a.fragmentShader:"void main() {}";this.vertexShader=void 0!==a.vertexShader?a.vertexShader:"void main() {}";this.uniforms=void 0!==a.uniforms?a.uniforms:{};this.attributes=a.attributes;this.shading=void 0!==a.shading?a.shading:THREE.SmoothShading;this.wireframe=void 0!==a.wireframe?a.wireframe:!1;this.wireframeLinewidth=void 0!==a.wireframeLinewidth?a.wireframeLinewidth:1;this.fog=void 0!==
a.fog?a.fog:!1;this.lights=void 0!==a.lights?a.lights:!1;this.vertexColors=void 0!==a.vertexColors?a.vertexColors:!1;this.skinning=void 0!==a.skinning?a.skinning:!1;this.morphTargets=void 0!==a.morphTargets?a.morphTargets:!1};THREE.ShaderMaterial.prototype=new THREE.Material;THREE.ShaderMaterial.prototype.constructor=THREE.ShaderMaterial;
THREE.Texture=function(a,b,c,d,e,f,g,h){this.id=THREE.TextureCount++;this.image=a;this.mapping=void 0!==b?b:new THREE.UVMapping;this.wrapS=void 0!==c?c:THREE.ClampToEdgeWrapping;this.wrapT=void 0!==d?d:THREE.ClampToEdgeWrapping;this.magFilter=void 0!==e?e:THREE.LinearFilter;this.minFilter=void 0!==f?f:THREE.LinearMipMapLinearFilter;this.format=void 0!==g?g:THREE.RGBAFormat;this.type=void 0!==h?h:THREE.UnsignedByteType;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.generateMipmaps=
!0;this.needsUpdate=!1;this.onUpdate=null};THREE.Texture.prototype={constructor:THREE.Texture,clone:function(){var a=new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter,this.format,this.type);a.offset.copy(this.offset);a.repeat.copy(this.repeat);return a}};THREE.TextureCount=0;THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.LatitudeReflectionMapping=function(){};
THREE.LatitudeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.UVMapping=function(){};THREE.RepeatWrapping=0;THREE.ClampToEdgeWrapping=1;THREE.MirroredRepeatWrapping=2;THREE.NearestFilter=3;THREE.NearestMipMapNearestFilter=4;THREE.NearestMipMapLinearFilter=5;THREE.LinearFilter=6;THREE.LinearMipMapNearestFilter=7;THREE.LinearMipMapLinearFilter=8;THREE.ByteType=9;THREE.UnsignedByteType=10;THREE.ShortType=11;
THREE.UnsignedShortType=12;THREE.IntType=13;THREE.UnsignedIntType=14;THREE.FloatType=15;THREE.AlphaFormat=16;THREE.RGBFormat=17;THREE.RGBAFormat=18;THREE.LuminanceFormat=19;THREE.LuminanceAlphaFormat=20;THREE.DataTexture=function(a,b,c,d,e,f,g,h,i,l){THREE.Texture.call(this,null,f,g,h,i,l,d,e);this.image={data:a,width:b,height:c}};THREE.DataTexture.prototype=new THREE.Texture;THREE.DataTexture.prototype.constructor=THREE.DataTexture;
THREE.DataTexture.prototype.clone=function(){var a=new THREE.DataTexture(this.image.data,this.image.width,this.image.height,this.format,this.type,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter);a.offset.copy(this.offset);a.repeat.copy(this.repeat);return a};THREE.Particle=function(a){THREE.Object3D.call(this);this.material=a};THREE.Particle.prototype=new THREE.Object3D;THREE.Particle.prototype.constructor=THREE.Particle;
THREE.ParticleSystem=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b;this.sortParticles=!1;if(this.geometry)this.geometry.boundingSphere||this.geometry.computeBoundingSphere(),this.boundRadius=a.boundingSphere.radius;this.frustumCulled=!1};THREE.ParticleSystem.prototype=new THREE.Object3D;THREE.ParticleSystem.prototype.constructor=THREE.ParticleSystem;
THREE.Line=function(a,b,c){THREE.Object3D.call(this);this.geometry=a;this.material=b;this.type=void 0!==c?c:THREE.LineStrip;this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere())};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=new THREE.Object3D;THREE.Line.prototype.constructor=THREE.Line;
THREE.Mesh=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b;if(b instanceof Array)console.warn("DEPRECATED: Mesh material can no longer be an Array. Using material at index 0..."),this.material=b[0];if(this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere(),this.boundRadius=a.boundingSphere.radius,this.geometry.morphTargets.length)){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};
for(var c=0;c<this.geometry.morphTargets.length;c++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[c].name]=c}};THREE.Mesh.prototype=new THREE.Object3D;THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.supr=THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName=function(a){if(void 0!==this.morphTargetDictionary[a])return this.morphTargetDictionary[a];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+a+" does not exist. Returning 0.");return 0};THREE.Bone=function(a){THREE.Object3D.call(this);this.skin=a;this.skinMatrix=new THREE.Matrix4};THREE.Bone.prototype=new THREE.Object3D;THREE.Bone.prototype.constructor=THREE.Bone;THREE.Bone.prototype.supr=THREE.Object3D.prototype;
THREE.Bone.prototype.update=function(a,b){this.matrixAutoUpdate&&(b|=this.updateMatrix());if(b||this.matrixWorldNeedsUpdate)a?this.skinMatrix.multiply(a,this.matrix):this.skinMatrix.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,b=!0;var c,d=this.children.length;for(c=0;c<d;c++)this.children[c].update(this.skinMatrix,b)};
THREE.SkinnedMesh=function(a,b){THREE.Mesh.call(this,a,b);this.identityMatrix=new THREE.Matrix4;this.bones=[];this.boneMatrices=[];var c,d,e,f,g,h;if(void 0!==this.geometry.bones){for(c=0;c<this.geometry.bones.length;c++)e=this.geometry.bones[c],f=e.pos,g=e.rotq,h=e.scl,d=this.addBone(),d.name=e.name,d.position.set(f[0],f[1],f[2]),d.quaternion.set(g[0],g[1],g[2],g[3]),d.useQuaternion=!0,void 0!==h?d.scale.set(h[0],h[1],h[2]):d.scale.set(1,1,1);for(c=0;c<this.bones.length;c++)e=this.geometry.bones[c],
d=this.bones[c],-1===e.parent?this.add(d):this.bones[e.parent].add(d);this.boneMatrices=new Float32Array(16*this.bones.length);this.pose()}};THREE.SkinnedMesh.prototype=new THREE.Mesh;THREE.SkinnedMesh.prototype.constructor=THREE.SkinnedMesh;THREE.SkinnedMesh.prototype.addBone=function(a){void 0===a&&(a=new THREE.Bone(this));this.bones.push(a);return a};
THREE.SkinnedMesh.prototype.updateMatrixWorld=function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)this.parent?this.matrixWorld.multiply(this.parent.matrixWorld,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1;for(var a=0,b=this.children.length;a<b;a++){var c=this.children[a];c instanceof THREE.Bone?c.update(this.identityMatrix,!1):c.updateMatrixWorld(!0)}for(var b=this.bones.length,c=this.bones,d=this.boneMatrices,a=0;a<b;a++)c[a].skinMatrix.flattenToArrayOffset(d,
16*a)};
THREE.SkinnedMesh.prototype.pose=function(){this.updateMatrixWorld(!0);for(var a,b=[],c=0;c<this.bones.length;c++){a=this.bones[c];var d=new THREE.Matrix4;d.getInverse(a.skinMatrix);b.push(d);a.skinMatrix.flattenToArrayOffset(this.boneMatrices,16*c)}if(void 0===this.geometry.skinVerticesA){this.geometry.skinVerticesA=[];this.geometry.skinVerticesB=[];for(a=0;a<this.geometry.skinIndices.length;a++){var c=this.geometry.vertices[a].position,e=this.geometry.skinIndices[a].x,f=this.geometry.skinIndices[a].y,d=
new THREE.Vector3(c.x,c.y,c.z);this.geometry.skinVerticesA.push(b[e].multiplyVector3(d));d=new THREE.Vector3(c.x,c.y,c.z);this.geometry.skinVerticesB.push(b[f].multiplyVector3(d));1!==this.geometry.skinWeights[a].x+this.geometry.skinWeights[a].y&&(c=0.5*(1-(this.geometry.skinWeights[a].x+this.geometry.skinWeights[a].y)),this.geometry.skinWeights[a].x+=c,this.geometry.skinWeights[a].y+=c)}}};
THREE.MorphAnimMesh=function(a,b){THREE.Mesh.call(this,a,b);this.duration=1E3;this.mirroredLoop=!1;this.currentKeyframe=this.lastKeyframe=this.time=0;this.direction=1;this.directionBackwards=!1};THREE.MorphAnimMesh.prototype=new THREE.Mesh;THREE.MorphAnimMesh.prototype.constructor=THREE.MorphAnimMesh;
THREE.MorphAnimMesh.prototype.updateAnimation=function(a){var b=this.duration/(this.geometry.morphTargets.length-1);this.time+=this.direction*a;if(this.mirroredLoop){if(this.time>this.duration||0>this.time){this.direction*=-1;if(this.time>this.duration)this.time=this.duration,this.directionBackwards=!0;if(0>this.time)this.time=0,this.directionBackwards=!1}}else this.time%=this.duration;a=THREE.Math.clamp(Math.floor(this.time/b),0,this.geometry.morphTargets.length-1);if(a!=this.currentKeyframe)this.morphTargetInfluences[this.lastKeyframe]=
0,this.morphTargetInfluences[this.currentKeyframe]=1,this.morphTargetInfluences[a]=0,this.lastKeyframe=this.currentKeyframe,this.currentKeyframe=a;b=this.time%b/b;this.directionBackwards&&(b=1-b);this.morphTargetInfluences[this.currentKeyframe]=b;this.morphTargetInfluences[this.lastKeyframe]=1-b};THREE.Ribbon=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b};THREE.Ribbon.prototype=new THREE.Object3D;THREE.Ribbon.prototype.constructor=THREE.Ribbon;
THREE.LOD=function(){THREE.Object3D.call(this);this.LODs=[]};THREE.LOD.prototype=new THREE.Object3D;THREE.LOD.prototype.constructor=THREE.LOD;THREE.LOD.prototype.supr=THREE.Object3D.prototype;THREE.LOD.prototype.addLevel=function(a,b){void 0===b&&(b=0);for(var b=Math.abs(b),c=0;c<this.LODs.length&&!(b<this.LODs[c].visibleAtDistance);c++);this.LODs.splice(c,0,{visibleAtDistance:b,object3D:a});this.add(a)};
THREE.LOD.prototype.update=function(a){if(1<this.LODs.length){a.matrixWorldInverse.getInverse(a.matrixWorld);a=a.matrixWorldInverse;a=-(a.n31*this.position.x+a.n32*this.position.y+a.n33*this.position.z+a.n34);this.LODs[0].object3D.visible=!0;for(var b=1;b<this.LODs.length;b++)if(a>=this.LODs[b].visibleAtDistance)this.LODs[b-1].object3D.visible=!1,this.LODs[b].object3D.visible=!0;else break;for(;b<this.LODs.length;b++)this.LODs[b].object3D.visible=!1}};
THREE.Sprite=function(a){THREE.Object3D.call(this);this.color=void 0!==a.color?new THREE.Color(a.color):new THREE.Color(16777215);this.map=void 0!==a.map?a.map:new THREE.Texture;this.blending=void 0!==a.blending?a.blending:THREE.NormalBlending;this.useScreenCoordinates=void 0!==a.useScreenCoordinates?a.useScreenCoordinates:!0;this.mergeWith3D=void 0!==a.mergeWith3D?a.mergeWith3D:!this.useScreenCoordinates;this.affectedByDistance=void 0!==a.affectedByDistance?a.affectedByDistance:!this.useScreenCoordinates;
this.scaleByViewport=void 0!==a.scaleByViewport?a.scaleByViewport:!this.affectedByDistance;this.alignment=a.alignment instanceof THREE.Vector2?a.alignment:THREE.SpriteAlignment.center;this.rotation3d=this.rotation;this.rotation=0;this.opacity=1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=new THREE.Vector2(1,1)};THREE.Sprite.prototype=new THREE.Object3D;THREE.Sprite.prototype.constructor=THREE.Sprite;
THREE.Sprite.prototype.updateMatrix=function(){this.matrix.setPosition(this.position);this.rotation3d.set(0,0,this.rotation);this.matrix.setRotationFromEuler(this.rotation3d);if(1!==this.scale.x||1!==this.scale.y)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,this.scale.y);this.matrixWorldNeedsUpdate=!0};THREE.SpriteAlignment={};THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1);
THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1);
THREE.Scene=function(){THREE.Object3D.call(this);this.overrideMaterial=this.fog=null;this.matrixAutoUpdate=!1;this.objects=[];this.lights=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=new THREE.Object3D;THREE.Scene.prototype.constructor=THREE.Scene;
THREE.Scene.prototype.addObject=function(a){if(a instanceof THREE.Light)-1===this.lights.indexOf(a)&&this.lights.push(a);else if(!(a instanceof THREE.Camera||a instanceof THREE.Bone)&&-1===this.objects.indexOf(a)){this.objects.push(a);this.__objectsAdded.push(a);var b=this.__objectsRemoved.indexOf(a);-1!==b&&this.__objectsRemoved.splice(b,1)}for(b=0;b<a.children.length;b++)this.addObject(a.children[b])};
THREE.Scene.prototype.removeObject=function(a){if(a instanceof THREE.Light){var b=this.lights.indexOf(a);-1!==b&&this.lights.splice(b,1)}else a instanceof THREE.Camera||(b=this.objects.indexOf(a),-1!==b&&(this.objects.splice(b,1),this.__objectsRemoved.push(a),b=this.__objectsAdded.indexOf(a),-1!==b&&this.__objectsAdded.splice(b,1)));for(b=0;b<a.children.length;b++)this.removeObject(a.children[b])};
THREE.Fog=function(a,b,c){this.color=new THREE.Color(a);this.near=void 0!==b?b:1;this.far=void 0!==c?c:1E3};THREE.FogExp2=function(a,b){this.color=new THREE.Color(a);this.density=void 0!==b?b:2.5E-4};
THREE.DOMRenderer=function(){var a=null,b=new THREE.Projector,c,d,e,f;this.domElement=document.createElement("div");this.setSize=function(a,b){c=a;d=b;e=c/2;f=d/2};this.render=function(c,d){var i,l,k,n,q,o,p,m;a=b.projectScene(c,d);for(i=0,l=a.length;i<l;i++)if(q=a[i],q instanceof THREE.RenderableParticle){p=q.x*e+e;m=q.y*f+f;for(k=0,n=q.material.length;k<n;k++)if(o=q.material[k],o instanceof THREE.ParticleDOMMaterial)o=o.domElement,o.style.left=p+"px",o.style.top=m+"px"}}};
THREE.CanvasRenderer=function(a){function b(a){if(t!=a)m.globalAlpha=t=a}function c(a){if(u!=a){switch(a){case THREE.NormalBlending:m.globalCompositeOperation="source-over";break;case THREE.AdditiveBlending:m.globalCompositeOperation="lighter";break;case THREE.SubtractiveBlending:m.globalCompositeOperation="darker"}u=a}}function d(a){if(v!=a)m.strokeStyle=v=a}function e(a){if(x!=a)m.fillStyle=x=a}var a=a||{},f=this,g,h,i,l=new THREE.Projector,k=void 0!==a.canvas?a.canvas:document.createElement("canvas"),
n,q,o,p,m=k.getContext("2d"),r=new THREE.Color(0),s=0,t=1,u=0,v=null,x=null,B=null,D=null,C=null,A,H,I,N,$=new THREE.RenderableVertex,K=new THREE.RenderableVertex,Q,L,G,j,W,y,E,S,T,R,ka,ga,V=new THREE.Color,ba=new THREE.Color,ca=new THREE.Color,da=new THREE.Color,ha=new THREE.Color,Qa=[],la=[],za,Aa,Ja,Da,$a,Ta,ib,db,Wa,Xa,ra=new THREE.Rectangle,Ba=new THREE.Rectangle,ja=new THREE.Rectangle,ab=!1,aa=new THREE.Color,P=new THREE.Color,O=new THREE.Color,Ea=new THREE.Vector3,gc,hc,Kc,eb,ic,uc,a=16;gc=
document.createElement("canvas");gc.width=gc.height=2;hc=gc.getContext("2d");hc.fillStyle="rgba(0,0,0,1)";hc.fillRect(0,0,2,2);Kc=hc.getImageData(0,0,2,2);eb=Kc.data;ic=document.createElement("canvas");ic.width=ic.height=a;uc=ic.getContext("2d");uc.translate(-a/2,-a/2);uc.scale(a,a);a--;this.domElement=k;this.sortElements=this.sortObjects=this.autoClear=!0;this.info={render:{vertices:0,faces:0}};this.setSize=function(a,b){n=a;q=b;o=Math.floor(n/2);p=Math.floor(q/2);k.width=n;k.height=q;ra.set(-o,
-p,o,p);Ba.set(-o,-p,o,p);t=1;u=0;C=D=B=x=v=null};this.setClearColor=function(a,b){r.copy(a);s=b;Ba.set(-o,-p,o,p)};this.setClearColorHex=function(a,b){r.setHex(a);s=b;Ba.set(-o,-p,o,p)};this.clear=function(){m.setTransform(1,0,0,-1,o,p);Ba.isEmpty()||(Ba.minSelf(ra),Ba.inflate(2),1>s&&m.clearRect(Math.floor(Ba.getX()),Math.floor(Ba.getY()),Math.floor(Ba.getWidth()),Math.floor(Ba.getHeight())),0<s&&(c(THREE.NormalBlending),b(1),e("rgba("+Math.floor(255*r.r)+","+Math.floor(255*r.g)+","+Math.floor(255*
r.b)+","+s+")"),m.fillRect(Math.floor(Ba.getX()),Math.floor(Ba.getY()),Math.floor(Ba.getWidth()),Math.floor(Ba.getHeight()))),Ba.empty())};this.render=function(a,k){function q(a){var b,c,d,e;aa.setRGB(0,0,0);P.setRGB(0,0,0);O.setRGB(0,0,0);for(b=0,c=a.length;b<c;b++)d=a[b],e=d.color,d instanceof THREE.AmbientLight?(aa.r+=e.r,aa.g+=e.g,aa.b+=e.b):d instanceof THREE.DirectionalLight?(P.r+=e.r,P.g+=e.g,P.b+=e.b):d instanceof THREE.PointLight&&(O.r+=e.r,O.g+=e.g,O.b+=e.b)}function n(a,b,c,d){var e,f,
g,aa,j,h;for(e=0,f=a.length;e<f;e++)g=a[e],aa=g.color,g instanceof THREE.DirectionalLight?(j=g.matrixWorld.getPosition(),h=c.dot(j),0>=h||(h*=g.intensity,d.r+=aa.r*h,d.g+=aa.g*h,d.b+=aa.b*h)):g instanceof THREE.PointLight&&(j=g.matrixWorld.getPosition(),h=c.dot(Ea.sub(j,b).normalize()),0>=h||(h*=0==g.distance?1:1-Math.min(b.distanceTo(j)/g.distance,1),0!=h&&(h*=g.intensity,d.r+=aa.r*h,d.g+=aa.g*h,d.b+=aa.b*h)))}function r(a,f,g){b(g.opacity);c(g.blending);var aa,j,h,i,l,k;if(g instanceof THREE.ParticleBasicMaterial){if(g.map)i=
g.map.image,l=i.width>>1,k=i.height>>1,g=f.scale.x*o,h=f.scale.y*p,aa=g*l,j=h*k,ja.set(a.x-aa,a.y-j,a.x+aa,a.y+j),ra.intersects(ja)&&(m.save(),m.translate(a.x,a.y),m.rotate(-f.rotation),m.scale(g,-h),m.translate(-l,-k),m.drawImage(i,0,0),m.restore())}else g instanceof THREE.ParticleCanvasMaterial&&(aa=f.scale.x*o,j=f.scale.y*p,ja.set(a.x-aa,a.y-j,a.x+aa,a.y+j),ra.intersects(ja)&&(d(g.color.getContextStyle()),e(g.color.getContextStyle()),m.save(),m.translate(a.x,a.y),m.rotate(-f.rotation),m.scale(aa,
j),g.program(m),m.restore()))}function s(a,e,f,g){b(g.opacity);c(g.blending);m.beginPath();m.moveTo(a.positionScreen.x,a.positionScreen.y);m.lineTo(e.positionScreen.x,e.positionScreen.y);m.closePath();if(g instanceof THREE.LineBasicMaterial){a=g.linewidth;if(B!=a)m.lineWidth=B=a;a=g.linecap;if(D!=a)m.lineCap=D=a;a=g.linejoin;if(C!=a)m.lineJoin=C=a;d(g.color.getContextStyle());m.stroke();ja.inflate(2*g.linewidth)}}function t(a,d,e,g,h,l,P,O){f.info.render.vertices+=3;f.info.render.faces++;b(O.opacity);
c(O.blending);Q=a.positionScreen.x;L=a.positionScreen.y;G=d.positionScreen.x;j=d.positionScreen.y;W=e.positionScreen.x;y=e.positionScreen.y;v(Q,L,G,j,W,y);if(O instanceof THREE.MeshBasicMaterial)if(O.map)O.map.mapping instanceof THREE.UVMapping&&(Da=P.uvs[0],Lc(Q,L,G,j,W,y,Da[g].u,Da[g].v,Da[h].u,Da[h].v,Da[l].u,Da[l].v,O.map));else if(O.envMap){if(O.envMap.mapping instanceof THREE.SphericalReflectionMapping)a=k.matrixWorldInverse,Ea.copy(P.vertexNormalsWorld[g]),$a=0.5*(Ea.x*a.n11+Ea.y*a.n12+Ea.z*
a.n13)+0.5,Ta=0.5*-(Ea.x*a.n21+Ea.y*a.n22+Ea.z*a.n23)+0.5,Ea.copy(P.vertexNormalsWorld[h]),ib=0.5*(Ea.x*a.n11+Ea.y*a.n12+Ea.z*a.n13)+0.5,db=0.5*-(Ea.x*a.n21+Ea.y*a.n22+Ea.z*a.n23)+0.5,Ea.copy(P.vertexNormalsWorld[l]),Wa=0.5*(Ea.x*a.n11+Ea.y*a.n12+Ea.z*a.n13)+0.5,Xa=0.5*-(Ea.x*a.n21+Ea.y*a.n22+Ea.z*a.n23)+0.5,Lc(Q,L,G,j,W,y,$a,Ta,ib,db,Wa,Xa,O.envMap)}else O.wireframe?Fb(O.color,O.wireframeLinewidth,O.wireframeLinecap,O.wireframeLinejoin):Ab(O.color);else if(O instanceof THREE.MeshLambertMaterial)O.map&&
!O.wireframe&&(O.map.mapping instanceof THREE.UVMapping&&(Da=P.uvs[0],Lc(Q,L,G,j,W,y,Da[g].u,Da[g].v,Da[h].u,Da[h].v,Da[l].u,Da[l].v,O.map)),c(THREE.SubtractiveBlending)),ab?!O.wireframe&&O.shading==THREE.SmoothShading&&3==P.vertexNormalsWorld.length?(ba.r=ca.r=da.r=aa.r,ba.g=ca.g=da.g=aa.g,ba.b=ca.b=da.b=aa.b,n(i,P.v1.positionWorld,P.vertexNormalsWorld[0],ba),n(i,P.v2.positionWorld,P.vertexNormalsWorld[1],ca),n(i,P.v3.positionWorld,P.vertexNormalsWorld[2],da),ba.r=Math.max(0,Math.min(O.color.r*ba.r,
1)),ba.g=Math.max(0,Math.min(O.color.g*ba.g,1)),ba.b=Math.max(0,Math.min(O.color.b*ba.b,1)),ca.r=Math.max(0,Math.min(O.color.r*ca.r,1)),ca.g=Math.max(0,Math.min(O.color.g*ca.g,1)),ca.b=Math.max(0,Math.min(O.color.b*ca.b,1)),da.r=Math.max(0,Math.min(O.color.r*da.r,1)),da.g=Math.max(0,Math.min(O.color.g*da.g,1)),da.b=Math.max(0,Math.min(O.color.b*da.b,1)),ha.r=0.5*(ca.r+da.r),ha.g=0.5*(ca.g+da.g),ha.b=0.5*(ca.b+da.b),Ja=vc(ba,ca,da,ha),Yb(Q,L,G,j,W,y,0,0,1,0,0,1,Ja)):(V.r=aa.r,V.g=aa.g,V.b=aa.b,n(i,
P.centroidWorld,P.normalWorld,V),V.r=Math.max(0,Math.min(O.color.r*V.r,1)),V.g=Math.max(0,Math.min(O.color.g*V.g,1)),V.b=Math.max(0,Math.min(O.color.b*V.b,1)),O.wireframe?Fb(V,O.wireframeLinewidth,O.wireframeLinecap,O.wireframeLinejoin):Ab(V)):O.wireframe?Fb(O.color,O.wireframeLinewidth,O.wireframeLinecap,O.wireframeLinejoin):Ab(O.color);else if(O instanceof THREE.MeshDepthMaterial)za=k.near,Aa=k.far,ba.r=ba.g=ba.b=1-Tb(a.positionScreen.z,za,Aa),ca.r=ca.g=ca.b=1-Tb(d.positionScreen.z,za,Aa),da.r=
da.g=da.b=1-Tb(e.positionScreen.z,za,Aa),ha.r=0.5*(ca.r+da.r),ha.g=0.5*(ca.g+da.g),ha.b=0.5*(ca.b+da.b),Ja=vc(ba,ca,da,ha),Yb(Q,L,G,j,W,y,0,0,1,0,0,1,Ja);else if(O instanceof THREE.MeshNormalMaterial)V.r=Zb(P.normalWorld.x),V.g=Zb(P.normalWorld.y),V.b=Zb(P.normalWorld.z),O.wireframe?Fb(V,O.wireframeLinewidth,O.wireframeLinecap,O.wireframeLinejoin):Ab(V)}function u(a,d,e,g,h,O,l,P,m){f.info.render.vertices+=4;f.info.render.faces++;b(P.opacity);c(P.blending);if(P.map||P.envMap)t(a,d,g,0,1,3,l,P,m),
t(h,e,O,1,2,3,l,P,m);else if(Q=a.positionScreen.x,L=a.positionScreen.y,G=d.positionScreen.x,j=d.positionScreen.y,W=e.positionScreen.x,y=e.positionScreen.y,E=g.positionScreen.x,S=g.positionScreen.y,T=h.positionScreen.x,R=h.positionScreen.y,ka=O.positionScreen.x,ga=O.positionScreen.y,P instanceof THREE.MeshBasicMaterial)x(Q,L,G,j,W,y,E,S),P.wireframe?Fb(P.color,P.wireframeLinewidth,P.wireframeLinecap,P.wireframeLinejoin):Ab(P.color);else if(P instanceof THREE.MeshLambertMaterial)ab?!P.wireframe&&P.shading==
THREE.SmoothShading&&4==l.vertexNormalsWorld.length?(ba.r=ca.r=da.r=ha.r=aa.r,ba.g=ca.g=da.g=ha.g=aa.g,ba.b=ca.b=da.b=ha.b=aa.b,n(i,l.v1.positionWorld,l.vertexNormalsWorld[0],ba),n(i,l.v2.positionWorld,l.vertexNormalsWorld[1],ca),n(i,l.v4.positionWorld,l.vertexNormalsWorld[3],da),n(i,l.v3.positionWorld,l.vertexNormalsWorld[2],ha),ba.r=Math.max(0,Math.min(P.color.r*ba.r,1)),ba.g=Math.max(0,Math.min(P.color.g*ba.g,1)),ba.b=Math.max(0,Math.min(P.color.b*ba.b,1)),ca.r=Math.max(0,Math.min(P.color.r*ca.r,
1)),ca.g=Math.max(0,Math.min(P.color.g*ca.g,1)),ca.b=Math.max(0,Math.min(P.color.b*ca.b,1)),da.r=Math.max(0,Math.min(P.color.r*da.r,1)),da.g=Math.max(0,Math.min(P.color.g*da.g,1)),da.b=Math.max(0,Math.min(P.color.b*da.b,1)),ha.r=Math.max(0,Math.min(P.color.r*ha.r,1)),ha.g=Math.max(0,Math.min(P.color.g*ha.g,1)),ha.b=Math.max(0,Math.min(P.color.b*ha.b,1)),Ja=vc(ba,ca,da,ha),v(Q,L,G,j,E,S),Yb(Q,L,G,j,E,S,0,0,1,0,0,1,Ja),v(T,R,W,y,ka,ga),Yb(T,R,W,y,ka,ga,1,0,1,1,0,1,Ja)):(V.r=aa.r,V.g=aa.g,V.b=aa.b,n(i,
l.centroidWorld,l.normalWorld,V),V.r=Math.max(0,Math.min(P.color.r*V.r,1)),V.g=Math.max(0,Math.min(P.color.g*V.g,1)),V.b=Math.max(0,Math.min(P.color.b*V.b,1)),x(Q,L,G,j,W,y,E,S),P.wireframe?Fb(V,P.wireframeLinewidth,P.wireframeLinecap,P.wireframeLinejoin):Ab(V)):(x(Q,L,G,j,W,y,E,S),P.wireframe?Fb(P.color,P.wireframeLinewidth,P.wireframeLinecap,P.wireframeLinejoin):Ab(P.color));else if(P instanceof THREE.MeshNormalMaterial)V.r=Zb(l.normalWorld.x),V.g=Zb(l.normalWorld.y),V.b=Zb(l.normalWorld.z),x(Q,
L,G,j,W,y,E,S),P.wireframe?Fb(V,P.wireframeLinewidth,P.wireframeLinecap,P.wireframeLinejoin):Ab(V);else if(P instanceof THREE.MeshDepthMaterial)za=k.near,Aa=k.far,ba.r=ba.g=ba.b=1-Tb(a.positionScreen.z,za,Aa),ca.r=ca.g=ca.b=1-Tb(d.positionScreen.z,za,Aa),da.r=da.g=da.b=1-Tb(g.positionScreen.z,za,Aa),ha.r=ha.g=ha.b=1-Tb(e.positionScreen.z,za,Aa),Ja=vc(ba,ca,da,ha),v(Q,L,G,j,E,S),Yb(Q,L,G,j,E,S,0,0,1,0,0,1,Ja),v(T,R,W,y,ka,ga),Yb(T,R,W,y,ka,ga,1,0,1,1,0,1,Ja)}function v(a,b,c,d,e,f){m.beginPath();m.moveTo(a,
b);m.lineTo(c,d);m.lineTo(e,f);m.lineTo(a,b);m.closePath()}function x(a,b,c,d,e,f,g,aa){m.beginPath();m.moveTo(a,b);m.lineTo(c,d);m.lineTo(e,f);m.lineTo(g,aa);m.lineTo(a,b);m.closePath()}function Fb(a,b,c,e){if(B!=b)m.lineWidth=B=b;if(D!=c)m.lineCap=D=c;if(C!=e)m.lineJoin=C=e;d(a.getContextStyle());m.stroke();ja.inflate(2*b)}function Ab(a){e(a.getContextStyle());m.fill()}function Lc(a,b,c,d,f,g,aa,j,h,P,i,l,O){if(0!=O.image.width){if(!0==O.needsUpdate||void 0==Qa[O.id]){var k=O.wrapS==THREE.RepeatWrapping,
n=O.wrapT==THREE.RepeatWrapping;Qa[O.id]=m.createPattern(O.image,k&&n?"repeat":k&&!n?"repeat-x":!k&&n?"repeat-y":"no-repeat");O.needsUpdate=!1}e(Qa[O.id]);var k=O.offset.x/O.repeat.x,n=O.offset.y/O.repeat.y,q=O.image.width*O.repeat.x,Ea=O.image.height*O.repeat.y,aa=(aa+k)*q,j=(j+n)*Ea,c=c-a,d=d-b,f=f-a,g=g-b,h=(h+k)*q-aa,P=(P+n)*Ea-j,i=(i+k)*q-aa,l=(l+n)*Ea-j,k=h*l-i*P;if(0==k){if(void 0===la[O.id])b=document.createElement("canvas"),b.width=O.image.width,b.height=O.image.height,b=b.getContext("2d"),
b.drawImage(O.image,0,0),la[O.id]=b.getImageData(0,0,O.image.width,O.image.height).data;b=la[O.id];aa=4*(Math.floor(aa)+Math.floor(j)*O.image.width);V.setRGB(b[aa]/255,b[aa+1]/255,b[aa+2]/255);Ab(V)}else k=1/k,O=(l*c-P*f)*k,P=(l*d-P*g)*k,c=(h*f-i*c)*k,d=(h*g-i*d)*k,a=a-O*aa-c*j,aa=b-P*aa-d*j,m.save(),m.transform(O,P,c,d,a,aa),m.fill(),m.restore()}}function Yb(a,b,c,d,e,f,g,aa,j,h,P,i,O){var l,k;l=O.width-1;k=O.height-1;g*=l;aa*=k;c-=a;d-=b;e-=a;f-=b;j=j*l-g;h=h*k-aa;P=P*l-g;i=i*k-aa;k=1/(j*i-P*h);
l=(i*c-h*e)*k;h=(i*d-h*f)*k;c=(j*e-P*c)*k;d=(j*f-P*d)*k;a=a-l*g-c*aa;b=b-h*g-d*aa;m.save();m.transform(l,h,c,d,a,b);m.clip();m.drawImage(O,0,0);m.restore()}function vc(a,b,c,d){var e=~~(255*a.r),f=~~(255*a.g),a=~~(255*a.b),g=~~(255*b.r),aa=~~(255*b.g),b=~~(255*b.b),j=~~(255*c.r),h=~~(255*c.g),c=~~(255*c.b),P=~~(255*d.r),i=~~(255*d.g),d=~~(255*d.b);eb[0]=0>e?0:255<e?255:e;eb[1]=0>f?0:255<f?255:f;eb[2]=0>a?0:255<a?255:a;eb[4]=0>g?0:255<g?255:g;eb[5]=0>aa?0:255<aa?255:aa;eb[6]=0>b?0:255<b?255:b;eb[8]=
0>j?0:255<j?255:j;eb[9]=0>h?0:255<h?255:h;eb[10]=0>c?0:255<c?255:c;eb[12]=0>P?0:255<P?255:P;eb[13]=0>i?0:255<i?255:i;eb[14]=0>d?0:255<d?255:d;hc.putImageData(Kc,0,0);uc.drawImage(gc,0,0);return ic}function Tb(a,b,c){a=(a-b)/(c-b);return a*a*(3-2*a)}function Zb(a){a=0.5*(a+1);return 0>a?0:1<a?1:a}function Gb(a,b){var c=b.x-a.x,d=b.y-a.y,e=c*c+d*d;0!=e&&(e=1/Math.sqrt(e),c*=e,d*=e,b.x+=c,b.y+=d,a.x-=c,a.y-=d)}var wc,Vc,Na,jb;this.autoClear?this.clear():m.setTransform(1,0,0,-1,o,p);f.info.render.vertices=
0;f.info.render.faces=0;g=l.projectScene(a,k,this.sortElements);h=g.elements;i=g.lights;(ab=0<i.length)&&q(i);for(wc=0,Vc=h.length;wc<Vc;wc++)if(Na=h[wc],jb=Na.material,jb=jb instanceof THREE.MeshFaceMaterial?Na.faceMaterial:jb,!(null==jb||0==jb.opacity)){ja.empty();if(Na instanceof THREE.RenderableParticle)A=Na,A.x*=o,A.y*=p,r(A,Na,jb,a);else if(Na instanceof THREE.RenderableLine)A=Na.v1,H=Na.v2,A.positionScreen.x*=o,A.positionScreen.y*=p,H.positionScreen.x*=o,H.positionScreen.y*=p,ja.addPoint(A.positionScreen.x,
A.positionScreen.y),ja.addPoint(H.positionScreen.x,H.positionScreen.y),ra.intersects(ja)&&s(A,H,Na,jb,a);else if(Na instanceof THREE.RenderableFace3)A=Na.v1,H=Na.v2,I=Na.v3,A.positionScreen.x*=o,A.positionScreen.y*=p,H.positionScreen.x*=o,H.positionScreen.y*=p,I.positionScreen.x*=o,I.positionScreen.y*=p,jb.overdraw&&(Gb(A.positionScreen,H.positionScreen),Gb(H.positionScreen,I.positionScreen),Gb(I.positionScreen,A.positionScreen)),ja.add3Points(A.positionScreen.x,A.positionScreen.y,H.positionScreen.x,
H.positionScreen.y,I.positionScreen.x,I.positionScreen.y),ra.intersects(ja)&&t(A,H,I,0,1,2,Na,jb,a);else if(Na instanceof THREE.RenderableFace4)A=Na.v1,H=Na.v2,I=Na.v3,N=Na.v4,A.positionScreen.x*=o,A.positionScreen.y*=p,H.positionScreen.x*=o,H.positionScreen.y*=p,I.positionScreen.x*=o,I.positionScreen.y*=p,N.positionScreen.x*=o,N.positionScreen.y*=p,$.positionScreen.copy(H.positionScreen),K.positionScreen.copy(N.positionScreen),jb.overdraw&&(Gb(A.positionScreen,H.positionScreen),Gb(H.positionScreen,
N.positionScreen),Gb(N.positionScreen,A.positionScreen),Gb(I.positionScreen,$.positionScreen),Gb(I.positionScreen,K.positionScreen)),ja.addPoint(A.positionScreen.x,A.positionScreen.y),ja.addPoint(H.positionScreen.x,H.positionScreen.y),ja.addPoint(I.positionScreen.x,I.positionScreen.y),ja.addPoint(N.positionScreen.x,N.positionScreen.y),ra.intersects(ja)&&u(A,H,I,N,$,K,Na,jb,a);Ba.addRectangle(ja)}m.setTransform(1,0,0,1,0,0)}};
THREE.SVGRenderer=function(){function a(a,b,c,d){var e,f,g,h,i,l;for(e=0,f=a.length;e<f;e++)g=a[e],h=g.color,g instanceof THREE.DirectionalLight?(i=g.matrixWorld.getPosition(),l=c.dot(i),0>=l||(l*=g.intensity,d.r+=h.r*l,d.g+=h.g*l,d.b+=h.b*l)):g instanceof THREE.PointLight&&(i=g.matrixWorld.getPosition(),l=c.dot(A.sub(i,b).normalize()),0>=l||(l*=0==g.distance?1:1-Math.min(b.distanceTo(i)/g.distance,1),0!=l&&(l*=g.intensity,d.r+=h.r*l,d.g+=h.g*l,d.b+=h.b*l)))}function b(a){null==H[a]&&(H[a]=document.createElementNS("http://www.w3.org/2000/svg",
"path"),0==Q&&H[a].setAttribute("shape-rendering","crispEdges"));return H[a]}function c(a){a=0.5*(a+1);return 0>a?0:1<a?1:a}var d=this,e,f,g,h=new THREE.Projector,i=document.createElementNS("http://www.w3.org/2000/svg","svg"),l,k,n,q,o,p,m,r,s=new THREE.Rectangle,t=new THREE.Rectangle,u=!1,v=new THREE.Color,x=new THREE.Color,B=new THREE.Color,D=new THREE.Color,C,A=new THREE.Vector3,H=[],I=[],N,$,K,Q=1;this.domElement=i;this.sortElements=this.sortObjects=this.autoClear=!0;this.info={render:{vertices:0,
faces:0}};this.setQuality=function(a){switch(a){case "high":Q=1;break;case "low":Q=0}};this.setSize=function(a,b){l=a;k=b;n=l/2;q=k/2;i.setAttribute("viewBox",-n+" "+-q+" "+l+" "+k);i.setAttribute("width",l);i.setAttribute("height",k);s.set(-n,-q,n,q)};this.clear=function(){for(;0<i.childNodes.length;)i.removeChild(i.childNodes[0])};this.render=function(l,k){var j,A,y,E;this.autoClear&&this.clear();d.info.render.vertices=0;d.info.render.faces=0;e=h.projectScene(l,k,this.sortElements);f=e.elements;
g=e.lights;K=$=0;if(u=0<g.length){x.setRGB(0,0,0);B.setRGB(0,0,0);D.setRGB(0,0,0);for(j=0,A=g.length;j<A;j++)E=g[j],y=E.color,E instanceof THREE.AmbientLight?(x.r+=y.r,x.g+=y.g,x.b+=y.b):E instanceof THREE.DirectionalLight?(B.r+=y.r,B.g+=y.g,B.b+=y.b):E instanceof THREE.PointLight&&(D.r+=y.r,D.g+=y.g,D.b+=y.b)}for(j=0,A=f.length;j<A;j++)if(y=f[j],E=y.material,E=E instanceof THREE.MeshFaceMaterial?y.faceMaterial:E,!(null==E||0==E.opacity))if(t.empty(),y instanceof THREE.RenderableParticle)o=y,o.x*=
n,o.y*=-q;else if(y instanceof THREE.RenderableLine){if(o=y.v1,p=y.v2,o.positionScreen.x*=n,o.positionScreen.y*=-q,p.positionScreen.x*=n,p.positionScreen.y*=-q,t.addPoint(o.positionScreen.x,o.positionScreen.y),t.addPoint(p.positionScreen.x,p.positionScreen.y),s.intersects(t)){y=o;var S=p,T=K++;null==I[T]&&(I[T]=document.createElementNS("http://www.w3.org/2000/svg","line"),0==Q&&I[T].setAttribute("shape-rendering","crispEdges"));N=I[T];N.setAttribute("x1",y.positionScreen.x);N.setAttribute("y1",y.positionScreen.y);
N.setAttribute("x2",S.positionScreen.x);N.setAttribute("y2",S.positionScreen.y);E instanceof THREE.LineBasicMaterial&&(N.setAttribute("style","fill: none; stroke: "+E.color.getContextStyle()+"; stroke-width: "+E.linewidth+"; stroke-opacity: "+E.opacity+"; stroke-linecap: "+E.linecap+"; stroke-linejoin: "+E.linejoin),i.appendChild(N))}}else if(y instanceof THREE.RenderableFace3){if(o=y.v1,p=y.v2,m=y.v3,o.positionScreen.x*=n,o.positionScreen.y*=-q,p.positionScreen.x*=n,p.positionScreen.y*=-q,m.positionScreen.x*=
n,m.positionScreen.y*=-q,t.addPoint(o.positionScreen.x,o.positionScreen.y),t.addPoint(p.positionScreen.x,p.positionScreen.y),t.addPoint(m.positionScreen.x,m.positionScreen.y),s.intersects(t)){var S=o,T=p,R=m;d.info.render.vertices+=3;d.info.render.faces++;N=b($++);N.setAttribute("d","M "+S.positionScreen.x+" "+S.positionScreen.y+" L "+T.positionScreen.x+" "+T.positionScreen.y+" L "+R.positionScreen.x+","+R.positionScreen.y+"z");E instanceof THREE.MeshBasicMaterial?v.copy(E.color):E instanceof THREE.MeshLambertMaterial?
u?(v.r=x.r,v.g=x.g,v.b=x.b,a(g,y.centroidWorld,y.normalWorld,v),v.r=Math.max(0,Math.min(E.color.r*v.r,1)),v.g=Math.max(0,Math.min(E.color.g*v.g,1)),v.b=Math.max(0,Math.min(E.color.b*v.b,1))):v.copy(E.color):E instanceof THREE.MeshDepthMaterial?(C=1-E.__2near/(E.__farPlusNear-y.z*E.__farMinusNear),v.setRGB(C,C,C)):E instanceof THREE.MeshNormalMaterial&&v.setRGB(c(y.normalWorld.x),c(y.normalWorld.y),c(y.normalWorld.z));E.wireframe?N.setAttribute("style","fill: none; stroke: "+v.getContextStyle()+"; stroke-width: "+
E.wireframeLinewidth+"; stroke-opacity: "+E.opacity+"; stroke-linecap: "+E.wireframeLinecap+"; stroke-linejoin: "+E.wireframeLinejoin):N.setAttribute("style","fill: "+v.getContextStyle()+"; fill-opacity: "+E.opacity);i.appendChild(N)}}else if(y instanceof THREE.RenderableFace4&&(o=y.v1,p=y.v2,m=y.v3,r=y.v4,o.positionScreen.x*=n,o.positionScreen.y*=-q,p.positionScreen.x*=n,p.positionScreen.y*=-q,m.positionScreen.x*=n,m.positionScreen.y*=-q,r.positionScreen.x*=n,r.positionScreen.y*=-q,t.addPoint(o.positionScreen.x,
o.positionScreen.y),t.addPoint(p.positionScreen.x,p.positionScreen.y),t.addPoint(m.positionScreen.x,m.positionScreen.y),t.addPoint(r.positionScreen.x,r.positionScreen.y),s.intersects(t))){var S=o,T=p,R=m,H=r;d.info.render.vertices+=4;d.info.render.faces++;N=b($++);N.setAttribute("d","M "+S.positionScreen.x+" "+S.positionScreen.y+" L "+T.positionScreen.x+" "+T.positionScreen.y+" L "+R.positionScreen.x+","+R.positionScreen.y+" L "+H.positionScreen.x+","+H.positionScreen.y+"z");E instanceof THREE.MeshBasicMaterial?
v.copy(E.color):E instanceof THREE.MeshLambertMaterial?u?(v.r=x.r,v.g=x.g,v.b=x.b,a(g,y.centroidWorld,y.normalWorld,v),v.r=Math.max(0,Math.min(E.color.r*v.r,1)),v.g=Math.max(0,Math.min(E.color.g*v.g,1)),v.b=Math.max(0,Math.min(E.color.b*v.b,1))):v.copy(E.color):E instanceof THREE.MeshDepthMaterial?(C=1-E.__2near/(E.__farPlusNear-y.z*E.__farMinusNear),v.setRGB(C,C,C)):E instanceof THREE.MeshNormalMaterial&&v.setRGB(c(y.normalWorld.x),c(y.normalWorld.y),c(y.normalWorld.z));E.wireframe?N.setAttribute("style",
"fill: none; stroke: "+v.getContextStyle()+"; stroke-width: "+E.wireframeLinewidth+"; stroke-opacity: "+E.opacity+"; stroke-linecap: "+E.wireframeLinecap+"; stroke-linejoin: "+E.wireframeLinejoin):N.setAttribute("style","fill: "+v.getContextStyle()+"; fill-opacity: "+E.opacity);i.appendChild(N)}}};
THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",fog_fragment:"#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",envmap_pars_fragment:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
envmap_fragment:"#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",envmap_vertex:"#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
map_particle_pars_fragment:"#ifdef USE_MAP\nuniform sampler2D map;\n#endif",map_particle_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",map_pars_vertex:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",map_pars_fragment:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",map_vertex:"#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",map_fragment:"#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",lightmap_fragment:"#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",lights_lambert_pars_vertex:"uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
lights_lambert_vertex:"vLightWeighting = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( transformedNormal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( transformedNormal, dirVector ) + 0.5, 0.0 );\nvec3 directionalLightWeighting = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat directionalLightWeighting = max( dot( transformedNormal, dirVector ), 0.0 );\n#endif\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#ifdef WRAP_AROUND\nfloat pointLightWeightingFull = max( dot( transformedNormal, lVector ), 0.0 );\nfloat pointLightWeightingHalf = max( 0.5 * dot( transformedNormal, lVector ) + 0.5, 0.0 );\nvec3 pointLightWeighting = mix( vec3 ( pointLightWeightingFull ), vec3( pointLightWeightingHalf ), wrapRGB );\n#else\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\n#endif\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n}\n#endif\nvLightWeighting = vLightWeighting * diffuse + ambient * ambientLightColor;",
lights_phong_pars_vertex:"#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",lights_phong_vertex:"#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif",
lights_phong_pars_fragment:"uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
lights_phong_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, lVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, lVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, lVector ), 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dot( normal, dirVector ), 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
color_pars_fragment:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",skinning_vertex:"#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
default_vertex:"#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
shadowmap_fragment:"#ifdef USE_SHADOWMAP\nvec3 shadowColor = vec3( 1.0 );\nfloat fDepth;\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nif ( shadowCoord.z <= 1.0 ) {\nshadowCoord.z += shadowBias[ i ];\nbvec4 shadowTest = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nif ( all( shadowTest ) ) {\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n}\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",shadowmap_vertex:"#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n#ifdef USE_MORPHTARGETS\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( morphed, 1.0 );\n#else\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n#endif\n}\n#endif",alphatest_fragment:"#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
linear_to_gamma_fragment:"#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"};
THREE.UniformsUtils={merge:function(a){var b,c,d,e={};for(b=0;b<a.length;b++)for(c in d=this.clone(a[b]),d)e[c]=d[c];return e},clone:function(a){var b,c,d,e={};for(b in a)for(c in e[b]={},a[b])d=a[b][c],e[b][c]=d instanceof THREE.Color||d instanceof THREE.Vector2||d instanceof THREE.Vector3||d instanceof THREE.Vector4||d instanceof THREE.Matrix4||d instanceof THREE.Texture?d.clone():d instanceof Array?d.slice():d;return e}};
THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:0,texture:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:2,texture:null},envMap:{type:"t",value:1,texture:null},flipEnvMap:{type:"f",value:-1},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},combine:{type:"i",value:0},morphTargetInfluences:{type:"f",value:0}},fog:{fogDensity:{type:"f",
value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},lights:{ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",value:1},scale:{type:"f",
value:1},map:{type:"t",value:0,texture:null},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},shadowmap:{shadowMap:{type:"tv",value:6,texture:[]},shadowMapSize:{type:"v2v",value:[]},shadowBias:{type:"fv1",value:[]},shadowDarkness:{type:"fv1",value:[]},shadowMatrix:{type:"m4v",value:[]}}};
THREE.ShaderLib={depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2E3},opacity:{type:"f",value:1}},vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"},normal:{uniforms:{opacity:{type:"f",
value:1}},vertexShader:"varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}",fragmentShader:"uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"},basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.shadowmap]),vertexShader:[THREE.ShaderChunk.map_pars_vertex,
THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,
THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,
THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(328965)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["varying vec3 vLightWeighting;",
THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_lambert_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,
"vec3 transformedNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk.lights_lambert_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;\nvarying vec3 vLightWeighting;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,
THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,"gl_FragColor.xyz = gl_FragColor.xyz * vLightWeighting;",THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,
THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(328965)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["varying vec3 vViewPosition;\nvarying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_phong_pars_vertex,THREE.ShaderChunk.color_pars_vertex,
THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;\nvec3 transformedNormal = normalMatrix * normal;\nvNormal = transformedNormal;",
THREE.ShaderChunk.lights_phong_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,
THREE.ShaderChunk.lights_phong_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.lights_phong_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.particle,
THREE.UniformsLib.shadowmap]),vertexShader:["uniform float size;\nuniform float scale;",THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 psColor;\nuniform float opacity;",
THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},depthRGBA:{uniforms:{},vertexShader:[THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n"),fragmentShader:"vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"}};
THREE.WebGLRenderer=function(a){function b(a,b){var c=a.vertices.length,d=b.material;if(d.attributes){if(void 0===a.__webglCustomAttributesList)a.__webglCustomAttributesList=[];for(var e in d.attributes){var f=d.attributes[e];if(!f.__webglInitialized||f.createUniqueBuffers){f.__webglInitialized=!0;var g=1;"v2"===f.type?g=2:"v3"===f.type?g=3:"v4"===f.type?g=4:"c"===f.type&&(g=3);f.size=g;f.array=new Float32Array(c*g);f.buffer=j.createBuffer();f.buffer.belongsToAttribute=e;f.needsUpdate=!0}a.__webglCustomAttributesList.push(f)}}}
function c(a,b){if(a.material&&!(a.material instanceof THREE.MeshFaceMaterial))return a.material;if(0<=b.materialIndex)return a.geometry.materials[b.materialIndex]}function d(a){return a instanceof THREE.MeshBasicMaterial&&!a.envMap||a instanceof THREE.MeshDepthMaterial?!1:a&&void 0!==a.shading&&a.shading===THREE.SmoothShading?THREE.SmoothShading:THREE.FlatShading}function e(a){return a.map||a.lightMap||a instanceof THREE.ShaderMaterial?!0:!1}function f(a,b,c){var d,e,f,g,h=a.vertices;g=h.length;
var i=a.colors,l=i.length,k=a.__vertexArray,n=a.__colorArray,m=a.__sortArray,q=a.__dirtyVertices,o=a.__dirtyColors,p=a.__webglCustomAttributesList;if(c.sortParticles){Wa.multiplySelf(c.matrixWorld);for(d=0;d<g;d++)e=h[d].position,Xa.copy(e),Wa.multiplyVector3(Xa),m[d]=[Xa.z,d];m.sort(function(a,b){return b[0]-a[0]});for(d=0;d<g;d++)e=h[m[d][1]].position,f=3*d,k[f]=e.x,k[f+1]=e.y,k[f+2]=e.z;for(d=0;d<l;d++)f=3*d,e=i[m[d][1]],n[f]=e.r,n[f+1]=e.g,n[f+2]=e.b;if(p)for(i=0,l=p.length;i<l;i++)if(h=p[i],
void 0===h.boundTo||"vertices"===h.boundTo)if(f=0,e=h.value.length,1===h.size)for(d=0;d<e;d++)g=m[d][1],h.array[d]=h.value[g];else if(2===h.size)for(d=0;d<e;d++)g=m[d][1],g=h.value[g],h.array[f]=g.x,h.array[f+1]=g.y,f+=2;else if(3===h.size)if("c"===h.type)for(d=0;d<e;d++)g=m[d][1],g=h.value[g],h.array[f]=g.r,h.array[f+1]=g.g,h.array[f+2]=g.b,f+=3;else for(d=0;d<e;d++)g=m[d][1],g=h.value[g],h.array[f]=g.x,h.array[f+1]=g.y,h.array[f+2]=g.z,f+=3;else if(4===h.size)for(d=0;d<e;d++)g=m[d][1],g=h.value[g],
h.array[f]=g.x,h.array[f+1]=g.y,h.array[f+2]=g.z,h.array[f+3]=g.w,f+=4}else{if(q)for(d=0;d<g;d++)e=h[d].position,f=3*d,k[f]=e.x,k[f+1]=e.y,k[f+2]=e.z;if(o)for(d=0;d<l;d++)e=i[d],f=3*d,n[f]=e.r,n[f+1]=e.g,n[f+2]=e.b;if(p)for(i=0,l=p.length;i<l;i++)if(h=p[i],h.needsUpdate&&(void 0===h.boundTo||"vertices"===h.boundTo))if(e=h.value.length,f=0,1===h.size)for(d=0;d<e;d++)h.array[d]=h.value[d];else if(2===h.size)for(d=0;d<e;d++)g=h.value[d],h.array[f]=g.x,h.array[f+1]=g.y,f+=2;else if(3===h.size)if("c"===
h.type)for(d=0;d<e;d++)g=h.value[d],h.array[f]=g.r,h.array[f+1]=g.g,h.array[f+2]=g.b,f+=3;else for(d=0;d<e;d++)g=h.value[d],h.array[f]=g.x,h.array[f+1]=g.y,h.array[f+2]=g.z,f+=3;else if(4===h.size)for(d=0;d<e;d++)g=h.value[d],h.array[f]=g.x,h.array[f+1]=g.y,h.array[f+2]=g.z,h.array[f+3]=g.w,f+=4}if(q||c.sortParticles)j.bindBuffer(j.ARRAY_BUFFER,a.__webglVertexBuffer),j.bufferData(j.ARRAY_BUFFER,k,b);if(o||c.sortParticles)j.bindBuffer(j.ARRAY_BUFFER,a.__webglColorBuffer),j.bufferData(j.ARRAY_BUFFER,
n,b);if(p)for(i=0,l=p.length;i<l;i++)if(h=p[i],h.needsUpdate||c.sortParticles)j.bindBuffer(j.ARRAY_BUFFER,h.buffer),j.bufferData(j.ARRAY_BUFFER,h.array,b)}function g(a,b){return b.z-a.z}function h(a,b,c){if(a.length)for(var d=0,e=a.length;d<e;d++)R=y=null,S=T=da=ca=ba=-1,a[d].render(b,c,Ta,ib),R=y=null,S=T=da=ca=ba=-1}function i(a,b,c,d,e,f,g,h){var j,i,l,k;b?(i=a.length-1,k=b=-1):(i=0,b=a.length,k=1);for(var n=i;n!==b;n+=k)if(j=a[n],j.render){i=j.object;l=j.buffer;if(h)j=h;else{j=j[c];if(!j)continue;
g&&G.setBlending(j.blending);G.setDepthTest(j.depthTest);G.setDepthWrite(j.depthWrite);s(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits)}G.setObjectFaces(i);l instanceof THREE.BufferGeometry?G.renderBufferDirect(d,e,f,j,l,i):G.renderBuffer(d,e,f,j,l,i)}}function l(a,b,c,d,e,f,g){for(var h,j,i=0,l=a.length;i<l;i++)if(h=a[i],j=h.object,j.visible){if(g)h=g;else{h=h[b];if(!h)continue;f&&G.setBlending(h.blending);G.setDepthTest(h.depthTest);G.setDepthWrite(h.depthWrite);s(h.polygonOffset,h.polygonOffsetFactor,
h.polygonOffsetUnits)}G.renderImmediateObject(c,d,e,h,j)}}function k(a,b,c){a.push({buffer:b,object:c,opaque:null,transparent:null})}function n(a){for(var b in a.attributes)if(a.attributes[b].needsUpdate)return!0;return!1}function q(a){for(var b in a.attributes)a.attributes[b].needsUpdate=!1}function o(a,b){for(var c=a.length-1;0<=c;c--)a[c].object===b&&a.splice(c,1)}function p(a,b){for(var c=a.length-1;0<=c;c--)a[c]===b&&a.splice(c,1)}function m(a,b,c,d,e){d.program||G.initMaterial(d,b,c,e);if(d.morphTargets&&
!e.__webglMorphTargetInfluences){e.__webglMorphTargetInfluences=new Float32Array(G.maxMorphTargets);for(var f=0,g=G.maxMorphTargets;f<g;f++)e.__webglMorphTargetInfluences[f]=0}var h=!1,f=d.program,g=f.uniforms,i=d.uniforms;f!==y&&(j.useProgram(f),y=f,h=!0);if(d.id!==S)S=d.id,h=!0;if(h||a!==R)j.uniformMatrix4fv(g.projectionMatrix,!1,a._projectionMatrixArray),a!==R&&(R=a);if(h){if(c&&d.fog)if(i.fogColor.value=c.color,c instanceof THREE.Fog)i.fogNear.value=c.near,i.fogFar.value=c.far;else if(c instanceof
THREE.FogExp2)i.fogDensity.value=c.density;if(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d.lights){var l,k=0,n=0,m=0,q,o,p,r=Ba,s=r.directional.colors,t=r.directional.positions,E=r.point.colors,v=r.point.positions,x=r.point.distances,T=0,A=0,C=p=0;for(c=0,h=b.length;c<h;c++)if(l=b[c],!l.onlyShadow)if(q=l.color,o=l.intensity,p=l.distance,l instanceof THREE.AmbientLight)G.gammaInput?(k+=q.r*q.r,n+=q.g*q.g,m+=q.b*q.b):(k+=q.r,n+=q.g,m+=q.b);else if(l instanceof THREE.DirectionalLight)p=
3*T,G.gammaInput?(s[p]=q.r*q.r*o*o,s[p+1]=q.g*q.g*o*o,s[p+2]=q.b*q.b*o*o):(s[p]=q.r*o,s[p+1]=q.g*o,s[p+2]=q.b*o),ra.copy(l.matrixWorld.getPosition()),ra.subSelf(l.target.matrixWorld.getPosition()),ra.normalize(),t[p]=ra.x,t[p+1]=ra.y,t[p+2]=ra.z,T+=1;else if(l instanceof THREE.PointLight||l instanceof THREE.SpotLight)C=3*A,G.gammaInput?(E[C]=q.r*q.r*o*o,E[C+1]=q.g*q.g*o*o,E[C+2]=q.b*q.b*o*o):(E[C]=q.r*o,E[C+1]=q.g*o,E[C+2]=q.b*o),l=l.matrixWorld.getPosition(),v[C]=l.x,v[C+1]=l.y,v[C+2]=l.z,x[A]=p,
A+=1;for(c=3*T,h=s.length;c<h;c++)s[c]=0;for(c=3*A,h=E.length;c<h;c++)E[c]=0;r.point.length=A;r.directional.length=T;r.ambient[0]=k;r.ambient[1]=n;r.ambient[2]=m;c=Ba;i.ambientLightColor.value=c.ambient;i.directionalLightColor.value=c.directional.colors;i.directionalLightDirection.value=c.directional.positions;i.pointLightColor.value=c.point.colors;i.pointLightPosition.value=c.point.positions;i.pointLightDistance.value=c.point.distances}if(d instanceof THREE.MeshBasicMaterial||d instanceof THREE.MeshLambertMaterial||
d instanceof THREE.MeshPhongMaterial)i.opacity.value=d.opacity,G.gammaInput?i.diffuse.value.copyGammaToLinear(d.color):i.diffuse.value=d.color,(i.map.texture=d.map)&&i.offsetRepeat.value.set(d.map.offset.x,d.map.offset.y,d.map.repeat.x,d.map.repeat.y),i.lightMap.texture=d.lightMap,i.envMap.texture=d.envMap,i.flipEnvMap.value=d.envMap instanceof THREE.WebGLRenderTargetCube?1:-1,i.reflectivity.value=d.reflectivity,i.refractionRatio.value=d.refractionRatio,i.combine.value=d.combine,i.useRefract.value=
d.envMap&&d.envMap.mapping instanceof THREE.CubeRefractionMapping;if(d instanceof THREE.LineBasicMaterial)i.diffuse.value=d.color,i.opacity.value=d.opacity;else if(d instanceof THREE.ParticleBasicMaterial)i.psColor.value=d.color,i.opacity.value=d.opacity,i.size.value=d.size,i.scale.value=D.height/2,i.map.texture=d.map;else if(d instanceof THREE.MeshPhongMaterial)i.shininess.value=d.shininess,G.gammaInput?(i.ambient.value.copyGammaToLinear(d.ambient),i.specular.value.copyGammaToLinear(d.specular)):
(i.ambient.value=d.ambient,i.specular.value=d.specular),d.wrapAround&&i.wrapRGB.value.copy(d.wrapRGB);else if(d instanceof THREE.MeshLambertMaterial)G.gammaInput?i.ambient.value.copyGammaToLinear(d.ambient):i.ambient.value=d.ambient,d.wrapAround&&i.wrapRGB.value.copy(d.wrapRGB);else if(d instanceof THREE.MeshDepthMaterial)i.mNear.value=a.near,i.mFar.value=a.far,i.opacity.value=d.opacity;else if(d instanceof THREE.MeshNormalMaterial)i.opacity.value=d.opacity;if(e.receiveShadow&&!d._shadowPass&&i.shadowMatrix){h=
c=0;for(k=b.length;h<k;h++)if(n=b[h],n.castShadow&&(n instanceof THREE.SpotLight||n instanceof THREE.DirectionalLight))i.shadowMap.texture[c]=n.shadowMap,i.shadowMapSize.value[c]=n.shadowMapSize,i.shadowMatrix.value[c]=n.shadowMatrix,i.shadowDarkness.value[c]=n.shadowDarkness,i.shadowBias.value[c]=n.shadowBias,c++}b=d.uniformsList;for(i=0,c=b.length;i<c;i++)if(n=f.uniforms[b[i][1]])if(h=b[i][0],m=h.type,k=h.value,"i"===m)j.uniform1i(n,k);else if("f"===m)j.uniform1f(n,k);else if("v2"===m)j.uniform2f(n,
k.x,k.y);else if("v3"===m)j.uniform3f(n,k.x,k.y,k.z);else if("v4"===m)j.uniform4f(n,k.x,k.y,k.z,k.w);else if("c"===m)j.uniform3f(n,k.r,k.g,k.b);else if("fv1"===m)j.uniform1fv(n,k);else if("fv"===m)j.uniform3fv(n,k);else if("v2v"===m){if(!h._array)h._array=new Float32Array(2*k.length);for(m=0,r=k.length;m<r;m++)s=2*m,h._array[s]=k[m].x,h._array[s+1]=k[m].y;j.uniform2fv(n,h._array)}else if("v3v"===m){if(!h._array)h._array=new Float32Array(3*k.length);for(m=0,r=k.length;m<r;m++)s=3*m,h._array[s]=k[m].x,
h._array[s+1]=k[m].y,h._array[s+2]=k[m].z;j.uniform3fv(n,h._array)}else if("v4v"==m){if(!h._array)h._array=new Float32Array(4*k.length);for(m=0,r=k.length;m<r;m++)s=4*m,h._array[s]=k[m].x,h._array[s+1]=k[m].y,h._array[s+2]=k[m].z,h._array[s+3]=k[m].w;j.uniform4fv(n,h._array)}else if("m4"===m){if(!h._array)h._array=new Float32Array(16);k.flattenToArray(h._array);j.uniformMatrix4fv(n,!1,h._array)}else if("m4v"===m){if(!h._array)h._array=new Float32Array(16*k.length);for(m=0,r=k.length;m<r;m++)k[m].flattenToArrayOffset(h._array,
16*m);j.uniformMatrix4fv(n,!1,h._array)}else if("t"===m){if(j.uniform1i(n,k),n=h.texture)if(n.image instanceof Array&&6===n.image.length){if(h=n,6===h.image.length)if(h.needsUpdate){if(!h.image.__webglTextureCube)h.image.__webglTextureCube=j.createTexture();j.activeTexture(j.TEXTURE0+k);j.bindTexture(j.TEXTURE_CUBE_MAP,h.image.__webglTextureCube);k=[];for(n=0;6>n;n++){m=k;r=n;if(G.autoScaleCubemaps){if(s=h.image[n],E=ab,!(s.width<=E&&s.height<=E))v=Math.max(s.width,s.height),t=Math.floor(s.width*
E/v),E=Math.floor(s.height*E/v),v=document.createElement("canvas"),v.width=t,v.height=E,v.getContext("2d").drawImage(s,0,0,s.width,s.height,0,0,t,E),s=v}else s=h.image[n];m[r]=s}n=k[0];m=0===(n.width&n.width-1)&&0===(n.height&n.height-1);r=B(h.format);s=B(h.type);u(j.TEXTURE_CUBE_MAP,h,m);for(n=0;6>n;n++)j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,r,r,s,k[n]);h.generateMipmaps&&m&&j.generateMipmap(j.TEXTURE_CUBE_MAP);h.needsUpdate=!1;if(h.onUpdated)h.onUpdated()}else j.activeTexture(j.TEXTURE0+
k),j.bindTexture(j.TEXTURE_CUBE_MAP,h.image.__webglTextureCube)}else n instanceof THREE.WebGLRenderTargetCube?(h=n,j.activeTexture(j.TEXTURE0+k),j.bindTexture(j.TEXTURE_CUBE_MAP,h.__webglTexture)):G.setTexture(n,k)}else if("tv"===m){if(!h._array){h._array=[];for(m=0,r=h.texture.length;m<r;m++)h._array[m]=k+m}j.uniform1iv(n,h._array);for(m=0,r=h.texture.length;m<r;m++)(n=h.texture[m])&&G.setTexture(n,h._array[m])}(d instanceof THREE.ShaderMaterial||d instanceof THREE.MeshPhongMaterial||d.envMap)&&
null!==g.cameraPosition&&j.uniform3f(g.cameraPosition,a.position.x,a.position.y,a.position.z);(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.ShaderMaterial||d.skinning)&&null!==g.viewMatrix&&j.uniformMatrix4fv(g.viewMatrix,!1,a._viewMatrixArray);d.skinning&&(j.uniformMatrix4fv(g.cameraInverseMatrix,!1,a._viewMatrixArray),j.uniformMatrix4fv(g.boneGlobalMatrices,!1,e.boneMatrices))}j.uniformMatrix4fv(g.modelViewMatrix,!1,e._modelViewMatrixArray);g.normalMatrix&&
j.uniformMatrix3fv(g.normalMatrix,!1,e._normalMatrixArray);(d instanceof THREE.ShaderMaterial||d.envMap||d.skinning||e.receiveShadow)&&null!==g.objectMatrix&&j.uniformMatrix4fv(g.objectMatrix,!1,e._objectMatrixArray);return f}function r(a,b){a._modelViewMatrix.multiplyToArray(b.matrixWorldInverse,a.matrixWorld,a._modelViewMatrixArray);var c=THREE.Matrix4.makeInvert3x3(a._modelViewMatrix);c&&c.transposeIntoArray(a._normalMatrixArray)}function s(a,b,c){ha!==a&&(a?j.enable(j.POLYGON_OFFSET_FILL):j.disable(j.POLYGON_OFFSET_FILL),
ha=a);if(a&&(Qa!==b||la!==c))j.polygonOffset(b,c),Qa=b,la=c}function t(a,b){var c;"fragment"===a?c=j.createShader(j.FRAGMENT_SHADER):"vertex"===a&&(c=j.createShader(j.VERTEX_SHADER));j.shaderSource(c,b);j.compileShader(c);return!j.getShaderParameter(c,j.COMPILE_STATUS)?(console.error(j.getShaderInfoLog(c)),console.error(b),null):c}function u(a,b,c){c?(j.texParameteri(a,j.TEXTURE_WRAP_S,B(b.wrapS)),j.texParameteri(a,j.TEXTURE_WRAP_T,B(b.wrapT)),j.texParameteri(a,j.TEXTURE_MAG_FILTER,B(b.magFilter)),
j.texParameteri(a,j.TEXTURE_MIN_FILTER,B(b.minFilter))):(j.texParameteri(a,j.TEXTURE_WRAP_S,j.CLAMP_TO_EDGE),j.texParameteri(a,j.TEXTURE_WRAP_T,j.CLAMP_TO_EDGE),j.texParameteri(a,j.TEXTURE_MAG_FILTER,x(b.magFilter)),j.texParameteri(a,j.TEXTURE_MIN_FILTER,x(b.minFilter)))}function v(a,b){j.bindRenderbuffer(j.RENDERBUFFER,a);b.depthBuffer&&!b.stencilBuffer?(j.renderbufferStorage(j.RENDERBUFFER,j.DEPTH_COMPONENT16,b.width,b.height),j.framebufferRenderbuffer(j.FRAMEBUFFER,j.DEPTH_ATTACHMENT,j.RENDERBUFFER,
a)):b.depthBuffer&&b.stencilBuffer?(j.renderbufferStorage(j.RENDERBUFFER,j.DEPTH_STENCIL,b.width,b.height),j.framebufferRenderbuffer(j.FRAMEBUFFER,j.DEPTH_STENCIL_ATTACHMENT,j.RENDERBUFFER,a)):j.renderbufferStorage(j.RENDERBUFFER,j.RGBA4,b.width,b.height)}function x(a){switch(a){case THREE.NearestFilter:case THREE.NearestMipMapNearestFilter:case THREE.NearestMipMapLinearFilter:return j.NEAREST;default:return j.LINEAR}}function B(a){switch(a){case THREE.RepeatWrapping:return j.REPEAT;case THREE.ClampToEdgeWrapping:return j.CLAMP_TO_EDGE;
case THREE.MirroredRepeatWrapping:return j.MIRRORED_REPEAT;case THREE.NearestFilter:return j.NEAREST;case THREE.NearestMipMapNearestFilter:return j.NEAREST_MIPMAP_NEAREST;case THREE.NearestMipMapLinearFilter:return j.NEAREST_MIPMAP_LINEAR;case THREE.LinearFilter:return j.LINEAR;case THREE.LinearMipMapNearestFilter:return j.LINEAR_MIPMAP_NEAREST;case THREE.LinearMipMapLinearFilter:return j.LINEAR_MIPMAP_LINEAR;case THREE.ByteType:return j.BYTE;case THREE.UnsignedByteType:return j.UNSIGNED_BYTE;case THREE.ShortType:return j.SHORT;
case THREE.UnsignedShortType:return j.UNSIGNED_SHORT;case THREE.IntType:return j.INT;case THREE.UnsignedShortType:return j.UNSIGNED_INT;case THREE.FloatType:return j.FLOAT;case THREE.AlphaFormat:return j.ALPHA;case THREE.RGBFormat:return j.RGB;case THREE.RGBAFormat:return j.RGBA;case THREE.LuminanceFormat:return j.LUMINANCE;case THREE.LuminanceAlphaFormat:return j.LUMINANCE_ALPHA}return 0}var a=a||{},D=void 0!==a.canvas?a.canvas:document.createElement("canvas"),C=void 0!==a.precision?a.precision:
"mediump",A=void 0!==a.alpha?a.alpha:!0,H=void 0!==a.premultipliedAlpha?a.premultipliedAlpha:!0,I=void 0!==a.antialias?a.antialias:!1,N=void 0!==a.stencil?a.stencil:!0,$=void 0!==a.preserveDrawingBuffer?a.preserveDrawingBuffer:!1,K=void 0!==a.clearColor?new THREE.Color(a.clearColor):new THREE.Color(0),Q=void 0!==a.clearAlpha?a.clearAlpha:0,L=void 0!==a.maxLights?a.maxLights:4;this.domElement=D;this.context=null;this.autoUpdateScene=this.autoUpdateObjects=this.sortObjects=this.autoClearStencil=this.autoClearDepth=
this.autoClearColor=this.autoClear=!0;this.shadowMapEnabled=this.physicallyBasedShading=this.gammaOutput=this.gammaInput=!1;this.shadowMapCullFrontFaces=this.shadowMapSoft=this.shadowMapAutoUpdate=!0;this.maxMorphTargets=8;this.autoScaleCubemaps=!0;this.renderPluginsPre=[];this.renderPluginsPost=[];this.info={memory:{programs:0,geometries:0,textures:0},render:{calls:0,vertices:0,faces:0,points:0}};var G=this,j,W=[],y=null,E=null,S=-1,T=null,R=null,ka=0,ga=null,V=null,ba=null,ca=null,da=null,ha=null,
Qa=null,la=null,za=null,Aa=0,Ja=0,Da=0,$a=0,Ta=0,ib=0,db=new THREE.Frustum,Wa=new THREE.Matrix4,Xa=new THREE.Vector4,ra=new THREE.Vector3,Ba={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]}};j=function(){var a;try{if(!(a=D.getContext("experimental-webgl",{alpha:A,premultipliedAlpha:H,antialias:I,stencil:N,preserveDrawingBuffer:$})))throw"Error creating WebGL context.";console.log(navigator.userAgent+" | "+a.getParameter(a.VERSION)+
" | "+a.getParameter(a.VENDOR)+" | "+a.getParameter(a.RENDERER)+" | "+a.getParameter(a.SHADING_LANGUAGE_VERSION))}catch(b){console.error(b)}return a}();j.clearColor(0,0,0,1);j.clearDepth(1);j.clearStencil(0);j.enable(j.DEPTH_TEST);j.depthFunc(j.LEQUAL);j.frontFace(j.CCW);j.cullFace(j.BACK);j.enable(j.CULL_FACE);j.enable(j.BLEND);j.blendEquation(j.FUNC_ADD);j.blendFunc(j.SRC_ALPHA,j.ONE_MINUS_SRC_ALPHA);j.clearColor(K.r,K.g,K.b,Q);this.context=j;var ja=j.getParameter(j.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
j.getParameter(j.MAX_TEXTURE_SIZE);var ab=j.getParameter(j.MAX_CUBE_MAP_TEXTURE_SIZE);this.getContext=function(){return j};this.supportsVertexTextures=function(){return 0<ja};this.setSize=function(a,b){D.width=a;D.height=b;this.setViewport(0,0,D.width,D.height)};this.setViewport=function(a,b,c,d){Aa=a;Ja=b;Da=c;$a=d;j.viewport(Aa,Ja,Da,$a)};this.setScissor=function(a,b,c,d){j.scissor(a,b,c,d)};this.enableScissorTest=function(a){a?j.enable(j.SCISSOR_TEST):j.disable(j.SCISSOR_TEST)};this.setClearColorHex=
function(a,b){K.setHex(a);Q=b;j.clearColor(K.r,K.g,K.b,Q)};this.setClearColor=function(a,b){K.copy(a);Q=b;j.clearColor(K.r,K.g,K.b,Q)};this.getClearColor=function(){return K};this.getClearAlpha=function(){return Q};this.clear=function(a,b,c){var d=0;if(void 0===a||a)d|=j.COLOR_BUFFER_BIT;if(void 0===b||b)d|=j.DEPTH_BUFFER_BIT;if(void 0===c||c)d|=j.STENCIL_BUFFER_BIT;j.clear(d)};this.clearTarget=function(a,b,c,d){this.setRenderTarget(a);this.clear(b,c,d)};this.addPostPlugin=function(a){a.init(this);
this.renderPluginsPost.push(a)};this.addPrePlugin=function(a){a.init(this);this.renderPluginsPre.push(a)};this.deallocateObject=function(a){if(a.__webglInit)if(a.__webglInit=!1,delete a._modelViewMatrix,delete a._normalMatrixArray,delete a._modelViewMatrixArray,delete a._objectMatrixArray,a instanceof THREE.Mesh)for(var b in a.geometry.geometryGroups){var c=a.geometry.geometryGroups[b];j.deleteBuffer(c.__webglVertexBuffer);j.deleteBuffer(c.__webglNormalBuffer);j.deleteBuffer(c.__webglTangentBuffer);
j.deleteBuffer(c.__webglColorBuffer);j.deleteBuffer(c.__webglUVBuffer);j.deleteBuffer(c.__webglUV2Buffer);j.deleteBuffer(c.__webglSkinVertexABuffer);j.deleteBuffer(c.__webglSkinVertexBBuffer);j.deleteBuffer(c.__webglSkinIndicesBuffer);j.deleteBuffer(c.__webglSkinWeightsBuffer);j.deleteBuffer(c.__webglFaceBuffer);j.deleteBuffer(c.__webglLineBuffer);if(c.numMorphTargets)for(var d=0,e=c.numMorphTargets;d<e;d++)j.deleteBuffer(c.__webglMorphTargetsBuffers[d]);if(c.__webglCustomAttributesList)for(d in d=
void 0,c.__webglCustomAttributesList)j.deleteBuffer(c.__webglCustomAttributesList[d].buffer);G.info.memory.geometries--}else if(a instanceof THREE.Ribbon)a=a.geometry,j.deleteBuffer(a.__webglVertexBuffer),j.deleteBuffer(a.__webglColorBuffer),G.info.memory.geometries--;else if(a instanceof THREE.Line)a=a.geometry,j.deleteBuffer(a.__webglVertexBuffer),j.deleteBuffer(a.__webglColorBuffer),G.info.memory.geometries--;else if(a instanceof THREE.ParticleSystem)a=a.geometry,j.deleteBuffer(a.__webglVertexBuffer),
j.deleteBuffer(a.__webglColorBuffer),G.info.memory.geometries--};this.deallocateTexture=function(a){if(a.__webglInit)a.__webglInit=!1,j.deleteTexture(a.__webglTexture),G.info.memory.textures--};this.updateShadowMap=function(a,b){y=null;S=T=da=ca=ba=-1;this.shadowMapPlugin.update(a,b)};this.renderBufferImmediate=function(a,b,c){if(!a.__webglVertexBuffer)a.__webglVertexBuffer=j.createBuffer();if(!a.__webglNormalBuffer)a.__webglNormalBuffer=j.createBuffer();a.hasPos&&(j.bindBuffer(j.ARRAY_BUFFER,a.__webglVertexBuffer),
j.bufferData(j.ARRAY_BUFFER,a.positionArray,j.DYNAMIC_DRAW),j.enableVertexAttribArray(b.attributes.position),j.vertexAttribPointer(b.attributes.position,3,j.FLOAT,!1,0,0));if(a.hasNormal){j.bindBuffer(j.ARRAY_BUFFER,a.__webglNormalBuffer);if(c===THREE.FlatShading){var d,e,f,g,h,i,l,k,n,m,q=3*a.count;for(m=0;m<q;m+=9)c=a.normalArray,d=c[m],e=c[m+1],f=c[m+2],g=c[m+3],i=c[m+4],k=c[m+5],h=c[m+6],l=c[m+7],n=c[m+8],d=(d+g+h)/3,e=(e+i+l)/3,f=(f+k+n)/3,c[m]=d,c[m+1]=e,c[m+2]=f,c[m+3]=d,c[m+4]=e,c[m+5]=f,
c[m+6]=d,c[m+7]=e,c[m+8]=f}j.bufferData(j.ARRAY_BUFFER,a.normalArray,j.DYNAMIC_DRAW);j.enableVertexAttribArray(b.attributes.normal);j.vertexAttribPointer(b.attributes.normal,3,j.FLOAT,!1,0,0)}j.drawArrays(j.TRIANGLES,0,a.count);a.count=0};this.renderBufferDirect=function(a,b,c,d,e,f){if(0!==d.opacity&&(c=m(a,b,c,d,f),a=c.attributes,b=!1,d=16777215*e.id+2*c.id+(d.wireframe?1:0),d!==T&&(T=d,b=!0),f instanceof THREE.Mesh)){f=e.offsets;d=0;for(c=f.length;d<c;++d)b&&(j.bindBuffer(j.ARRAY_BUFFER,e.vertexPositionBuffer),
j.vertexAttribPointer(a.position,e.vertexPositionBuffer.itemSize,j.FLOAT,!1,0,12*f[d].index),0<=a.normal&&e.vertexNormalBuffer&&(j.bindBuffer(j.ARRAY_BUFFER,e.vertexNormalBuffer),j.vertexAttribPointer(a.normal,e.vertexNormalBuffer.itemSize,j.FLOAT,!1,0,12*f[d].index)),0<=a.uv&&e.vertexUvBuffer&&(e.vertexUvBuffer?(j.bindBuffer(j.ARRAY_BUFFER,e.vertexUvBuffer),j.vertexAttribPointer(a.uv,e.vertexUvBuffer.itemSize,j.FLOAT,!1,0,8*f[d].index),j.enableVertexAttribArray(a.uv)):j.disableVertexAttribArray(a.uv)),
0<=a.color&&e.vertexColorBuffer&&(j.bindBuffer(j.ARRAY_BUFFER,e.vertexColorBuffer),j.vertexAttribPointer(a.color,e.vertexColorBuffer.itemSize,j.FLOAT,!1,0,16*f[d].index)),j.bindBuffer(j.ELEMENT_ARRAY_BUFFER,e.vertexIndexBuffer)),j.drawElements(j.TRIANGLES,f[d].count,j.UNSIGNED_SHORT,2*f[d].start),G.info.render.calls++,G.info.render.vertices+=f[d].count,G.info.render.faces+=f[d].count/3}};this.renderBuffer=function(a,b,c,d,e,f){if(0!==d.opacity){var g,h,c=m(a,b,c,d,f),b=c.attributes,a=!1,c=16777215*
e.id+2*c.id+(d.wireframe?1:0);c!==T&&(T=c,a=!0);if(!d.morphTargets&&0<=b.position)a&&(j.bindBuffer(j.ARRAY_BUFFER,e.__webglVertexBuffer),j.vertexAttribPointer(b.position,3,j.FLOAT,!1,0,0));else if(f.morphTargetBase){c=d.program.attributes;-1!==f.morphTargetBase?(j.bindBuffer(j.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[f.morphTargetBase]),j.vertexAttribPointer(c.position,3,j.FLOAT,!1,0,0)):0<=c.position&&(j.bindBuffer(j.ARRAY_BUFFER,e.__webglVertexBuffer),j.vertexAttribPointer(c.position,3,j.FLOAT,
!1,0,0));if(f.morphTargetForcedOrder.length){g=0;var i=f.morphTargetForcedOrder;for(h=f.morphTargetInfluences;g<d.numSupportedMorphTargets&&g<i.length;)j.bindBuffer(j.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[i[g]]),j.vertexAttribPointer(c["morphTarget"+g],3,j.FLOAT,!1,0,0),f.__webglMorphTargetInfluences[g]=h[i[g]],g++}else{var i=[],l=-1,k=0;h=f.morphTargetInfluences;var n,q=h.length;g=0;for(-1!==f.morphTargetBase&&(i[f.morphTargetBase]=!0);g<d.numSupportedMorphTargets;){for(n=0;n<q;n++)!i[n]&&h[n]>
l&&(k=n,l=h[k]);j.bindBuffer(j.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[k]);j.vertexAttribPointer(c["morphTarget"+g],3,j.FLOAT,!1,0,0);f.__webglMorphTargetInfluences[g]=l;i[k]=1;l=-1;g++}}null!==d.program.uniforms.morphTargetInfluences&&j.uniform1fv(d.program.uniforms.morphTargetInfluences,f.__webglMorphTargetInfluences)}if(a){if(e.__webglCustomAttributesList)for(g=0,h=e.__webglCustomAttributesList.length;g<h;g++)c=e.__webglCustomAttributesList[g],0<=b[c.buffer.belongsToAttribute]&&(j.bindBuffer(j.ARRAY_BUFFER,
c.buffer),j.vertexAttribPointer(b[c.buffer.belongsToAttribute],c.size,j.FLOAT,!1,0,0));0<=b.color&&(j.bindBuffer(j.ARRAY_BUFFER,e.__webglColorBuffer),j.vertexAttribPointer(b.color,3,j.FLOAT,!1,0,0));0<=b.normal&&(j.bindBuffer(j.ARRAY_BUFFER,e.__webglNormalBuffer),j.vertexAttribPointer(b.normal,3,j.FLOAT,!1,0,0));0<=b.tangent&&(j.bindBuffer(j.ARRAY_BUFFER,e.__webglTangentBuffer),j.vertexAttribPointer(b.tangent,4,j.FLOAT,!1,0,0));0<=b.uv&&(e.__webglUVBuffer?(j.bindBuffer(j.ARRAY_BUFFER,e.__webglUVBuffer),
j.vertexAttribPointer(b.uv,2,j.FLOAT,!1,0,0),j.enableVertexAttribArray(b.uv)):j.disableVertexAttribArray(b.uv));0<=b.uv2&&(e.__webglUV2Buffer?(j.bindBuffer(j.ARRAY_BUFFER,e.__webglUV2Buffer),j.vertexAttribPointer(b.uv2,2,j.FLOAT,!1,0,0),j.enableVertexAttribArray(b.uv2)):j.disableVertexAttribArray(b.uv2));d.skinning&&0<=b.skinVertexA&&0<=b.skinVertexB&&0<=b.skinIndex&&0<=b.skinWeight&&(j.bindBuffer(j.ARRAY_BUFFER,e.__webglSkinVertexABuffer),j.vertexAttribPointer(b.skinVertexA,4,j.FLOAT,!1,0,0),j.bindBuffer(j.ARRAY_BUFFER,
e.__webglSkinVertexBBuffer),j.vertexAttribPointer(b.skinVertexB,4,j.FLOAT,!1,0,0),j.bindBuffer(j.ARRAY_BUFFER,e.__webglSkinIndicesBuffer),j.vertexAttribPointer(b.skinIndex,4,j.FLOAT,!1,0,0),j.bindBuffer(j.ARRAY_BUFFER,e.__webglSkinWeightsBuffer),j.vertexAttribPointer(b.skinWeight,4,j.FLOAT,!1,0,0))}f instanceof THREE.Mesh?(d.wireframe?(d=d.wireframeLinewidth,d!==za&&(j.lineWidth(d),za=d),a&&j.bindBuffer(j.ELEMENT_ARRAY_BUFFER,e.__webglLineBuffer),j.drawElements(j.LINES,e.__webglLineCount,j.UNSIGNED_SHORT,
0)):(a&&j.bindBuffer(j.ELEMENT_ARRAY_BUFFER,e.__webglFaceBuffer),j.drawElements(j.TRIANGLES,e.__webglFaceCount,j.UNSIGNED_SHORT,0)),G.info.render.calls++,G.info.render.vertices+=e.__webglFaceCount,G.info.render.faces+=e.__webglFaceCount/3):f instanceof THREE.Line?(f=f.type===THREE.LineStrip?j.LINE_STRIP:j.LINES,d=d.linewidth,d!==za&&(j.lineWidth(d),za=d),j.drawArrays(f,0,e.__webglLineCount),G.info.render.calls++):f instanceof THREE.ParticleSystem?(j.drawArrays(j.POINTS,0,e.__webglParticleCount),G.info.render.calls++,
G.info.render.points+=e.__webglParticleCount):f instanceof THREE.Ribbon&&(j.drawArrays(j.TRIANGLE_STRIP,0,e.__webglVertexCount),G.info.render.calls++)}};this.render=function(a,b,c,d){var e,f,k,m,n=a.lights,q=a.fog;S=-1;this.autoUpdateObjects&&this.initWebGLObjects(a);void 0===b.parent&&(console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."),a.add(b));this.autoUpdateScene&&a.updateMatrixWorld();h(this.renderPluginsPre,a,b);G.info.render.calls=0;G.info.render.vertices=0;G.info.render.faces=
0;G.info.render.points=0;b.matrixWorldInverse.getInverse(b.matrixWorld);if(!b._viewMatrixArray)b._viewMatrixArray=new Float32Array(16);b.matrixWorldInverse.flattenToArray(b._viewMatrixArray);if(!b._projectionMatrixArray)b._projectionMatrixArray=new Float32Array(16);b.projectionMatrix.flattenToArray(b._projectionMatrixArray);Wa.multiply(b.projectionMatrix,b.matrixWorldInverse);db.setFromMatrix(Wa);this.setRenderTarget(c);(this.autoClear||d)&&this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil);
m=a.__webglObjects;for(d=0,e=m.length;d<e;d++)if(f=m[d],k=f.object,f.render=!1,k.visible&&(!(k instanceof THREE.Mesh||k instanceof THREE.ParticleSystem)||!k.frustumCulled||db.contains(k))){k.matrixWorld.flattenToArray(k._objectMatrixArray);r(k,b);var o=f,p=o.object,t=o.buffer,E=void 0,E=E=void 0,E=p.material;if(E instanceof THREE.MeshFaceMaterial){if(E=t.materialIndex,0<=E)E=p.geometry.materials[E],E.transparent?(o.transparent=E,o.opaque=null):(o.opaque=E,o.transparent=null)}else if(E)E.transparent?
(o.transparent=E,o.opaque=null):(o.opaque=E,o.transparent=null);f.render=!0;if(this.sortObjects)k.renderDepth?f.z=k.renderDepth:(Xa.copy(k.position),Wa.multiplyVector3(Xa),f.z=Xa.z)}this.sortObjects&&m.sort(g);m=a.__webglObjectsImmediate;for(d=0,e=m.length;d<e;d++)if(f=m[d],k=f.object,k.visible)k.matrixAutoUpdate&&k.matrixWorld.flattenToArray(k._objectMatrixArray),r(k,b),k=f.object.material,k.transparent?(f.transparent=k,f.opaque=null):(f.opaque=k,f.transparent=null);a.overrideMaterial?(this.setBlending(a.overrideMaterial.blending),
this.setDepthTest(a.overrideMaterial.depthTest),this.setDepthWrite(a.overrideMaterial.depthWrite),s(a.overrideMaterial.polygonOffset,a.overrideMaterial.polygonOffsetFactor,a.overrideMaterial.polygonOffsetUnits),i(a.__webglObjects,!1,"",b,n,q,!0,a.overrideMaterial),l(a.__webglObjectsImmediate,"",b,n,q,!1,a.overrideMaterial)):(this.setBlending(THREE.NormalBlending),i(a.__webglObjects,!0,"opaque",b,n,q,!1),l(a.__webglObjectsImmediate,"opaque",b,n,q,!1),i(a.__webglObjects,!1,"transparent",b,n,q,!0),l(a.__webglObjectsImmediate,
"transparent",b,n,q,!0));h(this.renderPluginsPost,a,b);c&&c.generateMipmaps&&c.minFilter!==THREE.NearestFilter&&c.minFilter!==THREE.LinearFilter&&(c instanceof THREE.WebGLRenderTargetCube?(j.bindTexture(j.TEXTURE_CUBE_MAP,c.__webglTexture),j.generateMipmap(j.TEXTURE_CUBE_MAP),j.bindTexture(j.TEXTURE_CUBE_MAP,null)):(j.bindTexture(j.TEXTURE_2D,c.__webglTexture),j.generateMipmap(j.TEXTURE_2D),j.bindTexture(j.TEXTURE_2D,null)));this.setDepthTest(!0);this.setDepthWrite(!0)};this.renderImmediateObject=
function(a,b,c,d,e){var f=m(a,b,c,d,e);T=-1;G.setObjectFaces(e);e.immediateRenderCallback?e.immediateRenderCallback(f,j,db):e.render(function(a){G.renderBufferImmediate(a,f,d.shading)})};this.initWebGLObjects=function(a){if(!a.__webglObjects)a.__webglObjects=[],a.__webglObjectsImmediate=[],a.__webglSprites=[],a.__webglFlares=[];for(;a.__objectsAdded.length;){var g=a.__objectsAdded[0],h=a,i=void 0,l=void 0,m=void 0;if(!g.__webglInit)if(g.__webglInit=!0,g._modelViewMatrix=new THREE.Matrix4,g._normalMatrixArray=
new Float32Array(9),g._modelViewMatrixArray=new Float32Array(16),g._objectMatrixArray=new Float32Array(16),g.matrixWorld.flattenToArray(g._objectMatrixArray),g instanceof THREE.Mesh){if(l=g.geometry,l instanceof THREE.Geometry){if(void 0===l.geometryGroups){var r=l,s=void 0,E=void 0,t=void 0,v=void 0,S=void 0,y=void 0,u=void 0,x={},T=r.morphTargets.length;r.geometryGroups={};for(s=0,E=r.faces.length;s<E;s++)t=r.faces[s],v=t.materialIndex,y=void 0!==v?v:-1,void 0===x[y]&&(x[y]={hash:y,counter:0}),
u=x[y].hash+"_"+x[y].counter,void 0===r.geometryGroups[u]&&(r.geometryGroups[u]={faces3:[],faces4:[],materialIndex:v,vertices:0,numMorphTargets:T}),S=t instanceof THREE.Face3?3:4,65535<r.geometryGroups[u].vertices+S&&(x[y].counter+=1,u=x[y].hash+"_"+x[y].counter,void 0===r.geometryGroups[u]&&(r.geometryGroups[u]={faces3:[],faces4:[],materialIndex:v,vertices:0,numMorphTargets:T})),t instanceof THREE.Face3?r.geometryGroups[u].faces3.push(s):r.geometryGroups[u].faces4.push(s),r.geometryGroups[u].vertices+=
S;r.geometryGroupsList=[];var C=void 0;for(C in r.geometryGroups)r.geometryGroups[C].id=ka++,r.geometryGroupsList.push(r.geometryGroups[C])}for(i in l.geometryGroups)if(m=l.geometryGroups[i],!m.__webglVertexBuffer){var A=m;A.__webglVertexBuffer=j.createBuffer();A.__webglNormalBuffer=j.createBuffer();A.__webglTangentBuffer=j.createBuffer();A.__webglColorBuffer=j.createBuffer();A.__webglUVBuffer=j.createBuffer();A.__webglUV2Buffer=j.createBuffer();A.__webglSkinVertexABuffer=j.createBuffer();A.__webglSkinVertexBBuffer=
j.createBuffer();A.__webglSkinIndicesBuffer=j.createBuffer();A.__webglSkinWeightsBuffer=j.createBuffer();A.__webglFaceBuffer=j.createBuffer();A.__webglLineBuffer=j.createBuffer();if(A.numMorphTargets){var B=void 0,D=void 0;A.__webglMorphTargetsBuffers=[];for(B=0,D=A.numMorphTargets;B<D;B++)A.__webglMorphTargetsBuffers.push(j.createBuffer())}G.info.memory.geometries++;var R=m,H=g,L=H.geometry,V=R.faces3,K=R.faces4,I=3*V.length+4*K.length,N=1*V.length+2*K.length,ga=3*V.length+4*K.length,ba=c(H,R),ca=
e(ba),Q=d(ba),da=ba.vertexColors?ba.vertexColors:!1;R.__vertexArray=new Float32Array(3*I);if(Q)R.__normalArray=new Float32Array(3*I);if(L.hasTangents)R.__tangentArray=new Float32Array(4*I);if(da)R.__colorArray=new Float32Array(3*I);if(ca){if(0<L.faceUvs.length||0<L.faceVertexUvs.length)R.__uvArray=new Float32Array(2*I);if(1<L.faceUvs.length||1<L.faceVertexUvs.length)R.__uv2Array=new Float32Array(2*I)}if(H.geometry.skinWeights.length&&H.geometry.skinIndices.length)R.__skinVertexAArray=new Float32Array(4*
I),R.__skinVertexBArray=new Float32Array(4*I),R.__skinIndexArray=new Float32Array(4*I),R.__skinWeightArray=new Float32Array(4*I);R.__faceArray=new Uint16Array(3*N);R.__lineArray=new Uint16Array(2*ga);if(R.numMorphTargets){R.__morphTargetsArrays=[];for(var ha=0,W=R.numMorphTargets;ha<W;ha++)R.__morphTargetsArrays.push(new Float32Array(3*I))}R.__webglFaceCount=3*N;R.__webglLineCount=2*ga;if(ba.attributes){if(void 0===R.__webglCustomAttributesList)R.__webglCustomAttributesList=[];var $=void 0;for($ in ba.attributes){var Qa=
ba.attributes[$],la={},za;for(za in Qa)la[za]=Qa[za];if(!la.__webglInitialized||la.createUniqueBuffers){la.__webglInitialized=!0;var ja=1;"v2"===la.type?ja=2:"v3"===la.type?ja=3:"v4"===la.type?ja=4:"c"===la.type&&(ja=3);la.size=ja;la.array=new Float32Array(I*ja);la.buffer=j.createBuffer();la.buffer.belongsToAttribute=$;Qa.needsUpdate=!0;la.__original=Qa}R.__webglCustomAttributesList.push(la)}}R.__inittedArrays=!0;l.__dirtyVertices=!0;l.__dirtyMorphTargets=!0;l.__dirtyElements=!0;l.__dirtyUvs=!0;l.__dirtyNormals=
!0;l.__dirtyTangents=!0;l.__dirtyColors=!0}}}else if(g instanceof THREE.Ribbon){if(l=g.geometry,!l.__webglVertexBuffer){var ra=l;ra.__webglVertexBuffer=j.createBuffer();ra.__webglColorBuffer=j.createBuffer();G.info.memory.geometries++;var Aa=l,Da=Aa.vertices.length;Aa.__vertexArray=new Float32Array(3*Da);Aa.__colorArray=new Float32Array(3*Da);Aa.__webglVertexCount=Da;l.__dirtyVertices=!0;l.__dirtyColors=!0}}else if(g instanceof THREE.Line){if(l=g.geometry,!l.__webglVertexBuffer){var Ba=l;Ba.__webglVertexBuffer=
j.createBuffer();Ba.__webglColorBuffer=j.createBuffer();G.info.memory.geometries++;var Ja=l,Wa=g,$a=Ja.vertices.length;Ja.__vertexArray=new Float32Array(3*$a);Ja.__colorArray=new Float32Array(3*$a);Ja.__webglLineCount=$a;b(Ja,Wa);l.__dirtyVertices=!0;l.__dirtyColors=!0}}else if(g instanceof THREE.ParticleSystem&&(l=g.geometry,!l.__webglVertexBuffer)){var Xa=l;Xa.__webglVertexBuffer=j.createBuffer();Xa.__webglColorBuffer=j.createBuffer();G.info.geometries++;var Ta=l,db=g,ib=Ta.vertices.length;Ta.__vertexArray=
new Float32Array(3*ib);Ta.__colorArray=new Float32Array(3*ib);Ta.__sortArray=[];Ta.__webglParticleCount=ib;b(Ta,db);l.__dirtyVertices=!0;l.__dirtyColors=!0}if(!g.__webglActive){if(g instanceof THREE.Mesh)if(l=g.geometry,l instanceof THREE.BufferGeometry)k(h.__webglObjects,l,g);else for(i in l.geometryGroups)m=l.geometryGroups[i],k(h.__webglObjects,m,g);else g instanceof THREE.Ribbon||g instanceof THREE.Line||g instanceof THREE.ParticleSystem?(l=g.geometry,k(h.__webglObjects,l,g)):void 0!==THREE.MarchingCubes&&
g instanceof THREE.MarchingCubes||g.immediateRenderCallback?h.__webglObjectsImmediate.push({object:g,opaque:null,transparent:null}):g instanceof THREE.Sprite?h.__webglSprites.push(g):g instanceof THREE.LensFlare&&h.__webglFlares.push(g);g.__webglActive=!0}a.__objectsAdded.splice(0,1)}for(;a.__objectsRemoved.length;){var fb=a.__objectsRemoved[0],ab=a;fb instanceof THREE.Mesh||fb instanceof THREE.ParticleSystem||fb instanceof THREE.Ribbon||fb instanceof THREE.Line?o(ab.__webglObjects,fb):fb instanceof
THREE.Sprite?p(ab.__webglSprites,fb):fb instanceof THREE.LensFlare?p(ab.__webglFlares,fb):(fb instanceof THREE.MarchingCubes||fb.immediateRenderCallback)&&o(ab.__webglObjectsImmediate,fb);fb.__webglActive=!1;a.__objectsRemoved.splice(0,1)}for(var Mc=0,hd=a.__webglObjects.length;Mc<hd;Mc++){var lb=a.__webglObjects[Mc].object,ia=lb.geometry,jc=void 0,$b=void 0,Ua=void 0;if(lb instanceof THREE.Mesh)if(ia instanceof THREE.BufferGeometry)ia.__dirtyVertices=!1,ia.__dirtyElements=!1,ia.__dirtyUvs=!1,ia.__dirtyNormals=
!1,ia.__dirtyColors=!1;else{for(var Nc=0,id=ia.geometryGroupsList.length;Nc<id;Nc++)if(jc=ia.geometryGroupsList[Nc],Ua=c(lb,jc),$b=Ua.attributes&&n(Ua),ia.__dirtyVertices||ia.__dirtyMorphTargets||ia.__dirtyElements||ia.__dirtyUvs||ia.__dirtyNormals||ia.__dirtyColors||ia.__dirtyTangents||$b){var ea=jc,jd=lb,bb=j.DYNAMIC_DRAW,kd=!ia.dynamic,xc=Ua;if(ea.__inittedArrays){var Wc=d(xc),Oc=xc.vertexColors?xc.vertexColors:!1,Xc=e(xc),Yc=Wc===THREE.SmoothShading,F=void 0,U=void 0,kb=void 0,M=void 0,ac=void 0,
Hb=void 0,mb=void 0,yc=void 0,Bb=void 0,bc=void 0,cc=void 0,X=void 0,Y=void 0,Z=void 0,pa=void 0,nb=void 0,ob=void 0,pb=void 0,kc=void 0,qb=void 0,rb=void 0,sb=void 0,lc=void 0,tb=void 0,ub=void 0,vb=void 0,mc=void 0,wb=void 0,xb=void 0,yb=void 0,nc=void 0,Ib=void 0,Jb=void 0,Kb=void 0,zc=void 0,Lb=void 0,Mb=void 0,Nb=void 0,Ac=void 0,ma=void 0,Zc=void 0,Ob=void 0,dc=void 0,ec=void 0,cb=void 0,$c=void 0,Ka=void 0,Ca=0,Ia=0,Cb=0,Db=0,gb=0,Pa=0,qa=0,Ra=0,Fa=0,J=0,Ga=0,z=0,Ya=void 0,La=ea.__vertexArray,
oc=ea.__uvArray,pc=ea.__uv2Array,hb=ea.__normalArray,ta=ea.__tangentArray,Ma=ea.__colorArray,ua=ea.__skinVertexAArray,va=ea.__skinVertexBArray,wa=ea.__skinIndexArray,xa=ea.__skinWeightArray,Pc=ea.__morphTargetsArrays,Qc=ea.__webglCustomAttributesList,w=void 0,zb=ea.__faceArray,Za=ea.__lineArray,Sa=jd.geometry,ld=Sa.__dirtyElements,ad=Sa.__dirtyUvs,md=Sa.__dirtyNormals,nd=Sa.__dirtyTangents,od=Sa.__dirtyColors,pd=Sa.__dirtyMorphTargets,Ub=Sa.vertices,na=ea.faces3,oa=ea.faces4,Ha=Sa.faces,Rc=Sa.faceVertexUvs[0],
Sc=Sa.faceVertexUvs[1],Vb=Sa.skinVerticesA,Wb=Sa.skinVerticesB,Xb=Sa.skinIndices,Pb=Sa.skinWeights,Qb=Sa.morphTargets;if(Sa.__dirtyVertices){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],X=Ub[M.a].position,Y=Ub[M.b].position,Z=Ub[M.c].position,La[Ia]=X.x,La[Ia+1]=X.y,La[Ia+2]=X.z,La[Ia+3]=Y.x,La[Ia+4]=Y.y,La[Ia+5]=Y.z,La[Ia+6]=Z.x,La[Ia+7]=Z.y,La[Ia+8]=Z.z,Ia+=9;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],X=Ub[M.a].position,Y=Ub[M.b].position,Z=Ub[M.c].position,pa=Ub[M.d].position,La[Ia]=X.x,La[Ia+1]=X.y,La[Ia+
2]=X.z,La[Ia+3]=Y.x,La[Ia+4]=Y.y,La[Ia+5]=Y.z,La[Ia+6]=Z.x,La[Ia+7]=Z.y,La[Ia+8]=Z.z,La[Ia+9]=pa.x,La[Ia+10]=pa.y,La[Ia+11]=pa.z,Ia+=12;j.bindBuffer(j.ARRAY_BUFFER,ea.__webglVertexBuffer);j.bufferData(j.ARRAY_BUFFER,La,bb)}if(pd)for(cb=0,$c=Qb.length;cb<$c;cb++){Ga=0;for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],X=Qb[cb].vertices[M.a].position,Y=Qb[cb].vertices[M.b].position,Z=Qb[cb].vertices[M.c].position,Ka=Pc[cb],Ka[Ga]=X.x,Ka[Ga+1]=X.y,Ka[Ga+2]=X.z,Ka[Ga+3]=Y.x,Ka[Ga+4]=Y.y,Ka[Ga+5]=Y.z,Ka[Ga+6]=Z.x,
Ka[Ga+7]=Z.y,Ka[Ga+8]=Z.z,Ga+=9;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],X=Qb[cb].vertices[M.a].position,Y=Qb[cb].vertices[M.b].position,Z=Qb[cb].vertices[M.c].position,pa=Qb[cb].vertices[M.d].position,Ka=Pc[cb],Ka[Ga]=X.x,Ka[Ga+1]=X.y,Ka[Ga+2]=X.z,Ka[Ga+3]=Y.x,Ka[Ga+4]=Y.y,Ka[Ga+5]=Y.z,Ka[Ga+6]=Z.x,Ka[Ga+7]=Z.y,Ka[Ga+8]=Z.z,Ka[Ga+9]=pa.x,Ka[Ga+10]=pa.y,Ka[Ga+11]=pa.z,Ga+=12;j.bindBuffer(j.ARRAY_BUFFER,ea.__webglMorphTargetsBuffers[cb]);j.bufferData(j.ARRAY_BUFFER,Pc[cb],bb)}if(Pb.length){for(F=0,
U=na.length;F<U;F++)M=Ha[na[F]],tb=Pb[M.a],ub=Pb[M.b],vb=Pb[M.c],xa[J]=tb.x,xa[J+1]=tb.y,xa[J+2]=tb.z,xa[J+3]=tb.w,xa[J+4]=ub.x,xa[J+5]=ub.y,xa[J+6]=ub.z,xa[J+7]=ub.w,xa[J+8]=vb.x,xa[J+9]=vb.y,xa[J+10]=vb.z,xa[J+11]=vb.w,wb=Xb[M.a],xb=Xb[M.b],yb=Xb[M.c],wa[J]=wb.x,wa[J+1]=wb.y,wa[J+2]=wb.z,wa[J+3]=wb.w,wa[J+4]=xb.x,wa[J+5]=xb.y,wa[J+6]=xb.z,wa[J+7]=xb.w,wa[J+8]=yb.x,wa[J+9]=yb.y,wa[J+10]=yb.z,wa[J+11]=yb.w,Ib=Vb[M.a],Jb=Vb[M.b],Kb=Vb[M.c],ua[J]=Ib.x,ua[J+1]=Ib.y,ua[J+2]=Ib.z,ua[J+3]=1,ua[J+4]=Jb.x,
ua[J+5]=Jb.y,ua[J+6]=Jb.z,ua[J+7]=1,ua[J+8]=Kb.x,ua[J+9]=Kb.y,ua[J+10]=Kb.z,ua[J+11]=1,Lb=Wb[M.a],Mb=Wb[M.b],Nb=Wb[M.c],va[J]=Lb.x,va[J+1]=Lb.y,va[J+2]=Lb.z,va[J+3]=1,va[J+4]=Mb.x,va[J+5]=Mb.y,va[J+6]=Mb.z,va[J+7]=1,va[J+8]=Nb.x,va[J+9]=Nb.y,va[J+10]=Nb.z,va[J+11]=1,J+=12;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],tb=Pb[M.a],ub=Pb[M.b],vb=Pb[M.c],mc=Pb[M.d],xa[J]=tb.x,xa[J+1]=tb.y,xa[J+2]=tb.z,xa[J+3]=tb.w,xa[J+4]=ub.x,xa[J+5]=ub.y,xa[J+6]=ub.z,xa[J+7]=ub.w,xa[J+8]=vb.x,xa[J+9]=vb.y,xa[J+10]=vb.z,xa[J+
11]=vb.w,xa[J+12]=mc.x,xa[J+13]=mc.y,xa[J+14]=mc.z,xa[J+15]=mc.w,wb=Xb[M.a],xb=Xb[M.b],yb=Xb[M.c],nc=Xb[M.d],wa[J]=wb.x,wa[J+1]=wb.y,wa[J+2]=wb.z,wa[J+3]=wb.w,wa[J+4]=xb.x,wa[J+5]=xb.y,wa[J+6]=xb.z,wa[J+7]=xb.w,wa[J+8]=yb.x,wa[J+9]=yb.y,wa[J+10]=yb.z,wa[J+11]=yb.w,wa[J+12]=nc.x,wa[J+13]=nc.y,wa[J+14]=nc.z,wa[J+15]=nc.w,Ib=Vb[M.a],Jb=Vb[M.b],Kb=Vb[M.c],zc=Vb[M.d],ua[J]=Ib.x,ua[J+1]=Ib.y,ua[J+2]=Ib.z,ua[J+3]=1,ua[J+4]=Jb.x,ua[J+5]=Jb.y,ua[J+6]=Jb.z,ua[J+7]=1,ua[J+8]=Kb.x,ua[J+9]=Kb.y,ua[J+10]=Kb.z,
ua[J+11]=1,ua[J+12]=zc.x,ua[J+13]=zc.y,ua[J+14]=zc.z,ua[J+15]=1,Lb=Wb[M.a],Mb=Wb[M.b],Nb=Wb[M.c],Ac=Wb[M.d],va[J]=Lb.x,va[J+1]=Lb.y,va[J+2]=Lb.z,va[J+3]=1,va[J+4]=Mb.x,va[J+5]=Mb.y,va[J+6]=Mb.z,va[J+7]=1,va[J+8]=Nb.x,va[J+9]=Nb.y,va[J+10]=Nb.z,va[J+11]=1,va[J+12]=Ac.x,va[J+13]=Ac.y,va[J+14]=Ac.z,va[J+15]=1,J+=16;0<J&&(j.bindBuffer(j.ARRAY_BUFFER,ea.__webglSkinVertexABuffer),j.bufferData(j.ARRAY_BUFFER,ua,bb),j.bindBuffer(j.ARRAY_BUFFER,ea.__webglSkinVertexBBuffer),j.bufferData(j.ARRAY_BUFFER,va,bb),
j.bindBuffer(j.ARRAY_BUFFER,ea.__webglSkinIndicesBuffer),j.bufferData(j.ARRAY_BUFFER,wa,bb),j.bindBuffer(j.ARRAY_BUFFER,ea.__webglSkinWeightsBuffer),j.bufferData(j.ARRAY_BUFFER,xa,bb))}if(od&&Oc){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],mb=M.vertexColors,yc=M.color,3===mb.length&&Oc===THREE.VertexColors?(qb=mb[0],rb=mb[1],sb=mb[2]):sb=rb=qb=yc,Ma[Fa]=qb.r,Ma[Fa+1]=qb.g,Ma[Fa+2]=qb.b,Ma[Fa+3]=rb.r,Ma[Fa+4]=rb.g,Ma[Fa+5]=rb.b,Ma[Fa+6]=sb.r,Ma[Fa+7]=sb.g,Ma[Fa+8]=sb.b,Fa+=9;for(F=0,U=oa.length;F<U;F++)M=
Ha[oa[F]],mb=M.vertexColors,yc=M.color,4===mb.length&&Oc===THREE.VertexColors?(qb=mb[0],rb=mb[1],sb=mb[2],lc=mb[3]):lc=sb=rb=qb=yc,Ma[Fa]=qb.r,Ma[Fa+1]=qb.g,Ma[Fa+2]=qb.b,Ma[Fa+3]=rb.r,Ma[Fa+4]=rb.g,Ma[Fa+5]=rb.b,Ma[Fa+6]=sb.r,Ma[Fa+7]=sb.g,Ma[Fa+8]=sb.b,Ma[Fa+9]=lc.r,Ma[Fa+10]=lc.g,Ma[Fa+11]=lc.b,Fa+=12;0<Fa&&(j.bindBuffer(j.ARRAY_BUFFER,ea.__webglColorBuffer),j.bufferData(j.ARRAY_BUFFER,Ma,bb))}if(nd&&Sa.hasTangents){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],Bb=M.vertexTangents,nb=Bb[0],ob=Bb[1],
pb=Bb[2],ta[qa]=nb.x,ta[qa+1]=nb.y,ta[qa+2]=nb.z,ta[qa+3]=nb.w,ta[qa+4]=ob.x,ta[qa+5]=ob.y,ta[qa+6]=ob.z,ta[qa+7]=ob.w,ta[qa+8]=pb.x,ta[qa+9]=pb.y,ta[qa+10]=pb.z,ta[qa+11]=pb.w,qa+=12;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],Bb=M.vertexTangents,nb=Bb[0],ob=Bb[1],pb=Bb[2],kc=Bb[3],ta[qa]=nb.x,ta[qa+1]=nb.y,ta[qa+2]=nb.z,ta[qa+3]=nb.w,ta[qa+4]=ob.x,ta[qa+5]=ob.y,ta[qa+6]=ob.z,ta[qa+7]=ob.w,ta[qa+8]=pb.x,ta[qa+9]=pb.y,ta[qa+10]=pb.z,ta[qa+11]=pb.w,ta[qa+12]=kc.x,ta[qa+13]=kc.y,ta[qa+14]=kc.z,ta[qa+15]=
kc.w,qa+=16;j.bindBuffer(j.ARRAY_BUFFER,ea.__webglTangentBuffer);j.bufferData(j.ARRAY_BUFFER,ta,bb)}if(md&&Wc){for(F=0,U=na.length;F<U;F++)if(M=Ha[na[F]],ac=M.vertexNormals,Hb=M.normal,3===ac.length&&Yc)for(ma=0;3>ma;ma++)Ob=ac[ma],hb[Pa]=Ob.x,hb[Pa+1]=Ob.y,hb[Pa+2]=Ob.z,Pa+=3;else for(ma=0;3>ma;ma++)hb[Pa]=Hb.x,hb[Pa+1]=Hb.y,hb[Pa+2]=Hb.z,Pa+=3;for(F=0,U=oa.length;F<U;F++)if(M=Ha[oa[F]],ac=M.vertexNormals,Hb=M.normal,4===ac.length&&Yc)for(ma=0;4>ma;ma++)Ob=ac[ma],hb[Pa]=Ob.x,hb[Pa+1]=Ob.y,hb[Pa+
2]=Ob.z,Pa+=3;else for(ma=0;4>ma;ma++)hb[Pa]=Hb.x,hb[Pa+1]=Hb.y,hb[Pa+2]=Hb.z,Pa+=3;j.bindBuffer(j.ARRAY_BUFFER,ea.__webglNormalBuffer);j.bufferData(j.ARRAY_BUFFER,hb,bb)}if(ad&&Rc&&Xc){for(F=0,U=na.length;F<U;F++)if(kb=na[F],M=Ha[kb],bc=Rc[kb],void 0!==bc)for(ma=0;3>ma;ma++)dc=bc[ma],oc[Cb]=dc.u,oc[Cb+1]=dc.v,Cb+=2;for(F=0,U=oa.length;F<U;F++)if(kb=oa[F],M=Ha[kb],bc=Rc[kb],void 0!==bc)for(ma=0;4>ma;ma++)dc=bc[ma],oc[Cb]=dc.u,oc[Cb+1]=dc.v,Cb+=2;0<Cb&&(j.bindBuffer(j.ARRAY_BUFFER,ea.__webglUVBuffer),
j.bufferData(j.ARRAY_BUFFER,oc,bb))}if(ad&&Sc&&Xc){for(F=0,U=na.length;F<U;F++)if(kb=na[F],M=Ha[kb],cc=Sc[kb],void 0!==cc)for(ma=0;3>ma;ma++)ec=cc[ma],pc[Db]=ec.u,pc[Db+1]=ec.v,Db+=2;for(F=0,U=oa.length;F<U;F++)if(kb=oa[F],M=Ha[kb],cc=Sc[kb],void 0!==cc)for(ma=0;4>ma;ma++)ec=cc[ma],pc[Db]=ec.u,pc[Db+1]=ec.v,Db+=2;0<Db&&(j.bindBuffer(j.ARRAY_BUFFER,ea.__webglUV2Buffer),j.bufferData(j.ARRAY_BUFFER,pc,bb))}if(ld){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],zb[gb]=Ca,zb[gb+1]=Ca+1,zb[gb+2]=Ca+2,gb+=3,Za[Ra]=
Ca,Za[Ra+1]=Ca+1,Za[Ra+2]=Ca,Za[Ra+3]=Ca+2,Za[Ra+4]=Ca+1,Za[Ra+5]=Ca+2,Ra+=6,Ca+=3;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],zb[gb]=Ca,zb[gb+1]=Ca+1,zb[gb+2]=Ca+3,zb[gb+3]=Ca+1,zb[gb+4]=Ca+2,zb[gb+5]=Ca+3,gb+=6,Za[Ra]=Ca,Za[Ra+1]=Ca+1,Za[Ra+2]=Ca,Za[Ra+3]=Ca+3,Za[Ra+4]=Ca+1,Za[Ra+5]=Ca+2,Za[Ra+6]=Ca+2,Za[Ra+7]=Ca+3,Ra+=8,Ca+=4;j.bindBuffer(j.ELEMENT_ARRAY_BUFFER,ea.__webglFaceBuffer);j.bufferData(j.ELEMENT_ARRAY_BUFFER,zb,bb);j.bindBuffer(j.ELEMENT_ARRAY_BUFFER,ea.__webglLineBuffer);j.bufferData(j.ELEMENT_ARRAY_BUFFER,
Za,bb)}if(Qc)for(ma=0,Zc=Qc.length;ma<Zc;ma++)if(w=Qc[ma],w.__original.needsUpdate){z=0;if(1===w.size)if(void 0===w.boundTo||"vertices"===w.boundTo){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],w.array[z]=w.value[M.a],w.array[z+1]=w.value[M.b],w.array[z+2]=w.value[M.c],z+=3;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],w.array[z]=w.value[M.a],w.array[z+1]=w.value[M.b],w.array[z+2]=w.value[M.c],w.array[z+3]=w.value[M.d],z+=4}else{if("faces"===w.boundTo){for(F=0,U=na.length;F<U;F++)Ya=w.value[na[F]],w.array[z]=
Ya,w.array[z+1]=Ya,w.array[z+2]=Ya,z+=3;for(F=0,U=oa.length;F<U;F++)Ya=w.value[oa[F]],w.array[z]=Ya,w.array[z+1]=Ya,w.array[z+2]=Ya,w.array[z+3]=Ya,z+=4}}else if(2===w.size)if(void 0===w.boundTo||"vertices"===w.boundTo){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],X=w.value[M.a],Y=w.value[M.b],Z=w.value[M.c],w.array[z]=X.x,w.array[z+1]=X.y,w.array[z+2]=Y.x,w.array[z+3]=Y.y,w.array[z+4]=Z.x,w.array[z+5]=Z.y,z+=6;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],X=w.value[M.a],Y=w.value[M.b],Z=w.value[M.c],pa=w.value[M.d],
w.array[z]=X.x,w.array[z+1]=X.y,w.array[z+2]=Y.x,w.array[z+3]=Y.y,w.array[z+4]=Z.x,w.array[z+5]=Z.y,w.array[z+6]=pa.x,w.array[z+7]=pa.y,z+=8}else{if("faces"===w.boundTo){for(F=0,U=na.length;F<U;F++)Z=Y=X=Ya=w.value[na[F]],w.array[z]=X.x,w.array[z+1]=X.y,w.array[z+2]=Y.x,w.array[z+3]=Y.y,w.array[z+4]=Z.x,w.array[z+5]=Z.y,z+=6;for(F=0,U=oa.length;F<U;F++)pa=Z=Y=X=Ya=w.value[oa[F]],w.array[z]=X.x,w.array[z+1]=X.y,w.array[z+2]=Y.x,w.array[z+3]=Y.y,w.array[z+4]=Z.x,w.array[z+5]=Z.y,w.array[z+6]=pa.x,w.array[z+
7]=pa.y,z+=8}}else if(3===w.size){var fa;fa="c"===w.type?["r","g","b"]:["x","y","z"];if(void 0===w.boundTo||"vertices"===w.boundTo){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],X=w.value[M.a],Y=w.value[M.b],Z=w.value[M.c],w.array[z]=X[fa[0]],w.array[z+1]=X[fa[1]],w.array[z+2]=X[fa[2]],w.array[z+3]=Y[fa[0]],w.array[z+4]=Y[fa[1]],w.array[z+5]=Y[fa[2]],w.array[z+6]=Z[fa[0]],w.array[z+7]=Z[fa[1]],w.array[z+8]=Z[fa[2]],z+=9;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],X=w.value[M.a],Y=w.value[M.b],Z=w.value[M.c],
pa=w.value[M.d],w.array[z]=X[fa[0]],w.array[z+1]=X[fa[1]],w.array[z+2]=X[fa[2]],w.array[z+3]=Y[fa[0]],w.array[z+4]=Y[fa[1]],w.array[z+5]=Y[fa[2]],w.array[z+6]=Z[fa[0]],w.array[z+7]=Z[fa[1]],w.array[z+8]=Z[fa[2]],w.array[z+9]=pa[fa[0]],w.array[z+10]=pa[fa[1]],w.array[z+11]=pa[fa[2]],z+=12}else if("faces"===w.boundTo){for(F=0,U=na.length;F<U;F++)Z=Y=X=Ya=w.value[na[F]],w.array[z]=X[fa[0]],w.array[z+1]=X[fa[1]],w.array[z+2]=X[fa[2]],w.array[z+3]=Y[fa[0]],w.array[z+4]=Y[fa[1]],w.array[z+5]=Y[fa[2]],w.array[z+
6]=Z[fa[0]],w.array[z+7]=Z[fa[1]],w.array[z+8]=Z[fa[2]],z+=9;for(F=0,U=oa.length;F<U;F++)pa=Z=Y=X=Ya=w.value[oa[F]],w.array[z]=X[fa[0]],w.array[z+1]=X[fa[1]],w.array[z+2]=X[fa[2]],w.array[z+3]=Y[fa[0]],w.array[z+4]=Y[fa[1]],w.array[z+5]=Y[fa[2]],w.array[z+6]=Z[fa[0]],w.array[z+7]=Z[fa[1]],w.array[z+8]=Z[fa[2]],w.array[z+9]=pa[fa[0]],w.array[z+10]=pa[fa[1]],w.array[z+11]=pa[fa[2]],z+=12}}else if(4===w.size)if(void 0===w.boundTo||"vertices"===w.boundTo){for(F=0,U=na.length;F<U;F++)M=Ha[na[F]],X=w.value[M.a],
Y=w.value[M.b],Z=w.value[M.c],w.array[z]=X.x,w.array[z+1]=X.y,w.array[z+2]=X.z,w.array[z+3]=X.w,w.array[z+4]=Y.x,w.array[z+5]=Y.y,w.array[z+6]=Y.z,w.array[z+7]=Y.w,w.array[z+8]=Z.x,w.array[z+9]=Z.y,w.array[z+10]=Z.z,w.array[z+11]=Z.w,z+=12;for(F=0,U=oa.length;F<U;F++)M=Ha[oa[F]],X=w.value[M.a],Y=w.value[M.b],Z=w.value[M.c],pa=w.value[M.d],w.array[z]=X.x,w.array[z+1]=X.y,w.array[z+2]=X.z,w.array[z+3]=X.w,w.array[z+4]=Y.x,w.array[z+5]=Y.y,w.array[z+6]=Y.z,w.array[z+7]=Y.w,w.array[z+8]=Z.x,w.array[z+
9]=Z.y,w.array[z+10]=Z.z,w.array[z+11]=Z.w,w.array[z+12]=pa.x,w.array[z+13]=pa.y,w.array[z+14]=pa.z,w.array[z+15]=pa.w,z+=16}else if("faces"===w.boundTo){for(F=0,U=na.length;F<U;F++)Z=Y=X=Ya=w.value[na[F]],w.array[z]=X.x,w.array[z+1]=X.y,w.array[z+2]=X.z,w.array[z+3]=X.w,w.array[z+4]=Y.x,w.array[z+5]=Y.y,w.array[z+6]=Y.z,w.array[z+7]=Y.w,w.array[z+8]=Z.x,w.array[z+9]=Z.y,w.array[z+10]=Z.z,w.array[z+11]=Z.w,z+=12;for(F=0,U=oa.length;F<U;F++)pa=Z=Y=X=Ya=w.value[oa[F]],w.array[z]=X.x,w.array[z+1]=X.y,
w.array[z+2]=X.z,w.array[z+3]=X.w,w.array[z+4]=Y.x,w.array[z+5]=Y.y,w.array[z+6]=Y.z,w.array[z+7]=Y.w,w.array[z+8]=Z.x,w.array[z+9]=Z.y,w.array[z+10]=Z.z,w.array[z+11]=Z.w,w.array[z+12]=pa.x,w.array[z+13]=pa.y,w.array[z+14]=pa.z,w.array[z+15]=pa.w,z+=16}j.bindBuffer(j.ARRAY_BUFFER,w.buffer);j.bufferData(j.ARRAY_BUFFER,w.array,bb)}kd&&(delete ea.__inittedArrays,delete ea.__colorArray,delete ea.__normalArray,delete ea.__tangentArray,delete ea.__uvArray,delete ea.__uv2Array,delete ea.__faceArray,delete ea.__vertexArray,
delete ea.__lineArray,delete ea.__skinVertexAArray,delete ea.__skinVertexBArray,delete ea.__skinIndexArray,delete ea.__skinWeightArray)}}ia.__dirtyVertices=!1;ia.__dirtyMorphTargets=!1;ia.__dirtyElements=!1;ia.__dirtyUvs=!1;ia.__dirtyNormals=!1;ia.__dirtyColors=!1;ia.__dirtyTangents=!1;Ua.attributes&&q(Ua)}else if(lb instanceof THREE.Ribbon){if(ia.__dirtyVertices||ia.__dirtyColors){var Rb=ia,bd=j.DYNAMIC_DRAW,qc=void 0,rc=void 0,Bc=void 0,Sb=void 0,Cc=void 0,cd=Rb.vertices,dd=Rb.colors,qd=cd.length,
rd=dd.length,Dc=Rb.__vertexArray,Ec=Rb.__colorArray,sd=Rb.__dirtyColors;if(Rb.__dirtyVertices){for(qc=0;qc<qd;qc++)Bc=cd[qc].position,Sb=3*qc,Dc[Sb]=Bc.x,Dc[Sb+1]=Bc.y,Dc[Sb+2]=Bc.z;j.bindBuffer(j.ARRAY_BUFFER,Rb.__webglVertexBuffer);j.bufferData(j.ARRAY_BUFFER,Dc,bd)}if(sd){for(rc=0;rc<rd;rc++)Cc=dd[rc],Sb=3*rc,Ec[Sb]=Cc.r,Ec[Sb+1]=Cc.g,Ec[Sb+2]=Cc.b;j.bindBuffer(j.ARRAY_BUFFER,Rb.__webglColorBuffer);j.bufferData(j.ARRAY_BUFFER,Ec,bd)}}ia.__dirtyVertices=!1;ia.__dirtyColors=!1}else if(lb instanceof
THREE.Line){Ua=c(lb,jc);$b=Ua.attributes&&n(Ua);if(ia.__dirtyVertices||ia.__dirtyColors||$b){var Eb=ia,Tc=j.DYNAMIC_DRAW,sc=void 0,tc=void 0,Fc=void 0,ya=void 0,Gc=void 0,ed=Eb.vertices,fd=Eb.colors,td=ed.length,ud=fd.length,Hc=Eb.__vertexArray,Ic=Eb.__colorArray,vd=Eb.__dirtyColors,Uc=Eb.__webglCustomAttributesList,Jc=void 0,gd=void 0,Oa=void 0,fc=void 0,Va=void 0,sa=void 0;if(Eb.__dirtyVertices){for(sc=0;sc<td;sc++)Fc=ed[sc].position,ya=3*sc,Hc[ya]=Fc.x,Hc[ya+1]=Fc.y,Hc[ya+2]=Fc.z;j.bindBuffer(j.ARRAY_BUFFER,
Eb.__webglVertexBuffer);j.bufferData(j.ARRAY_BUFFER,Hc,Tc)}if(vd){for(tc=0;tc<ud;tc++)Gc=fd[tc],ya=3*tc,Ic[ya]=Gc.r,Ic[ya+1]=Gc.g,Ic[ya+2]=Gc.b;j.bindBuffer(j.ARRAY_BUFFER,Eb.__webglColorBuffer);j.bufferData(j.ARRAY_BUFFER,Ic,Tc)}if(Uc)for(Jc=0,gd=Uc.length;Jc<gd;Jc++)if(sa=Uc[Jc],sa.needsUpdate&&(void 0===sa.boundTo||"vertices"===sa.boundTo)){ya=0;fc=sa.value.length;if(1===sa.size)for(Oa=0;Oa<fc;Oa++)sa.array[Oa]=sa.value[Oa];else if(2===sa.size)for(Oa=0;Oa<fc;Oa++)Va=sa.value[Oa],sa.array[ya]=Va.x,
sa.array[ya+1]=Va.y,ya+=2;else if(3===sa.size)if("c"===sa.type)for(Oa=0;Oa<fc;Oa++)Va=sa.value[Oa],sa.array[ya]=Va.r,sa.array[ya+1]=Va.g,sa.array[ya+2]=Va.b,ya+=3;else for(Oa=0;Oa<fc;Oa++)Va=sa.value[Oa],sa.array[ya]=Va.x,sa.array[ya+1]=Va.y,sa.array[ya+2]=Va.z,ya+=3;else if(4===sa.size)for(Oa=0;Oa<fc;Oa++)Va=sa.value[Oa],sa.array[ya]=Va.x,sa.array[ya+1]=Va.y,sa.array[ya+2]=Va.z,sa.array[ya+3]=Va.w,ya+=4;j.bindBuffer(j.ARRAY_BUFFER,sa.buffer);j.bufferData(j.ARRAY_BUFFER,sa.array,Tc)}}ia.__dirtyVertices=
!1;ia.__dirtyColors=!1;Ua.attributes&&q(Ua)}else if(lb instanceof THREE.ParticleSystem)Ua=c(lb,jc),$b=Ua.attributes&&n(Ua),(ia.__dirtyVertices||ia.__dirtyColors||lb.sortParticles||$b)&&f(ia,j.DYNAMIC_DRAW,lb),ia.__dirtyVertices=!1,ia.__dirtyColors=!1,Ua.attributes&&q(Ua)}};this.initMaterial=function(a,b,c,d){var e,f,g,h,i;a instanceof THREE.MeshDepthMaterial?i="depth":a instanceof THREE.MeshNormalMaterial?i="normal":a instanceof THREE.MeshBasicMaterial?i="basic":a instanceof THREE.MeshLambertMaterial?
i="lambert":a instanceof THREE.MeshPhongMaterial?i="phong":a instanceof THREE.LineBasicMaterial?i="basic":a instanceof THREE.ParticleBasicMaterial&&(i="particle_basic");if(i){var l=THREE.ShaderLib[i];a.uniforms=THREE.UniformsUtils.clone(l.uniforms);a.vertexShader=l.vertexShader;a.fragmentShader=l.fragmentShader}var k,m;f=l=0;for(k=0,m=b.length;k<m;k++)e=b[k],e.onlyShadow||(e instanceof THREE.DirectionalLight&&f++,e instanceof THREE.PointLight&&l++,e instanceof THREE.SpotLight&&l++);l+f<=L?k=f:(k=
Math.ceil(L*f/(l+f)),l=L-k);e=k;f=l;var n=0;for(l=0,k=b.length;l<k;l++)m=b[l],m.castShadow&&(m instanceof THREE.SpotLight||m instanceof THREE.DirectionalLight)&&n++;var q=50;if(void 0!==d&&d instanceof THREE.SkinnedMesh)q=d.bones.length;var o;a:{k=a.fragmentShader;m=a.vertexShader;var l=a.uniforms,b=a.attributes,c={map:!!a.map,envMap:!!a.envMap,lightMap:!!a.lightMap,vertexColors:a.vertexColors,fog:c,useFog:a.fog,sizeAttenuation:a.sizeAttenuation,skinning:a.skinning,morphTargets:a.morphTargets,maxMorphTargets:this.maxMorphTargets,
maxDirLights:e,maxPointLights:f,maxBones:q,shadowMapEnabled:this.shadowMapEnabled&&d.receiveShadow,shadowMapSoft:this.shadowMapSoft,maxShadows:n,alphaTest:a.alphaTest,metal:a.metal,perPixel:a.perPixel,wrapAround:a.wrapAround},p,d=[];i?d.push(i):(d.push(k),d.push(m));for(p in c)d.push(p),d.push(c[p]);i=d.join();for(p=0,d=W.length;p<d;p++)if(W[p].code===i){o=W[p].program;break a}p=j.createProgram();d=[0<ja?"#define VERTEX_TEXTURES":"",G.gammaInput?"#define GAMMA_INPUT":"",G.gammaOutput?"#define GAMMA_OUTPUT":
"",G.physicallyBasedShading?"#define PHYSICALLY_BASED_SHADING":"","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_SHADOWS "+c.maxShadows,"#define MAX_BONES "+c.maxBones,c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"",c.skinning?"#define USE_SKINNING":"",c.morphTargets?"#define USE_MORPHTARGETS":"",c.perPixel?"#define PHONG_PER_PIXEL":"",c.wrapAround?"#define WRAP_AROUND":
"",c.shadowMapEnabled?"#define USE_SHADOWMAP":"",c.shadowMapSoft?"#define SHADOWMAP_SOFT":"",c.sizeAttenuation?"#define USE_SIZEATTENUATION":"","uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
e=["precision "+C+" float;","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_SHADOWS "+c.maxShadows,c.alphaTest?"#define ALPHATEST "+c.alphaTest:"",G.gammaInput?"#define GAMMA_INPUT":"",G.gammaOutput?"#define GAMMA_OUTPUT":"",G.physicallyBasedShading?"#define PHYSICALLY_BASED_SHADING":"",c.useFog&&c.fog?"#define USE_FOG":"",c.useFog&&c.fog instanceof THREE.FogExp2?"#define FOG_EXP2":"",c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?
"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"",c.metal?"#define METAL":"",c.perPixel?"#define PHONG_PER_PIXEL":"",c.wrapAround?"#define WRAP_AROUND":"",c.shadowMapEnabled?"#define USE_SHADOWMAP":"",c.shadowMapSoft?"#define SHADOWMAP_SOFT":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");j.attachShader(p,t("fragment",e+k));j.attachShader(p,t("vertex",d+m));j.linkProgram(p);j.getProgramParameter(p,j.LINK_STATUS)||console.error("Could not initialise shader\nVALIDATE_STATUS: "+
j.getProgramParameter(p,j.VALIDATE_STATUS)+", gl error ["+j.getError()+"]");p.uniforms={};p.attributes={};var r,d="viewMatrix,modelViewMatrix,projectionMatrix,normalMatrix,objectMatrix,cameraPosition,cameraInverseMatrix,boneGlobalMatrices,morphTargetInfluences".split(",");for(r in l)d.push(r);r=d;for(d=0,l=r.length;d<l;d++)k=r[d],p.uniforms[k]=j.getUniformLocation(p,k);d="position,normal,uv,uv2,tangent,color,skinVertexA,skinVertexB,skinIndex,skinWeight".split(",");for(r=0;r<c.maxMorphTargets;r++)d.push("morphTarget"+
r);for(o in b)d.push(o);o=d;for(r=0,b=o.length;r<b;r++)c=o[r],p.attributes[c]=j.getAttribLocation(p,c);p.id=W.length;W.push({program:p,code:i});G.info.memory.programs=W.length;o=p}a.program=o;o=a.program.attributes;0<=o.position&&j.enableVertexAttribArray(o.position);0<=o.color&&j.enableVertexAttribArray(o.color);0<=o.normal&&j.enableVertexAttribArray(o.normal);0<=o.tangent&&j.enableVertexAttribArray(o.tangent);a.skinning&&0<=o.skinVertexA&&0<=o.skinVertexB&&0<=o.skinIndex&&0<=o.skinWeight&&(j.enableVertexAttribArray(o.skinVertexA),
j.enableVertexAttribArray(o.skinVertexB),j.enableVertexAttribArray(o.skinIndex),j.enableVertexAttribArray(o.skinWeight));if(a.attributes)for(h in a.attributes)void 0!==o[h]&&0<=o[h]&&j.enableVertexAttribArray(o[h]);if(a.morphTargets)for(h=a.numSupportedMorphTargets=0;h<this.maxMorphTargets;h++)r="morphTarget"+h,0<=o[r]&&(j.enableVertexAttribArray(o[r]),a.numSupportedMorphTargets++);a.uniformsList=[];for(g in a.uniforms)a.uniformsList.push([a.uniforms[g],g])};this.setFaceCulling=function(a,b){a?(!b||
"ccw"===b?j.frontFace(j.CCW):j.frontFace(j.CW),"back"===a?j.cullFace(j.BACK):"front"===a?j.cullFace(j.FRONT):j.cullFace(j.FRONT_AND_BACK),j.enable(j.CULL_FACE)):j.disable(j.CULL_FACE)};this.setObjectFaces=function(a){if(ga!==a.doubleSided)a.doubleSided?j.disable(j.CULL_FACE):j.enable(j.CULL_FACE),ga=a.doubleSided;if(V!==a.flipSided)a.flipSided?j.frontFace(j.CW):j.frontFace(j.CCW),V=a.flipSided};this.setDepthTest=function(a){ca!==a&&(a?j.enable(j.DEPTH_TEST):j.disable(j.DEPTH_TEST),ca=a)};this.setDepthWrite=
function(a){da!==a&&(j.depthMask(a),da=a)};this.setBlending=function(a){if(a!==ba){switch(a){case THREE.AdditiveBlending:j.blendEquation(j.FUNC_ADD);j.blendFunc(j.SRC_ALPHA,j.ONE);break;case THREE.SubtractiveBlending:j.blendEquation(j.FUNC_ADD);j.blendFunc(j.ZERO,j.ONE_MINUS_SRC_COLOR);break;case THREE.MultiplyBlending:j.blendEquation(j.FUNC_ADD);j.blendFunc(j.ZERO,j.SRC_COLOR);break;default:j.blendEquationSeparate(j.FUNC_ADD,j.FUNC_ADD),j.blendFuncSeparate(j.SRC_ALPHA,j.ONE_MINUS_SRC_ALPHA,j.ONE,
j.ONE_MINUS_SRC_ALPHA)}ba=a}};this.setTexture=function(a,b){if(a.needsUpdate){if(!a.__webglInit)a.__webglInit=!0,a.__webglTexture=j.createTexture(),G.info.memory.textures++;j.activeTexture(j.TEXTURE0+b);j.bindTexture(j.TEXTURE_2D,a.__webglTexture);var c=a.image,d=0===(c.width&c.width-1)&&0===(c.height&c.height-1),e=B(a.format),f=B(a.type);u(j.TEXTURE_2D,a,d);a instanceof THREE.DataTexture?j.texImage2D(j.TEXTURE_2D,0,e,c.width,c.height,0,e,f,c.data):j.texImage2D(j.TEXTURE_2D,0,e,e,f,a.image);a.generateMipmaps&&
d&&j.generateMipmap(j.TEXTURE_2D);a.needsUpdate=!1;if(a.onUpdated)a.onUpdated()}else j.activeTexture(j.TEXTURE0+b),j.bindTexture(j.TEXTURE_2D,a.__webglTexture)};this.setRenderTarget=function(a){var b=a instanceof THREE.WebGLRenderTargetCube;if(a&&!a.__webglFramebuffer){if(void 0===a.depthBuffer)a.depthBuffer=!0;if(void 0===a.stencilBuffer)a.stencilBuffer=!0;a.__webglTexture=j.createTexture();var c=0===(a.width&a.width-1)&&0===(a.height&a.height-1),d=B(a.format),e=B(a.type);if(b){a.__webglFramebuffer=
[];a.__webglRenderbuffer=[];j.bindTexture(j.TEXTURE_CUBE_MAP,a.__webglTexture);u(j.TEXTURE_CUBE_MAP,a,c);for(c=0;6>c;c++){a.__webglFramebuffer[c]=j.createFramebuffer();a.__webglRenderbuffer[c]=j.createRenderbuffer();j.texImage2D(j.TEXTURE_CUBE_MAP_POSITIVE_X+c,0,d,a.width,a.height,0,d,e,null);var f=a,g=j.TEXTURE_CUBE_MAP_POSITIVE_X+c;j.bindFramebuffer(j.FRAMEBUFFER,a.__webglFramebuffer[c]);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,g,f.__webglTexture,0);v(a.__webglRenderbuffer[c],a)}}else a.__webglFramebuffer=
j.createFramebuffer(),a.__webglRenderbuffer=j.createRenderbuffer(),j.bindTexture(j.TEXTURE_2D,a.__webglTexture),u(j.TEXTURE_2D,a,c),j.texImage2D(j.TEXTURE_2D,0,d,a.width,a.height,0,d,e,null),d=j.TEXTURE_2D,j.bindFramebuffer(j.FRAMEBUFFER,a.__webglFramebuffer),j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,d,a.__webglTexture,0),v(a.__webglRenderbuffer,a);b?j.bindTexture(j.TEXTURE_CUBE_MAP,null):j.bindTexture(j.TEXTURE_2D,null);j.bindRenderbuffer(j.RENDERBUFFER,null);j.bindFramebuffer(j.FRAMEBUFFER,
null)}a?(b=b?a.__webglFramebuffer[a.activeCubeFace]:a.__webglFramebuffer,d=a.width,a=a.height,c=e=0):(b=null,d=Da,a=$a,e=Aa,c=Ja);b!==E&&(j.bindFramebuffer(j.FRAMEBUFFER,b),j.viewport(e,c,d,a),E=b);Ta=d;ib=a};this.shadowMapPlugin=new THREE.ShadowMapPlugin;this.addPrePlugin(this.shadowMapPlugin);this.addPostPlugin(new THREE.SpritePlugin);this.addPostPlugin(new THREE.LensFlarePlugin)};
THREE.WebGLRenderTarget=function(a,b,c){this.width=a;this.height=b;c=c||{};this.wrapS=void 0!==c.wrapS?c.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=void 0!==c.wrapT?c.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=void 0!==c.magFilter?c.magFilter:THREE.LinearFilter;this.minFilter=void 0!==c.minFilter?c.minFilter:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.format=void 0!==c.format?c.format:THREE.RGBAFormat;this.type=void 0!==c.type?c.type:
THREE.UnsignedByteType;this.depthBuffer=void 0!==c.depthBuffer?c.depthBuffer:!0;this.stencilBuffer=void 0!==c.stencilBuffer?c.stencilBuffer:!0;this.generateMipmaps=!0};
THREE.WebGLRenderTarget.prototype.clone=function(){var a=new THREE.WebGLRenderTarget(this.width,this.height);a.wrapS=this.wrapS;a.wrapT=this.wrapT;a.magFilter=this.magFilter;a.minFilter=this.minFilter;a.offset.copy(this.offset);a.repeat.copy(this.repeat);a.format=this.format;a.type=this.type;a.depthBuffer=this.depthBuffer;a.stencilBuffer=this.stencilBuffer;return a};THREE.WebGLRenderTargetCube=function(a,b,c){THREE.WebGLRenderTarget.call(this,a,b,c);this.activeCubeFace=0};
THREE.WebGLRenderTargetCube.prototype=new THREE.WebGLRenderTarget;THREE.WebGLRenderTargetCube.prototype.constructor=THREE.WebGLRenderTargetCube;THREE.RenderableVertex=function(){this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=!0};THREE.RenderableVertex.prototype.copy=function(a){this.positionWorld.copy(a.positionWorld);this.positionScreen.copy(a.positionScreen)};
THREE.RenderableFace3=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterial=this.material=null;this.uvs=[[]];this.z=null};
THREE.RenderableFace4=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.v4=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterial=this.material=null;this.uvs=[[]];this.z=null};THREE.RenderableObject=function(){this.z=this.object=null};
THREE.RenderableParticle=function(){this.rotation=this.z=this.y=this.x=null;this.scale=new THREE.Vector2;this.material=null};THREE.RenderableLine=function(){this.z=null;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.material=null};
THREE.ColorUtils={adjustHSV:function(a,b,c,d){var e=THREE.ColorUtils.__hsv;THREE.ColorUtils.rgbToHsv(a,e);e.h=THREE.Math.clamp(e.h+b,0,1);e.s=THREE.Math.clamp(e.s+c,0,1);e.v=THREE.Math.clamp(e.v+d,0,1);a.setHSV(e.h,e.s,e.v)},rgbToHsv:function(a,b){var c=a.r,d=a.g,e=a.b,f=Math.max(Math.max(c,d),e),g=Math.min(Math.min(c,d),e);if(g===f)g=c=0;else{var h=f-g,g=h/f,c=(c===f?(d-e)/h:d===f?2+(e-c)/h:4+(c-d)/h)/6;0>c&&(c+=1);1<c&&(c-=1)}void 0===b&&(b={h:0,s:0,v:0});b.h=c;b.s=g;b.v=f;return b}};
THREE.ColorUtils.__hsv={h:0,s:0,v:0};
THREE.GeometryUtils={merge:function(a,b){for(var c,d,e=a.vertices.length,f=b instanceof THREE.Mesh?b.geometry:b,g=a.vertices,h=f.vertices,i=a.faces,l=f.faces,k=a.faceVertexUvs[0],n=f.faceVertexUvs[0],q={},o=0;o<a.materials.length;o++)q[a.materials[o].id]=o;if(b instanceof THREE.Mesh)b.matrixAutoUpdate&&b.updateMatrix(),c=b.matrix,d=new THREE.Matrix4,d.extractRotation(c,b.scale);for(var o=0,p=h.length;o<p;o++){var m=new THREE.Vertex(h[o].position.clone());c&&c.multiplyVector3(m.position);g.push(m)}for(o=
0,p=l.length;o<p;o++){var g=l[o],r,s,t=g.vertexNormals,u=g.vertexColors;g instanceof THREE.Face3?r=new THREE.Face3(g.a+e,g.b+e,g.c+e):g instanceof THREE.Face4&&(r=new THREE.Face4(g.a+e,g.b+e,g.c+e,g.d+e));r.normal.copy(g.normal);d&&d.multiplyVector3(r.normal);h=0;for(m=t.length;h<m;h++)s=t[h].clone(),d&&d.multiplyVector3(s),r.vertexNormals.push(s);r.color.copy(g.color);h=0;for(m=u.length;h<m;h++)s=u[h],r.vertexColors.push(s.clone());if(void 0!==g.materialIndex){h=f.materials[g.materialIndex];m=h.id;
u=q[m];if(void 0===u)u=a.materials.length,q[m]=u,a.materials.push(h);r.materialIndex=u}r.centroid.copy(g.centroid);c&&c.multiplyVector3(r.centroid);i.push(r)}for(o=0,p=n.length;o<p;o++){c=n[o];d=[];h=0;for(m=c.length;h<m;h++)d.push(new THREE.UV(c[h].u,c[h].v));k.push(d)}},clone:function(a){var b=new THREE.Geometry,c,d=a.vertices,e=a.faces,f=a.faceVertexUvs[0];if(a.materials)b.materials=a.materials.slice();for(a=0,c=d.length;a<c;a++){var g=new THREE.Vertex(d[a].position.clone());b.vertices.push(g)}for(a=
0,c=e.length;a<c;a++){var h=e[a],i,l,k=h.vertexNormals,n=h.vertexColors;h instanceof THREE.Face3?i=new THREE.Face3(h.a,h.b,h.c):h instanceof THREE.Face4&&(i=new THREE.Face4(h.a,h.b,h.c,h.d));i.normal.copy(h.normal);d=0;for(g=k.length;d<g;d++)l=k[d],i.vertexNormals.push(l.clone());i.color.copy(h.color);d=0;for(g=n.length;d<g;d++)l=n[d],i.vertexColors.push(l.clone());i.materialIndex=h.materialIndex;i.centroid.copy(h.centroid);b.faces.push(i)}for(a=0,c=f.length;a<c;a++){e=f[a];i=[];d=0;for(g=e.length;d<
g;d++)i.push(new THREE.UV(e[d].u,e[d].v));b.faceVertexUvs[0].push(i)}return b},randomPointInTriangle:function(a,b,c){var d,e,f,g=new THREE.Vector3,h=THREE.GeometryUtils.__v1;d=THREE.GeometryUtils.random();e=THREE.GeometryUtils.random();1<d+e&&(d=1-d,e=1-e);f=1-d-e;g.copy(a);g.multiplyScalar(d);h.copy(b);h.multiplyScalar(e);g.addSelf(h);h.copy(c);h.multiplyScalar(f);g.addSelf(h);return g},randomPointInFace:function(a,b,c){var d,e,f;if(a instanceof THREE.Face3)return d=b.vertices[a.a].position,e=b.vertices[a.b].position,
f=b.vertices[a.c].position,THREE.GeometryUtils.randomPointInTriangle(d,e,f);if(a instanceof THREE.Face4){d=b.vertices[a.a].position;e=b.vertices[a.b].position;f=b.vertices[a.c].position;var b=b.vertices[a.d].position,g;c?a._area1&&a._area2?(c=a._area1,g=a._area2):(c=THREE.GeometryUtils.triangleArea(d,e,b),g=THREE.GeometryUtils.triangleArea(e,f,b),a._area1=c,a._area2=g):(c=THREE.GeometryUtils.triangleArea(d,e,b),g=THREE.GeometryUtils.triangleArea(e,f,b));return THREE.GeometryUtils.random()*(c+g)<c?
THREE.GeometryUtils.randomPointInTriangle(d,e,b):THREE.GeometryUtils.randomPointInTriangle(e,f,b)}},randomPointsInGeometry:function(a,b){function c(a){function b(c,d){if(d<c)return c;var e=c+Math.floor((d-c)/2);return l[e]>a?b(c,e-1):l[e]<a?b(e+1,d):e}return b(0,l.length-1)}var d,e,f=a.faces,g=a.vertices,h=f.length,i=0,l=[],k,n,q,o;for(e=0;e<h;e++){d=f[e];if(d instanceof THREE.Face3)k=g[d.a].position,n=g[d.b].position,q=g[d.c].position,d._area=THREE.GeometryUtils.triangleArea(k,n,q);else if(d instanceof
THREE.Face4)k=g[d.a].position,n=g[d.b].position,q=g[d.c].position,o=g[d.d].position,d._area1=THREE.GeometryUtils.triangleArea(k,n,o),d._area2=THREE.GeometryUtils.triangleArea(n,q,o),d._area=d._area1+d._area2;i+=d._area;l[e]=i}d=[];for(e=0;e<b;e++)g=THREE.GeometryUtils.random()*i,g=c(g),d[e]=THREE.GeometryUtils.randomPointInFace(f[g],a,!0);return d},triangleArea:function(a,b,c){var d,e=THREE.GeometryUtils.__v1;e.sub(a,b);d=e.length();e.sub(a,c);a=e.length();e.sub(b,c);c=e.length();b=0.5*(d+a+c);return Math.sqrt(b*
(b-d)*(b-a)*(b-c))},center:function(a){a.computeBoundingBox();var b=a.boundingBox,c=new THREE.Vector3;c.add(b.min,b.max);c.multiplyScalar(-0.5);a.applyMatrix((new THREE.Matrix4).setTranslation(c.x,c.y,c.z));a.computeBoundingBox();return c},normalizeUVs:function(a){for(var a=a.faceVertexUvs[0],b=0,c=a.length;b<c;b++)for(var d=a[b],e=0,f=d.length;e<f;e++)1!==d[e].u&&(d[e].u-=Math.floor(d[e].u)),1!==d[e].v&&(d[e].v-=Math.floor(d[e].v))}};THREE.GeometryUtils.random=THREE.Math.random16;
THREE.GeometryUtils.__v1=new THREE.Vector3;
THREE.ImageUtils={crossOrigin:"",loadTexture:function(a,b,c){var d=new Image,e=new THREE.Texture(d,b);d.onload=function(){e.needsUpdate=!0;c&&c(this)};d.crossOrigin=this.crossOrigin;d.src=a;return e},loadTextureCube:function(a,b,c){var d,e=[],f=new THREE.Texture(e,b);e.loadCount=0;for(b=0,d=a.length;b<d;++b)e[b]=new Image,e[b].onload=function(){e.loadCount+=1;if(6===e.loadCount)f.needsUpdate=!0;c&&c(this)},e[b].crossOrigin="",e[b].src=a[b];return f},getNormalMap:function(a,b){var c=function(a){var b=
Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);return[a[0]/b,a[1]/b,a[2]/b]},b=b|1,d=a.width,e=a.height,f=document.createElement("canvas");f.width=d;f.height=e;var g=f.getContext("2d");g.drawImage(a,0,0);for(var h=g.getImageData(0,0,d,e).data,i=g.createImageData(d,e),l=i.data,k=0;k<d;k++)for(var n=1;n<e;n++){var q=0>n-1?e-1:n-1,o=(n+1)%e,p=0>k-1?d-1:k-1,m=(k+1)%d,r=[],s=[0,0,h[4*(n*d+k)]/255*b];r.push([-1,0,h[4*(n*d+p)]/255*b]);r.push([-1,-1,h[4*(q*d+p)]/255*b]);r.push([0,-1,h[4*(q*d+k)]/255*b]);r.push([1,
-1,h[4*(q*d+m)]/255*b]);r.push([1,0,h[4*(n*d+m)]/255*b]);r.push([1,1,h[4*(o*d+m)]/255*b]);r.push([0,1,h[4*(o*d+k)]/255*b]);r.push([-1,1,h[4*(o*d+p)]/255*b]);q=[];p=r.length;for(o=0;o<p;o++){var m=r[o],t=r[(o+1)%p],m=[m[0]-s[0],m[1]-s[1],m[2]-s[2]],t=[t[0]-s[0],t[1]-s[1],t[2]-s[2]];q.push(c([m[1]*t[2]-m[2]*t[1],m[2]*t[0]-m[0]*t[2],m[0]*t[1]-m[1]*t[0]]))}r=[0,0,0];for(o=0;o<q.length;o++)r[0]+=q[o][0],r[1]+=q[o][1],r[2]+=q[o][2];r[0]/=q.length;r[1]/=q.length;r[2]/=q.length;s=4*(n*d+k);l[s]=255*((r[0]+
1)/2)|0;l[s+1]=255*(r[1]+0.5)|0;l[s+2]=255*r[2]|0;l[s+3]=255}g.putImageData(i,0,0);return f}};
THREE.SceneUtils={showHierarchy:function(a,b){THREE.SceneUtils.traverseHierarchy(a,function(a){a.visible=b})},traverseHierarchy:function(a,b){var c,d,e=a.children.length;for(d=0;d<e;d++)c=a.children[d],b(c),THREE.SceneUtils.traverseHierarchy(c,b)},createMultiMaterialObject:function(a,b){var c,d=b.length,e=new THREE.Object3D;for(c=0;c<d;c++){var f=new THREE.Mesh(a,b[c]);e.add(f)}return e},cloneObject:function(a){var b;a instanceof THREE.MorphAnimMesh?(b=new THREE.MorphAnimMesh(a.geometry,a.material),
b.duration=a.duration,b.mirroredLoop=a.mirroredLoop,b.time=a.time,b.lastKeyframe=a.lastKeyframe,b.currentKeyframe=a.currentKeyframe,b.direction=a.direction,b.directionBackwards=a.directionBackwards):a instanceof THREE.SkinnedMesh?b=new THREE.SkinnedMesh(a.geometry,a.material):a instanceof THREE.Mesh?b=new THREE.Mesh(a.geometry,a.material):a instanceof THREE.Line?b=new THREE.Line(a.geometry,a.material,a.type):a instanceof THREE.Ribbon?b=new THREE.Ribbon(a.geometry,a.material):a instanceof THREE.ParticleSystem?
(b=new THREE.ParticleSystem(a.geometry,a.material),b.sortParticles=a.sortParticles):a instanceof THREE.Particle?b=new THREE.Particle(a.material):a instanceof THREE.Sprite?(b=new THREE.Sprite({}),b.color.copy(a.color),b.map=a.map,b.blending=a.blending,b.useScreenCoordinates=a.useScreenCoordinates,b.mergeWith3D=a.mergeWith3D,b.affectedByDistance=a.affectedByDistance,b.scaleByViewport=a.scaleByViewport,b.alignment=a.alignment,b.rotation3d.copy(a.rotation3d),b.rotation=a.rotation,b.opacity=a.opacity,
b.uvOffset.copy(a.uvOffset),b.uvScale.copy(a.uvScale)):a instanceof THREE.LOD?b=new THREE.LOD:a instanceof THREE.MarchingCubes?(b=new THREE.MarchingCubes(a.resolution,a.material),b.field.set(a.field),b.isolation=a.isolation):a instanceof THREE.Object3D&&(b=new THREE.Object3D);b.name=a.name;b.parent=a.parent;b.up.copy(a.up);b.position.copy(a.position);b.rotation instanceof THREE.Vector3&&b.rotation.copy(a.rotation);b.eulerOrder=a.eulerOrder;b.scale.copy(a.scale);b.dynamic=a.dynamic;b.doubleSided=a.doubleSided;
b.flipSided=a.flipSided;b.renderDepth=a.renderDepth;b.rotationAutoUpdate=a.rotationAutoUpdate;b.matrix.copy(a.matrix);b.matrixWorld.copy(a.matrixWorld);b.matrixRotationWorld.copy(a.matrixRotationWorld);b.matrixAutoUpdate=a.matrixAutoUpdate;b.matrixWorldNeedsUpdate=a.matrixWorldNeedsUpdate;b.quaternion.copy(a.quaternion);b.useQuaternion=a.useQuaternion;b.boundRadius=a.boundRadius;b.boundRadiusScale=a.boundRadiusScale;b.visible=a.visible;b.castShadow=a.castShadow;b.receiveShadow=a.receiveShadow;b.frustumCulled=
a.frustumCulled;for(var c=0;c<a.children.length;c++){var d=THREE.SceneUtils.cloneObject(a.children[c]);b.children[c]=d;d.parent=b}if(a instanceof THREE.LOD)for(c=0;c<a.LODs.length;c++)b.LODs[c]={visibleAtDistance:a.LODs[c].visibleAtDistance,object3D:b.children[c]};return b}};
if(THREE.WebGLRenderer)THREE.ShaderUtils={lib:{fresnel:{uniforms:{mRefractionRatio:{type:"f",value:1.02},mFresnelBias:{type:"f",value:0.1},mFresnelPower:{type:"f",value:2},mFresnelScale:{type:"f",value:1},tCube:{type:"t",value:1,texture:null}},fragmentShader:"uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
vertexShader:"uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"},
normal:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{enableAO:{type:"i",value:0},enableDiffuse:{type:"i",value:0},enableSpecular:{type:"i",value:0},enableReflection:{type:"i",value:0},tDiffuse:{type:"t",value:0,texture:null},tCube:{type:"t",value:1,texture:null},tNormal:{type:"t",value:2,texture:null},tSpecular:{type:"t",value:3,texture:null},tAO:{type:"t",value:4,texture:null},tDisplacement:{type:"t",value:5,texture:null},uNormalScale:{type:"f",
value:1},uDisplacementBias:{type:"f",value:0},uDisplacementScale:{type:"f",value:1},uDiffuseColor:{type:"c",value:new THREE.Color(15658734)},uSpecularColor:{type:"c",value:new THREE.Color(1118481)},uAmbientColor:{type:"c",value:new THREE.Color(328965)},uShininess:{type:"f",value:30},uOpacity:{type:"f",value:1},uReflectivity:{type:"f",value:0.5},uOffset:{type:"v2",value:new THREE.Vector2(0,0)},uRepeat:{type:"v2",value:new THREE.Vector2(1,1)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),fragmentShader:["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;",
THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nfloat pointDistance = vPointLight[ i ].w;\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;\nif ( enableReflection ) {\nvec3 wPos = cameraPosition - vViewPosition;\nvec3 vReflect = reflect( normalize( wPos ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;",
THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvViewPosition = -mvPosition.xyz;\nvNormal = normalMatrix * normal;\nvTangent = normalMatrix * tangent.xyz;\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvUv = uv * uRepeat + uOffset;\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( normalize( vNormal.xyz ) * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif",
THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n")},cube:{uniforms:{tCube:{type:"t",value:1,texture:null},tFlip:{type:"f",value:-1}},vertexShader:"varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"}}};
THREE.BufferGeometry=function(){this.id=THREE.GeometryCount++;this.vertexColorArray=this.vertexUvArray=this.vertexNormalArray=this.vertexPositionArray=this.vertexIndexArray=this.vertexColorBuffer=this.vertexUvBuffer=this.vertexNormalBuffer=this.vertexPositionBuffer=this.vertexIndexBuffer=null;this.dynamic=!1;this.boundingSphere=this.boundingBox=null;this.morphTargets=[]};THREE.BufferGeometry.prototype={constructor:THREE.BufferGeometry,computeBoundingBox:function(){},computeBoundingSphere:function(){}};
THREE.Curve=function(){};THREE.Curve.prototype.getPoint=function(){console.log("Warning, getPoint() not implemented!");return null};THREE.Curve.prototype.getPointAt=function(a){return this.getPoint(this.getUtoTmapping(a))};THREE.Curve.prototype.getPoints=function(a){a||(a=5);var b,c=[];for(b=0;b<=a;b++)c.push(this.getPoint(b/a));return c};THREE.Curve.prototype.getSpacedPoints=function(a){a||(a=5);var b,c=[];for(b=0;b<=a;b++)c.push(this.getPointAt(b/a));return c};
THREE.Curve.prototype.getLength=function(){var a=this.getLengths();return a[a.length-1]};THREE.Curve.prototype.getLengths=function(a){a||(a=200);if(this.cacheArcLengths&&this.cacheArcLengths.length==a+1)return this.cacheArcLengths;var b=[],c,d=this.getPoint(0),e,f=0;b.push(0);for(e=1;e<=a;e++)c=this.getPoint(e/a),f+=c.distanceTo(d),b.push(f),d=c;return this.cacheArcLengths=b};
THREE.Curve.prototype.getUtoTmapping=function(a,b){var c=this.getLengths(),d=0,e=c.length,f;f=b?b:a*c[e-1];for(var g=0,h=e-1,i;g<=h;)if(d=Math.floor(g+(h-g)/2),i=c[d]-f,0>i)g=d+1;else if(0<i)h=d-1;else{h=d;break}d=h;if(c[d]==f)return d/(e-1);g=c[d];return c=(d+(f-g)/(c[d+1]-g))/(e-1)};THREE.Curve.prototype.getNormalVector=function(a){a=this.getTangent(a);return new THREE.Vector2(-a.y,a.x)};
THREE.Curve.prototype.getTangent=function(a){var b=a-1.0E-4,a=a+1.0E-4;0>b&&(b=0);1<a&&(a=1);b=this.getPoint(b);a=this.getPoint(a);return b.clone().subSelf(a).normalize()};THREE.Curve.prototype.getTangentAt=function(a){return this.getTangent(this.getUtoTmapping(a))};THREE.LineCurve=function(a,b){a instanceof THREE.Vector2?(this.v1=a,this.v2=b):THREE.LineCurve.oldConstructor.apply(this,arguments)};
THREE.LineCurve.oldConstructor=function(a,b,c,d){this.constructor(new THREE.Vector2(a,b),new THREE.Vector2(c,d))};THREE.LineCurve.prototype=new THREE.Curve;THREE.LineCurve.prototype.constructor=THREE.LineCurve;THREE.LineCurve.prototype.getPoint=function(a){var b=new THREE.Vector2;b.sub(this.v2,this.v1);b.multiplyScalar(a).addSelf(this.v1);return b};THREE.LineCurve.prototype.getPointAt=function(a){return this.getPoint(a)};
THREE.LineCurve.prototype.getTangent=function(){var a=new THREE.Vector2;a.sub(this.v2,this.v1);a.normalize();return a};THREE.QuadraticBezierCurve=function(a,b,c){if(!(b instanceof THREE.Vector2))var d=Array.prototype.slice.call(arguments),a=new THREE.Vector2(d[0],d[1]),b=new THREE.Vector2(d[2],d[3]),c=new THREE.Vector2(d[4],d[5]);this.v0=a;this.v1=b;this.v2=c};THREE.QuadraticBezierCurve.prototype=new THREE.Curve;THREE.QuadraticBezierCurve.prototype.constructor=THREE.QuadraticBezierCurve;
THREE.QuadraticBezierCurve.prototype.getPoint=function(a){var b;b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x);a=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y);return new THREE.Vector2(b,a)};THREE.QuadraticBezierCurve.prototype.getTangent=function(a){var b;b=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.x,this.v1.x,this.v2.x);a=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.y,this.v1.y,this.v2.y);b=new THREE.Vector2(b,a);b.normalize();return b};
THREE.CubicBezierCurve=function(a,b,c,d){if(!(b instanceof THREE.Vector2))var e=Array.prototype.slice.call(arguments),a=new THREE.Vector2(e[0],e[1]),b=new THREE.Vector2(e[2],e[3]),c=new THREE.Vector2(e[4],e[5]),d=new THREE.Vector2(e[6],e[7]);this.v0=a;this.v1=b;this.v2=c;this.v3=d};THREE.CubicBezierCurve.prototype=new THREE.Curve;THREE.CubicBezierCurve.prototype.constructor=THREE.CubicBezierCurve;
THREE.CubicBezierCurve.prototype.getPoint=function(a){var b;b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);a=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);return new THREE.Vector2(b,a)};THREE.CubicBezierCurve.prototype.getTangent=function(a){var b;b=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);a=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);b=new THREE.Vector2(b,a);b.normalize();return b};
THREE.SplineCurve=function(a){this.points=void 0==a?[]:a};THREE.SplineCurve.prototype=new THREE.Curve;THREE.SplineCurve.prototype.constructor=THREE.SplineCurve;
THREE.SplineCurve.prototype.getPoint=function(a){var b=new THREE.Vector2,c=[],d=this.points,e;e=(d.length-1)*a;a=Math.floor(e);e-=a;c[0]=0==a?a:a-1;c[1]=a;c[2]=a>d.length-2?a:a+1;c[3]=a>d.length-3?a:a+2;b.x=THREE.Curve.Utils.interpolate(d[c[0]].x,d[c[1]].x,d[c[2]].x,d[c[3]].x,e);b.y=THREE.Curve.Utils.interpolate(d[c[0]].y,d[c[1]].y,d[c[2]].y,d[c[3]].y,e);return b};THREE.ArcCurve=function(a,b,c,d,e,f){this.aX=a;this.aY=b;this.aRadius=c;this.aStartAngle=d;this.aEndAngle=e;this.aClockwise=f};
THREE.ArcCurve.prototype=new THREE.Curve;THREE.ArcCurve.prototype.constructor=THREE.ArcCurve;THREE.ArcCurve.prototype.getPoint=function(a){var b=this.aEndAngle-this.aStartAngle;this.aClockwise||(a=1-a);b=this.aStartAngle+a*b;a=this.aX+this.aRadius*Math.cos(b);b=this.aY+this.aRadius*Math.sin(b);return new THREE.Vector2(a,b)};
THREE.Curve.Utils={tangentQuadraticBezier:function(a,b,c,d){return 2*(1-a)*(c-b)+2*a*(d-c)},tangentCubicBezier:function(a,b,c,d,e){return-3*b*(1-a)*(1-a)+3*c*(1-a)*(1-a)-6*a*c*(1-a)+6*a*d*(1-a)-3*a*a*d+3*a*a*e},tangentSpline:function(a){return 6*a*a-6*a+(3*a*a-4*a+1)+(-6*a*a+6*a)+(3*a*a-2*a)},interpolate:function(a,b,c,d,e){var a=0.5*(c-a),d=0.5*(d-b),f=e*e;return(2*b-2*c+a+d)*e*f+(-3*b+3*c-2*a-d)*f+a*e+b}};
THREE.Curve.create=function(a,b){a.prototype=new THREE.Curve;a.prototype.constructor=a;a.prototype.getPoint=b;return a};THREE.LineCurve3=THREE.Curve.create(function(a,b){this.v1=a;this.v2=b},function(a){var b=new THREE.Vector3;b.sub(this.v2,this.v1);b.multiplyScalar(a);b.addSelf(this.v1);return b});
THREE.QuadraticBezierCurve3=THREE.Curve.create(function(a,b,c){this.v0=a;this.v1=b;this.v2=c},function(a){var b,c;b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x);c=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y);a=THREE.Shape.Utils.b2(a,this.v0.z,this.v1.z,this.v2.z);return new THREE.Vector3(b,c,a)});
THREE.CubicBezierCurve3=THREE.Curve.create(function(a,b,c,d){this.v0=a;this.v1=b;this.v2=c;this.v3=d},function(a){var b,c;b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);c=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);a=THREE.Shape.Utils.b3(a,this.v0.z,this.v1.z,this.v2.z,this.v3.z);return new THREE.Vector3(b,c,a)});
THREE.SplineCurve3=THREE.Curve.create(function(a){this.points=void 0==a?[]:a},function(a){var b=new THREE.Vector3,c=[],d=this.points,e;e=(d.length-1)*a;a=Math.floor(e);e-=a;c[0]=0==a?a:a-1;c[1]=a;c[2]=a>d.length-2?a:a+1;c[3]=a>d.length-3?a:a+2;b.x=THREE.Curve.Utils.interpolate(d[c[0]].x,d[c[1]].x,d[c[2]].x,d[c[3]].x,e);b.y=THREE.Curve.Utils.interpolate(d[c[0]].y,d[c[1]].y,d[c[2]].y,d[c[3]].y,e);b.z=THREE.Curve.Utils.interpolate(d[c[0]].z,d[c[1]].z,d[c[2]].z,d[c[3]].z,e);return b});
THREE.CurvePath=function(){this.curves=[];this.bends=[];this.autoClose=!1};THREE.CurvePath.prototype=new THREE.Curve;THREE.CurvePath.prototype.constructor=THREE.CurvePath;THREE.CurvePath.prototype.add=function(a){this.curves.push(a)};THREE.CurvePath.prototype.checkConnection=function(){};THREE.CurvePath.prototype.closePath=function(){var a=this.curves[0].getPoint(0),b=this.curves[this.curves.length-1].getPoint(1);a.equals(b)||this.curves.push(new THREE.LineCurve(b,a))};
THREE.CurvePath.prototype.getPoint=function(a){for(var b=a*this.getLength(),c=this.getCurveLengths(),a=0;a<c.length;){if(c[a]>=b)return b=c[a]-b,a=this.curves[a],b=1-b/a.getLength(),a.getPointAt(b);a++}return null};THREE.CurvePath.prototype.getLength=function(){var a=this.getCurveLengths();return a[a.length-1]};
THREE.CurvePath.prototype.getCurveLengths=function(){if(this.cacheLengths&&this.cacheLengths.length==this.curves.length)return this.cacheLengths;var a=[],b=0,c,d=this.curves.length;for(c=0;c<d;c++)b+=this.curves[c].getLength(),a.push(b);return this.cacheLengths=a};
THREE.CurvePath.prototype.getBoundingBox=function(){var a=this.getPoints(),b,c,d,e;b=c=Number.NEGATIVE_INFINITY;d=e=Number.POSITIVE_INFINITY;var f,g,h,i;i=new THREE.Vector2;for(g=0,h=a.length;g<h;g++){f=a[g];if(f.x>b)b=f.x;else if(f.x<d)d=f.x;if(f.y>c)c=f.y;else if(f.y<c)e=f.y;i.addSelf(f.x,f.y)}return{minX:d,minY:e,maxX:b,maxY:c,centroid:i.divideScalar(h)}};THREE.CurvePath.prototype.createPointsGeometry=function(a){return this.createGeometry(this.getPoints(a,!0))};
THREE.CurvePath.prototype.createSpacedPointsGeometry=function(a){return this.createGeometry(this.getSpacedPoints(a,!0))};THREE.CurvePath.prototype.createGeometry=function(a){for(var b=new THREE.Geometry,c=0;c<a.length;c++)b.vertices.push(new THREE.Vertex(new THREE.Vector3(a[c].x,a[c].y,0)));return b};THREE.CurvePath.prototype.addWrapPath=function(a){this.bends.push(a)};
THREE.CurvePath.prototype.getTransformedPoints=function(a,b){var c=this.getPoints(a),d,e;if(!b)b=this.bends;for(d=0,e=b.length;d<e;d++)c=this.getWrapPoints(c,b[d]);return c};THREE.CurvePath.prototype.getTransformedSpacedPoints=function(a,b){var c=this.getSpacedPoints(a),d,e;if(!b)b=this.bends;for(d=0,e=b.length;d<e;d++)c=this.getWrapPoints(c,b[d]);return c};
THREE.CurvePath.prototype.getWrapPoints=function(a,b){var c=this.getBoundingBox(),d,e,f,g,h,i;for(d=0,e=a.length;d<e;d++)f=a[d],g=f.x,h=f.y,i=g/c.maxX,i=b.getUtoTmapping(i,g),g=b.getPoint(i),h=b.getNormalVector(i).multiplyScalar(h),f.x=g.x+h.x,f.y=g.y+h.y;return a};THREE.Gyroscope=function(){THREE.Object3D.call(this)};THREE.Gyroscope.prototype=new THREE.Object3D;THREE.Gyroscope.prototype.constructor=THREE.Gyroscope;
THREE.Gyroscope.prototype.updateMatrixWorld=function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)this.parent?(this.matrixWorld.multiply(this.parent.matrixWorld,this.matrix),this.matrixWorld.decompose(this.translationWorld,this.rotationWorld,this.scaleWorld),this.matrix.decompose(this.translationObject,this.rotationObject,this.scaleObject),this.matrixWorld.compose(this.translationWorld,this.rotationObject,this.scaleWorld)):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=
!1,a=!0;for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)};THREE.Gyroscope.prototype.translationWorld=new THREE.Vector3;THREE.Gyroscope.prototype.translationObject=new THREE.Vector3;THREE.Gyroscope.prototype.rotationWorld=new THREE.Quaternion;THREE.Gyroscope.prototype.rotationObject=new THREE.Quaternion;THREE.Gyroscope.prototype.scaleWorld=new THREE.Vector3;THREE.Gyroscope.prototype.scaleObject=new THREE.Vector3;
THREE.Path=function(a){THREE.CurvePath.call(this);this.actions=[];a&&this.fromPoints(a)};THREE.Path.prototype=new THREE.CurvePath;THREE.Path.prototype.constructor=THREE.Path;THREE.PathActions={MOVE_TO:"moveTo",LINE_TO:"lineTo",QUADRATIC_CURVE_TO:"quadraticCurveTo",BEZIER_CURVE_TO:"bezierCurveTo",CSPLINE_THRU:"splineThru",ARC:"arc"};THREE.Path.prototype.fromPoints=function(a){this.moveTo(a[0].x,a[0].y);for(var b=1,c=a.length;b<c;b++)this.lineTo(a[b].x,a[b].y)};
THREE.Path.prototype.moveTo=function(a,b){var c=Array.prototype.slice.call(arguments);this.actions.push({action:THREE.PathActions.MOVE_TO,args:c})};THREE.Path.prototype.lineTo=function(a,b){var c=Array.prototype.slice.call(arguments),d=this.actions[this.actions.length-1].args;this.curves.push(new THREE.LineCurve(new THREE.Vector2(d[d.length-2],d[d.length-1]),new THREE.Vector2(a,b)));this.actions.push({action:THREE.PathActions.LINE_TO,args:c})};
THREE.Path.prototype.quadraticCurveTo=function(a,b,c,d){var e=Array.prototype.slice.call(arguments),f=this.actions[this.actions.length-1].args;this.curves.push(new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length-2],f[f.length-1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d)));this.actions.push({action:THREE.PathActions.QUADRATIC_CURVE_TO,args:e})};
THREE.Path.prototype.bezierCurveTo=function(a,b,c,d,e,f){var g=Array.prototype.slice.call(arguments),h=this.actions[this.actions.length-1].args;this.curves.push(new THREE.CubicBezierCurve(new THREE.Vector2(h[h.length-2],h[h.length-1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d),new THREE.Vector2(e,f)));this.actions.push({action:THREE.PathActions.BEZIER_CURVE_TO,args:g})};
THREE.Path.prototype.splineThru=function(a){var b=Array.prototype.slice.call(arguments),c=this.actions[this.actions.length-1].args,c=[new THREE.Vector2(c[c.length-2],c[c.length-1])];Array.prototype.push.apply(c,a);this.curves.push(new THREE.SplineCurve(c));this.actions.push({action:THREE.PathActions.CSPLINE_THRU,args:b})};
THREE.Path.prototype.arc=function(a,b,c,d,e,f){var g=Array.prototype.slice.call(arguments);this.curves.push(new THREE.ArcCurve(a,b,c,d,e,f));this.actions.push({action:THREE.PathActions.ARC,args:g})};THREE.Path.prototype.getSpacedPoints=function(a){a||(a=40);for(var b=[],c=0;c<a;c++)b.push(this.getPoint(c/a));return b};
THREE.Path.prototype.getPoints=function(a,b){var a=a||12,c=[],d,e,f,g,h,i,l,k,n,q,o,p,m;for(d=0,e=this.actions.length;d<e;d++)switch(f=this.actions[d],g=f.action,f=f.args,g){case THREE.PathActions.LINE_TO:c.push(new THREE.Vector2(f[0],f[1]));break;case THREE.PathActions.QUADRATIC_CURVE_TO:h=f[2];i=f[3];n=f[0];q=f[1];0<c.length?(g=c[c.length-1],o=g.x,p=g.y):(g=this.actions[d-1].args,o=g[g.length-2],p=g[g.length-1]);for(g=1;g<=a;g++)m=g/a,f=THREE.Shape.Utils.b2(m,o,n,h),m=THREE.Shape.Utils.b2(m,p,q,
i),c.push(new THREE.Vector2(f,m));break;case THREE.PathActions.BEZIER_CURVE_TO:h=f[4];i=f[5];n=f[0];q=f[1];l=f[2];k=f[3];0<c.length?(g=c[c.length-1],o=g.x,p=g.y):(g=this.actions[d-1].args,o=g[g.length-2],p=g[g.length-1]);for(g=1;g<=a;g++)m=g/a,f=THREE.Shape.Utils.b3(m,o,n,l,h),m=THREE.Shape.Utils.b3(m,p,q,k,i),c.push(new THREE.Vector2(f,m));break;case THREE.PathActions.CSPLINE_THRU:g=this.actions[d-1].args;g=[new THREE.Vector2(g[g.length-2],g[g.length-1])];m=a*f[0].length;g=g.concat(f[0]);f=new THREE.SplineCurve(g);
for(g=1;g<=m;g++)c.push(f.getPointAt(g/m));break;case THREE.PathActions.ARC:g=this.actions[d-1].args;h=f[0];i=f[1];l=f[2];n=f[3];m=f[4];q=!!f[5];k=g[g.length-2];o=g[g.length-1];0==g.length&&(k=o=0);p=m-n;var r=2*a;for(g=1;g<=r;g++)m=g/r,q||(m=1-m),m=n+m*p,f=k+h+l*Math.cos(m),m=o+i+l*Math.sin(m),c.push(new THREE.Vector2(f,m))}b&&c.push(c[0]);return c};THREE.Path.prototype.transform=function(a,b){this.getBoundingBox();return this.getWrapPoints(this.getPoints(b),a)};
THREE.Path.prototype.nltransform=function(a,b,c,d,e,f){var g=this.getPoints(),h,i,l,k,n;for(h=0,i=g.length;h<i;h++)l=g[h],k=l.x,n=l.y,l.x=a*k+b*n+c,l.y=d*n+e*k+f;return g};
THREE.Path.prototype.debug=function(a){var b=this.getBoundingBox();a||(a=document.createElement("canvas"),a.setAttribute("width",b.maxX+100),a.setAttribute("height",b.maxY+100),document.body.appendChild(a));b=a.getContext("2d");b.fillStyle="white";b.fillRect(0,0,a.width,a.height);b.strokeStyle="black";b.beginPath();var c,d,e;for(a=0,c=this.actions.length;a<c;a++)d=this.actions[a],e=d.args,d=d.action,d!=THREE.PathActions.CSPLINE_THRU&&b[d].apply(b,e);b.stroke();b.closePath();b.strokeStyle="red";d=
this.getPoints();for(a=0,c=d.length;a<c;a++)e=d[a],b.beginPath(),b.arc(e.x,e.y,1.5,0,2*Math.PI,!1),b.stroke(),b.closePath()};
THREE.Path.prototype.toShapes=function(){var a,b,c,d,e=[],f=new THREE.Path;for(a=0,b=this.actions.length;a<b;a++)c=this.actions[a],d=c.args,c=c.action,c==THREE.PathActions.MOVE_TO&&0!=f.actions.length&&(e.push(f),f=new THREE.Path),f[c].apply(f,d);0!=f.actions.length&&e.push(f);if(0==e.length)return[];var g;d=[];a=!THREE.Shape.Utils.isClockWise(e[0].getPoints());if(1==e.length)return f=e[0],g=new THREE.Shape,g.actions=f.actions,g.curves=f.curves,d.push(g),d;if(a){g=new THREE.Shape;for(a=0,b=e.length;a<
b;a++)f=e[a],THREE.Shape.Utils.isClockWise(f.getPoints())?(g.actions=f.actions,g.curves=f.curves,d.push(g),g=new THREE.Shape):g.holes.push(f)}else{for(a=0,b=e.length;a<b;a++)f=e[a],THREE.Shape.Utils.isClockWise(f.getPoints())?(g&&d.push(g),g=new THREE.Shape,g.actions=f.actions,g.curves=f.curves):g.holes.push(f);d.push(g)}return d};THREE.Shape=function(){THREE.Path.apply(this,arguments);this.holes=[]};THREE.Shape.prototype=new THREE.Path;THREE.Shape.prototype.constructor=THREE.Path;
THREE.Shape.prototype.extrude=function(a){return new THREE.ExtrudeGeometry(this,a)};THREE.Shape.prototype.getPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;b<c;b++)d[b]=this.holes[b].getTransformedPoints(a,this.bends);return d};THREE.Shape.prototype.getSpacedPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;b<c;b++)d[b]=this.holes[b].getTransformedSpacedPoints(a,this.bends);return d};
THREE.Shape.prototype.extractAllPoints=function(a){return{shape:this.getTransformedPoints(a),holes:this.getPointsHoles(a)}};THREE.Shape.prototype.extractAllSpacedPoints=function(a){return{shape:this.getTransformedSpacedPoints(a),holes:this.getSpacedPointsHoles(a)}};
THREE.Shape.Utils={removeHoles:function(a,b){var c=a.concat(),d=c.concat(),e,f,g,h,i,l,k,n,q,o,p=[];for(i=0;i<b.length;i++){l=b[i];Array.prototype.push.apply(d,l);f=Number.POSITIVE_INFINITY;for(e=0;e<l.length;e++){q=l[e];o=[];for(n=0;n<c.length;n++)k=c[n],k=q.distanceToSquared(k),o.push(k),k<f&&(f=k,g=e,h=n)}e=0<=h-1?h-1:c.length-1;f=0<=g-1?g-1:l.length-1;var m=[l[g],c[h],c[e]];n=THREE.FontUtils.Triangulate.area(m);var r=[l[g],l[f],c[h]];q=THREE.FontUtils.Triangulate.area(r);o=h;k=g;h+=1;g+=-1;0>
h&&(h+=c.length);h%=c.length;0>g&&(g+=l.length);g%=l.length;e=0<=h-1?h-1:c.length-1;f=0<=g-1?g-1:l.length-1;m=[l[g],c[h],c[e]];m=THREE.FontUtils.Triangulate.area(m);r=[l[g],l[f],c[h]];r=THREE.FontUtils.Triangulate.area(r);n+q>m+r&&(h=o,g=k,0>h&&(h+=c.length),h%=c.length,0>g&&(g+=l.length),g%=l.length,e=0<=h-1?h-1:c.length-1,f=0<=g-1?g-1:l.length-1);n=c.slice(0,h);q=c.slice(h);o=l.slice(g);k=l.slice(0,g);f=[l[g],l[f],c[h]];p.push([l[g],c[h],c[e]]);p.push(f);c=n.concat(o).concat(k).concat(q)}return{shape:c,
isolatedPts:p,allpoints:d}},triangulateShape:function(a,b){var c=THREE.Shape.Utils.removeHoles(a,b),d=c.allpoints,e=c.isolatedPts,c=THREE.FontUtils.Triangulate(c.shape,!1),f,g,h,i,l={};for(f=0,g=d.length;f<g;f++)i=d[f].x+":"+d[f].y,void 0!==l[i]&&console.log("Duplicate point",i),l[i]=f;for(f=0,g=c.length;f<g;f++){h=c[f];for(d=0;3>d;d++)i=h[d].x+":"+h[d].y,i=l[i],void 0!==i&&(h[d]=i)}for(f=0,g=e.length;f<g;f++){h=e[f];for(d=0;3>d;d++)i=h[d].x+":"+h[d].y,i=l[i],void 0!==i&&(h[d]=i)}return c.concat(e)},
isClockWise:function(a){return 0>THREE.FontUtils.Triangulate.area(a)},b2p0:function(a,b){var c=1-a;return c*c*b},b2p1:function(a,b){return 2*(1-a)*a*b},b2p2:function(a,b){return a*a*b},b2:function(a,b,c,d){return this.b2p0(a,b)+this.b2p1(a,c)+this.b2p2(a,d)},b3p0:function(a,b){var c=1-a;return c*c*c*b},b3p1:function(a,b){var c=1-a;return 3*c*c*a*b},b3p2:function(a,b){return 3*(1-a)*a*a*b},b3p3:function(a,b){return a*a*a*b},b3:function(a,b,c,d,e){return this.b3p0(a,b)+this.b3p1(a,c)+this.b3p2(a,d)+
this.b3p3(a,e)}};THREE.TextPath=function(a,b){THREE.Path.call(this);this.parameters=b||{};this.set(a)};THREE.TextPath.prototype.set=function(a,b){b=b||this.parameters;this.text=a;var c=void 0!==b.curveSegments?b.curveSegments:4,d=void 0!==b.font?b.font:"helvetiker",e=void 0!==b.weight?b.weight:"normal",f=void 0!==b.style?b.style:"normal";THREE.FontUtils.size=void 0!==b.size?b.size:100;THREE.FontUtils.divisions=c;THREE.FontUtils.face=d;THREE.FontUtils.weight=e;THREE.FontUtils.style=f};
THREE.TextPath.prototype.toShapes=function(){for(var a=THREE.FontUtils.drawText(this.text).paths,b=[],c=0,d=a.length;c<d;c++)Array.prototype.push.apply(b,a[c].toShapes());return b};
THREE.AnimationHandler=function(){var a=[],b={},c={update:function(b){for(var c=0;c<a.length;c++)a[c].update(b)},addToUpdate:function(b){-1===a.indexOf(b)&&a.push(b)},removeFromUpdate:function(b){b=a.indexOf(b);-1!==b&&a.splice(b,1)},add:function(a){void 0!==b[a.name]&&console.log("THREE.AnimationHandler.add: Warning! "+a.name+" already exists in library. Overwriting.");b[a.name]=a;if(!0!==a.initialized){for(var c=0;c<a.hierarchy.length;c++){for(var d=0;d<a.hierarchy[c].keys.length;d++){if(0>a.hierarchy[c].keys[d].time)a.hierarchy[c].keys[d].time=
0;if(void 0!==a.hierarchy[c].keys[d].rot&&!(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)){var h=a.hierarchy[c].keys[d].rot;a.hierarchy[c].keys[d].rot=new THREE.Quaternion(h[0],h[1],h[2],h[3])}}if(a.hierarchy[c].keys.length&&void 0!==a.hierarchy[c].keys[0].morphTargets){h={};for(d=0;d<a.hierarchy[c].keys.length;d++)for(var i=0;i<a.hierarchy[c].keys[d].morphTargets.length;i++){var l=a.hierarchy[c].keys[d].morphTargets[i];h[l]=-1}a.hierarchy[c].usedMorphTargets=h;for(d=0;d<a.hierarchy[c].keys.length;d++){var k=
{};for(l in h){for(i=0;i<a.hierarchy[c].keys[d].morphTargets.length;i++)if(a.hierarchy[c].keys[d].morphTargets[i]===l){k[l]=a.hierarchy[c].keys[d].morphTargetsInfluences[i];break}i===a.hierarchy[c].keys[d].morphTargets.length&&(k[l]=0)}a.hierarchy[c].keys[d].morphTargetsInfluences=k}}for(d=1;d<a.hierarchy[c].keys.length;d++)a.hierarchy[c].keys[d].time===a.hierarchy[c].keys[d-1].time&&(a.hierarchy[c].keys.splice(d,1),d--);for(d=0;d<a.hierarchy[c].keys.length;d++)a.hierarchy[c].keys[d].index=d}d=parseInt(a.length*
a.fps,10);a.JIT={};a.JIT.hierarchy=[];for(c=0;c<a.hierarchy.length;c++)a.JIT.hierarchy.push(Array(d));a.initialized=!0}},get:function(a){if("string"===typeof a){if(b[a])return b[a];console.log("THREE.AnimationHandler.get: Couldn't find animation "+a);return null}},parse:function(a){var b=[];if(a instanceof THREE.SkinnedMesh)for(var c=0;c<a.bones.length;c++)b.push(a.bones[c]);else d(a,b);return b}},d=function(a,b){b.push(a);for(var c=0;c<a.children.length;c++)d(a.children[c],b)};c.LINEAR=0;c.CATMULLROM=
1;c.CATMULLROM_FORWARD=2;return c}();THREE.Animation=function(a,b,c,d){this.root=a;this.data=THREE.AnimationHandler.get(b);this.hierarchy=THREE.AnimationHandler.parse(a);this.currentTime=0;this.timeScale=1;this.isPlaying=!1;this.loop=this.isPaused=!0;this.interpolationType=void 0!==c?c:THREE.AnimationHandler.LINEAR;this.JITCompile=void 0!==d?d:!0;this.points=[];this.target=new THREE.Vector3};
THREE.Animation.prototype.play=function(a,b){if(!this.isPlaying){this.isPlaying=!0;this.loop=void 0!==a?a:!0;this.currentTime=void 0!==b?b:0;var c,d=this.hierarchy.length,e;for(c=0;c<d;c++){e=this.hierarchy[c];if(this.interpolationType!==THREE.AnimationHandler.CATMULLROM_FORWARD)e.useQuaternion=!0;e.matrixAutoUpdate=!0;if(void 0===e.animationCache)e.animationCache={},e.animationCache.prevKey={pos:0,rot:0,scl:0},e.animationCache.nextKey={pos:0,rot:0,scl:0},e.animationCache.originalMatrix=e instanceof
THREE.Bone?e.skinMatrix:e.matrix;var f=e.animationCache.prevKey;e=e.animationCache.nextKey;f.pos=this.data.hierarchy[c].keys[0];f.rot=this.data.hierarchy[c].keys[0];f.scl=this.data.hierarchy[c].keys[0];e.pos=this.getNextKeyWith("pos",c,1);e.rot=this.getNextKeyWith("rot",c,1);e.scl=this.getNextKeyWith("scl",c,1)}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};
THREE.Animation.prototype.pause=function(){this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};
THREE.Animation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var a=0;a<this.hierarchy.length;a++)if(void 0!==this.hierarchy[a].animationCache)this.hierarchy[a]instanceof THREE.Bone?this.hierarchy[a].skinMatrix=this.hierarchy[a].animationCache.originalMatrix:this.hierarchy[a].matrix=this.hierarchy[a].animationCache.originalMatrix,delete this.hierarchy[a].animationCache};
THREE.Animation.prototype.update=function(a){if(this.isPlaying){var b=["pos","rot","scl"],c,d,e,f,g,h,i,l,k=this.data.JIT.hierarchy,n,q;q=this.currentTime+=a*this.timeScale;n=this.currentTime%=this.data.length;l=parseInt(Math.min(n*this.data.fps,this.data.length*this.data.fps),10);for(var o=0,p=this.hierarchy.length;o<p;o++)if(a=this.hierarchy[o],i=a.animationCache,this.JITCompile&&void 0!==k[o][l])a instanceof THREE.Bone?(a.skinMatrix=k[o][l],a.matrixAutoUpdate=!1,a.matrixWorldNeedsUpdate=!1):(a.matrix=
k[o][l],a.matrixAutoUpdate=!1,a.matrixWorldNeedsUpdate=!0);else{if(this.JITCompile)a instanceof THREE.Bone?a.skinMatrix=a.animationCache.originalMatrix:a.matrix=a.animationCache.originalMatrix;for(var m=0;3>m;m++){c=b[m];g=i.prevKey[c];h=i.nextKey[c];if(h.time<=q){if(n<q)if(this.loop){g=this.data.hierarchy[o].keys[0];for(h=this.getNextKeyWith(c,o,1);h.time<n;)g=h,h=this.getNextKeyWith(c,o,h.index+1)}else{this.stop();return}else{do g=h,h=this.getNextKeyWith(c,o,h.index+1);while(h.time<n)}i.prevKey[c]=
g;i.nextKey[c]=h}a.matrixAutoUpdate=!0;a.matrixWorldNeedsUpdate=!0;d=(n-g.time)/(h.time-g.time);e=g[c];f=h[c];if(0>d||1<d)console.log("THREE.Animation.update: Warning! Scale out of bounds:"+d+" on bone "+o),d=0>d?0:1;if("pos"===c)if(c=a.position,this.interpolationType===THREE.AnimationHandler.LINEAR)c.x=e[0]+(f[0]-e[0])*d,c.y=e[1]+(f[1]-e[1])*d,c.z=e[2]+(f[2]-e[2])*d;else{if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)if(this.points[0]=
this.getPrevKeyWith("pos",o,g.index-1).pos,this.points[1]=e,this.points[2]=f,this.points[3]=this.getNextKeyWith("pos",o,h.index+1).pos,d=0.33*d+0.33,e=this.interpolateCatmullRom(this.points,d),c.x=e[0],c.y=e[1],c.z=e[2],this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)d=this.interpolateCatmullRom(this.points,1.01*d),this.target.set(d[0],d[1],d[2]),this.target.subSelf(c),this.target.y=0,this.target.normalize(),d=Math.atan2(this.target.x,this.target.z),a.rotation.set(0,d,0)}else if("rot"===
c)THREE.Quaternion.slerp(e,f,a.quaternion,d);else if("scl"===c)c=a.scale,c.x=e[0]+(f[0]-e[0])*d,c.y=e[1]+(f[1]-e[1])*d,c.z=e[2]+(f[2]-e[2])*d}}if(this.JITCompile&&void 0===k[0][l]){this.hierarchy[0].updateMatrixWorld(!0);for(o=0;o<this.hierarchy.length;o++)k[o][l]=this.hierarchy[o]instanceof THREE.Bone?this.hierarchy[o].skinMatrix.clone():this.hierarchy[o].matrix.clone()}}};
THREE.Animation.prototype.interpolateCatmullRom=function(a,b){var c=[],d=[],e,f,g,h,i,l;e=(a.length-1)*b;f=Math.floor(e);e-=f;c[0]=0===f?f:f-1;c[1]=f;c[2]=f>a.length-2?f:f+1;c[3]=f>a.length-3?f:f+2;f=a[c[0]];h=a[c[1]];i=a[c[2]];l=a[c[3]];c=e*e;g=e*c;d[0]=this.interpolate(f[0],h[0],i[0],l[0],e,c,g);d[1]=this.interpolate(f[1],h[1],i[1],l[1],e,c,g);d[2]=this.interpolate(f[2],h[2],i[2],l[2],e,c,g);return d};
THREE.Animation.prototype.interpolate=function(a,b,c,d,e,f,g){a=0.5*(c-a);d=0.5*(d-b);return(2*(b-c)+a+d)*g+(-3*(b-c)-2*a-d)*f+a*e+b};THREE.Animation.prototype.getNextKeyWith=function(a,b,c){for(var d=this.data.hierarchy[b].keys,c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?c<d.length-1?c:d.length-1:c%d.length;c<d.length;c++)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[0]};
THREE.Animation.prototype.getPrevKeyWith=function(a,b,c){for(var d=this.data.hierarchy[b].keys,c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?0<c?c:0:0<=c?c:c+d.length;0<=c;c--)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[d.length-1]};
THREE.KeyFrameAnimation=function(a,b,c){this.root=a;this.data=THREE.AnimationHandler.get(b);this.hierarchy=THREE.AnimationHandler.parse(a);this.currentTime=0;this.timeScale=0.001;this.isPlaying=!1;this.loop=this.isPaused=!0;this.JITCompile=void 0!==c?c:!0;a=0;for(b=this.hierarchy.length;a<b;a++){var c=this.data.hierarchy[a].sids,d=this.hierarchy[a];if(this.data.hierarchy[a].keys.length&&c){for(var e=0;e<c.length;e++){var f=c[e],g=this.getNextKeyWith(f,a,0);g&&g.apply(f)}d.matrixAutoUpdate=!1;this.data.hierarchy[a].node.updateMatrix();
d.matrixWorldNeedsUpdate=!0}}};
THREE.KeyFrameAnimation.prototype.play=function(a,b){if(!this.isPlaying){this.isPlaying=!0;this.loop=void 0!==a?a:!0;this.currentTime=void 0!==b?b:0;this.startTimeMs=b;this.startTime=1E7;this.endTime=-this.startTime;var c,d=this.hierarchy.length,e,f;for(c=0;c<d;c++){e=this.hierarchy[c];f=this.data.hierarchy[c];e.useQuaternion=!0;if(void 0===f.animationCache)f.animationCache={},f.animationCache.prevKey=null,f.animationCache.nextKey=null,f.animationCache.originalMatrix=e instanceof THREE.Bone?e.skinMatrix:
e.matrix;e=this.data.hierarchy[c].keys;if(e.length)f.animationCache.prevKey=e[0],f.animationCache.nextKey=e[1],this.startTime=Math.min(e[0].time,this.startTime),this.endTime=Math.max(e[e.length-1].time,this.endTime)}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};THREE.KeyFrameAnimation.prototype.pause=function(){this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};
THREE.KeyFrameAnimation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var a=0;a<this.hierarchy.length;a++){var b=this.hierarchy[a];if(void 0!==b.animationCache){var c=b.animationCache.originalMatrix;b instanceof THREE.Bone?(c.copy(b.skinMatrix),b.skinMatrix=c):(c.copy(b.matrix),b.matrix=c);delete b.animationCache}}};
THREE.KeyFrameAnimation.prototype.update=function(a){if(this.isPlaying){var b,c,d,e,f=this.data.JIT.hierarchy,g,h,i;h=this.currentTime+=a*this.timeScale;g=this.currentTime%=this.data.length;if(g<this.startTimeMs)g=this.currentTime=this.startTimeMs+g;e=parseInt(Math.min(g*this.data.fps,this.data.length*this.data.fps),10);if((i=g<h)&&!this.loop){for(var a=0,l=this.hierarchy.length;a<l;a++){var k=this.data.hierarchy[a].keys,f=this.data.hierarchy[a].sids;d=k.length-1;e=this.hierarchy[a];if(k.length){for(k=
0;k<f.length;k++)g=f[k],(h=this.getPrevKeyWith(g,a,d))&&h.apply(g);this.data.hierarchy[a].node.updateMatrix();e.matrixWorldNeedsUpdate=!0}}this.stop()}else if(!(g<this.startTime)){a=0;for(l=this.hierarchy.length;a<l;a++){d=this.hierarchy[a];b=this.data.hierarchy[a];var k=b.keys,n=b.animationCache;if(this.JITCompile&&void 0!==f[a][e])d instanceof THREE.Bone?(d.skinMatrix=f[a][e],d.matrixWorldNeedsUpdate=!1):(d.matrix=f[a][e],d.matrixWorldNeedsUpdate=!0);else if(k.length){if(this.JITCompile&&n)d instanceof
THREE.Bone?d.skinMatrix=n.originalMatrix:d.matrix=n.originalMatrix;b=n.prevKey;c=n.nextKey;if(b&&c){if(c.time<=h){if(i&&this.loop){b=k[0];for(c=k[1];c.time<g;)b=c,c=k[b.index+1]}else if(!i)for(var q=k.length-1;c.time<g&&c.index!==q;)b=c,c=k[b.index+1];n.prevKey=b;n.nextKey=c}b.interpolate(c,g)}this.data.hierarchy[a].node.updateMatrix();d.matrixWorldNeedsUpdate=!0}}if(this.JITCompile&&void 0===f[0][e]){this.hierarchy[0].updateMatrixWorld(!0);for(a=0;a<this.hierarchy.length;a++)f[a][e]=this.hierarchy[a]instanceof
THREE.Bone?this.hierarchy[a].skinMatrix.clone():this.hierarchy[a].matrix.clone()}}}};THREE.KeyFrameAnimation.prototype.getNextKeyWith=function(a,b,c){b=this.data.hierarchy[b].keys;for(c%=b.length;c<b.length;c++)if(b[c].hasTarget(a))return b[c];return b[0]};THREE.KeyFrameAnimation.prototype.getPrevKeyWith=function(a,b,c){b=this.data.hierarchy[b].keys;for(c=0<=c?c:c+b.length;0<=c;c--)if(b[c].hasTarget(a))return b[c];return b[b.length-1]};
THREE.CubeCamera=function(a,b,c,d){this.heightOffset=c;this.position=new THREE.Vector3(0,c,0);this.cameraPX=new THREE.PerspectiveCamera(90,1,a,b);this.cameraNX=new THREE.PerspectiveCamera(90,1,a,b);this.cameraPY=new THREE.PerspectiveCamera(90,1,a,b);this.cameraNY=new THREE.PerspectiveCamera(90,1,a,b);this.cameraPZ=new THREE.PerspectiveCamera(90,1,a,b);this.cameraNZ=new THREE.PerspectiveCamera(90,1,a,b);this.cameraPX.position=this.position;this.cameraNX.position=this.position;this.cameraPY.position=
this.position;this.cameraNY.position=this.position;this.cameraPZ.position=this.position;this.cameraNZ.position=this.position;this.cameraPX.up.set(0,-1,0);this.cameraNX.up.set(0,-1,0);this.cameraPY.up.set(0,0,1);this.cameraNY.up.set(0,0,-1);this.cameraPZ.up.set(0,-1,0);this.cameraNZ.up.set(0,-1,0);this.targetPX=new THREE.Vector3(0,0,0);this.targetNX=new THREE.Vector3(0,0,0);this.targetPY=new THREE.Vector3(0,0,0);this.targetNY=new THREE.Vector3(0,0,0);this.targetPZ=new THREE.Vector3(0,0,0);this.targetNZ=
new THREE.Vector3(0,0,0);this.renderTarget=new THREE.WebGLRenderTargetCube(d,d,{format:THREE.RGBFormat,magFilter:THREE.LinearFilter,minFilter:THREE.LinearFilter});this.updatePosition=function(a){this.position.copy(a);this.position.y+=this.heightOffset;this.targetPX.copy(this.position);this.targetNX.copy(this.position);this.targetPY.copy(this.position);this.targetNY.copy(this.position);this.targetPZ.copy(this.position);this.targetNZ.copy(this.position);this.targetPX.x+=1;this.targetNX.x-=1;this.targetPY.y+=
1;this.targetNY.y-=1;this.targetPZ.z+=1;this.targetNZ.z-=1;this.cameraPX.lookAt(this.targetPX);this.cameraNX.lookAt(this.targetNX);this.cameraPY.lookAt(this.targetPY);this.cameraNY.lookAt(this.targetNY);this.cameraPZ.lookAt(this.targetPZ);this.cameraNZ.lookAt(this.targetNZ)};this.updateCubeMap=function(a,b){var c=this.renderTarget;c.activeCubeFace=0;a.render(b,this.cameraPX,c);c.activeCubeFace=1;a.render(b,this.cameraNX,c);c.activeCubeFace=2;a.render(b,this.cameraPY,c);c.activeCubeFace=3;a.render(b,
this.cameraNY,c);c.activeCubeFace=4;a.render(b,this.cameraPZ,c);c.activeCubeFace=5;a.render(b,this.cameraNZ,c)}};THREE.FirstPersonCamera=function(){console.warn("DEPRECATED: FirstPersonCamera() is FirstPersonControls().")};THREE.PathCamera=function(){console.warn("DEPRECATED: PathCamera() is PathControls().")};THREE.FlyCamera=function(){console.warn("DEPRECATED: FlyCamera() is FlyControls().")};THREE.RollCamera=function(){console.warn("DEPRECATED: RollCamera() is RollControls().")};
THREE.TrackballCamera=function(){console.warn("DEPRECATED: TrackballCamera() is TrackballControls().")};THREE.CombinedCamera=function(a,b,c,d,e,f,g){THREE.Camera.call(this);this.fov=c;this.left=-a/2;this.right=a/2;this.top=b/2;this.bottom=-b/2;this.cameraO=new THREE.OrthographicCamera(a/-2,a/2,b/2,b/-2,f,g);this.cameraP=new THREE.PerspectiveCamera(c,a/b,d,e);this.zoom=1;this.toPerspective()};THREE.CombinedCamera.prototype=new THREE.Camera;THREE.CombinedCamera.prototype.constructor=THREE.CoolCamera;
THREE.CombinedCamera.prototype.toPerspective=function(){this.near=this.cameraP.near;this.far=this.cameraP.far;this.cameraP.fov=this.fov/this.zoom;this.cameraP.updateProjectionMatrix();this.projectionMatrix=this.cameraP.projectionMatrix;this.inPersepectiveMode=!0;this.inOrthographicMode=!1};
THREE.CombinedCamera.prototype.toOrthographic=function(){var a=this.cameraP.aspect,b=(this.cameraP.near+this.cameraP.far)/2,b=Math.tan(this.fov/2)*b,a=2*b*a/2,b=b/this.zoom,a=a/this.zoom;this.cameraO.left=-a;this.cameraO.right=a;this.cameraO.top=b;this.cameraO.bottom=-b;this.cameraO.updateProjectionMatrix();this.near=this.cameraO.near;this.far=this.cameraO.far;this.projectionMatrix=this.cameraO.projectionMatrix;this.inPersepectiveMode=!1;this.inOrthographicMode=!0};
THREE.CombinedCamera.prototype.setFov=function(a){this.fov=a;this.inPersepectiveMode?this.toPerspective():this.toOrthographic()};THREE.CombinedCamera.prototype.setLens=function(a,b){b||(b=43.25);var c=2*Math.atan(b/(2*a)),c=180/Math.PI*c;this.setFov(c);return c};THREE.CombinedCamera.prototype.setZoom=function(a){this.zoom=a;this.inPersepectiveMode?this.toPerspective():this.toOrthographic()};
THREE.CombinedCamera.prototype.toFrontView=function(){this.rotation.x=0;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toBackView=function(){this.rotation.x=0;this.rotation.y=Math.PI;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toLeftView=function(){this.rotation.x=0;this.rotation.y=-Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};
THREE.CombinedCamera.prototype.toRightView=function(){this.rotation.x=0;this.rotation.y=Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toTopView=function(){this.rotation.x=-Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toBottomView=function(){this.rotation.x=Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};
THREE.FirstPersonControls=function(a,b){function c(a,b){return function(){b.apply(a,arguments)}}this.object=a;this.target=new THREE.Vector3(0,0,0);this.domElement=void 0!==b?b:document;this.movementSpeed=1;this.lookSpeed=0.005;this.noFly=!1;this.lookVertical=!0;this.autoForward=!1;this.activeLook=!0;this.heightSpeed=!1;this.heightCoef=1;this.heightMin=0;this.constrainVertical=!1;this.verticalMin=0;this.verticalMax=Math.PI;this.theta=this.phi=this.lon=this.lat=this.mouseY=this.mouseX=this.autoSpeedFactor=
0;this.mouseDragOn=this.freeze=this.moveRight=this.moveLeft=this.moveBackward=this.moveForward=!1;this.domElement===document?(this.viewHalfX=window.innerWidth/2,this.viewHalfY=window.innerHeight/2):(this.viewHalfX=this.domElement.offsetWidth/2,this.viewHalfY=this.domElement.offsetHeight/2,this.domElement.setAttribute("tabindex",-1));this.onMouseDown=function(a){this.domElement!==document&&this.domElement.focus();a.preventDefault();a.stopPropagation();if(this.activeLook)switch(a.button){case 0:this.moveForward=
!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0};this.onMouseUp=function(a){a.preventDefault();a.stopPropagation();if(this.activeLook)switch(a.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1};this.onMouseMove=function(a){this.domElement===document?(this.mouseX=a.pageX-this.viewHalfX,this.mouseY=a.pageY-this.viewHalfY):(this.mouseX=a.pageX-this.domElement.offsetLeft-this.viewHalfX,this.mouseY=a.pageY-this.domElement.offsetTop-this.viewHalfY)};this.onKeyDown=
function(a){switch(a.keyCode){case 38:case 87:this.moveForward=!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 82:this.moveUp=!0;break;case 70:this.moveDown=!0;break;case 81:this.freeze=!this.freeze}};this.onKeyUp=function(a){switch(a.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1;break;case 82:this.moveUp=
!1;break;case 70:this.moveDown=!1}};this.update=function(a){var b=0;if(!this.freeze){this.heightSpeed?(b=THREE.Math.clamp(this.object.position.y,this.heightMin,this.heightMax)-this.heightMin,this.autoSpeedFactor=a*b*this.heightCoef):this.autoSpeedFactor=0;b=a*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.object.translateZ(-(b+this.autoSpeedFactor));this.moveBackward&&this.object.translateZ(b);this.moveLeft&&this.object.translateX(-b);this.moveRight&&this.object.translateX(b);
this.moveUp&&this.object.translateY(b);this.moveDown&&this.object.translateY(-b);a*=this.lookSpeed;this.activeLook||(a=0);this.lon+=this.mouseX*a;this.lookVertical&&(this.lat-=this.mouseY*a);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;var b=this.target,c=this.object.position;b.x=c.x+100*Math.sin(this.phi)*Math.cos(this.theta);b.y=c.y+100*Math.cos(this.phi);b.z=c.z+100*Math.sin(this.phi)*Math.sin(this.theta);b=1;this.constrainVertical&&
(b=Math.PI/(this.verticalMax-this.verticalMin));this.lon+=this.mouseX*a;this.lookVertical&&(this.lat-=this.mouseY*a*b);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;if(this.constrainVertical)this.phi=THREE.Math.mapLinear(this.phi,0,Math.PI,this.verticalMin,this.verticalMax);b=this.target;c=this.object.position;b.x=c.x+100*Math.sin(this.phi)*Math.cos(this.theta);b.y=c.y+100*Math.cos(this.phi);b.z=c.z+100*Math.sin(this.phi)*Math.sin(this.theta);
this.object.lookAt(b)}};this.domElement.addEventListener("contextmenu",function(a){a.preventDefault()},!1);this.domElement.addEventListener("mousemove",c(this,this.onMouseMove),!1);this.domElement.addEventListener("mousedown",c(this,this.onMouseDown),!1);this.domElement.addEventListener("mouseup",c(this,this.onMouseUp),!1);this.domElement.addEventListener("keydown",c(this,this.onKeyDown),!1);this.domElement.addEventListener("keyup",c(this,this.onKeyUp),!1)};
THREE.PathControls=function(a,b){function c(a){return 1>(a*=2)?0.5*a*a:-0.5*(--a*(a-2)-1)}function d(a,b){return function(){b.apply(a,arguments)}}function e(a,b,c,d){var e={name:c,fps:0.6,length:d,hierarchy:[]},f,g=b.getControlPointsArray(),h=b.getLength(),r=g.length,s=0;f=r-1;b={parent:-1,keys:[]};b.keys[0]={time:0,pos:g[0],rot:[0,0,0,1],scl:[1,1,1]};b.keys[f]={time:d,pos:g[f],rot:[0,0,0,1],scl:[1,1,1]};for(f=1;f<r-1;f++)s=d*h.chunks[f]/h.total,b.keys[f]={time:s,pos:g[f]};e.hierarchy[0]=b;THREE.AnimationHandler.add(e);
return new THREE.Animation(a,c,THREE.AnimationHandler.CATMULLROM_FORWARD,!1)}function f(a,b){var c,d,e=new THREE.Geometry;for(c=0;c<a.points.length*b;c++)d=c/(a.points.length*b),d=a.getPoint(d),e.vertices[c]=new THREE.Vertex(new THREE.Vector3(d.x,d.y,d.z));return e}this.object=a;this.domElement=void 0!==b?b:document;this.id="PathControls"+THREE.PathControlsIdCounter++;this.duration=1E4;this.waypoints=[];this.useConstantSpeed=!0;this.resamplingCoef=50;this.debugPath=new THREE.Object3D;this.debugDummy=
new THREE.Object3D;this.animationParent=new THREE.Object3D;this.lookSpeed=0.005;this.lookHorizontal=this.lookVertical=!0;this.verticalAngleMap={srcRange:[0,2*Math.PI],dstRange:[0,2*Math.PI]};this.horizontalAngleMap={srcRange:[0,2*Math.PI],dstRange:[0,2*Math.PI]};this.target=new THREE.Object3D;this.theta=this.phi=this.lon=this.lat=this.mouseY=this.mouseX=0;this.domElement===document?(this.viewHalfX=window.innerWidth/2,this.viewHalfY=window.innerHeight/2):(this.viewHalfX=this.domElement.offsetWidth/
2,this.viewHalfY=this.domElement.offsetHeight/2,this.domElement.setAttribute("tabindex",-1));var g=2*Math.PI,h=Math.PI/180;this.update=function(a){var b;this.lookHorizontal&&(this.lon+=this.mouseX*this.lookSpeed*a);this.lookVertical&&(this.lat-=this.mouseY*this.lookSpeed*a);this.lon=Math.max(0,Math.min(360,this.lon));this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*h;this.theta=this.lon*h;a=this.phi%g;this.phi=0<=a?a:a+g;b=this.verticalAngleMap.srcRange;a=this.verticalAngleMap.dstRange;
b=THREE.Math.mapLinear(this.phi,b[0],b[1],a[0],a[1]);var d=a[1]-a[0];this.phi=c((b-a[0])/d)*d+a[0];b=this.horizontalAngleMap.srcRange;a=this.horizontalAngleMap.dstRange;b=THREE.Math.mapLinear(this.theta,b[0],b[1],a[0],a[1]);d=a[1]-a[0];this.theta=c((b-a[0])/d)*d+a[0];a=this.target.position;a.x=100*Math.sin(this.phi)*Math.cos(this.theta);a.y=100*Math.cos(this.phi);a.z=100*Math.sin(this.phi)*Math.sin(this.theta);this.object.lookAt(this.target.position)};this.onMouseMove=function(a){this.domElement===
document?(this.mouseX=a.pageX-this.viewHalfX,this.mouseY=a.pageY-this.viewHalfY):(this.mouseX=a.pageX-this.domElement.offsetLeft-this.viewHalfX,this.mouseY=a.pageY-this.domElement.offsetTop-this.viewHalfY)};this.init=function(){this.spline=new THREE.Spline;this.spline.initFromArray(this.waypoints);this.useConstantSpeed&&this.spline.reparametrizeByArcLength(this.resamplingCoef);if(this.createDebugDummy){var a=new THREE.MeshLambertMaterial({color:30719}),b=new THREE.MeshLambertMaterial({color:65280}),
c=new THREE.CubeGeometry(10,10,20),g=new THREE.CubeGeometry(2,2,10);this.animationParent=new THREE.Mesh(c,a);a=new THREE.Mesh(g,b);a.position.set(0,10,0);this.animation=e(this.animationParent,this.spline,this.id,this.duration);this.animationParent.add(this.object);this.animationParent.add(this.target);this.animationParent.add(a)}else this.animation=e(this.animationParent,this.spline,this.id,this.duration),this.animationParent.add(this.target),this.animationParent.add(this.object);if(this.createDebugPath){var a=
this.debugPath,b=this.spline,g=f(b,10),c=f(b,10),h=new THREE.LineBasicMaterial({color:16711680,linewidth:3}),g=new THREE.Line(g,h),c=new THREE.ParticleSystem(c,new THREE.ParticleBasicMaterial({color:16755200,size:3}));g.scale.set(1,1,1);a.add(g);c.scale.set(1,1,1);a.add(c);for(var g=new THREE.SphereGeometry(1,16,8),h=new THREE.MeshBasicMaterial({color:65280}),o=0;o<b.points.length;o++)c=new THREE.Mesh(g,h),c.position.copy(b.points[o]),a.add(c)}this.domElement.addEventListener("mousemove",d(this,this.onMouseMove),
!1)}};THREE.PathControlsIdCounter=0;
THREE.FlyControls=function(a,b){function c(a,b){return function(){b.apply(a,arguments)}}this.object=a;this.domElement=void 0!==b?b:document;b&&this.domElement.setAttribute("tabindex",-1);this.movementSpeed=1;this.rollSpeed=0.005;this.autoForward=this.dragToLook=!1;this.object.useQuaternion=!0;this.tmpQuaternion=new THREE.Quaternion;this.mouseStatus=0;this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0};this.moveVector=new THREE.Vector3(0,
0,0);this.rotationVector=new THREE.Vector3(0,0,0);this.handleEvent=function(a){if("function"==typeof this[a.type])this[a.type](a)};this.keydown=function(a){if(!a.altKey){switch(a.keyCode){case 16:this.movementSpeedMultiplier=0.1;break;case 87:this.moveState.forward=1;break;case 83:this.moveState.back=1;break;case 65:this.moveState.left=1;break;case 68:this.moveState.right=1;break;case 82:this.moveState.up=1;break;case 70:this.moveState.down=1;break;case 38:this.moveState.pitchUp=1;break;case 40:this.moveState.pitchDown=
1;break;case 37:this.moveState.yawLeft=1;break;case 39:this.moveState.yawRight=1;break;case 81:this.moveState.rollLeft=1;break;case 69:this.moveState.rollRight=1}this.updateMovementVector();this.updateRotationVector()}};this.keyup=function(a){switch(a.keyCode){case 16:this.movementSpeedMultiplier=1;break;case 87:this.moveState.forward=0;break;case 83:this.moveState.back=0;break;case 65:this.moveState.left=0;break;case 68:this.moveState.right=0;break;case 82:this.moveState.up=0;break;case 70:this.moveState.down=
0;break;case 38:this.moveState.pitchUp=0;break;case 40:this.moveState.pitchDown=0;break;case 37:this.moveState.yawLeft=0;break;case 39:this.moveState.yawRight=0;break;case 81:this.moveState.rollLeft=0;break;case 69:this.moveState.rollRight=0}this.updateMovementVector();this.updateRotationVector()};this.mousedown=function(a){this.domElement!==document&&this.domElement.focus();a.preventDefault();a.stopPropagation();if(this.dragToLook)this.mouseStatus++;else switch(a.button){case 0:this.object.moveForward=
!0;break;case 2:this.object.moveBackward=!0}};this.mousemove=function(a){if(!this.dragToLook||0<this.mouseStatus){var b=this.getContainerDimensions(),c=b.size[0]/2,g=b.size[1]/2;this.moveState.yawLeft=-(a.pageX-b.offset[0]-c)/c;this.moveState.pitchDown=(a.pageY-b.offset[1]-g)/g;this.updateRotationVector()}};this.mouseup=function(a){a.preventDefault();a.stopPropagation();if(this.dragToLook)this.mouseStatus--,this.moveState.yawLeft=this.moveState.pitchDown=0;else switch(a.button){case 0:this.moveForward=
!1;break;case 2:this.moveBackward=!1}this.updateRotationVector()};this.update=function(a){var b=a*this.movementSpeed,a=a*this.rollSpeed;this.object.translateX(this.moveVector.x*b);this.object.translateY(this.moveVector.y*b);this.object.translateZ(this.moveVector.z*b);this.tmpQuaternion.set(this.rotationVector.x*a,this.rotationVector.y*a,this.rotationVector.z*a,1).normalize();this.object.quaternion.multiplySelf(this.tmpQuaternion);this.object.matrix.setPosition(this.object.position);this.object.matrix.setRotationFromQuaternion(this.object.quaternion);
this.object.matrixWorldNeedsUpdate=!0};this.updateMovementVector=function(){var a=this.moveState.forward||this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right;this.moveVector.y=-this.moveState.down+this.moveState.up;this.moveVector.z=-a+this.moveState.back};this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp;this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft;this.rotationVector.z=
-this.moveState.rollRight+this.moveState.rollLeft};this.getContainerDimensions=function(){return this.domElement!=document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}};this.domElement.addEventListener("mousemove",c(this,this.mousemove),!1);this.domElement.addEventListener("mousedown",c(this,this.mousedown),!1);this.domElement.addEventListener("mouseup",c(this,
this.mouseup),!1);this.domElement.addEventListener("keydown",c(this,this.keydown),!1);this.domElement.addEventListener("keyup",c(this,this.keyup),!1);this.updateMovementVector();this.updateRotationVector()};
THREE.RollControls=function(a,b){this.object=a;this.domElement=void 0!==b?b:document;this.mouseLook=!0;this.autoForward=!1;this.rollSpeed=this.movementSpeed=this.lookSpeed=1;this.constrainVertical=[-0.9,0.9];this.object.matrixAutoUpdate=!1;this.forward=new THREE.Vector3(0,0,1);this.roll=0;var c=new THREE.Vector3,d=new THREE.Vector3,e=new THREE.Vector3,f=new THREE.Matrix4,g=!1,h=1,i=0,l=0,k=0,n=0,q=0,o=window.innerWidth/2,p=window.innerHeight/2;this.update=function(a){if(this.mouseLook){var b=a*this.lookSpeed;
this.rotateHorizontally(b*n);this.rotateVertically(b*q)}b=a*this.movementSpeed;this.object.translateZ(-b*(0<i||this.autoForward&&!(0>i)?1:i));this.object.translateX(b*l);this.object.translateY(b*k);g&&(this.roll+=this.rollSpeed*a*h);if(this.forward.y>this.constrainVertical[1])this.forward.y=this.constrainVertical[1],this.forward.normalize();else if(this.forward.y<this.constrainVertical[0])this.forward.y=this.constrainVertical[0],this.forward.normalize();e.copy(this.forward);d.set(0,1,0);c.cross(d,
e).normalize();d.cross(e,c).normalize();this.object.matrix.n11=c.x;this.object.matrix.n12=d.x;this.object.matrix.n13=e.x;this.object.matrix.n21=c.y;this.object.matrix.n22=d.y;this.object.matrix.n23=e.y;this.object.matrix.n31=c.z;this.object.matrix.n32=d.z;this.object.matrix.n33=e.z;f.identity();f.n11=Math.cos(this.roll);f.n12=-Math.sin(this.roll);f.n21=Math.sin(this.roll);f.n22=Math.cos(this.roll);this.object.matrix.multiplySelf(f);this.object.matrixWorldNeedsUpdate=!0;this.object.matrix.n14=this.object.position.x;
this.object.matrix.n24=this.object.position.y;this.object.matrix.n34=this.object.position.z};this.translateX=function(a){this.object.position.x+=this.object.matrix.n11*a;this.object.position.y+=this.object.matrix.n21*a;this.object.position.z+=this.object.matrix.n31*a};this.translateY=function(a){this.object.position.x+=this.object.matrix.n12*a;this.object.position.y+=this.object.matrix.n22*a;this.object.position.z+=this.object.matrix.n32*a};this.translateZ=function(a){this.object.position.x-=this.object.matrix.n13*
a;this.object.position.y-=this.object.matrix.n23*a;this.object.position.z-=this.object.matrix.n33*a};this.rotateHorizontally=function(a){c.set(this.object.matrix.n11,this.object.matrix.n21,this.object.matrix.n31);c.multiplyScalar(a);this.forward.subSelf(c);this.forward.normalize()};this.rotateVertically=function(a){d.set(this.object.matrix.n12,this.object.matrix.n22,this.object.matrix.n32);d.multiplyScalar(a);this.forward.addSelf(d);this.forward.normalize()};this.domElement.addEventListener("contextmenu",
function(a){a.preventDefault()},!1);this.domElement.addEventListener("mousemove",function(a){n=(a.clientX-o)/window.innerWidth;q=(a.clientY-p)/window.innerHeight},!1);this.domElement.addEventListener("mousedown",function(a){a.preventDefault();a.stopPropagation();switch(a.button){case 0:i=1;break;case 2:i=-1}},!1);this.domElement.addEventListener("mouseup",function(a){a.preventDefault();a.stopPropagation();switch(a.button){case 0:i=0;break;case 2:i=0}},!1);this.domElement.addEventListener("keydown",
function(a){switch(a.keyCode){case 38:case 87:i=1;break;case 37:case 65:l=-1;break;case 40:case 83:i=-1;break;case 39:case 68:l=1;break;case 81:g=!0;h=1;break;case 69:g=!0;h=-1;break;case 82:k=1;break;case 70:k=-1}},!1);this.domElement.addEventListener("keyup",function(a){switch(a.keyCode){case 38:case 87:i=0;break;case 37:case 65:l=0;break;case 40:case 83:i=0;break;case 39:case 68:l=0;break;case 81:g=!1;break;case 69:g=!1;break;case 82:k=0;break;case 70:k=0}},!1)};
THREE.TrackballControls=function(a,b){var c=this;this.object=a;this.domElement=void 0!==b?b:document;this.enabled=!0;this.screen={width:window.innerWidth,height:window.innerHeight,offsetLeft:0,offsetTop:0};this.radius=(this.screen.width+this.screen.height)/4;this.rotateSpeed=1;this.zoomSpeed=1.2;this.panSpeed=0.3;this.staticMoving=this.noPan=this.noZoom=this.noRotate=!1;this.dynamicDampingFactor=0.2;this.minDistance=0;this.maxDistance=Infinity;this.keys=[65,83,68];this.target=new THREE.Vector3(0,
0,0);var d=!1,e=-1,f=new THREE.Vector3,g=new THREE.Vector3,h=new THREE.Vector3,i=new THREE.Vector2,l=new THREE.Vector2,k=new THREE.Vector2,n=new THREE.Vector2;this.handleEvent=function(a){if("function"==typeof this[a.type])this[a.type](a)};this.getMouseOnScreen=function(a,b){return new THREE.Vector2(0.5*((a-c.screen.offsetLeft)/c.radius),0.5*((b-c.screen.offsetTop)/c.radius))};this.getMouseProjectionOnBall=function(a,b){var d=new THREE.Vector3((a-0.5*c.screen.width-c.screen.offsetLeft)/c.radius,(0.5*
c.screen.height+c.screen.offsetTop-b)/c.radius,0),e=d.length();1<e?d.normalize():d.z=Math.sqrt(1-e*e);f.copy(c.object.position).subSelf(c.target);e=c.object.up.clone().setLength(d.y);e.addSelf(c.object.up.clone().crossSelf(f).setLength(d.x));e.addSelf(f.setLength(d.z));return e};this.rotateCamera=function(){var a=Math.acos(g.dot(h)/g.length()/h.length());if(a){var b=(new THREE.Vector3).cross(g,h).normalize(),d=new THREE.Quaternion,a=a*c.rotateSpeed;d.setFromAxisAngle(b,-a);d.multiplyVector3(f);d.multiplyVector3(c.object.up);
d.multiplyVector3(h);c.staticMoving?g=h:(d.setFromAxisAngle(b,a*(c.dynamicDampingFactor-1)),d.multiplyVector3(g))}};this.zoomCamera=function(){var a=1+(l.y-i.y)*c.zoomSpeed;1!==a&&0<a&&(f.multiplyScalar(a),c.staticMoving?i=l:i.y+=(l.y-i.y)*this.dynamicDampingFactor)};this.panCamera=function(){var a=n.clone().subSelf(k);if(a.lengthSq()){a.multiplyScalar(f.length()*c.panSpeed);var b=f.clone().crossSelf(c.object.up).setLength(a.x);b.addSelf(c.object.up.clone().setLength(a.y));c.object.position.addSelf(b);
c.target.addSelf(b);c.staticMoving?k=n:k.addSelf(a.sub(n,k).multiplyScalar(c.dynamicDampingFactor))}};this.checkDistances=function(){if(!c.noZoom||!c.noPan)c.object.position.lengthSq()>c.maxDistance*c.maxDistance&&c.object.position.setLength(c.maxDistance),f.lengthSq()<c.minDistance*c.minDistance&&c.object.position.add(c.target,f.setLength(c.minDistance))};this.update=function(){f.copy(c.object.position).subSelf(this.target);c.noRotate||c.rotateCamera();c.noZoom||c.zoomCamera();c.noPan||c.panCamera();
c.object.position.add(c.target,f);c.checkDistances();c.object.lookAt(c.target)};this.domElement.addEventListener("contextmenu",function(a){a.preventDefault()},!1);this.domElement.addEventListener("mousemove",function(a){c.enabled&&(d&&(g=h=c.getMouseProjectionOnBall(a.clientX,a.clientY),i=l=c.getMouseOnScreen(a.clientX,a.clientY),k=n=c.getMouseOnScreen(a.clientX,a.clientY),d=!1),-1!==e&&(0===e&&!c.noRotate?h=c.getMouseProjectionOnBall(a.clientX,a.clientY):1===e&&!c.noZoom?l=c.getMouseOnScreen(a.clientX,
a.clientY):2===e&&!c.noPan&&(n=c.getMouseOnScreen(a.clientX,a.clientY))))},!1);this.domElement.addEventListener("mousedown",function(a){if(c.enabled&&(a.preventDefault(),a.stopPropagation(),-1===e))e=a.button,0===e&&!c.noRotate?g=h=c.getMouseProjectionOnBall(a.clientX,a.clientY):1===e&&!c.noZoom?i=l=c.getMouseOnScreen(a.clientX,a.clientY):this.noPan||(k=n=c.getMouseOnScreen(a.clientX,a.clientY))},!1);this.domElement.addEventListener("mouseup",function(a){c.enabled&&(a.preventDefault(),a.stopPropagation(),
e=-1)},!1);window.addEventListener("keydown",function(a){c.enabled&&-1===e&&(a.keyCode===c.keys[0]&&!c.noRotate?e=0:a.keyCode===c.keys[1]&&!c.noZoom?e=1:a.keyCode===c.keys[2]&&!c.noPan&&(e=2),-1!==e&&(d=!0))},!1);window.addEventListener("keyup",function(){c.enabled&&-1!==e&&(e=-1)},!1)};
THREE.CubeGeometry=function(a,b,c,d,e,f,g,h){function i(a,b,c,g,h,i,k,n){var m,o=d||1,p=e||1,q=h/2,r=i/2,s=l.vertices.length;if("x"===a&&"y"===b||"y"===a&&"x"===b)m="z";else if("x"===a&&"z"===b||"z"===a&&"x"===b)m="y",p=f||1;else if("z"===a&&"y"===b||"y"===a&&"z"===b)m="x",o=f||1;var j=o+1,t=p+1,y=h/o,E=i/p,S=new THREE.Vector3;S[m]=0<k?1:-1;for(h=0;h<t;h++)for(i=0;i<j;i++){var u=new THREE.Vector3;u[a]=(i*y-q)*c;u[b]=(h*E-r)*g;u[m]=k;l.vertices.push(new THREE.Vertex(u))}for(h=0;h<p;h++)for(i=0;i<o;i++)a=
new THREE.Face4(i+j*h+s,i+j*(h+1)+s,i+1+j*(h+1)+s,i+1+j*h+s),a.normal.copy(S),a.vertexNormals.push(S.clone(),S.clone(),S.clone(),S.clone()),a.materialIndex=n,l.faces.push(a),l.faceVertexUvs[0].push([new THREE.UV(i/o,h/p),new THREE.UV(i/o,(h+1)/p),new THREE.UV((i+1)/o,(h+1)/p),new THREE.UV((i+1)/o,h/p)])}THREE.Geometry.call(this);var l=this,k=a/2,n=b/2,q=c/2,o,p,m,r,s,t;if(void 0!==g){if(g instanceof Array)this.materials=g;else{this.materials=[];for(o=0;6>o;o++)this.materials.push(g)}o=0;r=1;p=2;s=
3;m=4;t=5}else this.materials=[];this.sides={px:!0,nx:!0,py:!0,ny:!0,pz:!0,nz:!0};if(void 0!=h)for(var u in h)void 0!==this.sides[u]&&(this.sides[u]=h[u]);this.sides.px&&i("z","y",-1,-1,c,b,k,o);this.sides.nx&&i("z","y",1,-1,c,b,-k,r);this.sides.py&&i("x","z",1,1,a,c,n,p);this.sides.ny&&i("x","z",1,-1,a,c,-n,s);this.sides.pz&&i("x","y",1,-1,a,b,q,m);this.sides.nz&&i("x","y",-1,-1,a,b,-q,t);this.computeCentroids();this.mergeVertices()};THREE.CubeGeometry.prototype=new THREE.Geometry;
THREE.CubeGeometry.prototype.constructor=THREE.CubeGeometry;
THREE.CylinderGeometry=function(a,b,c,d,e,f){THREE.Geometry.call(this);var a=void 0!==a?a:20,b=void 0!==b?b:20,c=void 0!==c?c:100,g=c/2,d=d||8,e=e||1,h,i,l=[],k=[];for(i=0;i<=e;i++){var n=[],q=[],o=i/e,p=o*(b-a)+a;for(h=0;h<=d;h++){var m=h/d,r=p*Math.sin(2*m*Math.PI),s=-o*c+g,t=p*Math.cos(2*m*Math.PI);this.vertices.push(new THREE.Vertex(new THREE.Vector3(r,s,t)));n.push(this.vertices.length-1);q.push(new THREE.UV(m,o))}l.push(n);k.push(q)}for(i=0;i<e;i++)for(h=0;h<d;h++){var c=l[i][h],n=l[i+1][h],
q=l[i+1][h+1],o=l[i][h+1],p=this.vertices[c].position.clone().setY(0).normalize(),m=this.vertices[n].position.clone().setY(0).normalize(),r=this.vertices[q].position.clone().setY(0).normalize(),s=this.vertices[o].position.clone().setY(0).normalize(),t=k[i][h].clone(),u=k[i+1][h].clone(),v=k[i+1][h+1].clone(),x=k[i][h+1].clone();this.faces.push(new THREE.Face4(c,n,q,o,[p,m,r,s]));this.faceVertexUvs[0].push([t,u,v,x])}if(!f&&0<a){this.vertices.push(new THREE.Vertex(new THREE.Vector3(0,g,0)));for(h=
0;h<d;h++)c=l[0][h],n=l[0][h+1],q=this.vertices.length-1,p=new THREE.Vector3(0,1,0),m=new THREE.Vector3(0,1,0),r=new THREE.Vector3(0,1,0),t=k[0][h].clone(),u=k[0][h+1].clone(),v=new THREE.UV(u.u,0),this.faces.push(new THREE.Face3(c,n,q,[p,m,r])),this.faceVertexUvs[0].push([t,u,v])}if(!f&&0<b){this.vertices.push(new THREE.Vertex(new THREE.Vector3(0,-g,0)));for(h=0;h<d;h++)c=l[i][h+1],n=l[i][h],q=this.vertices.length-1,p=new THREE.Vector3(0,-1,0),m=new THREE.Vector3(0,-1,0),r=new THREE.Vector3(0,-1,
0),t=k[i][h+1].clone(),u=k[i][h].clone(),v=new THREE.UV(u.u,1),this.faces.push(new THREE.Face3(c,n,q,[p,m,r])),this.faceVertexUvs[0].push([t,u,v])}this.computeCentroids();this.computeFaceNormals()};THREE.CylinderGeometry.prototype=new THREE.Geometry;THREE.CylinderGeometry.prototype.constructor=THREE.CylinderGeometry;
THREE.ExtrudeGeometry=function(a,b){if("undefined"!==typeof a){THREE.Geometry.call(this);var a=a instanceof Array?a:[a],c,d,e=a.length;this.shapebb=a[e-1].getBoundingBox();for(d=0;d<e;d++)c=a[d],this.addShape(c,b);this.computeCentroids();this.computeFaceNormals()}};THREE.ExtrudeGeometry.prototype=new THREE.Geometry;THREE.ExtrudeGeometry.prototype.constructor=THREE.ExtrudeGeometry;
THREE.ExtrudeGeometry.prototype.addShape=function(a,b){function c(a,b,c){b||console.log("die");return b.clone().multiplyScalar(c).addSelf(a)}function d(a,b,c){var d=THREE.ExtrudeGeometry.__v1,e=THREE.ExtrudeGeometry.__v2,f=THREE.ExtrudeGeometry.__v3,g=THREE.ExtrudeGeometry.__v4,h=THREE.ExtrudeGeometry.__v5,j=THREE.ExtrudeGeometry.__v6;d.set(a.x-b.x,a.y-b.y);e.set(a.x-c.x,a.y-c.y);d=d.normalize();e=e.normalize();f.set(-d.y,d.x);g.set(e.y,-e.x);h.copy(a).addSelf(f);j.copy(a).addSelf(g);if(h.equals(j))return g.clone();
h.copy(b).addSelf(f);j.copy(c).addSelf(g);f=d.dot(g);g=j.subSelf(h).dot(g);0===f&&(console.log("Either infinite or no solutions!"),0===g?console.log("Its finite solutions."):console.log("Too bad, no solutions."));g/=f;return 0>g?(b=Math.atan2(b.y-a.y,b.x-a.x),a=Math.atan2(c.y-a.y,c.x-a.x),b>a&&(a+=2*Math.PI),c=(b+a)/2,a=-Math.cos(c),c=-Math.sin(c),new THREE.Vector2(a,c)):d.multiplyScalar(g).addSelf(h).subSelf(a).clone()}function e(a){for(j=a.length;0<=--j;){y=j;E=j-1;0>E&&(E=a.length-1);for(var b=
0,c=o+2*k,b=0;b<c;b++){var d=Q*b,e=Q*(b+1),f=ka+y+d,g=ka+y+e,l=f,d=ka+E+d,e=ka+E+e,n=g,l=l+H,d=d+H,e=e+H,n=n+H;A.faces.push(new THREE.Face4(l,d,e,n,null,null,v));void 0!==v&&(l=b/c,d=(b+1)/c,e=h+2*i,f=(A.vertices[f].position.z+i)/e,g=(A.vertices[g].position.z+i)/e,A.faceVertexUvs[0].push([new THREE.UV(f,l),new THREE.UV(g,l),new THREE.UV(g,d),new THREE.UV(f,d)]))}}}function f(a,b,c){A.vertices.push(new THREE.Vertex(new THREE.Vector3(a,b,c)))}function g(a,b,c){a+=H;b+=H;c+=H;A.faces.push(new THREE.Face3(a,
b,c,null,null,u));if(void 0!==u){var d=x.minX,e=x.minY,f=x.maxY,g=x.maxX,h=A.vertices[b].position.x-d,b=A.vertices[b].position.y-e,j=A.vertices[c].position.x-d,c=A.vertices[c].position.y-e;A.faceVertexUvs[0].push([new THREE.UV((A.vertices[a].position.x-d)/g,(A.vertices[a].position.y-e)/f),new THREE.UV(h/g,b/f),new THREE.UV(j/g,c/f)])}}var h=void 0!==b.amount?b.amount:100,i=void 0!==b.bevelThickness?b.bevelThickness:6,l=void 0!==b.bevelSize?b.bevelSize:i-2,k=void 0!==b.bevelSegments?b.bevelSegments:
3,n=void 0!==b.bevelEnabled?b.bevelEnabled:!0,q=void 0!==b.curveSegments?b.curveSegments:12,o=void 0!==b.steps?b.steps:1,p=b.bendPath,m=b.extrudePath,r,s=!1,t=void 0!==b.useSpacedPoints?b.useSpacedPoints:!1,u=b.material,v=b.extrudeMaterial,x=this.shapebb;if(m)r=m.getPoints(q),o=r.length,s=!0,n=!1;n||(l=i=k=0);var B,D,C,A=this,H=this.vertices.length;p&&a.addWrapPath(p);q=t?a.extractAllSpacedPoints(q):a.extractAllPoints(q);p=q.shape;q=q.holes;if(m=!THREE.Shape.Utils.isClockWise(p)){p=p.reverse();for(D=
0,C=q.length;D<C;D++)B=q[D],THREE.Shape.Utils.isClockWise(B)&&(q[D]=B.reverse());m=!1}m=THREE.Shape.Utils.triangulateShape(p,q);t=p;for(D=0,C=q.length;D<C;D++)B=q[D],p=p.concat(B);for(var I,N,$,K,Q=p.length,L=m.length,G=[],j=0,W=t.length,y=W-1,E=j+1;j<W;j++,y++,E++)y===W&&(y=0),E===W&&(E=0),G[j]=d(t[j],t[y],t[E]);var S=[],T,R=G.concat();for(D=0,C=q.length;D<C;D++){B=q[D];T=[];for(j=0,W=B.length,y=W-1,E=j+1;j<W;j++,y++,E++)y===W&&(y=0),E===W&&(E=0),T[j]=d(B[j],B[y],B[E]);S.push(T);R=R.concat(T)}for(I=
0;I<k;I++){N=I/k;$=i*(1-N);N=l*Math.sin(N*Math.PI/2);for(j=0,W=t.length;j<W;j++)K=c(t[j],G[j],N),f(K.x,K.y,-$);for(D=0,C=q.length;D<C;D++){B=q[D];T=S[D];for(j=0,W=B.length;j<W;j++)K=c(B[j],T[j],N),f(K.x,K.y,-$)}}N=l;for(j=0;j<Q;j++)K=n?c(p[j],R[j],N):p[j],s?f(K.x,K.y+r[0].y,r[0].x):f(K.x,K.y,0);for(I=1;I<=o;I++)for(j=0;j<Q;j++)K=n?c(p[j],R[j],N):p[j],s?f(K.x,K.y+r[I-1].y,r[I-1].x):f(K.x,K.y,h/o*I);for(I=k-1;0<=I;I--){N=I/k;$=i*(1-N);N=l*Math.sin(N*Math.PI/2);for(j=0,W=t.length;j<W;j++)K=c(t[j],G[j],
N),f(K.x,K.y,h+$);for(D=0,C=q.length;D<C;D++){B=q[D];T=S[D];for(j=0,W=B.length;j<W;j++)K=c(B[j],T[j],N),s?f(K.x,K.y+r[o-1].y,r[o-1].x+$):f(K.x,K.y,h+$)}}if(n){n=0*Q;for(j=0;j<L;j++)l=m[j],g(l[2]+n,l[1]+n,l[0]+n);n=Q*(o+2*k);for(j=0;j<L;j++)l=m[j],g(l[0]+n,l[1]+n,l[2]+n)}else{for(j=0;j<L;j++)l=m[j],g(l[2],l[1],l[0]);for(j=0;j<L;j++)l=m[j],g(l[0]+Q*o,l[1]+Q*o,l[2]+Q*o)}var ka=0;e(t);ka+=t.length;for(D=0,C=q.length;D<C;D++)B=q[D],e(B),ka+=B.length};THREE.ExtrudeGeometry.__v1=new THREE.Vector2;
THREE.ExtrudeGeometry.__v2=new THREE.Vector2;THREE.ExtrudeGeometry.__v3=new THREE.Vector2;THREE.ExtrudeGeometry.__v4=new THREE.Vector2;THREE.ExtrudeGeometry.__v5=new THREE.Vector2;THREE.ExtrudeGeometry.__v6=new THREE.Vector2;
THREE.IcosahedronGeometry=function(a){function b(a,b,c){var d=Math.sqrt(a*a+b*b+c*c);return e.vertices.push(new THREE.Vertex(new THREE.Vector3(a/d,b/d,c/d)))-1}function c(a,b,c,d){var f=e.vertices[a].position,g=e.vertices[b].position,h=e.vertices[c].position,a=new THREE.Face3(a,b,c);a.vertexNormals.push(f.clone().normalize(),g.clone().normalize(),h.clone().normalize());d.faces.push(a);d.faceVertexUvs[0].push([new THREE.UV(1-0.5*((Math.atan2(f.z,f.x)+Math.PI)%Math.PI/Math.PI),0.5-f.y/2),new THREE.UV(1-
0.5*((Math.atan2(g.z,g.x)+Math.PI)%Math.PI/Math.PI),0.5-g.y/2),new THREE.UV(1-0.5*((Math.atan2(h.z,h.x)+Math.PI)%Math.PI/Math.PI),0.5-h.y/2)])}function d(a,c){var d=e.vertices[a].position,f=e.vertices[c].position;return b((d.x+f.x)/2,(d.y+f.y)/2,(d.z+f.z)/2)}var e=this,f=new THREE.Geometry;this.subdivisions=a||0;THREE.Geometry.call(this);a=(1+Math.sqrt(5))/2;b(-1,a,0);b(1,a,0);b(-1,-a,0);b(1,-a,0);b(0,-1,a);b(0,1,a);b(0,-1,-a);b(0,1,-a);b(a,0,-1);b(a,0,1);b(-a,0,-1);b(-a,0,1);c(0,11,5,f);c(0,5,1,
f);c(0,1,7,f);c(0,7,10,f);c(0,10,11,f);c(1,5,9,f);c(5,11,4,f);c(11,10,2,f);c(10,7,6,f);c(7,1,8,f);c(3,9,4,f);c(3,4,2,f);c(3,2,6,f);c(3,6,8,f);c(3,8,9,f);c(4,9,5,f);c(2,4,11,f);c(6,2,10,f);c(8,6,7,f);c(9,8,1,f);for(var g=0;g<this.subdivisions;g++){for(var a=new THREE.Geometry,g=0,h=f.faces.length;g<h;g++){var i=f.faces[g],l=d(i.a,i.b),k=d(i.b,i.c),n=d(i.c,i.a);c(i.a,l,n,a);c(i.b,k,l,a);c(i.c,n,k,a);c(l,k,n,a)}f.faces=a.faces;f.faceVertexUvs[0]=a.faceVertexUvs[0]}e.faces=f.faces;e.faceVertexUvs[0]=
f.faceVertexUvs[0];this.mergeVertices();this.computeCentroids();this.computeFaceNormals()};THREE.IcosahedronGeometry.prototype=new THREE.Geometry;THREE.IcosahedronGeometry.prototype.constructor=THREE.IcosahedronGeometry;
THREE.LatheGeometry=function(a,b,c){THREE.Geometry.call(this);this.steps=b||12;this.angle=c||2*Math.PI;for(var b=this.angle/this.steps,c=[],d=[],e=[],f=[],g=(new THREE.Matrix4).setRotationZ(b),h=0;h<a.length;h++)this.vertices.push(new THREE.Vertex(a[h])),c[h]=a[h].clone(),d[h]=this.vertices.length-1;for(var i=0;i<=this.angle+0.001;i+=b){for(h=0;h<c.length;h++)i<this.angle?(c[h]=g.multiplyVector3(c[h].clone()),this.vertices.push(new THREE.Vertex(c[h])),e[h]=this.vertices.length-1):e=f;0==i&&(f=d);
for(h=0;h<d.length-1;h++)this.faces.push(new THREE.Face4(e[h],e[h+1],d[h+1],d[h])),this.faceVertexUvs[0].push([new THREE.UV(1-i/this.angle,h/a.length),new THREE.UV(1-i/this.angle,(h+1)/a.length),new THREE.UV(1-(i-b)/this.angle,(h+1)/a.length),new THREE.UV(1-(i-b)/this.angle,h/a.length)]);d=e;e=[]}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.LatheGeometry.prototype=new THREE.Geometry;THREE.LatheGeometry.prototype.constructor=THREE.LatheGeometry;
THREE.OctahedronGeometry=function(a,b){function c(b){var c=b.clone().normalize(),c=new THREE.Vertex(c.clone().multiplyScalar(a));c.index=g.vertices.push(c)-1;var d=Math.atan2(b.z,-b.x)/2/Math.PI+0.5,b=Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))/Math.PI+0.5;c.uv=new THREE.UV(d,b);return c}function d(a,b,c,h){1>h?(h=new THREE.Face3(a.index,b.index,c.index,[a.position,b.position,c.position]),h.centroid.addSelf(a.position).addSelf(b.position).addSelf(c.position).divideScalar(3),h.normal=h.centroid.clone().normalize(),
g.faces.push(h),h=Math.atan2(h.centroid.z,-h.centroid.x),g.faceVertexUvs[0].push([f(a.uv,a.position,h),f(b.uv,b.position,h),f(c.uv,c.position,h)])):(h-=1,d(a,e(a,b),e(a,c),h),d(e(a,b),b,e(b,c),h),d(e(a,c),e(b,c),c,h),d(e(a,b),e(b,c),e(a,c),h))}function e(a,b){h[a.index]||(h[a.index]=[]);h[b.index]||(h[b.index]=[]);var d=h[a.index][b.index];void 0===d&&(h[a.index][b.index]=h[b.index][a.index]=d=c((new THREE.Vector3).add(a.position,b.position).divideScalar(2)));return d}function f(a,b,c){0>c&&1===a.u&&
(a=new THREE.UV(a.u-1,a.v));0===b.x&&0===b.z&&(a=new THREE.UV(c/2/Math.PI+0.5,a.v));return a}THREE.Geometry.call(this);var b=b||0,g=this;c(new THREE.Vector3(1,0,0));c(new THREE.Vector3(-1,0,0));c(new THREE.Vector3(0,1,0));c(new THREE.Vector3(0,-1,0));c(new THREE.Vector3(0,0,1));c(new THREE.Vector3(0,0,-1));var h=[],i=this.vertices;d(i[0],i[2],i[4],b);d(i[0],i[4],i[3],b);d(i[0],i[3],i[5],b);d(i[0],i[5],i[2],b);d(i[1],i[2],i[5],b);d(i[1],i[5],i[3],b);d(i[1],i[3],i[4],b);d(i[1],i[4],i[2],b);this.boundingSphere=
{radius:a}};THREE.OctahedronGeometry.prototype=new THREE.Geometry;THREE.OctahedronGeometry.prototype.constructor=THREE.OctahedronGeometry;
THREE.PlaneGeometry=function(a,b,c,d){THREE.Geometry.call(this);for(var e=a/2,f=b/2,c=c||1,d=d||1,g=c+1,h=d+1,i=a/c,l=b/d,k=new THREE.Vector3(0,0,1),a=0;a<h;a++)for(b=0;b<g;b++)this.vertices.push(new THREE.Vertex(new THREE.Vector3(b*i-e,-(a*l-f),0)));for(a=0;a<d;a++)for(b=0;b<c;b++)e=new THREE.Face4(b+g*a,b+g*(a+1),b+1+g*(a+1),b+1+g*a),e.normal.copy(k),e.vertexNormals.push(k.clone(),k.clone(),k.clone(),k.clone()),this.faces.push(e),this.faceVertexUvs[0].push([new THREE.UV(b/c,a/d),new THREE.UV(b/
c,(a+1)/d),new THREE.UV((b+1)/c,(a+1)/d),new THREE.UV((b+1)/c,a/d)]);this.computeCentroids()};THREE.PlaneGeometry.prototype=new THREE.Geometry;THREE.PlaneGeometry.prototype.constructor=THREE.PlaneGeometry;
THREE.SphereGeometry=function(a,b,c,d,e,f,g){THREE.Geometry.call(this);var a=a||50,d=void 0!==d?d:0,e=void 0!==e?e:2*Math.PI,f=void 0!==f?f:0,g=void 0!==g?g:Math.PI,b=Math.max(3,Math.floor(b)||8),c=Math.max(2,Math.floor(c)||6),h,i,l=[],k=[];for(i=0;i<=c;i++){var n=[],q=[];for(h=0;h<=b;h++){var o=h/b,p=i/c,m=-a*Math.cos(d+o*e)*Math.sin(f+p*g),r=a*Math.cos(f+p*g),s=a*Math.sin(d+o*e)*Math.sin(f+p*g);this.vertices.push(new THREE.Vertex(new THREE.Vector3(m,r,s)));n.push(this.vertices.length-1);q.push(new THREE.UV(o,
p))}l.push(n);k.push(q)}for(i=0;i<c;i++)for(h=0;h<b;h++){var d=l[i][h+1],e=l[i][h],f=l[i+1][h],g=l[i+1][h+1],n=this.vertices[d].position.clone().normalize(),q=this.vertices[e].position.clone().normalize(),o=this.vertices[f].position.clone().normalize(),p=this.vertices[g].position.clone().normalize(),m=k[i][h+1].clone(),r=k[i][h].clone(),s=k[i+1][h].clone(),t=k[i+1][h+1].clone();Math.abs(this.vertices[d].position.y)==a?(this.faces.push(new THREE.Face3(d,f,g,[n,o,p])),this.faceVertexUvs[0].push([m,
s,t])):Math.abs(this.vertices[f].position.y)==a?(this.faces.push(new THREE.Face3(d,e,f,[n,q,o])),this.faceVertexUvs[0].push([m,r,s])):(this.faces.push(new THREE.Face4(d,e,f,g,[n,q,o,p])),this.faceVertexUvs[0].push([m,r,s,t]))}this.computeCentroids();this.computeFaceNormals();this.boundingSphere={radius:a}};THREE.SphereGeometry.prototype=new THREE.Geometry;THREE.SphereGeometry.prototype.constructor=THREE.SphereGeometry;
THREE.TextGeometry=function(a,b){var c=(new THREE.TextPath(a,b)).toShapes();b.amount=void 0!==b.height?b.height:50;if(void 0===b.bevelThickness)b.bevelThickness=10;if(void 0===b.bevelSize)b.bevelSize=8;if(void 0===b.bevelEnabled)b.bevelEnabled=!1;if(b.bend){var d=c[c.length-1].getBoundingBox().maxX;b.bendPath=new THREE.QuadraticBezierCurve(new THREE.Vector2(0,0),new THREE.Vector2(d/2,120),new THREE.Vector2(d,0))}THREE.ExtrudeGeometry.call(this,c,b)};THREE.TextGeometry.prototype=new THREE.ExtrudeGeometry;
THREE.TextGeometry.prototype.constructor=THREE.TextGeometry;
THREE.FontUtils={faces:{},face:"helvetiker",weight:"normal",style:"normal",size:150,divisions:10,getFace:function(){return this.faces[this.face][this.weight][this.style]},loadFace:function(a){var b=a.familyName.toLowerCase();this.faces[b]=this.faces[b]||{};this.faces[b][a.cssFontWeight]=this.faces[b][a.cssFontWeight]||{};this.faces[b][a.cssFontWeight][a.cssFontStyle]=a;return this.faces[b][a.cssFontWeight][a.cssFontStyle]=a},drawText:function(a){for(var b=this.getFace(),c=this.size/b.resolution,d=
0,e=(""+a).split(""),f=e.length,g=[],a=0;a<f;a++){var h=new THREE.Path,h=this.extractGlyphPoints(e[a],b,c,d,h),d=d+h.offset;g.push(h.path)}return{paths:g,offset:d/2}},extractGlyphPoints:function(a,b,c,d,e){var f=[],g,h,i,l,k,n,q,o,p,m,r,s=b.glyphs[a]||b.glyphs["?"];if(s){if(s.o){b=s._cachedOutline||(s._cachedOutline=s.o.split(" "));l=b.length;for(a=0;a<l;)switch(i=b[a++],i){case "m":i=b[a++]*c+d;k=b[a++]*c;f.push(new THREE.Vector2(i,k));e.moveTo(i,k);break;case "l":i=b[a++]*c+d;k=b[a++]*c;f.push(new THREE.Vector2(i,
k));e.lineTo(i,k);break;case "q":i=b[a++]*c+d;k=b[a++]*c;o=b[a++]*c+d;p=b[a++]*c;e.quadraticCurveTo(o,p,i,k);if(g=f[f.length-1]){n=g.x;q=g.y;for(g=1,h=this.divisions;g<=h;g++){var t=g/h,u=THREE.Shape.Utils.b2(t,n,o,i),t=THREE.Shape.Utils.b2(t,q,p,k);f.push(new THREE.Vector2(u,t))}}break;case "b":if(i=b[a++]*c+d,k=b[a++]*c,o=b[a++]*c+d,p=b[a++]*-c,m=b[a++]*c+d,r=b[a++]*-c,e.bezierCurveTo(i,k,o,p,m,r),g=f[f.length-1]){n=g.x;q=g.y;for(g=1,h=this.divisions;g<=h;g++)t=g/h,u=THREE.Shape.Utils.b3(t,n,o,
m,i),t=THREE.Shape.Utils.b3(t,q,p,r,k),f.push(new THREE.Vector2(u,t))}}}return{offset:s.ha*c,points:f,path:e}}}};
(function(a){var b=function(a){for(var b=a.length,e=0,f=b-1,g=0;g<b;f=g++)e+=a[f].x*a[g].y-a[g].x*a[f].y;return 0.5*e};a.Triangulate=function(a,d){var e=a.length;if(3>e)return null;var f=[],g=[],h=[],i,l,k;if(0<b(a))for(l=0;l<e;l++)g[l]=l;else for(l=0;l<e;l++)g[l]=e-1-l;var n=2*e;for(l=e-1;2<e;){if(0>=n--){console.log("Warning, unable to triangulate polygon!");break}i=l;e<=i&&(i=0);l=i+1;e<=l&&(l=0);k=l+1;e<=k&&(k=0);var q;a:{q=a;var o=i,p=l,m=k,r=e,s=g,t=void 0,u=void 0,v=void 0,x=void 0,B=void 0,
D=void 0,C=void 0,A=void 0,H=void 0,u=q[s[o]].x,v=q[s[o]].y,x=q[s[p]].x,B=q[s[p]].y,D=q[s[m]].x,C=q[s[m]].y;if(1.0E-10>(x-u)*(C-v)-(B-v)*(D-u))q=!1;else{for(t=0;t<r;t++)if(!(t==o||t==p||t==m)){var A=q[s[t]].x,H=q[s[t]].y,I=void 0,N=void 0,$=void 0,K=void 0,Q=void 0,L=void 0,G=void 0,j=void 0,W=void 0,y=void 0,E=void 0,S=void 0,I=$=Q=void 0,I=D-x,N=C-B,$=u-D,K=v-C,Q=x-u,L=B-v,G=A-u,j=H-v,W=A-x,y=H-B,E=A-D,S=H-C,I=I*y-N*W,Q=Q*j-L*G,$=$*S-K*E;if(0<=I&&0<=$&&0<=Q){q=!1;break a}}q=!0}}if(q){f.push([a[g[i]],
a[g[l]],a[g[k]]]);h.push([g[i],g[l],g[k]]);for(i=l,k=l+1;k<e;i++,k++)g[i]=g[k];e--;n=2*e}}return d?h:f};a.Triangulate.area=b;return a})(THREE.FontUtils);self._typeface_js={faces:THREE.FontUtils.faces,loadFace:THREE.FontUtils.loadFace};
THREE.TorusGeometry=function(a,b,c,d,e){THREE.Geometry.call(this);this.radius=a||100;this.tube=b||40;this.segmentsR=c||8;this.segmentsT=d||6;this.arc=e||2*Math.PI;e=new THREE.Vector3;a=[];b=[];for(c=0;c<=this.segmentsR;c++)for(d=0;d<=this.segmentsT;d++){var f=d/this.segmentsT*this.arc,g=2*c/this.segmentsR*Math.PI;e.x=this.radius*Math.cos(f);e.y=this.radius*Math.sin(f);var h=new THREE.Vector3;h.x=(this.radius+this.tube*Math.cos(g))*Math.cos(f);h.y=(this.radius+this.tube*Math.cos(g))*Math.sin(f);h.z=
this.tube*Math.sin(g);this.vertices.push(new THREE.Vertex(h));a.push(new THREE.UV(d/this.segmentsT,1-c/this.segmentsR));b.push(h.clone().subSelf(e).normalize())}for(c=1;c<=this.segmentsR;c++)for(d=1;d<=this.segmentsT;d++){var e=(this.segmentsT+1)*c+d-1,f=(this.segmentsT+1)*(c-1)+d-1,g=(this.segmentsT+1)*(c-1)+d,h=(this.segmentsT+1)*c+d,i=new THREE.Face4(e,f,g,h,[b[e],b[f],b[g],b[h]]);i.normal.addSelf(b[e]);i.normal.addSelf(b[f]);i.normal.addSelf(b[g]);i.normal.addSelf(b[h]);i.normal.normalize();this.faces.push(i);
this.faceVertexUvs[0].push([a[e].clone(),a[f].clone(),a[g].clone(),a[h].clone()])}this.computeCentroids()};THREE.TorusGeometry.prototype=new THREE.Geometry;THREE.TorusGeometry.prototype.constructor=THREE.TorusGeometry;
THREE.TorusKnotGeometry=function(a,b,c,d,e,f,g){function h(a,b,c,d,e,f){var g=Math.cos(a);Math.cos(b);b=Math.sin(a);a*=c/d;c=Math.cos(a);g*=0.5*e*(2+c);b=0.5*e*(2+c)*b;e=0.5*f*e*Math.sin(a);return new THREE.Vector3(g,b,e)}THREE.Geometry.call(this);this.radius=a||200;this.tube=b||40;this.segmentsR=c||64;this.segmentsT=d||8;this.p=e||2;this.q=f||3;this.heightScale=g||1;this.grid=Array(this.segmentsR);c=new THREE.Vector3;d=new THREE.Vector3;e=new THREE.Vector3;for(a=0;a<this.segmentsR;++a){this.grid[a]=
Array(this.segmentsT);for(b=0;b<this.segmentsT;++b){var i=2*(a/this.segmentsR)*this.p*Math.PI,g=2*(b/this.segmentsT)*Math.PI,f=h(i,g,this.q,this.p,this.radius,this.heightScale),i=h(i+0.01,g,this.q,this.p,this.radius,this.heightScale);c.sub(i,f);d.add(i,f);e.cross(c,d);d.cross(e,c);e.normalize();d.normalize();i=-this.tube*Math.cos(g);g=this.tube*Math.sin(g);f.x+=i*d.x+g*e.x;f.y+=i*d.y+g*e.y;f.z+=i*d.z+g*e.z;this.grid[a][b]=this.vertices.push(new THREE.Vertex(new THREE.Vector3(f.x,f.y,f.z)))-1}}for(a=
0;a<this.segmentsR;++a)for(b=0;b<this.segmentsT;++b){var e=(a+1)%this.segmentsR,f=(b+1)%this.segmentsT,c=this.grid[a][b],d=this.grid[e][b],e=this.grid[e][f],f=this.grid[a][f],g=new THREE.UV(a/this.segmentsR,b/this.segmentsT),i=new THREE.UV((a+1)/this.segmentsR,b/this.segmentsT),l=new THREE.UV((a+1)/this.segmentsR,(b+1)/this.segmentsT),k=new THREE.UV(a/this.segmentsR,(b+1)/this.segmentsT);this.faces.push(new THREE.Face4(c,d,e,f));this.faceVertexUvs[0].push([g,i,l,k])}this.computeCentroids();this.computeFaceNormals();
this.computeVertexNormals()};THREE.TorusKnotGeometry.prototype=new THREE.Geometry;THREE.TorusKnotGeometry.prototype.constructor=THREE.TorusKnotGeometry;
THREE.AxisHelper=function(){THREE.Object3D.call(this);var a=new THREE.Geometry;a.vertices.push(new THREE.Vertex);a.vertices.push(new THREE.Vertex(new THREE.Vector3(0,100,0)));var b=new THREE.CylinderGeometry(0,5,25,5,1),c;c=new THREE.Line(a,new THREE.LineBasicMaterial({color:16711680}));c.rotation.z=-Math.PI/2;this.add(c);c=new THREE.Mesh(b,new THREE.MeshBasicMaterial({color:16711680}));c.position.x=100;c.rotation.z=-Math.PI/2;this.add(c);c=new THREE.Line(a,new THREE.LineBasicMaterial({color:65280}));
this.add(c);c=new THREE.Mesh(b,new THREE.MeshBasicMaterial({color:65280}));c.position.y=100;this.add(c);c=new THREE.Line(a,new THREE.LineBasicMaterial({color:255}));c.rotation.x=Math.PI/2;this.add(c);c=new THREE.Mesh(b,new THREE.MeshBasicMaterial({color:255}));c.position.z=100;c.rotation.x=Math.PI/2;this.add(c)};THREE.AxisHelper.prototype=new THREE.Object3D;THREE.AxisHelper.prototype.constructor=THREE.AxisHelper;
THREE.CameraHelper=function(a){function b(a,b,d){c(a,d);c(b,d)}function c(a,b){d.lineGeometry.vertices.push(new THREE.Vertex(new THREE.Vector3));d.lineGeometry.colors.push(new THREE.Color(b));void 0===d.pointMap[a]&&(d.pointMap[a]=[]);d.pointMap[a].push(d.lineGeometry.vertices.length-1)}THREE.Object3D.call(this);var d=this;this.lineGeometry=new THREE.Geometry;this.lineMaterial=new THREE.LineBasicMaterial({color:16777215,vertexColors:THREE.FaceColors});this.pointMap={};b("n1","n2",16755200);b("n2",
"n4",16755200);b("n4","n3",16755200);b("n3","n1",16755200);b("f1","f2",16755200);b("f2","f4",16755200);b("f4","f3",16755200);b("f3","f1",16755200);b("n1","f1",16755200);b("n2","f2",16755200);b("n3","f3",16755200);b("n4","f4",16755200);b("p","n1",16711680);b("p","n2",16711680);b("p","n3",16711680);b("p","n4",16711680);b("u1","u2",43775);b("u2","u3",43775);b("u3","u1",43775);b("c","t",16777215);b("p","c",3355443);b("cn1","cn2",3355443);b("cn3","cn4",3355443);b("cf1","cf2",3355443);b("cf3","cf4",3355443);
this.update(a);this.lines=new THREE.Line(this.lineGeometry,this.lineMaterial,THREE.LinePieces);this.add(this.lines)};THREE.CameraHelper.prototype=new THREE.Object3D;THREE.CameraHelper.prototype.constructor=THREE.CameraHelper;
THREE.CameraHelper.prototype.update=function(a){function b(a,b,f,g){THREE.CameraHelper.__v.set(b,f,g);THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v,THREE.CameraHelper.__c);a=c.pointMap[a];if(void 0!==a){b=0;for(f=a.length;b<f;b++)c.lineGeometry.vertices[a[b]].position.copy(THREE.CameraHelper.__v)}}var c=this;THREE.CameraHelper.__c.projectionMatrix.copy(a.projectionMatrix);b("c",0,0,-1);b("t",0,0,1);b("n1",-1,-1,-1);b("n2",1,-1,-1);b("n3",-1,1,-1);b("n4",1,1,-1);b("f1",-1,-1,
1);b("f2",1,-1,1);b("f3",-1,1,1);b("f4",1,1,1);b("u1",0.7,1.1,-1);b("u2",-0.7,1.1,-1);b("u3",0,2,-1);b("cf1",-1,0,1);b("cf2",1,0,1);b("cf3",0,-1,1);b("cf4",0,1,1);b("cn1",-1,0,-1);b("cn2",1,0,-1);b("cn3",0,-1,-1);b("cn4",0,1,-1);this.lineGeometry.__dirtyVertices=!0};THREE.CameraHelper.__projector=new THREE.Projector;THREE.CameraHelper.__v=new THREE.Vector3;THREE.CameraHelper.__c=new THREE.Camera;
THREE.SubdivisionModifier=function(a){this.subdivisions=void 0===a?1:a;this.useOldVertexColors=!1;this.supportUVs=!0};THREE.SubdivisionModifier.prototype.constructor=THREE.SubdivisionModifier;THREE.SubdivisionModifier.prototype.modify=function(a){for(var b=this.subdivisions;0<b--;)this.smooth(a)};
THREE.SubdivisionModifier.prototype.smooth=function(a){function b(a,b,c,d,h,i){var l=new THREE.Face4(a,b,c,d,null,h.color,h.material);if(g.useOldVertexColors){l.vertexColors=[];for(var k,m,n,o=0;4>o;o++){n=i[o];k=new THREE.Color;k.setRGB(0,0,0);for(var p=0;p<n.length;p++)m=h.vertexColors[n[p]-1],k.r+=m.r,k.g+=m.g,k.b+=m.b;k.r/=n.length;k.g/=n.length;k.b/=n.length;l.vertexColors[o]=k}}e.push(l);(!g.supportUVs||0!=q.length)&&f.push([q[a],q[b],q[c],q[d]])}function c(a,b){return Math.min(a,b)+"_"+Math.max(a,
b)}var d=[],e=[],f=[],g=this,h=a.vertices,d=a.faces,i=h.concat(),l=[],k={},n={},q=[],o,p,m,r,s,t=a.faceVertexUvs[0];for(o=0,p=t.length;o<p;o++)for(m=0,r=t[o].length;m<r;m++)s=d[o]["abcd".charAt(m)],q[s]||(q[s]=t[o][m]);var u;for(o=0,p=d.length;o<p;o++)if(s=d[o],l.push(s.centroid),i.push(new THREE.Vertex(s.centroid)),g.supportUVs&&0!=q.length){u=new THREE.UV;if(s instanceof THREE.Face3)u.u=q[s.a].u+q[s.b].u+q[s.c].u,u.v=q[s.a].v+q[s.b].v+q[s.c].v,u.u/=3,u.v/=3;else if(s instanceof THREE.Face4)u.u=
q[s.a].u+q[s.b].u+q[s.c].u+q[s.d].u,u.v=q[s.a].v+q[s.b].v+q[s.c].v+q[s.d].v,u.u/=4,u.v/=4;q.push(u)}p=function(a){function b(a,c,d){void 0===a[c]&&(a[c]=[]);a[c].push(d)}var d,e,f,g,h={};for(d=0,e=a.faces.length;d<e;d++)f=a.faces[d],f instanceof THREE.Face3?(g=c(f.a,f.b),b(h,g,d),g=c(f.b,f.c),b(h,g,d),g=c(f.c,f.a),b(h,g,d)):f instanceof THREE.Face4&&(g=c(f.a,f.b),b(h,g,d),g=c(f.b,f.c),b(h,g,d),g=c(f.c,f.d),b(h,g,d),g=c(f.d,f.a),b(h,g,d));return h}(a);var v=0,t=h.length,x,B,D={},C={},A=function(a,
b){void 0===D[a]&&(D[a]=[]);D[a].push(b)},H=function(a,b){void 0===C[a]&&(C[a]={});C[a][b]=null};for(o in p){u=p[o];x=o.split("_");B=x[0];x=x[1];A(B,[B,x]);A(x,[B,x]);for(m=0,r=u.length;m<r;m++)s=u[m],H(B,s,o),H(x,s,o);2>u.length&&(n[o]=!0)}for(o in p)if(u=p[o],s=u[0],u=u[1],x=o.split("_"),B=x[0],x=x[1],r=new THREE.Vector3,n[o]?(r.addSelf(h[B].position),r.addSelf(h[x].position),r.multiplyScalar(0.5)):(r.addSelf(l[s]),r.addSelf(l[u]),r.addSelf(h[B].position),r.addSelf(h[x].position),r.multiplyScalar(0.25)),
k[o]=t+d.length+v,i.push(new THREE.Vertex(r)),v++,g.supportUVs&&0!=q.length)u=new THREE.UV,u.u=q[B].u+q[x].u,u.v=q[B].v+q[x].v,u.u/=2,u.v/=2,q.push(u);var I,N;x=["123","12","2","23"];r=["123","23","3","31"];var A=["123","31","1","12"],H=["1234","12","2","23"],$=["1234","23","3","34"],K=["1234","34","4","41"],Q=["1234","41","1","12"];for(o=0,p=l.length;o<p;o++)s=d[o],u=t+o,s instanceof THREE.Face3?(v=c(s.a,s.b),B=c(s.b,s.c),I=c(s.c,s.a),b(u,k[v],s.b,k[B],s,x),b(u,k[B],s.c,k[I],s,r),b(u,k[I],s.a,k[v],
s,A)):s instanceof THREE.Face4?(v=c(s.a,s.b),B=c(s.b,s.c),I=c(s.c,s.d),N=c(s.d,s.a),b(u,k[v],s.b,k[B],s,H),b(u,k[B],s.c,k[I],s,$),b(u,k[I],s.d,k[N],s,K),b(u,k[N],s.a,k[v],s,Q)):console.log("face should be a face!",s);d=i;i=new THREE.Vector3;k=new THREE.Vector3;for(o=0,p=h.length;o<p;o++)if(void 0!==D[o]){i.set(0,0,0);k.set(0,0,0);s=new THREE.Vector3(0,0,0);u=0;for(m in C[o])i.addSelf(l[m]),u++;v=0;t=D[o].length;for(m=0;m<t;m++)n[c(D[o][m][0],D[o][m][1])]&&v++;if(2!=v){i.divideScalar(u);for(m=0;m<
t;m++)u=D[o][m],u=h[u[0]].position.clone().addSelf(h[u[1]].position).divideScalar(2),k.addSelf(u);k.divideScalar(t);s.addSelf(h[o].position);s.multiplyScalar(t-3);s.addSelf(i);s.addSelf(k.multiplyScalar(2));s.divideScalar(t);d[o].position=s}}a.vertices=d;a.faces=e;a.faceVertexUvs[0]=f;delete a.__tmpVertices;a.computeCentroids();a.computeFaceNormals();a.computeVertexNormals()};
THREE.Loader=function(a){this.statusDomElement=(this.showStatus=a)?THREE.Loader.prototype.addStatusElement():null;this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){}};
THREE.Loader.prototype={constructor:THREE.Loader,crossOrigin:"",addStatusElement:function(){var a=document.createElement("div");a.style.position="absolute";a.style.right="0px";a.style.top="0px";a.style.fontSize="0.8em";a.style.textAlign="left";a.style.background="rgba(0,0,0,0.25)";a.style.color="#fff";a.style.width="120px";a.style.padding="0.5em 0.5em 0.5em 0.5em";a.style.zIndex=1E3;a.innerHTML="Loading ...";return a},updateProgress:function(a){var b="Loaded ",b=a.total?b+((100*a.loaded/a.total).toFixed(0)+
"%"):b+((a.loaded/1E3).toFixed(2)+" KB");this.statusDomElement.innerHTML=b},extractUrlbase:function(a){a=a.split("/");a.pop();return 1>a.length?"":a.join("/")+"/"},initMaterials:function(a,b,c){a.materials=[];for(var d=0;d<b.length;++d)a.materials[d]=THREE.Loader.prototype.createMaterial(b[d],c)},hasNormals:function(a){var b,c,d=a.materials.length;for(c=0;c<d;c++)if(b=a.materials[c],b instanceof THREE.ShaderMaterial)return!0;return!1},createMaterial:function(a,b){function c(a){a=Math.log(a)/Math.LN2;
return Math.floor(a)==a}function d(a){a=Math.log(a)/Math.LN2;return Math.pow(2,Math.round(a))}function e(a,b){var e=new Image;e.onload=function(){if(!c(this.width)||!c(this.height)){var b=d(this.width),e=d(this.height);a.image.width=b;a.image.height=e;a.image.getContext("2d").drawImage(this,0,0,b,e)}else a.image=this;a.needsUpdate=!0};e.crossOrigin=h.crossOrigin;e.src=b}function f(a,c,d,f,g,h){var i=document.createElement("canvas");a[c]=new THREE.Texture(i);a[c].sourceFile=d;if(f){a[c].repeat.set(f[0],
f[1]);if(1!=f[0])a[c].wrapS=THREE.RepeatWrapping;if(1!=f[1])a[c].wrapT=THREE.RepeatWrapping}g&&a[c].offset.set(g[0],g[1]);if(h){f={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping};if(void 0!==f[h[0]])a[c].wrapS=f[h[0]];if(void 0!==f[h[1]])a[c].wrapT=f[h[1]]}e(a[c],b+"/"+d)}function g(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]}var h=this,i="MeshLambertMaterial",l={color:15658734,opacity:1,map:null,lightMap:null,normalMap:null,wireframe:a.wireframe};a.shading&&("Phong"==a.shading?
i="MeshPhongMaterial":"Basic"==a.shading&&(i="MeshBasicMaterial"));if(a.blending)if("Additive"==a.blending)l.blending=THREE.AdditiveBlending;else if("Subtractive"==a.blending)l.blending=THREE.SubtractiveBlending;else if("Multiply"==a.blending)l.blending=THREE.MultiplyBlending;if(void 0!==a.transparent||1>a.opacity)l.transparent=a.transparent;if(void 0!==a.depthTest)l.depthTest=a.depthTest;if(void 0!==a.vertexColors)if("face"==a.vertexColors)l.vertexColors=THREE.FaceColors;else if(a.vertexColors)l.vertexColors=
THREE.VertexColors;if(a.colorDiffuse)l.color=g(a.colorDiffuse);else if(a.DbgColor)l.color=a.DbgColor;if(a.colorSpecular)l.specular=g(a.colorSpecular);if(a.colorAmbient)l.ambient=g(a.colorAmbient);if(a.transparency)l.opacity=a.transparency;if(a.specularCoef)l.shininess=a.specularCoef;a.mapDiffuse&&b&&f(l,"map",a.mapDiffuse,a.mapDiffuseRepeat,a.mapDiffuseOffset,a.mapDiffuseWrap);a.mapLight&&b&&f(l,"lightMap",a.mapLight,a.mapLightRepeat,a.mapLightOffset,a.mapLightWrap);a.mapNormal&&b&&f(l,"normalMap",
a.mapNormal,a.mapNormalRepeat,a.mapNormalOffset,a.mapNormalWrap);a.mapSpecular&&b&&f(l,"specularMap",a.mapSpecular,a.mapSpecularRepeat,a.mapSpecularOffset,a.mapSpecularWrap);if(a.mapNormal){var i=THREE.ShaderUtils.lib.normal,k=THREE.UniformsUtils.clone(i.uniforms);k.tNormal.texture=l.normalMap;if(a.mapNormalFactor)k.uNormalScale.value=a.mapNormalFactor;if(l.map)k.tDiffuse.texture=l.map,k.enableDiffuse.value=!0;if(l.specularMap)k.tSpecular.texture=l.specularMap,k.enableSpecular.value=!0;if(l.lightMap)k.tAO.texture=
l.lightMap,k.enableAO.value=!0;k.uDiffuseColor.value.setHex(l.color);k.uSpecularColor.value.setHex(l.specular);k.uAmbientColor.value.setHex(l.ambient);k.uShininess.value=l.shininess;if(void 0!==l.opacity)k.uOpacity.value=l.opacity;l=new THREE.ShaderMaterial({fragmentShader:i.fragmentShader,vertexShader:i.vertexShader,uniforms:k,lights:!0,fog:!0})}else l=new THREE[i](l);if(void 0!==a.DbgName)l.name=a.DbgName;return l}};THREE.BinaryLoader=function(a){THREE.Loader.call(this,a)};
THREE.BinaryLoader.prototype=new THREE.Loader;THREE.BinaryLoader.prototype.constructor=THREE.BinaryLoader;THREE.BinaryLoader.prototype.supr=THREE.Loader.prototype;
THREE.BinaryLoader.prototype.load=function(a,b,c,d){if(a instanceof Object)console.warn("DEPRECATED: BinaryLoader( parameters ) is now BinaryLoader( url, callback, texturePath, binaryPath )."),d=a,a=d.model,b=d.callback,c=d.texture_path,d=d.bin_path;var c=c?c:this.extractUrlbase(a),d=d?d:this.extractUrlbase(a),e=this.showProgress?THREE.Loader.prototype.updateProgress:null;this.onLoadStart();this.loadAjaxJSON(this,a,b,c,d,e)};
THREE.BinaryLoader.prototype.loadAjaxJSON=function(a,b,c,d,e,f){var g=new XMLHttpRequest;g.onreadystatechange=function(){if(4==g.readyState)if(200==g.status||0==g.status)try{var h=JSON.parse(g.responseText);void 0===h.metadata||void 0===h.metadata.formatVersion||3!==h.metadata.formatVersion?console.error("Deprecated file format."):a.loadAjaxBuffers(h,c,e,d,f)}catch(i){console.error(i),console.warn("DEPRECATED: ["+b+"] seems to be using old model format")}else console.error("Couldn't load ["+b+"] ["+
g.status+"]")};g.open("GET",b,!0);g.overrideMimeType&&g.overrideMimeType("text/plain; charset=x-user-defined");g.setRequestHeader("Content-Type","text/plain");g.send(null)};
THREE.BinaryLoader.prototype.loadAjaxBuffers=function(a,b,c,d,e){var f=new XMLHttpRequest,g=c+"/"+a.buffers,h=0;f.onreadystatechange=function(){4==f.readyState?200==f.status||0==f.status?THREE.BinaryLoader.prototype.createBinModel(f.response,b,d,a.materials):console.error("Couldn't load ["+g+"] ["+f.status+"]"):3==f.readyState?e&&(0==h&&(h=f.getResponseHeader("Content-Length")),e({total:h,loaded:f.responseText.length})):2==f.readyState&&(h=f.getResponseHeader("Content-Length"))};f.open("GET",g,!0);
f.responseType="arraybuffer";f.send(null)};
THREE.BinaryLoader.prototype.createBinModel=function(a,b,c,d){var e=function(b){var c,e,i,l,k,n,q,o,p,m,r,s,t,u,v,x;function B(a){return a%4?4-a%4:0}function D(a,b){return(new Uint8Array(a,b,1))[0]}function C(a,b){return(new Uint32Array(a,b,1))[0]}function A(b,c){var d,e,f,g,h,i,l,k,m=new Uint32Array(a,c,3*b);for(d=0;d<b;d++){e=m[3*d];f=m[3*d+1];g=m[3*d+2];h=j[2*e];e=j[2*e+1];i=j[2*f];l=j[2*f+1];f=j[2*g];k=j[2*g+1];g=Q.faceVertexUvs[0];var n=[];n.push(new THREE.UV(h,e));n.push(new THREE.UV(i,l));
n.push(new THREE.UV(f,k));g.push(n)}}function H(b,c){var d,e,f,g,h,i,l,k,m,n,o=new Uint32Array(a,c,4*b);for(d=0;d<b;d++){e=o[4*d];f=o[4*d+1];g=o[4*d+2];h=o[4*d+3];i=j[2*e];e=j[2*e+1];l=j[2*f];m=j[2*f+1];k=j[2*g];n=j[2*g+1];g=j[2*h];f=j[2*h+1];h=Q.faceVertexUvs[0];var p=[];p.push(new THREE.UV(i,e));p.push(new THREE.UV(l,m));p.push(new THREE.UV(k,n));p.push(new THREE.UV(g,f));h.push(p)}}function I(b,c,d){for(var e,f,g,h,c=new Uint32Array(a,c,3*b),j=new Uint16Array(a,d,b),d=0;d<b;d++)e=c[3*d],f=c[3*
d+1],g=c[3*d+2],h=j[d],Q.faces.push(new THREE.Face3(e,f,g,null,null,h))}function N(b,c,d){for(var e,f,g,h,j,c=new Uint32Array(a,c,4*b),i=new Uint16Array(a,d,b),d=0;d<b;d++)e=c[4*d],f=c[4*d+1],g=c[4*d+2],h=c[4*d+3],j=i[d],Q.faces.push(new THREE.Face4(e,f,g,h,null,null,j))}function $(b,c,d,e){for(var f,g,h,j,i,l,k,c=new Uint32Array(a,c,3*b),d=new Uint32Array(a,d,3*b),m=new Uint16Array(a,e,b),e=0;e<b;e++){f=c[3*e];g=c[3*e+1];h=c[3*e+2];i=d[3*e];l=d[3*e+1];k=d[3*e+2];j=m[e];var n=G[3*l],o=G[3*l+1];l=
G[3*l+2];var p=G[3*k],q=G[3*k+1];k=G[3*k+2];Q.faces.push(new THREE.Face3(f,g,h,[new THREE.Vector3(G[3*i],G[3*i+1],G[3*i+2]),new THREE.Vector3(n,o,l),new THREE.Vector3(p,q,k)],null,j))}}function K(b,c,d,e){for(var f,g,h,j,i,l,k,m,n,c=new Uint32Array(a,c,4*b),d=new Uint32Array(a,d,4*b),o=new Uint16Array(a,e,b),e=0;e<b;e++){f=c[4*e];g=c[4*e+1];h=c[4*e+2];j=c[4*e+3];l=d[4*e];k=d[4*e+1];m=d[4*e+2];n=d[4*e+3];i=o[e];var p=G[3*k],q=G[3*k+1];k=G[3*k+2];var r=G[3*m],s=G[3*m+1];m=G[3*m+2];var t=G[3*n],u=G[3*
n+1];n=G[3*n+2];Q.faces.push(new THREE.Face4(f,g,h,j,[new THREE.Vector3(G[3*l],G[3*l+1],G[3*l+2]),new THREE.Vector3(p,q,k),new THREE.Vector3(r,s,m),new THREE.Vector3(t,u,n)],null,i))}}var Q=this,L=0,G=[],j=[],W,y;THREE.Geometry.call(this);THREE.Loader.prototype.initMaterials(Q,d,b);c=function(a,b,c){for(var a=new Uint8Array(a,b,c),d="",e=0;e<c;e++)d+=String.fromCharCode(a[b+e]);return d}(a,L,12);e=D(a,L+12);D(a,L+13);D(a,L+14);D(a,L+15);i=D(a,L+16);l=D(a,L+17);k=D(a,L+18);n=D(a,L+19);q=C(a,L+20);
o=C(a,L+20+4);p=C(a,L+20+8);b=C(a,L+20+12);m=C(a,L+20+16);r=C(a,L+20+20);s=C(a,L+20+24);t=C(a,L+20+28);u=C(a,L+20+32);v=C(a,L+20+36);x=C(a,L+20+40);"Three.js 003"!==c&&console.warn("DEPRECATED: binary model seems to be using old format");L+=e;c=3*i+n;y=4*i+n;e=b*c;W=m*(c+3*l);i=r*(c+3*k);n=s*(c+3*l+3*k);c=t*y;l=u*(y+4*l);k=v*(y+4*k);L+=function(b){var b=new Float32Array(a,b,3*q),c,d,e,f;for(c=0;c<q;c++)d=b[3*c],e=b[3*c+1],f=b[3*c+2],Q.vertices.push(new THREE.Vertex(new THREE.Vector3(d,e,f)));return 3*
q*Float32Array.BYTES_PER_ELEMENT}(L);L+=function(b){if(o){var b=new Int8Array(a,b,3*o),c,d,e,f;for(c=0;c<o;c++)d=b[3*c],e=b[3*c+1],f=b[3*c+2],G.push(d/127,e/127,f/127)}return 3*o*Int8Array.BYTES_PER_ELEMENT}(L);L+=B(3*o);L+=function(b){if(p){var b=new Float32Array(a,b,2*p),c,d,e;for(c=0;c<p;c++)d=b[2*c],e=b[2*c+1],j.push(d,e)}return 2*p*Float32Array.BYTES_PER_ELEMENT}(L);e=L+e+B(2*b);W=e+W+B(2*m);i=W+i+B(2*r);n=i+n+B(2*s);c=n+c+B(2*t);l=c+l+B(2*u);k=l+k+B(2*v);(function(a){if(r){var b=a+3*r*Uint32Array.BYTES_PER_ELEMENT;
I(r,a,b+3*r*Uint32Array.BYTES_PER_ELEMENT);A(r,b)}})(W);(function(a){if(s){var b=a+3*s*Uint32Array.BYTES_PER_ELEMENT,c=b+3*s*Uint32Array.BYTES_PER_ELEMENT;$(s,a,b,c+3*s*Uint32Array.BYTES_PER_ELEMENT);A(s,c)}})(i);(function(a){if(v){var b=a+4*v*Uint32Array.BYTES_PER_ELEMENT;N(v,a,b+4*v*Uint32Array.BYTES_PER_ELEMENT);H(v,b)}})(l);(function(a){if(x){var b=a+4*x*Uint32Array.BYTES_PER_ELEMENT,c=b+4*x*Uint32Array.BYTES_PER_ELEMENT;K(x,a,b,c+4*x*Uint32Array.BYTES_PER_ELEMENT);H(x,c)}})(k);b&&I(b,L,L+3*b*
Uint32Array.BYTES_PER_ELEMENT);(function(a){if(m){var b=a+3*m*Uint32Array.BYTES_PER_ELEMENT;$(m,a,b,b+3*m*Uint32Array.BYTES_PER_ELEMENT)}})(e);t&&N(t,n,n+4*t*Uint32Array.BYTES_PER_ELEMENT);(function(a){if(u){var b=a+4*u*Uint32Array.BYTES_PER_ELEMENT;K(u,a,b,b+4*u*Uint32Array.BYTES_PER_ELEMENT)}})(c);this.computeCentroids();this.computeFaceNormals();THREE.Loader.prototype.hasNormals(this)&&this.computeTangents()};e.prototype=new THREE.Geometry;e.prototype.constructor=e;b(new e(c))};
THREE.ColladaLoader=function(){function a(a,d,e){V=a;d=d||da;void 0!==e&&(a=e.split("/"),a.pop(),ib=1>a.length?"":a.join("/")+"/");if((a=V.evaluate("//dae:asset",V,W,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null).iterateNext())&&a.childNodes)for(e=0;e<a.childNodes.length;e++){var j=a.childNodes[e];switch(j.nodeName){case "unit":(j=j.getAttribute("meter"))&&parseFloat(j);break;case "up_axis":Ba=j.textContent.charAt(0)}}if(!ra.convertUpAxis||Ba===ra.upAxis)ja=null;else switch(Ba){case "X":ja="Y"===ra.upAxis?
"XtoY":"XtoZ";break;case "Y":ja="X"===ra.upAxis?"YtoX":"YtoZ";break;case "Z":ja="X"===ra.upAxis?"ZtoX":"ZtoY"}Qa=b("//dae:library_images/dae:image",g,"image");Ja=b("//dae:library_materials/dae:material",C,"material");Da=b("//dae:library_effects/dae:effect",$,"effect");Aa=b("//dae:library_geometries/dae:geometry",r,"geometry");za=b("//dae:library_controllers/dae:controller",h,"controller");la=b("//dae:library_animations/dae:animation",Q,"animation");Ta=b(".//dae:library_visual_scenes/dae:visual_scene",
k,"visual_scene");db=[];Wa=[];(a=V.evaluate(".//dae:scene/dae:instance_visual_scene",V,W,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null).iterateNext())?(a=a.getAttribute("url").replace(/^#/,""),ca=Ta[a]):ca=null;ba=new THREE.Object3D;for(a=0;a<ca.nodes.length;a++)ba.add(f(ca.nodes[a]));$a=[];c(ba);a={scene:ba,morphs:db,skins:Wa,animations:$a,dae:{images:Qa,materials:Ja,effects:Da,geometries:Aa,controllers:za,animations:la,visualScenes:Ta,scene:ca}};d&&d(a);return a}function b(a,b,c){for(var a=V.evaluate(a,
V,W,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null),d={},e=a.iterateNext(),f=0;e;){e=(new b).parse(e);if(!e.id||0==e.id.length)e.id=c+f++;d[e.id]=e;e=a.iterateNext()}return d}function c(a){var b=ca.getChildById(a.name,!0),d=null;if(b&&b.keys){d={fps:60,hierarchy:[{node:b,keys:b.keys,sids:b.sids}],node:a,name:"animation_"+a.name,length:0};$a.push(d);for(var e=0,f=b.keys.length;e<f;e++)d.length=Math.max(d.length,b.keys[e].time)}else d={hierarchy:[{keys:[],sids:[]}]};e=0;for(f=a.children.length;e<f;e++)for(var b=
0,g=c(a.children[e]).hierarchy.length;b<g;b++)d.hierarchy.push({keys:[],sids:[]});return d}function d(a,b,c,e){a.world=a.world||new THREE.Matrix4;a.world.copy(a.matrix);if(a.channels&&a.channels.length){var f=a.channels[0].sampler.output[c];f instanceof THREE.Matrix4&&a.world.copy(f)}e&&a.world.multiply(e,a.world);b.push(a);for(e=0;e<a.nodes.length;e++)d(a.nodes[e],b,c,a.world)}function e(a,b,c){var e,f=za[b.url];if(!f||!f.skin)console.log("ColladaLoader: Could not find skin controller.");else if(!b.skeleton||
!b.skeleton.length)console.log("ColladaLoader: Could not find the skeleton for the skin. ");else{var c=1E6,g=-c,h=0;for(e in la)for(var j=la[e],i=0;i<j.sampler.length;i++){var l=j.sampler[i];l.create();c=Math.min(c,l.startTime);g=Math.max(g,l.endTime);h=Math.max(h,l.input.length)}e=h;for(var b=ca.getChildById(b.skeleton[0],!0)||ca.getChildBySid(b.skeleton[0],!0),k,m,g=new THREE.Vector3,n,i=0;i<a.vertices.length;i++)f.skin.bindShapeMatrix.multiplyVector3(a.vertices[i].position);for(c=0;c<e;c++){h=
[];j=[];for(i=0;i<a.vertices.length;i++)j.push(new THREE.Vertex(new THREE.Vector3));d(b,h,c);i=h;l=f.skin;for(m=0;m<i.length;m++)if(k=i[m],n=-1,"JOINT"==k.type){for(var o=0;o<l.joints.length;o++)if(k.sid==l.joints[o]){n=o;break}if(0<=n){o=l.invBindMatrices[n];k.invBindMatrix=o;k.skinningMatrix=new THREE.Matrix4;k.skinningMatrix.multiply(k.world,o);k.weights=[];for(o=0;o<l.weights.length;o++)for(var p=0;p<l.weights[o].length;p++){var q=l.weights[o][p];q.joint==n&&k.weights.push(q)}}else throw"ColladaLoader: Could not find joint '"+
k.sid+"'.";}for(i=0;i<h.length;i++)if("JOINT"==h[i].type)for(l=0;l<h[i].weights.length;l++)k=h[i].weights[l],m=k.index,k=k.weight,n=a.vertices[m],m=j[m],g.x=n.position.x,g.y=n.position.y,g.z=n.position.z,h[i].skinningMatrix.multiplyVector3(g),m.position.x+=g.x*k,m.position.y+=g.y*k,m.position.z+=g.z*k;a.morphTargets.push({name:"target_"+c,vertices:j})}}}function f(a){var b=new THREE.Object3D,c,d,g,h;for(g=0;g<a.controllers.length;g++){var j=za[a.controllers[g].url];switch(j.type){case "skin":if(Aa[j.skin.source]){var i=
new m;i.url=j.skin.source;i.instance_material=a.controllers[g].instance_material;a.geometries.push(i);c=a.controllers[g]}else if(za[j.skin.source]&&(d=j=za[j.skin.source],j.morph&&Aa[j.morph.source]))i=new m,i.url=j.morph.source,i.instance_material=a.controllers[g].instance_material,a.geometries.push(i);break;case "morph":if(Aa[j.morph.source])i=new m,i.url=j.morph.source,i.instance_material=a.controllers[g].instance_material,a.geometries.push(i),d=a.controllers[g];console.log("ColladaLoader: Morph-controller partially supported.")}}for(g=
0;g<a.geometries.length;g++){var j=a.geometries[g],i=j.instance_material,j=Aa[j.url],l={},k=[],n=0,p;if(j&&j.mesh&&j.mesh.primitives){if(0==b.name.length)b.name=j.id;if(i)for(h=0;h<i.length;h++){p=i[h];var q=Da[Ja[p.target].instance_effect.url].shader;q.material.opacity=!q.material.opacity?1:q.material.opacity;l[p.symbol]=n;k.push(q.material);p=q.material;n++}i=p||new THREE.MeshLambertMaterial({color:14540253,shading:THREE.FlatShading});j=j.mesh.geometry3js;if(1<n){i=new THREE.MeshFaceMaterial;j.materials=
k;for(h=0;h<j.faces.length;h++)k=j.faces[h],k.materialIndex=l[k.daeMaterial]}if(void 0!==c)e(j,c),i.morphTargets=!0,i=new THREE.SkinnedMesh(j,i),i.skeleton=c.skeleton,i.skinController=za[c.url],i.skinInstanceController=c,i.name="skin_"+Wa.length,Wa.push(i);else if(void 0!==d){h=j;l=d instanceof o?za[d.url]:d;if(!l||!l.morph)console.log("could not find morph controller!");else{l=l.morph;for(k=0;k<l.targets.length;k++)if(n=Aa[l.targets[k]],n.mesh&&n.mesh.primitives&&n.mesh.primitives.length)n=n.mesh.primitives[0].geometry,
n.vertices.length===h.vertices.length&&h.morphTargets.push({name:"target_1",vertices:n.vertices});h.morphTargets.push({name:"target_Z",vertices:h.vertices})}i.morphTargets=!0;i=new THREE.Mesh(j,i);i.name="morph_"+db.length;db.push(i)}else i=new THREE.Mesh(j,i);1<a.geometries.length?b.add(i):b=i}}b.name=a.id||"";b.matrix=a.matrix;c=a.matrix.decompose();b.position=c[0];b.quaternion=c[1];b.useQuaternion=!0;b.scale=c[2];ra.centerGeometry&&b.geometry&&(c=THREE.GeometryUtils.center(b.geometry),b.quaternion.multiplyVector3(c.multiplySelf(b.scale)),
b.position.subSelf(c));for(g=0;g<a.nodes.length;g++)b.add(f(a.nodes[g],a));return b}function g(){this.init_from=this.id=""}function h(){this.type=this.name=this.id="";this.morph=this.skin=null}function i(){this.weights=this.targets=this.source=this.method=null}function l(){this.source="";this.bindShapeMatrix=null;this.invBindMatrices=[];this.joints=[];this.weights=[]}function k(){this.name=this.id="";this.nodes=[];this.scene=new THREE.Object3D}function n(){this.sid=this.name=this.id="";this.nodes=
[];this.controllers=[];this.transforms=[];this.geometries=[];this.channels=[];this.matrix=new THREE.Matrix4}function q(){this.type=this.sid="";this.data=[];this.obj=null}function o(){this.url="";this.skeleton=[];this.instance_material=[]}function p(){this.target=this.symbol=""}function m(){this.url="";this.instance_material=[]}function r(){this.id="";this.mesh=null}function s(a){this.geometry=a.id;this.primitives=[];this.geometry3js=this.vertices=null}function t(){}function u(){this.material="";this.count=
0;this.inputs=[];this.vcount=null;this.p=[];this.geometry=new THREE.Geometry}function v(){this.source="";this.stride=this.count=0;this.params=[]}function x(){this.input={}}function B(){this.semantic="";this.offset=0;this.source="";this.set=0}function D(a){this.id=a;this.type=null}function C(){this.name=this.id="";this.instance_effect=null}function A(){this.color=new THREE.Color(0);this.color.setRGB(Math.random(),Math.random(),Math.random());this.color.a=1;this.texOpts=this.texcoord=this.texture=null}
function H(a,b){this.type=a;this.effect=b;this.material=null}function I(a){this.effect=a;this.format=this.init_from=null}function N(a){this.effect=a;this.mipfilter=this.magfilter=this.minfilter=this.wrap_t=this.wrap_s=this.source=null}function $(){this.name=this.id="";this.sampler=this.surface=this.shader=null}function K(){this.url=""}function Q(){this.name=this.id="";this.source={};this.sampler=[];this.channel=[]}function L(a){this.animation=a;this.target=this.source="";this.member=this.arrIndices=
this.arrSyntax=this.dotSyntax=this.sid=this.fullSid=null}function G(a){this.id="";this.animation=a;this.inputs=[];this.endTime=this.startTime=this.interpolation=this.strideOut=this.output=this.input=null;this.duration=0}function j(a){this.targets=[];this.time=a}function W(a){return"dae"==a?"http://www.collada.org/2005/11/COLLADASchema":null}function y(a){for(var a=S(a),b=[],c=0;c<a.length;c++)b.push(parseFloat(a[c]));return b}function E(a){for(var a=S(a),b=[],c=0;c<a.length;c++)b.push(parseInt(a[c],
10));return b}function S(a){return a.replace(/^\s+/,"").replace(/\s+$/,"").split(/\s+/)}function T(a,b,c){return a.hasAttribute(b)?parseInt(a.getAttribute(b),10):c}function R(a,b){if(ra.convertUpAxis&&Ba!==ra.upAxis)switch(ja){case "XtoY":var c=a[0];a[0]=b*a[1];a[1]=c;break;case "XtoZ":c=a[2];a[2]=a[1];a[1]=a[0];a[0]=c;break;case "YtoX":c=a[0];a[0]=a[1];a[1]=b*c;break;case "YtoZ":c=a[1];a[1]=b*a[2];a[2]=c;break;case "ZtoX":c=a[0];a[0]=a[1];a[1]=a[2];a[2]=c;break;case "ZtoY":c=a[1],a[1]=a[2],a[2]=
b*c}}function ka(a,b){var c=[a[b],a[b+1],a[b+2]];R(c,-1);return new THREE.Vector3(c[0],c[1],c[2])}function ga(a){if(ra.convertUpAxis){var b=[a[0],a[4],a[8]];R(b,-1);a[0]=b[0];a[4]=b[1];a[8]=b[2];b=[a[1],a[5],a[9]];R(b,-1);a[1]=b[0];a[5]=b[1];a[9]=b[2];b=[a[2],a[6],a[10]];R(b,-1);a[2]=b[0];a[6]=b[1];a[10]=b[2];b=[a[0],a[1],a[2]];R(b,-1);a[0]=b[0];a[1]=b[1];a[2]=b[2];b=[a[4],a[5],a[6]];R(b,-1);a[4]=b[0];a[5]=b[1];a[6]=b[2];b=[a[8],a[9],a[10]];R(b,-1);a[8]=b[0];a[9]=b[1];a[10]=b[2];b=[a[3],a[7],a[11]];
R(b,-1);a[3]=b[0];a[7]=b[1];a[11]=b[2]}return new THREE.Matrix4(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15])}var V=null,ba=null,ca,da=null,ha={},Qa={},la={},za={},Aa={},Ja={},Da={},$a,Ta,ib,db,Wa,Xa=THREE.SmoothShading,ra={centerGeometry:!1,convertUpAxis:!1,subdivideFaces:!0,upAxis:"Y"},Ba="Y",ja=null,ab=Math.PI/180;g.prototype.parse=function(a){this.id=a.getAttribute("id");for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if("init_from"==c.nodeName)this.init_from=
c.textContent}return this};h.prototype.parse=function(a){this.id=a.getAttribute("id");this.name=a.getAttribute("name");this.type="none";for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];switch(c.nodeName){case "skin":this.skin=(new l).parse(c);this.type=c.nodeName;break;case "morph":this.morph=(new i).parse(c),this.type=c.nodeName}}return this};i.prototype.parse=function(a){var b={},c=[],d;this.method=a.getAttribute("method");this.source=a.getAttribute("source").replace(/^#/,"");for(d=
0;d<a.childNodes.length;d++){var e=a.childNodes[d];if(1==e.nodeType)switch(e.nodeName){case "source":e=(new D).parse(e);b[e.id]=e;break;case "targets":c=this.parseInputs(e);break;default:console.log(e.nodeName)}}for(d=0;d<c.length;d++)switch(a=c[d],e=b[a.source],a.semantic){case "MORPH_TARGET":this.targets=e.read();break;case "MORPH_WEIGHT":this.weights=e.read()}return this};i.prototype.parseInputs=function(a){for(var b=[],c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];if(1==d.nodeType)switch(d.nodeName){case "input":b.push((new B).parse(d))}}return b};
l.prototype.parse=function(a){var b={},c,d;this.source=a.getAttribute("source").replace(/^#/,"");this.invBindMatrices=[];this.joints=[];this.weights=[];for(var e=0;e<a.childNodes.length;e++){var f=a.childNodes[e];if(1==f.nodeType)switch(f.nodeName){case "bind_shape_matrix":f=y(f.textContent);this.bindShapeMatrix=ga(f);break;case "source":f=(new D).parse(f);b[f.id]=f;break;case "joints":c=f;break;case "vertex_weights":d=f;break;default:console.log(f.nodeName)}}this.parseJoints(c,b);this.parseWeights(d,
b);return this};l.prototype.parseJoints=function(a,b){for(var c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];if(1==d.nodeType)switch(d.nodeName){case "input":var d=(new B).parse(d),e=b[d.source];if("JOINT"==d.semantic)this.joints=e.read();else if("INV_BIND_MATRIX"==d.semantic)this.invBindMatrices=e.read()}}};l.prototype.parseWeights=function(a,b){for(var c,d,e=[],f=0;f<a.childNodes.length;f++){var g=a.childNodes[f];if(1==g.nodeType)switch(g.nodeName){case "input":e.push((new B).parse(g));break;
case "v":c=E(g.textContent);break;case "vcount":d=E(g.textContent)}}for(f=g=0;f<d.length;f++){for(var h=d[f],j=[],i=0;i<h;i++){for(var l={},k=0;k<e.length;k++){var m=e[k],n=c[g+m.offset];switch(m.semantic){case "JOINT":l.joint=n;break;case "WEIGHT":l.weight=b[m.source].data[n]}}j.push(l);g+=e.length}for(i=0;i<j.length;i++)j[i].index=f;this.weights.push(j)}};k.prototype.getChildById=function(a,b){for(var c=0;c<this.nodes.length;c++){var d=this.nodes[c].getChildById(a,b);if(d)return d}return null};
k.prototype.getChildBySid=function(a,b){for(var c=0;c<this.nodes.length;c++){var d=this.nodes[c].getChildBySid(a,b);if(d)return d}return null};k.prototype.parse=function(a){this.id=a.getAttribute("id");this.name=a.getAttribute("name");this.nodes=[];for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "node":this.nodes.push((new n).parse(c))}}return this};n.prototype.getChannelForTransform=function(a){for(var b=0;b<this.channels.length;b++){var c=this.channels[b],
d=c.target.split("/");d.shift();var e=d.shift(),f=0<=e.indexOf("."),g=0<=e.indexOf("("),h;if(f)d=e.split("."),e=d.shift(),d.shift();else if(g){h=e.split("(");e=h.shift();for(d=0;d<h.length;d++)h[d]=parseInt(h[d].replace(/\)/,""))}if(e==a)return c.info={sid:e,dotSyntax:f,arrSyntax:g,arrIndices:h},c}return null};n.prototype.getChildById=function(a,b){if(this.id==a)return this;if(b)for(var c=0;c<this.nodes.length;c++){var d=this.nodes[c].getChildById(a,b);if(d)return d}return null};n.prototype.getChildBySid=
function(a,b){if(this.sid==a)return this;if(b)for(var c=0;c<this.nodes.length;c++){var d=this.nodes[c].getChildBySid(a,b);if(d)return d}return null};n.prototype.getTransformBySid=function(a){for(var b=0;b<this.transforms.length;b++)if(this.transforms[b].sid==a)return this.transforms[b];return null};n.prototype.parse=function(a){var b;this.id=a.getAttribute("id");this.sid=a.getAttribute("sid");this.name=a.getAttribute("name");this.type=a.getAttribute("type");this.type="JOINT"==this.type?this.type:
"NODE";this.nodes=[];this.transforms=[];this.geometries=[];this.controllers=[];this.matrix=new THREE.Matrix4;for(var c=0;c<a.childNodes.length;c++)if(b=a.childNodes[c],1==b.nodeType)switch(b.nodeName){case "node":this.nodes.push((new n).parse(b));break;case "instance_camera":break;case "instance_controller":this.controllers.push((new o).parse(b));break;case "instance_geometry":this.geometries.push((new m).parse(b));break;case "instance_light":break;case "instance_node":b=b.getAttribute("url").replace(/^#/,
"");(b=V.evaluate(".//dae:library_nodes//dae:node[@id='"+b+"']",V,W,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null).iterateNext())&&this.nodes.push((new n).parse(b));break;case "rotate":case "translate":case "scale":case "matrix":case "lookat":case "skew":this.transforms.push((new q).parse(b));break;case "extra":break;default:console.log(b.nodeName)}a=[];c=1E6;b=-1E6;for(var d in la)for(var e=la[d],f=0;f<e.channel.length;f++){var g=e.channel[f],h=e.sampler[f];d=g.target.split("/")[0];if(d==this.id)h.create(),
g.sampler=h,c=Math.min(c,h.startTime),b=Math.max(b,h.endTime),a.push(g)}if(a.length)this.startTime=c,this.endTime=b;if((this.channels=a)&&this.channels.length){d=[];a=[];c=0;for(e=this.channels.length;c<e;c++){b=this.channels[c];f=b.fullSid;g=b.member;if(ra.convertUpAxis)switch(g){case "X":switch(ja){case "XtoY":case "XtoZ":case "YtoX":g="Y";break;case "ZtoX":g="Z"}break;case "Y":switch(ja){case "XtoY":case "YtoX":case "ZtoX":g="X";break;case "XtoZ":case "YtoZ":case "ZtoY":g="Z"}break;case "Z":switch(ja){case "XtoZ":g=
"X";break;case "YtoZ":case "ZtoX":case "ZtoY":g="Y"}}var h=b.sampler,i=h.input,l=this.getTransformBySid(b.sid);if(l){-1===a.indexOf(f)&&a.push(f);b=0;for(var k=i.length;b<k;b++){var p=i[b],r=h.getData(l.type,b),s;s=null;for(var t=0,u=d.length;t<u&&null==s;t++){var v=d[t];if(v.time===p)s=v;else if(v.time>p)break}if(!s){s=new j(p);t=-1;u=0;for(v=d.length;u<v&&-1==t;u++)d[u].time>=p&&(t=u);p=t;d.splice(-1==p?d.length:p,0,s)}s.addTarget(f,l,g,r)}}else console.log('Could not find transform "'+b.sid+'" in node '+
this.id)}for(c=0;c<a.length;c++){e=a[c];for(b=0;b<d.length;b++)if(s=d[b],!s.hasTarget(e)){h=d;f=s;l=b;g=e;i=void 0;a:{i=l?l-1:0;for(i=0<=i?i:i+h.length;0<=i;i--)if(k=h[i],k.hasTarget(g)){i=k;break a}i=null}k=void 0;a:{for(l+=1;l<h.length;l++)if(k=h[l],k.hasTarget(g))break a;k=null}if(i&&k){h=(f.time-i.time)/(k.time-i.time);i=i.getTarget(g);l=k.getTarget(g).data;k=i.data;r=void 0;if(k.length){r=[];for(p=0;p<k.length;++p)r[p]=k[p]+(l[p]-k[p])*h}else r=k+(l-k)*h;f.addTarget(g,i.transform,i.member,r)}}}this.keys=
d;this.sids=a}this.updateMatrix();return this};n.prototype.updateMatrix=function(){this.matrix.identity();for(var a=0;a<this.transforms.length;a++)this.transforms[a].apply(this.matrix)};q.prototype.parse=function(a){this.sid=a.getAttribute("sid");this.type=a.nodeName;this.data=y(a.textContent);this.convert();return this};q.prototype.convert=function(){switch(this.type){case "matrix":this.obj=ga(this.data);break;case "rotate":this.angle=this.data[3]*ab;case "translate":R(this.data,-1);this.obj=new THREE.Vector3(this.data[0],
this.data[1],this.data[2]);break;case "scale":R(this.data,1);this.obj=new THREE.Vector3(this.data[0],this.data[1],this.data[2]);break;default:console.log("Can not convert Transform of type "+this.type)}};q.prototype.apply=function(a){switch(this.type){case "matrix":a.multiplySelf(this.obj);break;case "translate":a.translate(this.obj);break;case "rotate":a.rotateByAxis(this.obj,this.angle);break;case "scale":a.scale(this.obj)}};q.prototype.update=function(a,b){switch(this.type){case "matrix":console.log("Currently not handling matrix transform updates");
break;case "translate":case "scale":switch(b){case "X":this.obj.x=a;break;case "Y":this.obj.y=a;break;case "Z":this.obj.z=a;break;default:this.obj.x=a[0],this.obj.y=a[1],this.obj.z=a[2]}break;case "rotate":switch(b){case "X":this.obj.x=a;break;case "Y":this.obj.y=a;break;case "Z":this.obj.z=a;break;case "ANGLE":this.angle=a*ab;break;default:this.obj.x=a[0],this.obj.y=a[1],this.obj.z=a[2],this.angle=a[3]*ab}}};o.prototype.parse=function(a){this.url=a.getAttribute("url").replace(/^#/,"");this.skeleton=
[];this.instance_material=[];for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "skeleton":this.skeleton.push(c.textContent.replace(/^#/,""));break;case "bind_material":if(c=V.evaluate(".//dae:instance_material",c,W,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null))for(var d=c.iterateNext();d;)this.instance_material.push((new p).parse(d)),d=c.iterateNext()}}return this};p.prototype.parse=function(a){this.symbol=a.getAttribute("symbol");this.target=a.getAttribute("target").replace(/^#/,
"");return this};m.prototype.parse=function(a){this.url=a.getAttribute("url").replace(/^#/,"");this.instance_material=[];for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType&&"bind_material"==c.nodeName){if(a=V.evaluate(".//dae:instance_material",c,W,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null))for(b=a.iterateNext();b;)this.instance_material.push((new p).parse(b)),b=a.iterateNext();break}}return this};r.prototype.parse=function(a){this.id=a.getAttribute("id");for(var b=0;b<
a.childNodes.length;b++){var c=a.childNodes[b];switch(c.nodeName){case "mesh":this.mesh=(new s(this)).parse(c)}}return this};s.prototype.parse=function(a){this.primitives=[];var b;for(b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];switch(c.nodeName){case "source":var d=c.getAttribute("id");void 0==ha[d]&&(ha[d]=(new D(d)).parse(c));break;case "vertices":this.vertices=(new x).parse(c);break;case "triangles":this.primitives.push((new u).parse(c));break;case "polygons":console.warn("polygon holes not yet supported!");
case "polylist":this.primitives.push((new t).parse(c))}}this.geometry3js=new THREE.Geometry;a=ha[this.vertices.input.POSITION.source].data;for(b=0;b<a.length;b+=3)this.geometry3js.vertices.push(new THREE.Vertex(ka(a,b)));for(b=0;b<this.primitives.length;b++)a=this.primitives[b],a.setVertices(this.vertices),this.handlePrimitive(a,this.geometry3js);this.geometry3js.computeCentroids();this.geometry3js.computeFaceNormals();this.geometry3js.computeVertexNormals();this.geometry3js.computeBoundingBox();
return this};s.prototype.handlePrimitive=function(a,b){var c=0,d,e,f=a.p,g=a.inputs,h,i,j,k,l=0,m=3,n=[];for(d=0;d<g.length;d++)switch(h=g[d],h.semantic){case "TEXCOORD":n.push(h.set)}for(;c<f.length;){var o=[],p=[],q={},r=[];a.vcount&&(m=a.vcount[l++]);for(d=0;d<m;d++)for(e=0;e<g.length;e++)switch(h=g[e],k=ha[h.source],i=f[c+d*g.length+h.offset],j=k.accessor.params.length,j*=i,h.semantic){case "VERTEX":o.push(i);break;case "NORMAL":p.push(ka(k.data,j));break;case "TEXCOORD":void 0===q[h.set]&&(q[h.set]=
[]);q[h.set].push(new THREE.UV(k.data[j],1-k.data[j+1]));break;case "COLOR":r.push((new THREE.Color).setRGB(k.data[j],k.data[j+1],k.data[j+2]))}e=null;d=[];if(3===m)d.push(new THREE.Face3(o[0],o[1],o[2],[p[0],p[1],p[2]],r.length?r:new THREE.Color));else if(4===m)d.push(new THREE.Face4(o[0],o[1],o[2],o[3],[p[0],p[1],p[2],p[3]],r.length?r:new THREE.Color));else if(4<m&&ra.subdivideFaces){r=r.length?r:new THREE.Color;for(e=1;e<m-1;)d.push(new THREE.Face3(o[0],o[e],o[e+1],[p[0],p[e++],p[e]],r))}if(d.length){o=
0;for(p=d.length;o<p;o++){e=d[o];e.daeMaterial=a.material;b.faces.push(e);for(e=0;e<n.length;e++)r=q[n[e]],r=4<m?[r[0],r[o+1],r[o+2]]:4===m?[r[0],r[1],r[2],r[3]]:[r[0],r[1],r[2]],b.faceVertexUvs[e]||(b.faceVertexUvs[e]=[]),b.faceVertexUvs[e].push(r)}}else console.log("dropped face with vcount "+m+" for geometry with id: "+b.id);c+=g.length*m}};t.prototype=new u;t.prototype.constructor=t;u.prototype.setVertices=function(a){for(var b=0;b<this.inputs.length;b++)if(this.inputs[b].source==a.id)this.inputs[b].source=
a.input.POSITION.source};u.prototype.parse=function(a){this.inputs=[];this.material=a.getAttribute("material");this.count=T(a,"count",0);for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];switch(c.nodeName){case "input":this.inputs.push((new B).parse(a.childNodes[b]));break;case "vcount":this.vcount=E(c.textContent);break;case "p":this.p=E(c.textContent)}}return this};v.prototype.parse=function(a){this.params=[];this.source=a.getAttribute("source");this.count=T(a,"count",0);this.stride=
T(a,"stride",0);for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if("param"==c.nodeName){var d={};d.name=c.getAttribute("name");d.type=c.getAttribute("type");this.params.push(d)}}return this};x.prototype.parse=function(a){this.id=a.getAttribute("id");for(var b=0;b<a.childNodes.length;b++)if("input"==a.childNodes[b].nodeName){var c=(new B).parse(a.childNodes[b]);this.input[c.semantic]=c}return this};B.prototype.parse=function(a){this.semantic=a.getAttribute("semantic");this.source=a.getAttribute("source").replace(/^#/,
"");this.set=T(a,"set",-1);this.offset=T(a,"offset",0);if("TEXCOORD"==this.semantic&&0>this.set)this.set=0;return this};D.prototype.parse=function(a){this.id=a.getAttribute("id");for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];switch(c.nodeName){case "bool_array":for(var d=S(c.textContent),e=[],f=0;f<d.length;f++)e.push("true"==d[f]||"1"==d[f]?!0:!1);this.data=e;this.type=c.nodeName;break;case "float_array":this.data=y(c.textContent);this.type=c.nodeName;break;case "int_array":this.data=
E(c.textContent);this.type=c.nodeName;break;case "IDREF_array":case "Name_array":this.data=S(c.textContent);this.type=c.nodeName;break;case "technique_common":for(d=0;d<c.childNodes.length;d++)if("accessor"==c.childNodes[d].nodeName){this.accessor=(new v).parse(c.childNodes[d]);break}}}return this};D.prototype.read=function(){var a=[],b=this.accessor.params[0];switch(b.type){case "IDREF":case "Name":case "name":case "float":return this.data;case "float4x4":for(b=0;b<this.data.length;b+=16){var c=
this.data.slice(b,b+16),c=ga(c);a.push(c)}break;default:console.log("ColladaLoader: Source: Read dont know how to read "+b.type+".")}return a};C.prototype.parse=function(a){this.id=a.getAttribute("id");this.name=a.getAttribute("name");for(var b=0;b<a.childNodes.length;b++)if("instance_effect"==a.childNodes[b].nodeName){this.instance_effect=(new K).parse(a.childNodes[b]);break}return this};A.prototype.isColor=function(){return null==this.texture};A.prototype.isTexture=function(){return null!=this.texture};
A.prototype.parse=function(a){for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "color":c=y(c.textContent);this.color=new THREE.Color(0);this.color.setRGB(c[0],c[1],c[2]);this.color.a=c[3];break;case "texture":this.texture=c.getAttribute("texture"),this.texcoord=c.getAttribute("texcoord"),this.texOpts={offsetU:0,offsetV:0,repeatU:1,repeatV:1,wrapU:1,wrapV:1},this.parseTexture(c)}}return this};A.prototype.parseTexture=function(a){if(!a.childNodes)return this;
a.childNodes[1]&&"extra"===a.childNodes[1].nodeName&&(a=a.childNodes[1],a.childNodes[1]&&"technique"===a.childNodes[1].nodeName&&(a=a.childNodes[1]));for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];switch(c.nodeName){case "offsetU":case "offsetV":case "repeatU":case "repeatV":this.texOpts[c.nodeName]=parseFloat(c.textContent);break;case "wrapU":case "wrapV":this.texOpts[c.nodeName]=parseInt(c.textContent);break;default:this.texOpts[c.nodeName]=c.textContent}}return this};H.prototype.parse=
function(a){for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "ambient":case "emission":case "diffuse":case "specular":case "transparent":this[c.nodeName]=(new A).parse(c);break;case "shininess":case "reflectivity":case "transparency":var d;d=V.evaluate(".//dae:float",c,W,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);for(var e=d.iterateNext(),f=[];e;)f.push(e),e=d.iterateNext();d=f;0<d.length&&(this[c.nodeName]=parseFloat(d[0].textContent))}}this.create();
return this};H.prototype.create=function(){var a={},b=void 0!==this.transparency&&1>this.transparency,c;for(c in this)switch(c){case "ambient":case "emission":case "diffuse":case "specular":var d=this[c];if(d instanceof A)if(d.isTexture()){if(this.effect.sampler&&this.effect.surface&&this.effect.sampler.source==this.effect.surface.sid){var e=Qa[this.effect.surface.init_from];if(e)e=THREE.ImageUtils.loadTexture(ib+e.init_from),e.wrapS=d.texOpts.wrapU?THREE.RepeatWrapping:THREE.ClampToEdgeWrapping,
e.wrapT=d.texOpts.wrapV?THREE.RepeatWrapping:THREE.ClampToEdgeWrapping,e.offset.x=d.texOpts.offsetU,e.offset.y=d.texOpts.offsetV,e.repeat.x=d.texOpts.repeatU,e.repeat.y=d.texOpts.repeatV,a.map=e}}else"diffuse"==c?a.color=d.color.getHex():b||(a[c]=d.color.getHex());break;case "shininess":case "reflectivity":a[c]=this[c];break;case "transparency":if(b)a.transparent=!0,a.opacity=this[c],b=!0}a.shading=Xa;return this.material=new THREE.MeshLambertMaterial(a)};I.prototype.parse=function(a){for(var b=0;b<
a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "init_from":this.init_from=c.textContent;break;case "format":this.format=c.textContent;break;default:console.log("unhandled Surface prop: "+c.nodeName)}}return this};N.prototype.parse=function(a){for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "source":this.source=c.textContent;break;case "minfilter":this.minfilter=c.textContent;break;case "magfilter":this.magfilter=
c.textContent;break;case "mipfilter":this.mipfilter=c.textContent;break;case "wrap_s":this.wrap_s=c.textContent;break;case "wrap_t":this.wrap_t=c.textContent;break;default:console.log("unhandled Sampler2D prop: "+c.nodeName)}}return this};$.prototype.create=function(){if(null==this.shader)return null};$.prototype.parse=function(a){this.id=a.getAttribute("id");this.name=a.getAttribute("name");this.shader=null;for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "profile_COMMON":this.parseTechnique(this.parseProfileCOMMON(c))}}return this};
$.prototype.parseNewparam=function(a){for(var b=a.getAttribute("sid"),c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];if(1==d.nodeType)switch(d.nodeName){case "surface":this.surface=(new I(this)).parse(d);this.surface.sid=b;break;case "sampler2D":this.sampler=(new N(this)).parse(d);this.sampler.sid=b;break;case "extra":break;default:console.log(d.nodeName)}}};$.prototype.parseProfileCOMMON=function(a){for(var b,c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];if(1==d.nodeType)switch(d.nodeName){case "profile_COMMON":this.parseProfileCOMMON(d);
break;case "technique":b=d;break;case "newparam":this.parseNewparam(d);break;case "extra":break;default:console.log(d.nodeName)}}return b};$.prototype.parseTechnique=function(a){for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "constant":case "lambert":case "blinn":case "phong":this.shader=(new H(c.nodeName,this)).parse(c)}}};K.prototype.parse=function(a){this.url=a.getAttribute("url").replace(/^#/,"");return this};Q.prototype.parse=function(a){this.id=
a.getAttribute("id");this.name=a.getAttribute("name");this.source={};for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "source":c=(new D).parse(c);this.source[c.id]=c;break;case "sampler":this.sampler.push((new G(this)).parse(c));break;case "channel":this.channel.push((new L(this)).parse(c))}}return this};L.prototype.parse=function(a){this.source=a.getAttribute("source").replace(/^#/,"");this.target=a.getAttribute("target");var b=this.target.split("/");
b.shift();var a=b.shift(),c=0<=a.indexOf("."),d=0<=a.indexOf("(");if(c)b=a.split("."),this.sid=b.shift(),this.member=b.shift();else if(d){b=a.split("(");this.sid=b.shift();for(var e=0;e<b.length;e++)b[e]=parseInt(b[e].replace(/\)/,""));this.arrIndices=b}else this.sid=a;this.fullSid=a;this.dotSyntax=c;this.arrSyntax=d;return this};G.prototype.parse=function(a){this.id=a.getAttribute("id");this.inputs=[];for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(1==c.nodeType)switch(c.nodeName){case "input":this.inputs.push((new B).parse(c))}}return this};
G.prototype.create=function(){for(var a=0;a<this.inputs.length;a++){var b=this.inputs[a],c=this.animation.source[b.source];switch(b.semantic){case "INPUT":this.input=c.read();break;case "OUTPUT":this.output=c.read();this.strideOut=c.accessor.stride;break;case "INTERPOLATION":this.interpolation=c.read();break;case "IN_TANGENT":break;case "OUT_TANGENT":break;default:console.log(b.semantic)}}this.duration=this.endTime=this.startTime=0;if(this.input.length){this.startTime=1E8;this.endTime=-1E8;for(a=
0;a<this.input.length;a++)this.startTime=Math.min(this.startTime,this.input[a]),this.endTime=Math.max(this.endTime,this.input[a]);this.duration=this.endTime-this.startTime}};G.prototype.getData=function(a,b){var c;if(1<this.strideOut){c=[];for(var b=b*this.strideOut,d=0;d<this.strideOut;++d)c[d]=this.output[b+d];if(3===this.strideOut)switch(a){case "rotate":case "translate":R(c,-1);break;case "scale":R(c,1)}}else c=this.output[b];return c};j.prototype.addTarget=function(a,b,c,d){this.targets.push({sid:a,
member:c,transform:b,data:d})};j.prototype.apply=function(a){for(var b=0;b<this.targets.length;++b){var c=this.targets[b];(!a||c.sid===a)&&c.transform.update(c.data,c.member)}};j.prototype.getTarget=function(a){for(var b=0;b<this.targets.length;++b)if(this.targets[b].sid===a)return this.targets[b];return null};j.prototype.hasTarget=function(a){for(var b=0;b<this.targets.length;++b)if(this.targets[b].sid===a)return!0;return!1};j.prototype.interpolate=function(a,b){for(var c=0;c<this.targets.length;++c){var d=
this.targets[c],e=a.getTarget(d.sid);if(e){var f=(b-this.time)/(a.time-this.time),g=e.data,h=d.data;if(0>f||1<f)console.log("Key.interpolate: Warning! Scale out of bounds:"+f),f=0>f?0:1;if(h.length)for(var e=[],i=0;i<h.length;++i)e[i]=h[i]+(g[i]-h[i])*f;else e=h+(g-h)*f}else e=d.data;d.transform.update(e,d.member)}};return{load:function(b,c,d){var e=0;if(document.implementation&&document.implementation.createDocument){var f=new XMLHttpRequest;f.overrideMimeType&&f.overrideMimeType("text/xml");f.onreadystatechange=
function(){if(4==f.readyState){if(0==f.status||200==f.status)f.responseXML?(da=c,a(f.responseXML,void 0,b)):console.error("ColladaLoader: Empty or non-existing file ("+b+")")}else 3==f.readyState&&d&&(0==e&&(e=f.getResponseHeader("Content-Length")),d({total:e,loaded:f.responseText.length}))};f.open("GET",b,!0);f.send(null)}else alert("Don't know how to parse XML!")},parse:a,setPreferredShading:function(a){Xa=a},applySkin:e,geometries:Aa,options:ra}};
THREE.JSONLoader=function(a){THREE.Loader.call(this,a)};THREE.JSONLoader.prototype=new THREE.Loader;THREE.JSONLoader.prototype.constructor=THREE.JSONLoader;THREE.JSONLoader.prototype.supr=THREE.Loader.prototype;
THREE.JSONLoader.prototype.load=function(a,b,c){if(a instanceof Object)console.warn("DEPRECATED: JSONLoader( parameters ) is now JSONLoader( url, callback, texturePath )."),c=a,a=c.model,b=c.callback,c=c.texture_path;c=c?c:this.extractUrlbase(a);this.onLoadStart();this.loadAjaxJSON(this,a,b,c)};
THREE.JSONLoader.prototype.loadAjaxJSON=function(a,b,c,d,e){var f=new XMLHttpRequest,g=0;f.onreadystatechange=function(){if(4==f.readyState)if(200==f.status||0==f.status){try{var h=JSON.parse(f.responseText)}catch(i){console.warn("DEPRECATED: ["+b+"] seems to be using old model format")}a.createModel(h,c,d);a.onLoadComplete()}else console.error("Couldn't load ["+b+"] ["+f.status+"]");else 3==f.readyState?e&&(0==g&&(g=f.getResponseHeader("Content-Length")),e({total:g,loaded:f.responseText.length})):
2==f.readyState&&(g=f.getResponseHeader("Content-Length"))};f.open("GET",b,!0);f.overrideMimeType&&f.overrideMimeType("text/plain; charset=x-user-defined");f.setRequestHeader("Content-Type","text/plain");f.send(null)};
THREE.JSONLoader.prototype.createModel=function(a,b,c){var d=new THREE.Geometry,e=void 0!==a.scale?1/a.scale:1;this.initMaterials(d,a.materials,c);(function(b){if(void 0===a.metadata||void 0===a.metadata.formatVersion||3!==a.metadata.formatVersion)console.error("Deprecated file format.");else{var c,e,i,l,k,n,q,o,p,m,r,s,t,u,v=a.faces;n=a.vertices;var x=a.normals,B=a.colors,D=0;for(c=0;c<a.uvs.length;c++)a.uvs[c].length&&D++;for(c=0;c<D;c++)d.faceUvs[c]=[],d.faceVertexUvs[c]=[];l=0;for(k=n.length;l<
k;)q=new THREE.Vertex,q.position.x=n[l++]*b,q.position.y=n[l++]*b,q.position.z=n[l++]*b,d.vertices.push(q);l=0;for(k=v.length;l<k;){b=v[l++];n=b&1;i=b&2;c=b&4;e=b&8;o=b&16;q=b&32;m=b&64;b&=128;n?(r=new THREE.Face4,r.a=v[l++],r.b=v[l++],r.c=v[l++],r.d=v[l++],n=4):(r=new THREE.Face3,r.a=v[l++],r.b=v[l++],r.c=v[l++],n=3);if(i)i=v[l++],r.materialIndex=i;i=d.faces.length;if(c)for(c=0;c<D;c++)s=a.uvs[c],p=v[l++],u=s[2*p],p=s[2*p+1],d.faceUvs[c][i]=new THREE.UV(u,p);if(e)for(c=0;c<D;c++){s=a.uvs[c];t=[];
for(e=0;e<n;e++)p=v[l++],u=s[2*p],p=s[2*p+1],t[e]=new THREE.UV(u,p);d.faceVertexUvs[c][i]=t}if(o)o=3*v[l++],e=new THREE.Vector3,e.x=x[o++],e.y=x[o++],e.z=x[o],r.normal=e;if(q)for(c=0;c<n;c++)o=3*v[l++],e=new THREE.Vector3,e.x=x[o++],e.y=x[o++],e.z=x[o],r.vertexNormals.push(e);if(m)q=v[l++],q=new THREE.Color(B[q]),r.color=q;if(b)for(c=0;c<n;c++)q=v[l++],q=new THREE.Color(B[q]),r.vertexColors.push(q);d.faces.push(r)}}})(e);(function(){var b,c,e,i;if(a.skinWeights)for(b=0,c=a.skinWeights.length;b<c;b+=
2)e=a.skinWeights[b],i=a.skinWeights[b+1],d.skinWeights.push(new THREE.Vector4(e,i,0,0));if(a.skinIndices)for(b=0,c=a.skinIndices.length;b<c;b+=2)e=a.skinIndices[b],i=a.skinIndices[b+1],d.skinIndices.push(new THREE.Vector4(e,i,0,0));d.bones=a.bones;d.animation=a.animation})();(function(b){if(void 0!==a.morphTargets){var c,e,i,l,k,n,q,o,p;for(c=0,e=a.morphTargets.length;c<e;c++){d.morphTargets[c]={};d.morphTargets[c].name=a.morphTargets[c].name;d.morphTargets[c].vertices=[];o=d.morphTargets[c].vertices;
p=a.morphTargets[c].vertices;for(i=0,l=p.length;i<l;i+=3)k=p[i]*b,n=p[i+1]*b,q=p[i+2]*b,o.push(new THREE.Vertex(new THREE.Vector3(k,n,q)))}}if(void 0!==a.morphColors)for(c=0,e=a.morphColors.length;c<e;c++){d.morphColors[c]={};d.morphColors[c].name=a.morphColors[c].name;d.morphColors[c].colors=[];l=d.morphColors[c].colors;k=a.morphColors[c].colors;for(b=0,i=k.length;b<i;b+=3)n=new THREE.Color(16755200),n.setRGB(k[b],k[b+1],k[b+2]),l.push(n)}})(e);d.computeCentroids();d.computeFaceNormals();this.hasNormals(d)&&
d.computeTangents();b(d)};THREE.SceneLoader=function(){this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){};this.callbackSync=function(){};this.callbackProgress=function(){}};THREE.SceneLoader.prototype.constructor=THREE.SceneLoader;
THREE.SceneLoader.prototype.load=function(a,b){var c=this,d=new XMLHttpRequest;d.onreadystatechange=function(){if(4==d.readyState)if(200==d.status||0==d.status)try{var e=JSON.parse(d.responseText);void 0===e.metadata||void 0===e.metadata.formatVersion||3!==e.metadata.formatVersion?console.error("Deprecated file format."):c.createScene(e,b,a)}catch(f){console.error(f),console.warn("DEPRECATED: ["+a+"] seems to be using old model format")}else console.error("Couldn't load ["+a+"] ["+d.status+"]")};
d.open("GET",a,!0);d.overrideMimeType&&d.overrideMimeType("text/plain; charset=x-user-defined");d.setRequestHeader("Content-Type","text/plain");d.send(null)};
THREE.SceneLoader.prototype.createScene=function(a,b,c){function d(a,b){return"relativeToHTML"==b?a:l+"/"+a}function e(){var a;for(q in K.objects)if(!y.objects[q])if(s=K.objects[q],void 0!==s.geometry){if(H=y.geometries[s.geometry]){a=!1;for(E=0;E<s.materials.length;E++)$=y.materials[s.materials[E]],a=$ instanceof THREE.ShaderMaterial;a&&H.computeTangents();v=s.position;x=s.rotation;B=s.quaternion;D=s.scale;B=0;0==$.length&&($=new THREE.MeshFaceMaterial);1<$.length&&($=new THREE.MeshFaceMaterial);
a=new THREE.Mesh(H,$);a.name=q;a.position.set(v[0],v[1],v[2]);B?(a.quaternion.set(B[0],B[1],B[2],B[3]),a.useQuaternion=!0):a.rotation.set(x[0],x[1],x[2]);a.scale.set(D[0],D[1],D[2]);a.visible=s.visible;y.scene.add(a);y.objects[q]=a;if(s.meshCollider){var b=THREE.CollisionUtils.MeshColliderWBox(a);y.scene.collisions.colliders.push(b)}if(s.castsShadow)b=new THREE.ShadowVolume(H),y.scene.add(b),b.position=a.position,b.rotation=a.rotation,b.scale=a.scale;s.trigger&&"none"!=s.trigger.toLowerCase()&&(b=
{type:s.trigger,object:s},y.triggers[a.name]=b)}}else v=s.position,x=s.rotation,B=s.quaternion,D=s.scale,B=0,a=new THREE.Object3D,a.name=q,a.position.set(v[0],v[1],v[2]),B?(a.quaternion.set(B[0],B[1],B[2],B[3]),a.useQuaternion=!0):a.rotation.set(x[0],x[1],x[2]),a.scale.set(D[0],D[1],D[2]),a.visible=void 0!==s.visible?s.visible:!1,y.scene.add(a),y.objects[q]=a,y.empties[q]=a,s.trigger&&"none"!=s.trigger.toLowerCase()&&(b={type:s.trigger,object:s},y.triggers[a.name]=b)}function f(a){return function(b){y.geometries[a]=
b;e();L-=1;i.onLoadComplete();h()}}function g(a){return function(b){y.geometries[a]=b}}function h(){i.callbackProgress({totalModels:j,totalTextures:W,loadedModels:j-L,loadedTextures:W-G},y);i.onLoadProgress();0==L&&0==G&&b(y)}var i=this,l=THREE.Loader.prototype.extractUrlbase(c),k,n,q,o,p,m,r,s,t,u,v,x,B,D,C,A,H,I,N,$,K,Q,L,G,j,W,y;K=a;c=new THREE.BinaryLoader;Q=new THREE.JSONLoader;G=L=0;y={scene:new THREE.Scene,geometries:{},materials:{},textures:{},objects:{},cameras:{},lights:{},fogs:{},triggers:{},
empties:{}};a=!1;for(q in K.objects)if(s=K.objects[q],s.meshCollider){a=!0;break}if(a)y.scene.collisions=new THREE.CollisionSystem;if(K.transform)a=K.transform.position,t=K.transform.rotation,C=K.transform.scale,a&&y.scene.position.set(a[0],a[1],a[2]),t&&y.scene.rotation.set(t[0],t[1],t[2]),C&&y.scene.scale.set(C[0],C[1],C[2]),(a||t||C)&&y.scene.updateMatrix();a=function(){G-=1;h();i.onLoadComplete()};for(p in K.cameras)C=K.cameras[p],"perspective"==C.type?I=new THREE.PerspectiveCamera(C.fov,C.aspect,
C.near,C.far):"ortho"==C.type&&(I=new THREE.OrthographicCamera(C.left,C.right,C.top,C.bottom,C.near,C.far)),v=C.position,t=C.target,C=C.up,I.position.set(v[0],v[1],v[2]),I.target=new THREE.Vector3(t[0],t[1],t[2]),C&&I.up.set(C[0],C[1],C[2]),y.cameras[p]=I;for(o in K.lights)t=K.lights[o],p=void 0!==t.color?t.color:16777215,I=void 0!==t.intensity?t.intensity:1,"directional"==t.type?(v=t.direction,u=new THREE.DirectionalLight(p,I),u.position.set(v[0],v[1],v[2]),u.position.normalize()):"point"==t.type?
(v=t.position,u=t.distance,u=new THREE.PointLight(p,I,u),u.position.set(v[0],v[1],v[2])):"ambient"==t.type&&(u=new THREE.AmbientLight(p)),y.scene.add(u),y.lights[o]=u;for(m in K.fogs)o=K.fogs[m],"linear"==o.type?N=new THREE.Fog(0,o.near,o.far):"exp2"==o.type&&(N=new THREE.FogExp2(0,o.density)),C=o.color,N.color.setRGB(C[0],C[1],C[2]),y.fogs[m]=N;if(y.cameras&&K.defaults.camera)y.currentCamera=y.cameras[K.defaults.camera];if(y.fogs&&K.defaults.fog)y.scene.fog=y.fogs[K.defaults.fog];C=K.defaults.bgcolor;
y.bgColor=new THREE.Color;y.bgColor.setRGB(C[0],C[1],C[2]);y.bgColorAlpha=K.defaults.bgalpha;for(k in K.geometries)if(m=K.geometries[k],"bin_mesh"==m.type||"ascii_mesh"==m.type)L+=1,i.onLoadStart();j=L;for(k in K.geometries)m=K.geometries[k],"cube"==m.type?(H=new THREE.CubeGeometry(m.width,m.height,m.depth,m.segmentsWidth,m.segmentsHeight,m.segmentsDepth,null,m.flipped,m.sides),y.geometries[k]=H):"plane"==m.type?(H=new THREE.PlaneGeometry(m.width,m.height,m.segmentsWidth,m.segmentsHeight),y.geometries[k]=
H):"sphere"==m.type?(H=new THREE.SphereGeometry(m.radius,m.segmentsWidth,m.segmentsHeight),y.geometries[k]=H):"cylinder"==m.type?(H=new THREE.CylinderGeometry(m.topRad,m.botRad,m.height,m.radSegs,m.heightSegs),y.geometries[k]=H):"torus"==m.type?(H=new THREE.TorusGeometry(m.radius,m.tube,m.segmentsR,m.segmentsT),y.geometries[k]=H):"icosahedron"==m.type?(H=new THREE.IcosahedronGeometry(m.subdivisions),y.geometries[k]=H):"bin_mesh"==m.type?c.load(d(m.url,K.urlBaseType),f(k)):"ascii_mesh"==m.type?Q.load(d(m.url,
K.urlBaseType),f(k)):"embedded_mesh"==m.type&&(m=K.embeds[m.id])&&Q.createModel(m,g(k),"");for(r in K.textures)if(k=K.textures[r],k.url instanceof Array){G+=k.url.length;for(m=0;m<k.url.length;m++)i.onLoadStart()}else G+=1,i.onLoadStart();W=G;for(r in K.textures){k=K.textures[r];if(void 0!=k.mapping&&void 0!=THREE[k.mapping])k.mapping=new THREE[k.mapping];if(k.url instanceof Array){m=[];for(var E=0;E<k.url.length;E++)m[E]=d(k.url[E],K.urlBaseType);m=THREE.ImageUtils.loadTextureCube(m,k.mapping,a)}else{m=
THREE.ImageUtils.loadTexture(d(k.url,K.urlBaseType),k.mapping,a);if(void 0!=THREE[k.minFilter])m.minFilter=THREE[k.minFilter];if(void 0!=THREE[k.magFilter])m.magFilter=THREE[k.magFilter];if(k.repeat){m.repeat.set(k.repeat[0],k.repeat[1]);if(1!=k.repeat[0])m.wrapS=THREE.RepeatWrapping;if(1!=k.repeat[1])m.wrapT=THREE.RepeatWrapping}k.offset&&m.offset.set(k.offset[0],k.offset[1]);if(k.wrap){N={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping};if(void 0!==N[k.wrap[0]])m.wrapS=N[k.wrap[0]];
if(void 0!==N[k.wrap[1]])m.wrapT=N[k.wrap[1]]}}y.textures[r]=m}for(n in K.materials){r=K.materials[n];for(A in r.parameters)if("envMap"==A||"map"==A||"lightMap"==A)r.parameters[A]=y.textures[r.parameters[A]];else if("shading"==A)r.parameters[A]="flat"==r.parameters[A]?THREE.FlatShading:THREE.SmoothShading;else if("blending"==A)r.parameters[A]=THREE[r.parameters[A]]?THREE[r.parameters[A]]:THREE.NormalBlending;else if("combine"==A)r.parameters[A]="MixOperation"==r.parameters[A]?THREE.MixOperation:THREE.MultiplyOperation;
else if("vertexColors"==A)if("face"==r.parameters[A])r.parameters[A]=THREE.FaceColors;else if(r.parameters[A])r.parameters[A]=THREE.VertexColors;if(void 0!==r.parameters.opacity&&1>r.parameters.opacity)r.parameters.transparent=!0;if(r.parameters.normalMap){k=THREE.ShaderUtils.lib.normal;a=THREE.UniformsUtils.clone(k.uniforms);m=r.parameters.color;N=r.parameters.specular;c=r.parameters.ambient;Q=r.parameters.shininess;a.tNormal.texture=y.textures[r.parameters.normalMap];if(r.parameters.normalMapFactor)a.uNormalScale.value=
r.parameters.normalMapFactor;if(r.parameters.map)a.tDiffuse.texture=r.parameters.map,a.enableDiffuse.value=!0;if(r.parameters.lightMap)a.tAO.texture=r.parameters.lightMap,a.enableAO.value=!0;if(r.parameters.specularMap)a.tSpecular.texture=y.textures[r.parameters.specularMap],a.enableSpecular.value=!0;a.uDiffuseColor.value.setHex(m);a.uSpecularColor.value.setHex(N);a.uAmbientColor.value.setHex(c);a.uShininess.value=Q;if(r.parameters.opacity)a.uOpacity.value=r.parameters.opacity;r=new THREE.ShaderMaterial({fragmentShader:k.fragmentShader,
vertexShader:k.vertexShader,uniforms:a,lights:!0,fog:!0})}else r=new THREE[r.type](r.parameters);y.materials[n]=r}e();i.callbackSync(y);h()};THREE.UTF8Loader=function(){};THREE.UTF8Loader.prototype=new THREE.UTF8Loader;THREE.UTF8Loader.prototype.constructor=THREE.UTF8Loader;
THREE.UTF8Loader.prototype.load=function(a,b,c){if(a instanceof Object)console.warn("DEPRECATED: UTF8Loader( parameters ) is now UTF8Loader( url, callback, metaData )."),c=a,a=c.model,b=c.callback,c={scale:c.scale,offsetX:c.offsetX,offsetY:c.offsetY,offsetZ:c.offsetZ};var d=new XMLHttpRequest,e=void 0!==c.scale?c.scale:1,f=void 0!==c.offsetX?c.offsetX:0,g=void 0!==c.offsetY?c.offsetY:0,h=void 0!==c.offsetZ?c.offsetZ:0;d.onreadystatechange=function(){4==d.readyState?200==d.status||0==d.status?THREE.UTF8Loader.prototype.createModel(d.responseText,
b,e,f,g,h):alert("Couldn't load ["+a+"] ["+d.status+"]"):3!=d.readyState&&2==d.readyState&&d.getResponseHeader("Content-Length")};d.open("GET",a,!0);d.send(null)};THREE.UTF8Loader.prototype.decompressMesh=function(a){var b=a.charCodeAt(0);57344<=b&&(b-=2048);b++;for(var c=new Float32Array(8*b),d=1,e=0;8>e;e++){for(var f=0,g=0;g<b;++g){var h=a.charCodeAt(g+d),f=f+(h>>1^-(h&1));c[8*g+e]=f}d+=b}b=a.length-d;f=new Uint16Array(b);for(e=g=0;e<b;e++)h=a.charCodeAt(e+d),f[e]=g-h,0==h&&g++;return[c,f]};
THREE.UTF8Loader.prototype.createModel=function(a,b,c,d,e,f){var g=function(){var b=this;b.materials=[];THREE.Geometry.call(this);var g=THREE.UTF8Loader.prototype.decompressMesh(a),l=[],k=[];(function(a,g,i){for(var k,l,r,s=a.length;i<s;i+=g)k=a[i],l=a[i+1],r=a[i+2],k=k/16383*c,l=l/16383*c,r=r/16383*c,k+=d,l+=e,r+=f,b.vertices.push(new THREE.Vertex(new THREE.Vector3(k,l,r)))})(g[0],8,0);(function(a,b,c){for(var d,e,f=a.length;c<f;c+=b)d=a[c],e=a[c+1],d/=1023,e/=1023,k.push(d,1-e)})(g[0],8,3);(function(a,
b,c){for(var d,e,f,g=a.length;c<g;c+=b)d=a[c],e=a[c+1],f=a[c+2],d=(d-512)/511,e=(e-512)/511,f=(f-512)/511,l.push(d,e,f)})(g[0],8,5);(function(a){var c,d,e,f,g,i,t,u,v,x=a.length;for(c=0;c<x;c+=3){d=a[c];e=a[c+1];f=a[c+2];g=b;u=d;v=e;i=f;var B=l[3*e],D=l[3*e+1],C=l[3*e+2],A=l[3*f],H=l[3*f+1],I=l[3*f+2];t=new THREE.Vector3(l[3*d],l[3*d+1],l[3*d+2]);B=new THREE.Vector3(B,D,C);A=new THREE.Vector3(A,H,I);g.faces.push(new THREE.Face3(u,v,i,[t,B,A],null,0));g=k[2*d];d=k[2*d+1];i=k[2*e];t=k[2*e+1];u=k[2*
f];v=k[2*f+1];f=b.faceVertexUvs[0];e=i;i=t;t=[];t.push(new THREE.UV(g,d));t.push(new THREE.UV(e,i));t.push(new THREE.UV(u,v));f.push(t)}})(g[1]);this.computeCentroids();this.computeFaceNormals()};g.prototype=new THREE.Geometry;g.prototype.constructor=g;b(new g)};
THREE.MarchingCubes=function(a,b){THREE.Object3D.call(this);this.material=b;this.init=function(a){this.resolution=a;this.isolation=80;this.size=a;this.size2=this.size*this.size;this.size3=this.size2*this.size;this.halfsize=this.size/2;this.delta=2/this.size;this.yd=this.size;this.zd=this.size2;this.field=new Float32Array(this.size3);this.normal_cache=new Float32Array(3*this.size3);this.vlist=new Float32Array(36);this.nlist=new Float32Array(36);this.firstDraw=!0;this.maxCount=4096;this.count=0;this.hasNormal=
this.hasPos=!1;this.positionArray=new Float32Array(3*this.maxCount);this.normalArray=new Float32Array(3*this.maxCount)};this.lerp=function(a,b,e){return a+(b-a)*e};this.VIntX=function(a,b,e,f,g,h,i,l,k,n){g=(g-k)/(n-k);k=this.normal_cache;b[f]=h+g*this.delta;b[f+1]=i;b[f+2]=l;e[f]=this.lerp(k[a],k[a+3],g);e[f+1]=this.lerp(k[a+1],k[a+4],g);e[f+2]=this.lerp(k[a+2],k[a+5],g)};this.VIntY=function(a,b,e,f,g,h,i,l,k,n){g=(g-k)/(n-k);k=this.normal_cache;b[f]=h;b[f+1]=i+g*this.delta;b[f+2]=l;b=a+3*this.yd;
e[f]=this.lerp(k[a],k[b],g);e[f+1]=this.lerp(k[a+1],k[b+1],g);e[f+2]=this.lerp(k[a+2],k[b+2],g)};this.VIntZ=function(a,b,e,f,g,h,i,l,k,n){g=(g-k)/(n-k);k=this.normal_cache;b[f]=h;b[f+1]=i;b[f+2]=l+g*this.delta;b=a+3*this.zd;e[f]=this.lerp(k[a],k[b],g);e[f+1]=this.lerp(k[a+1],k[b+1],g);e[f+2]=this.lerp(k[a+2],k[b+2],g)};this.compNorm=function(a){var b=3*a;0===this.normal_cache[b]&&(this.normal_cache[b]=this.field[a-1]-this.field[a+1],this.normal_cache[b+1]=this.field[a-this.yd]-this.field[a+this.yd],
this.normal_cache[b+2]=this.field[a-this.zd]-this.field[a+this.zd])};this.polygonize=function(a,b,e,f,g,h){var i=f+1,l=f+this.yd,k=f+this.zd,n=i+this.yd,q=i+this.zd,o=f+this.yd+this.zd,p=i+this.yd+this.zd,m=0,r=this.field[f],s=this.field[i],t=this.field[l],u=this.field[n],v=this.field[k],x=this.field[q],B=this.field[o],D=this.field[p];r<g&&(m|=1);s<g&&(m|=2);t<g&&(m|=8);u<g&&(m|=4);v<g&&(m|=16);x<g&&(m|=32);B<g&&(m|=128);D<g&&(m|=64);var C=THREE.edgeTable[m];if(0===C)return 0;var A=this.delta,H=a+
A,I=b+A,A=e+A;C&1&&(this.compNorm(f),this.compNorm(i),this.VIntX(3*f,this.vlist,this.nlist,0,g,a,b,e,r,s));C&2&&(this.compNorm(i),this.compNorm(n),this.VIntY(3*i,this.vlist,this.nlist,3,g,H,b,e,s,u));C&4&&(this.compNorm(l),this.compNorm(n),this.VIntX(3*l,this.vlist,this.nlist,6,g,a,I,e,t,u));C&8&&(this.compNorm(f),this.compNorm(l),this.VIntY(3*f,this.vlist,this.nlist,9,g,a,b,e,r,t));C&16&&(this.compNorm(k),this.compNorm(q),this.VIntX(3*k,this.vlist,this.nlist,12,g,a,b,A,v,x));C&32&&(this.compNorm(q),
this.compNorm(p),this.VIntY(3*q,this.vlist,this.nlist,15,g,H,b,A,x,D));C&64&&(this.compNorm(o),this.compNorm(p),this.VIntX(3*o,this.vlist,this.nlist,18,g,a,I,A,B,D));C&128&&(this.compNorm(k),this.compNorm(o),this.VIntY(3*k,this.vlist,this.nlist,21,g,a,b,A,v,B));C&256&&(this.compNorm(f),this.compNorm(k),this.VIntZ(3*f,this.vlist,this.nlist,24,g,a,b,e,r,v));C&512&&(this.compNorm(i),this.compNorm(q),this.VIntZ(3*i,this.vlist,this.nlist,27,g,H,b,e,s,x));C&1024&&(this.compNorm(n),this.compNorm(p),this.VIntZ(3*
n,this.vlist,this.nlist,30,g,H,I,e,u,D));C&2048&&(this.compNorm(l),this.compNorm(o),this.VIntZ(3*l,this.vlist,this.nlist,33,g,a,I,e,t,B));m<<=4;for(g=f=0;-1!=THREE.triTable[m+g];)a=m+g,b=a+1,e=a+2,this.posnormtriv(this.vlist,this.nlist,3*THREE.triTable[a],3*THREE.triTable[b],3*THREE.triTable[e],h),g+=3,f++;return f};this.posnormtriv=function(a,b,e,f,g,h){var i=3*this.count;this.positionArray[i]=a[e];this.positionArray[i+1]=a[e+1];this.positionArray[i+2]=a[e+2];this.positionArray[i+3]=a[f];this.positionArray[i+
4]=a[f+1];this.positionArray[i+5]=a[f+2];this.positionArray[i+6]=a[g];this.positionArray[i+7]=a[g+1];this.positionArray[i+8]=a[g+2];this.normalArray[i]=b[e];this.normalArray[i+1]=b[e+1];this.normalArray[i+2]=b[e+2];this.normalArray[i+3]=b[f];this.normalArray[i+4]=b[f+1];this.normalArray[i+5]=b[f+2];this.normalArray[i+6]=b[g];this.normalArray[i+7]=b[g+1];this.normalArray[i+8]=b[g+2];this.hasNormal=this.hasPos=!0;this.count+=3;this.count>=this.maxCount-3&&h(this)};this.begin=function(){this.count=0;
this.hasNormal=this.hasPos=!1};this.end=function(a){if(0!==this.count){for(var b=3*this.count;b<this.positionArray.length;b++)this.positionArray[b]=0;a(this)}};this.addBall=function(a,b,e,f,g){var h=this.size*Math.sqrt(f/g),i=e*this.size,l=b*this.size,k=a*this.size,n=Math.floor(i-h);1>n&&(n=1);i=Math.floor(i+h);i>this.size-1&&(i=this.size-1);var q=Math.floor(l-h);1>q&&(q=1);l=Math.floor(l+h);l>this.size-1&&(l=this.size-1);var o=Math.floor(k-h);1>o&&(o=1);h=Math.floor(k+h);h>this.size-1&&(h=this.size-
1);for(var p,m,r,s,t,u,v,k=n;k<i;k++){r=this.size2*k;t=k/this.size-e;u=t*t;for(n=q;n<l;n++){m=r+this.size*n;p=n/this.size-b;v=p*p;for(p=o;p<h;p++)s=p/this.size-a,s=f/(1.0E-6+s*s+v+u)-g,0<s&&(this.field[m+p]+=s)}}};this.addPlaneX=function(a,b){var e,f,g,h,i,l=this.size,k=this.yd,n=this.zd,q=this.field,o=l*Math.sqrt(a/b);o>l&&(o=l);for(e=0;e<o;e++)if(f=e/l,f*=f,h=a/(1.0E-4+f)-b,0<h)for(f=0;f<l;f++){i=e+f*k;for(g=0;g<l;g++)q[n*g+i]+=h}};this.addPlaneY=function(a,b){var e,f,g,h,i,l,k=this.size,n=this.yd,
q=this.zd,o=this.field,p=k*Math.sqrt(a/b);p>k&&(p=k);for(f=0;f<p;f++)if(e=f/k,e*=e,h=a/(1.0E-4+e)-b,0<h){i=f*n;for(e=0;e<k;e++){l=i+e;for(g=0;g<k;g++)o[q*g+l]+=h}}};this.addPlaneZ=function(a,b){var e,f,g,h,i,l,k=this.size,n=this.yd,q=this.zd,o=this.field,p=k*Math.sqrt(a/b);p>k&&(p=k);for(g=0;g<p;g++)if(e=g/k,e*=e,h=a/(1.0E-4+e)-b,0<h){i=q*g;for(f=0;f<k;f++){l=i+f*n;for(e=0;e<k;e++)o[l+e]+=h}}};this.reset=function(){var a;for(a=0;a<this.size3;a++)this.normal_cache[3*a]=0,this.field[a]=0};this.render=
function(a){this.begin();var b,e,f,g,h,i,l,k,n,q=this.size-2;for(g=1;g<q;g++){n=this.size2*g;l=(g-this.halfsize)/this.halfsize;for(f=1;f<q;f++){k=n+this.size*f;i=(f-this.halfsize)/this.halfsize;for(e=1;e<q;e++)h=(e-this.halfsize)/this.halfsize,b=k+e,this.polygonize(h,i,l,b,this.isolation,a)}}this.end(a)};this.generateGeometry=function(){var a=0,b=new THREE.Geometry,e=[];this.render(function(f){var g,h,i,l,k,n,q,o;for(g=0;g<f.count;g++)q=3*g,k=q+1,o=q+2,h=f.positionArray[q],i=f.positionArray[k],l=
f.positionArray[o],n=new THREE.Vector3(h,i,l),h=f.normalArray[q],i=f.normalArray[k],l=f.normalArray[o],q=new THREE.Vector3(h,i,l),q.normalize(),k=new THREE.Vertex(n),b.vertices.push(k),e.push(q);n=f.count/3;for(g=0;g<n;g++)q=3*(a+g),k=q+1,o=q+2,h=e[q],i=e[k],l=e[o],q=new THREE.Face3(q,k,o,[h,i,l]),b.faces.push(q);a+=n;f.count=0});return b};this.init(a)};THREE.MarchingCubes.prototype=new THREE.Object3D;THREE.MarchingCubes.prototype.constructor=THREE.MarchingCubes;
THREE.edgeTable=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,
1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,
419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]);
THREE.triTable=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,
-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,
8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,
-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,
5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,
-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,
10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,
6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,
8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,
2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,
-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,
-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,
-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,
-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,
2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,
4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,
2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);THREE.LensFlare=function(a,b,c,d,e){THREE.Object3D.call(this);this.lensFlares=[];this.positionScreen=new THREE.Vector3;this.customUpdateCallback=void 0;void 0!==a&&this.add(a,b,c,d,e)};THREE.LensFlare.prototype=new THREE.Object3D;THREE.LensFlare.prototype.constructor=THREE.LensFlare;
THREE.LensFlare.prototype.supr=THREE.Object3D.prototype;THREE.LensFlare.prototype.add=function(a,b,c,d,e,f){void 0===b&&(b=-1);void 0===c&&(c=0);void 0===f&&(f=1);void 0===e&&(e=new THREE.Color(16777215));if(void 0===d)d=THREE.NormalBlending;c=Math.min(c,Math.max(0,c));this.lensFlares.push({texture:a,size:b,distance:c,x:0,y:0,z:0,scale:1,rotation:1,opacity:f,color:e,blending:d})};
THREE.LensFlare.prototype.updateLensFlares=function(){var a,b=this.lensFlares.length,c,d=2*-this.positionScreen.x,e=2*-this.positionScreen.y;for(a=0;a<b;a++)c=this.lensFlares[a],c.x=this.positionScreen.x+d*c.distance,c.y=this.positionScreen.y+e*c.distance,c.wantedRotation=0.25*c.x*Math.PI,c.rotation+=0.25*(c.wantedRotation-c.rotation)};
THREE.LensFlarePlugin=function(){function a(a){var c=b.createProgram(),d=b.createShader(b.FRAGMENT_SHADER),e=b.createShader(b.VERTEX_SHADER);b.shaderSource(d,a.fragmentShader);b.shaderSource(e,a.vertexShader);b.compileShader(d);b.compileShader(e);b.attachShader(c,d);b.attachShader(c,e);b.linkProgram(c);return c}var b,c,d,e,f,g,h,i,l,k,n,q,o;this.init=function(p){b=p.context;c=p;d=new Float32Array(16);e=new Uint16Array(6);p=0;d[p++]=-1;d[p++]=-1;d[p++]=0;d[p++]=0;d[p++]=1;d[p++]=-1;d[p++]=1;d[p++]=
0;d[p++]=1;d[p++]=1;d[p++]=1;d[p++]=1;d[p++]=-1;d[p++]=1;d[p++]=0;d[p++]=1;p=0;e[p++]=0;e[p++]=1;e[p++]=2;e[p++]=0;e[p++]=2;e[p++]=3;f=b.createBuffer();g=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,f);b.bufferData(b.ARRAY_BUFFER,d,b.STATIC_DRAW);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,g);b.bufferData(b.ELEMENT_ARRAY_BUFFER,e,b.STATIC_DRAW);h=b.createTexture();i=b.createTexture();b.bindTexture(b.TEXTURE_2D,h);b.texImage2D(b.TEXTURE_2D,0,b.RGB,16,16,0,b.RGB,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,
b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);b.bindTexture(b.TEXTURE_2D,i);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,16,16,0,b.RGBA,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);
b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);0>=b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS)?(l=!1,k=a(THREE.ShaderFlares.lensFlare)):(l=!0,k=a(THREE.ShaderFlares.lensFlareVertexTexture));n={};q={};n.vertex=b.getAttribLocation(k,"position");n.uv=b.getAttribLocation(k,"uv");q.renderType=b.getUniformLocation(k,"renderType");q.map=b.getUniformLocation(k,"map");q.occlusionMap=b.getUniformLocation(k,"occlusionMap");q.opacity=b.getUniformLocation(k,"opacity");q.color=b.getUniformLocation(k,
"color");q.scale=b.getUniformLocation(k,"scale");q.rotation=b.getUniformLocation(k,"rotation");q.screenPosition=b.getUniformLocation(k,"screenPosition");o=!1};this.render=function(a,d,e,s){var a=a.__webglFlares,t=a.length;if(t){var u=new THREE.Vector3,v=s/e,x=0.5*e,B=0.5*s,D=16/s,C=new THREE.Vector2(D*v,D),A=new THREE.Vector3(1,1,0),H=new THREE.Vector2(1,1),I=q,D=n;b.useProgram(k);o||(b.enableVertexAttribArray(n.vertex),b.enableVertexAttribArray(n.uv),o=!0);b.uniform1i(I.occlusionMap,0);b.uniform1i(I.map,
1);b.bindBuffer(b.ARRAY_BUFFER,f);b.vertexAttribPointer(D.vertex,2,b.FLOAT,!1,16,0);b.vertexAttribPointer(D.uv,2,b.FLOAT,!1,16,8);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,g);b.disable(b.CULL_FACE);b.depthMask(!1);var N,$,K,Q,L;for(N=0;N<t;N++)if(D=16/s,C.set(D*v,D),Q=a[N],u.set(Q.matrixWorld.n14,Q.matrixWorld.n24,Q.matrixWorld.n34),d.matrixWorldInverse.multiplyVector3(u),d.projectionMatrix.multiplyVector3(u),A.copy(u),H.x=A.x*x+x,H.y=A.y*B+B,l||0<H.x&&H.x<e&&0<H.y&&H.y<s){b.activeTexture(b.TEXTURE1);b.bindTexture(b.TEXTURE_2D,
h);b.copyTexImage2D(b.TEXTURE_2D,0,b.RGB,H.x-8,H.y-8,16,16,0);b.uniform1i(I.renderType,0);b.uniform2f(I.scale,C.x,C.y);b.uniform3f(I.screenPosition,A.x,A.y,A.z);b.disable(b.BLEND);b.enable(b.DEPTH_TEST);b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0);b.activeTexture(b.TEXTURE0);b.bindTexture(b.TEXTURE_2D,i);b.copyTexImage2D(b.TEXTURE_2D,0,b.RGBA,H.x-8,H.y-8,16,16,0);b.uniform1i(I.renderType,1);b.disable(b.DEPTH_TEST);b.activeTexture(b.TEXTURE1);b.bindTexture(b.TEXTURE_2D,h);b.drawElements(b.TRIANGLES,
6,b.UNSIGNED_SHORT,0);Q.positionScreen.copy(A);Q.customUpdateCallback?Q.customUpdateCallback(Q):Q.updateLensFlares();b.uniform1i(I.renderType,2);b.enable(b.BLEND);for($=0,K=Q.lensFlares.length;$<K;$++)if(L=Q.lensFlares[$],0.001<L.opacity&&0.001<L.scale)A.x=L.x,A.y=L.y,A.z=L.z,D=L.size*L.scale/s,C.x=D*v,C.y=D,b.uniform3f(I.screenPosition,A.x,A.y,A.z),b.uniform2f(I.scale,C.x,C.y),b.uniform1f(I.rotation,L.rotation),b.uniform1f(I.opacity,L.opacity),b.uniform3f(I.color,L.color.r,L.color.g,L.color.b),c.setBlending(L.blending),
c.setTexture(L.texture,1),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0)}b.enable(b.CULL_FACE);b.enable(b.DEPTH_TEST);b.depthMask(!0)}}};
THREE.ShadowMapPlugin=function(){var a,b,c,d,e=new THREE.Frustum,f=new THREE.Matrix4;this.init=function(e){a=e.context;b=e;var e=THREE.ShaderLib.depthRGBA,f=THREE.UniformsUtils.clone(e.uniforms);c=new THREE.ShaderMaterial({fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:f});d=new THREE.ShaderMaterial({fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:f,morphTargets:!0});c._shadowPass=!0;d._shadowPass=!0};this.render=function(a,c){b.shadowMapEnabled&&b.shadowMapAutoUpdate&&
this.update(a,c)};this.update=function(g){var h,i,l,k,n,q,o,p,m,r=g.lights;a.clearColor(1,1,1,1);a.disable(a.BLEND);b.shadowMapCullFrontFaces&&a.cullFace(a.FRONT);b.setDepthTest(!0);for(h=0,i=r.length;h<i;h++)if(p=r[h],p.castShadow){if(!p.shadowMap)p.shadowMap=new THREE.WebGLRenderTarget(p.shadowMapWidth,p.shadowMapHeight,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBAFormat}),p.shadowMapSize=new THREE.Vector2(p.shadowMapWidth,p.shadowMapHeight),p.shadowMatrix=new THREE.Matrix4;
if(!p.shadowCamera){if(p instanceof THREE.SpotLight)p.shadowCamera=new THREE.PerspectiveCamera(p.shadowCameraFov,p.shadowMapWidth/p.shadowMapHeight,p.shadowCameraNear,p.shadowCameraFar);else if(p instanceof THREE.DirectionalLight)p.shadowCamera=new THREE.OrthographicCamera(p.shadowCameraLeft,p.shadowCameraRight,p.shadowCameraTop,p.shadowCameraBottom,p.shadowCameraNear,p.shadowCameraFar);else{console.error("Unsupported light type for shadow");continue}g.add(p.shadowCamera);b.autoUpdateScene&&g.updateMatrixWorld()}if(p.shadowCameraVisible&&
!p.cameraHelper)p.cameraHelper=new THREE.CameraHelper(p.shadowCamera),p.shadowCamera.add(p.cameraHelper);l=p.shadowMap;k=p.shadowMatrix;n=p.shadowCamera;n.position.copy(p.matrixWorld.getPosition());n.lookAt(p.target.matrixWorld.getPosition());n.updateMatrixWorld();n.matrixWorldInverse.getInverse(n.matrixWorld);if(p.cameraHelper)p.cameraHelper.lines.visible=p.shadowCameraVisible;p.shadowCameraVisible&&p.cameraHelper.update(p.shadowCamera);k.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);k.multiplySelf(n.projectionMatrix);
k.multiplySelf(n.matrixWorldInverse);if(!n._viewMatrixArray)n._viewMatrixArray=new Float32Array(16);n.matrixWorldInverse.flattenToArray(n._viewMatrixArray);if(!n._projectionMatrixArray)n._projectionMatrixArray=new Float32Array(16);n.projectionMatrix.flattenToArray(n._projectionMatrixArray);f.multiply(n.projectionMatrix,n.matrixWorldInverse);e.setFromMatrix(f);b.setRenderTarget(l);b.clear();m=g.__webglObjects;for(l=0,k=m.length;l<k;l++)if(q=m[l],p=q.object,q.render=!1,p.visible&&p.castShadow&&(!(p instanceof
THREE.Mesh)||!p.frustumCulled||e.contains(p)))p.matrixWorld.flattenToArray(p._objectMatrixArray),p._modelViewMatrix.multiplyToArray(n.matrixWorldInverse,p.matrixWorld,p._modelViewMatrixArray),q.render=!0;for(l=0,k=m.length;l<k;l++)if(q=m[l],q.render)p=q.object,q=q.buffer,b.setObjectFaces(p),o=p.customDepthMaterial?p.customDepthMaterial:p.geometry.morphTargets.length?d:c,q instanceof THREE.BufferGeometry?b.renderBufferDirect(n,r,null,o,q,p):b.renderBuffer(n,r,null,o,q,p);m=g.__webglObjectsImmediate;
for(l=0,k=m.length;l<k;l++)q=m[l],p=q.object,p.visible&&p.castShadow&&(p.matrixAutoUpdate&&p.matrixWorld.flattenToArray(p._objectMatrixArray),p._modelViewMatrix.multiplyToArray(n.matrixWorldInverse,p.matrixWorld,p._modelViewMatrixArray),b.renderImmediateObject(n,r,null,c,p))}g=b.getClearColor();h=b.getClearAlpha();a.clearColor(g.r,g.g,g.b,h);a.enable(a.BLEND);b.shadowMapCullFrontFaces&&a.cullFace(a.BACK)}};
THREE.SpritePlugin=function(){function a(a,b){return b.z-a.z}var b,c,d,e,f,g,h,i,l,k;this.init=function(a){b=a.context;c=a;d=new Float32Array(16);e=new Uint16Array(6);a=0;d[a++]=-1;d[a++]=-1;d[a++]=0;d[a++]=1;d[a++]=1;d[a++]=-1;d[a++]=1;d[a++]=1;d[a++]=1;d[a++]=1;d[a++]=1;d[a++]=0;d[a++]=-1;d[a++]=1;d[a++]=0;a=d[a++]=0;e[a++]=0;e[a++]=1;e[a++]=2;e[a++]=0;e[a++]=2;e[a++]=3;f=b.createBuffer();g=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,f);b.bufferData(b.ARRAY_BUFFER,d,b.STATIC_DRAW);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
g);b.bufferData(b.ELEMENT_ARRAY_BUFFER,e,b.STATIC_DRAW);var a=THREE.ShaderSprite.sprite,q=b.createProgram(),o=b.createShader(b.FRAGMENT_SHADER),p=b.createShader(b.VERTEX_SHADER);b.shaderSource(o,a.fragmentShader);b.shaderSource(p,a.vertexShader);b.compileShader(o);b.compileShader(p);b.attachShader(q,o);b.attachShader(q,p);b.linkProgram(q);h=q;i={};l={};i.position=b.getAttribLocation(h,"position");i.uv=b.getAttribLocation(h,"uv");l.uvOffset=b.getUniformLocation(h,"uvOffset");l.uvScale=b.getUniformLocation(h,
"uvScale");l.rotation=b.getUniformLocation(h,"rotation");l.scale=b.getUniformLocation(h,"scale");l.alignment=b.getUniformLocation(h,"alignment");l.color=b.getUniformLocation(h,"color");l.map=b.getUniformLocation(h,"map");l.opacity=b.getUniformLocation(h,"opacity");l.useScreenCoordinates=b.getUniformLocation(h,"useScreenCoordinates");l.affectedByDistance=b.getUniformLocation(h,"affectedByDistance");l.screenPosition=b.getUniformLocation(h,"screenPosition");l.modelViewMatrix=b.getUniformLocation(h,"modelViewMatrix");
l.projectionMatrix=b.getUniformLocation(h,"projectionMatrix");k=!1};this.render=function(d,e,o,p){var d=d.__webglSprites,m=d.length;if(m){var r=i,s=l,t=p/o,o=0.5*o,u=0.5*p,v=!0;b.useProgram(h);k||(b.enableVertexAttribArray(r.position),b.enableVertexAttribArray(r.uv),k=!0);b.disable(b.CULL_FACE);b.enable(b.BLEND);b.depthMask(!0);b.bindBuffer(b.ARRAY_BUFFER,f);b.vertexAttribPointer(r.position,2,b.FLOAT,!1,16,0);b.vertexAttribPointer(r.uv,2,b.FLOAT,!1,16,8);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,g);b.uniformMatrix4fv(s.projectionMatrix,
!1,e._projectionMatrixArray);b.activeTexture(b.TEXTURE0);b.uniform1i(s.map,0);for(var x,B=[],r=0;r<m;r++)if(x=d[r],x.visible&&0!==x.opacity)x.useScreenCoordinates?x.z=-x.position.z:(x._modelViewMatrix.multiplyToArray(e.matrixWorldInverse,x.matrixWorld,x._modelViewMatrixArray),x.z=-x._modelViewMatrix.n34);d.sort(a);for(r=0;r<m;r++)x=d[r],x.visible&&0!==x.opacity&&x.map&&x.map.image&&x.map.image.width&&(x.useScreenCoordinates?(b.uniform1i(s.useScreenCoordinates,1),b.uniform3f(s.screenPosition,(x.position.x-
o)/o,(u-x.position.y)/u,Math.max(0,Math.min(1,x.position.z)))):(b.uniform1i(s.useScreenCoordinates,0),b.uniform1i(s.affectedByDistance,x.affectedByDistance?1:0),b.uniformMatrix4fv(s.modelViewMatrix,!1,x._modelViewMatrixArray)),e=x.map.image.width/(x.scaleByViewport?p:1),B[0]=e*t*x.scale.x,B[1]=e*x.scale.y,b.uniform2f(s.uvScale,x.uvScale.x,x.uvScale.y),b.uniform2f(s.uvOffset,x.uvOffset.x,x.uvOffset.y),b.uniform2f(s.alignment,x.alignment.x,x.alignment.y),b.uniform1f(s.opacity,x.opacity),b.uniform3f(s.color,
x.color.r,x.color.g,x.color.b),b.uniform1f(s.rotation,x.rotation),b.uniform2fv(s.scale,B),x.mergeWith3D&&!v?(b.enable(b.DEPTH_TEST),v=!0):!x.mergeWith3D&&v&&(b.disable(b.DEPTH_TEST),v=!1),c.setBlending(x.blending),c.setTexture(x.map,0),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0));b.enable(b.CULL_FACE);b.enable(b.DEPTH_TEST);b.depthMask(!0)}}};
if(THREE.WebGLRenderer)THREE.AnaglyphWebGLRenderer=function(a){THREE.WebGLRenderer.call(this,a);this.autoUpdateScene=!1;var b=this,c=this.setSize,d=this.render,e=new THREE.PerspectiveCamera,f=new THREE.PerspectiveCamera,g=new THREE.Matrix4,h=new THREE.Matrix4,i,l,k,n;e.matrixAutoUpdate=f.matrixAutoUpdate=!1;var a={minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter,format:THREE.RGBAFormat},q=new THREE.WebGLRenderTarget(512,512,a),o=new THREE.WebGLRenderTarget(512,512,a),p=new THREE.PerspectiveCamera(53,
1,1,1E4);p.position.z=2;var a=new THREE.ShaderMaterial({uniforms:{mapLeft:{type:"t",value:0,texture:q},mapRight:{type:"t",value:1,texture:o}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D mapLeft;\nuniform sampler2D mapRight;\nvarying vec2 vUv;\nvoid main() {\nvec4 colorL, colorR;\nvec2 uv = vUv;\ncolorL = texture2D( mapLeft, uv );\ncolorR = texture2D( mapRight, uv );\ngl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;\n}"}),
m=new THREE.Scene;m.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),a));m.add(p);this.setSize=function(a,d){c.call(b,a,d);q.width=a;q.height=d;o.width=a;o.height=d};this.render=function(a,c){a.updateMatrixWorld();if(i!==c.aspect||l!==c.near||k!==c.far||n!==c.fov){i=c.aspect;l=c.near;k=c.far;n=c.fov;var t=c.projectionMatrix.clone(),u=0.5*(125/30),v=u*l/125,x=l*Math.tan(n*Math.PI/360),B;g.n14=u;h.n14=-u;u=-x*i+v;B=x*i+v;t.n11=2*l/(B-u);t.n13=(B+u)/(B-u);e.projectionMatrix.copy(t);u=-x*i-v;B=x*i-v;t.n11=
2*l/(B-u);t.n13=(B+u)/(B-u);f.projectionMatrix.copy(t)}e.matrixWorld.copy(c.matrixWorld).multiplySelf(h);e.position.copy(c.position);e.near=c.near;e.far=c.far;d.call(b,a,e,q,!0);f.matrixWorld.copy(c.matrixWorld).multiplySelf(g);f.position.copy(c.position);f.near=c.near;f.far=c.far;d.call(b,a,f,o,!0);m.updateMatrixWorld();d.call(b,m,p)}};
if(THREE.WebGLRenderer)THREE.CrosseyedWebGLRenderer=function(a){THREE.WebGLRenderer.call(this,a);this.autoClear=!1;var b=this,c=this.setSize,d=this.render,e,f,g=new THREE.PerspectiveCamera;g.target=new THREE.Vector3(0,0,0);var h=new THREE.PerspectiveCamera;h.target=new THREE.Vector3(0,0,0);b.separation=10;if(a&&void 0!==a.separation)b.separation=a.separation;this.setSize=function(a,d){c.call(b,a,d);e=a/2;f=d};this.render=function(a,c){this.clear();g.fov=c.fov;g.aspect=0.5*c.aspect;g.near=c.near;g.far=
c.far;g.updateProjectionMatrix();g.position.copy(c.position);g.target.copy(c.target);g.translateX(b.separation);g.lookAt(g.target);h.projectionMatrix=g.projectionMatrix;h.position.copy(c.position);h.target.copy(c.target);h.translateX(-b.separation);h.lookAt(h.target);this.setViewport(0,0,e,f);d.call(b,a,g);this.setViewport(e,0,e,f);d.call(b,a,h,!1)}};
THREE.ShaderFlares={lensFlareVertexTexture:{vertexShader:"uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",fragmentShader:"precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"},
lensFlare:{vertexShader:"uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",fragmentShader:"precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"}};
THREE.ShaderSprite={sprite:{vertexShader:"uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
fragmentShader:"precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"}};
// tquery.js - https://github.com/jeromeetienne/tquery - MIT License
/**
 * @fileOverview This file is the core of tQuery library. 
*/

/**
 * Create a tQuery element
 *
 * @class root class
 * 
 * @param {} object
 * @param {THREE.Object3D} rootnode
 * @returns {tQuery.*} the tQuery object created
*/
var tQuery = function (object, root) {
    // TODO make that cleaner
    // - there is a list of functions registered by each plugins
    //   - handle() object instanceof THREE.Mesh
    //   - create() return new tQuery(object)
    // - this list is processed in order here

    if (object instanceof THREE.Mesh && tQuery.Mesh) {
        return new tQuery.Mesh(object);

    } else if (object instanceof THREE.DirectionalLight && tQuery.DirectionalLight) {
        return new tQuery.DirectionalLight(object);
    } else if (object instanceof THREE.AmbientLight && tQuery.AmbientLight) {
        return new tQuery.AmbientLight(object);
    } else if (object instanceof THREE.Light && tQuery.Light) {
        return new tQuery.Light(object);

    } else if (object instanceof THREE.Object3D && tQuery.Object3D) {
        return new tQuery.Object3D(object);
    } else if (object instanceof THREE.Geometry && tQuery.Geometry) {
        return new tQuery.Geometry(object);
    } else if (object instanceof THREE.Material && tQuery.Material) {
        return new tQuery.Material(object);
    } else if (typeof object === "string" && tQuery.Object3D) {
        return new tQuery.Object3D(object, root);

        //Controls
    } else if (object instanceof THREE.TrackballControls && tQuery.TrackballControl) {
        return new tQuery.TrackballControl(object);

    } else {
        console.assert(false, "unsupported type")
    }
    return undefined;
};

/**
 * The version of tQuery
*/
tQuery.VERSION	= "0.0.1";

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * generic getter/setter
 * 
 * @param {Object} object the object in which store the data
 * @param {String} key the key/name of the data to get/set
 * @param {*} value the value to set (optional)
 * 
 * @returns {*} return the value stored in this object for this key
*/
tQuery.data	= function(object, key, value)
{
	// sanity check
	console.assert( object, 'invalid parameters' );
	console.assert( typeof key === 'string', 'invalid parameters');

	// init _tqData
	object['_tqData']	= object['_tqData']	|| {};
	// set the value if any
	if( value ){
		object['_tqData'][key]	= value;
	}
	// return the value
	return object['_tqData'][key];
};

/**
 * Same as jQuery.removeData()
*/
tQuery.removeData	= function(object, key)
{
	// handle the 'key as Array' case
	if( key instanceof Array ){
		key.forEach(function(key){
			tQuery.removeData(object, key);
		})
		return;
	}
	// sanity check
	console.assert( typeof key === "string");
	// do delete the key
	delete object['_tqData'][key];
	// TOTO remove object[_tqData] if empty now
}


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * loop over a Array.
 * 
 * @param {Array} arr the array to traverse.
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.each	= function(arr, callback){
	for(var i = 0; i < arr.length; i++){
		var keepLooping	= callback(arr[i])
		if( keepLooping === false )	return false;
	}
	return true;
};

/**
 * Make a child Class inherit from the parent class.
 *
 * @param {Object} childClass the child class which gonna inherit
 * @param {Object} parentClass the class which gonna be inherited
*/
tQuery.inherit	= function(childClass, parentClass){
	// trick to avoid calling parentClass constructor
	var tempFn		= function() {};
	tempFn.prototype	= parentClass.prototype;
	childClass.prototype	= new tempFn();

	childClass.parent	= parentClass.prototype;
	childClass.prototype.constructor= childClass;	
};

/**
 * extend function. mainly aimed at handling default values - jme: im not sure at all it is the proper one.
 * http://jsapi.info/_/extend
 * similar to jquery one but much smaller
*/
tQuery.extend = function(obj, base){
	var result	= {};
	base && Object.keys(base).forEach(function(key){
		result[key]	= base[key];
	})
	obj && Object.keys(obj).forEach(function(key){
		result[key]	= obj[key];
	})
	return result;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Make an object pluginable
 * 
 * @param {Object} object the object on which you mixin function
 * @param {Object} dest the object in which to register the plugin
*/
tQuery.pluginsOn	= function(object, dest){
	dest	= dest	|| object.prototype || object;
	object.register	= function(name, funct) {
		if( dest[name] ){
			throw new Error('Conflict! Already method called: ' + name);
		}
		dest[name]	= funct;
	};
	object.unregister	= function(name){
		if( dest.hasOwnProperty(name) === false ){
			throw new Error('Plugin not found: ' + name);
		}
		delete dest[name];
	};
	object.registered	= function(name){
		return dest.hasOwnProperty(name) === true;
	}
};

tQuery.pluginsInstanceOn= function(klass){ return tQuery.pluginsOn(klass);		};
tQuery.pluginsStaticOn	= function(klass){ return tQuery.pluginsOn(klass. klass);	};


// make it pluginable
tQuery.pluginsOn(tQuery, tQuery);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.mixinAttributes	= function(dstObject, properties){
	// mixin the new property
	// FIXME the inheritance should work now... not sure
	dstObject.prototype._attrProps	= tQuery.extend(dstObject.prototype._attrProps, properties);

	dstObject.prototype.attr	= function(name, value){
		// handle parameters
		if( name instanceof Object && value === undefined ){
			Object.keys(name).forEach(function(key){
				this.attr(key, name[key]);
			}.bind(this));
		}else if( typeof(name) === 'string' ){
			console.assert( Object.keys(this._attrProps).indexOf(name) !== -1, 'invalid property name:'+name);
		}else	console.assert(false, 'invalid parameter');

		// handle setter
		if( value !== undefined ){
			var convertFn	= this._attrProps[name];
			value		= convertFn(value);
			this.each(function(element){
				element[name]	= value;
			})
			return this;			
		}
		// handle getter
		if( this.length === 0 )	return undefined
		var element	= this.get(0);
		return element[name];
	};

	// add shortcuts
	Object.keys(properties).forEach(function(name){
		dstObject.prototype[name]	= function(value){
			return this.attr(name, value);
		};
	}.bind(this));
};

//////////////////////////////////////////////////////////////////////////////////
//		put some helpers						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Flow control - from https://github.com/jeromeetienne/gowiththeflow.js
*/
tQuery.Flow	= function(){
	var self, stack = [], timerId = setTimeout(function(){ timerId = null; self._next(); }, 0);
	return self = {
		destroy	: function(){ timerId && clearTimeout(timerId);	},
		par	: function(callback, isSeq){
			if(isSeq || !(stack[stack.length-1] instanceof Array)) stack.push([]);
			stack[stack.length-1].push(callback);
			return self;
		},seq	: function(callback){ return self.par(callback, true);	},
		_next	: function(err, result){
			var errors = [], results = [], callbacks = stack.shift() || [], nbReturn = callbacks.length, isSeq = nbReturn == 1;
			callbacks && callbacks.forEach(function(fct, index){
				fct(function(error, result){
					errors[index]	= error;
					results[index]	= result;		
					if(--nbReturn == 0)	self._next(isSeq?errors[0]:errors, isSeq?results[0]:results)
				}, err, result)
			})
		}
	}
};

/**
 * microevents.js - https://github.com/jeromeetienne/microevent.js
*/
tQuery.MicroeventMixin	= function(destObj){
	destObj.bind	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		return fct;
	};
	destObj.unbind	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	};
	destObj.trigger	= function(event /* , args... */){
		if(this._events === undefined) 	this._events	= {};
		if( this._events[event] === undefined )	return;
		var tmpArray	= this._events[event].slice(); 
		for(var i = 0; i < tmpArray.length; i++){
			tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

tQuery.convert	= {};

/**
 * Convert the value into a THREE.Color object
 * 
 * @return {THREE.Color} the resulting color
*/
tQuery.convert.toThreeColor	= function(value){
	if( arguments.length === 1 && typeof(value) === 'number'){
		return new THREE.Color(value);
	}else if( arguments.length === 1 && value instanceof THREE.Color ){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.toNumber	= function(value){
	if( arguments.length === 1 && typeof(value) === 'number'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.identity	= function(value){
	return value;
};

tQuery.convert.toBool	= function(value){
	if( arguments.length === 1 && typeof(value) === 'boolean'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};
/**
 * implementation of the tQuery.Node
 *
 * @class base class for tQuery objects
 *
 * @param {Object} object an instance or an array of instance
*/
tQuery.Node	= function(object)
{
	// handle parameters
	if( object instanceof Array )	this._lists	= object;
	else if( !object )		this._lists	= [];
	else				this._lists	= [object];
	this.length	= this._lists.length;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve the elements matched by the tQuery object
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Node.prototype.get	= function(idx)
{
	if( idx === undefined )	return this._lists;
	// sanity check - it MUST be defined
	console.assert(this._lists[idx], "element not defined");
	return this._lists[idx];
};

/**
 * loop over element
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Node.prototype.each	= function(callback)
{
	return tQuery.each(this._lists, callback)
};

/**
 * getter/setter of the back pointer
 *
 * @param {Object} back the value to return when .back() is called. optional
*/
tQuery.Node.prototype.back	= function(value)
{
	if( value  === undefined )	return this._back;
	this._back	= value;
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * same as .data() in jquery
*/
tQuery.Node.prototype.data	= function(key, value)
{
	// handle the setter case
	if( value ){
		this.each(function(element){
			tQuery.data(element, key, value);
		});
		return this;	// for chained API
	}
	// return the value of the first element
	if( this.length > 0 )	return tQuery.data(this.get(0), key)
	// return undegined if the list is empty
	console.assert(this.length === 0);
	return undefined
}


/**
 * same as .data() in jquery
*/
tQuery.Node.prototype.removeData	= function(key)
{
	this.each(function(element){
		tQuery.removeData(element, key);
	});
	return this;	// for chained API
}﻿/**
* @Base tquery object for a control
*/

tQuery.Control = function (elements) {
    // call parent ctor
    tQuery.Control.parent.constructor.call(this, elements);
}

/**
* inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Control, tQuery.Node);

/**
* All controls should implement update to be called in the render loop
*/
tQuery.Control.prototype.update = function () {
    this._lists.forEach(function (item) { item.update(); });
}

/**
* All controls needs to be set to a world, at which point the controls internal camera object is set
* and the worlds camera control is also set.
*/
tQuery.Control.prototype.setOn = function (world) {
    this._lists.forEach(function (item) {
        item.object = world.camera();
        world.setCameraControls(item);
    });
}

/**
* Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Control);/**
 * Handle object3D
 *
 * @class include THREE.Object3D
 *
 * @param {} object
 * @param {THREE.Object3D} rootnode
 * @returns {tQuery.*} the tQuery object created
*/
tQuery.Object3D	= function(object, root)
{
	// handle the case of selector
	if( typeof object === "string" ){
		object	= tQuery.Object3D._select(object, root);
	}

	// call parent ctor
	tQuery.Object3D.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Object3D
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Object3D); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Object3D, tQuery.Node);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Object3D);

//////////////////////////////////////////////////////////////////////////////////
//		geometry and material						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * get geometry.
 *
 * TODO this should be move in tQuery.Mesh
 * 
 * @returns {tQuery.Geometry} return the geometries from the tQuery.Object3D
*/
tQuery.Object3D.prototype.geometry	= function(value){
	var geometries	= [];
	this.each(function(object3d){
		geometries.push(object3d.geometry)
	});
	return new tQuery.Geometry(geometries).back(this);
};

/**
 * get material.
 * 
 * TODO this should be move in tQuery.Mesh
 * 
 * @returns {tQuery.Material} return the materials from the tQuery.Object3D
*/
tQuery.Object3D.prototype.material	= function(){
	var materials	= [];
	this.each(function(object3d){
		materials.push(object3d.material)
	});
	return new tQuery.Material(materials);
};

//////////////////////////////////////////////////////////////////////////////////
//			addTo/removeFrom tQuery.World/tQuery.Object3d		//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add all matched elements to a world
 * 
 * @param {tQuery.World or tQuery.Object3D} target object to which add it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.addTo	= function(target)
{
	console.assert( target instanceof tQuery.World || target instanceof tQuery.Object3D )
	this.each(function(object3d){
		target.add(object3d)
	}.bind(this));
	return this;
}

/**
 * remove all matched elements from a world
 * 
 * @param {tQuery.World or tQuery.Object3D} target object to which add it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.removeFrom	= function(target)
{
	console.assert( target instanceof tQuery.World || target instanceof tQuery.Object3D )
	this.each(function(object3d){
		target.remove(object3d)
	}.bind(this));
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//			addTo/removeFrom tQuery.World/tQuery.Object3d		//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add all matched elements to a world
 * 
 * @param {tQuery.Object3D} target object to which add it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.add	= function(tqObject3d)
{
	console.assert( tqObject3d instanceof tQuery.Object3D )
	this.each(function(object1){
		tqObject3d.each(function(object2){
			object1.add(object2);
		})
	}.bind(this));
	return this;
}

/**
 * remove all matched elements from a world
 * 
 * @param {tQuery.Object3D} object3d the object to add in this object
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.remove	= function(tqObject3d)
{
	console.assert( tqObject3d instanceof tQuery.Object3D )
	this.each(function(object1){
		tqObject3d.each(function(object2){
			object1.remove(object2);
		})
	}.bind(this));
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//		Handle dom attribute						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Getter/Setter for the id of the matched elements
*/
tQuery.Object3D.prototype.id	= function(value)
{
	// sanity check 
	console.assert(this.length <= 1, "tQuery.Object3D.id used on multi-elements" );
	if( value !== undefined ){
		if( this.length > 0 ){
			var object3d	= this.get(0);
			object3d._tqId	= value;
		}
		return this;
	}else{
		if( this.length > 0 ){
			var object3d	= this.get(0);
			return object3d._tqId;
		}
		return undefined;
	}
};

/**
 * add a class to all matched elements
 * 
 * @param {string} className the name of the class to add
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.addClass	= function(className){
	this.each(function(tObject3d){
		// init ._tqClasses if needed
		tObject3d._tqClasses	= tObject3d._tqClasses	|| '';

		if( tQuery.Object3D._hasClassOne(tObject3d, className) )	return;
		
		tObject3d._tqClasses	+= ' '+className;
	}.bind(this));
	return this;
};

/**
 * remove a class to all matched elements
 * 
 * @param {string} className the name of the class to remove
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.removeClass	= function(className){
	this.each(function(tObject3d){
		tQuery.Object3D._removeClassOne(tObject3d, className);
	}.bind(this));
	return this;	// for chained api
};

/**
 * return true if any of the matched elements has this class
 *
 * @param {string} className the name of the class
 * @returns {tQuery.Object3D} true if any of the matched elements has this class, false overwise
*/
tQuery.Object3D.prototype.hasClass	= function(className){
	var completed	= this.each(function(object3d){
		// init ._tqClasses if needed
		object3d._tqClasses	= object3d._tqClasses	|| '';

		var hasClass	= tQuery.Object3D._hasClassOne(object3d, className);
		return hasClass ? false : true;
	}.bind(this));
	return completed ? false : true;
};

tQuery.Object3D._hasClassOne	= function(object3d, className){
	if( object3d._tqClasses === undefined )	return false;
	var classes	= object3d._tqClasses;
	var re		= new RegExp('(^| |\t)+('+className+')($| |\t)+');
	return classes.match(re) ? true : false;
};

tQuery.Object3D._removeClassOne	= function(object3d, className){
	if( object3d._tqClasses === undefined )	return;
	var re		= new RegExp('(^| |\t)('+className+')($| |\t)');
	object3d._tqClasses	= object3d._tqClasses.replace(re, ' ');
};

//////////////////////////////////////////////////////////////////////////////////
//			handling selection					//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D._select	= function(selector, root){
	root		= root	|| tQuery.world.scene();
	var selectItems	= selector.split(' ').filter(function(v){ return v.length > 0;})

	var lists	= [];	
	root.children.forEach(function(child){
		var nodes	= this._crawls(child, selectItems);
		// FIXME reallocate the array without need
		lists		= lists.concat(nodes);
	}.bind(this));	
	return lists;
}

tQuery.Object3D._crawls	= function(root, selectItems)
{
	var result	= [];
//console.log("crawl", root, selectItems)
	console.assert( selectItems.length >= 1 );
	var match	= this._selectItemMatch(root, selectItems[0]);
//console.log("  match", match)
	var nextSelect	= match ? selectItems.slice(1) : selectItems;
//console.log("  nextSelect", nextSelect)

	if( nextSelect.length === 0 )	return [root];

	root.children.forEach(function(child){
		var nodes	= this._crawls(child, nextSelect);
		// FIXME reallocate the array without need
		result		= result.concat(nodes);
	}.bind(this));

	return result;
}

// all the geometries keywords
tQuery.Object3D._selectableGeometries	= Object.keys(THREE).filter(function(value){
	return value.match(/.+Geometry$/);}).map(function(value){ return value.replace(/Geometry$/,'').toLowerCase();
});

// all the light keywords
tQuery.Object3D._selectableLights	= Object.keys(THREE).filter(function(value){
	return value.match(/.+Light$/);}).map(function(value){ return value.replace(/Light$/,'').toLowerCase();
});

tQuery.Object3D._selectableClasses	= ['mesh', 'light'];

tQuery.Object3D._selectItemMatch	= function(object3d, selectItem)
{
	// sanity check
	console.assert( object3d instanceof THREE.Object3D );
	console.assert( typeof selectItem === 'string' );

	// parse selectItem into subItems
	var subItems	= selectItem.match(new RegExp("([^.#]+|\.[^.#]+|\#[^.#]+)", "g"));;

	// go thru each subItem
	var completed	= tQuery.each(subItems, function(subItem){
		var meta	= subItem.charAt(0);
		var suffix	= subItem.slice(1);
		//console.log("meta", meta, subItem, suffix, object3d)
		if( meta === "." ){
			var hasClass	= tQuery.Object3D._hasClassOne(object3d, suffix);
			return hasClass ? true : false;
		}else if( meta === "#" ){
			return object3d._tqId === suffix ? true : false;
		}else if( subItem === "*" ){
			return true;
		}else if( this._selectableGeometries.indexOf(subItem) !== -1 ){	// Handle geometries
			var geometry	= object3d.geometry;
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1) + "Geometry";
			return geometry instanceof THREE[className];
		}else if( this._selectableLights.indexOf(subItem) !== -1 ){	// Handle light
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1) + "Light";
			return object3d instanceof THREE[className];
		}else if( this._selectableClasses.indexOf(subItem) !== -1 ){	// Handle light
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1);
			return object3d instanceof THREE[className];
		}
		// this point should never be reached
		console.assert(false, "invalid selector: "+subItem);
		return true;
	}.bind(this));

	return completed ? true : false;
}
/**
 * Handle geometry. It inherit from tQuery.Node
 *
 * @class handle THREE.Geometry. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Geometry} object an instance or an array of instance
*/
tQuery.Geometry	= function(object)
{
	// call parent
	tQuery.Geometry.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Geometry
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Geometry); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Geometry, tQuery.Node);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Geometry);/**
 * Handle material
 *
 * @class include THREE.Material. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Material} object an instance or array of instance
*/
tQuery.Material	= function(object)
{
	// call parent
	tQuery.Material.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Material); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Material, tQuery.Node);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Material, {
	opacity		: tQuery.convert.toNumber,
	transparent	: tQuery.convert.toBool
});
/**
 * Handle light
 *
 * @class include THREE.Light. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Light} object an instance or array of instance
*/
tQuery.Light	= function(elements)
{
	// call parent ctor
	tQuery.Light.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Light); });
};

/**
 * inherit from tQuery.Node
 * - TODO this should inherit from tQuery.Object3D but but in inheritance
*/
tQuery.inherit(tQuery.Light, tQuery.Object3D);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Light);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Light, {
	color	: tQuery.convert.toThreeColor
});


/**
 * Handle mesh
 *
 * @class include THREE.Mesh. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Mesh} object an instance or array of instance
*/
tQuery.Mesh	= function(elements)
{
	// call parent ctor
	var parent	= tQuery.Mesh.parent;
	parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Mesh
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Mesh); });
};

/**
 * inherit from tQuery.Node
 * - TODO this should inherit from tQuery.Object3D but but in inheritance
*/
tQuery.inherit(tQuery.Mesh, tQuery.Object3D);


/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Mesh);


tQuery.Mesh.prototype.material	= function(value){
	var parent	= tQuery.Mesh.parent;
	// handle the getter case
	if( value == undefined )	return parent.material.call(this);
	// handle the setter case
	this.each(function(tMesh){
		tMesh.material	= value;
	});
	return this;	// for the chained API
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle world (aka scene+camera+renderer)
 *
 * @class youpla
 * 
 * @param {THREE.Material} object an instance or an array of instance
*/
tQuery.World	= function()
{
	// update default world.
	// - TODO no sanity check ?
	tQuery.world	= this;
	
	// create a scene
	this._scene	= new THREE.Scene();

	// create a renderer
	if( this._hasWebGL ){
		this._renderer = new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
		this._renderer.setClearColorHex( 0xBBBBBB, 1 );
	}else{
		this._addGetWebGLMessage();
		throw new Error("WebGL required and not available")
	}
	// FIXME this window dimension is crap
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	// create a camera in the scene
	// FIXME this window dimension is crap
	this._camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 10000 );
	this._camera.position.set(0, 0, 3);
	this._scene.add(this._camera);
	
	// create the loop
	this._loop	= new tQuery.Loop(this)
};

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.World);

// make it eventable
tQuery.MicroeventMixin(tQuery.World.prototype)


tQuery.World.prototype.destroy	= function(){
	// microevent.js notification
	this.trigger('destroy');
	// destroy the loop
	this._loop.destroy();
	// remove this._cameraControls if needed
	this.removeCameraControls();
	// remove renderer element
	var parent	= this._renderer.domElement.parentElement;
	parent	&& parent.removeChild(this._renderer.domElement);
	
	// clear the global if needed
	if( tQuery.world === this )	tQuery.world = null;
}

//////////////////////////////////////////////////////////////////////////////////
//		WebGL Support							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * true if webgl is available, false otherwise
*/
tQuery.World.prototype._hasWebGL	= (function(){
	// test from Detector.js
	try{
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ){
		return false;
	}
})();

/**
*/
tQuery.World.prototype._addGetWebGLMessage	= function(parent)
{
	parent	= parent || document.body;
	
	// message directly taken from Detector.js
	var domElement = document.createElement( 'div' );
	domElement.style.fontFamily = 'monospace';
	domElement.style.fontSize = '13px';
	domElement.style.textAlign = 'center';
	domElement.style.background = '#eee';
	domElement.style.color = '#000';
	domElement.style.padding = '1em';
	domElement.style.width = '475px';
	domElement.style.margin = '5em auto 0';
	domElement.innerHTML = window.WebGLRenderingContext ? [
		'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br />',
		'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
	].join( '\n' ) : [
		'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br/>',
		'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
	].join( '\n' );

	parent.appendChild(domElement);
}

//////////////////////////////////////////////////////////////////////////////////
//		add/remove object3D						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.prototype.setCameraControls	= function(control){
	if( this.hasCameraControls() )	this.removeCameraControls();
	this._cameraControls	= control;
	return this;	// for chained API
};

tQuery.World.prototype.removeCameraControls	= function(){
	if( this.hasCameraControls() === false )	return this;
	this._cameraControls	= undefined;
	return this;	// for chained API
};

tQuery.World.prototype.getCameraControls	= function(){
	return this._cameraControls;
};

tQuery.World.prototype.hasCameraControls	= function(){
	return this._cameraControls !== undefined ? true : false;
};

//////////////////////////////////////////////////////////////////////////////////
//		add/remove object3D						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add an object to the scene
 * 
 * @param {tQuery.Object3D} object3D to add to the scene (THREE.Object3D is accepted)
*/
tQuery.World.prototype.add	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._scene.add(object3d)			
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.add(object3d)		
	}else	console.assert(false, "invalid type");
	// for chained API
	return this;
}

/**
 * remove an object to the scene
 * 
 * @param {tQuery.Object3D} object3D to add to the scene (THREE.Object3D is accepted)
*/
tQuery.World.prototype.remove	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._scene.remove(object3d)
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.remove(object3d)
	}else	console.assert(false, "invalid type");
	// for chained API
	return this;
}

tQuery.World.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
	this._renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
	// for chained API
	return this;
}

/**
 * Start the loop
*/
tQuery.World.prototype.start	= function(){
	this._loop.start();
	return this;	// for chained API
}
/**
 * Stop the loop
*/
tQuery.World.prototype.stop	= function(){
	this._loop.stop();
	return this;	// for chained API
}

tQuery.World.prototype.loop	= function(){ return this._loop;	}
tQuery.World.prototype.renderer	= function(){ return this._renderer;	}
tQuery.World.prototype.camera	= function(){ return this._camera;	}
tQuery.World.prototype.scene	= function(){ return this._scene;	}
tQuery.World.prototype.get	= function(){ return this._scene;	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.prototype.render	= function()
{
	// update the cameraControl
	if( this.hasCameraControls() )	this._cameraControls.update();
	// actually render the scene
	this._renderer.render( this._scene, this._camera );
}
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle the rendering loop
 *
 * @class This class handle the rendering loop
 *
 * @param {THREE.World} world the world to display (optional)
*/
tQuery.Loop	= function(world)
{	
	// internally if world present do that
	this._world	= world;
	this._hooks	= [];
	this._lastTime	= null;

	// if world is available, hook it ON_RENDER
	this._world && this.hookOnRender(function(){
		this._world.render();
	}.bind(this));
};

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.Loop);

/**
 * destructor
*/
tQuery.Loop.prototype.destroy	= function()
{
	this.stop();
	if( tQuery.loop === this )	tQuery.loop = null;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * start looping
 * 
 * @returns {tQuery.Loop} chained API
*/
tQuery.Loop.prototype.start	= function()
{
	if( this._timerId )	this.stop();
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );
	// for chained API
	return this;
}

/**
 * stop looping
 * 
 * @returns {tQuery.Loop} chained API
*/
tQuery.Loop.prototype.stop	= function()
{
	cancelAnimationFrame(this._timerId);
	this._timerId	= null;
	// for chained API
	return this;
}

tQuery.Loop.prototype._onAnimationFrame	= function(time)
{
	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );

	// update time values
	var currentTime	= time/1000;
	if( !this._lastTime )	this._lastTime = currentTime - 1/60;
	var deltaTime	= currentTime - this._lastTime;
	this._lastTime	= currentTime;

	// run all the hooks - from lower priority to higher - in order of registration
	for(var priority = 0; priority <= this._hooks.length; priority++){
		if( this._hooks[priority] === undefined )	continue;
		var callbacks	= this._hooks[priority].slice(0)
		for(var i = 0; i < callbacks.length; i++){
			// TODO ? change that to {delta, current} ?
			// thus function(time){ time.current }
			callbacks[i](deltaTime, currentTime);
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		Handle the hooks						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Loop.prototype.PRE_RENDER		= 20;
tQuery.Loop.prototype.ON_RENDER		= 50;
tQuery.Loop.prototype.POST_RENDER	= 80;

/**
 * hook a callback at a given priority
 *
 * @param {Number} priority for this callback
 * @param {Function} callback the function which will be called function(time){}
 * @returns {tQuery.Loop} chained API
*/
tQuery.Loop.prototype.hook	= function(priority, callback)
{
	// handle parameters
	if( typeof priority === 'function' ){
		callback	= priority;
		priority	= this.PRE_RENDER;
	}

	this._hooks[priority]	= this._hooks[priority] || [];
	console.assert(this._hooks[priority].indexOf(callback) === -1)
	this._hooks[priority].push(callback);
	// for chained API
	return this;
}

/**
 * unhook a callback at a given priority
 *
 * @param {Number} priority for this callback
 * @param {Function} callback the function which will be called function(time){}
 * @returns {tQuery.Loop} chained API
*/
tQuery.Loop.prototype.unhook	= function(priority, callback)
{
	// handle parameters
	if( typeof priority === 'function' ){
		callback	= priority;
		priority	= this.PRE_RENDER;
	}

	var index	= this._hooks[priority].indexOf(callback);
	console.assert(index !== -1);
	this._hooks[priority].splice(index, 1);
	this._hooks[priority].length === 0 && delete this._hooks[priority]
	// for chained API
	return this;
}


// bunch of shortcut
// - TODO should it be in a plugin ?

tQuery.Loop.prototype.hookPreRender	= function(callback){ return this.hook(this.PRE_RENDER, callback);	};
tQuery.Loop.prototype.hookOnRender	= function(callback){ return this.hook(this.ON_RENDER, callback);	};
tQuery.Loop.prototype.hookPostRender	= function(callback){ return this.hook(this.POST_RENDER, callback);	};
tQuery.Loop.prototype.unhookPreRender	= function(callback){ return this.unhook(this.PRE_RENDER, callback);	};
tQuery.Loop.prototype.unhookOnRender	= function(callback){ return this.unhook(this.ON_RENDER, callback);	};
tQuery.Loop.prototype.unhookPostRender	= function(callback){ return this.unhook(this.POST_RENDER, callback);	};
/**
 * @fileOverview plugins for tQuery.core to help creation of object
*/


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Create tQuery.World
*/
tQuery.register('createWorld', function(){
	return new tQuery.World();
});

/**
 * Create tQuery.loop
 * 
 * @param {tQuery.World} world the world to display (optional)
 * @function
*/
tQuery.register('createLoop', function(world){
	return new tQuery.Loop(world);
});


tQuery.register('createDirectionalLight', function(){
	var tLight	= new THREE.DirectionalLight(0xFFFFFF * Math.random());
	tLight.position.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
	return tQuery(tLight);
});

tQuery.register('createAmbientLight', function(){
	var tLight	= new THREE.AmbientLight(0xFFFFFF);
	return tQuery(tLight);
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * contains the default material to use when create tQuery.Object3D
 * 
 * @fieldOf tQuery
 * @name defaultObject3DMaterial
*/
tQuery.register('defaultObject3DMaterial', new THREE.MeshNormalMaterial());

tQuery.Geometry.prototype.toMesh	= function(material){
	var meshes	= [];
	this.each(function(tGeometry){
		// handle paramters
		material	= material || tQuery.defaultObject3DMaterial;
		// create the THREE.Mesh
		var mesh	= new THREE.Mesh(tGeometry, material)
		// return it
		meshes.push(mesh);
	});
	return new tQuery.Mesh(meshes);
};


/**
 * Create a cube
 * 
 * @returns {tQuery.Object3D} a tQuery.Object3D containing it
*/
tQuery.register('createCube', function(){
	var ctor	= THREE.CubeGeometry;
	var dflGeometry	= [1, 1, 1];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createTorus', function(){
	var ctor	= THREE.TorusGeometry;
	var dflGeometry	= [0.5-0.15, 0.15];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createSphere', function(){
	var ctor	= THREE.SphereGeometry;
	var dflGeometry	= [0.5, 32, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createPlane', function(){
	var ctor	= THREE.PlaneGeometry;
	var dflGeometry	= [1, 1, 16, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createCylinder', function(){
	var ctor	= THREE.CylinderGeometry;
	var dflGeometry	= [0.5, 0.5, 1, 16, 4];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('_createMesh', function(ctor, dflGeometry, args)
{
	// convert args to array if it is instanceof Arguments
	// FIXME if( args instanceof Arguments )
	args	= Array.prototype.slice.call( args );
	
	// init the material
	var material	= tQuery.defaultObject3DMaterial;
	// if the last arguments is a material, use it
	if( args.length && args[args.length-1] instanceof THREE.Material ){
		material	= args.pop();
	}
	
	// ugly trick to get .apply() to work 
	var createFn	= function(ctor, a0, a1, a2, a3, a4, a5, a6, a7){
		console.assert(arguments.length <= 9);
		//console.log("createFn", arguments)
		return new ctor(a0,a1,a2,a3,a4,a5,a6,a7);
	}
	if( args.length === 0 )	args	= dflGeometry.slice();
	args.unshift(ctor);
	var geometry	= createFn.apply(this, args);

	// set the geometry.dynamic by default
	geometry.dynamic= true;
	// create the THREE.Mesh
	var mesh	= new THREE.Mesh(geometry, material)
	// return it
	return tQuery(mesh);
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.register('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	axis.scale.multiplyScalar(1/40);
	return tQuery(axis);
});
/**
 * Handle ambient light
 *
 * @class include THREE.AmbientLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.AmbientLight} element an instance or array of instance
*/
tQuery.AmbientLight	= function(elements)
{
	// call parent ctor
	tQuery.AmbientLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.AmbientLight); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.AmbientLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.AmbientLight);
/**
 * Handle directional light
 *
 * @class include THREE.DirectionalLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.DirectionalLight} element an instance or array of instance
*/
tQuery.DirectionalLight	= function(elements)
{
	// call parent ctor
	tQuery.DirectionalLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.DirectionalLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.DirectionalLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.DirectionalLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.DirectionalLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber
});


/**
 * Handle directional light
 *
 * @class include THREE.PointLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.PointLight} element an instance or array of instance
*/
tQuery.PointLight	= function(elements)
{
	// call parent ctor
	tQuery.PointLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.PointLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.PointLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.PointLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.PointLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber
});


﻿﻿/**
* @fileOverview Plugins for tQuery and Stats.js
*/

tQuery.TrackballControl = function (elements) {

    // call parent ctor
    tQuery.TrackballControl.parent.constructor.call(this, elements)

    // sanity check - all items MUST be THREE.TrackballControls
    this._lists.forEach(function (item) { console.assert(item instanceof THREE.TrackballControls); });
}

/**
* inherit from tQuery.Control - implements update
*/
tQuery.inherit(tQuery.TrackballControl, tQuery.Control);

/**
* Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.TrackballControl);

/**
* define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.TrackballControl, {
    
    rotateSpeed             : tQuery.convert.toNumber,
    zoomSpeed               : tQuery.convert.toNumber,
    minDistance             : tQuery.convert.toNumber,
    maxDistance             : tQuery.convert.toNumber,
    noZoom                  : tQuery.convert.toBool,
    noPan                   : tQuery.convert.toBool,
    staticMoving            : tQuery.convert.toBool,
    dynamicDampingFactor    : tQuery.convert.toNumber,
    keys                    : tQuery.convert.identity

});

//Put these here for now as they relate to the above, don't want the functions registered if the above code isn't included in the build.

//Set the target of the trackball control, as its not an property that is written to, but a function call, then can't use mixin attributes (is this correct?)
tQuery.TrackballControl.register('target', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "TrackballControl.target parameter error");

	// do the operation on each node
	this.each(function(trackballControl){
		trackballControl.target.copy(vector3);
	})

	// return this, to get chained API	
	return this;
});

//Create a control with a no camera, when this control is set to a world it will wrap that worlds current camera.
tQuery.register('createTrackballControl', function (settings) {
    
    var defaultSettings = { 
        rotateSpeed : 1.0,
        zoomSpeed : 1.2,
        minDistance : 40,
        maxDistance : 14000,
        noZoom : false,
        noPan : false,
        staticMoving : false,
        dynamicDampingFactor : 0.15,
        keys : [65, 83, 68]
    };

    //Apply default settings
    settings = tQuery.extend(settings, defaultSettings);

    //Create new controls, wrapping no camera to start off with
    var controls = new THREE.TrackballControls(null);

    controls.target.set(0, 0, 0)
    controls.rotateSpeed = settings.rotateSpeed;
    controls.zoomSpeed = settings.zoomSpeed;
    controls.minDistance = settings.minDistance;
    controls.maxDistance = settings.maxDistance;
    controls.noZoom = settings.noZoom;
    controls.noPan = settings.noPan;
    controls.staticMoving = settings.staticMoving;
    controls.dynamicDampingFactor = settings.dynamicDampingFactor;
    controls.keys = settings.keys;

    //Return the controls
    return tQuery(controls);
});/**
 * @fileOverview Plugins for tQuery.Geometry: tool box to play with geometry
*/

(function(){	// TODO why is there a closure here ?

//////////////////////////////////////////////////////////////////////////////////
//		Size functions							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.register('computeAll', function(){
	this.each(function(tGeometry){
		tGeometry.computeBoundingBox();
		tGeometry.computeCentroids();
		tGeometry.computeFaceNormals();
		tGeometry.computeVertexNormals();
		//tGeometry.computeTangents();
	});

	// return this, to get chained API	
	return this;
});

/**
 * zoom a geometry
 *
 * @name zoom
 * @methodOf tQuery.Geometry
*/
tQuery.Geometry.register('scaleBy', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 1 ){
		vector3	= new THREE.Vector3(vector3, vector3, vector3);
	}else if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "Geometry.vector3 parameter error");

	// change all geometry.vertices
	this.each(function(geometry){
		for(var i = 0; i < geometry.vertices.length; i++) {
			var vertex	= geometry.vertices[i];
			vertex.position.multiplySelf(vector3); 
		}
		// mark the vertices as dirty
		geometry.__dirtyVertices = true;
		geometry.computeBoundingBox();
	})

	// return this, to get chained API	
	return this;
});

tQuery.Geometry.register('size', function(){
	// only on zero-or-one element
	console.assert(this.length <= 1)
	// if no element, return undefined
	if( this.length === 0 )	return undefined

	// else measure the size of the element
	var geometry	= this.get(0);
	// compute middle
	var size= new THREE.Vector3()
	size.x	= geometry.boundingBox.max.x - geometry.boundingBox.min.x;
	size.y	= geometry.boundingBox.max.y - geometry.boundingBox.min.y;
	size.z	= geometry.boundingBox.max.z - geometry.boundingBox.min.z;

	// return the just computed middle
	return size;	
});

/**
*/
tQuery.Geometry.register('normalize', function(){
	// change all geometry.vertices
	this.each(function(geometry){
		var node	= tQuery(geometry);
		var size	= node.size();
		if( size.x >= size.y && size.x >= size.z ){
			node.zoom(1/size.x);
		}else if( size.y >= size.x && size.y >= size.z ){
			node.zoom(1/size.y);
		}else{
			node.zoom(1/size.z);
		}
	});
	// return this, to get chained API	
	return this;
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


tQuery.Geometry.register('middlePoint', function(){
	// only on zero-or-one element
	console.assert(this.length <= 1)
	// if no element, return undegined
	if( this.length === 0 )	return undefined
	// else measure the size of the element
	var geometry	= this.get(0);
	// compute middle
	var middle	= new THREE.Vector3()
	middle.x	= ( geometry.boundingBox.max.x + geometry.boundingBox.min.x ) / 2;
	middle.y	= ( geometry.boundingBox.max.y + geometry.boundingBox.min.y ) / 2;
	middle.z	= ( geometry.boundingBox.max.z + geometry.boundingBox.min.z ) / 2;

	// return the just computed middle
	return middle;
});

//////////////////////////////////////////////////////////////////////////////////
//		move functions							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.register('translate', function(delta){
	// handle parameters
	if( typeof delta === "number" && arguments.length === 3 ){
		delta	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(delta instanceof THREE.Vector3, "Geometry.translate parameter error");

	// change all geometry.vertices
	this.each(function(geometry){
		// change all geometry.vertices
		for(var i = 0; i < geometry.vertices.length; i++) {
			var vertex	= geometry.vertices[i];
			vertex.position.addSelf(delta); 
		}
		// mark the vertices as dirty
		geometry.__dirtyVertices = true;
		geometry.computeBoundingBox();
	})

	// return this, to get chained API	
	return this;
});

tQuery.Geometry.register('rotate', function(angles, order){
	// handle parameters
	if( typeof angles === "number" && arguments.length === 3 ){
		angles	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(angles instanceof THREE.Vector3, "Geometry.rotate parameter error");

	// set default rotation order if needed
	order	= order	|| 'XYZ';
	// compute transformation matrix
	var matrix	= new THREE.Matrix4();
	matrix.setRotationFromEuler(angles, order);

	// change all geometry.vertices
	this.each(function(geometry){
		// apply the matrix
		geometry.applyMatrix( matrix );
	
		// mark the vertices as dirty
		geometry.__dirtyVertices = true;
		geometry.computeBoundingBox();
	});

	// return this, to get chained API	
	return this;
});

/**
*/
tQuery.Geometry.register('center', function(noX, noY, noZ){
	// change all geometry.vertices
	this.each(function(tGeometry){
		var geometry	= tQuery(tGeometry);
		// compute delta
		var delta 	= geometry.middlePoint().negate();
		if( noX )	delta.x	= 0;
		if( noY )	delta.y	= 0;
		if( noZ )	delta.z	= 0;

		return geometry.translate(delta)
	});
	// return this, to get chained API	
	return this;
});

// some shortcuts
tQuery.Geometry.register('translateX'	, function(delta){ return this.translate(delta, 0, 0);	});
tQuery.Geometry.register('translateY'	, function(delta){ return this.translate(0, delta, 0);	});
tQuery.Geometry.register('translateZ'	, function(delta){ return this.translate(0, 0, delta);	});
tQuery.Geometry.register('rotateX'	, function(angle){ return this.rotate(angle, 0, 0);	});
tQuery.Geometry.register('rotateY'	, function(angle){ return this.rotate(0, angle, 0);	});
tQuery.Geometry.register('rotateZ'	, function(angle){ return this.rotate(0, 0, angle);	});
tQuery.Geometry.register('scaleXBy'	, function(ratio){ return this.scaleBy(ratio, 1, 1);	});
tQuery.Geometry.register('scaleYBy'	, function(ratio){ return this.scaleBy(1, ratio, 1);	});
tQuery.Geometry.register('scaleZBy'	, function(ratio){ return this.scaleBy(1, 1, ratio);	});

// backward compatibility
tQuery.Geometry.register('zoom'		, function(value){return this.scaleBy(value);		});
tQuery.Geometry.register('zoomX'	, function(ratio){ return this.zoom(ratio, 1, 1);	});
tQuery.Geometry.register('zoomY'	, function(ratio){ return this.zoom(1, ratio, 1);	});
tQuery.Geometry.register('zoomZ'	, function(ratio){ return this.zoom(1, 1, ratio);	});


})();	// closure function end
/**
 * @fileOverview Plugins for tQuery.Object3D to play with .position/.rotation/.scale
*/

(function(){	// TODO why is there a closure here ?

//////////////////////////////////////////////////////////////////////////////////
//		set function							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.register('scale', function(scale){
	// handle parameters
	if( typeof scale === "number" && arguments.length === 1 ){
		scale	= new THREE.Vector3(scale, scale, scale);
	}else if( typeof scale === "number" && arguments.length === 3 ){
		scale	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(scale instanceof THREE.Vector3, "Geometry.scale parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.copy(scale);
	});

	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('position', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.position parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.position.copy(vector3);
	})

	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('rotation', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.rotation parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.copy(vector3);
	})

	// return this, to get chained API	
	return this;
});

//////////////////////////////////////////////////////////////////////////////////
//		add function							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.register('translate', function(delta){
	// handle parameters
	if( typeof delta === "number" && arguments.length === 3 ){
		delta	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(delta instanceof THREE.Vector3, "Object3D.translate parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.position.addSelf(delta);
	})

	// return this, to get chained API	
	return this;
});


tQuery.Object3D.register('rotate', function(angles){
	// handle parameters
	if( typeof angles === "number" && arguments.length === 3 ){
		angles	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(angles instanceof THREE.Vector3, "Object3D.rotate parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.addSelf(angles);
	})

	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('scaleBy', function(ratio){
	// handle parameters
	if( typeof ratio === "number" && arguments.length === 1 ){
		ratio	= new THREE.Vector3(ratio, ratio, ratio);
	}else if( typeof ratio === "number" && arguments.length === 3 ){
		ratio	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(ratio instanceof THREE.Vector3, "Object3D.rotate parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.multiplySelf(ratio);
	})

	// return this, to get chained API	
	return this;
});


// some shortcuts
tQuery.Object3D.register('translateX'	, function(delta){ return this.translate(delta, 0, 0);	});
tQuery.Object3D.register('translateY'	, function(delta){ return this.translate(0, delta, 0);	});
tQuery.Object3D.register('translateZ'	, function(delta){ return this.translate(0, 0, delta);	});
tQuery.Object3D.register('rotateX'	, function(angle){ return this.rotate(angle, 0, 0);	});
tQuery.Object3D.register('rotateY'	, function(angle){ return this.rotate(0, angle, 0);	});
tQuery.Object3D.register('rotateZ'	, function(angle){ return this.rotate(0, 0, angle);	});
tQuery.Object3D.register('scaleXBy'	, function(ratio){ return this.scaleBy(ratio, 1, 1);	});
tQuery.Object3D.register('scaleYBy'	, function(ratio){ return this.scaleBy(1, ratio, 1);	});
tQuery.Object3D.register('scaleZBy'	, function(ratio){ return this.scaleBy(1, 1, ratio);	});

// backward compatibility
tQuery.Object3D.register('zoom'		, function(value){ return this.scaleBy(value);		});
tQuery.Object3D.register('zoomX'	, function(ratio){ return this.zoom(ratio, 1, 1);	});
tQuery.Object3D.register('zoomY'	, function(ratio){ return this.zoom(1, ratio, 1);	});
tQuery.Object3D.register('zoomZ'	, function(ratio){ return this.zoom(1, 1, ratio);	});

})();	// closure function end
// backward compatibility only
tQuery.World.register('fullpage', function(){
	console.log("world.fullpage() is obsolete. use world.boilerplate() instead.");
	return this.boilerplate();
});

tQuery.World.register('boilerplate', function(opts){
	// put renderer fullpage
	var domElement	= document.body;
	domElement.style.margin		= "0";
	domElement.style.padding	= "0";
	domElement.style.overflow	= 'hidden';
	this.appendTo(domElement);

	// add the boilerplate
	this.addBoilerplate(opts);
	
	// for chained API
	return this;
});

tQuery.World.register('addBoilerplate', function(opts){
	var _this	= this;
	// sanity check - no boilerplate is already installed
	console.assert( this.hasBoilerplate() !== true );
	// handle parameters	
	opts	= tQuery.extend(opts, {
		stats		: true,
		cameraControls	: true,
		windowResize	: true,
		screenshot	: true,
		fullscreen	: true
	});
	// get the context
	var ctx	= {};

	// create the context
	tQuery.data(this, '_boilerplateCtx', ctx);

	// add Stats.js - https://github.com/mrdoob/stats.js
	if( opts.stats ){
		ctx.stats	= new Stats();
		ctx.stats.domElement.style.position	= 'absolute';
		ctx.stats.domElement.style.bottom	= '0px';
		document.body.appendChild( ctx.stats.domElement );
		ctx.loopStats	= function(){
			ctx.stats.update();
		};
		this.loop().hook(ctx.loopStats);		
	}

	// get some variables
	var camera	= this.camera();
	var renderer	= this.renderer();

	// create a camera contol
	if( opts.cameraControls ){
		ctx.cameraControls	= new THREEx.DragPanControls(camera);
		this.setCameraControls(ctx.cameraControls);		
	}

	// transparently support window resize
	if( opts.windowResize ){
		ctx.windowResize	= THREEx.WindowResize.bind(renderer, camera);		
	}
	// allow 'p' to make screenshot
	if( opts.screenshot ){		
		ctx.screenshot		= THREEx.Screenshot.bindKey(renderer);
	}
	// allow 'f' to go fullscreen where this feature is supported
	if( opts.fullscreen && THREEx.FullScreen.available() ){
		ctx.fullscreen	= THREEx.FullScreen.bindKey();		
	}

	// bind 'destroy' event on tQuery.world
	ctx._$onDestroy	= this.bind('destroy', function(){
		if( this.hasBoilerplate() === false )	return;
		this.removeBoilerplate();	
	});
	
	// for chained API
	return this;
});

tQuery.World.register('hasBoilerplate', function(){
	// get the context
	var ctx	= tQuery.data(this, "_boilerplateCtx")
	// return true if ctx if defined, false otherwise
	return ctx === undefined ? false : true;
});

tQuery.World.register('removeBoilerplate', function(){
	// get context
	var ctx	= tQuery.data(this, '_boilerplateCtx');
	// if not present, return now
	if( ctx === undefined )	return	this;
	// remove the context from this
	tQuery.removeData(this, '_boilerplateCtx');

	// unbind 'destroy' for tQuery.World
	this.unbind('destroy', this._$onDestroy);

	// remove stats.js
	ctx.stats		&& document.body.removeChild(ctx.stats.domElement );
	ctx.stats		&& this.loop().unhook(ctx.loopStats);
	// remove camera
	ctx.cameraControls	&& this.removeCameraControls()
	// stop windowResize
	ctx.windowResize	&& ctx.windowResize.stop();
	// unbind screenshot
	ctx.screenshot		&& ctx.screenshot.unbind();
	// unbind fullscreen
	ctx.fullscreen		&& ctx.fullscreen.unbind();
});// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//    
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}

THREEx.WindowResize.bind	= function(renderer, camera){
	return THREEx.WindowResize(renderer, camera);
}
/** @namespace */
var THREEx	= THREEx 		|| {};

// TODO http://29a.ch/2011/9/11/uploading-from-html5-canvas-to-imgur-data-uri
// able to upload your screenshot without running servers

// forced closure
(function(){

	/**
	 * Take a screenshot of a renderer
	 * - require WebGLRenderer to have "preserveDrawingBuffer: true" to be set
	 * - TODO is it possible to check if this variable is set ? if so check it
	 *   and make advice in the console.log
	 *   - maybe with direct access to the gl context...
	 * 
	 * @param {Object} renderer to use
	 * @param {String} mimetype of the output image. default to "image/png"
	 * @param {String} dataUrl of the image
	*/
	var toDataURL	= function(renderer, mimetype)
	{
		mimetype	= mimetype	|| "image/png";
		var dataUrl	= renderer.domElement.toDataURL(mimetype);
		return dataUrl;
	}

	/**
	 * resize an image to another resolution while preserving aspect
	 *
	 * @param {String} srcUrl the url of the image to resize
	 * @param {Number} dstWidth the destination width of the image
	 * @param {Number} dstHeight the destination height of the image
	 * @param {Number} callback the callback to notify once completed with callback(newImageUrl)
	*/
	var _aspectResize	= function(srcUrl, dstW, dstH, callback){
		// to compute the width/height while keeping aspect
		var cpuScaleAspect	= function(maxW, maxH, curW, curH){
			var ratio	= curH / curW;
			if( curW >= maxW && ratio <= 1 ){ 
				curW	= maxW;
				curH	= maxW * ratio;
			}else if(curH >= maxH){
				curH	= maxH;
				curW	= maxH / ratio;
			}
			return { width: curW, height: curH };
		}
		// callback once the image is loaded
		var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
		var onLoad	= __bind(function(){
			// init the canvas
			var canvas	= document.createElement('canvas');
			canvas.width	= dstW;	canvas.height	= dstH;
			var ctx		= canvas.getContext('2d');

			// TODO is this needed
			ctx.fillStyle	= "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// scale the image while preserving the aspect
			var scaled	= cpuScaleAspect(canvas.width, canvas.height, image.width, image.height);

			// actually draw the image on canvas
			var offsetX	= (canvas.width  - scaled.width )/2;
			var offsetY	= (canvas.height - scaled.height)/2;
			ctx.drawImage(image, offsetX, offsetY, scaled.width, scaled.height);

			// dump the canvas to an URL		
			var mimetype	= "image/png";
			var newDataUrl	= canvas.toDataURL(mimetype);
			// notify the url to the caller
			callback && callback(newDataUrl)
		}, this);

		// Create new Image object
		var image 	= new Image();
		image.onload	= onLoad;
		image.src	= srcUrl;
	}
	

	// Super cooked function: THREEx.Screenshot.bindKey(renderer)
	// and you are done to get screenshot on your demo

	/**
	 * Bind a key to renderer screenshot
	*/
	var bindKey	= function(renderer, opts){
		// handle parameters
		opts		= opts		|| {};
		var charCode	= opts.charCode	|| 'p'.charCodeAt(0);
		var width	= opts.width;
		var height	= opts.height;
		var callback	= opts.callback	|| function(url){
			window.open(url, "name-"+Math.random());
		};

		// callback to handle keypress
		var __bind	= function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
		var onKeyPress	= __bind(function(event){
			// return now if the KeyPress isnt for the proper charCode
			if( event.which !== charCode )	return;
			// get the renderer output
			var dataUrl	= this.toDataURL(renderer);

			if( width === undefined && height === undefined ){
				callback( dataUrl )
			}else{
				// resize it and notify the callback
				// * resize == async so if callback is a window open, it triggers the pop blocker
				_aspectResize(dataUrl, width, height, callback);				
			}
		}, this);

		// listen to keypress
		// NOTE: for firefox it seems mandatory to listen to document directly
		document.addEventListener('keypress', onKeyPress, false);

		return {
			unbind	: function(){
				document.removeEventListener('keypress', onKeyPress, false);
			}
		};
	}

	// export it	
	THREEx.Screenshot	= {
		toDataURL	: toDataURL,
		bindKey		: bindKey
	};
})();
// This THREEx helper makes it easy to handle the fullscreen API
// * it hides the prefix for each browser
// * it hides the little discrepencies of the various vendor API
// * at the time of this writing (nov 2011) it is available in 
//   [firefox nightly](http://blog.pearce.org.nz/2011/11/firefoxs-html-full-screen-api-enabled.html),
//   [webkit nightly](http://peter.sh/2011/01/javascript-full-screen-api-navigation-timing-and-repeating-css-gradients/) and
//   [chrome stable](http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API).

// 
// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};
THREEx.FullScreen	= THREEx.FullScreen	|| {};

/**
 * test if it is possible to have fullscreen
 * 
 * @returns {Boolean} true if fullscreen API is available, false otherwise
*/
THREEx.FullScreen.available	= function()
{
	return this._hasWebkitFullScreen || this._hasMozFullScreen;
}

/**
 * test if fullscreen is currently activated
 * 
 * @returns {Boolean} true if fullscreen is currently activated, false otherwise
*/
THREEx.FullScreen.activated	= function()
{
	if( this._hasWebkitFullScreen ){
		return document.webkitIsFullScreen;
	}else if( this._hasMozFullScreen ){
		return document.mozFullScreen;
	}else{
		console.assert(false);
	}
}

/**
 * Request fullscreen on a given element
 * @param {DomElement} element to make fullscreen. optional. default to document.body
*/
THREEx.FullScreen.request	= function(element)
{
	element	= element	|| document.body;
	if( this._hasWebkitFullScreen ){
		element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	}else if( this._hasMozFullScreen ){
		element.mozRequestFullScreen();
	}else{
		console.assert(false);
	}
}

/**
 * Cancel fullscreen
*/
THREEx.FullScreen.cancel	= function()
{
	if( this._hasWebkitFullScreen ){
		document.webkitCancelFullScreen();
	}else if( this._hasMozFullScreen ){
		document.mozCancelFullScreen();
	}else{
		console.assert(false);
	}
}


// internal functions to know which fullscreen API implementation is available
THREEx.FullScreen._hasWebkitFullScreen	= 'webkitCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasMozFullScreen	= 'mozCancelFullScreen' in document	? true : false;	

/**
 * Bind a key to renderer screenshot
*/
THREEx.FullScreen.bindKey	= function(opts){
	opts		= opts		|| {};
	var charCode	= opts.charCode	|| 'f'.charCodeAt(0);
	var dblclick	= opts.dblclick !== undefined ? opts.dblclick : false;
	var element	= opts.element

	var toggle	= function(){
		if( THREEx.FullScreen.activated() ){
			THREEx.FullScreen.cancel();
		}else{
			THREEx.FullScreen.request(element);
		}		
	}

	// callback to handle keypress
	var __bind	= function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	var onKeyPress	= __bind(function(event){
		// return now if the KeyPress isnt for the proper charCode
		if( event.which !== charCode )	return;
		// toggle fullscreen
		toggle();
	}, this);

	// listen to keypress
	// NOTE: for firefox it seems mandatory to listen to document directly
	document.addEventListener('keypress', onKeyPress, false);
	// listen to dblclick
	dblclick && document.addEventListener('dblclick', toggle, false);

	return {
		unbind	: function(){
			document.removeEventListener('keypress', onKeyPress, false);
			dblclick && document.removeEventListener('dblclick', toggle, false);
		}
	};
}
/** @namespace */
var THREEx	= THREEx 		|| {};

THREEx.DragPanControls	= function(object, domElement)
{
	this._object	= object;
	this._domElement= domElement || document;

	// parameters that you can change after initialisation
	this.target	= new THREE.Vector3(0, 0, 0);
	this.speedX	= 0.03;
	this.speedY	= 0.03;
	this.rangeX	= -40;
	this.rangeY	= +40;

	// private variables
	this._mouseX	= 0;
	this._mouseY	= 0;

	var _this	= this;
	this._$onMouseMove	= function(){ _this._onMouseMove.apply(_this, arguments); };
	this._$onTouchStart	= function(){ _this._onTouchStart.apply(_this, arguments); };
	this._$onTouchMove	= function(){ _this._onTouchMove.apply(_this, arguments); };

	this._domElement.addEventListener( 'mousemove', this._$onMouseMove, false );
	this._domElement.addEventListener( 'touchstart', this._$onTouchStart,false );
	this._domElement.addEventListener( 'touchmove', this._$onTouchMove, false );
}

THREEx.DragPanControls.prototype.destroy	= function()
{
	this._domElement.removeEventListener( 'mousemove', this._$onMouseMove, false );
	this._domElement.removeEventListener( 'touchstart', this._$onTouchStart,false );
	this._domElement.removeEventListener( 'touchmove', this._$onTouchMove, false );
}

THREEx.DragPanControls.prototype.update	= function(event)
{
	this._object.position.x += ( this._mouseX * this.rangeX - this._object.position.x ) * this.speedX;
	this._object.position.y += ( this._mouseY * this.rangeY - this._object.position.y ) * this.speedY;
	this._object.lookAt( this.target );
}

THREEx.DragPanControls.prototype._onMouseMove	= function(event)
{
	this._mouseX	= ( event.clientX / window.innerWidth ) - 0.5;
	this._mouseY	= ( event.clientY / window.innerHeight) - 0.5;
}

THREEx.DragPanControls.prototype._onTouchStart	= function(event)
{
	if( event.touches.length != 1 )	return;

	// no preventDefault to get click event on ios

	this._mouseX	= ( event.touches[ 0 ].pageX / window.innerWidth ) - 0.5;
	this._mouseY	= ( event.touches[ 0 ].pageY / window.innerHeight) - 0.5;
}

THREEx.DragPanControls.prototype._onTouchMove	= function(event)
{
	if( event.touches.length != 1 )	return;

	event.preventDefault();

	this._mouseX	= ( event.touches[ 0 ].pageX / window.innerWidth ) - 0.5;
	this._mouseY	= ( event.touches[ 0 ].pageY / window.innerHeight) - 0.5;
}

// stats.js r8 - http://github.com/mrdoob/stats.js
var Stats=function(){var h,a,n=0,o=0,i=Date.now(),u=i,p=i,l=0,q=1E3,r=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,s=1E3,t=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();n=(n+1)%2;n==0?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
"left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
"30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);f.children.length<74;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
"0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);g.children.length<74;)a=document.createElement("span"),
a.style.width="1px",a.style.height=Math.random()*30+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{domElement:h,update:function(){i=Date.now();m=i-u;s=Math.min(s,m);t=Math.max(t,m);k.textContent=m+" MS ("+s+"-"+t+")";var a=Math.min(30,30-m/200*30);g.appendChild(g.firstChild).style.height=a+"px";u=i;o++;if(i>p+1E3)l=Math.round(o*1E3/(i-p)),q=Math.min(q,l),r=Math.max(r,l),j.textContent=l+" FPS ("+q+"-"+r+")",a=Math.min(30,30-l/
100*30),f.appendChild(f.firstChild).style.height=a+"px",p=i,o=0}}};

