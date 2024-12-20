import * as THREE from 'three'
//Orbit controls allow the camera to orbit around a target.
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// alllows us to import gltf files
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 
// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );
//initialize an object and control variable
let object
let controls

// Instantiate a loader
const loader = new GLTFLoader();
// Load a glTF resource
loader.load(
	// resource URL
	'models/sofa_6/scene.gltf',
	// called when the resource is loaded
  
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


//renderer
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );


//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = 1.5;


// adding ambient light to the scene
const topLight = new THREE.DirectionalLight(0xffffff, 4); // (color, intensity)

scene.add(topLight);

const light = new THREE.AmbientLight( 0x404040, 2); // soft white light
scene.add( light );

controls = new OrbitControls(camera, renderer.domElement);

//animate the scene
function animate(){
  requestAnimationFrame(animate); 
  controls.update();
  renderer.render(scene, camera);
}

//Start the 3D rendering
animate();