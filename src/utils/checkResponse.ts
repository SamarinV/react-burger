export function checkResponse(response: any){
	if (!response.ok) {
				return Promise.reject(`Ошибка ${response.status}`);
			}
			return response.json();
}