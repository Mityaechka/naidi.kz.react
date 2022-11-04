export const formatPhoneNumber = (phone?: string) => {
	if(!phone){
		return ''
	}

	phone = phone.replace(/[^\d]/g, '')
	if (phone.length == 10) {
		return phone.replace(/(\d{3})(\d{3})(\d{4})/, '+7 ($1) $2-$3')
	}

	return ''
}