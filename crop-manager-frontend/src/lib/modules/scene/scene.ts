import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Store
import { blocSelectionModal, buildMode, weatherState } from '$lib/modules/building/store';

import WeatherTypes from '$lib/types/weather';
import generateRain from '$lib/modules/weather/generate-rain';
import setBackgroundWeather from '$lib/modules/weather/set-background-weather';

// Variables
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;

let plane: THREE.Mesh;
let pointer: THREE.Vector2;
let raycaster: THREE.Raycaster;

let modal: any;
let build: boolean;

let rollOverMesh: THREE.Mesh;
let rollOverMaterial: THREE.MeshBasicMaterial;

let currentWeather: WeatherTypes;

const objects: THREE.Mesh[] = [];

let isAltDown = false;

// init
export const init = (el: any) => {
	blocSelectionModal.subscribe((value) => {
		modal = value;
	});

	buildMode.subscribe((value) => {
		build = value;
	});

	weatherState.subscribe((s) => {
		currentWeather = s;
	})

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	gsap.to(camera.position, { duration: 5, z: 50, y: 25 });
	camera.position.z = 10;
	// camera.lookAt(0, 0, 0);

	scene = new THREE.Scene();
	setBackgroundColor();

	const rollOverGeo = new THREE.BoxGeometry(4, 1, 4);
	rollOverMaterial = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		opacity: 0.5,
		transparent: true
	});
	rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
	rollOverMesh.position.y = 0.5;
	scene.add(rollOverMesh);

	const ambientLight = new THREE.AmbientLight(0xffffcc);
	scene.add(ambientLight);

	const gridHelper = new THREE.GridHelper(100, 25);
	scene.add(gridHelper);

	raycaster = new THREE.Raycaster();
	pointer = new THREE.Vector2();

	const geometry = new THREE.PlaneGeometry(100, 100);
	geometry.rotateX(-Math.PI / 2);

	plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
	scene.add(plane);

	objects.push(plane);

	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
	resize();

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enablePan = false;
	controls.autoRotateSpeed = 0.5;

	document.addEventListener('pointermove', onPointerMove);
	document.addEventListener('pointerdown', onPointerDown);
	document.addEventListener('keydown', onDocumentKeyDown);
	document.addEventListener('keyup', onDocumentKeyUp);

	window.addEventListener('resize', onWindowResize);

	setBackgroundWeather(scene);

	tick();
};

const setBackgroundColor = () => {
	let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (matched) {
		scene.background = new THREE.Color(0x03040b);
	} else {
		scene.background = new THREE.Color(0xfcfbf4);
	}
};

export const gs: THREE.Mesh[] = []

const tick = () => {
	requestAnimationFrame(tick);

	setBackgroundColor();
	camera.lookAt(0, 0, 0);
	controls.update();

	rollOverMesh.visible = build;
	controls.autoRotate = !build;
	controls.enabled = build;

	if (currentWeather == WeatherTypes.raining) {
		generateRain(scene, camera);
	}

	renderer.render(scene, camera);
};

const resize = () => {
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
};

const roundToClosestMutliple = (number: any, multiple: any) => {
	let a = parseInt(String(Math.abs(number) / multiple), 10) * multiple;
	let b = Math.floor(a + multiple);

	let value = Math.abs(number) - a > b - Math.abs(number) ? b : a;

	return number > 0 ? value : -value;
};

const onPointerDown = (event: any) => {
	if (build === true && isAltDown === false) {
		pointer.set(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		);

		raycaster.setFromCamera(pointer, camera);

		const intersects = raycaster.intersectObjects(objects, false);

		if (intersects.length > 0 && modal.isOpen === false) {
			blocSelectionModal.set({ isOpen: true, x: event.clientX, y: event.clientY });
		}
	}
};

const onPointerMove = (event: any) => {
	if (build === true && isAltDown === false) {
		pointer.set(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		);

		raycaster.setFromCamera(pointer, camera);

		const intersects = raycaster.intersectObjects(objects, false);

		if (intersects.length > 0 && modal.isOpen === false) {
			const intersect = intersects[0];

			rollOverMesh.position.x = roundToClosestMutliple(intersect.point.x, 4);
			rollOverMesh.position.z = roundToClosestMutliple(intersect.point.z, 4);
		}
	}
};

const onDocumentKeyDown = (event: any) => {
	switch (event.keyCode) {
		case 18:
			isAltDown = true;
			break;
	}
};

const onDocumentKeyUp = (event: any) => {
	switch (event.keyCode) {
		case 18:
			isAltDown = false;
			break;
	}
};

const onWindowResize = () => {
	resize();
};

window.addEventListener('resize', resize);
