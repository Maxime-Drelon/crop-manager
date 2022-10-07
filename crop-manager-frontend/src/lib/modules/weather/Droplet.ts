import * as THREE from 'three';

class Droplet {
	private mesh: THREE.Mesh;
	private material: THREE.Material;
	private geometry: THREE.PlaneGeometry;
	private speed: number;
	private height: number;
	private width: number;

	public constructor(
		maxWidth: number,
		minHeight: number,
		maxHeight: number,
		minSpeed: number,
		maxSpeed: number,
		material: THREE.MeshBasicMaterial
	) {
		this.height = minHeight + Math.random() * maxHeight;
		this.width = Math.random() * maxWidth;
		this.material = material;
		this.geometry = new THREE.PlaneGeometry(this.width, this.height);
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.speed = minSpeed + Math.random() * maxSpeed;
	}

	public getHeight() {
		return this.height;
	}

	public getWidth() {
		return this.width;
	}

	public getMesh() {
		return this.mesh;
	}

	public getSpeed() {
		return this.speed;
	}

	public setMaterial(newMaterial: THREE.MeshBasicMaterial) {
		this.material = newMaterial;
		this.mesh.material = this.material;
	}

	public setPosition(position: THREE.Vector3) {
		this.mesh.position.copy(position);
	}

	public getPosition() {
		return this.mesh.position;
	}

	public fall() {
		this.mesh.position.y -= this.speed;
	}
}

export default Droplet;
