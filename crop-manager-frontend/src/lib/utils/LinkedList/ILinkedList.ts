import type Node from '$lib/utils/LinkedList/Node';

interface ILinkedList<T> {
	insertBegin(data: T): Node<T>;
	insertEnd(data: T): Node<T>;
	deleteNode(node: Node<T>): Node<T> | null;
	getHead(): Node<T> | null;
	getLength(): number;
}

export default ILinkedList;
