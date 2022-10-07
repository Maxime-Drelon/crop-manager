import { gs } from '$lib/modules/scene/scene';
import * as THREE from 'three';

export default (scene: THREE.Scene, camera: THREE.Camera) => {
	for (let i = 0; i < gs.length; i++) {
		gs[i].position.y -= 0.3;
		gs[i].position.x += 0.2;
		gs[i].lookAt(camera.position);
		if (gs[i].position.y < 0) {
			scene.remove(gs[i]);
		}
	}
	const material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		opacity: 0.3,
		transparent: true
	});
	const rainDrop = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 2 + Math.random() * 1.3), material);
	rainDrop.position.y = 10;
	rainDrop.position.x = Math.random() * 16;
	rainDrop.position.z = Math.random() * 16;
	// gouttes.set([...gs, rainDrop]);
	gs.push(rainDrop);
	scene.add(rainDrop);
};
