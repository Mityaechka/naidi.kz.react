import {ReactNode} from 'react'
import {action, makeObservable, observable} from 'mobx'
import {Styles} from 'react-modal'

export class ModalStore {
	isOpen = false
	child?: ReactNode
	style?: Styles

	constructor() {
		makeObservable(this, {
			isOpen: observable,
			child: observable,
			style: observable,
			showModal: action,
			hideModal: action,
			setStyle: action
		})
	}

	setStyle(style?: Styles) {
		this.style = style
	}

	showModal(child?: ReactNode, style: Styles | undefined = undefined) {
		this.setStyle(style)
		this.child = child
		this.isOpen = true
	}



	hideModal() {
		this.isOpen = false
	}


}

