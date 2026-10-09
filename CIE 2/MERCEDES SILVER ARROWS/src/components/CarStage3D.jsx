import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_MAP, getModelKey, PAINT_MATERIAL_PARAMS, PAINT_TYPES } from '../data/modelMap';

// Safe Draco decoder initialization
try {
  useGLTF.setDecoderPath('/draco/');
} catch (e) {
  // Ignored if not applicable
}

/**
 * Camera controller that smoothly animates camera position & lookAt target
 * when the view prop changes.
 */
function CameraController({ view, isUserInteracting, setIsUserInteracting }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Target camera positions and focus points per view angle
  const VIEW_TARGETS = useMemo(() => ({
    'front-34': { pos: new THREE.Vector3(3.6, 1.4, 3.8), lookAt: new THREE.Vector3(0, 0.4, 0) },
    'side': { pos: new THREE.Vector3(4.8, 1.1, 0.05), lookAt: new THREE.Vector3(0, 0.4, 0) },
    'rear-34': { pos: new THREE.Vector3(-3.6, 1.3, -3.8), lookAt: new THREE.Vector3(0, 0.4, 0) },
    'rear': { pos: new THREE.Vector3(0.01, 1.2, -4.8), lookAt: new THREE.Vector3(0, 0.4, 0) },
    'top': { pos: new THREE.Vector3(0.01, 5.8, 0.01), lookAt: new THREE.Vector3(0, 0, 0) },
    'cockpit': { pos: new THREE.Vector3(0.18, 0.88, 0.05), lookAt: new THREE.Vector3(0.18, 0.85, 1.2) },
    'interior': { pos: new THREE.Vector3(0.18, 0.88, 0.05), lookAt: new THREE.Vector3(0.18, 0.85, 1.2) }
  }), []);

  const [animatingView, setAnimatingView] = useState(false);
  const targetCamPos = useRef(VIEW_TARGETS['front-34'].pos.clone());
  const targetLookAt = useRef(VIEW_TARGETS['front-34'].lookAt.clone());

  useEffect(() => {
    if (VIEW_TARGETS[view]) {
      targetCamPos.current.copy(VIEW_TARGETS[view].pos);
      targetLookAt.current.copy(VIEW_TARGETS[view].lookAt);
      setAnimatingView(true);
    }
  }, [view, VIEW_TARGETS]);

  useFrame((_, delta) => {
    if (animatingView && !isUserInteracting) {
      // Lerp camera position
      camera.position.lerp(targetCamPos.current, THREE.MathUtils.clamp(delta * 4.5, 0, 1));
      
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, THREE.MathUtils.clamp(delta * 4.5, 0, 1));
        controlsRef.current.update();
      }

      // Check if settled
      if (camera.position.distanceTo(targetCamPos.current) < 0.04) {
        camera.position.copy(targetCamPos.current);
        if (controlsRef.current) controlsRef.current.target.copy(targetLookAt.current);
        setAnimatingView(false);
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.06}
      enablePan={false}
      minPolarAngle={Math.PI / 6} // ~30 deg
      maxPolarAngle={Math.PI / 2.04} // ~88 deg to prevent clipping below floor
      minDistance={2.8}
      maxDistance={8.5}
      autoRotate={!isUserInteracting && !animatingView && view === 'front-34'}
      autoRotateSpeed={0.5}
      onStart={() => {
        setIsUserInteracting(true);
        setAnimatingView(false);
      }}
    />
  );
}

/**
 * Procedural Wheel Assembly with customizable rim geometry
 */
