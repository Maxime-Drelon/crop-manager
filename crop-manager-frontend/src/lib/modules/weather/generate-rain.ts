import * as THREE from 'three';

import Droplet from '$lib/modules/weather/Droplet';
import type Node from '$lib/utils/LinkedList/Node';
import LinkedList from '$lib/utils/LinkedList/LinkedList';

let droplets: LinkedList<Droplet> = new LinkedList<Droplet>();

const dropletMaterial = new THREE.MeshBasicMaterial({
	color: 0x9ec6c6,
	opacity: 0.3,
	transparent: true
});

const generateRain = (scene: THREE.Scene, camera: THREE.Camera) => {
	let node: Node<Droplet> | null = droplets.getHead();

	while (node != null) {
		let droplet: Droplet = node.data;

		droplet.fall();
		droplet.getMesh().lookAt(camera.position);

		if (droplet.getPosition().y + droplet.getHeight() <= 0) {
			node = droplets.deleteNode(node);
			scene.remove(droplet.getMesh());
		} else {
			node = node.next;
		}
	}

	if (droplets.getLength() < 320) {
		for (let i = 0; i < 5; i++) {
			const newDroplet = new Droplet(0.3, 1, 3.5, 0.5, 1, dropletMaterial);
			const newposition = new THREE.Vector3(Math.random() * 100 - 50, 50, Math.random() * 100 - 50);

			newDroplet.setPosition(newposition);
			droplets.insertEnd(newDroplet);

			scene.add(newDroplet.getMesh());
		}
	}
};

export default generateRain;
