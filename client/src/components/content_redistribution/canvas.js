import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";

import { Control } from "../playground/Player";
import { Physics } from "@react-three/cannon";

import Fireflies from "../functions/fireflies";

import { softShadows, Loader, Environment, useGLTF } from "@react-three/drei";

import { useReflector } from "../functions/use-reflector";
import usePostprocessing from "../functions/use-postprocessing";

import Stacy from "./stacy";

import {
  TextureLoader,
  AudioListener,
  AudioLoader,
  Mesh,
  DoubleSide,
} from "three";

import Stream from "../Broadcast/Stream";
softShadows();

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Cubes({ imageUrls, material }) {
  const ref = useRef();

  return imageUrls.map((imageUrl, index) => (
    <mesh
      key={index}
      ref={ref}
      position={[
        randomIntFromInterval(-120, 120),
        Math.floor(Math.random() * 10),
        randomIntFromInterval(-120, 120),
      ]}
      castShadow
      receiveShadow
    >
      <boxBufferGeometry attach="geometry" args={[5, 5, 5]} color="white" />
      <Suspense fallback={null}>
        <ImageTextureMaterial imageUrl={imageUrl} />
      </Suspense>
    </mesh>
  ));
}

const ImageTextureMaterial = (imageUrl) => {
  const texture = useLoader(TextureLoader, imageUrl.imageUrl);

  return (
    <meshStandardMaterial
      attach="material"
      roughness={1}
      color="white"
      map={texture}
      side={DoubleSide}
    />
  );
};

function Lights() {
  const lightRef = useRef();
  const lightRef1 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5;
    if (lightRef.current && lightRef1.current) {
      lightRef.current.position.x = Math.sin(t) * 50;
      lightRef1.current.position.x = Math.sin(t) * 50;

      lightRef.current.position.z = Math.cos(t) * 50;
      lightRef1.current.position.z = Math.sin(t) * 50;

      lightRef1.current.position.y = Math.sin(t) * 50;
    }
  });

  return (
    <>
      <spotLight
        ref={lightRef}
        position={[20, 20, 10]}
        intensity={3}
        castShadow
        color="#00e9ff"
        angle={Math.PI / 3}
        penumbra={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <spotLight
        ref={lightRef1}
        position={[20, 20, 10]}
        intensity={0.2}
        castShadow
        color="#e1ff00"
        angle={Math.PI / 3}
        penumbra={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

function StreamBoxes() {
  const [video] = useState(() => {
    const vid = document
      .getElementById("video")
      .getElementsByTagName("video")[0];
    if (vid) {
      vid.crossOrigin = "Anonymous";
      return vid;
    }
  });
  const { camera } = useThree();

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );
      groupRef.current.rotation.y += 0.008;
    }
  });

  if (video) {
    return (
      <>
        <group
          ref={groupRef}
          position={[camera.position.x, camera.position.y, camera.position.z]}
        >
          <mesh position={[0, 3, 33]}>
            <boxBufferGeometry
              args={[10, 9, 0.1]}
              rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
            />
            <meshBasicMaterial>
              <videoTexture attach="map" args={[video]} />
            </meshBasicMaterial>
          </mesh>

          <mesh position={[20, 7, 0]}>
            <boxBufferGeometry
              args={[0.1, 5, 6]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <meshBasicMaterial>
              <videoTexture attach="map" args={[video]} />
            </meshBasicMaterial>
          </mesh>

          <mesh position={[-10, 15, -5]}>
            <boxBufferGeometry
              args={[7, 0.1, 6]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <meshBasicMaterial>
              <videoTexture attach="map" args={[video]} />
            </meshBasicMaterial>
          </mesh>
        </group>

        <mesh position={[0, 30, 0]}>
          <boxBufferGeometry args={[0.1, 20, 40]} rotation={[0, 20, 0]} />
          <meshBasicMaterial>
            <videoTexture attach="map" args={[video]} />
          </meshBasicMaterial>
        </mesh>
      </>
    );
  } else {
    return null;
  }
}

function Floor() {
  const [meshRef, ReflectorMaterial, passes] = useReflector();
  usePostprocessing(passes);
  return (
    <group position-z={-5}>
      <mesh
        receiveShadow
        ref={meshRef}
        rotation-x={-Math.PI / 2}
        position-y={-3.001}
      >
        <planeBufferGeometry
          receiveShadow
          attach="geometry"
          args={[300, 300]}
        />

        <ReflectorMaterial
          metalness={0.8}
          roughness={0.3}
          clearcoat={0.5}
          reflectorOpacity={0.3}
          args={[300, 300]}
        />
      </mesh>
    </group>
  );
}

function Sound({ url }) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setLoop(true);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  });
  return <positionalAudio ref={sound} args={[listener]} />;
}

function Boxes(props) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5;

    if (groupRef.current) {
      groupRef.current.children.forEach((element) => {
        element.rotation.x = Math.sin(t) * 0.05;
        element.rotation.y = Math.sin(t) * 0.05;
        element.rotation.z = Math.sin(t) * 0.05;
      });
    }
  });

  return (
    <group position-z={-5}>
      <group ref={groupRef}>
        <Cubes imageUrls={props.props} />
      </group>
    </group>
  );
}

