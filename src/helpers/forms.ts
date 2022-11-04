export const isEmail = (hint: string) => {
	return {
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: hint
		}
	}
}