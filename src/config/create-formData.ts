export const createFormData = (obj: any) => {
    const formData = new FormData();

    for(let i in obj) {
        if(obj[i]) {
            formData.append(i, obj[i] as any);
        }
    }
    return formData
}