const Model = () => {
  const gltf = useGLTF("slum_house/scene.gltf");
  const ref = useRef();

  useEffect(() => {
    if (gltf) {
      let model = gltf.scene;
      model.scale.set(7, 7, 7);
      model.traverse((children) => {
        if (children instanceof Mesh) {
          // maps mirrorMaterial onto all meshes in obj file.
          children.castShadow = true;
          children.receiveShadow = true;
          children.geometry.computeVertexNormals();
          // children.material = mirrorMaterial;
        }
      });
    }
  }, [gltf]);

  return gltf ? (
    <group position={[70, -2.3, 70]} rotation={[0, (Math.PI / 2) * 3, 0]}>
      <primitive ref={ref} object={gltf.scene} />
      <Stacy pose={1} position={[0, 0, 0]} />
    </group>
  ) : null;
};

export default class ContentRedistributionCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: this.props.imageUrls,
      hasStream: this.props.hasStream,
    };
  }

  componentDidMount() {
    console.log("canvas did mount", this.props.imageUrls.length);
  }
  componentDidUpdate() {
    console.log("canvas did update", this.props.imageUrls.length);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.imageUrls.length !== nextProps.imageUrls.length ||
      this.props.loggedIn !== nextProps.loggedIn ||
      this.state.hasStream !== nextState.hasStream
    ) {
      return true;
    } else {
      return false;
    }
  }

  callbackFunction = () => {
    this.setState({ hasStream: true });
    console.log("sets stream to true");
  };

  render() {
    return (
      <>
        {this.props.loggedIn && (
          <Stream callbackFunction={this.callbackFunction} />
        )}

        <Canvas
          id="canvas"
          colorManagement
          shadowMap={true}
          camera={{ position: [0, 1, 10], far: 170, near: 0.1, fov: 100 }}
          resize={{ debounce: { scroll: 0, resize: 0 } }}
          invalidateFrameloop={true}
          gl={{
            powerPreference: "high-performance",
            antialias: false,
            alpha: false,
          }}
          style={{
            background: "black",
            position: "fixed",
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            zIndex: "0",
          }}
        >
          <Floor />

          <Boxes props={this.state.imageUrls} />

          <ambientLight intensity={0.3} />

          <Suspense fallback={null}>
            <Sound url="https://res.cloudinary.com/www-houseofkilling-com/video/upload/v1620900008/sounds/AliveForever_clhtnw.mp3" />
          </Suspense>

          <Environment files="collage.hdr" background={true} />

          <Fireflies count={500} position={[0, 0, 0]} />

          <Fireflies count={500} position={[-50, 0, 0]} />

          <Fireflies count={500} position={[-50, 0, 20]} />

          <Physics gravity={[0, 0, 0]}>
            <Control />
          </Physics>

          <mesh
            position={[0, 0, 40]}
            rotation={[0, 0, Math.PI / 3]}
            castShadow
            receiveShadow
          >
            <boxBufferGeometry
              attach="geometry"
              args={[40, 40, 40]}
              color="white"
            />
            <ImageTextureMaterial imageUrl="https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_315/v1624263178/textures/Artboard_20_rasqma.png" />
          </mesh>

          <mesh
            position={[-90, 0, 40]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            castShadow
            receiveShadow
          >
            <boxBufferGeometry
              attach="geometry"
              args={[45, 45, 45]}
              color="white"
            />
            <ImageTextureMaterial imageUrl="https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_361/v1624263162/textures/Artboard_4_oc8m0v.png" />
          </mesh>

          <mesh
            position={[130, 20, 140]}
            rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 3]}
            castShadow
            receiveShadow
          >
            <boxBufferGeometry
              attach="geometry"
              args={[100, 100, 100]}
              color="white"
            />
            <ImageTextureMaterial imageUrl="https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_338/v1624263172/textures/Artboard_13_sifhhu.png" />
          </mesh>

          <mesh
            position={[-120, 20, -120]}
            rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 3]}
            castShadow
            receiveShadow
          >
            <boxBufferGeometry
              attach="geometry"
              args={[100, 100, 100]}
              color="white"
            />
            <ImageTextureMaterial imageUrl="https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_372/v1624263715/textures/Artboard_5explosion_rpkdlq.png" />
          </mesh>

          <mesh
            position={[0, 60, -90]}
            rotation={[1, Math.PI / 2, Math.PI / 3]}
            castShadow
            receiveShadow
          >
            <boxBufferGeometry
              attach="geometry"
              args={[100, 100, 100]}
              color="white"
            />
            <ImageTextureMaterial imageUrl="https://res.cloudinary.com/www-houseofkilling-com/image/upload/c_scale,w_383/v1624263172/textures/Artboard_9_zq7vvq.png" />
          </mesh>
          <Lights />

          <Model />

          {this.state.hasStream && <StreamBoxes />}
        </Canvas>
        <Loader dataInterpolation={(p) => `waking up ${p.toFixed(5)}%`} />
      </>
    );
  }
}

/* <fogExp2 attach="fog" args={[0xbffffd, 0.049]} /> */

// <RSphere position={[10, 0, 10]} args={[7, 32, 32]} />

// <RSphere position={[-70, 5, 20]} args={[3, 32, 32]} />

// <RSphere position={[50, 10, -40]} args={[10, 32, 32]} />

// <RSphere position={[0, 0, 0]} args={[50, 32, 32]} />