function ProceduralWheel({ position, rotation, wheelId, finish = 'silver', isRear = false }) {
  const is20Inch = wheelId === 'w-20-amg-twin5';
  const is21Inch = wheelId === 'w-21-amg-multispoke';
  const is22Inch = wheelId === 'w-22-amg-forged';

  // Rim color styling
  const rimColor = is22Inch ? '#1a1a1a' : is21Inch ? '#282b30' : is20Inch ? '#c0c4cc' : '#d8dce2';
  const rimMetalness = is22Inch ? 0.5 : 0.9;
  const rimRoughness = is22Inch ? 0.4 : 0.15;
  const accentColor = is22Inch ? '#b0b5bc' : is21Inch ? '#dce0e6' : '#111';

  return (
    <group position={position} rotation={rotation}>
      {/* Rubber Tyre */}
      <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.34, 0.12, 24, 36]} />
        <meshStandardMaterial color="#141416" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Tyre Sidewall Base */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.33, 0.33, 0.22, 32]} />
        <meshStandardMaterial color="#18181b" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Brake Rotor Disc (Inside Rim) */}
      <mesh position={[0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.03, 32]} />
        <meshStandardMaterial color="#888e96" metalness={0.95} roughness={0.25} />
      </mesh>

      {/* Brake Caliper */}
      <mesh position={[0.03, 0.14, 0.08]}>
        <boxGeometry args={[0.06, 0.09, 0.07]} />
        <meshStandardMaterial 
          color={is22Inch || is20Inch ? '#cc111a' : '#555'} 
          metalness={0.7} 
          roughness={0.2} 
        />
      </mesh>

      {/* Rim Outer Lip */}
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.27, 0.27, 0.06, 32, 1, true]} />
        <meshPhysicalMaterial 
          color={rimColor} 
          metalness={rimMetalness} 
          roughness={rimRoughness} 
          clearcoat={1} 
        />
      </mesh>

      {/* Center Hub & Star Emblem Cap */}
      <mesh position={[-0.095, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 0.04, 24]} />
        <meshPhysicalMaterial color="#0c0e12" metalness={0.9} roughness={0.15} clearcoat={1} />
      </mesh>

      {/* Chrome Star badge in center */}
      <mesh position={[-0.116, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[0.02, 0.045, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
      </mesh>

      {/* Spoke Patterns Based on Selected Wheel */}
      {is22Inch ? (
        // 22" AMG Cross-Spoke Mesh Pattern
        [...Array(10)].map((_, i) => (
          <group key={i} rotation={[(i * Math.PI) / 5, 0, 0]} position={[-0.09, 0, 0]}>
            <mesh rotation={[0, 0.15, 0]}>
              <boxGeometry args={[0.015, 0.25, 0.018]} />
              <meshStandardMaterial color="#1f2228" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh rotation={[0, -0.15, 0]}>
              <boxGeometry args={[0.015, 0.25, 0.018]} />
              <meshStandardMaterial color="#1f2228" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Polished spoke tip */}
            <mesh position={[-0.005, 0.12, 0]}>
              <boxGeometry args={[0.016, 0.04, 0.025]} />
              <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        ))
      ) : is21Inch ? (
        // 21" AMG Multi-Spoke with Aero Perimeter Ring
        <>
          <mesh position={[-0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[0.20, 0.25, 32]} />
            <meshStandardMaterial color="#111317" metalness={0.8} roughness={0.2} />
          </mesh>
          {[...Array(14)].map((_, i) => (
            <mesh
              key={i}
              position={[-0.09, 0, 0]}
              rotation={[(i * Math.PI) / 7, 0, 0]}
            >
              <boxGeometry args={[0.018, 0.23, 0.014]} />
              <meshPhysicalMaterial color="#c8ccd4" metalness={0.9} roughness={0.2} clearcoat={1} />
            </mesh>
          ))}
        </>
      ) : is20Inch ? (
        // 20" AMG Twin 5-Spoke
        [...Array(5)].map((_, i) => (
          <group key={i} rotation={[(i * 2 * Math.PI) / 5, 0, 0]} position={[-0.09, 0, 0]}>
            <mesh position={[0, 0.12, 0.022]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.018, 0.24, 0.02]} />
              <meshPhysicalMaterial color="#d4d8e0" metalness={0.9} roughness={0.15} clearcoat={1} />
            </mesh>
            <mesh position={[0, 0.12, -0.022]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.018, 0.24, 0.02]} />
              <meshPhysicalMaterial color="#d4d8e0" metalness={0.9} roughness={0.15} clearcoat={1} />
            </mesh>
          </group>
        ))
      ) : (
        // 19" Elegant Multi-Spoke Standard Alloy
        [...Array(12)].map((_, i) => (
          <mesh
            key={i}
            position={[-0.09, 0, 0]}
            rotation={[(i * Math.PI) / 6, 0, 0]}
          >
            <boxGeometry args={[0.02, 0.25, 0.016]} />
            <meshPhysicalMaterial color="#dce1e8" metalness={0.85} roughness={0.2} clearcoat={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

/**
 * Procedural Mercedes-Benz Car Model (High-Fidelity Primitive Sculpture)
 * Automatically adapts between Sedan, SUV, and Coupé body styles.
 */
function ProceduralCar({ vehicleCategory, paintColor, paintType, selectedWheel, theme }) {
  const bodyMatRef = useRef();
  const currentColor = useRef(new THREE.Color(paintColor));
  const targetColor = useRef(new THREE.Color(paintColor));

  // Determine material finish specs based on paint finish
  const materialProps = useMemo(() => {
    const pType = paintType?.toLowerCase() || '';
    if (pType.includes('matte') || pType.includes('magno')) {
      return PAINT_MATERIAL_PARAMS[PAINT_TYPES.MATTE];
    }
    if (pType.includes('metallic')) {
      return PAINT_MATERIAL_PARAMS[PAINT_TYPES.METALLIC];
    }
    if (pType.includes('manufaktur')) {
      return PAINT_MATERIAL_PARAMS[PAINT_TYPES.MANUFAKTUR];
    }
    return PAINT_MATERIAL_PARAMS[PAINT_TYPES.STANDARD];
  }, [paintType]);

  // Update target color on paint prop change
  useEffect(() => {
    targetColor.current.set(paintColor);
  }, [paintColor]);

  // Animate paint color transition smoothly over ~400ms
  useFrame((_, delta) => {
    if (bodyMatRef.current) {
      currentColor.current.lerp(targetColor.current, THREE.MathUtils.clamp(delta * 7.5, 0, 1));
      bodyMatRef.current.color.copy(currentColor.current);
    }
  });

  const isSUV = vehicleCategory === 'suvs';
  const isCoupe = vehicleCategory === 'coupes' || vehicleCategory === 'convertibles';

  // Body proportions
  const chassisHeight = isSUV ? 0.48 : isCoupe ? 0.34 : 0.38;
  const chassisY = isSUV ? 0.58 : 0.48;
  const cabinY = isSUV ? 1.05 : isCoupe ? 0.85 : 0.92;
  const cabinHeight = isSUV ? 0.55 : isCoupe ? 0.40 : 0.46;
  const wheelBaseX = 0.92;
  const wheelBaseZ = 1.45;
  const wheelY = 0.34;

  const isNight = theme === 'night';
  const headlightColor = '#f0f6ff';
  const headlightIntensity = isNight ? 3.5 : 1.2;

  return (
    <group position={[0, 0, 0]}>
      {/* ─── PRIMARY CAR PAINT MATERIAL ─────────────────────── */}
      <meshPhysicalMaterial
        ref={bodyMatRef}
        color={paintColor}
        metalness={materialProps.metalness}
        roughness={materialProps.roughness}
        clearcoat={materialProps.clearcoat}
        clearcoatRoughness={materialProps.clearcoatRoughness}
        reflectivity={0.9}
      />

      {/* ─── 1. LOWER CHASSIS & MAIN BODY SCULPTURE ───────────── */}
      {/* Main Center Body */}
      <mesh position={[0, chassisY, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.76, chassisHeight, 4.2]} />
        <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
      </mesh>

      {/* Sculpted Front Hood (Beveled taper toward front nose) */}
      <mesh position={[0, chassisY + 0.05, 1.2]} rotation={[-0.04, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.74, chassisHeight * 0.9, 1.6]} />
        <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
      </mesh>

      {/* Front Nose Cone / Bumper */}
      <mesh position={[0, chassisY - 0.04, 2.12]} castShadow receiveShadow>
        <boxGeometry args={[1.72, chassisHeight * 0.82, 0.28]} />
        <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
      </mesh>

      {/* Aerodynamic Front Lower Splitter (Gloss Black / Chrome) */}
      <mesh position={[0, chassisY - chassisHeight / 2 + 0.02, 2.18]}>
        <boxGeometry args={[1.74, 0.06, 0.22]} />
        <meshStandardMaterial color="#0f1115" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rear Trunk Decklid */}
      <mesh
        position={[0, chassisY + (isCoupe ? 0.02 : 0.06), -1.4]}
        rotation={[isCoupe ? 0.12 : 0.03, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.74, chassisHeight * 0.92, 1.3]} />
        <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
      </mesh>

      {/* Rear Bumper & Fascia */}
      <mesh position={[0, chassisY - 0.02, -2.12]} castShadow receiveShadow>
        <boxGeometry args={[1.72, chassisHeight * 0.86, 0.26]} />
        <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
      </mesh>

      {/* Rear Aerodynamic Diffuser */}
      <mesh position={[0, chassisY - chassisHeight / 2 + 0.03, -2.16]}>
        <boxGeometry args={[1.70, 0.08, 0.18]} />
        <meshStandardMaterial color="#121316" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Twin Exhaust Tips (Chrome) */}
      <mesh position={[0.62, chassisY - chassisHeight / 2 + 0.04, -2.25]}>
        <boxGeometry args={[0.18, 0.05, 0.04]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[-0.62, chassisY - chassisHeight / 2 + 0.04, -2.25]}>
        <boxGeometry args={[0.18, 0.05, 0.04]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Sculpted Side Rocker Panels / Skirts */}
      <mesh position={[0.88, chassisY - 0.12, 0]}>
        <boxGeometry args={[0.06, 0.16, 2.7]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.88, chassisY - 0.12, 0]}>
        <boxGeometry args={[0.06, 0.16, 2.7]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* ─── 2. CABIN GREENHOUSE, ROOF & PILLARS ────────────── */}
      {/* Roof Structure */}
      <mesh
        position={[0, cabinY + cabinHeight / 2 - 0.02, isCoupe ? -0.2 : -0.1]}
        rotation={[isCoupe ? 0.08 : 0.02, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.42, 0.05, isSUV ? 2.3 : isCoupe ? 1.7 : 1.95]} />
        <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
      </mesh>

      {/* Roof Rails for SUV */}
      {isSUV && (
        <>
          <mesh position={[0.68, cabinY + cabinHeight / 2 + 0.03, -0.1]}>
            <boxGeometry args={[0.03, 0.04, 2.1]} />
            <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-0.68, cabinY + cabinHeight / 2 + 0.03, -0.1]}>
            <boxGeometry args={[0.03, 0.04, 2.1]} />
            <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.2} />
          </mesh>
        </>
      )}

      {/* Tinted Automotive Glass (Windshield, Rear Screen, Side Windows) */}
      {/* Front Windshield */}
      <mesh
        position={[0, cabinY + 0.04, 0.78]}
        rotation={[-0.56, 0, 0]}
        castShadow
      >
        <boxGeometry args={[1.40, 0.04, 0.95]} />
        <meshPhysicalMaterial
          color="#0d1117"
          roughness={0.05}
          metalness={0.1}
          transmission={0.4}
          ior={1.52}
          reflectivity={0.95}
          clearcoat={1}
        />
      </mesh>

      {/* Rear Windshield */}
      <mesh
        position={[0, cabinY + 0.04, isCoupe ? -1.0 : -0.95]}
        rotation={[isCoupe ? 0.62 : 0.48, 0, 0]}
        castShadow
      >
        <boxGeometry args={[1.38, 0.04, isCoupe ? 1.05 : 0.88]} />
        <meshPhysicalMaterial
          color="#0d1117"
          roughness={0.05}
          metalness={0.1}
          transmission={0.35}
          ior={1.52}
          reflectivity={0.95}
          clearcoat={1}
        />
      </mesh>

      {/* Side Windows (Left & Right) */}
      <mesh position={[0.70, cabinY, -0.1]}>
        <boxGeometry args={[0.04, cabinHeight * 0.82, 1.85]} />
        <meshPhysicalMaterial
          color="#090b0e"
          roughness={0.05}
          metalness={0.1}
          transmission={0.3}
          reflectivity={0.95}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[-0.70, cabinY, -0.1]}>
        <boxGeometry args={[0.04, cabinHeight * 0.82, 1.85]} />
        <meshPhysicalMaterial
          color="#090b0e"
          roughness={0.05}
          metalness={0.1}
          transmission={0.3}
          reflectivity={0.95}
          clearcoat={1}
        />
      </mesh>

      {/* Window Chrome / Gloss Black Surrounds */}
      <mesh position={[0.72, cabinY + cabinHeight / 2 - 0.02, -0.1]}>
        <boxGeometry args={[0.02, 0.03, 1.92]} />
        <meshStandardMaterial color="#d4d8e0" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-0.72, cabinY + cabinHeight / 2 - 0.02, -0.1]}>
        <boxGeometry args={[0.02, 0.03, 1.92]} />
        <meshStandardMaterial color="#d4d8e0" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Side Mirrors with LED Indicators */}
      <group position={[0.88, cabinY - 0.08, 0.72]}>
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.09, 0.12]} />
          <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
        </mesh>
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.01, 0.02, 0.11]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      <group position={[-0.88, cabinY - 0.08, 0.72]}>
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.09, 0.12]} />
          <primitive object={bodyMatRef.current || new THREE.MeshStandardMaterial({ color: paintColor })} attach="material" />
        </mesh>
        <mesh position={[-0.02, 0, 0]}>
          <boxGeometry args={[0.01, 0.02, 0.11]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* ─── 3. FRONT FASCIA, PANAMERICANA GRILLE & STAR ──────── */}
      {/* Front Grille Mesh Base */}
      <mesh position={[0, chassisY, 2.22]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[0.96, 0.28, 0.06]} />
        <meshStandardMaterial color="#0c0e12" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Mercedes Star Emblem Chrome Ring */}
      <mesh position={[0, chassisY + 0.02, 2.26]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.10, 0.014, 16, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.08} />
      </mesh>

      {/* 3-Pointed Star Chrome Prongs */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
        <mesh
          key={i}
          position={[0, chassisY + 0.02, 2.26]}
          rotation={[0, 0, angle + Math.PI / 2]}
        >
          <boxGeometry args={[0.012, 0.09, 0.01]} />
          <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.08} />
        </mesh>
      ))}

      {/* DIGITAL LIGHT Headlights (Left & Right) */}
      <mesh position={[0.66, chassisY + 0.06, 2.16]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.34, 0.10, 0.18]} />
        <meshPhysicalMaterial
          color={headlightColor}
          emissive={headlightColor}
          emissiveIntensity={headlightIntensity}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[-0.66, chassisY + 0.06, 2.16]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.34, 0.10, 0.18]} />
        <meshPhysicalMaterial
          color={headlightColor}
          emissive={headlightColor}
          emissiveIntensity={headlightIntensity}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Daytime Running Light (DRL) LED Star Accents */}
      <mesh position={[0.66, chassisY + 0.11, 2.22]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.30, 0.015, 0.04]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.66, chassisY + 0.11, 2.22]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.30, 0.015, 0.04]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* ─── 4. REAR LIGHTING SIGNATURE ─────────────────────── */}
      {/* Full-Width 3D LED Taillight Bar */}
      <mesh position={[0, chassisY + 0.08, -2.23]}>
        <boxGeometry args={[1.56, 0.06, 0.05]} />
        <meshPhysicalMaterial
          color="#ff1a26"
          emissive="#ff0d1a"
          emissiveIntensity={isNight ? 2.8 : 1.2}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Star Pattern Taillight Endclusters */}
      <mesh position={[0.65, chassisY + 0.08, -2.22]}>
        <boxGeometry args={[0.26, 0.11, 0.06]} />
        <meshPhysicalMaterial
          color="#dd0814"
          emissive="#ff0d1a"
          emissiveIntensity={isNight ? 3.0 : 1.4}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[-0.65, chassisY + 0.08, -2.22]}>
        <boxGeometry args={[0.26, 0.11, 0.06]} />
        <meshPhysicalMaterial
          color="#dd0814"
          emissive="#ff0d1a"
          emissiveIntensity={isNight ? 3.0 : 1.4}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Rear Mercedes Star Emblem */}
      <mesh position={[0, chassisY + 0.14, -2.23]}>
        <torusGeometry args={[0.05, 0.008, 16, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* ─── 5. FOUR WHEEL ASSEMBLIES ───────────────────────── */}
      {/* Front Left */}
      <ProceduralWheel
        position={[wheelBaseX, wheelY, wheelBaseZ]}
        rotation={[0, 0, 0]}
        wheelId={selectedWheel?.id}
      />
      {/* Front Right */}
      <ProceduralWheel
        position={[-wheelBaseX, wheelY, wheelBaseZ]}
        rotation={[0, Math.PI, 0]}
        wheelId={selectedWheel?.id}
      />
      {/* Rear Left */}
      <ProceduralWheel
        position={[wheelBaseX, wheelY, -wheelBaseZ]}
        rotation={[0, 0, 0]}
        wheelId={selectedWheel?.id}
        isRear={true}
      />
      {/* Rear Right */}
      <ProceduralWheel
        position={[-wheelBaseX, wheelY, -wheelBaseZ]}
        rotation={[0, Math.PI, 0]}
        wheelId={selectedWheel?.id}
        isRear={true}
      />
    </group>
  );
}

