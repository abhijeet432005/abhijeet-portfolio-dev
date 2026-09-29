"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_RIPPLES = 6;

const frag = `
uniform float t,dark; uniform vec2 m,res; varying vec2 v;
uniform float rippleT[${MAX_RIPPLES}];
uniform vec2 rippleP[${MAX_RIPPLES}];

float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p*=2.;a*=.5;}return s;}

void main(){
 vec2 asp=vec2(res.x/res.y,1.); vec2 p=v*asp, mm=m*asp;
 float d=distance(p,mm);

 // water ripples from clicks: each ring pushes the sample point outward/inward as it expands
 vec2 rippleOffset = vec2(0.0);
 float rippleGlow = 0.0;
 for(int i=0;i<${MAX_RIPPLES};i++){
   float age = t - rippleT[i];
   if(rippleT[i] > 0.0 && age >= 0.0 && age < 2.4){
     vec2 rp = rippleP[i];
     float rd = distance(p, rp);
     float speed = 0.9;
     float radius = age*speed;
     float ring = sin((rd-radius)*22.0) * exp(-abs(rd-radius)*3.5) * exp(-age*1.1);
     vec2 dir = (p - rp) / max(rd,0.0001);
     rippleOffset += dir * ring * 0.06;
     rippleGlow += max(ring,0.0) * exp(-rd*1.2);
   }
 }

 vec2 q=p*1.4+(mm-p)*.25*exp(-d*2.) + rippleOffset;
 float f=fbm(q+fbm(q+t*.07)+t*.04);
 f+=.6*exp(-d*2.6);
 f+=rippleGlow*0.9;

 vec3 bg=mix(vec3(.96,.95,.93),vec3(.03,.03,.04),dark);
 vec3 a=mix(vec3(1.,.42,.2),vec3(.42,.28,1.),dark);
 vec3 c=mix(bg,a,smoothstep(.5,1.,f)*mix(.6,.9,dark));

 // subtle highlight along ripple crests, like light catching on water
 vec3 crest=mix(vec3(1.,.95,.85),vec3(.75,.85,1.),dark);
 c += crest * rippleGlow * 0.35;

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

    const rippleT = new Float32Array(MAX_RIPPLES).fill(-1);
    const rippleP = Array.from(
      { length: MAX_RIPPLES },
      () => new THREE.Vector2(),
    );

    const u = {
      t: { value: 0 },
      dark: { value: 1 },
      m: { value: new THREE.Vector2(0, 0) },
      res: { value: new THREE.Vector2(innerWidth, innerHeight) },
      rippleT: { value: rippleT },
      rippleP: { value: rippleP },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: u,
      fragmentShader: frag,
      vertexShader:
        "varying vec2 v;void main(){v=position.xy;gl_Position=vec4(position.xy,0.,1.);}",
    });
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const target = new THREE.Vector2(0, 0);
    const move = (e: PointerEvent) =>
      target.set(
        (e.clientX / innerWidth) * 2 - 1,
        1 - (e.clientY / innerHeight) * 2,
      );

    let slot = 0;
    const addRipple = (x: number, y: number) => {
      const asp = innerWidth / innerHeight;
      const px = ((x / innerWidth) * 2 - 1) * asp;
      const py = 1 - (y / innerHeight) * 2;
      rippleP[slot].set(px, py);
      rippleT[slot] = u.t.value;
      slot = (slot + 1) % MAX_RIPPLES;
    };

    // mouse/pen: ripple right on press, same as before
    const downMouse = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if ((e.target as HTMLElement)?.closest?.("[data-no-ripple]")) return;
      addRipple(e.clientX, e.clientY);
    };

    // touch: only ripple on a genuine tap — ignore scroll/drag gestures
    let touchStart: { x: number; y: number; t: number } | null = null;
    const downTouch = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      touchStart = { x: e.clientX, y: e.clientY, t: performance.now() };
    };
    const upTouch = (e: PointerEvent) => {
      if (e.pointerType !== "touch" || !touchStart) return;
      if ((e.target as HTMLElement)?.closest?.("[data-no-ripple]")) {
        touchStart = null;
        return;
      }
      const dist = Math.hypot(
        e.clientX - touchStart.x,
        e.clientY - touchStart.y,
      );
      const dt = performance.now() - touchStart.t;
      if (dist < 12 && dt < 400) addRipple(e.clientX, e.clientY); // moved little, released quick = tap
      touchStart = null;
    };

    const resize = () => {
      r.setSize(innerWidth, innerHeight);
      u.res.value.set(innerWidth, innerHeight);
    };
    addEventListener("pointermove", move);
    addEventListener("pointerdown", downMouse);
    addEventListener("pointerdown", downTouch);
    addEventListener("pointerup", upTouch);
    addEventListener("resize", resize);

    let raf = 0;
    const loop = (ms: number) => {
      u.t.value = ms / 1000;
      // slower, smoother pointer follow
      u.m.value.lerp(target, 0.045);
      const dk = document.documentElement.dataset.theme === "dark" ? 1 : 0;
      u.dark.value += (dk - u.dark.value) * 0.06;
      r.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", downMouse);
      removeEventListener("pointerdown", downTouch);
      removeEventListener("pointerup", upTouch);
      removeEventListener("resize", resize);
      r.dispose();
      mat.dispose();
      el.innerHTML = "";
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
