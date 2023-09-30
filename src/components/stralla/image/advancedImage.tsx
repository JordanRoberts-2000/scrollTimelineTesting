// =================================================
// Ideas:
// abovethefold/priority???: true/undefined
// loadingType: spinner? blur?
// =================================================
type Props = React.ImgHTMLAttributes<HTMLImageElement>

const AdvancedImage = ({...rest}: Props) => {
    const handleLoad = () => {
        console.log('loaded')
    }
    return (
        <img {...rest} loading="lazy" onLoad={() => handleLoad()}/>
    )
}

export default AdvancedImage