/**
 * GLB Loader Component with automatic node/material scanning and logging.
 * If file is missing or invalid, ErrorBoundary falls back to ProceduralCar.
 */
function GLBCarModel({ modelKey, paintColor, paintType, selectedWheel, theme, onLoaded }) {
  const modelInfo = MODEL_MAP[modelKey] || MODEL_MAP.sedan;
  const { scene } = useGLTF(modelInfo.path);
  const loggedRef = useRef(false);

  useEffect(() => {
    if (scene && !loggedRef.current) {
      loggedRef.current = true;
      const nodes = [];
      const materials = [];
      scene.traverse((child) => {
        if (child.name) nodes.push(child.name);
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.name && materials.push(m.name));
          } else if (child.material.name) {
            materials.push(child.material.name);
          }
        }
      });
      console.log(`[CarStage3D GLB ${modelKey}] Discovered Nodes:`, nodes);
      console.log(`[CarStage3D GLB ${modelKey}] Discovered Materials:`, materials);
      if (onLoaded) onLoaded({ nodes, materials });
    }
  }, [scene, modelKey, onLoaded]);

  // Apply paint and wheel customizations to GLB scene nodes
  useEffect(() => {
    if (!scene) return;
    const pType = paintType?.toLowerCase() || '';
    const matParams = pType.includes('matte') || pType.includes('magno')
      ? PAINT_MATERIAL_PARAMS[PAINT_TYPES.MATTE]
      : pType.includes('metallic')
      ? PAINT_MATERIAL_PARAMS[PAINT_TYPES.METALLIC]
      : pType.includes('manufaktur')
      ? PAINT_MATERIAL_PARAMS[PAINT_TYPES.MANUFAKTUR]
      : PAINT_MATERIAL_PARAMS[PAINT_TYPES.STANDARD];

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Check if mesh material matches paint body
        const isBodyMat = modelInfo.bodyMaterials.some((bm) =>
          child.material?.name?.toLowerCase().includes(bm.toLowerCase()) ||
          child.name.toLowerCase().includes(bm.toLowerCase())
        );

        if (isBodyMat) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(paintColor),
            metalness: matParams.metalness,
            roughness: matParams.roughness,
            clearcoat: matParams.clearcoat,
            clearcoatRoughness: matParams.clearcoatRoughness,
          });
        }
      }
    });
  }, [scene, paintColor, paintType, modelInfo]);

  return <primitive object={scene} />;
}

