class Node<T> {
	public next: Node<T> | null = null;
	constructor(public data: T) {}
}

export default Node;
