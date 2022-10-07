import Node from '$lib/utils/LinkedList/Node';
import type ILinkedList from '$lib/utils/LinkedList/ILinkedList';

class LinkedList<T> implements ILinkedList<T> {
	private head: Node<T> | null = null;
	private length: number = 0;

	public getLength(): number {
		return this.length;
	}

	public insertBegin(data: T): Node<T> {
		const node = new Node(data);

		if (this.head == null) {
			this.head = node;
		} else {
			node.next = this.head;
			this.head = node;
		}

		this.length += 1;

		return node;
	}

	public insertEnd(data: T): Node<T> {
		const node = new Node(data);

		if (this.head == null) {
			this.head = node;
		} else {
			const getLast = (node: Node<T>): Node<T> => {
				return node.next ? getLast(node.next) : node;
			};

			const lastNode = getLast(this.head);
			lastNode.next = node;
		}

		this.length += 1;

		return node;
	}

	public deleteNode(node: Node<T>): Node<T> | null {
		let previous: Node<T> | null = null;
		let current: Node<T> | null = this.head;

		if (!current) {
			return null;
		}

		if (current === node) {
			this.head = current.next;
			current = null;
			this.length--;
			return this.head;
		}

		previous = current;
		current = current.next;

		while (current != null) {
			if (current === node) {
				previous.next = current.next;
				current = null;
				this.length--;
				return previous.next;
			}

			previous = current;
			current = current.next;
		}

		return null;
	}

	public getHead() {
		return this.head;
	}
}

export default LinkedList;
