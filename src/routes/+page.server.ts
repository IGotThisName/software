export const actions = {
	default: async ({ request }:{ request:Request }) => {
		const data = await request.formData();
		console.log(data.get('input'))
	}
};