/**
 * Fallback Boundary for GLTF loading
 */
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.info('[CarStage3D] GLB not found or failed to load. Falling back to high-fidelity procedural car.', error.message);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Studio Lighting Setup with Day & Night modes and soft floor shadows
 */
function StudioStageLighting({ theme }) {
  const isNight = theme === 'night';

  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={isNight ? 0.25 : 0.65} color={isNight ? '#406080' : '#ffffff'} />

      {/* Key Studio Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={isNight ? 0.6 : 1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        color={isNight ? '#88aacc' : '#ffffff'}
      />

      {/* Soft Fill Light */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={isNight ? 0.4 : 0.8}
        color={isNight ? '#3b82f6' : '#edf2f7'}
      />

      {/* Top / Rim Light for Contour Highlights */}
      <directionalLight
        position={[0, 7, -5]}
        intensity={isNight ? 1.0 : 1.2}
        color={isNight ? '#60a5fa' : '#ffffff'}
      />

      {/* Front Nose Soft Spotlight */}
      <spotLight
        position={[0, 4, 6]}
        angle={0.6}
        penumbra={0.8}
        intensity={isNight ? 0.8 : 1.1}
        color="#ffffff"
      />

      {/* High Dynamic Range Studio Environment for Metallic Reflections */}
      <Environment preset={isNight ? 'night' : 'city'} />

      {/* Soft Realistic Contact Shadow on Studio Ground */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={isNight ? 0.85 : 0.6}
        scale={8.5}
        blur={2.2}
        far={3.0}
        resolution={1024}
        color="#050608"
      />
    </>
  );
}

/**
 * Main CarStage3D Component
 * Drop-in replacement for CarView.
 * Props:
 *  - config: { vehicle, paint, wheel, upholstery, trimInlay } OR explicit props
 *  - view: 'front-34' | 'side' | 'rear-34' | 'rear' | 'top' | 'cockpit' | 'interior'
 *  - theme: 'day' | 'night'
 */
export default function CarStage3D({
  config,
  vehicle,
  paint,
  wheel,
  view = 'front-34',
  theme = 'day',
  onRotate
}) {
  // Normalize configuration props
  const currentVehicle = vehicle || config?.vehicle || {};
  const currentPaint = paint || config?.paint || { hex: '#c5cbcf', finish: 'Metallic', type: 'Metallic' };
  const currentWheel = wheel || config?.wheel || { id: 'w-19-multispoke' };
  const currentTheme = theme || config?.theme || 'day';

  const category = currentVehicle.category || 'sedans';
  const modelKey = getModelKey(category);

  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [showRotateHint, setShowRotateHint] = useState(true);

  // Auto-hide hint on interaction
  const handleInteractionStart = () => {
    setIsUserInteracting(true);
    setShowRotateHint(false);
    if (onRotate) onRotate();
  };

  return (
    <div className={`car-stage-3d-container ${currentTheme === 'night' ? 'stage-night' : ''}`}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [3.6, 1.4, 3.8], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="car-3d-webgl-canvas"
      >
        <StudioStageLighting theme={currentTheme} />

        <CameraController
          view={view}
          isUserInteracting={isUserInteracting}
          setIsUserInteracting={handleInteractionStart}
        />

        <Suspense fallback={
          <ProceduralCar
            vehicleCategory={category}
            paintColor={currentPaint.hex || '#c5cbcf'}
            paintType={currentPaint.type || currentPaint.finish || 'Metallic'}
            selectedWheel={currentWheel}
            theme={currentTheme}
          />
        }>
          <ModelErrorBoundary
            fallback={
              <ProceduralCar
                vehicleCategory={category}
                paintColor={currentPaint.hex || '#c5cbcf'}
                paintType={currentPaint.type || currentPaint.finish || 'Metallic'}
                selectedWheel={currentWheel}
                theme={currentTheme}
              />
            }
          >
            {/* If GLB exists, loads GLBCarModel, else catches and renders ProceduralCar */}
            <GLBCarModel
              modelKey={modelKey}
              paintColor={currentPaint.hex || '#c5cbcf'}
              paintType={currentPaint.type || currentPaint.finish || 'Metallic'}
              selectedWheel={currentWheel}
              theme={currentTheme}
            />
          </ModelErrorBoundary>
        </Suspense>
      </Canvas>

      {/* Floating 360 Drag-to-Rotate Hint Badge */}
      {showRotateHint && (
        <div className="rotate-hint-pill" onClick={() => setShowRotateHint(false)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>Drag to rotate 360° • Scroll to zoom</span>
        </div>
      )}

      {/* Active Paint Finish HUD Pill */}
      <div className="stage-paint-hud">
        <span className="paint-swatch-dot" style={{ backgroundColor: currentPaint.hex }} />
        <span className="paint-name-label">{currentPaint.name || 'Custom Finish'}</span>
        <span className="paint-type-badge">{currentPaint.finish || currentPaint.type}</span>
      </div>
    </div>
  );
}
