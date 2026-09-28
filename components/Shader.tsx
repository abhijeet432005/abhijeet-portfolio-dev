"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const frag = `
uniform float t,dark; uniform vec2 m,res; varying vec2 v;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p*=2.;a*=.5;}return s;}
void main(){
 vec2 asp=vec2(res.x/res.y,1.); vec2 p=v*asp, mm=m*asp;
 float d=distance(p,mm);
 vec2 q=p*1.4+(mm-p)*.25*exp(-d*2.);
 float f=fbm(q+fbm(q+t*.07)+t*.04);
 f+=.35*exp(-d*3.5);
 vec3 bg=mix(vec3(.96,.95,.93),vec3(.03,.03,.04),dark);
 vec3 a=mix(vec3(1.,.42,.2),vec3(.42,.28,1.),dark);
 vec3 c=mix(bg,a,smoothstep(.5,1.,f)*mix(.5,.6,dark));
 c+=(h(v*res+t)-.5)*.035;
 gl_FragColor=vec4(c,1.);
}`;

export default function Shader() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const r = new THREE.WebGLRenderer({ antialias: false });
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    r.setSize(innerWidth, innerHeight);
    el.appendChild(r.domElement);
    const u = { t: { value: 0 }, dark: { value: 1 }, m: { value: new THREE.Vector2(0, 0) }, res: { value: new THREE.Vector2(innerWidth, innerHeight) } };
    const mat = new THREE.ShaderMaterial({ uniforms: u, fragmentShader: frag, vertexShader: "varying vec2 v;void main(){v=position.xy;gl_Position=vec4(position.xy,0.,1.);}" });
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const target = new THREE.Vector2(0, 0);
    const move = (e: PointerEvent) => target.set((e.clientX / innerWidth) * 2 - 1, 1 - (e.clientY / innerHeight) * 2);
    const resize = () => { r.setSize(innerWidth, innerHeight); u.res.value.set(innerWidth, innerHeight); };
    addEventListener("pointermove", move); addEventListener("resize", resize);
    let raf = 0;
    const loop = (ms: number) => {
      u.t.value = ms / 1000;
      u.m.value.lerp(target, 0.06);
      const dk = document.documentElement.dataset.theme === "dark" ? 1 : 0;
      u.dark.value += (dk - u.dark.value) * 0.1;
      r.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); removeEventListener("resize", resize); r.dispose(); mat.dispose(); el.innerHTML = ""; };
  }, []);
  return <div ref={ref} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />;
}
