export interface Todo {
	id: number;
	title: string;
}

export interface ModalProps {
	visible: boolean;
	title: string;
	onClose: () => void;
}