export const getClaimFormData = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const rawTags = formData.get('tags') as string;
    const tags = rawTags.length > 0 ? rawTags.split(',') : [];

    return {
        title,
        content,
        tags,
    };
};
