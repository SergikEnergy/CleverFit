export const getHighlightedName = (name: string, searchedValue: string) => {
    const regex = new RegExp(searchedValue, 'gi');

    if (!searchedValue) {
        return <div className='searched__name'>{name}</div>;
    }

    if (name.split(regex).length === 1) {
        return <div className='searched__name'>{name}</div>;
    }
    const highlightedName = name.replace(
        regex,
        (match) => `<mark style="color: #ff7875; padding: 0;">${match}</mark>`,
    );

    return <div className='searched__name' dangerouslySetInnerHTML={{ __html: highlightedName }} />;
};
