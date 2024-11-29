const importAll = (requireContext) => {
    const images = {};
    requireContext.keys().forEach((key) => {
        const fileName = key.replace('./', '').replace('.svg', '');
        images[fileName] = requireContext(key);
    });
    return images;
};

const svgs = importAll(require.context('./', false, /\.svg$/));

export default svgs;
