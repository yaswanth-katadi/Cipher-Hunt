import Ferrofluid from "./Ferrofluid";

const FerrofluidBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Ferrofluid
        colors={["#720505", "#e70d0d", "#990000"]}
        speed={0.2}
        scale={1.4}
        turbulence={1.65}
        fluidity={0.09}
        rimWidth={0.2}
        sharpness={2.5}
        shimmer={1.5}
        glow={2}
        flowDirection="down"
        opacity={0.32}
        mouseInteraction={false}
      />
    </div>
  );
};

export default FerrofluidBackground;