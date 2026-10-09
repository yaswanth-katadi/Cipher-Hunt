import Ferrofluid from "./Ferrofluid";

export default function FerrofluidBackground() {
return (
<div
aria-hidden="true"
className="absolute inset-0 overflow-hidden pointer-events-none"
>
<Ferrofluid
colors={["#720505", "#e70d0d", "#990000"]}
speed={0.2}
scale={0.9}
turbulence={1.15}
fluidity={0.06}
rimWidth={0.2}
sharpness={2}
shimmer={1.25}
glow={1.8}
flowDirection="down"
opacity={0.3}
mouseInteraction={false}
mouseStrength={1}
mouseRadius={0.35}
/>
</div>
);
}